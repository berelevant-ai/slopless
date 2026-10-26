import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { gunzipSync } from "node:zlib";
import { TypeSafeClient } from "@typesafe-ai/sdk";
import pLimit from "p-limit";
import { loadTextlintrc } from "textlint";
import { createSlopless, listChecks } from "../dist/index.js";
import { writeAtomicJson } from "./jev.mjs";
import { readDocument } from "./datasets.mjs";

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    output: { type: "string" },
    reuse: { type: "string" },
    batch: { type: "boolean" },
    marked: { type: "boolean" },
    dataset: { type: "string" }
  }
});
const [command] = positionals;
assert.ok(["prepare", "prepare-controls", "run", "score"].includes(command));
const output = resolve(
  values.output ?? "runners/results/article-context-spike.json"
);
assert.ok(output.startsWith(resolve("runners/results") + "/"));
const file = "datasets/ai-normal/texts/000139-bgaming-b2b-igaming-solutions.md";
const source = readFileSync(file, "utf8");
const labels = JSON.parse(readFileSync(file.replace(/\.md$/, ".labels.json")));
assert.equal(labels.split, "development");
const hash = (value) => createHash("sha256").update(value).digest("hex");
const readResult = (path) => {
  const result = JSON.parse(
    existsSync(path)
      ? readFileSync(path, "utf8")
      : gunzipSync(readFileSync(`${path}.gz`)).toString("utf8")
  );
  if (result.questions) {
    for (const target of result.targets) {
      target.input.questions = Object.fromEntries(
        Object.entries(target.input.questionKeys).map(([id, key]) => [
          id,
          result.questions[key]
        ])
      );
      delete target.input.questionKeys;
    }
    delete result.questions;
  }
  return result;
};
function saveResult(path, result) {
  const questions = {};
  const targets = result.targets.map((target) => {
    const questionKeys = Object.fromEntries(
      Object.entries(target.input.questions).map(([id, question]) => {
        const key = hash(JSON.stringify(question));
        questions[key] = question;
        return [id, key];
      })
    );
    const input = { ...target.input, questionKeys };
    delete input.questions;
    return { ...target, input };
  });
  writeAtomicJson(path, { ...result, targets, questions });
}
assert.equal(hash(source), labels.textSha256);
const instructions =
  "Judge only state.paragraph.text, using state.context as supporting writing. Context may supply a subject, purpose, detail or explanation. Flag this check only when the target contributes the defect. Useful topic labels, checklist entries and questions can be grammatically incomplete. Apply the rule's substantive defect test to the target in its actual role; wording elsewhere in context alone does not make the target defective.";
const modes = ["baseline", "context", "context-instructions"];
const markedInstructions = readFileSync(
  new URL("../prompts/v24/shared.md", import.meta.url),
  "utf8"
).trim();
const definitions = listChecks().filter(
  (check) => check.backend === "jev" && check.input === "paragraph"
);
const headingChecks = definitions.filter(
  (check) =>
    [
      "semantic-thinness",
      "puffery-and-overstatement",
      "stock-wording-and-jargon"
    ].includes(check.id.split(":")[0]) ||
    check.id === "boilerplate-and-signposting:unnecessary-framing"
);

function markExcerpt(target, writing, sample) {
  let start = sample?.start ?? target.range[0];
  let end = sample?.end ?? target.range[1];
  if (!sample) {
    const context = target.context;
    for (const value of [context.precedingParagraph, context.list]) {
      if (!value) continue;
      const at = writing.lastIndexOf(value, target.range[0]);
      assert.ok(at >= 0);
      start = Math.min(start, at);
      end = Math.max(end, at + value.length);
    }
    for (const value of [context.followingParagraph, context.followingList]) {
      if (!value) continue;
      const at = writing.indexOf(value, target.range[1]);
      assert.ok(at >= 0);
      end = Math.max(end, at + value.length);
    }
    if (target.kind === "heading") end += context.section.length;
  }
  assert.equal(writing.slice(...target.range), target.text);
  const original = writing.slice(start, end);
  assert.ok(!original.includes("<target") && !original.includes("</target>"));
  const prefix = sample
    ? []
    : target.context.headings.filter((heading) => !original.includes(heading));
  const marked = `${writing.slice(start, target.range[0])}<target kind="${target.kind === "list-item-paragraph" ? "list-item" : target.kind}">\n${target.text}\n</target>${writing.slice(target.range[1], end)}`;
  return [...prefix, marked].join("\n\n");
}

