# Semantic-Thinness Classification Baseline

## Goal

Measure Jev classification for all nine semantic-thinness types on the balanced development sets. Report caught hits and false positives out of 100 for each type.

## Approach

1. Keep the existing shared and generic-realization prompts unchanged. Create `prompts/v2/` with those files and eight concise prompts from the accepted taxonomy, with marked positive examples and concrete controls.
2. Reuse the existing dataset reader, Jev request builder, response validator, pinned SDK, model `jev-1.13.0`, and threshold 0.5. A temporary evaluation driver runs only paragraph classification and saves one result file under `runners/results/`.
3. Evaluate each type only on its matching development pair: 200 judgments per type, 1,800 in total. Freeze prompts before inference; keep labels out of requests.
4. Review development errors by type, save a concise report, and independently verify requests, scoring, and claims. Preserve the first run as the baseline before tuning.
5. Validate affected prompts and datasets, record the worklog, commit, and push main. Keep the protected holdout reserved for subsequent frozen-candidate evaluation.

## Decisions

- Measure classification first. The existing runner's automatic sentence-highlighting pass adds decisions unrelated to this question, so reuse its exported detection boundary directly.
- Preserve the original prompts under `v1`; the new taxonomy needs nine named check prompts. Use definition examples, with no holdout material in authoring or inference.
- Save raw typed predictions and exact prompt/input hashes so results remain auditable and can be rescored without another provider call.

## Files

- `prompts/v2/shared.md` and nine check-specific Markdown files.
- `prompts/README.md`.
- One baseline result and Markdown analysis under `runners/results/`.
- The task worklog.
