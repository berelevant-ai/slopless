import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  aggregate,
  paragraphTargets,
  validateSeal
} from "./jev-paragraphs.mjs";
import { loadDataset } from "./jev.mjs";

const baselinePath =
  "runners/results/wordiness-and-redundancy-v16-mixed-holdout.json";
const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
const rows = loadDataset(baseline.snapshot.dataset, baseline.snapshot.family);
const targets = paragraphTargets(rows);

test("all frozen texts retain every non-whitespace character in ordered exact slices", () => {
  assert.equal(rows.length, 200);
  assert.equal(
    new Set(targets.map((target) => target.id)).size,
    targets.length
  );
  for (const row of rows) {
    const passages = targets.filter((target) => target.parentId === row.id);
    let end = 0;
    for (const passage of passages) {
      assert.ok(passage.start >= end);
      assert.equal(row.text.slice(end, passage.start).trim(), "");
      assert.equal(row.text.slice(passage.start, passage.end), passage.text);
      end = passage.end;
    }
    assert.equal(row.text.slice(end).trim(), "");
  }
});

test("heading chains stay with the opening and trailing headings remain present", () => {
  const text =
    "# Guide\n\n## Collection\n\nCollection starts at two.\n\nBring the ticket.\n\n## Contact";
  assert.deepEqual(
    paragraphTargets([{ id: "heading", text }]).map((target) => target.text),
    [
      "# Guide\n\n## Collection\n\nCollection starts at two.",
      "Bring the ticket.",
      "## Contact"
    ]
  );
});

test("unsupported block structures fail before provider initialization", () => {
  for (const text of [
    "- First item",
    "> Quoted block",
    "```\ncode\n```",
    "Title\n---",
    "Title\n=",
    "    indented code",
    "Column | Other\n--- | ---\nValue | Other",
    "| Column | Other |\n| --- | --- |\n| Value | Other |",
    "<div>Text</div>"
  ]) {
    assert.throws(
      () => paragraphTargets([{ id: "unsupported", text }]),
      /unsupported Markdown/
    );
  }
});

test("raw probability edits fail the seal even when the parent maximum is unchanged", () => {
  const result = JSON.parse(
    readFileSync(
      "runners/results/wordiness-and-redundancy-v16-paragraph-holdout.json",
      "utf8"
    )
  );
  validateSeal(result);
  const changed = structuredClone(result);
  const answer = changed.batches
    .flatMap((batch) => Object.entries(batch.response.answers))
    .find(([key]) => key === "000040-002-p001_redundancy")[1];
  assert.equal(answer.noul, 0.15);
  answer.noul = 0;
  assert.throws(
    () => validateSeal(changed),
    /Saved paragraph predictions changed/
  );
});

test("parent scoring retains all labels and whole-text repeated-explanation probabilities", () => {
  // Transport the saved parent probabilities through every child to test aggregation without new model answers.
  const answers = Object.assign(
    {},
    ...baseline.batches.map((batch) => batch.response.answers)
  );
  const childAnswers = Object.fromEntries(
    targets.flatMap((target) =>
      ["wordiness", "redundancy"].map((check) => [
        `${target.id}_${check}`,
        answers[`${target.parentId}_${check}`]
      ])
    )
  );
  const result = aggregate(rows, targets, baseline, [
    { response: { answers: childAnswers } }
  ]);
  assert.deepEqual(result.summaries, baseline.summaries);
  assert.deepEqual(result.mixed, baseline.mixed);
  assert.deepEqual(result.changes, []);
  delete childAnswers[`${targets[0].id}_wordiness`];
  assert.throws(() =>
    aggregate(rows, targets, baseline, [
      { response: { answers: childAnswers } }
    ])
  );
});

test("CLI preflight validates the real baseline without credentials or network access", () => {
  const result = JSON.parse(
    execFileSync(
      process.execPath,
      [
        "runners/jev-paragraphs.mjs",
        "validate",
        "--baseline",
        baselinePath,
        "--output",
        ".fixture3/paragraph-preflight-unused.json"
      ],
      {
        encoding: "utf8",
        env: { ...process.env, JEV_API_KEY: "" }
      }
    )
  );
  assert.equal(result.texts, 200);
  assert.equal(result.paragraphs, targets.length);
  assert.equal(result.complete, false);
});
