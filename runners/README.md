# Model Runners

`jev.mjs` evaluates the Markdown prompts against the holdout. It checks one issue type per paragraph, then identifies the sentences involved in each positive decision.

## Commands

Run from the repository root after `pnpm run build`:

```sh
node runners/jev.mjs --help
node runners/jev.mjs validate
node runners/jev.mjs score --output runners/results/semantic-thinness-v1.json
```

To run a new prompt version:

```sh
node runners/jev.mjs run --prompts prompts/v2 --output runners/results/semantic-thinness-v2.json
```

- Create `v2` by copying and editing the four `v1` files. The runner reads `shared.md` plus the check files in the selected folder.
- Use `--check abstract-contrast` to evaluate one check. Every paragraph remains an input, including all 240 family-clean controls.
- Use `--dataset` to select another folder containing `paragraphs.json` and `labels.json`. Ground truth and type assignments remain outside model requests.
- Each output stores its model, threshold, prompt/data hashes, and completed batches. Repeating the command resumes that output; changed inputs require a new output.
- `validate` checks inputs and, with `--output`, saved batches. `score` requires every planned detection and highlighting batch to be complete.

`pnpm install` installs the pinned Jev SDK development dependency. Override it with `--sdk /path/to/@typesafe-ai/sdk/dist/index.mjs` when comparing SDK versions. Credentials come from `JEV_API_KEY` or the approved 1Password entry; offline commands require neither.

## Saved Result

- `results/semantic-thinness-v1.json` preserves the latest separately submitted checks: 28/29 assigned positives, with 13 of 240 clean paragraphs flagged by at least one check.
- All 28 caught assigned positives retain their evidence-bearing sentence selections. The run completed 2,251 decisions in 27 requests, with 8.38 seconds of summed request time.
- Positive paragraphs have one assigned primary type. Scores for another type on those paragraphs require separate review; they are excluded from false-alarm totals.

## Earlier Experiments

`datasets/experiments/jev-history-2ebcba5.zip` preserves all 267 earlier prompt, request, answer, report, and runner files with their original bytes. List or read an entry directly:

```sh
unzip -Z1 datasets/experiments/jev-history-2ebcba5.zip
unzip -p datasets/experiments/jev-history-2ebcba5.zip developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout-comparison/results.json
```

`legacy/` contains the existing corpus-generation and audit helpers. Their inputs, outputs, and generated rewrites live under `datasets/experiments/`; their corpus inputs live under `datasets/corpus/`.

The earlier article inputs were snapshots of four existing behavioral fixtures. Those originals remain under `behavior/fixtures/`; the 604 independently written holdout paragraphs and their reviews remain under `datasets/holdout/semantic-thinness/`.
