import assert from "node:assert/strict";
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setImmediate } from "node:timers/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { createSlopless, listChecks } from "../dist/index.js";

const takeaway = "semantic-thinness:empty-takeaway";
const redundancy = "wordiness-and-redundancy:redundancy";
const wordiness = "wordiness-and-redundancy:wordiness";
const framing = "boilerplate-and-signposting:unnecessary-framing";
const emptyBeat = "narrative-craft:empty-beat";
const timestamps = "narrative-craft:fake-timestamps";
const repeated = "wordiness-and-redundancy:repeated-explanation";
const catalog = listChecks();

function client(answer = () => 0.1) {
  const seen = [];
  return {
    seen,
    async judge(input, signal) {
      signal.throwIfAborted();
      seen.push(structuredClone(input));
      return Object.fromEntries(
        Object.keys(input.questions).map((id) => [id, answer(input, id)])
      );
    }
  };
}

function paragraphRequest(input, checks, paragraph) {
  assert.deepEqual(Object.keys(input).sort(), [
    "input",
    "model",
    "paragraph",
    "questions"
  ]);
  assert.equal(input.input, "paragraph");
  assert.equal(
    input.model,
    catalog.find((check) => check.id === checks[0]).model
  );
  assert.deepEqual(input.paragraph, paragraph);
  assert.deepEqual(Object.keys(input.questions).sort(), [...checks].sort());
  for (const question of Object.values(input.questions)) {
    assert.ok(
      Object.keys(question).every((key) =>
        ["instructions", "yes", "no"].includes(key)
      )
    );
    const instructions = question.instructions;
    assert.deepEqual(
      Object.keys(instructions)
        .filter((key) => key !== "heading")
        .sort(),
      ["instructions", "question", "rulebook", "target"]
    );
    for (const key of ["question", "instructions", "rulebook", "target"]) {
      assert.equal(typeof instructions[key], "string", key);
      assert.ok(instructions[key].trim().length > 0, key);
    }
    assert.equal(Object.hasOwn(question, "yes"), Object.hasOwn(question, "no"));
    if (Object.hasOwn(question, "yes")) {
      for (const key of ["yes", "no"]) {
        assert.equal(typeof question[key], "string", key);
        assert.ok(question[key].trim().length > 0, key);
      }
    }
  }
}

function findings(result) {
  return result.messages
    .map(({ ruleId, range }) => ({ ruleId, range }))
    .sort(
      (a, b) => a.range[0] - b.range[0] || a.ruleId.localeCompare(b.ruleId)
    );
}

function finding(id, start, text) {
  return {
    ruleId: `slopless/${id.replace(":", "/")}`,
    range: [start, start + text.length]
  };
}

