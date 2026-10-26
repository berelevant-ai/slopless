import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { createLinter, loadTextlintrc } from "textlint";
import {
  createSnapshot,
  loadDataset,
  loadPrompts,
  preflightDataset,
  rescoreResult,
  validateResponse,
  validateResult,
  writeAtomicJson
} from "./jev.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    output: {
      type: "string",
      default: "runners/results/text-location-v23-spike.json"
    },
    help: { type: "boolean" },
    "one-shot": { type: "boolean", default: false },
    check: { type: "string" }
  }
});
if (values.help) {
  console.log(
    "node runners/jev-locations.mjs <prepare|run|score|validate> [--output FILE] [--check NAME] [--one-shot]\nDevelopment-only paragraph-location spike. prepare freezes inputs into a new file; run performs missing Jev location calls on previously detected texts. --one-shot requires --check and asks detection plus every paragraph in one request for each text, including no-hits. Supply the same flags for offline score and validate. Use a new --output path for a new attempt; preserve existing results."
  );
  process.exit(0);
}
const output = resolve(root, values.output);
assert.ok(
  output.startsWith(resolve(root, "runners/results") + "/"),
  "Save outputs under runners/results."
);
const hash = (value) => createHash("sha256").update(value).digest("hex");
const fileHash = (file) => hash(readFileSync(resolve(root, file)));
const read = (file) => JSON.parse(readFileSync(resolve(root, file), "utf8"));
const allInputs = [
  {
    family: "boilerplate-and-signposting",
    check: "buried-answer",
    dataset:
      "datasets/ai-synthetic/texts/000031-boilerplate-and-signposting-buried-answer-development.md",
    prompts: "prompts/v13",
    baseline:
      "runners/results/boilerplate-and-signposting-v13-buried-answer-development-tuning.json"
  },
  {
    family: "wordiness-and-redundancy",
    check: "repeated-explanation",
    dataset:
      "datasets/ai-synthetic/texts/000037-wordiness-and-redundancy-repeated-explanation-development.md",
    prompts: "prompts/v16",
    baseline: "runners/results/repeated-explanation-v16-development.json"
  }
];
const inputs = allInputs.filter(
  (i) => !values.check || i.check === values.check
);
assert.ok(inputs.length, "Unknown check.");
const oneShot = values["one-shot"];
assert.ok(
  !oneShot || values.check,
  "Select one --check for one-shot inference."
);
const settings = {
  model: "jev-1.13.0",
  sdk: "0.7.0",
  threshold: 0.5,
  batchSize: 16,
  ...(oneShot ? { oneShot: true } : {})
};
const locationFiles = [
  "prompts/v23/shared.md",
  "prompts/v23/paragraph-location.md"
];
const common = locationFiles
  .map((f) => readFileSync(resolve(root, f), "utf8").trim())
  .join("\n\n");
const question =
  "Does the specified paragraph participate in the named defect under the full article context and location instructions?";
const criteria = {
  true: "This paragraph contains a required marked part of the defect.",
  false:
    "This paragraph is unrelated, useful context only, or the defect is absent."
};
const [command] = positionals;
assert.ok(
  positionals.length === 1 &&
    ["prepare", "run", "score", "validate"].includes(command),
  "Use prepare, run, score or validate."
);

function seal(result) {
  return hash(
    JSON.stringify({
      registration: result.registration,
      documents: result.documents
    })
  );
}

async function paragraphs(text, selected = []) {
  const observed = [];
  const descriptor = (await loadTextlintrc()).shallowMerge({
    filterRules: [],
    rules: [
      {
        ruleId: "location-spike",
        rule(context) {
          return {
            Paragraph(node) {
              const item = {
                id: `P${observed.length + 1}`,
                text: context.getSource(node),
                range: [...node.range],
                loc: node.loc
              };
              assert.equal(text.slice(...item.range), item.text);
              observed.push(item);
              if (selected.includes(item.id))
                context.report(
                  node,
                  new context.RuleError("Selected paragraph", {
                    padding: context.locator.range([0, item.text.length])
                  })
                );
            }
          };
        }
      }
    ]
  });
  const result = await createLinter({ descriptor }).lintText(text, "spike.md");
  assert.equal(result.messages.length, selected.length);
  for (const message of result.messages)
    assert.ok(
      observed.some(
        (p) =>
          selected.includes(p.id) &&
          JSON.stringify(p.range) === JSON.stringify(message.range)
      )
    );
  return { observed, reports: result.messages };
}

