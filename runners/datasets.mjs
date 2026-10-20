import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";

/** @typedef {{id: string, start: number, end: number, check: string, expected: boolean|number|string|number[], reason?: string, evidence: string[], group?: string, coverage?: object, original?: object, review?: {source: string, comment: string}[]}} Label */
/** @typedef {{id: string, check: string, expected: boolean, snippets?: string[]}} MinimalLabel */
/** @typedef {{schemaVersion: 1|2, textSha256: string, source: {name: string, originalPath: string, commit: string, url?: string, model?: string, prompt?: string|null, license?: string, notes?: string}, labels: (Label|MinimalLabel)[], samples?: {id: string, start: number, end: number}[], split?: "development"|"holdout", instructions?: string}} Metadata */
/** @typedef {{file: string, labelsFile: string, text: string, metadata: Metadata, labels: Label[]}} Document */

const schema = JSON.parse(
  readFileSync(new URL("./dataset.schema.json", import.meta.url), "utf8")
);
const ajv = new Ajv({ allErrors: true, strict: true, allowUnionTypes: true });
const validate = ajv.compile(schema);
export const collections = [
  "human",
  "ai-suspected",
  "ai-normal",
  "ai-synthetic"
];

/** @param {string|Buffer} value @returns {string} */
export function textHash(value) {
  return createHash("sha256").update(value).digest("hex");
}

/** @param {string} file @returns {Document} */
export function readDocument(file) {
  file = resolve(file);
  assert.ok(file.endsWith(".md"), "Dataset input must be a Markdown file.");
  const labelsFile = file.slice(0, -3) + ".labels.json";
  const bytes = readFileSync(file);
  const text = bytes.toString("utf8");
  assert.ok(text.trim().length > 0, `${file}: empty document`);
  const metadata = JSON.parse(readFileSync(labelsFile, "utf8"));
  assert.ok(
    validate(metadata),
    `${labelsFile}: ${ajv.errorsText(validate.errors)}`
  );
  assert.equal(
    textHash(bytes),
    metadata.textSha256,
    `${file}: stale labels checksum`
  );
  const ids = new Map();
  const judgments = new Set();
  let previousEnd = 0;
  for (const sample of metadata.samples ?? []) {
    assert.ok(!ids.has(sample.id), `${sample.id}: duplicate sample`);
    assert.ok(
      sample.start >= previousEnd &&
        sample.start < sample.end &&
        sample.end <= text.length,
      `${sample.id}: invalid sample range`
    );
    assert.ok(
      !splitsSurrogate(text, sample.start) &&
        !splitsSurrogate(text, sample.end),
      `${sample.id}: sample splits a character`
    );
    assert.ok(
      text.slice(sample.start, sample.end).trim(),
      `${sample.id}: empty sample`
    );
    ids.set(sample.id, `${sample.start}:${sample.end}`);
    previousEnd = sample.end;
  }
  // Preserve disk metadata; expose resolved ranges for execution separately.
  const samples = new Map(
    (metadata.samples ?? []).map((sample) => [sample.id, sample])
  );
  const labels =
    metadata.schemaVersion === 2
      ? metadata.labels.map((label) => {
          const sample = samples.get(label.id);
          assert.ok(sample, `${label.id}: label has no sample`);
          return {
            id: label.id,
            start: sample.start,
            end: sample.end,
            check: label.check,
            group: label.check.split("/")[1],
            expected: label.expected,
            evidence: label.snippets ?? []
          };
        })
      : metadata.labels;
  for (const label of labels) {
    assert.ok(
      label.start < label.end && label.end <= text.length,
      `${label.id}: invalid range`
    );
    assert.ok(
      !splitsSurrogate(text, label.start) && !splitsSurrogate(text, label.end),
      `${label.id}: range splits a character`
    );
    const range = `${label.start}:${label.end}`;
    if (metadata.samples)
      assert.ok(ids.has(label.id), `${label.id}: label has no sample`);
    assert.ok(
      !ids.has(label.id) || ids.get(label.id) === range,
      `${label.id}: inconsistent passage`
    );
    ids.set(label.id, range);
    const key = JSON.stringify([label.id, label.check]);
    assert.ok(!judgments.has(key), `${label.id}: duplicate check`);
    judgments.add(key);
    const passage = text.slice(label.start, label.end);
    assert.ok(passage.trim().length > 0, `${label.id}: empty passage`);
    for (const evidence of label.evidence)
      assert.ok(
        passage.includes(evidence),
        `${label.id}: evidence outside passage`
      );
  }
  return { file, labelsFile, text, metadata, labels };
}

/** @param {string} text @param {number} offset @returns {boolean} */
function splitsSurrogate(text, offset) {
  const before = text.charCodeAt(offset - 1);
  const after = text.charCodeAt(offset);
  return (
    before >= 0xd800 && before <= 0xdbff && after >= 0xdc00 && after <= 0xdfff
  );
}

/** @param {string} input @returns {string[]} */
export function documentPaths(input) {
  input = resolve(input);
  if (statSync(input).isFile()) return [input];
  const result = [];
  for (const entry of readdirSync(input, { withFileTypes: true })) {
    const file = resolve(input, entry.name);
    assert.ok(
      !entry.isSymbolicLink(),
      `Dataset symlinks are unsupported: ${file}`
    );
    if (entry.isDirectory()) result.push(...documentPaths(file));
    else if (
      entry.name.endsWith(".md") &&
      !["README.md", "LICENSE.md", "LICENSES.md"].includes(entry.name)
    )
      result.push(file);
    else
      assert.ok(
        entry.name.endsWith(".labels.json") ||
          ["README.md", "LICENSE.md", "LICENSES.md", ".gitkeep"].includes(
            entry.name
          ),
        `Unexpected dataset file: ${file}`
      );
  }
  return result.sort();
}

/** @param {string} input @returns {Document[]} */
export function readDocuments(input) {
  const documents = documentPaths(input).map(readDocument);
  const paired = new Set(documents.map((document) => document.labelsFile));
  function checkPairs(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = resolve(directory, entry.name);
      if (entry.isDirectory()) checkPairs(file);
      else if (entry.name.endsWith(".labels.json"))
        assert.ok(paired.has(file), `Orphan labels file: ${file}`);
    }
  }
  if (statSync(input).isDirectory()) checkPairs(resolve(input));
  return documents;
}

/** @param {string} input @returns {{textSha256: string, labelsSha256: string}} */
export function datasetHashes(input) {
  const documents = readDocuments(input);
  return {
    textSha256: textHash(JSON.stringify(documents.map(({ text }) => text))),
    labelsSha256: textHash(
      JSON.stringify(documents.map(({ metadata }) => metadata))
    )
  };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const input = resolve(process.argv[2] ?? "datasets");
  if (input === resolve("datasets"))
    assert.deepEqual(
      readdirSync(input, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort(),
      [...collections].sort()
    );
  const documents = readDocuments(input);
  console.log(
    JSON.stringify({
      documents: documents.length,
      labels: documents.reduce(
        (count, { metadata }) => count + metadata.labels.length,
        0
      ),
      holdoutDocuments: documents.filter(
        ({ metadata }) => metadata.split === "holdout"
      ).length
    })
  );
}
