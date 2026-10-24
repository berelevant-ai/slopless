# Clarify Character Behavior Boundaries

## Summary

Silence passes fresh calibration confirmation at 0.39, bringing the development checkpoint to fifteen checks pending independent verification. Prepare two further scope corrections for unfinished bodily actions and empty beats.

## Decisions

- Keep silence at its preregistered cutoff: fresh results catch 100/100 hits in both cohorts, with two isolated false positives and one mixed false positive. Preserve the earlier failed 0.5 confirmation.
- Empty beats must identify a character's pause or response before judging its purpose. Remove atmospheric-description eligibility introduced by the preceding candidate.
- Bodily actions must identify an embodied cue; an abstract entity acting in a scene creates none merely by mentioning a person or body part. Keep plausible generic reaction tags eligible while preserving particular physical and interpersonal functions.
- Test both `core2` candidates on unchanged development data at 0.5. Demonstration blocks remain byte-identical; assembled prompts contain 831 and 885 words.

## Key Files

- Two `core1-cal1-confirmation` results preserve fresh silence responses.
- `prompts/v21/body-action-density.md` and `empty-beat.md` contain the scoped candidates.
- The existing family plan specifies these corrections and independent label adjudication.

## Next Steps

- Run four preregistered jobs and review paired changes. Finish the fifteen-check audit, then continue all four unfinished checks and resolve dataset disagreements without changing judgments to improve detector scores.
