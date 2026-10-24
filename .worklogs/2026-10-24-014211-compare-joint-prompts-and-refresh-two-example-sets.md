# Compare Joint Prompts And Refresh Two Example Sets

## Summary

Complete eighteen joint-candidate runs on unchanged isolated and mixed development data. Two checks meet both bounds; the other seven retain measurable failures. Refresh examples for timestamps and perception as a separate controlled experiment.

## Decisions

- Preserve every joint result, including regressions. Keep definitions, labels, model, threshold and batch size fixed.
- Keep timestamp and perception question prefixes byte-identical for b4. Replace only their three hit and three no-hit demonstrations with branch-varied isolated development passages.
- Require two never-misclassified examples per class in each new selection. Exclude the union of twelve exposed demonstrations when comparing earlier and new candidates, leaving 188 common targets.

## Verification

- Sensory substitution joint1 scores 100 caught/four false positives isolated and 100/1 mixed. Emotional weather scores 96/2 isolated and 98/0 mixed; both await fresh confirmation.
- Remaining isolated/mixed scores are personification 97/14 and 96/8; bodily actions 95/4 and 99/9; empty beats 89/1 and 94/12; gaze 99/7 and 100/1.
- Narrative cliches scores 99/2 isolated and 100/27 mixed; fixed metaphors 91/2 and 84/1; silence 92/0 and 91/3. These revisions remain unfinished under the fixed bounds.
- Main verifies all twelve new demonstration passages against the frozen development text and labels. Both prefixes are byte-identical; each selection has four never-misclassified controls and at most one error example per class.
- Assembled timestamp and perception prompts remain below 1,000 words. Their new demonstrations are saved in Git before b4 inference.
- Commit `8dfe8f48` passes all four GitHub workflows. Production code and protected holdout inference remain unchanged.

## Key Files

- Eighteen `joint1` result files preserve complete native responses.
- `prompts/v21/fake-timestamps.md` and `perception-verb-density.md` contain the example-only candidates.
- The development-tuning record stores the old and new demonstration IDs, exposure union and trial counts.

## Next Steps

- Test b4 on both development cohorts and score the common 188 targets separately. Confirm both passing joint candidates, then continue the failed checks using their complete recorded errors.
