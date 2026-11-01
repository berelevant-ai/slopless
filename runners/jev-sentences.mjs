import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { parseArgs } from "node:util";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { gunzipSync } from "node:zlib";
import { TypeSafeClient } from "@typesafe-ai/sdk";
import pLimit from "p-limit";
import { loadTextlintrc } from "textlint";
import { split } from "sentence-splitter";
import { createSlopless } from "../dist/index.js";
import {
  loadDataset,
  preflightDataset,
  validateResponse,
  writeAtomicJson
} from "./jev.mjs";

const dataset =
  "datasets/ai-synthetic/texts/000039-wordiness-and-redundancy-mixed-development.md";
const output = "runners/results/text-input-sentence-development.json";
const checks = ["wordiness", "redundancy"];
const ids = checks.map((check) => `wordiness-and-redundancy:${check}`);
const hash = (value) => createHash("sha256").update(value).digest("hex");
const read = (file) =>
  JSON.parse(
    existsSync(file)
      ? readFileSync(file, "utf8")
      : gunzipSync(readFileSync(`${file}.gz`)).toString("utf8")
  );
const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: { help: { type: "boolean" } }
});
if (values.help) {
  console.log(
    "node runners/jev-sentences.mjs <prepare|run|score>\nCompare production paragraph requests with full-text sentence questions for wordiness and redundancy on development collection 000039. prepare freezes requests; run requires JEV_API_KEY and resumes missing exact requests; score validates saved inputs/responses and writes metrics. Production and holdouts remain unchanged."
  );
  process.exit(0);
}
const [command] = positionals;
assert.ok(
  positionals.length === 1 && ["prepare", "run", "score"].includes(command)
);
preflightDataset(dataset, { developmentOnly: true });
const rows = loadDataset(dataset, "wordiness-and-redundancy");
const additional = readFileSync(
  "prompts/v25/sentence-location.md",
  "utf8"
).trim();
const require = createRequire(import.meta.url);
const snapshot = {
  dataset,
  textSha256: hash(readFileSync(dataset)),
  labelsSha256: hash(readFileSync(dataset.replace(/\.md$/, ".labels.json"))),
  runnerSha256: hash(readFileSync(new URL(import.meta.url))),
  sentencePromptSha256: hash(additional),
  model: "jev-1.13.0",
  threshold: 0.5,
  batchSize: 16,
  concurrency: 6,
  sdk: require("@typesafe-ai/sdk/package.json").version,
  splitter: require("sentence-splitter/package.json").version,
  commit: execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8"
  }).trim(),
  modules: Object.fromEntries(
    [
      "dist/index.js",
      "dist/adapters/jev/paragraph.js",
      "dist/adapters/jev/prompt.js",
      "runners/jev.mjs",
      "runners/datasets.mjs",
      "prompts/v16/shared.md",
      ...checks.map((check) => `prompts/v16/${check}.md`)
    ].map((file) => [file, hash(readFileSync(file))])
  )
};

function sdkQuestion(question) {
  return {
    type: "noul",
    instructions: question.instructions,
    ...(question.yes === undefined
      ? {}
      : { criteria: { true: question.yes, false: question.no } })
  };
}

