import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, "../../..");
const output = resolve(directory, "liquid");
const model = "d1-ultra";
const threshold = 0.5;
const read = (file) => JSON.parse(readFileSync(file, "utf8"));
const save = (file, value) => writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
const hash = (value) => createHash("sha256").update(value).digest("hex");
const manifest = read(resolve(directory, "inputs.json"));
const previous = read(resolve(directory, "results.json"));
assert.equal(previous.threshold, threshold);
assert.equal(hash(readFileSync(resolve(directory, "criteria.json"))), manifest.criteriaSha256);

function frozenRequest(document) {
  assert.equal(hash(readFileSync(resolve(root, document.file))), document.sha256);
  const request = read(resolve(directory, document.requestFile));
  const jev = read(resolve(directory, `${document.name}.response.json`));
  assert.equal(hash(JSON.stringify(request)), jev.requestSha256);
  assert.equal(jev.response.model, request.model);
  assert.deepEqual(Object.keys(jev.response.answers).sort(), Object.keys(request.questions).sort());
  const rows = previous.rows.filter((row) => row.document === document.name);
  assert.equal(rows.length, Object.keys(request.questions).length);
  assert.equal(new Set(rows.map((row) => `${row.paragraph}_${row.check}`)).size, rows.length);
  for (const paragraph of document.paragraphs) for (const check of document.checks) {
    const row = rows.find((item) => item.paragraph === paragraph.id && item.check === check);
    assert.ok(row);
    const probability = jev.response.answers[`${paragraph.id}_${check}`].noul;
    assert.ok(typeof probability === "number" && Number.isFinite(probability) && probability >= 0 && probability <= 1);
    assert.equal(row.probability, probability);
    assert.equal(row.jev, probability >= threshold);
    assert.equal(row.expected, document.expected ?? null);
    assert.equal(row.text, paragraph.text);
    assert.equal(row.file, document.file);
    assert.equal(row.line, paragraph.line);
    const baseline = document.baseline.filter((message) => message.range[0] < paragraph.range[1] && message.range[1] > paragraph.range[0] && (check === "semantic-thinness" ? message.ruleId.endsWith("semantic-thinness.js") : message.ruleId.endsWith("generic-signposting.js") && /\b(narrow(?:er|est)?|limited|bounded|restricted|constrained)\b/i.test(message.message)));
    assert.deepEqual(row.baseline, baseline);
    assert.equal(row.slopless, baseline.length > 0);
  }
  return { ...request, model };
}

function prepare() {
  mkdirSync(output, { recursive: true });
  for (const document of manifest.documents) {
    const request = frozenRequest(document);
    save(resolve(output, document.requestFile), request);
    for (const batch of batches(document)) save(resolve(output, `${batch.name}.request.json`), batch.request);
    console.log(JSON.stringify({ document: document.name, model, paragraphs: document.paragraphs.length, questions: Object.keys(request.questions).length }));
  }
}

function batches(document) {
  const request = frozenRequest(document);
  const questions = Object.entries(request.questions);
  return Array.from({ length: Math.ceil(questions.length / 128) }, (_, index) => ({
    name: `${document.name}.batch-${String(index + 1).padStart(3, "0")}`,
    request: { ...request, questions: Object.fromEntries(questions.slice(index * 128, (index + 1) * 128)) }
  }));
}

