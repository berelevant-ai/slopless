# Tune Hollow Significance

## Summary

Tuned hollow significance through four development revisions and evaluated the frozen selection on holdout. Development improves from 98/100 caught hits and eleven false positives to 100/100 and three; holdout improves from 91/100 and six to 98/100 and seven.

## Decisions

- Selected `r4` using the predeclared higher-recall tiebreak: `r2` and `r4` each have three development errors, while `r4` catches one more hit.
- Clarified supplied qualitative consequences, defined measurement methods, and separate checks for generic lessons, praise, atmosphere, and editorial discussion.
- Preserved development labels and recorded the remaining three false positives. The selected prompt gains two catches and corrects eight false positives, with zero lost catches or new false positives on development.
- Kept the candidate frozen on holdout. It gains eight catches and loses one, corrects zero false positives, and introduces one.
- Reported that recall improvements transfer while the development false-positive reduction does not. Holdout accuracy improves by three percentage points.
- Preserved datasets, labels, earlier prompts and results, and production source. Only aggregate holdout feedback returns to the authoring context.

## Verification

- Development used 800 decisions in eight requests; holdout used 400 decisions in four requests, with `jev-1.13.0`, SDK `0.7.0`, and threshold 0.5.
- Offline rescoring reproduces all four development trials. The selected prompt contains 650 words, including unchanged shared instructions.
- Fixture3's dataset suite passes all 28 contract checks. Markdown formatting and unchanged-source checks pass.
- Fresh review reconstructs fourteen saved requests including the original baseline, independently reproduces scores, and verifies the declared selection tiebreak.
- Manual review covers nineteen development trial error-union passages and seventeen holdout error-or-change passages, with zero label concerns. Final report and worklog review passes.
- Normalized duplicate and eight-word overlap counts are zero. Selected prompt examples share at most five consecutive words with development and three with holdout.

## Key Files

- `prompts/v7/hollow-significance.md` and unchanged `shared.md`.
- `runners/results/semantic-thinness-v7-development-tuning.{json,md}`: all trials, selection, examples, and remaining errors.
- `runners/results/semantic-thinness-v2-v7-holdout-comparison.{json,md}`: protected holdout comparison.
- `/tmp/20261020-231449-tune-significance.mjs` and `/tmp/20261020-231449-significance-holdout-comparison.mjs`: temporary adaptations of existing classification drivers.

## Next Steps

Keep `v7` frozen. The next untuned check by development error count is empty takeaway: 100/100 hits caught with nine false positives.
