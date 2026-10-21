import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { basename, dirname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { splitSentences } from "../dist/shared/text/sentences.js";
import { datasetHashes, documentPaths, readDocuments } from "./datasets.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const hash = (value) => createHash("sha256").update(value).digest("hex");
const read = (file) => JSON.parse(readFileSync(file, "utf8"));
const detectionQuestion =
  "Apply state.instructions and rulebook to target. Does this target paragraph contain at least one instance of TYPE? Judge only this target and this type; other target paragraphs are independent cases.";
const highlightQuestion =
  "A prior paragraph-level decision found TYPE in target. Independently judge the complete paragraph using state.instructions and rulebook. Does numbered sentence SENTENCE in sentences participate in the offending construction? Select a sentence when it contains the offending wording or supplies a necessary setup, contrast, or payoff. A sentence can participate even when it would be harmless or incomplete alone. Explanatory background that only provides context is not an offending participant. Return no if the paragraph-level finding was mistaken. Other paragraphs are independent cases.";

const defaultFamily = "semantic-thinness";
const defaultMode = "detect-and-highlight";

function validateBatchSize(batchSize) {
  assert.ok(
    Number.isSafeInteger(batchSize) && batchSize >= 1 && batchSize <= 100,
    "Batch size must be a safe integer from 1 to 100."
  );
}

function validateMode(mode) {
  assert.ok(
    [defaultMode, "classification-only"].includes(mode),
    `Unknown execution mode: ${mode}`
  );
}

/** @param {string} file @param {unknown} value */
export function writeAtomicJson(file, value) {
  const serialized = JSON.stringify(value);
  assert.equal(
    typeof serialized,
    "string",
    "Result must be JSON serializable."
  );
  const bytes = serialized + "\n";
  mkdirSync(dirname(file), { recursive: true });
  // A private directory and exclusive creation avoid following stale temporary links.
  const directory = mkdtempSync(resolve(dirname(file), ".atomic-json-"));
  try {
    const temporary = resolve(directory, "result.json");
    writeFileSync(temporary, bytes, { flag: "wx", mode: 0o600 });
    renameSync(temporary, file);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

/** Run before loading target text or initializing provider access. */
export function preflightDataset(input, { developmentOnly = false } = {}) {
  assert.equal(typeof developmentOnly, "boolean");
  const files = documentPaths(input);
  assert.ok(files.length > 0, "The dataset has no documents.");
  if (developmentOnly)
    for (const file of files) {
      const metadata = read(file.slice(0, -3) + ".labels.json");
      assert.equal(
        metadata.split,
        "development",
        `${file}: development-only mode requires split: development.`
      );
    }
  return files;
}

export function loadDataset(input, family = defaultFamily) {
  assert.match(family, /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/);
  const rows = readDocuments(input).flatMap(({ text, metadata, labels }) =>
    labels.flatMap((label) => {
      if (label.check !== family && !label.check.startsWith(`${family}/`))
        return [];
      assert.equal(typeof label.expected, "boolean");
      assert.ok(typeof label.group === "string" && label.group.length > 0);
      const target = {
        id: label.id,
        text: text.slice(label.start, label.end),
        family,
        group: label.group
      };
      assert.equal(
        label.check,
        label.expected || metadata.schemaVersion === 2
          ? `${target.family}/${target.group}`
          : target.family,
        "Jev scoring requires assigned positives and either version 2 check-specific no-hits or legacy family-wide no-hit controls."
      );
      const sentences = splitSentences(target.text).map((sentence, index) => ({
        id: index + 1,
        ...sentence
      }));
      for (const sentence of sentences)
        assert.equal(
          target.text.slice(sentence.start, sentence.end),
          sentence.text
        );
      return [{ ...target, label, sentences }];
    })
  );
  assert.ok(rows.length > 0, `The dataset has no labeled ${family} passages.`);
  assert.equal(
    new Set(rows.map((row) => row.id)).size,
    rows.length,
    "Duplicate target identifiers."
  );
  return rows.sort((a, b) => a.id.localeCompare(b.id));
}

export function loadPrompts(directory, selected) {
  const names = readdirSync(directory)
    .filter((file) => file.endsWith(".md") && file !== "shared.md")
    .map((file) => basename(file, ".md"))
    .sort();
  assert.ok(
    names.length > 0,
    "The prompt folder must contain check Markdown files."
  );
  assert.ok(
    selected === undefined || names.includes(selected),
    `Unknown check: ${selected}`
  );
  const checks = selected === undefined ? names : [selected];
  const instructions = readFileSync(
    resolve(directory, "shared.md"),
    "utf8"
  ).trim();
  assert.ok(instructions.length > 0);
  const types = Object.fromEntries(
    checks.map((check) => {
      const text = readFileSync(
        resolve(directory, `${check}.md`),
        "utf8"
      ).trim();
      assert.ok(text.length > 0);
      return [check, text];
    })
  );
  return { instructions, types };
}

export function buildRequest(model, prompts, check, items, rows) {
  const targets = new Map(rows.map((row) => [row.id, row]));
  return {
    model,
    state: {
      instructions: prompts.instructions,
      types: { [check]: prompts.types[check] }
    },
    questions: Object.fromEntries(
      items.map((item) => {
        const row = targets.get(item.id);
        assert.ok(row, `Unknown target: ${item.id}`);
        const template =
          item.sentence === undefined ? detectionQuestion : highlightQuestion;
        return [
          item.key,
          {
            type: "noul",
            instructions: {
              question: template
                .replaceAll("TYPE", JSON.stringify(check))
                .replaceAll("SENTENCE", String(item.sentence)),
              target: row.text,
              rulebook: `state.types[${JSON.stringify(check)}]`,
              ...(item.sentence === undefined
                ? {}
                : { sentences: row.sentences })
            }
          }
        ];
      })
    )
  };
}

export function validateResponse(saved, request) {
  assert.equal(
    saved.requestSha256,
    hash(JSON.stringify(request)),
    "The saved batch belongs to different inputs."
  );
  assert.ok(Number.isFinite(saved.elapsedMs) && saved.elapsedMs >= 0);
  assert.equal(saved.response.model, request.model);
  for (const name of ["input_tokens", "output_tokens"])
    assert.ok(
      Number.isSafeInteger(saved.response.usage?.[name]) &&
        saved.response.usage[name] >= 0
    );
  assert.deepEqual(
    Object.keys(saved.response.answers).sort(),
    Object.keys(request.questions).sort()
  );
  for (const answer of Object.values(saved.response.answers)) {
    assert.equal(answer.type, "noul");
    assert.ok(
      Number.isFinite(answer.noul) && answer.noul >= 0 && answer.noul <= 1
    );
  }
}

export function batchPlans(
  rows,
  checks,
  threshold,
  completed,
  mode = defaultMode,
  batchSize = 100
) {
  validateMode(mode);
  validateBatchSize(batchSize);
  const plans = [];
  for (const stage of mode === "classification-only"
    ? ["detection"]
    : ["detection", "highlighting"])
    for (const check of checks) {
      const detected = Object.assign(
        {},
        ...completed
          .filter(
            (batch) => batch.stage === "detection" && batch.check === check
          )
          .map((batch) => batch.response.answers)
      );
      const items = rows.flatMap((row) => {
        const key = `${row.id}_${check}`;
        if (stage === "detection") return [{ id: row.id, key }];
        if ((detected[key]?.noul ?? 0) < threshold) return [];
        return row.sentences.map((sentence) => ({
          id: row.id,
          key: `${key}_s${sentence.id}`,
          sentence: sentence.id
        }));
      });
      for (let start = 0; start < items.length; start += batchSize)
        plans.push({
          stage,
          check,
          index: start / batchSize + 1,
          items: items.slice(start, start + batchSize)
        });
    }
  return plans;
}

export function score(rows, checks, threshold, batches, mode = defaultMode) {
  validateMode(mode);
  const answers = Object.assign(
    {},
    ...batches.map((batch) => batch.response.answers)
  );
  return checks.map((check) => {
    const positives = rows.filter(
      (row) => row.label.expected && row.group === check
    );
    const clean = rows.filter(
      (row) =>
        !row.label.expected &&
        (row.label.check === row.family || row.group === check)
    );
    const detected = (row) => answers[`${row.id}_${check}`].noul >= threshold;
    return {
      check,
      positives: positives.length,
      caught: positives.filter(detected).length,
      misses: positives.filter((row) => !detected(row)).map((row) => row.id),
      cleanControls: clean.length,
      falseAlarms: clean.filter(detected).map((row) => row.id),
      findings: rows.filter(detected).map((row) => ({
        id: row.id,
        score: answers[`${row.id}_${check}`].noul,
        ...(mode === "classification-only"
          ? {}
          : {
              sentences: row.sentences
                .filter(
                  (sentence) =>
                    answers[`${row.id}_${check}_s${sentence.id}`].noul >=
                    threshold
                )
                .map(({ id, start, end }) => ({ id, start, end }))
            })
      }))
    };
  });
}

export function createSnapshot({
  dataset,
  promptDirectory,
  model,
  threshold,
  checks,
  prompts,
  rows,
  family = defaultFamily,
  mode = defaultMode,
  batchSize = 100
}) {
  validateMode(mode);
  validateBatchSize(batchSize);
  assert.ok(Number.isFinite(threshold) && threshold > 0 && threshold <= 1);
  assert.ok(typeof model === "string" && model.length > 0);
  assert.deepEqual(checks, Object.keys(prompts.types));
  assert.ok(rows.length > 0 && rows.every((row) => row.family === family));
  return {
    model,
    threshold,
    checks,
    family,
    mode,
    ...(batchSize === 100 ? {} : { batchSize }),
    prompts: relative(root, resolve(promptDirectory)),
    dataset: relative(root, resolve(dataset)),
    promptSha256: hash(JSON.stringify(prompts)),
    ...datasetHashes(dataset),
    targetsSha256: hash(
      JSON.stringify(
        rows.map(({ id, text, family: rowFamily, group, label }) => ({
          id,
          text,
          family: rowFamily,
          group,
          check: label.check,
          start: label.start,
          end: label.end
        }))
      )
    )
  };
}

function normalizedSnapshot(snapshot) {
  const batchSize = snapshot.batchSize === undefined ? 100 : snapshot.batchSize;
  validateBatchSize(batchSize);
  return {
    ...snapshot,
    family: snapshot.family ?? defaultFamily,
    mode: snapshot.mode ?? defaultMode,
    batchSize
  };
}

function validateSaved(result, { snapshot, rows, prompts }, allowLabelChanges) {
  const saved = normalizedSnapshot(result.snapshot);
  const current = normalizedSnapshot(snapshot);
  if (allowLabelChanges) {
    assert.ok(
      saved.targetsSha256,
      "Rescore requires a recorded target identity hash."
    );
    saved.labelsSha256 = current.labelsSha256;
  } else if (saved.targetsSha256 === undefined) {
    // Legacy requests still verify the exact targets and identifiers below.
    delete current.targetsSha256;
  }
  assert.deepEqual(
    saved,
    current,
    "Saved results require the same prompts, dataset, checks, model, threshold, family, mode, and target assignments. Choose a new output for changed inputs."
  );
  assert.equal(snapshot.promptSha256, hash(JSON.stringify(prompts)));
  assert.ok(Array.isArray(result.batches));
  const { model, threshold, checks, mode, batchSize } = current;
  const planned = batchPlans(
    rows,
    checks,
    threshold,
    result.batches,
    mode,
    batchSize
  );
  assert.ok(result.batches.length <= planned.length);
  for (const [index, batch] of result.batches.entries()) {
    const plan = planned[index];
    assert.deepEqual(
      [batch.stage, batch.check, batch.index],
      [plan.stage, plan.check, plan.index]
    );
    validateResponse(
      batch,
      buildRequest(model, prompts, plan.check, plan.items, rows)
    );
  }
  if (result.inferenceSha256 !== undefined)
    assert.equal(
      result.inferenceSha256,
      hash(
        JSON.stringify({ batches: result.batches, summaries: result.summaries })
      ),
      "Saved predictions or original scores changed."
    );
  return { complete: result.batches.length === planned.length };
}

export function validateResult(result, context) {
  return validateSaved(result, context, false);
}

export function rescoreResult(result, context) {
  assert.ok(
    validateSaved(result, context, true).complete,
    "Rescore requires complete predictions."
  );
  assert.ok(
    result.inferenceSha256 && Array.isArray(result.summaries),
    "Rescore requires preserved original predictions and summaries."
  );
  const { snapshot, rows, prompts } = context;
  // Bind caller-supplied context to the current disk inputs, including assignments.
  assert.deepEqual(
    rows,
    loadDataset(resolve(root, snapshot.dataset), snapshot.family)
  );
  assert.deepEqual(
    createSnapshot({
      ...snapshot,
      dataset: resolve(root, snapshot.dataset),
      promptDirectory: resolve(root, snapshot.prompts),
      rows,
      prompts
    }),
    snapshot
  );
  const updated = structuredClone(result);
  updated.rescores ??= [];
  updated.rescores.push({
    recordedAt: new Date().toISOString(),
    originalLabelsSha256: result.snapshot.labelsSha256,
    rescoredLabelsSha256: snapshot.labelsSha256,
    inferenceSha256: result.inferenceSha256,
    summaries: score(
      rows,
      snapshot.checks,
      snapshot.threshold,
      result.batches,
      snapshot.mode
    )
  });
  return updated;
}

function credential() {
  if (process.env.JEV_API_KEY) return process.env.JEV_API_KEY;
  const token = execFileSync(
    "/usr/bin/security",
    [
      "find-generic-password",
      "-s",
      "codex.agent-1password.api-reader",
      "-a",
      "api-reader",
      "-w"
    ],
    { encoding: "utf8" }
  ).trim();
  assert.ok(token);
  const env = {
    ...process.env,
    OP_SERVICE_ACCOUNT_TOKEN: token,
    OP_BIOMETRIC_UNLOCK_ENABLED: "false"
  };
  delete env.OP_CONNECT_HOST;
  delete env.OP_CONNECT_TOKEN;
  return execFileSync(
    "op",
    [
      "read",
      "op://2w4dmxssqydex4p4t5k72cnnja/k7cwlx2niy42tl3j3gqlueejzu/credential"
    ],
    { env, encoding: "utf8" }
  ).trim();
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      help: { type: "boolean" },
      prompts: { type: "string", default: "prompts/v1" },
      dataset: {
        type: "string",
        default: "datasets/ai-synthetic/semantic-thinness.md"
      },
      check: { type: "string" },
      family: { type: "string", default: defaultFamily },
      mode: { type: "string", default: defaultMode },
      "development-only": { type: "boolean", default: false },
      "batch-size": { type: "string", default: "100" },
      output: { type: "string" },
      model: { type: "string", default: "jev-1.13.0" },
      threshold: { type: "string", default: "0.5" },
      sdk: { type: "string" }
    }
  });
  if (values.help) {
    console.log(
      "node runners/jev.mjs <validate|score|rescore|run> [--prompts prompts/v1] [--dataset PATH] [--family semantic-thinness] [--mode detect-and-highlight|classification-only] [--development-only] [--batch-size 100] [--check NAME] [--output FILE] [--model jev-1.13.0] [--threshold 0.5] [--sdk PATH]\nThe dataset is Markdown with matching .labels.json. Paths are relative to the current directory. validate checks inputs and any supplied output offline. score requires a complete output. rescore appends label-only corrected summaries offline, preserving original results. run calls Jev and resumes the chosen output file. development-only checks every collection's split metadata before loading text or initializing provider access. Batch size is a frozen integer from 1 to 100, defaulting to 100; complete targets remain intact. All checks evaluate every labeled passage independently; scoring uses assigned positives, check-specific no-hits, and legacy family-wide clean controls. Only text and target identifiers enter model requests. Save outputs under runners/results, outside datasets and prompts. SDK defaults to the pinned @typesafe-ai/sdk development dependency; JEV_API_KEY or the approved 1Password entry supplies credentials."
    );
    return;
  }
  const [command] = positionals;
  assert.ok(
    positionals.length === 1 &&
      ["validate", "score", "rescore", "run"].includes(command),
    "Use --help for commands."
  );
  assert.ok(command === "validate" || values.output, "--output is required.");
  const threshold = Number(values.threshold);
  assert.ok(Number.isFinite(threshold) && threshold > 0 && threshold <= 1);
  const batchSize = Number(values["batch-size"]);
  validateBatchSize(batchSize);
  const dataset = resolve(values.dataset);
  const promptDirectory = resolve(values.prompts);
  const family = values.family;
  const mode = values.mode;
  validateMode(mode);
  const file = values.output && resolve(values.output);
  const outputSeparate =
    !file ||
    ([resolve(root, "datasets"), promptDirectory, dataset].every(
      (input) => file !== input && !file.startsWith(input + "/")
    ) &&
      file !== dataset.slice(0, -3) + ".labels.json");
  const retained =
    outputSeparate && file && existsSync(file) ? read(file) : undefined;
  if (retained !== undefined) {
    assert.ok(
      retained !== null &&
        typeof retained === "object" &&
        !Array.isArray(retained),
      "Saved result must be a non-null JSON object."
    );
    const savedBatchSize =
      retained.snapshot?.batchSize === undefined
        ? 100
        : retained.snapshot.batchSize;
    validateBatchSize(savedBatchSize);
    assert.equal(
      savedBatchSize,
      batchSize,
      "Saved results require the same batch size."
    );
  }
  preflightDataset(dataset, { developmentOnly: values["development-only"] });
  assert.ok(
    command === "run" || !file || existsSync(file),
    "The selected output file does not exist."
  );
  assert.ok(outputSeparate, "Output must be separate from inputs.");
  const rows = loadDataset(dataset, family);
  const prompts = loadPrompts(promptDirectory, values.check);
  const checks = Object.keys(prompts.types);
  for (const check of checks)
    assert.ok(
      rows.some((row) => row.group === check),
      `The dataset has no group for check: ${check}`
    );
  const snapshot = createSnapshot({
    dataset,
    promptDirectory,
    model: values.model,
    threshold,
    checks,
    prompts,
    rows,
    family,
    mode,
    batchSize
  });
  let result = retained === undefined ? { snapshot, batches: [] } : retained;
  const save = () => writeAtomicJson(file, result);
  const context = { snapshot, rows, prompts };
  if (command === "rescore") {
    result = rescoreResult(result, context);
    save();
  } else validateResult(result, context);
  let client;
  let apiKey;
  if (command === "run") {
    for (;;) {
      const plan = batchPlans(
        rows,
        checks,
        threshold,
        result.batches,
        mode,
        batchSize
      )[result.batches.length];
      if (!plan) break;
      if (!client) {
        const { TypeSafeClient } = await import(
          values.sdk
            ? pathToFileURL(resolve(values.sdk)).href
            : "@typesafe-ai/sdk"
        );
        apiKey = credential();
        client = new TypeSafeClient({
          apiKey,
          baseURL: "https://api.typesafe.ai",
          logLevel: "off",
          timeout: 120000,
          retry: { maxRetries: 0 }
        });
      }
      const request = buildRequest(
        values.model,
        prompts,
        plan.check,
        plan.items,
        rows
      );
      const started = performance.now();
      let response;
      try {
        response = await client.systemOne(request);
      } catch (error) {
        throw new Error(String(error.message).replaceAll(apiKey, "[REDACTED]"));
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
      save();
    }
  }
  const complete =
    result.batches.length ===
    batchPlans(rows, checks, threshold, result.batches, mode, batchSize).length;
  if (command !== "validate")
    assert.ok(complete, "The output is incomplete; use run to resume it.");
  if (command === "run" && result.summaries === undefined) {
    result.summaries = score(rows, checks, threshold, result.batches, mode);
    result.inferenceSha256 = hash(
      JSON.stringify({ batches: result.batches, summaries: result.summaries })
    );
    save();
  }
  console.log(
    JSON.stringify(
      {
        paragraphs: rows.length,
        checks,
        family,
        mode,
        complete,
        requests: result.batches.length,
        ...(complete
          ? {
              summaries:
                command === "rescore"
                  ? result.rescores.at(-1).summaries
                  : score(rows, checks, threshold, result.batches, mode),
              ...(command === "rescore"
                ? { rescoredLabelsSha256: snapshot.labelsSha256 }
                : {}),
              requestMs: result.batches.reduce(
                (sum, batch) => sum + batch.elapsedMs,
                0
              ),
              decisions: result.batches.reduce(
                (sum, batch) =>
                  sum + Object.keys(batch.response.answers).length,
                0
              )
            }
          : {})
      },
      null,
      2
    )
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  await main();
