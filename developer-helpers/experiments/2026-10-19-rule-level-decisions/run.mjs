import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { splitSentences } from "../../../dist/shared/text/sentences.js";

assert.ok(process.argv[3] === undefined || process.argv[3] === "isolated", "The optional format is isolated.");
const isolated = process.argv[3] === "isolated";
const originalDirectory = dirname(fileURLToPath(import.meta.url));
const directory = isolated ? resolve(originalDirectory, "isolated") : originalDirectory;
const root = resolve(originalDirectory, "../../..");
const dataset = resolve(root, "datasets/holdout/semantic-thinness");
const read = (file) => JSON.parse(readFileSync(resolve(directory, file), "utf8"));
const hash = (text) => createHash("sha256").update(text).digest("hex");
const save = (file, value) => {
  mkdirSync(dirname(resolve(directory, file)), { recursive: true });
  writeFileSync(resolve(directory, file), JSON.stringify(value, null, 2) + "\n");
};
const criteriaFile = resolve(originalDirectory, "criteria.json");
const criteria = JSON.parse(readFileSync(criteriaFile, "utf8"));
const types = Object.keys(criteria.types);
const baselineFile = "developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout-comparison/results.json";
const comparisonFile = "developer-helpers/experiments/2026-10-19-rule-level-decisions/results.json";

function baselineSnapshot(sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim(), file = baselineFile) {
  const sha256 = hash(readFileSync(resolve(root, file)));
  assert.equal(sha256, hash(execFileSync("git", ["show", `${sourceCommit}:${file}`], { cwd: root, maxBuffer: 1024 * 1024 })));
  return { file, sourceCommit, sha256 };
}

