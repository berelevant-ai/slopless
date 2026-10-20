# Tune Actor And Metaphor Classification

## Summary

Tuned the two weakest Jev development checks on their unchanged 100-hit and 100-no-hit sets. Missing actor improves from 54 caught with 14 false positives to 88/16; unexplained metaphor improves from 62/19 to 91/13.

## Decisions

- Preserved the frozen `v2` baseline and all labels. `v3` contains only these two revised check prompts and unchanged shared instructions; the other seven checks retain their previous wording.
- Tested eight development revisions and retained every prompt and raw response in one result JSON. The selected actor prompt is trial `r6`; metaphor is `r4`.
- Selected the lowest total development errors at threshold 0.5: 28 actor errors and 22 metaphor errors, down from 60 and 57. The higher-recall metaphor alternative, 97/21, remains recorded.
- Kept all fifty remaining errors visible. The selected prompts gain 68 catches and lose five; they correct nine false positives and introduce five.
- Reserved holdout evaluation for a frozen candidate after reviewing these development tradeoffs. Production code and datasets remain unchanged.

## Verification

- The eight trials returned 2,600 decisions in 26 requests, with 9.571 seconds of summed API latency. Model `jev-1.13.0` and SDK `0.7.0` match the baseline.
- All eight trials pass offline request reconstruction, response validation, and rescoring. The four selected requests reconstruct exactly from the final combined prompt files.
- All 28 Fixture3 dataset contract checks and Markdown formatting checks pass. Assembled prompts contain 364 actor words and 348 metaphor words.
- Fresh final review verifies all trial statistics, selected request hashes, reported regression scores, corrected examples, and test evidence. Two wording corrections were applied to describe the existing metaphor test and completed freeze precisely.

## Key Files

- `prompts/v3/`: shared instructions and the two selected check prompts.
- `runners/results/semantic-thinness-v3-development-tuning.json`: all trials, scores, input hashes, and selected revisions.
- `runners/results/semantic-thinness-v3-development-tuning.md`: before/after results, all lost catches, new false positives, and the higher-recall alternative.
- `/tmp/20261020-220124-tune-development.mjs`: temporary driver using the existing request boundary; `score <trial>` verifies a saved revision without provider calls.

## Next Steps

The selected `r6`/`r4` prompts are frozen after reviewing all fifty remaining development errors. Next decide whether to advance the frozen candidate to protected holdout evaluation.
