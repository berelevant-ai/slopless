# Tune Unspecified Relationship

## Summary

Tuned unspecified relationship through four development revisions and evaluated the frozen selection on holdout. Development keeps 99/100 caught hits while false positives fall from 21 to six; holdout improves from 89/100 caught and nine false positives to 93/100 and five.

## Decisions

- Selected `r4` by the fewest development errors before holdout access. The prompt preserves concise informative relationships while targeting missing connection or comparison content.
- Disclosed development-informed examples, including professional affiliation and equivalence for an intended purpose. Preserved labels and all recorded disagreements.
- Development gains one hit and loses one, corrects fifteen false positives, and introduces zero. The lost committee-responsibility case is documented explicitly.
- Holdout gains eight hits and loses four, corrects five false positives, and introduces one. The accuracy gain is four percentage points.
- Kept the prompt frozen during protected evaluation and returned only aggregates to the authoring context. Preserved datasets, previous prompts and results, and production source.

## Verification

- Development used 800 decisions in eight requests; holdout used 400 decisions in four requests. Model `jev-1.13.0`, SDK `0.7.0`, and threshold 0.5 stayed fixed.
- Offline rescoring reproduces the four development trials. The selected assembled prompt contains 576 words and matches recorded trial `r4`.
- Fixture3's dataset suite passes all 28 contract checks. Markdown formatting and unchanged-source checks pass.
- Fresh review reconstructs requests, reproduces scores, reviews all 24 development trial error-union passages and all 100 no-hits, and reviews 25 holdout error-or-change passages. Label concerns: zero.
- Split comparison finds zero duplicate passages or eight-word overlaps. Final example bullets share at most four consecutive normalized words with either split; development-derived categories are disclosed separately.

## Key Files

- `prompts/v6/unspecified-relationship.md` and unchanged `shared.md`.
- `runners/results/semantic-thinness-v6-development-tuning.{json,md}`: all trials, provenance, and remaining development errors.
- `runners/results/semantic-thinness-v2-v6-holdout-comparison.{json,md}`: protected holdout comparison.
- `/tmp/20261020-230516-tune-relationship.mjs` and `/tmp/20261020-230516-relationship-holdout-comparison.mjs`: temporary adaptations of existing classification drivers.

## Next Steps

Keep `v6` frozen. The next untuned check by development error count is hollow significance: 98/100 hits caught with eleven false positives.
