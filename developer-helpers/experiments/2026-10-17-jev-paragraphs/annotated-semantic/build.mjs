import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const previous = resolve(directory, "../grounded-semantic");
const read = (path) => readFileSync(path, "utf8");
const hash = (text) => createHash("sha256").update(text).digest("hex");
const frozen = JSON.parse(read(resolve(previous, "inputs.json")));
const frozenHashes = {
  "demonstrations.json": frozen.demonstrationsSha256,
  "task.md": frozen.taskSha256,
  ...Object.fromEntries(
    Object.entries(frozen.rulebookHashes).map(([rule, sha]) => [
      `${rule}.md`,
      sha
    ])
  )
};
for (const [name, sha] of Object.entries(frozenHashes)) {
  assert.equal(
    hash(read(resolve(previous, name))),
    sha,
    `Frozen prompt changed: ${name}`
  );
}
const examples = JSON.parse(read(resolve(previous, "demonstrations.json")));
const annotationFiles = [
  "annotations-000-142.json",
  "annotations-143-264.json",
  "annotations-265-373.json"
];
const annotations = annotationFiles.flatMap((name) =>
  JSON.parse(read(resolve(directory, name)))
);
const byIndex = new Map();
const mode = process.argv[2];
assert.ok(mode === "build" || mode === "verify", "Use build or verify.");
assert.equal(examples.length, 374);
assert.equal(annotations.length, examples.length);

function markedExample(example, annotation) {
  const ranges = [];
  let cursor = 0;
  for (const excerpt of annotation.excerpts) {
    assert.ok(
      typeof excerpt === "string" &&
        excerpt.length > 0 &&
        !excerpt.includes("**"),
      `Invalid excerpt at ${annotation.index}`
    );
    const start = example.text.indexOf(excerpt, cursor);
    assert.ok(
      start >= cursor,
      `Missing, reordered, or overlapping excerpt at ${annotation.index}: ${excerpt}`
    );
    ranges.push([start, start + excerpt.length]);
    cursor = start + excerpt.length;
  }
  let text = example.text;
  for (const [start, end] of ranges.toReversed())
    text = `${text.slice(0, start)}**${text.slice(start, end)}**${text.slice(end)}`;
  assert.equal(text.replaceAll("**", ""), example.text);
  return text;
}

for (const annotation of annotations) {
  assert.deepEqual(Object.keys(annotation).sort(), [
    "excerpts",
    "index",
    "reason"
  ]);
  assert.ok(
    Number.isInteger(annotation.index) &&
      annotation.index >= 0 &&
      annotation.index < examples.length
  );
  assert.ok(
    !byIndex.has(annotation.index),
    `Duplicate index ${annotation.index}`
  );
  assert.ok(
    Array.isArray(annotation.excerpts) && annotation.excerpts.length > 0
  );
  assert.ok(
    typeof annotation.reason === "string" &&
      annotation.reason.trim().length > 0 &&
      !/[\r\n]/u.test(annotation.reason)
  );
  markedExample(examples[annotation.index], annotation);
  byIndex.set(annotation.index, annotation);
}

const legend = [
  "## Reading the marked examples",
  "",
  "- In desired hits, bold marks the defective phrase or the related phrases that form the defective construction. Unmarked words supply context.",
  "- The reason explains the marked wording. A short example may have its complete construction marked when the defect spans that construction.",
  "- Desired no-hits identify preserved wording separately. The reason explains its useful literal meaning, supplied detail, or explicit rule exception.",
  "- Apply the same distinction to equivalent wording in the target paragraph.",
  ""
];
const rules = ["semantic-thinness", "superficial-analysis"];
const outputs = new Map();
const counts = {};

for (const rule of rules) {
  const selected = examples
    .map((example, index) => ({ ...example, index }))
    .filter((example) => example.rule === rule);
  const original = read(resolve(previous, `${rule}.md`));
  const lines = original.split("\n");
  const rendered = [];
  const recovered = [];
  let cursor = 0;
  for (const line of lines) {
    const example = selected[cursor];
    if (example && line === `- ${example.text}`) {
      const annotation = byIndex.get(example.index);
      const text = example.hit
        ? markedExample(example, annotation)
        : example.text;
      rendered.push(`- ${text}`);
      rendered.push(
        example.hit
          ? `  - Why this is a hit: ${annotation.reason}`
          : `  - Preserved wording: ${annotation.excerpts.map((excerpt) => `\`${excerpt}\``).join("; ")}. ${annotation.reason}`
      );
      recovered.push(`- ${text.replaceAll("**", "")}`);
      cursor += 1;
    } else {
      rendered.push(line);
      recovered.push(line);
    }
  }
  assert.equal(cursor, selected.length, `Unrendered examples for ${rule}`);
  assert.equal(
    recovered.join("\n"),
    original,
    `Example text or rulebook changed for ${rule}`
  );
  assert.equal(rendered[1], "");
  rendered.splice(2, 0, ...legend);
  outputs.set(`${rule}.md`, rendered.join("\n"));
  counts[rule] = {
    hits: selected.filter((example) => example.hit).length,
    noHits: selected.filter((example) => !example.hit).length
  };
}

const task = read(resolve(previous, "task.md"));
outputs.set(
  "task.md",
  task +
    "\n- In the rulebooks, bold spans mark defective wording in desired-hit examples. Their explanations identify the defect. Desired no-hits identify the preserved wording and its reason separately. Use these explicit contrasts to classify equivalent constructions.\n"
);
const sourceFiles = [
  "inputs.json",
  "demonstrations.json",
  "task.md",
  ...rules.map((rule) => `${rule}.md`)
];
const manifest = {
  previousPrompt: "../grounded-semantic",
  inferenceRun: false,
  examples: examples.length,
  counts,
  previousSourceHashes: Object.fromEntries(
    sourceFiles.map((name) => [name, hash(read(resolve(previous, name)))])
  ),
  annotationHashes: Object.fromEntries(
    annotationFiles.map((name) => [name, hash(read(resolve(directory, name)))])
  ),
  rendererSha256: hash(read(fileURLToPath(import.meta.url))),
  outputHashes: Object.fromEntries(
    [...outputs].map(([name, text]) => [name, hash(text)])
  )
};
outputs.set("manifest.json", JSON.stringify(manifest, null, 2) + "\n");
for (const [name, text] of outputs) {
  if (mode === "verify")
    assert.equal(
      read(resolve(directory, name)),
      text,
      `Stale generated file: ${name}`
    );
  else writeFileSync(resolve(directory, name), text);
}
console.log(
  JSON.stringify({
    mode,
    examples: examples.length,
    counts,
    validated: [
      "complete unique annotation coverage",
      "literal ordered non-overlapping excerpts",
      "unchanged example text and labels",
      "unchanged prior rulebook content",
      "exact generated output and hashes"
    ]
  })
);
