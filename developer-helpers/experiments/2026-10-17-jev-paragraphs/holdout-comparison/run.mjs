import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createLinter, loadTextlintrc } from "textlint";

const directory = dirname(fileURLToPath(import.meta.url));
const experiment = resolve(directory, "..");
const root = resolve(experiment, "../../..");
const dataset = resolve(root, "datasets/holdout/semantic-thinness");
const model = "jev-1.13.0";
const threshold = 0.5;
const read = (path) => JSON.parse(readFileSync(path, "utf8"));
const hash = (value) => createHash("sha256").update(value).digest("hex");
const save = (path, value) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + "\n");
};

function records() {
  const rows = [];
  const sourceHashes = {};
  for (const group of readdirSync(dataset, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort()) {
    const paragraphsFile = resolve(dataset, group, "paragraphs.json");
    if (!existsSync(paragraphsFile)) continue;
    const labelsFile = resolve(dataset, group, "labels.json");
    const paragraphs = read(paragraphsFile);
    const labels = read(labelsFile);
    assert.equal(paragraphs.family, "semantic-thinness");
    assert.equal(labels.family, paragraphs.family);
    assert.equal(paragraphs.schemaVersion, 1);
    assert.equal(labels.schemaVersion, 1);
    assert.deepEqual(paragraphs.paragraphs.map((row) => row.id), labels.labels.map((row) => row.id));
    for (const [index, paragraph] of paragraphs.paragraphs.entries()) {
      assert.deepEqual(Object.keys(paragraph).sort(), ["id", "text"]);
      const label = labels.labels[index];
      assert.equal(typeof paragraph.text, "string");
      assert.equal(typeof label.expected, "boolean");
      assert.ok(label.evidence.every((span) => paragraph.text.includes(span)));
      rows.push({ ...paragraph, ...label, group });
    }
    for (const path of [paragraphsFile, labelsFile]) sourceHashes[path.slice(root.length + 1)] = hash(readFileSync(path));
  }
  rows.sort((left, right) => left.id.localeCompare(right.id));
  assert.equal(rows.length, 604);
  assert.equal(new Set(rows.map((row) => row.id)).size, 604);
  assert.equal(new Set(rows.map((row) => row.text)).size, 604);
  assert.equal(rows.filter((row) => row.expected).length, 364);
  const groups = new Set(rows.map((row) => row.group));
  const patternGroups = readdirSync(resolve(root, "src/rules/semantic-thinness/patterns")).filter((file) => file.endsWith(".json")).map((file) => file.slice(0, -5));
  assert.deepEqual([...groups].sort(), [...patternGroups, "superficial-analysis"].sort());
  return { rows, sourceHashes };
}

function verifyPreservation(rows) {
  const historical = "developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout";
  const originals = [];
  for (let batch = 1; batch <= 8; batch++) {
    const suffix = batch === 1 ? "" : `-${String(batch).padStart(3, "0")}`;
    const old = (name) => JSON.parse(execFileSync("git", ["show", `90aaae9:${historical}/${name}${suffix}.json`], { cwd: root, encoding: "utf8" }));
    const paragraphs = old("paragraphs").paragraphs;
    const labels = old("labels").labels;
    assert.deepEqual(paragraphs.map((row) => row.id), labels.map((row) => row.id));
    originals.push(...paragraphs.map((paragraph, index) => ({ ...paragraph, ...labels[index] })));
  }
  assert.deepEqual(rows.map(({ group, ...row }) => row), originals);
  const auditFiles = execFileSync("git", ["ls-tree", "--name-only", "90aaae9", `${historical}/`], { cwd: root, encoding: "utf8" }).trim().split("\n").filter((path) => /claude-label-review.*\.json$/.test(path));
  assert.equal(auditFiles.length, 8);
  for (const file of auditFiles) assert.equal(hash(readFileSync(resolve(dataset, basename(file)))), hash(execFileSync("git", ["show", `90aaae9:${file}`], { cwd: root, maxBuffer: 1024 * 1024 })));
}

function variants() {
  const annotated = resolve(experiment, "annotated-semantic");
  const definitions = [
    ["baseline-indirect", "single-family-comparison.json", (run) => run.version === "after" && run.document === "semantic-hits"],
    ["baseline-direct", "research-baseline-direct-comparison.json", (run) => run.document === "semantic-hits"],
    ["revised-direct", "research-direct-comparison.json", (run) => run.document === "semantic-hits"],
    ["selected-direct", "research-final-comparison.json", (run) => run.document === "semantic-hits"],
  ];
  return definitions.map(([name, file, predicate]) => {
    const artifact = read(resolve(annotated, file));
    const run = artifact.runs.find(predicate);
    assert.ok(run);
    assert.equal(hash(JSON.stringify(run.request)), run.requestSha256);
    assert.equal(run.request.model, model);
    const firstKey = Object.keys(run.request.questions)[0];
    const firstId = Object.keys(run.request.state.paragraphs)[0];
    const prompt = run.request.state.rulebooks["semantic-thinness"];
    assert.ok(prompt.trim().split(/\s+/).length <= 1000);
    return { name, file, request: run.request, firstKey, firstId, promptSha256: hash(prompt), taskSha256: hash(run.request.state.task), promptWords: prompt.trim().split(/\s+/).length };
  });
}

function requestFor(variant, rows) {
  const paragraphs = Object.fromEntries(rows.map(({ id, text }) => [id, { heading: "", text }]));
  const questions = Object.fromEntries(rows.map(({ id, text }) => {
    const template = variant.request.questions[variant.firstKey];
    const instructions = typeof template.instructions === "string"
      ? template.instructions.replace(`state.paragraphs['${variant.firstId}']`, `state.paragraphs['${id}']`)
      : { ...template.instructions, target: text };
    return [id, { ...template, instructions }];
  }));
  return { model, state: { task: variant.request.state.task, rulebooks: variant.request.state.rulebooks, paragraphs }, questions };
}

function prepare() {
  assert.ok(!existsSync(resolve(directory, "inputs.json")), "Preserve the frozen evaluation; do not overwrite inputs.");
  const { rows, sourceHashes } = records();
  verifyPreservation(rows);
  const options = variants();
  const requests = [];
  for (const variant of options) for (let offset = 0; offset < rows.length; offset += 100) {
    const batch = rows.slice(offset, offset + 100);
    const request = requestFor(variant, batch);
    const file = `${variant.name}/batch-${String(offset / 100 + 1).padStart(2, "0")}.request.json`;
    save(resolve(directory, file), request);
    requests.push({ variant: variant.name, file, ids: batch.map((row) => row.id), sha256: hash(JSON.stringify(request)) });
  }
  save(resolve(directory, "inputs.json"), {
    model, threshold, batchSize: 100, sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim(), sourceHashes,
    variants: options.map(({ name, file, promptSha256, taskSha256, promptWords }) => ({ name, source: `annotated-semantic/${file}`, promptSha256, taskSha256, promptWords })), requests,
  });
  console.log(JSON.stringify({ mode: "prepare", paragraphs: rows.length, variants: options.length, decisions: rows.length * options.length, requests: requests.length }));
}

function validateInputs() {
  const inputs = read(resolve(directory, "inputs.json"));
  const { rows, sourceHashes } = records();
  verifyPreservation(rows);
  assert.deepEqual(sourceHashes, inputs.sourceHashes);
  const options = variants();
  assert.equal(inputs.model, model);
  assert.equal(inputs.threshold, threshold);
  for (const descriptor of inputs.requests) {
    const request = read(resolve(directory, descriptor.file));
    const variant = options.find((option) => option.name === descriptor.variant);
    const batch = descriptor.ids.map((id) => rows.find((row) => row.id === id));
    assert.deepEqual(request, requestFor(variant, batch));
    assert.equal(hash(JSON.stringify(request)), descriptor.sha256);
  }
  for (const variant of options) assert.deepEqual(inputs.requests.filter((item) => item.variant === variant.name).flatMap((item) => item.ids), rows.map((row) => row.id));
  return { inputs, rows };
}

function credential() {
  const token = execFileSync("/usr/bin/security", ["find-generic-password", "-s", "codex.agent-1password.api-reader", "-a", "api-reader", "-w"], { encoding: "utf8" }).trim();
  assert.ok(token);
  const env = { ...process.env, OP_SERVICE_ACCOUNT_TOKEN: token, OP_BIOMETRIC_UNLOCK_ENABLED: "false" };
  delete env.OP_CONNECT_HOST;
  delete env.OP_CONNECT_TOKEN;
  return execFileSync("op", ["read", "op://2w4dmxssqydex4p4t5k72cnnja/k7cwlx2niy42tl3j3gqlueejzu/credential"], { env, encoding: "utf8" }).trim();
}

function validateResponse(descriptor) {
  const saved = read(resolve(directory, descriptor.file.replace(".request.json", ".response.json")));
  assert.equal(saved.requestSha256, descriptor.sha256);
  assert.equal(saved.response.model, model);
  assert.deepEqual(Object.keys(saved.response.answers).sort(), [...descriptor.ids].sort());
  for (const answer of Object.values(saved.response.answers)) {
    assert.equal(answer.type, "noul");
    assert.ok(Number.isFinite(answer.noul) && answer.noul >= 0 && answer.noul <= 1);
  }
  return saved;
}

async function run() {
  const { inputs } = validateInputs();
  const { TypeSafeClient } = await import(pathToFileURL(resolve(root, ".fixture3/jev-paragraph-probe/node_modules/@typesafe-ai/sdk/dist/index.mjs")));
  const apiKey = credential();
  const client = new TypeSafeClient({ apiKey, baseURL: "https://api.typesafe.ai", logLevel: "off", timeout: 120000, retry: { maxRetries: 0 } });
  for (const descriptor of inputs.requests) {
    const output = resolve(directory, descriptor.file.replace(".request.json", ".response.json"));
    if (existsSync(output)) { validateResponse(descriptor); continue; }
    const started = performance.now();
    try {
      const response = await client.systemOne(read(resolve(directory, descriptor.file)));
      save(output, { recordedAt: new Date().toISOString(), requestSha256: descriptor.sha256, elapsedMs: performance.now() - started, response });
      validateResponse(descriptor);
      console.log(JSON.stringify({ file: descriptor.file, answers: descriptor.ids.length, elapsedMs: performance.now() - started, usage: response.usage }));
    } catch (error) {
      save(output.replace(".response.json", ".failure.json"), { name: error.name, status: error.status ?? null, message: String(error.message).replaceAll(apiKey, "[REDACTED]") });
      throw new Error(`Jev evaluation failed at ${descriptor.file}`);
    }
  }
}

function confusion(rows, predict) {
  const counts = { truePositives: 0, falseNegatives: 0, falsePositives: 0, trueNegatives: 0 };
  for (const row of rows) counts[row.expected ? predict(row) ? "truePositives" : "falseNegatives" : predict(row) ? "falsePositives" : "trueNegatives"]++;
  return counts;
}

async function summarize() {
  const { inputs, rows } = validateInputs();
  const { rules } = await import(pathToFileURL(resolve(root, "dist/index.js")));
  const descriptor = (await loadTextlintrc()).shallowMerge({
    rules: ["semantic-thinness", "superficial-analysis"].map((ruleId) => ({ ruleId, rule: rules[ruleId], options: {} })), filterRules: [],
  });
  assert.equal(descriptor.rule.lintableDescriptors.length, 2);
  const linter = createLinter({ descriptor });
  for (const row of rows) {
    row.scores = {};
    row.slopless = (await linter.lintText(row.text, `${row.id}.md`)).messages.map(({ ruleId, message, range }) => ({ ruleId, message, range }));
  }
  const execution = [];
  for (const request of inputs.requests) {
    const saved = validateResponse(request);
    for (const id of request.ids) rows.find((row) => row.id === id).scores[request.variant] = saved.response.answers[id].noul;
    execution.push({ variant: request.variant, file: basename(request.file), elapsedMs: saved.elapsedMs, usage: saved.response.usage });
  }
  const options = [...inputs.variants.map((variant) => variant.name), "slopless"];
  const prediction = (name) => (row) => name === "slopless" ? row.slopless.length > 0 : row.scores[name] >= threshold;
  const summaries = Object.fromEntries(options.map((name) => [name, confusion(rows, prediction(name))]));
  const groups = Object.fromEntries([...new Set(rows.map((row) => row.group))].sort().map((group) => [group, Object.fromEntries(options.map((name) => [name, confusion(rows.filter((row) => row.group === group), prediction(name))]))]));
  const errors = Object.fromEntries(options.map((name) => [name, rows.filter((row) => prediction(name)(row) !== row.expected).map((row) => row.id)]));
  save(resolve(directory, "results.json"), { model, threshold, summaries, groups, errors, execution, rows: rows.map(({ id, group, expected, scores, slopless }) => ({ id, group, expected, scores, slopless })) });
  console.log(JSON.stringify({ paragraphs: rows.length, summaries }, null, 2));
}

const mode = process.argv[2];
if (mode === "prepare") prepare();
else if (mode === "run") await run();
else if (mode === "summarize") await summarize();
else if (mode === "validate") { const { inputs } = validateInputs(); for (const request of inputs.requests) validateResponse(request); console.log("Validated all frozen requests and responses."); }
else throw new Error("Use prepare, run, summarize, or validate.");