function reuseAnswers(result) {
  if (!values.reuse) return;
  const previous = readResult(values.reuse);
  assert.equal(previous.complete, true);
  result.snapshot.reusedFrom = {
    file: values.reuse,
    sha256: hash(readFileSync(values.reuse))
  };
  result.predictions = previous.predictions.filter((prediction) => {
    const target = result.targets.find((item) => item.id === prediction.id);
    return (
      target &&
      result.snapshot.modes.includes(prediction.mode) &&
      prediction.requestSha256 ===
        hash(JSON.stringify(request(target, prediction.mode)))
    );
  });
}

async function prepare() {
  assert.ok(
    !existsSync(output) && !existsSync(`${output}.gz`),
    "Use a new output file."
  );
  const plugin = (await loadTextlintrc())
    .toKernelOptions()
    .plugins.find(
      (item) => item.pluginId === "@textlint/textlint-plugin-markdown"
    );
  assert.ok(plugin);
  const ast = new plugin.plugin.Processor().processor(".md").preProcess(source);
  const nodes = [];
  const walk = (node, ancestors = []) => {
    nodes.push({ node, ancestors });
    for (const child of node.children ?? []) walk(child, [...ancestors, node]);
  };
  walk(ast);
  const headers = nodes.filter(({ node }) => node.type === "Header");
  const paragraphs = nodes.filter(({ node }) => node.type === "Paragraph");
  const text = (node) => source.slice(...node.range);
  const parents = (node) => {
    const stack = [];
    for (const { node: heading } of headers) {
      if (heading.range[0] >= node.range[0]) break;
      while (stack.length && stack.at(-1).depth >= heading.depth) stack.pop();
      stack.push(heading);
    }
    if (node.type === "Header") {
      while (stack.length && stack.at(-1).depth >= node.depth) stack.pop();
    }
    return stack;
  };
  const captured = [];
  const engine = createSlopless({
    checks: definitions.map((check) => check.id),
    jev: {
      async judge(input) {
        assert.equal(input.input, "paragraph");
        captured.push(input);
        return Object.fromEntries(
          Object.keys(input.questions).map((id) => [id, 0])
        );
      }
    }
  });
  const report = await engine.lintText(source, resolve(file));
  assert.equal(report.messages.length, 0);
  assert.equal(captured.length, paragraphs.length);
  assert.equal(paragraphs.length, 123);
  const targets = paragraphs.map(({ node, ancestors }, index) => {
    const id = `P${index + 1}`;
    const input = captured.find((item) => item.paragraph.id === id);
    assert.ok(input);
    assert.equal(input.paragraph.text, text(node));
    const list = ancestors.findLast((item) => item.type === "List");
    const owner = list ?? node;
    const parent = nodes.find((item) => item.node === owner).ancestors.at(-1);
    const siblings = parent.children;
    const position = siblings.indexOf(owner);
    const before = siblings[position - 1];
    const after = siblings[position + 1];
    const hierarchy = parents(node);
    const sameSection = (candidate) =>
      candidate && parents(candidate).at(-1) === hierarchy.at(-1);
    const context = {
      headings: hierarchy.map(text),
      ...(before?.type === "Paragraph" && sameSection(before)
        ? { precedingParagraph: text(before) }
        : {}),
      ...(after?.type === "Paragraph" && sameSection(after)
        ? { followingParagraph: text(after) }
        : {}),
      ...(list ? { list: text(list) } : {}),
      ...(after?.type === "List" ? { followingList: text(after) } : {})
    };
    return {
      id,
      kind: list ? "list-item-paragraph" : "paragraph",
      text: text(node),
      range: node.range,
      line: node.loc.start.line,
      context,
      input
    };
  });
  for (const { node } of headers) {
    const end =
      headers.find(
        ({ node: next }) =>
          next.range[0] > node.range[0] && next.depth <= node.depth
      )?.node.range[0] ?? source.length;
    targets.push({
      id: `H${targets.filter((item) => item.kind === "heading").length + 1}`,
      kind: "heading",
      text: text(node),
      range: node.range,
      line: node.loc.start.line,
      context: {
        headings: parents(node).map(text),
        section: source.slice(node.range[1], end)
      },
      input: {
        input: "paragraph",
        model: definitions[0].model,
        paragraph: { id: `H${node.range[0]}`, text: text(node) },
        questions: Object.fromEntries(
          headingChecks.map((check) => {
            const question = structuredClone(captured[0].questions[check.id]);
            delete question.instructions.heading;
            return [check.id, question];
          })
        )
      }
    });
  }
  assert.equal(
    targets.filter((item) => item.kind === "list-item-paragraph").length,
    47
  );
  const result = {
    complete: false,
    snapshot: {
      file,
      sourceSha256: hash(source),
      labelsSha256: hash(readFileSync(file.replace(/\.md$/, ".labels.json"))),
      definitions,
      headingChecks: headingChecks.map((check) => check.id),
      modes,
      instructions,
      ...(values.marked ? { markedInstructions, modes: ["marked"] } : {}),
      sdk: JSON.parse(
        readFileSync("node_modules/@typesafe-ai/sdk/package.json")
      ).version,
      client: { concurrency: 20, retries: 2, timeoutMs: 120000 },
      modulesSha256: hash(
        JSON.stringify(
          readdirSync("dist", { recursive: true })
            .filter((name) => /\.(js|md|json)$/.test(name))
            .sort()
            .map((name) => [name, hash(readFileSync(resolve("dist", name)))])
        )
      ),
      runnerSha256: hash(readFileSync(new URL(import.meta.url)))
    },
    targets,
    predictions: [],
    attempts: []
  };
  if (values.marked)
    for (const target of targets) target.excerpt = markExcerpt(target, source);
  reuseAnswers(result);
  saveResult(output, result);
  return result;
}