function credential() {
  const token = execFileSync("/usr/bin/security", ["find-generic-password", "-s", "codex.agent-1password.api-reader", "-a", "api-reader", "-w"], { encoding: "utf8" }).trim();
  assert.ok(token);
  const env = { ...process.env, OP_SERVICE_ACCOUNT_TOKEN: token, OP_BIOMETRIC_UNLOCK_ENABLED: "false" };
  delete env.OP_CONNECT_HOST;
  delete env.OP_CONNECT_TOKEN;
  const vault = "2w4dmxssqydex4p4t5k72cnnja";
  const op = (args) => execFileSync("op", args, { env, encoding: "utf8" }).trim();
  const items = JSON.parse(op(["item", "list", "--vault", vault, "--format=json"])).filter((item) => /^(?:console\.)?liquid\.ai\s*\//i.test(item.title));
  assert.equal(items.length, 1, "Expected exactly one Liquid AI credential in Agent API Keys; resolve missing or ambiguous credentials before inference.");
  const item = JSON.parse(op(["item", "get", items[0].id, "--vault", vault, "--format=json"]));
  const fields = item.fields.filter((field) => field.type === "CONCEALED" && /credential|api.?key|token|password/i.test(`${field.id} ${field.label}`));
  assert.equal(fields.length, 1, "Expected one concealed API credential field in the Liquid item.");
  const key = op(["read", `op://${vault}/${item.id}/${fields[0].id}`]);
  assert.ok(key.startsWith("liquid_"), "The selected credential does not have Liquid's documented prefix.");
  return key;
}

async function run() {
  const selected = process.argv.slice(3);
  for (const name of selected) assert.ok(manifest.documents.some((document) => document.name === name), `Unknown document: ${name}`);
  const documents = manifest.documents.filter((document) => selected.length === 0 || selected.includes(document.name));
  const pending = [];
  for (const document of documents) {
    assert.deepEqual(read(resolve(output, document.requestFile)), frozenRequest(document));
    for (const batch of batches(document)) {
      assert.deepEqual(read(resolve(output, `${batch.name}.request.json`)), batch.request);
      if (existsSync(resolve(output, `${batch.name}.response.json`))) savedBatch(batch);
      else pending.push(batch);
    }
  }
  const { TypeSafeClient } = await import(pathToFileURL(resolve(root, ".fixture3/jev-paragraph-probe/node_modules/@typesafe-ai/sdk/dist/index.mjs")));
  const client = new TypeSafeClient({ apiKey: credential(), baseURL: "https://api.liquid.ai/decisions", compression: false, logLevel: "off", timeout: 120000, retry: { maxRetries: 0 } });
  for (const batch of pending) {
    const request = batch.request;
    const started = performance.now();
    let response;
    try {
      response = await client.systemOne(request);
    } catch (error) {
      const failure = { recordedAt: new Date().toISOString(), requestSha256: hash(JSON.stringify(request)), elapsedMs: performance.now() - started, name: error.name, status: error.status ?? null, message: String(error.message).replace(/liquid_[A-Za-z0-9_-]+/g, "[REDACTED]") };
      save(resolve(output, `${batch.name}.failure.json`), failure);
      throw new Error(`Liquid request failed (${failure.status ?? failure.name}); see ${batch.name}.failure.json`);
    }
    const elapsedMs = performance.now() - started;
    // Preserve the returned payload before validation so rejected answers remain auditable.
    save(resolve(output, `${batch.name}.response.json`), { recordedAt: new Date().toISOString(), requestSha256: hash(JSON.stringify(request)), elapsedMs, response });
    validate(request, response);
    console.log(JSON.stringify({ batch: batch.name, model: response.model, answers: Object.keys(response.answers).length, elapsedMs, usage: response.usage }));
  }
}

function savedBatch(batch) {
  const run = read(resolve(output, `${batch.name}.response.json`));
  assert.equal(run.requestSha256, hash(JSON.stringify(batch.request)));
  validate(batch.request, run.response);
  return run;
}

function validate(request, response) {
  assert.equal(response.model, model);
  assert.deepEqual(Object.keys(response.answers).sort(), Object.keys(request.questions).sort());
  for (const answer of Object.values(response.answers)) {
    assert.equal(answer.type, "noul");
    assert.ok(typeof answer.noul === "number" && Number.isFinite(answer.noul) && answer.noul >= 0 && answer.noul <= 1);
  }
  assert.ok(Number.isInteger(response.usage.input_tokens) && response.usage.input_tokens >= 0);
  assert.equal(response.usage.output_tokens, 0);
}

function summarize() {
  const rows = [];
  const summaries = [];
  const markdown = ["# Liquid and Jev results for every fixture paragraph", "", "Both models use the same state and question instructions, with a 0.5 decision threshold. Slopless is the saved deterministic baseline. File expectations apply to isolated cases.", ""];
  for (const document of manifest.documents) {
    const request = read(resolve(output, document.requestFile));
    assert.deepEqual(request, frozenRequest(document));
    const runs = batches(document).map(savedBatch);
    const run = {
      elapsedMs: runs.reduce((sum, item) => sum + item.elapsedMs, 0),
      response: {
        model,
        answers: Object.assign({}, ...runs.map((item) => item.response.answers)),
        usage: { input_tokens: runs.reduce((sum, item) => sum + item.response.usage.input_tokens, 0), output_tokens: 0, cost: runs.every((item) => typeof item.response.usage.cost === "number") ? runs.reduce((sum, item) => sum + item.response.usage.cost, 0) : null }
      }
    };
    validate(request, run.response);
    markdown.push(`## ${document.name}`, "", `Source: [${document.file}](../../../../${document.file}).`, "");
    const originals = previous.rows.filter((row) => row.document === document.name);
    for (const paragraph of document.paragraphs) {
      markdown.push(`### ${paragraph.id} - source line ${paragraph.line}`, "");
      for (const row of originals.filter((item) => item.paragraph === paragraph.id)) {
        const probability = run.response.answers[`${row.paragraph}_${row.check}`].noul;
        const result = { document: row.document, paragraph: row.paragraph, file: row.file, line: row.line, check: row.check, text: row.text, expected: row.expected, slopless: row.slopless, jev: row.jev, jevProbability: row.probability, liquid: probability >= threshold, liquidProbability: probability };
        rows.push(result);
        markdown.push(`- ${row.check}: Liquid ${result.liquid ? "hit" : "no hit"} (${probability.toFixed(4)}); Jev ${row.jev ? "hit" : "no hit"} (${row.probability.toFixed(2)}); Slopless ${row.slopless ? "hit" : "no hit"}${row.expected === null ? "" : `; file expects ${row.expected ? "hit" : "no hit"}`}.`);
      }
      markdown.push("", ...paragraph.text.split("\n").map((line) => `> ${line}`), "");
    }
    const selected = rows.filter((row) => row.document === document.name);
    summaries.push({ document: document.name, requests: runs.length, paragraphs: document.paragraphs.length, judgments: selected.length, liquidFindings: selected.filter((row) => row.liquid).length, jevFindings: selected.filter((row) => row.jev).length, sloplessFindings: selected.filter((row) => row.slopless).length, liquidJevDisagreements: selected.filter((row) => row.liquid !== row.jev).length, liquidSloplessDisagreements: selected.filter((row) => row.liquid !== row.slopless).length, caseExpectationMismatches: document.expected === undefined ? null : selected.filter((row) => row.liquid !== row.expected).length, elapsedMs: run.elapsedMs, usage: run.response.usage });
  }
  assert.equal(rows.length, previous.rows.length);
  const inputTokens = summaries.reduce((sum, item) => sum + item.usage.input_tokens, 0);
  save(resolve(output, "results.json"), { model, threshold, inputTokens, estimatedCostUSD: inputTokens * 0.042 / 1_000_000, summaries, rows });
  writeFileSync(resolve(output, "paragraph-results.md"), markdown.join("\n"));
  console.log(JSON.stringify({ model, judgments: rows.length, inputTokens, estimatedCostUSD: inputTokens * 0.042 / 1_000_000, summaries }, null, 2));
}

const mode = process.argv[2];
if (mode === "prepare") prepare();
else if (mode === "run") await run();
else if (mode === "summarize") summarize();
else throw new Error("Use prepare, run [document names], or summarize");
