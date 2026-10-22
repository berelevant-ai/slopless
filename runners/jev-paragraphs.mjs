import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { loadTextlintrc } from "textlint";
import {
  batchPlans,
  buildRequest,
  createSnapshot,
  loadDataset,
  loadPrompts,
  score,
  scoreMixed,
  validateResponse,
  validateResult,
  writeAtomicJson
} from "./jev.mjs";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const read = (file) => JSON.parse(readFileSync(file, "utf8"));
const checks = ["redundancy", "wordiness"];
const markdownPlugin = (await loadTextlintrc())
  .toKernelOptions()
  .plugins.find(
    (plugin) => plugin.pluginId === "@textlint/textlint-plugin-markdown"
  );
assert.ok(markdownPlugin);
const markdown = new markdownPlugin.plugin.Processor().processor(".md");

const predictionHash = (result) =>
  hash(
    JSON.stringify({
      snapshot: result.snapshot,
      targets: result.targets,
      batches: result.batches,
      assessment: result.assessment,
      sealedFromCommit: result.sealedFromCommit
    })
  );

export function validateSeal(result) {
  assert.equal(
    result.inferenceSha256,
    predictionHash(result),
    "Saved paragraph predictions changed"
  );
}

// This experiment accepts the frozen collection's plain paragraphs and headings.
export function paragraphTargets(rows) {
  return rows.flatMap((row) => {
    const ast = markdown.preProcess(row.text);
    assert.equal(ast.type, "Document");
    const ranges = [];
    let headingStart;
    for (const node of ast.children) {
      assert.ok(
        ["Paragraph", "Header"].includes(node.type),
        `${row.id}: unsupported Markdown block structure ${node.type}`
      );
      if (node.type === "Header") {
        assert.match(
          row.text.slice(...node.range),
          /^#{1,6}\s+\S/,
          `${row.id}: unsupported Markdown heading`
        );
        headingStart ??= node.range[0];
        continue;
      }
      ranges.push({
        start: headingStart ?? node.range[0],
        end: node.range[1]
      });
      headingStart = undefined;
    }
    if (headingStart !== undefined)
      ranges.push({ start: headingStart, end: row.text.length });
    assert.ok(ranges.length > 0, `${row.id}: empty input`);
    return ranges.map(({ start, end }, index) => ({
      id: `${row.id}-p${String(index + 1).padStart(3, "0")}`,
      parentId: row.id,
      start,
      end,
      text: row.text.slice(start, end)
    }));
  });
}

