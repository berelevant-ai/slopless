# Preregister Narrative Craft Holdout

## Summary

The user authorizes the first frozen holdout assessment for all nineteen Narrative Craft checks. Preserve the completed development version while measuring transfer to the separately generated holdout passages.

## Decisions

- Evaluate 39 Narrative Craft check/collection combinations: 7,800 judgments on 5,200 distinct passages. Run the existing rhythm comparator on its 200 mixed-G passages and report it separately.
- Preserve all prompts, datasets, labels, development-selected cutoffs, Jev 1.13.0, SDK 0.7.0, classification-only mode and batch size sixteen.
- Keep original 95/100-hit and five-false-positive bounds. Review observed errors and possible label disagreements without altering the first assessment.
- Preserve unrelated term-policy changes in the shared worktree. Production integration and release remain separate from this assessment.

## Context

- The existing Narrative Craft plan now records the authorized holdout protocol.
- `runners/results/narrative-craft-v21-development-tuning.json` contains frozen cutoffs and exact development confirmation paths.
- `runners/jev.mjs` supplies the existing public inference, validation and scoring functions.

## Next Steps

- Freeze input hashes, execute the complete holdout run and compare every check with development confirmation.
- Review the errors, obtain independent verification, and report aggregate precision/recall plus the weakest individual checks.
