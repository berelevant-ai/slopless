# Clarify Emotion Wording Under Discussion

## Summary

The example-only emotion-telling revision catches all 100 development hits while retaining the baseline's two false positives. Add the existing protection for wording under discussion directly to the false criterion.

## Decisions

- Keep all six preselected examples, the issue definition, labels and shared instructions fixed. Generalize the false criterion to emotion wording being examined or documented, rather than adding specific witness-report phrases.
- Preserve the independent narration-versus-wording distinction already present in the shared instructions and prompt body. A quotation mark alone continues to supply no exemption.
- Replenish a mixed candidate combination that falls below quota after correct review changes. Generate new material before model evaluation rather than adjusting labels for balance.

## Verification

- Native b1 inference completes all 200 judgments in thirteen requests, with 100 hits caught and two false positives. Public offline validation confirms the saved result against its producing prompt.
- Comparing b0 and b1 identifies exactly two classification changes, both corrected misses. The two documentary-wording false positives remain unchanged.
- Review identifies twenty-four candidates in mixed-B development combination `010`, against the required twenty-five. That collection has no detector scores.

## Key Files

- `prompts/v21/emotion-telling.md` contains the clarified native false criterion.
- `runners/results/narrative-craft-v21-emotion-telling-b1-isolated-development.json` preserves complete responses.
- The family tuning record preserves producing commits, example exposure and remaining errors.

## Next Steps

- Test the clarified prompt on identical isolated development inputs, then confirm the selected revision. Finish all family reviews, replenish deficient combinations and complete mixed development testing.
