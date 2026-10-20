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
- `--check generic-realization` selects one prompt. Every labeled target remains an input; scoring uses its assigned positives and all family-wide clean controls.
- `validate` checks inputs and any supplied output offline. `score` requires a completed output. `run` resumes completed batches and calls Jev for missing batches.
- Changed prompts, text, labels, model, or threshold require a new output. Save model results outside `datasets/` and the prompt folder.
- Inference receives target text and identifiers. Assignments, labels, rationales, evidence, and review objections remain in offline scoring.

`pnpm install` supplies the pinned SDK. `--sdk` selects an alternative local SDK module. Provider calls use the approved `JEV_API_KEY` or 1Password credential; offline commands need neither.

## Saved Result

`results/semantic-thinness-v1.json` preserves 28 of 29 assigned positives caught across the three prompts, with 13 of 240 clean paragraphs flagged. All 2,251 decisions and 27 request hashes reproduce unchanged after the storage migration.

The other 335 positive paragraphs have different primary issue assignments. Their targets remain in every detection run; the three current prompts are scored against their own assigned positives.

`datasets.mjs` reads and validates paired Markdown/labels files against `dataset.schema.json`. `scripts/datasets-contract.mjs` exercises the reader and Jev request boundary through Fixture3.

The earlier experiment-specific helpers and artifacts remain in Git at `41d34169`. Their retained prose and judgments are now in the four dataset collections.
