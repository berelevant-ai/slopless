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
import * as jev from "../runners/jev.mjs";

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
function cli(command, args = []) {
  return JSON.parse(
    execFileSync(
      process.execPath,
      [jevCli, command, "--dataset", file, ...args],
      {
        stdio: "pipe",
        env: { ...process.env, JEV_API_KEY: "synthetic-never-use" }
      }
    )
  );
}
function cliRejects(command, args, pattern) {
  assert.throws(
    () => cli(command, args),
    (error) => pattern.test(error.stderr?.toString())
  );
}
function syntheticBatches(rows, prompts, mode) {
  const batches = [];
  for (;;) {
    const plan = jev.batchPlans(
      rows,
      Object.keys(prompts.types),
      0.5,
      batches,
      mode
    )[batches.length];
    if (!plan) return batches;
    const request = buildRequest(
      "jev-1.13.0",
      prompts,
      plan.check,
      plan.items,
      rows
    );
    batches.push({
      stage: plan.stage,
      check: plan.check,
      index: plan.index,
      requestSha256: textHash(JSON.stringify(request)),
      elapsedMs: 0,
      response: {
        model: request.model,
        usage: { input_tokens: 1, output_tokens: 1 },
        answers: Object.fromEntries(
          plan.items.map(({ key, id }) => [
            key,
            { type: "noul", noul: id === "hit" ? 0.75 : 0.25 }
          ])
        )
      }
    });
  }
}
function runnerContext(
  family = "semantic-thinness",
  mode = "detect-and-highlight",
  promptDirectory = resolve("prompts/v1"),
  selected = promptDirectory === resolve("prompts/v1")
    ? "generic-realization"
    : undefined
) {
  const rows = loadDataset(file, family);
  const prompts = loadPrompts(promptDirectory, selected);
  const snapshot = jev.createSnapshot({
    dataset: file,
    promptDirectory,
    model: "jev-1.13.0",
    threshold: 0.5,
    checks: Object.keys(prompts.types),
    prompts,
    rows,
    family,
    mode
  });
  return { rows, prompts, snapshot };
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
  check("new family and classification-only public CLI", () => {
    const family = "puffery-and-overstatement";
    const data = {
      ...metadata,
      schemaVersion: 2,
      split: "development",
      labels: [
        {
          id: control.id,
          check: `${family}/generic-realization`,
          expected: false
        },
        {
          id: hit.id,
          check: `${family}/generic-realization`,
          expected: true,
          snippets: [fixture.hit]
        }
      ]
    };
    save(data);
    const args = [
      "--family",
      family,
      "--check",
      "generic-realization",
      "--mode",
      "classification-only",
      "--development-only"
    ];
    assert.equal(cli("validate", args).complete, false);
    assert.equal(jev.loadDataset(file, family).length, 2);
  });
  check(
    "development-only rejects metadata before SDK and target loading",
    () => {
      const forbiddenSdk = resolve(directory, "must-not-initialize.mjs");
      const args = [
        "--development-only",
        "--output",
        resolve(directory, "never.json"),
        "--sdk",
        forbiddenSdk
      ];
      for (const split of ["holdout", undefined]) {
        save({ ...metadata, split, textSha256: "0".repeat(64) });
        assert.throws(
          () => jev.preflightDataset(file, { developmentOnly: true }),
          /development-only mode requires split: development/
        );
        cliRejects(
          "run",
          args,
          /development-only mode requires split: development/
        );
      }
      save({ ...metadata, split: "development" });
      const other = resolve(directory, "innocent.md");
      writeFileSync(other, fixture.text);
      writeFileSync(
        other.slice(0, -3) + ".labels.json",
        JSON.stringify(metadata)
      );
      assert.throws(
        () => jev.preflightDataset(directory, { developmentOnly: true }),
        /development-only mode requires split: development/
      );
      cliRejects(
        "run",
        [...args, "--dataset", directory],
        /development-only mode requires split: development/
      );
      rmSync(other);
      rmSync(other.slice(0, -3) + ".labels.json");
      assert.deepEqual(jev.preflightDataset(file, { developmentOnly: true }), [
        file
      ]);
      save();
      assert.deepEqual(jev.preflightDataset(file), [file]);
      assert.equal(
        cli("validate", ["--check", "generic-realization"]).complete,
        false
      );
    }
  );
  check(
    "legacy snapshot validates scores and resumes offline with highlighting defaults",
    () => {
      const context = runnerContext();
      const snapshot = { ...context.snapshot };
      for (const field of ["family", "mode", "targetsSha256"])
        delete snapshot[field];
      const result = {
        snapshot,
        batches: syntheticBatches(
          context.rows,
          context.prompts,
          "detect-and-highlight"
        )
      };
      assert.deepEqual(
        result.batches.map(({ stage }) => stage),
        ["detection", "highlighting"]
      );
      const output = resolve(directory, "legacy.json");
      writeFileSync(output, JSON.stringify(result));
      const args = [
        "--check",
        "generic-realization",
        "--output",
        output,
        "--sdk",
        resolve(directory, "must-not-initialize.mjs")
      ];
      for (const command of ["validate", "score", "run"]) {
        const report = cli(command, args);
        assert.equal(report.complete, true);
        assert.equal(report.mode, "detect-and-highlight");
        assert.equal(report.family, "semantic-thinness");
        assert.equal(report.summaries[0].caught, 1);
        assert.ok(report.summaries[0].findings[0].sentences.length > 0);
      }
      const after = JSON.parse(readFileSync(output, "utf8"));
      assert.deepEqual(after.snapshot, snapshot);
      assert.deepEqual(after.batches, result.batches);
      assert.throws(
        () => jev.rescoreResult(after, context),
        /recorded target identity/
      );
      result.batches.pop();
      writeFileSync(output, JSON.stringify(result));
      assert.equal(cli("validate", args).complete, false);
      cliRejects("score", args, /output is incomplete/);
    }
  );
  check(
    "classification-only completion resume and new-family scoped no-hits",
    () => {
      const family = "puffery-and-overstatement";
      const promptDirectory = resolve(directory, "prompts");
      mkdirSync(promptDirectory);
      writeFileSync(
        resolve(promptDirectory, "shared.md"),
        "Judge the complete supplied passage."
      );
      writeFileSync(
        resolve(promptDirectory, "inflated-evaluation.md"),
        "Detect inflated evaluation."
      );
      writeFileSync(
        resolve(promptDirectory, "sweeping-generalization.md"),
        "Detect sweeping generalization."
      );
      const data = {
        ...metadata,
        schemaVersion: 2,
        split: "development",
        labels: [
          {
            id: control.id,
            check: `${family}/sweeping-generalization`,
            expected: false
          },
          {
            id: hit.id,
            check: `${family}/inflated-evaluation`,
            expected: true,
            snippets: [fixture.hit]
          }
        ]
      };
      save(data);
      const context = runnerContext(
        family,
        "classification-only",
        promptDirectory,
        undefined
      );
      const result = {
        snapshot: context.snapshot,
        batches: syntheticBatches(
          context.rows,
          context.prompts,
          "classification-only"
        )
      };
      assert.equal(result.batches.length, 2);
      assert.ok(result.batches.every(({ stage }) => stage === "detection"));
      const output = resolve(directory, "classification.json");
      writeFileSync(output, JSON.stringify(result));
      const args = [
        "--family",
        family,
        "--mode",
        "classification-only",
        "--prompts",
        promptDirectory,
        "--development-only",
        "--output",
        output,
        "--sdk",
        resolve(directory, "must-not-initialize.mjs")
      ];
      for (const command of ["validate", "score", "run"]) {
        const report = cli(command, args);
        assert.equal(report.complete, true);
        assert.equal(report.decisions, 4);
        assert.deepEqual(
          report.summaries.map(({ positives, cleanControls }) => [
            positives,
            cleanControls
          ]),
          [
            [1, 0],
            [0, 1]
          ]
        );
        assert.ok(
          report.summaries.every(({ findings }) =>
            findings.every((finding) => !Object.hasOwn(finding, "sentences"))
          )
        );
      }
      const recorded = JSON.parse(readFileSync(output, "utf8"));
      assert.deepEqual(recorded.batches, result.batches);
      assert.equal(jev.validateResult(recorded, context).complete, true);
      for (const plan of jev.batchPlans(
        context.rows,
        context.snapshot.checks,
        0.5,
        [],
        "classification-only"
      )) {
        const request = buildRequest(
          "jev-1.13.0",
          context.prompts,
          plan.check,
          plan.items,
          context.rows
        );
        assert.deepEqual(Object.keys(request.state).sort(), [
          "instructions",
          "types"
        ]);
        for (const question of Object.values(request.questions))
          assert.deepEqual(Object.keys(question.instructions).sort(), [
            "question",
            "rulebook",
            "target"
          ]);
        assert.ok(!JSON.stringify(request).includes('"expected"'));
        assert.ok(!JSON.stringify(request).includes('"snippets"'));
      }
      const partial = structuredClone(result);
      partial.batches.pop();
      writeFileSync(output, JSON.stringify(partial));
      assert.equal(cli("validate", args).complete, false);
      cliRejects("score", args, /output is incomplete/);
      // A local synthetic SDK exercises missing-batch resume without network access.
      const sdk = resolve(directory, "synthetic-sdk.mjs");
      writeFileSync(
        sdk,
        'export class TypeSafeClient { async systemOne(request) { return { model: request.model, usage: { input_tokens: 1, output_tokens: 1 }, answers: Object.fromEntries(Object.keys(request.questions).map(key => [key, { type: "noul", noul: key.startsWith("hit_") ? 0.75 : 0.25 }])) }; } }'
      );
      assert.equal(cli("run", [...args, "--sdk", sdk]).complete, true);
      const resumed = JSON.parse(readFileSync(output, "utf8"));
      assert.deepEqual(resumed.batches[0], partial.batches[0]);
      assert.equal(resumed.batches.length, 2);
      assert.equal(jev.validateResult(resumed, context).complete, true);

      const corrected = structuredClone(data);
      corrected.labels[1] = {
        id: hit.id,
        check: `${family}/inflated-evaluation`,
        expected: false
      };
      save(corrected);
      const correctedContext = runnerContext(
        family,
        "classification-only",
        promptDirectory,
        undefined
      );
      assert.throws(
        () => jev.validateResult(recorded, correctedContext),
        /Saved results require/
      );
      const before = structuredClone(recorded);
      const rescored = jev.rescoreResult(recorded, correctedContext);
      assert.deepEqual(recorded, before);
      for (const key of ["snapshot", "batches", "summaries", "inferenceSha256"])
        assert.deepEqual(rescored[key], recorded[key]);
      assert.equal(
        rescored.rescores[0].rescoredLabelsSha256,
        datasetHashes(file).labelsSha256
      );
      assert.equal(
        rescored.rescores[0].originalLabelsSha256,
        recorded.snapshot.labelsSha256
      );
      assert.equal(recorded.summaries[0].caught, 1);
      assert.equal(rescored.rescores[0].summaries[0].caught, 0);
      assert.deepEqual(rescored.rescores[0].summaries[0].falseAlarms, [hit.id]);
      writeFileSync(output, JSON.stringify(recorded));
      const report = cli("rescore", args);
      assert.equal(
        report.rescoredLabelsSha256,
        correctedContext.snapshot.labelsSha256
      );
      const firstRescore = JSON.parse(readFileSync(output, "utf8"));
      cli("rescore", args);
      const secondRescore = JSON.parse(readFileSync(output, "utf8"));
      assert.equal(secondRescore.rescores.length, 2);
      assert.deepEqual(secondRescore.rescores[0], firstRescore.rescores[0]);
      for (const field of [
        "model",
        "threshold",
        "family",
        "mode",
        "promptSha256",
        "textSha256",
        "targetsSha256"
      ]) {
        const changed = structuredClone(correctedContext);
        changed.snapshot[field] = "changed";
        assert.throws(() => jev.rescoreResult(recorded, changed));
      }
      for (const change of [
        (value) => {
          value.batches[0].requestSha256 = "0".repeat(64);
        },
        (value) => {
          Object.values(value.batches[0].response.answers)[0].noul = 0.9;
        },
        (value) => {
          value.summaries[0].caught = 0;
        },
        (value) => {
          value.batches.pop();
        }
      ]) {
        const changed = structuredClone(recorded);
        change(changed);
        assert.throws(() => jev.rescoreResult(changed, correctedContext));
      }
      const incomplete = structuredClone(recorded);
      incomplete.batches.pop();
      delete incomplete.inferenceSha256;
      delete incomplete.summaries;
      assert.throws(
        () => jev.rescoreResult(incomplete, correctedContext),
        /requires complete predictions/
      );
      for (const change of [
        (value) => {
          value.labels[0].check = `${family}/inflated-evaluation`;
        },
        (value) => {
          value.samples[0].id = "renamed";
          value.labels[0].id = "renamed";
        }
      ]) {
        const changed = structuredClone(corrected);
        change(changed);
        save(changed);
        cliRejects("rescore", args, /Saved results require|no group for check/);
      }
      const changedText = fixture.text.replace(
        fixture.control,
        "X".repeat(fixture.control.length)
      );
      save({ ...corrected, textSha256: textHash(changedText) }, changedText);
      cliRejects("rescore", args, /Saved results require/);
      save(corrected);
      cliRejects(
        "rescore",
        [...args, "--model", "changed-model"],
        /Saved results require/
      );
      writeFileSync(
        resolve(promptDirectory, "shared.md"),
        "A changed instruction."
      );
      cliRejects("rescore", args, /Saved results require/);
      assert.equal(
        jev.rescoreResult(recorded, correctedContext).rescores.length,
        1
      );
      const changedPrompt = structuredClone(correctedContext);
      changedPrompt.prompts.instructions = "A changed instruction.";
      assert.throws(() => jev.rescoreResult(recorded, changedPrompt));
    }
  );
  console.log(JSON.stringify({ checks }));
} finally {
  rmSync(directory, { recursive: true, force: true });
}
