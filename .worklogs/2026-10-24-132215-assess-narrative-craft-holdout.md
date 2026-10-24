# Assess Narrative Craft Holdout

## Summary

The first frozen holdout assessment achieves 97.2% precision and 97.6% recall across 7,800 Narrative Craft judgments. Twelve of nineteen checks pass every assigned collection; mixed perception and empty beats have the largest precision failures.

## Results

- Catch 3,808/3,900 positives with 111 false positives among 3,900 no-hits. All forty native files validate; the separate rhythm comparator catches 100 hits with four false positives.
- Thirty of 39 Narrative Craft combinations meet the fixed 95/100-hit and five-false-positive limits. Seven checks fail at least one collection.
- Mixed perception catches 92 hits with twelve false positives; mixed empty beats catches 99 with eleven. The other failures involve abstract personification, body-emotion shorthand, atmosphere shifts, empty scene states and fixed scene metaphors.
- Mixed passages have every expected issue found in 1,154/1,200 affected passages and every assessed label correct in 1,307/1,400 passages. Combining predictions applies each check's own cutoff independently.

## Review

- Two independent reviewers read all 203 recorded Narrative Craft errors. They support 179 original labels and dispute 24; those opinions remain separate from the frozen primary scores.
- Confirmed false positives include surveying a stairwell before unloading furniture and waiting for a caller to enter digits. A missed generic kitchen glance demonstrates the opposite error beside unrelated concrete detail.
- Manual highlights identify the relevant wording for review. The model outputs remain passage-level decisions; no span capability is added.
- Independent numeric verification reproduces all scores, errors and mixed results. Installed SDK manifest and entry bytes match all forty execution receipts; scope clarifications retain the original read logs.

## Decisions

- Preserve the first assessment in commit `5359504a` and every native response. The completed report appends review material while its primary counts, cohorts and error records stay byte-equivalent after structured projection.
- Keep prompts, cutoffs and all dataset judgments unchanged. Further tuning influenced by this assessment requires fresh independent holdout data.
- Keep production behavior and unrelated term-policy work unchanged. This task assesses the decision-model prototype.

## Context

- `runners/results/narrative-craft-v21-holdout.md` contains readable per-check counts and representative errors.
- Its paired JSON contains native paths, frozen settings, all error records, independent numeric verification and per-case reviewer judgments.
- The existing Narrative Craft plan and accepted taxonomy now record the holdout result.

## Verification

- Public snapshot, request, seal and scoring checks pass for all forty outputs. Dataset Fixture3 matches and all six paragraph-runner tests pass.
- Final report review verifies all three examples, 203 review keys and 244 supplied snippets against source. Its corrections clarify per-check false positives, describe the observed error pattern, name saved inference hashes and fix singular count grammar.
- Final delivery checks the exact pushed commit's CI before reporting completion. No release or local reinstall is part of this assessment.