function request(document, check, candidates) {
  const req = {
    model: settings.model,
    state: {
      instructions: common,
      check,
      definition: document.definition,
      article: document.text,
      paragraphs: document.paragraphs.map(({ id, text }) => ({ id, text }))
    },
    questions: Object.fromEntries(
      candidates.map((p) => [
        p.id,
        { type: "noul", instructions: { question, paragraph: p.id }, criteria }
      ])
    )
  };
  if (oneShot) {
    const prompt = loadPrompts(
      resolve(root, inputs[0].prompts),
      inputs[0].check
    );
    delete req.state.instructions;
    req.state.detectionInstructions = prompt.instructions;
    req.state.locationInstructions = common;
    for (const q of Object.values(req.questions))
      q.instructions.instructions = "Follow state.locationInstructions.";
    req.questions.detection = {
      type: "noul",
      instructions: {
        question: prompt.questions[inputs[0].check].instructions,
        target: document.text,
        rulebook: "state.definition",
        instructions: "Follow state.detectionInstructions."
      },
      criteria: prompt.questions[inputs[0].check].criteria
    };
    assert.ok(Object.keys(req.questions).length <= 16);
  }
  return req;
}

async function sourceDocuments() {
  for (const input of inputs)
    preflightDataset(resolve(root, input.dataset), { developmentOnly: true });
  const documents = [];
  for (const input of inputs) {
    const rows = loadDataset(resolve(root, input.dataset), input.family);
    const prompts = loadPrompts(resolve(root, input.prompts), input.check);
    const trial = read(input.baseline).trials.at(-1);
    assert.deepEqual(
      trial.prompts,
      prompts,
      "Selected detector prompt changed."
    );
    const native = {
      snapshot: trial.inference[0].snapshot,
      batches: trial.batches,
      summaries: trial.inference[0].summaries,
      inferenceSha256: trial.inference[0].inferenceSha256
    };
    const snapshot = createSnapshot({
      dataset: resolve(root, input.dataset),
      promptDirectory: resolve(root, input.prompts),
      model: settings.model,
      threshold: 0.5,
      checks: [input.check],
      prompts,
      rows,
      family: input.family,
      mode: "classification-only",
      batchSize: 16
    });
    if (native.snapshot.labelsSha256 === snapshot.labelsSha256) {
      assert.equal(
        validateResult(native, { snapshot, rows, prompts }).complete,
        true
      );
    } else {
      const rescore = trial.inference[0].rescores?.at(-1);
      assert.equal(
        rescore?.rescoredLabelsSha256,
        snapshot.labelsSha256,
        "Current labels have no recorded baseline rescore."
      );
      assert.equal(rescore.inferenceSha256, native.inferenceSha256);
      rescoreResult(native, { snapshot, rows, prompts });
    }
    const probabilities = Object.assign(
      {},
      ...native.batches.map((b) => b.response.answers)
    );
    const assembledWords = [
      common,
      prompts.types[input.check],
      question,
      ...Object.values(criteria)
    ]
      .join(" ")
      .split(/\s+/).length;
    assert.ok(
      assembledWords <= 1000,
      `Location prompt exceeds 1,000 words: ${assembledWords}`
    );
    for (const row of rows) {
      const label = (row.labels ?? [row.label]).find(
        (l) => l.check === `${input.family}/${input.check}`
      );
      const { observed } = await paragraphs(row.text);
      const reference = new Set(),
        ambiguous = [],
        unmapped = [];
      for (const snippet of label.evidence) {
        const matches = observed.filter((p) => p.text.includes(snippet));
        if (matches.length === 0) unmapped.push(snippet);
        if (matches.length > 1) ambiguous.push(snippet);
        for (const p of matches) reference.add(p.id);
      }
      documents.push({
        id: row.id,
        check: label.check,
        text: row.text,
        definition: prompts.types[input.check],
        assembledWords,
        paragraphs: observed,
        expected: label.expected,
        snippets: label.evidence,
        reference: [...reference],
        ambiguous,
        unmapped,
        detectionProbability: probabilities[`${row.id}_${input.check}`].noul,
        batches: []
      });
    }
  }
  return documents;
}

