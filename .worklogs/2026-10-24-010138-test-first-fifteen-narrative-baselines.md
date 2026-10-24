# Test First Fifteen Narrative Baselines

## Summary

Complete definition-only Jev testing for fifteen more Narrative Craft checks on 3,000 isolated development judgments. Append only the six preselected complete development examples to each prompt for the next controlled comparison.

## Decisions

- Keep definitions, labels, model, threshold, SDK and shared instructions fixed. Measure example-only changes before rewriting question criteria.
- Record every response, producing commit, request seal and loaded SDK hash. Preserve the pre-inference demonstration selection at `82d30939`.
- Finish the four independently supported annotation corrections before testing the final two new prompts. Their balanced selections retain all six earlier demonstration choices unchanged.

## Verification

- All fifteen runs exit successfully, each completing 200 judgments in thirteen requests. Each records SDK 0.7.0 and unchanged loaded module hashes.
- Baseline caught-hit/false-positive counts are: personification 99/35; body actions 83/4; emotion substance 96/15; atmosphere shifts 99/4; empty beats 70/0.
- Remaining counts are: emotional weather 89/8; scene state 90/1; timestamps 97/8; gaze 92/4; low-information beats 70/3.
- Final counts are: physical blocking 92/3; narrative cliches 96/3; perception 86/7; sensory substitution 91/4; summary transitions 98/0. Every denominator is 100 hits and 100 no-hits.
- A fresh mechanical annotation audit passes all thirty check groups for the four corrections. All 480 source passages remain byte-identical; only the four named judgments change.
- The corrected pools were archived before reselection. Both final sets contain 100 hits and 100 no-hits, retain their preselected demonstrations and preserve prior selections in the review history.

## Key Files

- Fifteen `narrative-craft-v21-*-b0-*-development.json` results preserve baseline responses.
- `prompts/v21/` contains the example-only candidates, each within the 1,000-word assembled limit.
- The data-review and development-tuning records link source selections, demonstrations and completed runs.
- `runners/results/narrative-craft-v21-pre-inference-correction-audit.json` records independent correction verification.

## Next Steps

- Compare the example-only candidates, test the final two definition-only prompts and finish mixed data. Continue tuning all nineteen checks on isolated and mixed development inputs, then confirm each selected prompt.
