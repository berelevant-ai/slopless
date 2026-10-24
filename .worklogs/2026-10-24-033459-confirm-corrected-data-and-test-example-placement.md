# Confirm Corrected Data And Test Example Placement

## Summary

Preserve fourteen complete native development runs and restore four neighboring checks' confirmed status on corrected mixed data. Bodily actions, empty beats, perception and narrative cliches remain unfinished.

## Results

- Bodily-action core3 catches 100 hits with six false positives in isolation and 99 with seventeen in mixed passages. Empty-beat core3 catches 94 with zero and 91 with twelve.
- Perception catches 95 with six false positives on corrected mixed data; narrative cliches catches 96 with seventeen. Both fail the fixed five-false-positive limit.
- Emotion-as-substance repeats 100 hits with one false positive. Timestamps repeats 99 with zero at 0.63; physical blocking repeats 100 with two; atmosphere shifts repeats 97 with zero.
- Public snapshot validation and exact score reconstruction pass for all fourteen runs. Preserve original thresholds, SDK hashes, producing commits and demonstration-excluded results in the tuning record.

## Decisions

- Fixture3 compares 2,000 old and new prediction decisions. Review changed common passages separately from the nine and two rotated passages in the corrected mixed collections; retain the previous approved baseline while development continues.
- Preregister example placement for bodily actions and empty beats. Move their unchanged six demonstrations into native true/false criteria, retaining all principles, questions, model settings, thresholds and source passages.
- The assembled prompts contain 954 and 947 words. TypeSafe's Noul and State documentation supports structured examples and native answer criteria; inference will determine whether placement improves this task.
- Protected holdout annotation review remains separate from inference and prompt authoring. A fresh protected reviewer checks nineteen proposed corrections before any source or final dataset changes.

## Key Files

- `runners/results/narrative-craft-v21-development-tuning.json` records all fourteen runs, repeat confirmations, paired Fixture3 changes and placement preregistration.
- `prompts/v21/body-action-density.md` and `empty-beat.md` contain the controlled placement candidates.
- `.plans/2026-10-23-195843-narrative-craft-development.md` retains the complete nineteen-check scope and unchanged acceptance bounds.

## Next Steps

- Run the two placement candidates on both full development collections and preserve every result. Reviewers independently assess the prediction changes and two other unfinished prompts.
- Finish protected annotation review, preserve all original writing and repair balanced selections only after definition-based judgments are final. Keep holdout detector inference unrun.
