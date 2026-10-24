# Evaluate Compressed Narrative Prompts

## Summary

Complete fourteen native development runs for seven compressed prompts. Fixed scenic metaphors meets both acceptance bounds; six checks need further changes.

## Results

- Fixed metaphors catches 98 hits with four false positives isolated and 98 with three false positives mixed. Fresh confirmation is required.
- Bodily actions scores 99/45 isolated and 100/52 mixed; perception scores 57/2 and 62/1. Compact questions naming the issue without defining it lose important boundaries.
- Empty beats scores 88/1 and 80/6; gaze scores 99/13 and 100/2. Silence scores 95/4 and 65/3; narrative cliches scores 99/2 and 97/27.
- Every cohort contains 100 desired hits and 100 desired no-hits. All fourteen saved responses pass public snapshot validation and reproduce their original summaries offline.

## Decisions

- Preserve every result and the frozen gold labels. Confirm fixed metaphors, then revise the six remaining questions to express their full scope and boundary directly in native instructions and criteria.
- Keep all demonstration bytes, the model and 0.5 cutoff unchanged during this next comparison. Give authoring roles exact development-only input lists.
- Main reviewed changed errors including purposeful voice lowering, acoustic animal cues, documented wording, generic attention and bustling scenes. These require distinctions in meaning, rather than word exceptions.

## Key Files

- Fourteen `compact1` response files and their execution records preserve the completed comparison.
- The development-tuning record includes unchanged-example scores and protected authoring scopes.

## Next Steps

- Confirm fixed metaphors on both cohorts. Review and test six `core1` prompts, then continue the nineteen-check family goal. All six paragraph-runner contracts pass; protected holdout inference remains untouched.
