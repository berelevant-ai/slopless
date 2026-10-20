# Tune Empty Takeaway

## Goal

Reduce empty-takeaway false positives while preserving recall. The development baseline catches 100/100 hits and flags nine of 100 no-hits.

## Approach

1. Add `prompts/v8/empty-takeaway.md` and unchanged shared instructions. Clarify actual advice versus editorial criticism, brief concrete content, and directly inferable lessons.
2. Test revisions on the unchanged development collection. Record every trial prompt and response in one tuning JSON and inspect changed findings.
3. Select by fewest development errors, preferring higher recall for ties. Freeze the candidate before loading holdout writing.
4. Have a separate evaluator compare both prompts on the same holdout collection, returning aggregates only to the authoring context.
5. Verify requests, hashes, scores, split overlap, and dataset contracts. Save reports and a worklog, then commit and push main.

## Decisions

- Keep `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, ordering, and classification-only execution fixed.
- Preserve labels, datasets, previous prompts and results, and production code. Disclose development-informed examples and retain all regressions.
- A useful point can be short, factual, or implicit. Concrete incidental details alone leave an unrelated virtue statement empty.

## Files

- `prompts/v8/` and `prompts/README.md`.
- `runners/results/semantic-thinness-v8-development-tuning.{json,md}`.
- `runners/results/semantic-thinness-v2-v8-holdout-comparison.{json,md}` and a completion worklog.
