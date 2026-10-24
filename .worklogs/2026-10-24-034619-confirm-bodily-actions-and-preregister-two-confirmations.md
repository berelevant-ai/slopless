# Confirm Bodily Actions And Preregister Two Confirmations

## Summary

Bodily actions completes development confirmation at its preregistered 0.56 cutoff. Empty beats passes both collections at 0.5; cliches passes saved-score calibration at 0.60, with fresh confirmations next.

## Results

- Fresh bodily-action inference catches 98/100 hits with four false positives in isolation and 99/100 with two in mixed passages. The family now has sixteen confirmed checks.
- Empty-beat core5 catches 96/100 hits in both collections, with three isolated and four mixed false positives. Its unchanged 0.5 cutoff has a common feasible range from 0.46 through 0.53.
- Cliche core5 catches all 100 hits in both collections at 0.5, with two and twelve false positives. Its common feasible range is 0.57 through 0.64; preregister midpoint 0.60 before fresh inference.
- At 0.60, immutable cliche predictions score 99 hits/zero false positives isolated and 98/three mixed. Preserve both original 0.5 results and the separately rescored counts.

## Decisions

- Confirm empty beats at 0.5 and cliches at 0.60 without changing their prompt or data.
- Test perception demonstration selection separately. Keep its question, criteria and principle unchanged; replace two strong task-oriented negatives with an explicit sensory observation and an implicit scene survey.
- Retain all three perception hit demonstrations and the quoted-wording negative. Register the two additional development IDs and exclude every exposed example from the additional score report.
- Keep three definition-based perception-label questions separate from model tuning. Preserve both blind reviews and the second reviewer's subsequent rationale correction; final independent adjudication remains open.

## Key Files

- The existing tuning record stores the six new native runs, cutoff selection and next demonstration trial.
- `prompts/v21/perception-verb-density.md` contains the demonstration-only revision; other selected prompts remain unchanged.

## Next Steps

- Run the four fresh confirmation jobs and both perception development collections. Preserve failed candidates, all raw probabilities and exact input hashes.
- Complete the independent development report review and protected holdout annotation review before claiming full family completion.
