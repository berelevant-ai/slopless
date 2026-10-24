# Compare Narrative Examples And Complete Baselines

## Summary

Complete isolated development baselines for all nineteen Narrative Craft checks, including the two previously tested checks. Compare example-only revisions for fifteen checks and prepare example-only revisions for the final two.

## Decisions

- Preserve every baseline and example-only result. Keep known misses and false positives in the frozen labels while tuning the prompts.
- Review question wording separately for personification, material emotions, bodily actions, low-information beats, emotional weather, timestamps, gaze and perception. Their example-only revisions still exceed at least one fixed quality bound.
- Keep the six preselected demonstrations unchanged during that next revision. Three example-only regressions remain visible: gaze false positives, timestamp false positives and narrative-cliche misses.

## Verification

- All fifteen example-only runs complete successfully on the same 3,000 judgments, using SDK 0.7.0 with recorded module hashes.
- Empty beats improve from 70/0 to 96/1 caught hits/false positives. Scene state improves from 90/1 to 96/2; physical blocking improves from 92/3 to 96/3.
- Atmosphere shifts reach 100/3, sensory substitution 96/5 and summary transitions 99/1. Each class has exactly 100 examples.
- Personification remains 99/35, so examples alone fail to resolve its distinction between generic personification and informative causal descriptions.
- The final two baselines complete: fixed metaphor frames score 95/11; silence as actor scores 97/3. Both use corrected data frozen before inference.
- Fixture3's dataset suite matches its approved output. All six paragraph-runner contract tests pass.

## Key Files

- Seventeen `b0` and fifteen `b1` result files preserve complete native responses.
- `runners/results/narrative-craft-v21-development-tuning.json` records each candidate and its frozen execution settings.
- The two final prompt files now include their preselected development demonstrations.

## Next Steps

- Test the final two example-only candidates, compare principled revisions for the eight failing checks, and complete every applicable mixed evaluation and fresh confirmation. Continue the full-family goal until all checks meet the fixed bounds.