function request(target, mode) {
  if (mode === "marked") {
    assert.ok(target.excerpt);
    return {
      model: target.input.model,
      state: { text: target.excerpt },
      questions: Object.fromEntries(
        Object.entries(target.input.questions).map(([id, question]) => [
          id,
          {
            type: "noul",
            instructions: {
              question:
                id === "puffery-and-overstatement:inflated-evaluation"
                  ? "Does the marked target make an evaluation stronger than the support supplied by the complete excerpt justifies? Apply the supplied inflated-evaluation definition and examples."
                  : `Does the marked target contribute at least one instance of ${id.split(":")[1]} after considering the complete excerpt? Apply the supplied definition and examples.`,
              instructions: markedInstructions,
              rulebook: question.instructions.rulebook,
              target:
                "The text enclosed by the target markers inside state.text."
            },
            ...(question.yes === undefined
              ? {}
              : { criteria: { true: question.yes, false: question.no } })
          }
        ])
      )
    };
  }
  const state = { paragraph: { ...target.input.paragraph } };
  if (mode !== "baseline") state.context = target.context;
  if (mode === "context-instructions") state.paragraph.kind = target.kind;
  return {
    model: target.input.model,
    state,
    questions: Object.fromEntries(
      Object.entries(target.input.questions).map(([id, question]) => [
        id,
        {
          type: "noul",
          instructions:
            mode === "context-instructions"
              ? {
                  ...question.instructions,
                  instructions: `${question.instructions.instructions}\n\n${instructions}`
                }
              : question.instructions,
          ...(question.yes === undefined
            ? {}
            : { criteria: { true: question.yes, false: question.no } })
        }
      ])
    )
  };
}

