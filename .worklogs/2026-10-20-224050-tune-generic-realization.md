# Tune Generic Realization

## Summary

Tuned generic realization, the next weakest development check. The selected prompt improves from 76/100 caught hits and eight false positives to 100/100 caught and zero false positives on the unchanged development set.

## Decisions

- Added `prompts/v4/` with one revised check and unchanged shared instructions. Preserved datasets, labels, earlier prompts, baseline results, and production behavior.
- Tested four revisions through the existing Jev request and validation helpers. Kept model `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, order, and classification-only execution fixed.
- Selected `r4` by development errors after reviewing changed findings and all intermediate errors. It gains 24 catches, loses zero, corrects eight false positives, and introduces zero.
- Recorded every trial prompt and raw response in one JSON. Development examples informed the revisions; holdout evaluation remains the next independent check.

## Verification

- Four trials returned 800 decisions in eight requests, with 2.686 seconds of summed API latency.
- Request reconstruction, prompt hashes, response validation, and offline rescoring verify the recorded comparisons.
- The final assembled prompt contains 527 words. Fixture3's dataset suite passes all 28 contract checks.
- Markdown formatting and staged whitespace checks pass. A fresh reviewer independently verifies the comparisons and requests development-only wording in the final summary; that qualification is applied.

## Key Files

- `prompts/v4/generic-realization.md`: selected prompt, paired with unchanged `shared.md`.
- `runners/results/semantic-thinness-v4-development-tuning.json`: four trial snapshots and selection.
- Adjacent Markdown report: measured changes, reviewed examples, and evaluation scope.
- `/tmp/20261020-223850-tune-realization.mjs`: temporary driver; `score <trial>` validates saved results without provider calls.

## Next Steps

The next weakest development check by total classification errors is unspecified change: 84/100 caught with ten false positives. Advance frozen candidates to protected holdout evaluation when requested.