async function prepare() {
  assert.ok(
    !existsSync(output) && !existsSync(`${output}.gz`),
    "Preserve existing recordings."
  );
  const plugin = (await loadTextlintrc())
    .toKernelOptions()
    .plugins.find(
      (item) => item.pluginId === "@textlint/textlint-plugin-markdown"
    );
  assert.ok(plugin);
  const processor = new plugin.plugin.Processor().processor(".md");
  const documents = [];
  const requests = [];
  const questions = {};
  function add(arm, document, request, targets) {
    const requestSha256 = hash(JSON.stringify(request));
    const questionKeys = Object.fromEntries(
      Object.entries(request.questions).map(([id, question]) => {
        const key = hash(JSON.stringify(question));
        questions[key] = question;
        return [id, key];
      })
    );
    requests.push({
      arm,
      document,
      targets,
      requestSha256,
      request: { model: request.model, state: request.state, questionKeys }
    });
  }
  for (const row of rows) {
    const paragraphs = [];
    const sentences = [];
    function visit(node, inList = false) {
      const listed = inList || node.type === "ListItem";
      if (node.type === "Paragraph" || node.type === "Header") {
        const source = row.text.slice(...node.range);
        const heading = node.type === "Header";
        const number =
          paragraphs.filter((item) => (item.kind === "heading") === heading)
            .length + 1;
        const paragraph = {
          id: `${heading ? "H" : "P"}${number}`,
          text: source,
          range: [...node.range],
          kind: heading ? "heading" : listed ? "list-item" : "paragraph"
        };
        paragraphs.push(paragraph);
        for (const sentence of split(source).filter(
          (item) => item.type === "Sentence"
        )) {
          const range = sentence.range.map((offset) => offset + node.range[0]);
          sentences.push({
            id: `S${sentences.length + 1}`,
            text: row.text.slice(...range),
            range,
            paragraph: paragraph.id,
            kind: paragraph.kind
          });
        }
      } else for (const child of node.children ?? []) visit(child, listed);
    }
    visit(processor.preProcess(row.text));
    assert.ok(sentences.length && paragraphs.length);
    let numbered = row.text;
    for (const sentence of [...sentences].reverse())
      numbered = `${numbered.slice(0, sentence.range[0])}[${sentence.id}] ${numbered.slice(sentence.range[0])}`;
    const originals = {};
    const linter = createSlopless({
      checks: ids,
      jev: {
        async judge(input) {
          assert.equal(input.input, "paragraph");
          const paragraph = paragraphs.find(
            (item) => item.id === input.paragraph.id
          );
          assert.equal(paragraph?.text, input.paragraph.text);
          for (const [id, question] of Object.entries(input.questions))
            originals[id] = question;
          add(
            "paragraph",
            row.id,
            {
              model: input.model,
              state: { paragraph: input.paragraph },
              questions: Object.fromEntries(
                Object.entries(input.questions).map(([id, question]) => [
                  id,
                  sdkQuestion(question)
                ])
              )
            },
            [paragraph.id]
          );
          return Object.fromEntries(
            Object.keys(input.questions).map((id) => [id, 0])
          );
        }
      }
    });
    await linter.lintText(row.text, `${row.id}.md`);
    for (const check of ids) {
      assert.ok(originals[check]);
      for (let offset = 0; offset < sentences.length; offset += 16) {
        const group = sentences.slice(offset, offset + 16);
        const original = originals[check];
        add(
          "sentence",
          row.id,
          {
            model: snapshot.model,
            state: { article: numbered },
            questions: Object.fromEntries(
              group.map((sentence) => [
                sentence.id,
                {
                  ...sdkQuestion(original),
                  instructions: {
                    ...original.instructions,
                    question:
                      "Does the specified sentence participate in the named defect under the complete writing?",
                    defectQuestion: original.instructions.question,
                    target: {
                      id: sentence.id,
                      text: sentence.text,
                      kind: sentence.kind
                    },
                    sentenceInstructions: additional
                  }
                }
              ])
            )
          },
          group.map((sentence) => ({ check, sentence: sentence.id }))
        );
      }
    }
    const labels = row.labels ?? [row.label];
    const references = Object.fromEntries(
      checks.map((check) => {
        const label = labels.find((item) => item.group === check);
        assert.ok(label);
        const ranges = label.evidence.flatMap((snippet) => {
          const found = [];
          for (
            let offset = row.text.indexOf(snippet);
            offset >= 0;
            offset = row.text.indexOf(snippet, offset + 1)
          )
            found.push([offset, offset + snippet.length]);
          assert.ok(found.length, `${row.id}: missing snippet`);
          return found;
        });
        return [
          check,
          {
            expected: label.expected,
            snippets: label.evidence,
            sentences: sentences
              .filter((sentence) =>
                ranges.some(
                  ([start, end]) =>
                    sentence.range[0] < end && sentence.range[1] > start
                )
              )
              .map((sentence) => sentence.id)
          }
        ];
      })
    );
    documents.push({
      id: row.id,
      text: row.text,
      paragraphs,
      sentences,
      references
    });
  }
  writeAtomicJson(output, {
    snapshot,
    documents,
    questions,
    requests,
    responses: [],
    attempts: []
  });
  console.log(
    JSON.stringify({
      documents: documents.length,
      sentences: documents.reduce((n, d) => n + d.sentences.length, 0),
      requests: requests.length
    })
  );
}

function requestFor(result, item) {
  const request = {
    model: item.request.model,
    state: item.request.state,
    questions: Object.fromEntries(
      Object.entries(item.request.questionKeys).map(([id, key]) => [
        id,
        result.questions[key]
      ])
    )
  };
  assert.equal(hash(JSON.stringify(request)), item.requestSha256);
  return request;
}