function records() {
  const rows = [];
  const hashes = {};
  for (const folder of readdirSync(dataset, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    const file = resolve(dataset, folder.name, "paragraphs.json");
    if (!existsSync(file)) continue;
    const targets = JSON.parse(readFileSync(file, "utf8"));
    const labelsFile = resolve(dataset, folder.name, "labels.json");
    const labels = JSON.parse(readFileSync(labelsFile, "utf8"));
    assert.deepEqual(targets.paragraphs.map((row) => row.id), labels.labels.map((row) => row.id));
    for (const [index, target] of targets.paragraphs.entries()) {
      assert.deepEqual(Object.keys(target).sort(), ["id", "text"]);
      const sentences = splitSentences(target.text).map((sentence, i) => ({ id: i + 1, ...sentence }));
      for (const sentence of sentences) assert.equal(target.text.slice(sentence.start, sentence.end), sentence.text);
      const label = labels.labels[index];
      assert.equal(typeof label.expected, "boolean");
      assert.ok(label.evidence.every((span) => target.text.includes(span)));
      rows.push({ ...target, ...label, group: folder.name, sentences });
    }
    for (const path of [file, labelsFile]) hashes[path.slice(root.length + 1)] = hash(readFileSync(path));
  }
  rows.sort((a, b) => a.id.localeCompare(b.id));
  assert.equal(rows.length, 604);
  assert.equal(new Set(rows.map((row) => row.id)).size, 604);
  assert.equal(rows.filter((row) => !row.expected).length, 240);
  return { rows, hashes };
}

function question(row, type, sentence) {
  const template = sentence === undefined ? criteria.detectionQuestion : criteria.participationQuestion;
  if (isolated) {
    const instructions = template
      .replaceAll("state.paragraphs[ID].text", "target")
      .replaceAll("state.paragraphs[ID].sentences", "sentences")
      .replaceAll("state.types[TYPE]", "rulebook")
      .replaceAll("other entries in state.paragraphs", "other target paragraphs")
      .replaceAll("TYPE", JSON.stringify(type))
      .replaceAll("SENTENCE", String(sentence));
    return { type: "noul", instructions: {
      question: instructions,
      target: row.text,
      rulebook: `state.types[${JSON.stringify(type)}]`,
      ...(sentence === undefined ? {} : { sentences: row.sentences }),
    } };
  }
  return { type: "noul", instructions: template.replaceAll("TYPE", JSON.stringify(type)).replaceAll("ID", JSON.stringify(row.id)).replaceAll("SENTENCE", String(sentence)) };
}

function request(items, rows) {
  const ids = new Set(items.map((item) => item.id));
  const selected = [...new Set(items.map((item) => item.type))];
  if (isolated) assert.equal(selected.length, 1);
  return { model: criteria.model, state: {
    instructions: criteria.instructions,
    types: isolated ? Object.fromEntries(selected.map((type) => [type, criteria.types[type]])) : criteria.types,
    ...(isolated ? {} : { paragraphs: Object.fromEntries(rows.filter((row) => ids.has(row.id)).map(({ id, text, sentences }) => [id, { text, sentences }])) }),
  }, questions: Object.fromEntries(items.map((item) => [item.key, question(rows.find((row) => row.id === item.id), item.type, item.sentence)])) };
}

function prepare() {
  assert.ok(!existsSync(resolve(directory, "inputs.json")), "Preserve frozen inputs.");
  const { rows, hashes } = records();
  save("inputs.json", { criteriaSha256: hash(readFileSync(criteriaFile)), baseline: baselineSnapshot(), ...(isolated ? { format: "one-check-direct", comparison: baselineSnapshot(undefined, comparisonFile) } : {}), sourceHashes: hashes, ids: rows.map((row) => row.id), model: criteria.model, threshold: criteria.threshold });
  console.log(JSON.stringify({ paragraphs: rows.length, types, detectionDecisions: rows.length * types.length, criteriaWords: [criteria.instructions, ...Object.values(criteria.types)].join(" ").split(/\s+/).length }));
}

function validate() {
  const inputs = read("inputs.json");
  const { rows, hashes } = records();
  assert.equal(inputs.criteriaSha256, hash(readFileSync(criteriaFile)));
  assert.deepEqual(inputs.baseline, baselineSnapshot(inputs.baseline.sourceCommit));
  if (isolated) {
    assert.equal(inputs.format, "one-check-direct");
    assert.deepEqual(inputs.comparison, baselineSnapshot(inputs.comparison.sourceCommit, comparisonFile));
    const frozen = JSON.parse(execFileSync("git", ["show", `${inputs.comparison.sourceCommit}:${comparisonFile.replace("results.json", "inputs.json")}`], { cwd: root, encoding: "utf8" }));
    assert.equal(inputs.criteriaSha256, frozen.criteriaSha256);
    assert.deepEqual(inputs.sourceHashes, frozen.sourceHashes);
    assert.equal(inputs.model, frozen.model);
    assert.equal(inputs.threshold, frozen.threshold);
  }
  assert.deepEqual(inputs.sourceHashes, hashes);
  assert.deepEqual(inputs.ids, rows.map((row) => row.id));
  assert.equal(inputs.model, criteria.model);
  assert.equal(inputs.threshold, criteria.threshold);
  return rows;
}

function response(file, expected) {
  assert.deepEqual(read(file.replace(".response.json", ".request.json")), expected);
  const saved = read(file);
  assert.equal(saved.requestSha256, hash(JSON.stringify(expected)));
  assert.ok(Number.isFinite(saved.elapsedMs) && saved.elapsedMs >= 0, "Elapsed time must be finite and nonnegative.");
  assert.ok(saved.response.usage !== null && typeof saved.response.usage === "object", "Response usage is required.");
  for (const key of ["input_tokens", "output_tokens"]) assert.ok(Number.isSafeInteger(saved.response.usage[key]) && saved.response.usage[key] >= 0, `${key} must be a nonnegative integer.`);
  assert.equal(saved.response.model, criteria.model);
  assert.deepEqual(Object.keys(saved.response.answers).sort(), Object.keys(expected.questions).sort());
  for (const answer of Object.values(saved.response.answers)) {
    assert.equal(answer.type, "noul");
    assert.ok(Number.isFinite(answer.noul) && answer.noul >= 0 && answer.noul <= 1);
  }
  return saved;
}

function credential() {
  const token = execFileSync("/usr/bin/security", ["find-generic-password", "-s", "codex.agent-1password.api-reader", "-a", "api-reader", "-w"], { encoding: "utf8" }).trim();
  assert.ok(token);
  const env = { ...process.env, OP_SERVICE_ACCOUNT_TOKEN: token, OP_BIOMETRIC_UNLOCK_ENABLED: "false" };
  delete env.OP_CONNECT_HOST;
  delete env.OP_CONNECT_TOKEN;
  return execFileSync("op", ["read", "op://2w4dmxssqydex4p4t5k72cnnja/k7cwlx2niy42tl3j3gqlueejzu/credential"], { env, encoding: "utf8" }).trim();
}

function detectionItems(rows) {
  return rows.flatMap((row) => types.map((type) => ({ id: row.id, type, key: `${row.id}_${type}` })));
}

function plannedBatches(stage, items) {
  const groups = isolated ? types.map((type) => ({ type, items: items.filter((item) => item.type === type) })) : [{ items }];
  const size = isolated ? 100 : 99;
  return groups.flatMap((group) => Array.from({ length: Math.ceil(group.items.length / size) }, (_, i) => ({ base: `${stage}/${group.type === undefined ? "" : `${group.type}-`}batch-${String(i + 1).padStart(2, "0")}`, items: group.items.slice(i * size, (i + 1) * size) })));
}

function batches(stage, items, rows) {
  const plans = plannedBatches(stage, items);
  const actual = existsSync(resolve(directory, stage)) ? readdirSync(resolve(directory, stage)).filter((file) => file.endsWith(".request.json") || file.endsWith(".response.json")).sort() : [];
  assert.deepEqual(actual, plans.flatMap(({ base }) => [`${basename(base)}.request.json`, `${basename(base)}.response.json`]).sort(), `Unexpected or missing ${stage} artifacts`);
  return plans.map(({ base, items }) => {
    const file = `${basename(base)}.response.json`;
    return { stage, file, saved: response(`${base}.response.json`, request(items, rows)) };
  });
}

function answers(stage, items, rows) {
  return Object.assign({}, ...batches(stage, items, rows).map(({ saved }) => saved.response.answers));
}

function participationItems(rows, detections) {
  return detectionItems(rows).filter((item) => detections[item.key].noul >= criteria.threshold).flatMap((item) => rows.find((row) => row.id === item.id).sentences.map((sentence) => ({ ...item, sentence: sentence.id, key: `${item.key}_s${sentence.id}` })));
}

function compare(output, previous) {
  const before = new Map(previous.rows.map((row) => [row.id, row]));
  const any = (row) => types.some((type) => row.decisions[type].detected);
  const clean = output.filter((row) => !row.expected);
  const assigned = output.filter((row) => row.expected && types.includes(row.group));
  const assignedClean = clean.filter((row) => types.includes(row.group));
  return {
    assignedPositives: { count: assigned.length, before: assigned.filter((row) => before.get(row.id).decisions[row.group].detected).length, after: assigned.filter((row) => row.decisions[row.group].detected).length },
    assignedClean: { count: assignedClean.length, before: assignedClean.filter((row) => any(before.get(row.id))).length, after: assignedClean.filter(any).length },
    cleanParagraphs: { count: clean.length, before: clean.filter((row) => any(before.get(row.id))).length, after: clean.filter(any).length, recovered: clean.filter((row) => any(before.get(row.id)) && !any(row)).map((row) => row.id), introduced: clean.filter((row) => !any(before.get(row.id)) && any(row)).map((row) => row.id) },
    types: types.map((type) => {
      const changed = output.filter((row) => row.decisions[type].detected !== before.get(row.id).decisions[type].detected);
      const positives = output.filter((row) => row.expected && row.group === type);
      return {
        type,
        changedClean: changed.filter((row) => !row.expected).map((row) => ({ id: row.id, before: before.get(row.id).decisions[type].score, after: row.decisions[type].score })),
        changedAssignedPositives: changed.filter((row) => row.expected && row.group === type).map((row) => row.id),
        changedAssignedHighlights: positives.filter((row) => JSON.stringify(row.decisions[type].selectedSentences) !== JSON.stringify(before.get(row.id).decisions[type].selectedSentences)).map((row) => ({ id: row.id, before: before.get(row.id).decisions[type].selectedSentences, after: row.decisions[type].selectedSentences })),
        otherPositiveBefore: previous.rows.filter((row) => row.expected && row.group !== type && row.decisions[type].detected).length,
        otherPositiveAfter: output.filter((row) => row.expected && row.group !== type && row.decisions[type].detected).length,
      };
    }),
  };
}

async function run() {
  const rows = validate();
  const { TypeSafeClient } = await import(pathToFileURL(resolve(root, ".fixture3/jev-paragraph-probe/node_modules/@typesafe-ai/sdk/dist/index.mjs")));
  const apiKey = credential();
  const client = new TypeSafeClient({ apiKey, baseURL: "https://api.typesafe.ai", logLevel: "off", timeout: 120000, retry: { maxRetries: 0 } });
  for (const stage of ["detection", "participation"]) {
    const items = stage === "detection" ? detectionItems(rows) : participationItems(rows, answers("detection", detectionItems(rows), rows));
    for (const { base, items: batch } of plannedBatches(stage, items)) {
      const input = request(batch, rows);
      if (existsSync(resolve(directory, `${base}.response.json`))) { response(`${base}.response.json`, input); continue; }
      save(`${base}.request.json`, input);
      const started = performance.now();
      try {
        const result = await client.systemOne(input);
        save(`${base}.response.json`, { recordedAt: new Date().toISOString(), requestSha256: hash(JSON.stringify(input)), elapsedMs: performance.now() - started, response: result });
        response(`${base}.response.json`, input);
        console.log(JSON.stringify({ stage, batch: base, decisions: batch.length, elapsedMs: performance.now() - started, usage: result.usage }));
      } catch (error) {
        save(`${base}.failure.json`, { name: error.name, message: String(error.message).replaceAll(apiKey, "[REDACTED]") });
        throw new Error(`Jev request failed: ${base}`);
      }
    }
  }
}

function summarize() {
  const rows = validate();
  const detections = answers("detection", detectionItems(rows), rows);
  const participation = answers("participation", participationItems(rows, detections), rows);
  const old = JSON.parse(readFileSync(resolve(root, baselineFile), "utf8"));
  const comparison = isolated ? JSON.parse(readFileSync(resolve(root, comparisonFile), "utf8")) : undefined;
  const output = rows.map((row) => {
    const prior = old.rows.find((item) => item.id === row.id);
    assert.equal(prior.group, row.group);
    assert.equal(prior.expected, row.expected);
    const previous = comparison?.rows.find((item) => item.id === row.id);
    if (isolated) {
      assert.equal(previous.group, row.group);
      assert.equal(previous.expected, row.expected);
    }
    const decisions = Object.fromEntries(types.map((type) => {
      const key = `${row.id}_${type}`;
      const score = detections[key].noul;
      const sentences = row.sentences.filter((sentence) => (participation[`${key}_s${sentence.id}`]?.noul ?? 0) >= criteria.threshold);
      const evidenceSentences = row.sentences.filter((sentence) => row.evidence.some((span) => {
        let start = row.text.indexOf(span);
        while (start >= 0) {
          if (start < sentence.end && start + span.length > sentence.start) return true;
          start = row.text.indexOf(span, start + 1);
        }
        return false;
      })).map((sentence) => sentence.id);
      return [type, { score, detected: score >= criteria.threshold, sentenceScores: score >= criteria.threshold ? row.sentences.map((sentence) => ({ id: sentence.id, score: participation[`${key}_s${sentence.id}`].noul })) : [], selectedSentences: sentences.map((sentence) => sentence.id), ranges: sentences.map(({ start, end }) => ({ start, end })), expectedEvidenceSentences: row.group === type && row.expected ? evidenceSentences : null }];
    }));
    return { id: row.id, group: row.group, expected: row.expected, prior, decisions };
  });
  const summaries = types.map((type) => {
    const positives = output.filter((row) => row.expected && row.group === type);
    const clean = output.filter((row) => !row.expected);
    const caught = positives.filter((row) => row.decisions[type].detected);
    return { type, positives: positives.length, caught: caught.length, misses: positives.filter((row) => !row.decisions[type].detected).map((row) => row.id), cleanControls: clean.length, falseAlarms: clean.filter((row) => row.decisions[type].detected).map((row) => row.id), ownGroupClean: clean.filter((row) => row.group === type).length, ownGroupFalseAlarms: clean.filter((row) => row.group === type && row.decisions[type].detected).length, exactEvidenceSentences: caught.filter((row) => JSON.stringify(row.decisions[type].selectedSentences) === JSON.stringify(row.decisions[type].expectedEvidenceSentences)).length, unlocalized: output.filter((row) => row.decisions[type].detected && row.decisions[type].selectedSentences.length === 0).map((row) => row.id), otherPositiveClassifications: output.filter((row) => row.expected && row.group !== type && row.decisions[type].detected).map((row) => row.id), priorFamilyCaught: positives.filter((row) => row.prior.scores["revised-direct"] >= 0.5).length, nativeFamilyCaught: positives.filter((row) => row.prior.slopless.length > 0).length };
  });
  const execution = [];
  for (const [stage, items] of [["detection", detectionItems(rows)], ["participation", participationItems(rows, detections)]]) for (const { file, saved } of batches(stage, items, rows)) {
    execution.push({ stage, file, decisions: Object.keys(saved.response.answers).length, elapsedMs: saved.elapsedMs, usage: saved.response.usage });
  }
  save("results.json", { model: criteria.model, threshold: criteria.threshold, summaries, execution, rows: output, ...(isolated ? { comparison: compare(output, comparison) } : {}) });
  console.log(JSON.stringify({ summaries: summaries.map((row) => ({ type: row.type, caught: row.caught, positives: row.positives, cleanControls: row.cleanControls, falseAlarms: row.falseAlarms.length, exactEvidenceSentences: row.exactEvidenceSentences })), requests: execution.length, decisions: execution.reduce((sum, row) => sum + row.decisions, 0), requestMs: execution.reduce((sum, row) => sum + row.elapsedMs, 0) }, null, 2));
}

const mode = process.argv[2];
if (mode === "prepare") prepare();
else if (mode === "run") await run();
else if (mode === "summarize") summarize();
else if (mode === "validate") { validate(); console.log("Frozen criteria and dataset hashes verified."); }
else throw new Error("Use prepare, run, summarize, or validate.");
