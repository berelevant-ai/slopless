import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  writeFileSync
} from "node:fs";
import { basename, dirname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { splitSentences } from "../dist/shared/text/sentences.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const hash = (value) => createHash("sha256").update(value).digest("hex");
const read = (file) => JSON.parse(readFileSync(file, "utf8"));
const detectionQuestion =
  "Apply state.instructions and rulebook to target. Does this target paragraph contain at least one instance of TYPE? Judge only this target and this type; other target paragraphs are independent cases.";
const highlightQuestion =
  "A prior paragraph-level decision found TYPE in target. Independently judge the complete paragraph using state.instructions and rulebook. Does numbered sentence SENTENCE in sentences participate in the offending construction? Select a sentence when it contains the offending wording or supplies a necessary setup, contrast, or payoff. A sentence can participate even when it would be harmless or incomplete alone. Explanatory background that only provides context is not an offending participant. Return no if the paragraph-level finding was mistaken. Other paragraphs are independent cases.";

export function loadDataset(directory) {
  const targets = read(resolve(directory, "paragraphs.json"));
  const labels = read(resolve(directory, "labels.json"));
  assert.equal(targets.schemaVersion, 1);
  assert.equal(labels.schemaVersion, 1);
  assert.ok(typeof targets.family === "string" && targets.family.length > 0);
  assert.equal(targets.family, labels.family);
  assert.ok(Array.isArray(targets.groups) && targets.groups.length > 0);
  assert.ok(
    targets.groups.every(
      (group) => typeof group === "string" && group.length > 0
    )
  );
  const groups = new Set(targets.groups);
  assert.equal(groups.size, targets.groups.length);
  assert.ok(Array.isArray(targets.paragraphs) && targets.paragraphs.length > 0);
  assert.ok(Array.isArray(labels.labels));
  assert.deepEqual(
    targets.paragraphs.map((row) => row.id).sort(),
    labels.labels.map((row) => row.id).sort()
  );
  assert.equal(
    new Set(targets.paragraphs.map((row) => row.id)).size,
    targets.paragraphs.length
  );
  const expected = new Map(labels.labels.map((row) => [row.id, row]));
  return targets.paragraphs
    .map((target) => {
      assert.equal(typeof target.id, "string");
      assert.equal(typeof target.text, "string");
      assert.ok(target.text.trim().length > 0);
      assert.equal(target.family, targets.family);
      assert.equal(typeof target.group, "string");
      assert.ok(
        groups.has(target.group),
        `Unknown dataset group: ${target.group}`
      );
      const label = expected.get(target.id);
      assert.equal(typeof label.expected, "boolean");
      assert.ok(Array.isArray(label.evidence));
      assert.ok(
        label.evidence.every(
          (span) =>
            typeof span === "string" &&
            span.length > 0 &&
            target.text.includes(span)
        )
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
      return { ...target, label, sentences };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
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

function batchPlans(rows, checks, threshold, completed) {
  const plans = [];
  for (const stage of ["detection", "highlighting"])
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
      for (let start = 0; start < items.length; start += 100)
        plans.push({
          stage,
          check,
          index: start / 100 + 1,
          items: items.slice(start, start + 100)
        });
    }
  return plans;
}

function score(rows, checks, threshold, batches) {
  const answers = Object.assign(
    {},
    ...batches.map((batch) => batch.response.answers)
  );
  return checks.map((check) => {
    const positives = rows.filter(
      (row) => row.label.expected && row.group === check
    );
    const clean = rows.filter((row) => !row.label.expected);
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
        sentences: row.sentences
          .filter(
            (sentence) =>
              answers[`${row.id}_${check}_s${sentence.id}`].noul >= threshold
          )
          .map(({ id, start, end }) => ({ id, start, end }))
      }))
    };
  });
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
        default: "datasets/holdout/semantic-thinness"
      },
      check: { type: "string" },
      output: { type: "string" },
      model: { type: "string", default: "jev-1.13.0" },
      threshold: { type: "string", default: "0.5" },
      sdk: { type: "string" }
    }
  });
  if (values.help) {
    console.log(
      "node runners/jev.mjs <validate|score|run> [--prompts prompts/v1] [--dataset datasets/holdout/semantic-thinness] [--check NAME] [--output FILE] [--model jev-1.13.0] [--threshold 0.5] [--sdk PATH]\nPaths are relative to the current directory. validate checks inputs and any supplied output offline. score requires a complete output. run calls Jev and resumes the chosen output file. All checks evaluate every paragraph; scoring uses assigned positives and all family-clean controls. SDK defaults to the existing local Jev installation; JEV_API_KEY or the approved 1Password entry supplies credentials."
    );
    return;
  }
  const [command] = positionals;
  assert.ok(
    positionals.length === 1 && ["validate", "score", "run"].includes(command),
    "Use --help for commands."
  );
  assert.ok(command === "validate" || values.output, "--output is required.");
  const threshold = Number(values.threshold);
  assert.ok(Number.isFinite(threshold) && threshold > 0 && threshold <= 1);
  const dataset = resolve(values.dataset);
  const promptDirectory = resolve(values.prompts);
  const rows = loadDataset(dataset);
  const prompts = loadPrompts(promptDirectory, values.check);
  const checks = Object.keys(prompts.types);
  for (const check of checks)
    assert.ok(
      rows.some((row) => row.group === check),
      `The dataset has no group for check: ${check}`
    );
  const snapshot = {
    model: values.model,
    threshold,
    checks,
    prompts: relative(root, promptDirectory),
    dataset: relative(root, dataset),
    promptSha256: hash(JSON.stringify(prompts)),
    paragraphsSha256: hash(readFileSync(resolve(dataset, "paragraphs.json"))),
    labelsSha256: hash(readFileSync(resolve(dataset, "labels.json")))
  };
  const file = values.output && resolve(values.output);
  assert.ok(
    command === "run" || !file || existsSync(file),
    "The selected output file does not exist."
  );
  assert.ok(
    !file ||
      ![
        resolve(dataset, "paragraphs.json"),
        resolve(dataset, "labels.json"),
        ...readdirSync(promptDirectory).map((name) =>
          resolve(promptDirectory, name)
        )
      ].includes(file),
    "Output must be separate from inputs."
  );
  const result =
    file && existsSync(file) ? read(file) : { snapshot, batches: [] };
  assert.deepEqual(
    result.snapshot,
    snapshot,
    "Saved results require the same prompts, dataset, checks, model, and threshold. Choose a new output for changed inputs."
  );
  assert.ok(Array.isArray(result.batches));
  const save = () => {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(`${file}.tmp`, JSON.stringify(result) + "\n");
    renameSync(`${file}.tmp`, file);
  };
  const planned = batchPlans(rows, checks, threshold, result.batches);
  assert.ok(result.batches.length <= planned.length);
  for (const [index, batch] of result.batches.entries()) {
    const plan = planned[index];
    assert.deepEqual(
      [batch.stage, batch.check, batch.index],
      [plan.stage, plan.check, plan.index]
    );
    validateResponse(
      batch,
      buildRequest(values.model, prompts, plan.check, plan.items, rows)
    );
  }
  let client;
  let apiKey;
  if (command === "run") {
    for (;;) {
      const plan = batchPlans(rows, checks, threshold, result.batches)[
        result.batches.length
      ];
      if (!plan) break;
      if (!client) {
        const { TypeSafeClient } = await import(
          pathToFileURL(
            resolve(
              values.sdk ??
                resolve(
                  root,
                  ".fixture3/jev-paragraph-probe/node_modules/@typesafe-ai/sdk/dist/index.mjs"
                )
            )
          )
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
    batchPlans(rows, checks, threshold, result.batches).length;
  if (command !== "validate")
    assert.ok(complete, "The output is incomplete; use run to resume it.");
  console.log(
    JSON.stringify(
      {
        paragraphs: rows.length,
        checks,
        complete,
        requests: result.batches.length,
        ...(complete
          ? {
              summaries: score(rows, checks, threshold, result.batches),
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
