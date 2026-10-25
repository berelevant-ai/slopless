# Model Runners

`jev.mjs` combines `prompts/v1/shared.md` with one selected check, judges each labeled passage independently, and identifies the participating sentences after a positive decision.

## Commands

Run from the repository root after installing dependencies and running `pnpm run build`:

```sh
node runners/datasets.mjs
node runners/jev.mjs --help
node runners/jev.mjs validate
node runners/jev.mjs score --output runners/results/semantic-thinness-v1.json
```

For a new prompt version:

```sh
node runners/jev.mjs run --prompts prompts/v2 --output runners/results/semantic-thinness-v2.json
```

- Copy and edit the four prompt files into `prompts/v2` before running that comparison.
- `--dataset` selects a Markdown file or directory of paired datasets. The default is `datasets/ai-synthetic/semantic-thinness.md`.
- `--check generic-realization` selects one prompt. Scoring uses its assigned positives, no-hits scoped to that check, and any legacy family-wide clean controls.
- `--family puffery-and-overstatement` selects the labels belonging to that family. The default remains `semantic-thinness`.
- `--mode classification-only` plans detection batches, scores passage decisions, and completes without sentence highlighting. The default remains `detect-and-highlight`.
- `--development-only` requires `split: development` in every collection's metadata before loading target text or initializing credentials or the SDK. It checks metadata rather than filenames, including directory inputs.
- `--batch-size 16` reduces the number of questions per request while preserving each complete target. The setting is a safe integer from 1 to 100, defaults to 100, and stays fixed for resumption, scoring, and rescoring. Historical outputs use 100; nondefault sizes are recorded in the snapshot.
- `validate` checks inputs and any supplied output offline. `score` requires a completed output. `run` resumes completed batches and calls Jev for missing batches.
- Changed inference inputs require a new output. `rescore` appends corrected-label scores to a completed new-format output offline. Save model results outside `datasets/` and the prompt folder.
- Inference receives target text and identifiers. Assignments, labels, rationales, evidence, and review objections remain in offline scoring.

`pnpm install` supplies the pinned SDK. `--sdk` selects an alternative local SDK module. Provider calls use the approved `JEV_API_KEY` or 1Password credential; offline commands need neither.

For development-only classification:

```sh
node runners/jev.mjs validate --family puffery-and-overstatement --mode classification-only --development-only --dataset PATH --prompts prompts/v10 --check inflated-evaluation
```

Use the same arguments with `run --output FILE` for inference or `rescore --output FILE` after correcting judgments.

## Narrative Craft

Version `prompts/v21/` contains nineteen passage checks. The [tuning record](results/narrative-craft-v21-development-tuning.json) records each selected cutoff and the current source/confirmation result paths under `finalCurrentEvidence`.

```sh
node runners/jev.mjs validate --family narrative-craft --check body-emotion-shorthand --mode classification-only --development-only --dataset datasets/ai-synthetic/passages/000077-narrative-craft-body-emotion-shorthand-development.md --prompts prompts/v21 --threshold 0.5 --batch-size 16 --model jev-1.13.0
```

- Use `run` with the same arguments and a new `--output` path for inference. Preserve SDK 0.7.0 and the selected check's cutoff when comparing candidates.
- Validate each named check independently on its isolated and assigned mixed collections. Keep protected holdout inference separate from development.
- These results classify complete passages. The narrative prompts identify weak occurrences; frequency reporting and span highlighting retain their separate stages.

## Generated Residue

Version `prompts/v22/` contains artifact placeholders, model disclaimers and assistant wrappers. The [development report](results/generated-residue-v22-development.md) records selected revisions, cutoffs and all remaining errors.

```sh
node runners/jev.mjs validate --family generated-residue --check response-wrapper --mode classification-only --development-only --dataset datasets/ai-synthetic/passages/000133-generated-residue-response-wrapper-development.md --prompts prompts/v22 --threshold 0.55 --batch-size 16 --model jev-1.13.0
```

- Use `run` with the same arguments and a new `--output` path for inference. Keep artifacts and disclaimers at `0.5`; wrappers use `0.55`.
- Validate each isolated and assigned mixed collection independently. Join validated mixed outputs by collection, passage and full check name, applying each check's own cutoff.
- Keep the mixed-B unnecessary-framing comparator at `prompts/v13` and `0.5`. Protected holdout inference requires separate authorization.