function summary(result) {
  const modes = result.snapshot.modes;
  const definitions = result.snapshot.definitions;
  assert.equal(
    result.snapshot.labelsSha256,
    hash(readFileSync(result.snapshot.file.replace(/\.md$/, ".labels.json"))),
    "Dataset labels changed since preparation."
  );
  const findings = Object.fromEntries(modes.map((mode) => [mode, []]));
  for (const prediction of result.predictions) {
    const target = result.targets.find((item) => item.id === prediction.id);
    for (const [id, probability] of Object.entries(prediction.scores)) {
      const definition = definitions.find((check) => check.id === id);
      if (probability >= definition.threshold)
        findings[prediction.mode].push({
          target: target.id,
          kind: target.kind,
          line: target.line,
          check: id,
          probability,
          text: target.text
        });
    }
  }
  if (result.snapshot.kind === "controls") {
    const dataset = readDocument(result.snapshot.file);
    const counts = {};
    for (const mode of modes) {
      const groups = {};
      for (const label of dataset.labels) {
        const target = result.targets.find((item) => item.id === label.id);
        const key = `${label.check}/${target.kind}`;
        const group = (groups[key] ??= {
          hits: 0,
          caught: 0,
          missed: 0,
          noHits: 0,
          falsePositives: 0,
          trueNegatives: 0
        });
        const caught = findings[mode].some(
          (item) =>
            item.target === target.id &&
            item.check === label.check.replace("/", ":")
        );
        const expected =
          label.expected &&
          label.evidence.some((snippet) => target.text.includes(snippet));
        group[expected ? "hits" : "noHits"]++;
        group[
          expected
            ? caught
              ? "caught"
              : "missed"
            : caught
              ? "falsePositives"
              : "trueNegatives"
        ]++;
      }
      counts[mode] = groups;
    }
    return { findings, counts };
  }
  const scored = labels.labels.filter((label) =>
    definitions.some((check) => check.id === label.check.replace("/", ":"))
  );
  return {
    findings,
    counts: Object.fromEntries(
      modes.map((mode) => [
        mode,
        {
          paragraph: findings[mode].filter((item) => item.kind !== "heading")
            .length,
          list: findings[mode].filter(
            (item) => item.kind === "list-item-paragraph"
          ).length,
          heading: findings[mode].filter((item) => item.kind === "heading")
            .length,
          labeledNoHits: scored.length,
          falsePositiveLabels: scored.filter((label) => {
            const sample = labels.samples.find((item) => item.id === label.id);
            assert.equal(label.expected, false);
            return findings[mode].some((finding) => {
              const target = result.targets.find(
                (item) => item.id === finding.target
              );
              return (
                target.kind !== "heading" &&
                target.range[0] >= sample.start &&
                target.range[1] <= sample.end &&
                finding.check === label.check.replace("/", ":")
              );
            });
          }).length,
          requests: result.predictions.filter((item) => item.mode === mode)
            .length,
          inputTokens: result.predictions
            .filter((item) => item.mode === mode)
            .reduce(
              (total, item) => total + (item.response.usage.input_tokens ?? 0),
              0
            )
        }
      ])
    )
  };
}

async function prepareControls() {
  assert.ok(!existsSync(output));
  const input =
    values.dataset ??
    "datasets/ai-synthetic/passages/000140-structural-context-development.md";
  const dataset = readDocument(input);
  assert.equal(dataset.metadata.split, "development");
  const article = readResult("runners/results/article-context-spike.json");
  assert.equal(article.complete, true);
  const plugin = (await loadTextlintrc())
    .toKernelOptions()
    .plugins.find(
      (item) => item.pluginId === "@textlint/textlint-plugin-markdown"
    );
  const processor = new plugin.plugin.Processor().processor(".md");
  const targets = dataset.labels.map((label) => {
    const passage = dataset.text.slice(label.start, label.end);
    const ast = processor.preProcess(passage);
    const first = ast.children[0];
    const list = ast.children.find((node) => node.type === "List");
    const heading = !passage.startsWith("## Supplier review\n");
    const node = heading
      ? first
      : list
        ? list.children[0].children[0]
        : ast.children[1];
    const text = passage.slice(...node.range);
    const kind = heading
      ? "heading"
      : list
        ? "list-item-paragraph"
        : "paragraph";
    const context = {
      headings: heading ? [] : [passage.slice(...first.range)],
      ...(heading
        ? { section: passage.slice(node.range[1]).trim() }
        : list
          ? {
              precedingParagraph: passage.slice(...ast.children[1].range),
              list: passage.slice(...list.range)
            }
          : { followingParagraph: passage.slice(...ast.children[2].range) })
    };
    const check = label.check.replace("/", ":");
    const selected =
      values.batch || values.marked
        ? (heading ? headingChecks : definitions).map((item) => item.id)
        : [check];
    const questions = Object.fromEntries(
      selected.map((id) => {
        const question = structuredClone(
          article.targets[0].input.questions[id]
        );
        delete question.instructions.heading;
        return [id, question];
      })
    );
    const target = {
      id: label.id,
      kind,
      text,
      range: [label.start + node.range[0], label.start + node.range[1]],
      context,
      input: {
        input: "paragraph",
        model: article.targets[0].input.model,
        paragraph: { id: label.id, text },
        questions
      }
    };
    if (values.marked)
      target.excerpt = markExcerpt(target, dataset.text, {
        start: label.start,
        end: label.end
      });
    return target;
  });
  const result = {
    complete: false,
    snapshot: {
      ...article.snapshot,
      kind: "controls",
      batchedChecks: values.batch === true || values.marked === true,
      modes: values.marked
        ? ["context-instructions", "marked"]
        : values.batch
          ? ["context-instructions"]
          : modes,
      ...(values.marked ? { markedInstructions } : {}),
      file: input,
      sourceSha256: hash(dataset.text),
      labelsSha256: hash(readFileSync(input.replace(/\.md$/, ".labels.json"))),
      client: { ...article.snapshot.client, concurrency: 10 },
      runnerSha256: hash(readFileSync(new URL(import.meta.url)))
    },
    targets,
    predictions: [],
    attempts: []
  };
  delete result.snapshot.reusedFrom;
  reuseAnswers(result);
  saveResult(output, result);
  return result;
}

