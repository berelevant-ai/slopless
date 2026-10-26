import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import pLimit from "p-limit";
import { createSlopless, createJevClient, listChecks } from "../dist/index.js";
import { loadDataset, preflightDataset, writeAtomicJson } from "./jev.mjs";

const { values } = parseArgs({
  options: {
    dataset: { type: "string", multiple: true },
    check: { type: "string", multiple: true },
    output: { type: "string" }
  }
});
const files = values.dataset ?? [],
  checks = values.check ?? [];
assert.ok(files.length > 0 && checks.length > 1 && values.output);
const output = resolve(values.output);
assert.ok(output.startsWith(resolve("runners/results") + "/"));
assert.ok(!existsSync(output), "Use a new output path.");
for (const file of files) preflightDataset(file, { developmentOnly: true });
const definitions = checks.map((id) =>
  listChecks().find((check) => check.id === id)
);
assert.ok(
  definitions.every(
    (check) => check?.backend === "jev" && check.input === "paragraph"
  )
);
assert.ok(new Set(checks).size === checks.length);
const hash = (value) => createHash("sha256").update(value).digest("hex");
const rows = files.flatMap((file) => {
  const labels = JSON.parse(
    readFileSync(file.slice(0, -3) + ".labels.json", "utf8")
  );
  const families = [
    ...new Set(labels.labels.map((label) => label.check.split("/")[0]))
  ];
  assert.equal(
    families.length,
    1,
    "Each comparison file must name one family."
  );
  const [family] = families;
  return loadDataset(file, family).map((row) => ({ ...row, file }));
});
for (const row of rows) {
  const labels = row.labels ?? [row.label];
  assert.ok(
    labels.every((label) => checks.includes(label.check.replace("/", ":")))
  );
}
const result = {
  complete: false,
  snapshot: {
    checks: definitions,
    inputs: files.map((file) => ({
      file,
      sourceSha256: hash(readFileSync(file)),
      labelsSha256: hash(readFileSync(file.slice(0, -3) + ".labels.json"))
    })),
    modules: readdirSync("dist", { recursive: true })
      .filter((name) => /\.(js|md|json)$/.test(name))
      .sort()
      .map((name) => ({
        file: name,
        sha256: hash(readFileSync(resolve("dist", name)))
      })),
    sdkVersion: JSON.parse(
      readFileSync("node_modules/@typesafe-ai/sdk/package.json", "utf8")
    ).version,
    dependenciesSha256: hash(readFileSync("pnpm-lock.yaml")),
    client: { concurrency: 6, retries: 0, timeoutMs: 120000 }
  },
  receipts: [],
  predictions: []
};
const client = createJevClient({
  apiKey: process.env.JEV_API_KEY ?? "",
  ...result.snapshot.client,
  onResponse: (receipt) => result.receipts.push(structuredClone(receipt))
});
const engines = {
  combined: [createSlopless({ checks, jev: client })],
  separate: checks.map((id) => createSlopless({ checks: [id], jev: client }))
};
const limit = pLimit(6),
  controller = new AbortController();
const started = performance.now();
writeAtomicJson(output, result);
const tasks = rows.flatMap((row, index) => {
  const modes =
    index % 2 === 0 ? ["combined", "separate"] : ["separate", "combined"];
  return modes.map((mode) =>
    limit(async () => {
      const reports = await Promise.all(
        engines[mode].map((engine) =>
          engine.lintText(row.text, `${row.id}.md`, controller.signal)
        )
      );
      const prediction = {
        id: row.id,
        file: row.file,
        mode,
        findings: reports.flatMap((report) => report.messages)
      };
      result.predictions.push(prediction);
      if (result.predictions.length % 25 === 0) writeAtomicJson(output, result);
      return prediction;
    })
  );
});
try {
  await Promise.all(tasks);
} catch (error) {
  controller.abort(error);
  await Promise.allSettled(tasks);
  result.failure = error instanceof Error ? error.message : String(error);
  writeAtomicJson(output, result);
  throw error;
}
const canonical = (prediction) =>
  prediction.findings
    .map(({ ruleId, range }) => ({ ruleId, range }))
    .sort(
      (a, b) => a.range[0] - b.range[0] || a.ruleId.localeCompare(b.ruleId)
    );
const scores = { combined: {}, separate: {} },
  changes = [];
for (const row of rows) {
  const predictions = Object.fromEntries(
    ["combined", "separate"].map((mode) => [
      mode,
      result.predictions.find(
        (prediction) =>
          prediction.file === row.file &&
          prediction.id === row.id &&
          prediction.mode === mode
      )
    ])
  );
  if (
    JSON.stringify(canonical(predictions.combined)) !==
    JSON.stringify(canonical(predictions.separate))
  )
    changes.push({
      file: row.file,
      id: row.id,
      combined: canonical(predictions.combined),
      separate: canonical(predictions.separate)
    });
  for (const mode of ["combined", "separate"]) {
    for (const label of row.labels ?? [row.label]) {
      const summary = (scores[mode][label.check] ??= {
        hits: 0,
        caught: 0,
        missed: 0,
        noHits: 0,
        falsePositives: 0,
        trueNegatives: 0
      });
      const caught = predictions[mode].findings.some(
        (finding) => finding.ruleId === `slopless/${label.check}`
      );
      summary[label.expected ? "hits" : "noHits"]++;
      summary[
        label.expected
          ? caught
            ? "caught"
            : "missed"
          : caught
            ? "falsePositives"
            : "trueNegatives"
      ]++;
    }
  }
}
result.summary = {
  examples: rows.length,
  checks: checks.length,
  scores,
  changedExamples: changes.length,
  changes,
  requests: result.receipts.length,
  decisions: result.receipts.reduce(
    (n, receipt) => n + Object.keys(receipt.scores).length,
    0
  ),
  inputTokens: result.receipts.reduce(
    (n, receipt) => n + (receipt.usage.input_tokens ?? 0),
    0
  ),
  wallMs: performance.now() - started
};
result.complete = true;
writeAtomicJson(output, result);
process.stdout.write(`${JSON.stringify(result.summary)}\n`);