if (command === "prepare") {
  assert.ok(!existsSync(output), "Existing result must be inspected.");
  const documents = await sourceDocuments();
  const files = [
    ...new Set([
      ...inputs.flatMap((i) => [
        i.dataset,
        i.dataset.replace(/\.md$/, ".labels.json"),
        i.baseline,
        `${i.prompts}/shared.md`,
        `${i.prompts}/${i.check}.md`
      ]),
      ...locationFiles,
      "runners/jev-locations.mjs",
      "runners/jev.mjs",
      "runners/datasets.mjs"
    ])
  ];
  writeAtomicJson(output, {
    registration: {
      authorizedBy: oneShot ? "User: try it on one rule" : "User: do a spike",
      registeredAt: new Date().toISOString(),
      commit: execFileSync("git", ["rev-parse", "HEAD"], {
        cwd: root,
        encoding: "utf8"
      }).trim(),
      settings,
      inputs,
      hashes: Object.fromEntries(files.map((f) => [f, fileHash(f)])),
      policy:
        "One frozen development attempt; labels and detectors unchanged; holdouts excluded."
    },
    documents
  });
  console.log(
    JSON.stringify({
      documents: documents.length,
      gated: documents.filter((d) => oneShot || d.detectionProbability >= 0.5)
        .length,
      decisions: documents
        .filter((d) => oneShot || d.detectionProbability >= 0.5)
        .reduce((n, d) => n + d.paragraphs.length + Number(oneShot), 0),
      ambiguous: documents.filter((d) => d.ambiguous.length).length,
      unmapped: documents.filter((d) => d.unmapped.length).length,
      words: [...new Set(documents.map((d) => d.assembledWords))]
    })
  );
} else {
  const result = read(output);
  for (const [file, expected] of Object.entries(result.registration.hashes)) {
    // Offline replay reconstructs every request; retain the producing runner hash as provenance.
    if (file !== "runners/jev-locations.mjs" || command === "run")
      assert.equal(fileHash(file), expected, file);
  }
  for (const input of inputs)
    preflightDataset(resolve(root, input.dataset), { developmentOnly: true });
  assert.deepEqual(result.registration.settings, settings);
  if (result.inferenceSha256)
    assert.equal(
      seal(result),
      result.inferenceSha256,
      "Saved location predictions changed."
    );
  if (command === "run") {
    const require = createRequire(resolve(root, "package.json"));
    const entry = require.resolve("@typesafe-ai/sdk"),
      manifest = resolve(dirname(entry), "../package.json");
    assert.equal(read(manifest).version, settings.sdk);
    const token = execFileSync(
      "/usr/bin/security",
      [
        "find-generic-password",
        "-s",
        "codex.agent-1password.api-reader",
        "-a",
        "api-reader",
        "-w"
      ],
      { encoding: "utf8" }
    ).trim();
    const env = {
      ...process.env,
      OP_SERVICE_ACCOUNT_TOKEN: token,
      OP_BIOMETRIC_UNLOCK_ENABLED: "false"
    };
    delete env.OP_CONNECT_HOST;
    delete env.OP_CONNECT_TOKEN;
    const apiKey = execFileSync(
      "op",
      [
        "read",
        "op://2w4dmxssqydex4p4t5k72cnnja/k7cwlx2niy42tl3j3gqlueejzu/credential"
      ],
      { env, encoding: "utf8" }
    ).trim();
    const { TypeSafeClient } = await import(pathToFileURL(entry).href);
    const client = new TypeSafeClient({
      apiKey,
      baseURL: "https://api.typesafe.ai",
      logLevel: "off",
      timeout: 120000,
      retry: { maxRetries: 0 }
    });
    result.runtime = {
      sdk: settings.sdk,
      entry,
      entrySha256: fileHash(entry),
      manifest,
      manifestSha256: fileHash(manifest),
      startedAt: new Date().toISOString()
    };
    let next = 0,
      completed = 0;
    const gated = result.documents.filter(
      (d) => oneShot || d.detectionProbability >= 0.5
    );
    async function worker() {
      while (next < gated.length) {
        const doc = gated[next++];
        for (
          let start = 0, index = 0;
          start < doc.paragraphs.length;
          start += 16, index++
        ) {
          const req = request(
            doc,
            doc.check,
            doc.paragraphs.slice(start, start + 16)
          );
          if (doc.batches[index]) {
            validateResponse(doc.batches[index], req);
            continue;
          }
          const started = performance.now();
          let response;
          try {
            response = await client.systemOne(req);
          } catch (error) {
            throw Error(String(error.message).replaceAll(apiKey, "[REDACTED]"));
          }
          const batch = {
            index,
            requestSha256: hash(JSON.stringify(req)),
            elapsedMs: performance.now() - started,
            recordedAt: new Date().toISOString(),
            response
          };
          validateResponse(batch, req);
          doc.batches.push(batch);
          writeAtomicJson(output, result);
        }
        completed++;
        if (completed % 20 === 0)
          console.log(JSON.stringify({ completed, total: gated.length }));
      }
    }
    await Promise.all(Array.from({ length: 3 }, worker));
    result.runtime.finishedAt = new Date().toISOString();
    result.runtimeSha256 = hash(JSON.stringify(result.runtime));
    result.inferenceSha256 = seal(result);
    writeAtomicJson(output, result);
  }
  assert.equal(result.runtime.sdk, settings.sdk);
  assert.equal(fileHash(result.runtime.entry), result.runtime.entrySha256);
  assert.equal(
    fileHash(result.runtime.manifest),
    result.runtime.manifestSha256
  );
  assert.equal(read(result.runtime.manifest).version, settings.sdk);
  assert.equal(
    hash(JSON.stringify(result.runtime)),
    result.runtimeSha256,
    "Runtime receipt changed."
  );
  const summaries = [],
    errors = [],
    locations = [];
  for (const input of inputs) {
    const docs = result.documents.filter(
      (d) => d.check === `${input.family}/${input.check}`
    );
    const summary = {
      check: `${input.family}/${input.check}`,
      texts: docs.length,
      expectedHits: 0,
      detectorCaught: 0,
      detectorFalsePositives: 0,
      locatedTrueDetections: 0,
      coveredAllReference: 0,
      exactReference: 0,
      requiredParagraphs: 0,
      selectedRequired: 0,
      extraParagraphs: 0,
      selectedParagraphs: 0,
      gatedNegativesWithLocations: 0,
      positiveDetectionsWithoutLocations: 0,
      unmappedReferences: 0,
      ambiguousReferences: 0,
      requests: 0,
      decisions: 0,
      requestMs: 0,
      usage: {}
    };
    for (const doc of docs) {
      summary.expectedHits += Number(doc.expected);
      if (!oneShot && doc.detectionProbability < 0.5) {
        assert.equal(doc.batches.length, 0);
        continue;
      }
      const answers = {};
      for (
        let start = 0, index = 0;
        start < doc.paragraphs.length;
        start += 16, index++
      ) {
        assert.ok(doc.batches[index], `Incomplete location result: ${doc.id}`);
        const batch = doc.batches[index];
        validateResponse(
          batch,
          request(doc, doc.check, doc.paragraphs.slice(start, start + 16))
        );
        Object.assign(answers, batch.response.answers);
        summary.requests++;
        summary.requestMs += batch.elapsedMs;
        for (const [k, n] of Object.entries(batch.response.usage))
          summary.usage[k] = (summary.usage[k] ?? 0) + n;
      }
      const selected = doc.paragraphs
        .filter((p) => answers[p.id].noul >= 0.5)
        .map((p) => p.id);
      const detected =
        (oneShot ? answers.detection.noul : doc.detectionProbability) >= 0.5;
      const missing = doc.reference.filter((id) => !selected.includes(id)),
        extra = selected.filter((id) => !doc.reference.includes(id));
      const native = await paragraphs(doc.text, selected);
      summary.decisions += doc.paragraphs.length;
      summary.selectedParagraphs += selected.length;
      if (detected && !selected.length)
        summary.positiveDetectionsWithoutLocations++;
      if (doc.expected) {
        summary.detectorCaught += Number(detected);
        summary.locatedTrueDetections += Number(selected.length > 0);
        summary.coveredAllReference += Number(
          doc.unmapped.length === 0 && missing.length === 0
        );
        summary.exactReference += Number(
          doc.unmapped.length === 0 &&
            missing.length === 0 &&
            extra.length === 0
        );
        summary.requiredParagraphs += doc.reference.length;
        summary.selectedRequired += doc.reference.filter((id) =>
          selected.includes(id)
        ).length;
        summary.extraParagraphs += extra.length;
        summary.unmappedReferences += Number(doc.unmapped.length > 0);
        summary.ambiguousReferences += Number(doc.ambiguous.length > 0);
      } else {
        summary.detectorFalsePositives += Number(detected);
        summary.gatedNegativesWithLocations += Number(selected.length > 0);
      }
      locations.push({
        id: doc.id,
        check: doc.check,
        selected,
        missing,
        extra,
        reports: native.reports
      });
      if (
        missing.length ||
        extra.length ||
        !doc.expected ||
        doc.unmapped.length ||
        doc.ambiguous.length
      )
        errors.push({
          id: doc.id,
          check: doc.check,
          expected: doc.expected,
          missing,
          extra,
          ambiguous: doc.ambiguous,
          unmapped: doc.unmapped
        });
    }
    summaries.push(summary);
  }
  const normalizedLocations = JSON.parse(JSON.stringify(locations));
  if (command === "validate" || command === "score") {
    assert.ok(Array.isArray(result.locations), "Saved locations are required.");
    assert.ok(Array.isArray(result.summaries), "Saved summaries are required.");
    assert.ok(
      Array.isArray(result.errors),
      "Saved error records are required."
    );
  }
  if (result.locations)
    assert.deepEqual(
      result.locations,
      normalizedLocations,
      "Saved derived locations changed."
    );
  if (result.summaries)
    assert.deepEqual(result.summaries, summaries, "Saved summaries changed.");
  if (result.errors)
    assert.deepEqual(result.errors, errors, "Saved error records changed.");
  result.summaries = summaries;
  result.errors = errors;
  result.locations = normalizedLocations;
  result.offlineVerifierSha256 = fileHash("runners/jev-locations.mjs");
  assert.ok(result.inferenceSha256, "Run inference before scoring.");
  assert.equal(seal(result), result.inferenceSha256);
  if (command !== "validate") writeAtomicJson(output, result);
  console.log(JSON.stringify({ summaries, errorTexts: errors.length }));
}
