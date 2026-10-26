import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import pLimit from "p-limit";
import { createSlopless, createJevClient, listChecks } from "../dist/index.js";
import { loadDataset, preflightDataset, writeAtomicJson } from "./jev.mjs";

const hash = (value) =>
  createHash("sha256")
    .update(
      typeof value === "string" || Buffer.isBuffer(value)
        ? value
        : JSON.stringify(value)
    )
    .digest("hex");
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    dataset: { type: "string" },
    check: { type: "string" },
    output: { type: "string" },
    help: { type: "boolean" }
  }
});
if (values.help) {
  process.stdout.write(
    "node runners/runtime.mjs <run|replay> --dataset FILE.md --check family:rule --output runners/results/NAME.json\nUses the public Slopless runtime on development data only. run requires JEV_API_KEY and a new output; replay validates recorded request hashes, probabilities and native findings offline. Labels stay outside requests.\n"
  );
  process.exit(0);
}
const [command] = positionals;
assert.ok(["run", "replay"].includes(command) && positionals.length === 1);
assert.ok(
  values.dataset && values.check && values.output,
  "Supply dataset, check and output."
);
const path = resolve(values.dataset),
  output = resolve(values.output);
assert.ok(output.startsWith(resolve("runners/results") + "/"));
preflightDataset(path, { developmentOnly: true });
const check = listChecks().find((x) => x.id === values.check);
assert.ok(check?.backend === "jev", "Select a registered Jev check.");
const separator = check.id.indexOf(":"),
  family = check.id.slice(0, separator);
const labelId = check.id.replace(":", "/");
const rows = loadDataset(path, family).filter((row) =>
  (row.labels ?? [row.label]).some((l) => l.check === labelId)
);
assert.ok(rows.length > 0);
const snapshot = {
  dataset: values.dataset,
  check,
  sourceSha256: hash(readFileSync(path)),
  labelsSha256: hash(readFileSync(path.slice(0, -3) + ".labels.json")),
  runtimeSha256: hash(
    readdirSync(resolve("dist"), { recursive: true })
      .filter((name) => /\.(js|md|json)$/.test(name))
      .sort()
      .map((name) => [name, hash(readFileSync(resolve("dist", name)))])
  ),
  dependenciesSha256: hash(readFileSync(resolve("pnpm-lock.yaml"))),
  sdkVersion: JSON.parse(
    readFileSync(resolve("node_modules/@typesafe-ai/sdk/package.json"))
  ).version,
  client: { concurrency: 3, retries: 0, timeoutMs: 120000 },
  packageVersion: JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url))
  ).version
};
let result;
let client;
const queues = new Map();
if (command === "run") {
  assert.ok(!existsSync(output), "Preserve prior outputs; use a new filename.");
  assert.ok(process.env.JEV_API_KEY, "JEV_API_KEY is required.");
  result = { snapshot, complete: false, receipts: [], predictions: [] };
  client = createJevClient({
    apiKey: process.env.JEV_API_KEY,
    ...snapshot.client,
    onResponse(receipt) {
      result.receipts.push({
        ...structuredClone(receipt),
        requestSha256: hash(receipt.input)
      });
    }
  });
  writeAtomicJson(output, result);
} else {
  result = JSON.parse(readFileSync(output, "utf8"));
  const { runtimeSha256: recordedRuntime, ...recordedSnapshot } =
    result.snapshot;
  const { runtimeSha256: replayRuntime, ...replaySnapshot } = snapshot;
  assert.equal(typeof recordedRuntime, "string");
  assert.equal(typeof replayRuntime, "string");
  assert.deepEqual(
    recordedSnapshot,
    replaySnapshot,
    "Changed source, labels or selected runtime settings."
  );
  assert.equal(result.complete, true);
  assert.equal(
    result.inferenceSha256,
    hash({
      snapshot: result.snapshot,
      receipts: result.receipts,
      predictions: result.predictions
    })
  );
  for (const receipt of result.receipts) {
    assert.equal(receipt.requestSha256, hash(receipt.input));
    const queue = queues.get(receipt.requestSha256) ?? [];
    queue.push(receipt);
    queues.set(receipt.requestSha256, queue);
  }
  client = {
    async judge(input, signal) {
      signal.throwIfAborted();
      const receipt = queues.get(hash(input))?.shift();
      assert.ok(receipt, "No saved response for this exact runtime request.");
      return receipt.scores;
    }
  };
}
const engine = createSlopless({ checks: [check.id], jev: client });
const started = performance.now(),
  limit = pLimit(3);
const controller = new AbortController();
const tasks = rows.map((row) =>
  limit(async () => ({
    id: row.id,
    textSha256: hash(row.text),
    result: await engine.lintText(row.text, `${row.id}.md`, controller.signal)
  }))
);
let predictions;
try {
  predictions = await Promise.all(tasks);
} catch (error) {
  controller.abort(error);
  await Promise.allSettled(tasks);
  if (command === "run") {
    result.failure = error instanceof Error ? error.message : String(error);
    writeAtomicJson(output, result);
  }
  throw error;
}
const summary = {
  texts: rows.length,
  hits: 0,
  caught: 0,
  missed: 0,
  noHits: 0,
  falsePositives: 0,
  trueNegatives: 0
};
for (const [index, prediction] of predictions.entries()) {
  const row = rows[index],
    label = (row.labels ?? [row.label]).find((l) => l.check === labelId);
  const actual = prediction.result.messages.some(
    (m) => m.ruleId === `slopless/${labelId}`
  );
  if (label.expected) {
    summary.hits++;
    summary[actual ? "caught" : "missed"]++;
  } else {
    summary.noHits++;
    summary[actual ? "falsePositives" : "trueNegatives"]++;
  }
}
if (command === "replay") {
  assert.ok([...queues.values()].every((x) => x.length === 0));
  assert.deepEqual(JSON.parse(JSON.stringify(predictions)), result.predictions);
  assert.deepEqual(summary, result.summary);
} else {
  result.predictions = predictions;
  result.summary = summary;
  result.wallMs = performance.now() - started;
  result.complete = true;
  result.inferenceSha256 = hash({
    snapshot: result.snapshot,
    receipts: result.receipts,
    predictions
  });
  writeAtomicJson(output, result);
}
process.stdout.write(
  `${JSON.stringify({
    summary,
    runtimeChanged: result.snapshot.runtimeSha256 !== snapshot.runtimeSha256,
    requests: result.receipts.length,
    decisions: result.receipts.reduce(
      (n, r) => n + Object.keys(r.scores).length,
      0
    ),
    inputTokens: result.receipts.reduce((n, r) => n + r.usage.input_tokens, 0),
    outputTokens: result.receipts.reduce(
      (n, r) => n + r.usage.output_tokens,
      0
    ),
    missingUsage: result.receipts.filter(
      (r) => r.usage.input_tokens === null || r.usage.output_tokens === null
    ).length,
    wallMs: result.wallMs
  })}\n`
);