## Whole-Text Location Spike

`jev-locations.mjs` reuses the frozen buried-answer and repeated-explanation development predictions. After a positive decision it asks independent paragraph-participation questions with the full original text, then emits native textlint paragraph ranges.

```sh
node runners/jev-locations.mjs validate
node runners/jev-locations.mjs score
```

- The saved run is `results/text-location-v23-spike.json`; the report explains strict snippet coverage and manual location review separately.
- `prepare` creates a fresh registration only when the output is absent. `run` requires the registered inference-producing runner bytes and approved credentials. Completed results support offline `validate` and `score`; all requests, responses and derived outputs are checked.
- Source, prompts and labels remain frozen for inference. An offline-only verification repair normalizes JSON report fields and protects derived summaries and runtime receipts; the saved producing-source hash remains intact.
- The generic location prompt is in `prompts/v23/`; frozen issue definitions are loaded from `v13` and `v16`. All inputs are development-only; paragraph selection remains experimental.

## Paragraph Input Experiment

The scoped `jev-paragraphs.mjs` experiment reads a saved wordiness/redundancy mixed result, judges each plain paragraph for its two passage checks, and scores the original text labels by any positive paragraph. It preserves heading/opening pairs, rejects other Markdown block types through textlint's parser, and reuses whole-text repeated-explanation probabilities.

```sh
node runners/jev-paragraphs.mjs --help
node runners/jev-paragraphs.mjs score --baseline runners/results/wordiness-and-redundancy-v16-mixed-holdout.json --output runners/results/wordiness-and-redundancy-v16-paragraph-holdout.json
node --test runners/jev-paragraphs.test.mjs
```

`validate` and `score` are offline; `run` requires the approved credential in `JEV_API_KEY`. Inputs, request hashes, original labels, and the completed prediction seal are verified on replay. The first completed response is archived at `0da39135`; its offline `seal --archive COMMIT` migration checks exact archived result bytes and producing-source hash before adding integrity fields. [The comparison](results/wordiness-and-redundancy-v16-paragraph-holdout.md) reports the exposed-holdout experiment separately from the first frozen evaluation.

## Check Questions

A check Markdown file can start with JSON front matter between `---` lines. Store an `instructions` string and `criteria` with nonempty `true` and `false` strings there; keep the check's principle and examples in the Markdown body.

```markdown
---
{
  "instructions": "Does the complete target contain this defect?",
  "criteria":
    {
      "true": "The named defect is present.",
      "false": "The named defect is absent."
    }
}
---

# Check Name

Describe the defect and its boundaries here.
```

- Classification uses that question and those criteria with the shared instructions and check body. Each target remains independent.
- Bare Markdown keeps the existing classification question. Sentence highlighting keeps its existing question; classification criteria apply only to classification.
- Prompt snapshots bind the question and both criteria. Changing any of them requires a new inference result; saved batches remain tied to their original requests.
- Leading `---` reserves the JSON front-matter format. The loader rejects malformed objects, extra fields, empty strings, and missing bodies before provider initialization.

## Shared Helpers

Temporary tuning drivers import these public functions from `runners/jev.mjs`:

- `preflightDataset(input, { developmentOnly = false } = {})` returns document paths. Call it with `developmentOnly: true` before `loadDataset`, credential access, or SDK initialization.
- `writeAtomicJson(file, value)` serializes a result into an exclusively created file inside a private temporary directory, atomically replaces the destination, and cleans up temporary files on success or failure. Both the public runner and temporary tuning driver use it.
- `loadDataset(input, family = "semantic-thinness")` returns sorted targets with resolved labels and sentence ranges. `loadPrompts(directory, selected)` selects one check or all prompt files.
- A target with multiple labels in the selected family appears once and adds `labels`, containing its independent resolved judgments. Its existing `label` and `group` describe the first judgment. Single-label rows retain their existing shape.
- `batchPlans(rows, checks, threshold, completed, mode = "detect-and-highlight", batchSize = 100)` returns ordered request plans, including a smaller final batch. Both detection and highlighting use the selected size. `buildRequest(model, prompts, check, items, rows)` builds label-free requests; `validateResponse(savedBatch, request)` verifies responses and request hashes.
- `score(rows, checks, threshold, batches, mode = "detect-and-highlight")` returns per-check scores. Classification-only findings contain IDs and scores; highlighting findings also contain sentence ranges.
- `scoreMixed(rows, checks, threshold, batches)` returns aggregate counts for the selected checks from saved detection answers. It requires a nonempty, unique check list and complete predictions for fully labeled targets.
- `createSnapshot({ dataset, promptDirectory, model, threshold, checks, prompts, rows, family, mode, batchSize = 100 })` records input hashes and execution settings. Its family and mode defaults match the CLI. Size 100 is omitted from saved snapshots to preserve historical default bytes; missing sizes normalize to 100 during validation.
- `validateResult(result, { snapshot, rows, prompts })` verifies saved inputs and the completed batch prefix, returning `{ complete }`.
- `rescoreResult(result, { snapshot, rows, prompts })` returns a clone with one appended `rescores` entry. Supply a snapshot and rows loaded from the corrected dataset, with the original model, prompts, threshold, family, and mode. The helper accepts retained prompt contents from an immutable trial; the CLI loads prompts from its selected directory.

