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
- `validate` checks inputs and any supplied output offline. `score` requires a completed output. `run` resumes completed batches and calls Jev for missing batches.
- Changed inference inputs require a new output. `rescore` appends corrected-label scores to a completed new-format output offline. Save model results outside `datasets/` and the prompt folder.
- Inference receives target text and identifiers. Assignments, labels, rationales, evidence, and review objections remain in offline scoring.

`pnpm install` supplies the pinned SDK. `--sdk` selects an alternative local SDK module. Provider calls use the approved `JEV_API_KEY` or 1Password credential; offline commands need neither.

For development-only classification:

```sh
node runners/jev.mjs validate --family puffery-and-overstatement --mode classification-only --development-only --dataset PATH --prompts prompts/v10 --check inflated-evaluation
```

Use the same arguments with `run --output FILE` for inference or `rescore --output FILE` after correcting judgments.

## Shared Helpers

Temporary tuning drivers import these public functions from `runners/jev.mjs`:

- `preflightDataset(input, { developmentOnly = false } = {})` returns document paths. Call it with `developmentOnly: true` before `loadDataset`, credential access, or SDK initialization.
- `loadDataset(input, family = "semantic-thinness")` returns sorted targets with resolved labels and sentence ranges. `loadPrompts(directory, selected)` selects one check or all prompt files.
- `batchPlans(rows, checks, threshold, completed, mode = "detect-and-highlight")` returns ordered request plans. `buildRequest(model, prompts, check, items, rows)` builds label-free requests; `validateResponse(savedBatch, request)` verifies responses and request hashes.
- `score(rows, checks, threshold, batches, mode = "detect-and-highlight")` returns per-check scores. Classification-only findings contain IDs and scores; highlighting findings also contain sentence ranges.
- `createSnapshot({ dataset, promptDirectory, model, threshold, checks, prompts, rows, family, mode })` records input hashes and execution settings. Its family and mode defaults match the CLI.
- `validateResult(result, { snapshot, rows, prompts })` verifies saved inputs and the completed batch prefix, returning `{ complete }`.
- `rescoreResult(result, { snapshot, rows, prompts })` returns a clone with one appended `rescores` entry. Supply a snapshot and rows loaded from the corrected dataset, with the original model, prompts, threshold, family, and mode. The helper accepts retained prompt contents from an immutable trial; the CLI loads prompts from its selected directory.

## Label-Only Rescoring

- New snapshots record `family`, `mode`, and `targetsSha256`. The target hash binds text, sample IDs, ranges, and check assignments separately from judgments.
- Completed `run` outputs preserve original `summaries` and `inferenceSha256`, computed as SHA-256 of `JSON.stringify({ batches: result.batches, summaries: result.summaries })`. Temporary drivers using `rescoreResult` must preserve these fields for each immutable trial.
- Each rescore appends its timestamp, original and corrected label hashes, original inference hash, and corrected summaries. The original snapshot, batches, predictions, request hashes, timings, usage, and scores stay intact.
- Rescoring verifies current disk inputs, target assignments, model, prompts, requests, response validity, and the original inference hash before writing. Changed inference inputs require new calls.
- Ordinary `validate`, `score`, and `run` retain strict label-hash matching. Use `rescore` to calculate corrected-label scores while retaining the original inference snapshot.

## Saved Result

Snapshots without `family` or `mode` use `semantic-thinness` and `detect-and-highlight`. Existing snapshots without the new target hash remain supported by offline validation, scoring, and resumption; rescoring requires the new target hash and preserved original summaries.

`results/semantic-thinness-v1.json` preserves 28 of 29 assigned positives caught across the three prompts, with 13 of 240 clean paragraphs flagged. All 2,251 decisions and 27 request hashes reproduce unchanged after the storage migration.

The other 335 positive paragraphs have different primary issue assignments. Their targets remain in every detection run; the three current prompts are scored against their own assigned positives.

`datasets.mjs` reads and validates paired Markdown/labels files against `dataset.schema.json`. Version 2 labels use IDs, named checks, expected booleans, and hit snippets; the reader resolves their ranges from samples. Version 1 annotations remain supported. `scripts/datasets-contract.mjs` exercises the reader and Jev request boundary through Fixture3.

The earlier experiment-specific helpers and artifacts remain in Git at `41d34169`. Their retained prose and judgments are now in the four dataset collections.