function assessment(result, repeat = "first") {
  const grouped = Map.groupBy(result.responses, (item) => item.requestSha256);
  for (const response of result.responses) {
    const item = result.requests.find(
      (request) => request.requestSha256 === response.requestSha256
    );
    assert.ok(item);
    validateResponse(response, requestFor(result, item));
  }
  const outcomes = result.requests.map((item) => {
    const responses = grouped.get(item.requestSha256);
    assert.ok(responses?.length, "Incomplete inference.");
    return {
      item,
      response: repeat === "first" ? responses[0] : responses.at(-1)
    };
  });
  const decisions = result.documents.flatMap((document) =>
    checks.map((check) => {
      const id = `wordiness-and-redundancy:${check}`;
      const relevant = outcomes.filter(
        ({ item }) => item.document === document.id
      );
      const paragraphs = relevant
        .filter(
          ({ item, response }) =>
            item.arm === "paragraph" &&
            response.response.answers[id].noul >= snapshot.threshold
        )
        .flatMap(({ item }) => item.targets);
      const sentences = relevant
        .filter(
          ({ item }) => item.arm === "sentence" && item.targets[0].check === id
        )
        .flatMap(({ response }) =>
          Object.entries(response.response.answers)
            .filter(([, answer]) => answer.noul >= snapshot.threshold)
            .map(([key]) => key)
        );
      const reference = document.references[check];
      return {
        id: document.id,
        check,
        expected: reference.expected,
        paragraphHit: paragraphs.length > 0,
        sentenceHit: sentences.length > 0,
        paragraphs,
        sentences,
        references: reference.sentences,
        selectedReferences: reference.sentences.filter((sentence) =>
          sentences.includes(sentence)
        ),
        extraSentences: sentences.filter(
          (sentence) => !reference.sentences.includes(sentence)
        )
      };
    })
  );
  const summaries = checks.map((check) => {
    const group = decisions.filter((item) => item.check === check);
    const counts = (field) => ({
      positives: group.filter((d) => d.expected).length,
      caught: group.filter((d) => d.expected && d[field]).length,
      negatives: group.filter((d) => !d.expected).length,
      falsePositives: group.filter((d) => !d.expected && d[field]).length
    });
    return {
      check,
      paragraph: counts("paragraphHit"),
      sentence: counts("sentenceHit"),
      anyReference: group.filter(
        (d) => d.expected && d.selectedReferences.length
      ).length,
      completeReference: group.filter(
        (d) =>
          d.expected &&
          d.references.length &&
          d.selectedReferences.length === d.references.length
      ).length,
      referenceSentences: group.reduce((n, d) => n + d.references.length, 0),
      selectedReferenceSentences: group.reduce(
        (n, d) => n + d.selectedReferences.length,
        0
      ),
      extraSelectedSentencesOnHits: group
        .filter((d) => d.expected)
        .reduce((n, d) => n + d.extraSentences.length, 0)
    };
  });
  return {
    summaries,
    decisions,
    changes: decisions.filter((d) => d.paragraphHit !== d.sentenceHit)
  };
}

if (command === "prepare") await prepare();
else {
  const result = read(output);
  const seal = () =>
    hash(
      JSON.stringify({
        snapshot: result.snapshot,
        documents: result.documents,
        questions: result.questions,
        requests: result.requests,
        responses: result.responses
      })
    );
  if (result.inferenceSha256)
    assert.equal(result.inferenceSha256, seal(), "Frozen recording changed.");
  const {
    commit: _savedCommit,
    runnerSha256: _producer,
    ...saved
  } = result.snapshot;
  const {
    commit: _currentCommit,
    runnerSha256: _scorer,
    ...current
  } = snapshot;
  assert.deepEqual(saved, current, "Frozen inputs or runner changed.");
  for (const item of result.requests) requestFor(result, item);
  if (command === "run") {
    assert.ok(process.env.JEV_API_KEY, "JEV_API_KEY is required.");
    const client = new TypeSafeClient({
      apiKey: process.env.JEV_API_KEY,
      baseURL: "https://api.typesafe.ai",
      logLevel: "off",
      timeout: 30000,
      retry: { maxRetries: 2 }
    });
    const limit = pLimit(snapshot.concurrency);
    const completed = new Set(
      result.responses.map((item) => item.requestSha256)
    );
    const started = performance.now();
    await Promise.all(
      result.requests
        .filter((item) => !completed.has(item.requestSha256))
        .map((item) =>
          limit(async () => {
            const request = requestFor(result, item);
            const begin = performance.now();
            try {
              const response = {
                requestSha256: item.requestSha256,
                elapsedMs: performance.now() - begin,
                response: await client.systemOne(request)
              };
              response.elapsedMs = performance.now() - begin;
              validateResponse(response, request);
              result.responses.push(response);
            } catch (error) {
              result.attempts.push({
                requestSha256: item.requestSha256,
                error: String(error.message).replaceAll(
                  process.env.JEV_API_KEY,
                  "[REDACTED]"
                )
              });
            }
            if (
              (result.responses.length + result.attempts.length) % 100 ===
              0
            ) {
              writeAtomicJson(output, result);
              console.log(
                JSON.stringify({
                  completed: result.responses.length,
                  planned: result.requests.length,
                  failedAttempts: result.attempts.length
                })
              );
            }
          })
        )
    );
    result.runs ??= [];
    result.runs.push({
      recordedAt: new Date().toISOString(),
      elapsedMs: performance.now() - started
    });
    writeAtomicJson(output, result);
  }
  result.assessment = assessment(result);
  const repeated = assessment(result, "last");
  result.repeatSensitivity = {
    policy:
      "Reuse the first recorded answer for each byte-identical request; preserve all repeats and compare last-recorded answers separately.",
    uniqueRequests: new Set(result.requests.map((item) => item.requestSha256))
      .size,
    lastRecordedSummaries: repeated.summaries,
    changedDecisions: repeated.decisions.filter(
      (decision, index) =>
        decision.paragraphHit !==
          result.assessment.decisions[index].paragraphHit ||
        decision.sentenceHit !== result.assessment.decisions[index].sentenceHit
    )
  };
  result.scorerSha256 = snapshot.runnerSha256;
  result.inferenceSha256 = seal();
  result.complete = true;
  writeAtomicJson(output, result);
  console.log(
    JSON.stringify({
      complete: true,
      ...result.assessment,
      decisions: undefined,
      changes: result.assessment.changes.length
    })
  );
}