## Mixed Judgments

- Use the same dataset schema: give a sample one label per assessed check. The runner sends one question per target/check and keeps complete target text intact.
- Per-check scores use that check's available judgments. Missing labels remain unassessed; predictions on those targets still appear in findings.
- Completed CLI reports add `mixed` when a target has multiple labels. It includes distinct `targets`, available `judgments`, and `excludedIncomplete` target counts for the selected checks.
- `allIssuesFound` reports `eligible` fully labeled targets with at least one expected hit and `matched` targets with every expected hit caught. An extra false positive still permits an all-issues-found match.
- `exactMatch` reports all fully labeled targets as `eligible`, including all-negative controls. A `matched` target has every selected prediction equal to its judgment.
- Targets missing any selected judgment are excluded from both aggregates. Their available judgments still contribute to per-check scores and the `judgments` count.
- First completion saves `mixed` beside the original summaries. Offline `validate`, `score`, and completed `run` recompute it without rewriting completed caches. Label-only rescoring appends corrected `mixed` counts beside corrected per-check summaries.

## Label-Only Rescoring

- New snapshots record `family`, `mode`, and `targetsSha256`. The target hash binds text, sample IDs, ranges, and check assignments separately from judgments.
- Mixed target hashes include every check assignment and omit expected values and snippets. Single-label target hashes and default snapshot bytes keep their existing format.
- Completed `run` outputs preserve original `summaries` and `inferenceSha256`, computed as SHA-256 of `JSON.stringify({ batches: result.batches, summaries: result.summaries })`. Temporary drivers using `rescoreResult` must preserve these fields for each immutable trial.
- Derived `mixed` counts remain outside that unchanged inference-hash formula. CLI reports recompute them from the validated predictions and current judgments.
- Each rescore appends its timestamp, original and corrected label hashes, original inference hash, and corrected summaries. The original snapshot, batches, predictions, request hashes, timings, usage, and scores stay intact.
- Rescoring verifies current disk inputs, target assignments, model, prompts, requests, response validity, and the original inference hash before writing. Changed inference inputs require new calls.
- Ordinary `validate`, `score`, and `run` retain strict label-hash matching. Use `rescore` to calculate corrected-label scores while retaining the original inference snapshot.

## Saved Result

Snapshots without `family`, `mode`, or `batchSize` use `semantic-thinness`, `detect-and-highlight`, and 100. Existing snapshots without the new target hash remain supported by offline validation, scoring, and resumption; rescoring requires the new target hash and preserved original summaries.

`results/semantic-thinness-v1.json` preserves 28 of 29 assigned positives caught across the three prompts, with 13 of 240 clean paragraphs flagged. All 2,251 decisions and 27 request hashes reproduce unchanged after the storage migration.

The other 335 positive paragraphs have different primary issue assignments. Their targets remain in every detection run; the three current prompts are scored against their own assigned positives.

`datasets.mjs` reads and validates paired Markdown/labels files against `dataset.schema.json`. Version 2 labels use IDs, named checks, expected booleans, and hit snippets; the reader resolves their ranges from samples. Version 1 annotations remain supported. `scripts/datasets-contract.mjs` exercises the reader and Jev request boundary through Fixture3.

The earlier experiment-specific helpers and artifacts remain in Git at `41d34169`. Their retained prose and judgments are now in the four dataset collections.
