# Concise prompt comparison

## Summary

- Ran the concise prompts against the previous frozen inputs. Semantic-thinness recovery on 238 existing rule-positive cases falls from 223 to 184; expected-clean flags fall from 18 to 13.
- The batch completed before the user's scope correction could interrupt it. Stopped further API work and limited the report to semantic thinness.

## Decisions

- Kept model `jev-1.13.0`, threshold 0.5, paragraph boundaries, context, and question wording unchanged. Replaced only the prompt text.
- Kept the concise prompt unchanged after testing. The results expose regressions to discuss before another revision.
- Saved exact requests and responses in one result file. The report distinguishes the main rule's 238 baseline-positive cases from the family's 265 hit cases.

## Verification

- All four responses returned their exact requested answer keys and bounded probabilities. Hashes validate previous inputs, prior results, current prompts, and actual requests.
- Recomputed all comparison rows from raw probabilities. The main-rule positive subset loses 41 catches and gains two; the no-hit file clears ten flags and adds five.
- Reviewed changed main-rule findings and current control flags. The report includes missed boring-solution wrappers, recovered scent and gaze cases, and new errors on literal schedules and answers.
- Independent review confirmed counts, quoted probabilities, and unchanged comparison inputs. Added its distinctions between four clear new control errors and one ambiguous flag, and between detector disagreement and a justified summary.

## Context And Next Steps

- `developer-helpers/experiments/2026-10-17-jev-paragraphs/annotated-semantic/results.json` contains raw evidence and comparisons.
- `review.md` beside it explains the main-rule results and execution scope.
- Revise the compact decision boundary against a small balanced sample before requesting another broad comparison.
