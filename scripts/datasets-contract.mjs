// cspell:words noul rescored rescores
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  mkdirSync,
  existsSync,
  mkdtempSync,
  lstatSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  symlinkSync,
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
function wholeTextContext() {
  const directory = mkdtempSync(resolve(".fixture3/batching-contract-"));
  const dataset = resolve(directory, "texts.md");
  const promptsDirectory = resolve(directory, "prompts");
  mkdirSync(promptsDirectory);
  writeFileSync(
    resolve(promptsDirectory, "shared.md"),
    "Judge the complete synthetic text."
  );
  writeFileSync(
    resolve(promptsDirectory, "complete-text.md"),
    "Detect the synthetic claim in the final answer."
  );
  let text = "";
  const samples = [];
  const labels = [];
  for (let number = 0; number < 200; number++) {
    const expected = number < 100;
    const id = `${expected ? "hit" : "clean"}-${String(number).padStart(3, "0")}`;
    const target =
      `Question: What did synthetic inspection ${number} find?\n\n` +
      "The recorder checked the synthetic workshop. Every observation retained its complete context in the written report.\n\n".repeat(
        60
      ) +
      `Final answer: The inspection recorded a synthetic ${expected ? "claim" : "control"}.`;
    const start = text.length;
    text += target + "\n\n";
    samples.push({ id, start, end: start + target.length });
    labels.push({
      id,
      check: "synthetic-family/complete-text",
      expected,
      ...(expected ? { snippets: [target] } : {})
    });
  }
  const metadata = {
    schemaVersion: 2,
    textSha256: textHash(text),
    split: "development",
    source: {
      name: "Complete synthetic batching contract",
      originalPath: "synthetic",
      commit: "contract"
    },
    samples,
    labels
  };
  writeFileSync(dataset, text);
  writeFileSync(
    dataset.slice(0, -3) + ".labels.json",
    JSON.stringify(metadata)
  );
  const rows = loadDataset(dataset, "synthetic-family");
  const prompts = loadPrompts(promptsDirectory);
  const snapshotFor = (batchSize) =>
    jev.createSnapshot({
      dataset,
      promptDirectory: promptsDirectory,
      model: "jev-1.13.0",
      threshold: 0.5,
      checks: ["complete-text"],
      prompts,
      rows,
      family: "synthetic-family",
      mode: "classification-only",
      ...(batchSize === undefined ? {} : { batchSize })
    });
  const calls = resolve(directory, "calls.jsonl");
  const targets = resolve(directory, "targets.json");
  writeFileSync(
    targets,
    JSON.stringify(
      Object.fromEntries(
        rows.map((row) => [`${row.id}_complete-text`, row.text])
      )
    )
  );
  const sdk = resolve(directory, "sdk.mjs");
  writeFileSync(
    sdk,
    `import assert from "node:assert/strict";
import {appendFileSync,readFileSync} from "node:fs";
const targets=JSON.parse(readFileSync(${JSON.stringify(targets)},"utf8"));
export class TypeSafeClient { async systemOne(request) {
  for(const [key,question] of Object.entries(request.questions)) assert.equal(question.instructions.target,targets[key]);
  assert.ok(Object.keys(request.questions).length<=16);
  appendFileSync(${JSON.stringify(calls)},JSON.stringify(request)+"\\n");
  return {model:request.model,usage:{input_tokens:1,output_tokens:1},answers:Object.fromEntries(Object.keys(request.questions).map(key=>[key,{type:"noul",noul:key.startsWith("hit-")?0.75:0.25}]))};
} }`
  );
  return {
    directory,
    dataset,
    metadata,
    rows,
    prompts,
    snapshotFor,
    calls,
    sdk,
    args: [
      "--dataset",
      dataset,
      "--family",
      "synthetic-family",
      "--mode",
      "classification-only",
      "--development-only",
      "--prompts",
      promptsDirectory,
      "--sdk",
      sdk
    ]
  };
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
  check("atomic JSON saves preserve inputs behind temporary symlinks", () => {
    const data = { ...metadata, split: "development" };
    save(data);
    const promptDirectory = resolve(directory, "atomic-prompts");
    mkdirSync(promptDirectory);
    writeFileSync(
      resolve(promptDirectory, "shared.md"),
      "Judge the synthetic passage."
    );
    writeFileSync(
      resolve(promptDirectory, "generic-realization.md"),
      "Detect an unspecified realization."
    );
    const sdk = resolve(directory, "atomic-sdk.mjs");
    writeFileSync(
      sdk,
      'export class TypeSafeClient { async systemOne(request) { return { model: request.model, usage: { input_tokens: 1, output_tokens: 1 }, answers: Object.fromEntries(Object.keys(request.questions).map(key => [key, { type: "noul", noul: key.startsWith("hit_") ? 0.75 : 0.25 }])) }; } }'
    );
    const output = resolve(directory, "atomic-result.json");
    symlinkSync(file, output + ".tmp");
    const temporaryLink = lstatSync(output + ".tmp", { bigint: true });
    const inputs = [file, labelsFile].map((path) => ({
      path,
      bytes: readFileSync(path),
      stat: statSync(path, { bigint: true })
    }));
    const args = [
      "--prompts",
      promptDirectory,
      "--development-only",
      "--output",
      output,
      "--sdk",
      sdk
    ];
    assert.equal(cli("run", args).complete, true);
    const completed = JSON.parse(readFileSync(output));
    assert.equal(completed.batches.length, 2);
    const partial = structuredClone(completed);
    partial.batches.pop();
    delete partial.summaries;
    delete partial.inferenceSha256;
    writeFileSync(output, JSON.stringify(partial));
    assert.equal(cli("run", args).complete, true);
    const resumed = JSON.parse(readFileSync(output));
    assert.deepEqual(resumed.batches[0], partial.batches[0]);
    for (const input of inputs) {
      assert.deepEqual(readFileSync(input.path), input.bytes);
      const after = statSync(input.path, { bigint: true });
      assert.equal(after.ino, input.stat.ino);
      assert.equal(after.mtimeNs, input.stat.mtimeNs);
    }
    const corrected = structuredClone(data);
    corrected.labels[1].reason = "Synthetic reviewed annotation correction.";
    save(corrected);
    const correctedBytes = readFileSync(labelsFile);
    assert.equal(cli("rescore", args).complete, true);
    assert.deepEqual(readFileSync(file), inputs[0].bytes);
    assert.deepEqual(readFileSync(labelsFile), correctedBytes);
    const rescored = JSON.parse(readFileSync(output));
    for (const key of ["snapshot", "batches", "summaries", "inferenceSha256"])
      assert.deepEqual(rescored[key], resumed[key]);
    assert.equal(rescored.rescores.length, 1);
    save(data);
    const before = {
      bytes: readFileSync(output),
      stat: statSync(output, { bigint: true })
    };
    for (const command of ["score", "run"])
      assert.equal(
        cli(command, [
          ...args,
          "--sdk",
          resolve(directory, "must-not-initialize.mjs")
        ]).complete,
        true
      );
    assert.deepEqual(readFileSync(output), before.bytes);
    const after = statSync(output, { bigint: true });
    assert.equal(after.ino, before.stat.ino);
    assert.equal(after.mtimeNs, before.stat.mtimeNs);
    assert.equal(
      lstatSync(output + ".tmp", { bigint: true }).ino,
      temporaryLink.ino
    );
    assert.equal(
      readdirSync(directory).some((name) => name.startsWith(".atomic-json-")),
      false
    );
  });
  check("atomic JSON writer cleans failed replacements", () => {
    const output = resolve(directory, "atomic-failure.json");
    mkdirSync(output);
    const sentinel = resolve(output, "sentinel.txt");
    writeFileSync(sentinel, "Preserve this synthetic directory.");
    const names = readdirSync(directory).sort();
    assert.throws(
      () => jev.writeAtomicJson(output, { synthetic: true }),
      /EISDIR|ENOTEMPTY/
    );
    assert.deepEqual(readdirSync(directory).sort(), names);
    assert.equal(
      readFileSync(sentinel, "utf8"),
      "Preserve this synthetic directory."
    );
    const previous = resolve(directory, "atomic-previous.json");
    writeFileSync(previous, '{"original":true}\n');
    const before = {
      bytes: readFileSync(previous),
      stat: statSync(previous, { bigint: true })
    };
    const circular = {};
    circular.self = circular;
    assert.throws(() => jev.writeAtomicJson(previous, circular), /circular/i);
    assert.deepEqual(readFileSync(previous), before.bytes);
    const after = statSync(previous, { bigint: true });
    assert.equal(after.ino, before.stat.ino);
    assert.equal(after.mtimeNs, before.stat.mtimeNs);
    assert.equal(
      readdirSync(directory).some((name) => name.startsWith(".atomic-json-")),
      false
    );
  });
  check(
    "configurable batching preserves complete texts and legacy defaults",
    () => {
      const context = wholeTextContext();
      try {
        const { rows, prompts, snapshotFor } = context;
        const defaults = jev.batchPlans(
          rows,
          ["complete-text"],
          0.5,
          [],
          "classification-only"
        );
        const explicit = jev.batchPlans(
          rows,
          ["complete-text"],
          0.5,
          [],
          "classification-only",
          100
        );
        assert.equal(JSON.stringify(defaults), JSON.stringify(explicit));
        const historical = [0, 1].map((index) => ({
          stage: "detection",
          check: "complete-text",
          index: index + 1,
          items: rows
            .slice(index * 100, (index + 1) * 100)
            .map((row) => ({ id: row.id, key: `${row.id}_complete-text` }))
        }));
        assert.equal(JSON.stringify(defaults), JSON.stringify(historical));
        for (const [index, plan] of defaults.entries()) {
          const request = JSON.stringify(
            buildRequest("jev-1.13.0", prompts, plan.check, plan.items, rows)
          );
          assert.equal(
            request,
            JSON.stringify(
              buildRequest(
                "jev-1.13.0",
                prompts,
                historical[index].check,
                historical[index].items,
                rows
              )
            )
          );
          assert.equal(
            textHash(request),
            textHash(
              JSON.stringify(
                buildRequest(
                  "jev-1.13.0",
                  prompts,
                  explicit[index].check,
                  explicit[index].items,
                  rows
                )
              )
            )
          );
        }
        assert.equal(
          JSON.stringify(snapshotFor()),
          JSON.stringify(snapshotFor(100))
        );
        assert.equal(Object.hasOwn(snapshotFor(), "batchSize"), false);
        assert.equal(snapshotFor(16).batchSize, 16);
        const plans = jev.batchPlans(
          rows,
          ["complete-text"],
          0.5,
          [],
          "classification-only",
          16
        );
        assert.equal(plans.length, 13);
        assert.deepEqual(
          plans.map((plan) => plan.items.length),
          [...Array(12).fill(16), 8]
        );
        assert.equal(
          new Set(plans.flatMap((plan) => plan.items.map((item) => item.id)))
            .size,
          200
        );
        for (const plan of plans) {
          const request = buildRequest(
            "jev-1.13.0",
            prompts,
            plan.check,
            plan.items,
            rows
          );
          for (const item of plan.items)
            assert.equal(
              request.questions[item.key].instructions.target,
              rows.find((row) => row.id === item.id).text
            );
        }
        assert.equal(
          jev.batchPlans(
            rows,
            ["complete-text"],
            0.5,
            [],
            "classification-only",
            1
          ).length,
          200
        );
        const output = resolve(context.directory, "result.json");
        const args = [
          ...context.args,
          "--batch-size",
          "16",
          "--output",
          output
        ];
        assert.equal(cli("run", args).requests, 13);
        const completed = JSON.parse(readFileSync(output));
        assert.equal(completed.snapshot.batchSize, 16);
        assert.deepEqual(
          completed.batches.map(
            (batch) => Object.keys(batch.response.answers).length
          ),
          plans.map((plan) => plan.items.length)
        );
        const partial = structuredClone(completed);
        partial.batches = partial.batches.slice(0, 1);
        delete partial.summaries;
        delete partial.inferenceSha256;
        writeFileSync(output, JSON.stringify(partial));
        writeFileSync(context.calls, "");
        assert.equal(cli("run", args).requests, 13);
        const resumed = JSON.parse(readFileSync(output));
        assert.deepEqual(resumed.batches[0], partial.batches[0]);
        const requests = readFileSync(context.calls, "utf8")
          .trim()
          .split("\n")
          .map((line) => JSON.parse(line));
        assert.equal(requests.length, 12);
        const keys = requests.flatMap((request) =>
          Object.keys(request.questions)
        );
        assert.equal(keys.length, 184);
        assert.equal(new Set(keys).size, 184);
        assert.ok(
          Object.keys(partial.batches[0].response.answers).every(
            (key) => !keys.includes(key)
          )
        );
        const before = {
          bytes: readFileSync(output),
          stat: statSync(output, { bigint: true })
        };
        for (const command of ["score", "run"])
          assert.equal(
            cli(command, [
              ...args,
              "--sdk",
              resolve(context.directory, "must-not-initialize.mjs")
            ]).complete,
            true
          );
        assert.deepEqual(readFileSync(output), before.bytes);
        const after = statSync(output, { bigint: true });
        assert.equal(after.ino, before.stat.ino);
        assert.equal(after.mtimeNs, before.stat.mtimeNs);
        const changed = structuredClone(context.metadata);
        changed.labels[0] = { ...changed.labels[0], expected: false };
        delete changed.labels[0].snippets;
        writeFileSync(
          context.dataset.slice(0, -3) + ".labels.json",
          JSON.stringify(changed)
        );
        assert.equal(cli("rescore", args).complete, true);
        const rescored = JSON.parse(readFileSync(output));
        for (const key of [
          "snapshot",
          "batches",
          "summaries",
          "inferenceSha256"
        ])
          assert.deepEqual(rescored[key], resumed[key]);
        assert.equal(rescored.rescores.length, 1);
        assert.equal(rescored.rescores[0].summaries[0].caught, 99);
      } finally {
        rmSync(context.directory, { recursive: true, force: true });
      }
    }
  );
  check(
    "batch sizes bind replay settings and reject invalid inputs early",
    () => {
      const context = wholeTextContext();
      try {
        const { rows, prompts, snapshotFor } = context;
        for (const size of [0, -1, 1.5, 101, NaN, Infinity, "16", null]) {
          assert.throws(
            () =>
              jev.batchPlans(
                rows,
                ["complete-text"],
                0.5,
                [],
                "classification-only",
                size
              ),
            /Batch size/
          );
          assert.throws(() => snapshotFor(size), /Batch size/);
        }
        const output = resolve(context.directory, "saved.json");
        writeFileSync(
          output,
          JSON.stringify({ snapshot: snapshotFor(16), batches: [] })
        );
        for (const command of ["validate", "score", "run", "rescore"]) {
          for (const size of ["8", "100"])
            cliRejects(
              command,
              [
                ...context.args,
                "--output",
                output,
                "--batch-size",
                size,
                "--dataset",
                resolve(context.directory, "must-not-read.md"),
                "--sdk",
                resolve(context.directory, "must-not-initialize.mjs")
              ],
              /same batch size/
            );
          for (const size of [
            "0",
            "-1",
            "1.5",
            "101",
            "NaN",
            "Infinity",
            "invalid"
          ])
            cliRejects(
              command,
              [
                ...context.args,
                "--output",
                output,
                `--batch-size=${size}`,
                "--dataset",
                resolve(context.directory, "must-not-read.md"),
                "--sdk",
                resolve(context.directory, "must-not-initialize.mjs")
              ],
              /Batch size/
            );
        }
        const invalidSaved = {
          snapshot: { ...snapshotFor(), batchSize: null },
          batches: []
        };
        writeFileSync(output, JSON.stringify(invalidSaved));
        for (const command of ["validate", "score", "run", "rescore"])
          cliRejects(
            command,
            [
              ...context.args,
              "--output",
              output,
              "--batch-size",
              "100",
              "--dataset",
              resolve(context.directory, "must-not-read.md")
            ],
            /Batch size/
          );
        assert.throws(
          () =>
            jev.validateResult(invalidSaved, {
              rows,
              prompts,
              snapshot: snapshotFor()
            }),
          /Batch size/
        );
        const context16 = { rows, prompts, snapshot: snapshotFor(16) };
        for (const size of [8, 100])
          assert.throws(
            () =>
              jev.validateResult(
                { snapshot: snapshotFor(size), batches: [] },
                context16
              ),
            /Saved results require/
          );
        const defaults = { snapshot: snapshotFor(), batches: [] };
        assert.equal(
          jev.validateResult(defaults, {
            rows,
            prompts,
            snapshot: snapshotFor(100)
          }).complete,
          false
        );
      } finally {
        rmSync(context.directory, { recursive: true, force: true });
      }
    }
  );
  check("configurable highlighting retains sentence request boundaries", () => {
    const context = wholeTextContext();
    try {
      const { rows, prompts } = context;
      const batches = [];
      for (;;) {
        const plans = jev.batchPlans(
          rows,
          ["complete-text"],
          0.5,
          batches,
          "detect-and-highlight",
          16
        );
        const plan = plans[batches.length];
        if (!plan) break;
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
              plan.items.map((item) => [
                item.key,
                { type: "noul", noul: item.id === rows[0].id ? 0.75 : 0.25 }
              ])
            )
          }
        });
        if (plan.stage === "highlighting")
          for (const item of plan.items)
            assert.equal(
              request.questions[item.key].instructions.target,
              rows[0].text
            );
      }
      const highlighting = batches.filter(
        (batch) => batch.stage === "highlighting"
      );
      assert.ok(highlighting.length > 1);
      assert.equal(
        highlighting.reduce(
          (sum, batch) => sum + Object.keys(batch.response.answers).length,
          0
        ),
        rows[0].sentences.length
      );
      assert.ok(
        highlighting.every(
          (batch) => Object.keys(batch.response.answers).length <= 16
        )
      );
      const snapshot = {
        ...context.snapshotFor(16),
        mode: "detect-and-highlight"
      };
      assert.equal(
        jev.validateResult({ snapshot, batches }, { snapshot, rows, prompts })
          .complete,
        true
      );
    } finally {
      rmSync(context.directory, { recursive: true, force: true });
    }
  });
  check(
    "invalid cached JSON types preserve files before target loading",
    () => {
      const context = wholeTextContext();
      try {
        const output = resolve(context.directory, "invalid-cache.json");
        const marker = resolve(context.directory, "sdk-initialized.txt");
        const trace = resolve(context.directory, "target-read.txt");
        const hook = resolve(context.directory, "cache-guard.mjs");
        writeFileSync(
          hook,
          `import fs from "node:fs";
import {syncBuiltinESMExports} from "node:module";
const read=fs.readFileSync;
fs.readFileSync=function(path,...args) {
  if(String(path)===${JSON.stringify(context.dataset)} || String(path).startsWith(${JSON.stringify(resolve(context.directory, "prompts") + "/")})) {
    fs.writeFileSync(${JSON.stringify(trace)},"target read");
    throw new Error("TARGET_READ_BEFORE_CACHE_VALIDATION");
  }
  return read.call(this,path,...args);
};
syncBuiltinESMExports();`
        );
        writeFileSync(
          context.sdk,
          `import {writeFileSync} from "node:fs";
writeFileSync(${JSON.stringify(marker)},"SDK initialized");
throw new Error("SDK_INITIALIZED_BEFORE_CACHE_VALIDATION");`
        );
        for (const cached of [
          null,
          [],
          [{}],
          false,
          true,
          0,
          7,
          "",
          "invalid"
        ]) {
          for (const command of ["validate", "score", "run", "rescore"]) {
            writeFileSync(output, JSON.stringify(cached) + "\n");
            const before = {
              bytes: readFileSync(output),
              stat: statSync(output, { bigint: true })
            };
            const run = spawnSync(
              process.execPath,
              [
                "--import",
                hook,
                jevCli,
                command,
                ...context.args,
                "--output",
                output
              ],
              {
                encoding: "utf8",
                env: { ...process.env, JEV_API_KEY: "synthetic-never-use" }
              }
            );
            assert.equal(run.status, 1, run.stderr);
            assert.match(
              run.stderr,
              /Saved result must be a non-null JSON object/
            );
            assert.deepEqual(readFileSync(output), before.bytes);
            const after = statSync(output, { bigint: true });
            assert.equal(after.ino, before.stat.ino);
            assert.equal(after.mtimeNs, before.stat.mtimeNs);
            assert.equal(existsSync(marker), false);
            assert.equal(existsSync(trace), false);
          }
        }
        for (const destination of [
          context.dataset,
          context.dataset.slice(0, -3) + ".labels.json"
        ]) {
          const before = {
            bytes: readFileSync(destination),
            stat: statSync(destination, { bigint: true })
          };
          const run = spawnSync(
            process.execPath,
            [
              "--import",
              hook,
              jevCli,
              "run",
              ...context.args,
              "--output",
              destination
            ],
            {
              encoding: "utf8",
              env: { ...process.env, JEV_API_KEY: "synthetic-never-use" }
            }
          );
          assert.equal(run.status, 1);
          assert.match(run.stderr, /Output must be separate from inputs/);
          assert.deepEqual(readFileSync(destination), before.bytes);
          const after = statSync(destination, { bigint: true });
          assert.equal(after.ino, before.stat.ino);
          assert.equal(after.mtimeNs, before.stat.mtimeNs);
          assert.equal(existsSync(marker), false);
          assert.equal(existsSync(trace), false);
        }
      } finally {
        rmSync(context.directory, { recursive: true, force: true });
      }
    }
  );
  console.log(JSON.stringify({ checks }));
} finally {
  rmSync(directory, { recursive: true, force: true });
}
