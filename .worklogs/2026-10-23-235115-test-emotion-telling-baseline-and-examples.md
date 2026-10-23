# Test Emotion-Telling Baseline And Examples

## Summary

The definition-only emotion-telling baseline catches 98/100 desired hits and produces two false positives. Preserve its completed native responses, then append the six development examples selected before inference.

## Decisions

- Keep the definition, question, true/false criteria and shared instructions unchanged for the first revision. Measure the contribution of three positive and three negative complete development demonstrations separately.
- Keep all gold labels frozen. The two missed fronted emotion tags and two false positives on wording being examined remain recorded errors.
- Retain the complete baseline at producing commit `e197ffe7`. Preserve prompt versions through Git and native request hashes, with no copied holdout material.

## Verification

- Native inference completes 200 decisions in thirteen requests, totaling 2,797.9 milliseconds of request time. Public offline validation confirms the complete saved result against the unchanged baseline inputs.
- The baseline has 329 assembled words and zero demonstrations. All six appended examples were preselected before its responses, belong to development and preserve their complete text with only hit snippets highlighted.
- Family review continues in parallel. Mixed-C and protected holdout inference remain separate unfinished stages.

## Key Files

- `prompts/v21/emotion-telling.md` contains the example-only revision.
- `runners/results/narrative-craft-v21-emotion-telling-b0-isolated-development.json` contains the complete baseline responses.
- `runners/results/narrative-craft-v21-development-tuning.json` records the baseline, exposure and remaining errors.

## Next Steps

- Commit the revision before inference, compare it on the same frozen development set, and confirm the selected prompt. Finish all other Narrative Craft datasets, prompts and mixed evaluations under the active family goal.
