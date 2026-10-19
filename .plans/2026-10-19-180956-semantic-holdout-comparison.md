# Semantic-thinness Holdout Comparison

## Goal

- Store all 604 reviewed paragraphs under `datasets/holdout/semantic-thinness`, grouped by existing pattern names and `superficial-analysis`.
- Measure four previously tested Jev configurations on every paragraph and explain differences by construction.

## Approach

1. Assign one primary existing pattern to each paragraph. Preserve every target, author label, rationale, evidence span, source reference, and review artifact.
2. Move the data into pattern folders with separate `paragraphs.json` and `labels.json` files. Validate the complete ID-to-record mapping against commit `90aaae9`.
3. Freeze the 681-word indirect baseline, 681-word direct baseline, 868-word direct revision, and selected 878-word direct revision from their saved requests.
4. Run `jev-1.13.0` at a fixed 0.5 threshold using identical ID-ordered batches of at most 100 paragraphs. Preserve each option's task, rulebook, and question format; replace only target IDs and prose.
5. Save requests and responses per batch under the existing experiment. Keep expected labels, pattern assignments, evidence, and audit commentary out of requests.
6. Score all four options overall and per pattern. Record every error and paired change, inspect representative failures, and report unresolved label disputes separately.
7. Have a fresh reviewer verify preservation, request blindness, frozen configurations, scoring, and the report. Commit and push the data, results, plan, and worklog.

## Decisions

- Use existing pattern names rather than new categories. Group broad-significance helper cases under `hollow-significance` and scoped boring-solution cases under `solution-boring-frame`.
- Keep one primary group per paragraph so totals remain additive. Group selection identifies the intended construction rather than the deterministic engine's current result.
- Retain all original author labels for scoring, including disputed cases. Show how the two formal proposed label changes affect the counts.
- Compare frozen options in one authorized evaluation round. Later prompt changes require fresh holdout data for independent measurement.
- Preserve separate target and label files so classification requests can consume target-only records. The SDK supplies the existing network client; the experiment script handles batching, validation, and scoring.

## Files

- Move `developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout/` to `datasets/holdout/semantic-thinness/`, then reorganize its paragraph and label files by pattern.
- Update the dataset README and current review links to describe the new arrangement and historical audit hashes.
- Add the comparison runner, immutable batch requests/responses, machine-readable scores, and a concise result report under `developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout-comparison/`.
- Keep application rules, fixtures, existing prompts, and prior experiment results unchanged.