let result;
if (command === "prepare" || command === "prepare-controls") {
  result = command === "prepare" ? await prepare() : await prepareControls();
} else {
  result = readResult(output);
  assert.equal(
    result.snapshot.sourceSha256,
    hash(readFileSync(result.snapshot.file))
  );
  assert.equal(
    result.snapshot.labelsSha256,
    hash(readFileSync(result.snapshot.file.replace(/\.md$/, ".labels.json"))),
    "Dataset labels changed since preparation."
  );
  assert.equal(result.snapshot.instructions, instructions);
  if (result.snapshot.markedInstructions)
    assert.equal(result.snapshot.markedInstructions, markedInstructions);
  for (const prediction of result.predictions) {
    const target = result.targets.find((item) => item.id === prediction.id);
    assert.equal(
      prediction.requestSha256,
      hash(JSON.stringify(request(target, prediction.mode)))
    );
  }
  if (command === "run") {
    assert.ok(process.env.JEV_API_KEY);
    assert.equal(result.complete, false);
    const client = new TypeSafeClient({
      apiKey: process.env.JEV_API_KEY,
      retry: { maxRetries: result.snapshot.client.retries },
      timeout: result.snapshot.client.timeoutMs,
      logLevel: "off"
    });
    const limit = pLimit(result.snapshot.client.concurrency);
    const started = performance.now();
    const activeModes = result.snapshot.modes;
    const tasks = result.targets.flatMap((target, index) =>
      activeModes
        .map((_, offset) => activeModes[(offset + index) % activeModes.length])
        .map((mode) =>
          limit(async () => {
            if (
              result.predictions.some(
                (item) => item.id === target.id && item.mode === mode
              )
            )
              return;
            const input = request(target, mode);
            const start = performance.now();
            const response = await client.systemOne(input);
            assert.equal(response.model, input.model);
            assert.deepEqual(
              Object.keys(response.answers).sort(),
              Object.keys(input.questions).sort()
            );
            const scores = Object.fromEntries(
              Object.entries(response.answers).map(([id, answer]) => {
                assert.equal(answer.type, "noul");
                assert.ok(
                  Number.isFinite(answer.noul) &&
                    answer.noul >= 0 &&
                    answer.noul <= 1
                );
                return [id, answer.noul];
              })
            );
            result.predictions.push({
              id: target.id,
              mode,
              scores,
              response,
              requestSha256: hash(JSON.stringify(input)),
              elapsedMs: performance.now() - start
            });
            if (result.predictions.length % 25 === 0)
              saveResult(output, result);
          })
        )
    );
    const settled = await Promise.allSettled(tasks);
    result.elapsedMs = performance.now() - started;
    const failures = settled.filter((item) => item.status === "rejected");
    result.failures = failures.map((item) => String(item.reason));
    result.attempts.push({
      elapsedMs: result.elapsedMs,
      completedTotal: result.predictions.length,
      failures: result.failures
    });
    result.complete =
      failures.length === 0 &&
      result.predictions.length === result.targets.length * activeModes.length;
    saveResult(output, result);
    assert.ok(result.complete, JSON.stringify(result.failures));
  }
  if (result.complete) {
    result.summary = summary(result);
    saveResult(output, result);
  }
}
process.stdout.write(
  JSON.stringify({
    complete: result.complete,
    targets: result.targets.length,
    counts: result.summary?.counts,
    elapsedMs: result.elapsedMs
  }) + "\n"
);