export function aggregate(rows, targets, baseline, batches) {
  const answers = Object.assign(
    {},
    ...batches.map((batch) => batch.response.answers)
  );
  const combined = Object.assign(
    {},
    ...baseline.batches.map((batch) => batch.response.answers)
  );
  const changes = [];
  const boundaryLosses = [];
  for (const row of rows) {
    const passages = targets.filter((target) => target.parentId === row.id);
    assert.ok(passages.length > 0);
    for (const check of checks) {
      const key = `${row.id}_${check}`;
      const values = passages.map(
        (passage) => answers[`${passage.id}_${check}`]?.noul
      );
      assert.ok(
        values.every(
          (value) => Number.isFinite(value) && value >= 0 && value <= 1
        )
      );
      const value = Math.max(...values);
      const label = (row.labels ?? [row.label]).find(
        (item) => item.group === check
      );
      assert.ok(label);
      const before = combined[key].noul >= baseline.snapshot.threshold;
      const after = value >= baseline.snapshot.threshold;
      if (before !== after)
        changes.push({
          id: row.id,
          check,
          expected: label.expected,
          before: combined[key].noul,
          after: value,
          kind: label.expected
            ? after
              ? "newCatch"
              : "lostCatch"
            : after
              ? "newFalsePositive"
              : "correctedFalsePositive"
        });
      if (
        label.expected &&
        !passages.some((passage) =>
          label.evidence.every((snippet) => passage.text.includes(snippet))
        )
      ) {
        boundaryLosses.push({ id: row.id, check });
      }
      combined[key] = { type: "noul", noul: value };
    }
  }
  const combinedBatches = [
    { stage: "detection", response: { answers: combined } }
  ];
  return {
    summaries: score(
      rows,
      baseline.snapshot.checks,
      baseline.snapshot.threshold,
      combinedBatches,
      "classification-only"
    ),
    mixed: scoreMixed(
      rows,
      baseline.snapshot.checks,
      baseline.snapshot.threshold,
      combinedBatches
    ),
    changes,
    boundaryLosses
  };
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      baseline: { type: "string" },
      output: { type: "string" },
      help: { type: "boolean" },
      archive: { type: "string" }
    }
  });
  if (values.help) {
    console.log(
      "node runners/jev-paragraphs.mjs <validate|run|score|seal> --baseline FILE --output FILE [--archive COMMIT]\nJudge wordiness and redundancy per plain paragraph, joining heading/opening blocks. Aggregate by any positive paragraph and reuse whole-text repeated-explanation answers. Keeps original labels; run requires JEV_API_KEY. validate and score are offline. seal migrates an unsealed complete result only after exact comparison with its archived Git result and producing source. Unsupported Markdown blocks fail before inference."
    );
    return;
  }
  const [command] = positionals;
  assert.ok(
    positionals.length === 1 &&
      ["validate", "run", "score", "seal"].includes(command)
  );
  assert.ok(values.baseline && values.output);
  const baseline = read(values.baseline);
  assert.equal(baseline.snapshot.family, "wordiness-and-redundancy");
  assert.equal(baseline.snapshot.mode, "classification-only");
  assert.deepEqual(baseline.snapshot.checks, [
    "redundancy",
    "repeated-explanation",
    "wordiness"
  ]);
  const { snapshot: saved } = baseline;
  const rows = loadDataset(saved.dataset, saved.family);
  const prompts = loadPrompts(saved.prompts);
  const snapshot = createSnapshot({
    ...saved,
    promptDirectory: saved.prompts,
    rows,
    prompts,
    batchSize: saved.batchSize ?? 100
  });
  assert.ok(validateResult(baseline, { snapshot, rows, prompts }).complete);
  assert.equal(saved.batchSize, 16);
  const targets = paragraphTargets(rows);
  const plans = batchPlans(
    targets,
    checks,
    saved.threshold,
    [],
    "classification-only",
    16
  );
  const output = resolve(values.output);
  for (const input of [
    values.baseline,
    saved.dataset,
    saved.dataset.replace(/\.md$/, ".labels.json")
  ])
    assert.notEqual(output, resolve(input));
  for (const directory of ["datasets", "prompts"])
    assert.ok(!output.startsWith(resolve(directory) + "/"));
  const binding = {
    ...snapshot,
    input: "paragraphs-heading-opening",
    baselineSha256: hash(readFileSync(values.baseline)),
    runnerSha256: hash(readFileSync(fileURLToPath(import.meta.url))),
    paragraphTargetsSha256: hash(JSON.stringify(targets))
  };
  const result = existsSync(output)
    ? read(output)
    : { snapshot: binding, targets, batches: [] };
  if (command === "run") assert.deepEqual(result.snapshot, binding);
  else {
    const { runnerSha256: producer, ...savedBinding } = result.snapshot;
    const { runnerSha256: verifier, ...currentBinding } = binding;
    assert.match(producer, /^[a-f0-9]{64}$/);
    assert.match(verifier, /^[a-f0-9]{64}$/);
    assert.deepEqual(savedBinding, currentBinding);
  }
  assert.deepEqual(result.targets, targets);
  assert.ok(
    Array.isArray(result.batches) && result.batches.length <= plans.length
  );
  const requestFor = (plan) =>
    buildRequest(saved.model, prompts, plan.check, plan.items, targets);
  for (const [index, batch] of result.batches.entries()) {
    const plan = plans[index];
    assert.deepEqual(
      [batch.stage, batch.check, batch.index],
      [plan.stage, plan.check, plan.index]
    );
    validateResponse(batch, requestFor(plan));
  }
  if (command === "run") {
    assert.ok(process.env.JEV_API_KEY, "JEV_API_KEY is required for run");
    const { TypeSafeClient } = await import("@typesafe-ai/sdk");
    const client = new TypeSafeClient({
      apiKey: process.env.JEV_API_KEY,
      baseURL: "https://api.typesafe.ai",
      logLevel: "off",
      timeout: 120000,
      retry: { maxRetries: 0 }
    });
    for (const plan of plans.slice(result.batches.length)) {
      const request = requestFor(plan);
      const started = performance.now();
      let response;
      try {
        response = await client.systemOne(request);
      } catch (error) {
        throw new Error(
          String(error.message).replaceAll(
            process.env.JEV_API_KEY,
            "[REDACTED]"
          )
        );
      }
      const batch = {
        stage: plan.stage,
        check: plan.check,
        index: plan.index,
        recordedAt: new Date().toISOString(),
        requestSha256: hash(JSON.stringify(request)),
        elapsedMs: performance.now() - started,
        response
      };
      validateResponse(batch, request);
      result.batches.push(batch);
      writeAtomicJson(output, result);
    }
  }
  const complete = result.batches.length === plans.length;
  if (command !== "validate")
    assert.ok(complete, "Incomplete evaluation; use run to resume");
  if (complete) {
    const assessment = aggregate(rows, targets, baseline, result.batches);
    if (result.assessment) assert.deepEqual(result.assessment, assessment);
    else if (command === "run") {
      result.assessment = assessment;
      result.inferenceSha256 = predictionHash(result);
      writeAtomicJson(output, result);
    }
    if (command === "seal") {
      assert.ok(!result.inferenceSha256, "Result is already sealed");
      assert.match(
        values.archive ?? "",
        /^[a-f0-9]{40}$/,
        "seal requires the full archive commit"
      );
      const archived = execFileSync("git", [
        "show",
        `${values.archive}:${relative(process.cwd(), output)}`
      ]);
      assert.ok(
        archived.equals(readFileSync(output)),
        "Result differs from the archived original"
      );
      const producer = execFileSync("git", [
        "show",
        `${values.archive}:runners/jev-paragraphs.mjs`
      ]);
      assert.equal(
        hash(producer),
        result.snapshot.runnerSha256,
        "Producing runner differs from archive"
      );
      result.sealedFromCommit = values.archive;
      result.inferenceSha256 = predictionHash(result);
      writeAtomicJson(output, result);
    }
    validateSeal(result);
    console.log(
      JSON.stringify({
        complete,
        texts: rows.length,
        paragraphs: targets.length,
        requests: plans.length,
        summaries: assessment.summaries.map(
          ({ findings, misses, falseAlarms, ...rest }) => ({
            ...rest,
            missed: misses.length,
            falsePositives: falseAlarms.length
          })
        ),
        mixed: assessment.mixed,
        changes: assessment.changes.reduce(
          (counts, item) => ({
            ...counts,
            [`${item.check}/${item.kind}`]:
              (counts[`${item.check}/${item.kind}`] ?? 0) + 1
          }),
          {}
        ),
        boundaryLosses: assessment.boundaryLosses
      })
    );
  } else
    console.log(
      JSON.stringify({
        complete,
        texts: rows.length,
        paragraphs: targets.length,
        plannedRequests: plans.length
      })
    );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
