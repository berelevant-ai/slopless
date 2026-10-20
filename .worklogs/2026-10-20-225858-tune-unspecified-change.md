# Tune Unspecified Change

## Summary

Tuned unspecified change through four development revisions and evaluated the frozen selection on holdout. Development improves from 84/100 caught hits and ten false positives to 100/100 and six; holdout improves from 85/100 and three to 96/100 and four.

## Decisions

- Selected `r3` by the fewest development errors. The later `r4` wording missed three additional hits with the same false-positive count.
- Added only this check and unchanged shared instructions in `prompts/v5/`. Used newly worded examples while disclosing development-driven categories and all remaining errors.
- Retained four new development false positives. The sixteen added catches and eight corrected false positives give a net twenty additional correct judgments.
- Kept the candidate frozen during the separate holdout evaluation. Holdout adds twelve catches and loses one, corrects two false positives, and introduces three.
- Preserved datasets, labels, previous prompts, and production source. Returned only aggregate holdout results to the authoring context.

## Verification

- Development used 800 decisions in eight requests; holdout used 400 decisions in four requests. Both use `jev-1.13.0`, SDK `0.7.0`, and threshold 0.5.
- Reconstructed all eight development requests, validated saved responses and hashes, reproduced scores offline, and matched the selected prompt to recorded trial `r3`.
- The assembled selected prompt contains 478 words. Fixture3's dataset suite passes all 28 contract checks.
- Fresh review independently reconstructs and rescores development and holdout requests, checks 40 development passages and all 22 holdout error/changed passages, and identifies zero holdout label concerns.
- Split checks find zero duplicate passages or eight-word overlaps. Prompt examples share at most three consecutive normalized words with development and two with holdout; no copied scene is identified.
- Final report review, Markdown formatting, staged whitespace, and unchanged-source checks pass.

## Key Files

- `prompts/v5/unspecified-change.md` and unchanged `shared.md`.
- `runners/results/semantic-thinness-v5-development-tuning.{json,md}`: all revisions, selected prompt, measured changes, and remaining errors.
- `runners/results/semantic-thinness-v2-v5-holdout-comparison.{json,md}`: frozen holdout comparison.
- `/tmp/20261020-225406-tune-change.mjs` and `/tmp/20261020-225406-change-holdout-comparison.mjs`: temporary adaptations of the existing classification drivers.

## Next Steps

Keep `v5` frozen. The next untuned check by development error count is unspecified relationship: 99/100 hits caught and 21/100 false positives.
