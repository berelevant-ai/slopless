import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  datasetHashes,
  readDocument,
  readDocuments,
  textHash
} from "../runners/datasets.mjs";
import { buildRequest, loadDataset, loadPrompts } from "../runners/jev.mjs";

const fixture = JSON.parse(readFileSync(process.argv[2], "utf8"));
const jevCli = fileURLToPath(new URL("../runners/jev.mjs", import.meta.url));
mkdirSync(resolve(".fixture3"), { recursive: true });
const directory = mkdtempSync(resolve(".fixture3/dataset-contract-"));
const file = resolve(directory, "article.md");
const labelsFile = resolve(directory, "article.labels.json");
const control = {
  id: "control",
  start: 0,
  end: fixture.control.length,
  check: "semantic-thinness",
  group: "generic-realization",
  expected: false,
  reason: "A stated measurement.",
  evidence: []
};
const hit = {
  id: "hit",
  start: fixture.text.indexOf(fixture.hit),
  end: fixture.text.indexOf(fixture.hit) + fixture.hit.length,
  check: "semantic-thinness/generic-realization",
  group: "generic-realization",
  expected: true,
  reason: "An unspecified insight.",
  evidence: [fixture.hit]
};
const metadata = {
  schemaVersion: 1,
  textSha256: textHash(fixture.text),
  source: {
    name: "Dataset reader contract",
    originalPath: "behavior/fixtures/datasets/contract.json",
    commit: "contract"
  },
  split: "holdout",
  samples: [control, hit].map(({ id, start, end }) => ({ id, start, end })),
  labels: [control, hit]
};
const checks = [];
function save(data = metadata, text = fixture.text) {
  writeFileSync(file, text);
  writeFileSync(labelsFile, JSON.stringify(data));
}
function check(name, test) {
  save();
  test();
  checks.push({ name, passed: true });
}
function rejects(name, change, pattern) {
  check(name, () => {
    const data = structuredClone(metadata);
    change(data);
    save(data);
    assert.throws(() => readDocument(file), pattern);
  });
}
try {
  check("paired Markdown and labels", () =>
    assert.equal(readDocument(file).text, fixture.text)
  );
  check("independent paragraph ranges", () =>
    assert.deepEqual(
      loadDataset(file).map(({ text }) => text),
      [fixture.control, fixture.hit]
    )
  );
  check("empty labels carry no judgments", () => {
    save({ ...metadata, labels: [] });
    assert.equal(readDocument(file).metadata.labels.length, 0);
    assert.equal(readDocument(file).metadata.samples.length, 2);
    assert.throws(() => loadDataset(file), /no labeled/);
  });
  check("original numerical and categorical labels", () => {
    save({
      ...metadata,
      labels: [
        { ...hit, check: "specificity/score", expected: 4.5 },
        { ...control, check: "idiom/usage", expected: "literal" }
      ]
    });
    assert.deepEqual(
      readDocument(file).metadata.labels.map(({ expected }) => expected),
      [4.5, "literal"]
    );
  });
  check("individual annotation ratings", () => {
    save({
      ...metadata,
      labels: [{ ...hit, check: "vagueness/ratings", expected: [1, 3, 2] }]
    });
    assert.deepEqual(readDocument(file).metadata.labels[0].expected, [1, 3, 2]);
  });
  check("two issue types on one passage", () => {
    save({ ...metadata, labels: [hit, { ...hit, check: "another-issue" }] });
    assert.equal(readDocument(file).metadata.labels.length, 2);
  });
  check("minimal labels resolve sample ranges and preserve snippets", () => {
    save({
      ...metadata,
      schemaVersion: 2,
      split: "development",
      labels: [
        { id: control.id, check: hit.check, expected: false },
        {
          id: hit.id,
          check: hit.check,
          expected: true,
          snippets: [fixture.hit]
        }
      ]
    });
    const document = readDocument(file);
    assert.equal(document.labels[1].start, hit.start);
    assert.deepEqual(document.labels[1].evidence, [fixture.hit]);
    assert.deepEqual(document.metadata.labels[1].snippets, [fixture.hit]);
    assert.equal("start" in document.metadata.labels[1], false);
    assert.deepEqual(
      loadDataset(file).map(({ text, label }) => [text, label.expected]),
      [
        [fixture.control, false],
        [fixture.hit, true]
      ]
    );
  });
  check("minimal hit requires a snippet", () => {
    save({
      ...metadata,
      schemaVersion: 2,
      labels: [{ id: hit.id, check: hit.check, expected: true }]
    });
    assert.throws(() => readDocument(file), /snippets/);
  });
  check("minimal no-hit omits snippets", () => {
    save({
      ...metadata,
      schemaVersion: 2,
      labels: [
        { id: control.id, check: hit.check, expected: false, snippets: [] }
      ]
    });
    assert.throws(() => readDocument(file));
  });
  check("minimal snippets stay inside the named passage", () => {
    save({
      ...metadata,
      schemaVersion: 2,
      labels: [
        {
          id: control.id,
          check: hit.check,
          expected: true,
          snippets: [fixture.hit]
        }
      ]
    });
    assert.throws(() => readDocument(file), /evidence outside passage/);
  });
  rejects(
    "stale text checksum",
    (data) => {
      data.textSha256 = "0".repeat(64);
    },
    /stale labels checksum/
  );
  rejects(
    "range beyond text",
    (data) => {
      data.labels[0].end = fixture.text.length + 1;
    },
    /invalid range/
  );
  rejects(
    "negative range",
    (data) => {
      data.labels[0].start = -1;
    },
    /must be >= 0/
  );
  rejects(
    "empty range",
    (data) => {
      data.labels[0].end = 0;
    },
    /must be >= 1/
  );
  rejects(
    "evidence outside passage",
    (data) => {
      data.labels[0].evidence = [fixture.hit];
    },
    /evidence outside passage/
  );
  rejects(
    "duplicate check",
    (data) => {
      data.labels.push(data.labels[0]);
    },
    /duplicate check/
  );
  rejects(
    "inconsistent passage identifier",
    (data) => {
      data.labels[1].id = data.labels[0].id;
    },
    /inconsistent passage/
  );
  rejects(
    "duplicate sample identifier",
    (data) => {
      data.samples.push(data.samples[0]);
    },
    /duplicate sample/
  );
  rejects(
    "overlapping sample ranges",
    (data) => {
      data.samples[1].start = 0;
    },
    /invalid sample range/
  );
  rejects(
    "label without sample",
    (data) => {
      data.labels[0].id = "unknown";
    },
    /label has no sample/
  );
  rejects(
    "unknown schema property",
    (data) => {
      data.unknown = true;
    },
    /additional properties/
  );
  check("missing labels", () => {
    rmSync(labelsFile);
    assert.throws(() => readDocument(file), /ENOENT/);
  });
  check("orphan labels", () => {
    const orphan = resolve(directory, "missing.labels.json");
    writeFileSync(orphan, JSON.stringify(metadata));
    assert.throws(() => readDocuments(directory), /Orphan labels/);
    rmSync(orphan);
  });
  check("character boundaries", () => {
    const text = "A \u{1f600} result.";
    save(
      {
        ...metadata,
        samples: [{ id: hit.id, start: 3, end: text.length }],
        textSha256: textHash(text),
        labels: [{ ...hit, start: 3, end: text.length, evidence: [] }]
      },
      text
    );
    assert.throws(() => readDocument(file), /splits a character/);
  });
  check("scoped no-hit remains scoped", () => {
    save({
      ...metadata,
      labels: [{ ...control, check: "semantic-thinness/generic-realization" }]
    });
    assert.equal(
      readDocument(file).metadata.labels[0].check,
      "semantic-thinness/generic-realization"
    );
    assert.throws(() => loadDataset(file), /family-wide no-hit/);
  });
  check("Jev requests contain target text without labels", () => {
    const rows = loadDataset(file);
    const prompts = loadPrompts("prompts/v1", "generic-realization");
    const request = buildRequest(
      "jev-1.13.0",
      prompts,
      "generic-realization",
      rows.map(({ id }) => ({ id, key: id })),
      rows
    );
    for (const question of Object.values(request.questions))
      assert.deepEqual(Object.keys(question.instructions).sort(), [
        "question",
        "rulebook",
        "target"
      ]);
    assert.equal(request.questions.hit.instructions.target, fixture.hit);
    assert.ok(!JSON.stringify(request).includes(hit.reason));
  });
  check("dataset hashes track annotation changes", () => {
    const before = datasetHashes(file);
    save({
      ...metadata,
      labels: [{ ...control, reason: "A different rationale." }, hit]
    });
    const after = datasetHashes(file);
    assert.equal(after.textSha256, before.textSha256);
    assert.notEqual(after.labelsSha256, before.labelsSha256);
  });
  check("CLI protects text and labels from output overwrite", () => {
    for (const output of [file, labelsFile]) {
      assert.throws(
        () =>
          execFileSync(
            process.execPath,
            [
              jevCli,
              "validate",
              "--check",
              "generic-realization",
              "--dataset",
              file,
              "--output",
              output
            ],
            { stdio: "pipe" }
          ),
        (error) => error.stderr.toString().includes("Output must be separate")
      );
      assert.equal(readDocument(file).text, fixture.text);
    }
  });
  console.log(JSON.stringify({ checks }));
} finally {
  rmSync(directory, { recursive: true, force: true });
}
