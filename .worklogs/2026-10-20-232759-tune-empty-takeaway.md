# Tune Empty Takeaway

## Summary

Tuned empty takeaway through two development revisions and evaluated the frozen candidate on holdout. Both sets retain 100/100 caught hits; false positives fall from nine to one on development and thirteen to eleven on holdout.

## Decisions

- Selected `r2` by development errors and stopped with the remaining editorial-discussion false positive intact.
- Clarified criticism of empty advice, short concrete answers, and directly inferable lessons while retaining generic-virtue detection.
- Disclosed development-informed examples for wording discussion, script evasion, and a concrete contrast that supplies a lesson.
- Development corrects eight false positives and introduces zero. Holdout corrects four and introduces two, with zero caught-hit changes in either set.
- Reported the limited transfer: accuracy gains four percentage points on development and one point on holdout. The final development-to-holdout gap is five points.
- Kept the prompt frozen during evaluation and returned only aggregate holdout feedback to the authoring context. Preserved all labels, datasets, previous results, and production source.

## Verification

- Development used 400 decisions in four requests; holdout used 400 decisions in four requests. Model `jev-1.13.0`, SDK `0.7.0`, and threshold 0.5 stayed fixed.
- Offline rescoring reproduces both development trials. The selected assembled prompt contains 561 words and matches trial `r2`.
- Fixture3's dataset suite passes all 28 contract checks. Markdown formatting and unchanged-source checks pass.
- Fresh review reconstructs ten saved requests including the baseline, independently reproduces scores, and verifies both reports and the worklog.
- Review covers ten development trial error-union passages and fifteen holdout changed/error passages, with zero label concerns. The disclosed development analogues are confirmed.
- Exact and normalized duplicate counts and eight-word overlaps are zero. Final examples share at most four consecutive normalized words with development and three with holdout.

## Key Files

- `prompts/v8/empty-takeaway.md` and unchanged `shared.md`.
- `runners/results/semantic-thinness-v8-development-tuning.{json,md}`: both revisions, selection, and remaining error.
- `runners/results/semantic-thinness-v2-v8-holdout-comparison.{json,md}`: protected holdout comparison.
- `/tmp/20261020-232243-tune-takeaway.mjs` and `/tmp/20261020-232243-takeaway-holdout-comparison.mjs`: temporary adaptations of existing classification drivers.

## Next Steps

Keep `v8` frozen. The next untuned check by development error count is unspecified scope: 99/100 hits caught with seven false positives.
