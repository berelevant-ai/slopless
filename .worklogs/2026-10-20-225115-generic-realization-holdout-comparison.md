# Generic Realization Holdout Comparison

## Summary

Compared the original `v2` and frozen `v4` generic-realization prompts on the same 200 holdout passages in a separate evaluation context. Caught hits improve from 76/100 to 99/100; false positives fall from seven to two.

## Decisions

- Kept prompts, source datasets, labels, model, threshold, and execution settings fixed. Reused the existing holdout comparison driver and public request helpers.
- Returned aggregate evaluation results to the prompt-authoring context, preserving the separation from holdout writing and case-level feedback.
- Recorded the regression alongside improvements: 24 newly caught hits, one lost catch, six corrected false positives, and one new false positive.
- Measured the new prompt's accuracy at 98.5% on holdout versus 100% on development. The observed gap is 1.5 percentage points.

## Verification

- Four requests returned 400 classification decisions using `jev-1.13.0`, SDK `0.7.0`, and threshold 0.5.
- The new prompt matches selected development trial `r4`; original `v2` matches its baseline.
- The separate evaluator reconstructs requests, independently rescores responses, and manually reviews all 33 disagreement passages, identifying zero label concerns.
- Cross-split checks find zero duplicate passages and zero eight-word consecutive overlaps. Prompt example bullets have zero eight-word overlaps with holdout; their maximum holdout overlap is three words.
- Fixture3's dataset suite passes all 28 contract checks. Source datasets, earlier results, and production code remain unchanged.
- Fresh final review verifies the report's claims; Markdown formatting and staged whitespace checks pass.

## Key Files

- `runners/results/semantic-thinness-v2-v4-holdout-comparison.json`: frozen inputs, raw responses, scores, and changes.
- Adjacent Markdown report: aggregate comparison and development-to-holdout difference.
- `/tmp/20261020-224825-realization-holdout-comparison.mjs`: temporary comparison driver; `score` revalidates saved responses without provider calls.

## Next Steps

Keep `v4` frozen after this comparison. Continue development tuning on the next named issue type; use fresh holdout material for any revision informed by case-level holdout feedback.