function directory(t) {
  const cwd = mkdtempSync(join(tmpdir(), "slopless-paragraph-batching-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  return cwd;
}

test("three paragraph checks share one request per native paragraph and keep headings question-local", async () => {
  const texts = ["**First paragraph.**", "Second paragraph."];
  const source = `# Batch heading\n\n> ${texts[0]}\n\n- ${texts[1]}\n`;
  const checks = [takeaway, redundancy, framing];
  const jev = client((input, id) => {
    const selected = { P1: [takeaway, framing], P2: [redundancy] };
    return selected[input.paragraph?.id]?.includes(id) ? 0.9 : 0.1;
  });
  const result = await createSlopless({ checks, jev }).lintText(
    source,
    "native.md"
  );

  assert.equal(jev.seen.length, texts.length);
  for (const [index, input] of [...jev.seen]
    .sort((a, b) => a.paragraph.id.localeCompare(b.paragraph.id))
    .entries()) {
    paragraphRequest(input, checks, {
      id: `P${index + 1}`,
      text: texts[index]
    });
    assert.equal(Object.hasOwn(input.paragraph, "heading"), false);
    for (const id of checks) {
      const instructions = input.questions[id].instructions;
      if (index === 0 && id !== takeaway) {
        assert.equal(instructions.heading, "# Batch heading");
      } else {
        assert.equal(Object.hasOwn(instructions, "heading"), false);
      }
    }
  }
  assert.deepEqual(findings(result), [
    finding(framing, source.indexOf(texts[0]), texts[0]),
    finding(takeaway, source.indexOf(texts[0]), texts[0]),
    finding(redundancy, source.indexOf(texts[1]), texts[1])
  ]);
});

test("batched questions retain their own single-check prompts and optional yes/no criteria", async () => {
  const checks = [takeaway, redundancy, framing];
  const source = "A concrete paragraph.";
  const isolated = new Map();
  for (const id of checks) {
    const jev = client();
    await createSlopless({ checks: [id], jev }).lintText(source, "isolated.md");
    assert.equal(jev.seen.length, 1);
    paragraphRequest(jev.seen[0], [id], { id: "P1", text: source });
    isolated.set(id, jev.seen[0].questions[id]);
  }
  const jev = client();
  await createSlopless({ checks, jev }).lintText(source, "combined.md");
  assert.equal(jev.seen.length, 1);
  paragraphRequest(jev.seen[0], checks, { id: "P1", text: source });
  const titles = new Map([
    [takeaway, "# Empty Takeaway"],
    [redundancy, "# Redundancy"],
    [framing, "# Unnecessary Framing"]
  ]);
  for (const id of checks) {
    const question = jev.seen[0].questions[id];
    assert.deepEqual(question, isolated.get(id), id);
    for (const [other, title] of titles) {
      assert.equal(
        question.instructions.rulebook.includes(title),
        other === id
      );
    }
  }
  const questions = jev.seen[0].questions;
  assert.equal(Object.hasOwn(questions[takeaway], "yes"), false);
  assert.equal(Object.hasOwn(questions[takeaway], "no"), false);
  assert.match(
    questions[redundancy].instructions.question,
    /duplicated information without a useful function/
  );
  assert.equal(
    questions[redundancy].yes,
    "A phrase, modifier, adjacent statement, or heading and opening express the same information twice without a relevant distinction, useful clarification, emphasis or action."
  );
  assert.equal(
    questions[redundancy].no,
    "The recurrence adds a meaningful degree, event, scope, clarification, confirmation, instruction or summary, or the wording is being documented. Elaborate wording alone is a separate issue."
  );
});

test("all 52 selected paragraph checks are submitted together without a fixed question cap", async () => {
  const checks = catalog
    .filter((check) => check.backend === "jev" && check.input === "paragraph")
    .map((check) => check.id);
  assert.equal(checks.length, 52);
  assert.equal(
    new Set(checks.map((id) => catalog.find((c) => c.id === id).model)).size,
    1
  );
  const jev = client();
  const source = "The valve closes after five seconds.";
  const result = await createSlopless({ checks, jev }).lintText(
    source,
    "all.md"
  );
  assert.equal(jev.seen.length, 1);
  paragraphRequest(jev.seen[0], checks, { id: "P1", text: source });
  assert.deepEqual(result.messages, []);
});

test("configured warning severity and native comment suppressions remain independent across batched checks", async (t) => {
  const cwd = directory(t);
  mkdirSync(join(cwd, "node_modules"));
  symlinkSync(
    fileURLToPath(new URL("..", import.meta.url)),
    join(cwd, "node_modules/slopless"),
    "dir"
  );
  writeFileSync(
    join(cwd, ".textlintrc.json"),
    JSON.stringify({
      rules: {
        "preset-slopless": { redundancy: { severity: "warning" } }
      }
    })
  );
  const checks = [redundancy, wordiness];
  const texts = ["First paragraph.", "Second paragraph.", "Third paragraph."];
  const redundancyReport = "slopless/wordiness-and-redundancy/redundancy";
  const wordinessReport = "slopless/wordiness-and-redundancy/wordiness";
  const source = [
    `<!-- textlint-disable ${redundancyReport} -->`,
    texts[0],
    `<!-- textlint-enable ${redundancyReport} -->`,
    `<!-- textlint-disable ${wordinessReport} -->`,
    texts[1],
    `<!-- textlint-enable ${wordinessReport} -->`,
    texts[2]
  ].join("\n\n");
  const jev = client(() => 0.9);
  const result = await createSlopless({ checks, jev, cwd }).lintText(
    source,
    "severity-and-comments.md"
  );

  assert.equal(jev.seen.length, texts.length);
  for (const [index, input] of [...jev.seen]
    .sort((a, b) => a.paragraph.id.localeCompare(b.paragraph.id))
    .entries()) {
    paragraphRequest(input, checks, {
      id: `P${index + 1}`,
      text: texts[index]
    });
  }
  assert.deepEqual(findings(result), [
    finding(wordiness, source.indexOf(texts[0]), texts[0]),
    finding(redundancy, source.indexOf(texts[1]), texts[1]),
    finding(redundancy, source.indexOf(texts[2]), texts[2]),
    finding(wordiness, source.indexOf(texts[2]), texts[2])
  ]);
  for (const message of result.messages) {
    assert.equal(message.severity, message.ruleId === redundancyReport ? 1 : 2);
  }
});

test("each check applies its own threshold and reports overlapping native ranges independently", async () => {
  const checks = [emptyBeat, timestamps];
  assert.equal(catalog.find((check) => check.id === emptyBeat).threshold, 0.47);
  assert.equal(
    catalog.find((check) => check.id === timestamps).threshold,
    0.63
  );
  const texts = ["First paragraph.", "Second paragraph.", "Third paragraph."];
  const source = texts.join("\n\n");
  const scores = {
    P1: { [emptyBeat]: 0.5, [timestamps]: 0.5 },
    P2: { [emptyBeat]: 0.46, [timestamps]: 0.63 },
    P3: { [emptyBeat]: 0.47, [timestamps]: 0.9 }
  };
  const jev = client((input, id) => scores[input.paragraph?.id]?.[id] ?? 0.1);
  const result = await createSlopless({ checks, jev }).lintText(
    source,
    "scores.md"
  );
  assert.equal(jev.seen.length, 3);
  assert.deepEqual(findings(result), [
    finding(emptyBeat, source.indexOf(texts[0]), texts[0]),
    finding(timestamps, source.indexOf(texts[1]), texts[1]),
    finding(emptyBeat, source.indexOf(texts[2]), texts[2]),
    finding(timestamps, source.indexOf(texts[2]), texts[2])
  ]);
});

test("identical paragraphs keep distinct IDs, answers and source ranges", async () => {
  const text = "The same paragraph.";
  const source = `${text}\n\n${text}`;
  const checks = [takeaway, redundancy];
  const jev = client((input, id) =>
    (input.paragraph?.id === "P1" ? id === takeaway : id === redundancy)
      ? 0.9
      : 0.1
  );
  const result = await createSlopless({ checks, jev }).lintText(
    source,
    "repeat.md"
  );
  assert.equal(jev.seen.length, 2);
  assert.deepEqual(
    jev.seen
      .map((input) => input.paragraph)
      .sort((a, b) => a.id.localeCompare(b.id)),
    [
      { id: "P1", text },
      { id: "P2", text }
    ]
  );
  assert.deepEqual(findings(result), [
    finding(takeaway, 0, text),
    finding(redundancy, text.length + 2, text)
  ]);
});

test("concurrent texts at the same file path and subsequent runs never share paragraph results", async () => {
  const shared = "Shared paragraph.";
  const alpha = `# Alpha\n\n${shared}\n\nAlpha only.`;
  const beta = `# Beta\n\n${shared}\n\nBeta only.`;
  const seen = [];
  const jev = {
    async judge(input, signal) {
      signal.throwIfAborted();
      seen.push(structuredClone(input));
      await setImmediate();
      return Object.fromEntries(
        Object.keys(input.questions).map((id) => [
          id,
          (id === redundancy &&
            input.questions[id].instructions.heading === "# Alpha") ||
          (id === takeaway && input.paragraph?.text === "Beta only.")
            ? 0.9
            : 0.1
        ])
      );
    }
  };
  const engine = createSlopless({ checks: [takeaway, redundancy], jev });
  const [first, second] = await Promise.all([
    engine.lintText(alpha, "same.md"),
    engine.lintText(beta, "same.md")
  ]);
  assert.equal(seen.length, 4);
  assert.deepEqual(findings(first), [
    finding(redundancy, alpha.indexOf(shared), shared)
  ]);
  assert.deepEqual(findings(second), [
    finding(takeaway, beta.indexOf("Beta only."), "Beta only.")
  ]);
  assert.deepEqual(
    seen
      .filter((input) => input.paragraph.id === "P1")
      .map((input) => input.questions[redundancy].instructions.heading)
      .sort(),
    ["# Alpha", "# Beta"]
  );
  const again = await engine.lintText(alpha, "same.md");
  assert.equal(seen.length, 6);
  assert.deepEqual(findings(again), findings(first));
});

test("lintFiles shares checks within each document and isolates files in the same operation", async (t) => {
  const cwd = directory(t);
  const a = "Shared paragraph.\n\nAlpha only.";
  const b = "Shared paragraph.\n\nBeta only.";
  writeFileSync(join(cwd, "a.md"), a);
  writeFileSync(join(cwd, "b.md"), b);
  const jev = client((input, id) =>
    (id === takeaway && input.paragraph?.text === "Alpha only.") ||
    (id === redundancy && input.paragraph?.text === "Beta only.")
      ? 0.9
      : 0.1
  );
  const results = await createSlopless({
    checks: [takeaway, redundancy],
    jev,
    cwd
  }).lintFiles(["*.md"]);
  assert.equal(jev.seen.length, 4);
  assert.equal(results.length, 2);
  const byPath = new Map(results.map((result) => [result.filePath, result]));
  assert.deepEqual(findings(byPath.get(join(cwd, "a.md"))), [
    finding(takeaway, a.indexOf("Alpha only."), "Alpha only.")
  ]);
  assert.deepEqual(findings(byPath.get(join(cwd, "b.md"))), [
    finding(redundancy, b.indexOf("Beta only."), "Beta only.")
  ]);
  assert.equal(
    jev.seen.filter((input) => input.paragraph.text === "Shared paragraph.")
      .length,
    2
  );
});

test("whole-text detection and locations remain separate from shared paragraph questions", async () => {
  const source = "First paragraph.\n\nSecond paragraph.";
  const jev = client((input, id) => {
    if (input.input === "text")
      return id === "document" || id === "P2" ? 0.9 : 0.1;
    return input.paragraph?.id === "P1" && id === takeaway ? 0.9 : 0.1;
  });
  const result = await createSlopless({
    checks: [takeaway, redundancy, repeated],
    jev
  }).lintText(source, "combined.md");
  const paragraphs = jev.seen.filter((input) => input.input === "paragraph");
  const texts = jev.seen.filter((input) => input.input === "text");
  assert.equal(jev.seen.length, 3);
  assert.equal(paragraphs.length, 2);
  for (const input of paragraphs) {
    paragraphRequest(input, [takeaway, redundancy], {
      id: input.paragraph.id,
      text:
        input.paragraph.id === "P1" ? "First paragraph." : "Second paragraph."
    });
  }
  assert.equal(texts.length, 1);
  assert.deepEqual(Object.keys(texts[0]).sort(), [
    "input",
    "instructions",
    "model",
    "paragraphs",
    "questions",
    "text"
  ]);
  assert.equal(texts[0].text, source);
  assert.equal(typeof texts[0].instructions, "string");
  assert.deepEqual(texts[0].paragraphs, [
    { id: "P1", text: "First paragraph." },
    { id: "P2", text: "Second paragraph." }
  ]);
  assert.deepEqual(Object.keys(texts[0].questions).sort(), [
    "P1",
    "P2",
    "document"
  ]);
  assert.ok(
    Object.values(texts[0].questions).every(
      (q) => typeof q.instructions === "string"
    )
  );
  assert.deepEqual(findings(result), [
    finding(takeaway, 0, "First paragraph."),
    finding(repeated, source.indexOf("Second paragraph."), "Second paragraph.")
  ]);
});

test("a missing or invalid answer fails a multi-check operation and a later operation can recover", async (t) => {
  const invalid = [
    [
      "missing",
      (scores) => {
        delete scores[redundancy];
      }
    ],
    [
      "extra",
      (scores) => {
        scores.foreign = 0.9;
      }
    ],
    ...[NaN, Infinity, -0.01, 1.01, "0.9", null, undefined].map((value) => [
      String(value),
      (scores) => {
        scores[redundancy] = value;
      }
    ])
  ];
  for (const [name, corrupt] of invalid) {
    await t.test(name, async () => {
      const seen = [];
      let failing = true;
      const jev = {
        async judge(input) {
          seen.push(structuredClone(input));
          const scores = Object.fromEntries(
            Object.keys(input.questions).map((id) => [id, 0.9])
          );
          if (failing) corrupt(scores);
          return scores;
        }
      };
      const engine = createSlopless({ checks: [takeaway, redundancy], jev });
      await assert.rejects(
        engine.lintText("One paragraph.", "invalid.md"),
        /answers|probability/
      );
      assert.equal(seen.length, 1);
      paragraphRequest(seen[0], [takeaway, redundancy], {
        id: "P1",
        text: "One paragraph."
      });
      failing = false;
      const result = await engine.lintText("One paragraph.", "invalid.md");
      assert.equal(seen.length, 2);
      assert.deepEqual(findings(result), [
        finding(takeaway, 0, "One paragraph."),
        finding(redundancy, 0, "One paragraph.")
      ]);
    });
  }
});

for (const [name, enabled] of [
  [
    "configuration-disabled checks are excluded from paragraph batches",
    [timestamps, wordiness]
  ],
  ["all configuration-disabled paragraph checks make no judge calls", []]
]) {
  test(name, async (t) => {
    const cwd = directory(t);
    mkdirSync(join(cwd, "node_modules"));
    symlinkSync(
      fileURLToPath(new URL("..", import.meta.url)),
      join(cwd, "node_modules/slopless"),
      "dir"
    );
    const checks = [timestamps, redundancy, wordiness];
    const disabled = checks.filter((id) => !enabled.includes(id));
    writeFileSync(
      join(cwd, ".textlintrc.json"),
      JSON.stringify({
        rules: {
          "preset-slopless": Object.fromEntries(
            disabled.map((id) => [id.slice(id.indexOf(":") + 1), false])
          )
        }
      })
    );
    const jev = client(() => 0.9);
    const source = "First paragraph.\n\nSecond paragraph.";
    const result = await createSlopless({ checks, jev, cwd }).lintText(
      source,
      "disabled.md"
    );
    assert.equal(jev.seen.length, enabled.length === 0 ? 0 : 2);
    for (const input of jev.seen)
      paragraphRequest(input, enabled, input.paragraph);
    const expected = enabled.flatMap((id) => [
      finding(id, 0, "First paragraph."),
      finding(id, source.indexOf("Second paragraph."), "Second paragraph.")
    ]);
    assert.deepEqual(findings(result), findings({ messages: expected }));
  });
}
