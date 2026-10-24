# Test Seven Compressed Narrative Prompts

## Summary

Prepare a controlled compression comparison for the seven unfinished Narrative Craft checks. Keep the twelve confirmed checks unchanged.

## Decisions

- Shorten repeated procedural wording while preserving each frozen issue definition and existing demonstrations. Assess isolated and mixed development at the unchanged 0.5 cutoff.
- Preserve prior candidates and their failures. New results use the distinct `compact1` revision and require both development cohorts before selection.

## Verification

- Main reviewed all seven diffs and the three authoring reports. Existing demonstration blocks are byte-identical to HEAD.
- Public prompt assembly measures 636 words for bodily actions, 637 for perception, 644 for empty beats, 647 for gaze, 689 for silence, 647 for fixed metaphors and 296 for narrative cliches.
- Frozen datasets, shared instructions and protected holdout inference remain unchanged. Candidate inference follows this commit.

## Key Files

- Seven unfinished prompt files under `prompts/v21/` contain the candidates.
- `runners/results/narrative-craft-v21-development-tuning.json` preserves authoring scopes and preregistration.

## Next Steps

- Run fourteen development jobs, compare their complete errors with prior results, and confirm candidates that meet both acceptance bounds. Continue all remaining checks toward the nineteen-check family goal.
