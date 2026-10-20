# Tune Hollow Significance

## Goal

Improve hollow-significance classification from its development baseline of 98 caught hits and eleven false positives. Compare the frozen candidate and original prompt on the separate holdout collection.

## Approach

1. Add `prompts/v7/hollow-significance.md` and unchanged shared instructions. Clarify missing practical consequences, empty measurement claims, supplied qualitative explanations, and neighboring issue types.
2. Test revisions on the unchanged 100-hit and 100-no-hit development set. Keep every tested prompt and raw response in one result JSON.
3. Review changed findings and remaining errors. Select by fewest development errors, preferring higher recall for ties, then freeze the candidate before holdout access.
4. Have a separate evaluator compare both prompts on the same holdout set and return aggregates only. Keep holdout wording and case-level feedback outside the authoring context.
5. Verify requests, hashes, scores, split overlap, and dataset contracts. Save reports and a worklog, then commit and push main.

## Decisions

- Keep `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, ordering, and classification-only execution fixed.
- Use development-informed, newly worded illustrations. Preserve all labels, datasets, previous prompts, and production code.
- A defined metric or calculation can make a measurement claim informative without a reported numerical reading. A separate explained benefit leaves an independent empty measurement claim unresolved.

## Files

- `prompts/v7/` and `prompts/README.md`.
- `runners/results/semantic-thinness-v7-development-tuning.{json,md}`.
- `runners/results/semantic-thinness-v2-v7-holdout-comparison.{json,md}` and a completion worklog.
