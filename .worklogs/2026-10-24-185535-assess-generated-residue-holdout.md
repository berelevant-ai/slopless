# Assess Generated Residue Holdout

## Summary

The user authorizes holdout evaluation of the completed Generated Residue family. Freeze the selected prompts, cutoffs and input hashes before inference, then assess every isolated and mixed collection.

## Decisions

- Evaluate artifacts and disclaimers at `0.5`, wrappers at `0.55`, and the frozen `v13` framing comparator at `0.5`.
- Run nine jobs across five collections: 1,000 passages, 1,600 residue judgments and 200 comparator judgments.
- Preserve Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode and batch size sixteen. Keep prompts and labels unchanged throughout assessment.
- Review errors after frozen scoring and verify independent mixed joins. Future tuning requires fresh holdout data.

## Context

- `runners/results/generated-residue-v22-holdout.json` records authorization, candidate commit, input hashes and all run arguments.
- `runners/results/generated-residue-v22-development-tuning.json` identifies the frozen selections and development comparisons.

## Next Steps

- Review the recorded wrapper-label boundaries before any new tuning round. A revised candidate requires fresh holdout material.

## Results

- All nine jobs complete with unchanged registered inputs and prompts. Residue catches 776/800 positives with 28 false positives among 800 no-hits.
- Artifacts and disclaimers pass every assigned collection. Wrappers pass isolation and fail both mixtures, reaching seventeen mixed-A and seven mixed-B false positives.
- Mixed exact matches are 170/200 in each collection. Every expected issue is found in 161/172 mixed-A and 155/175 mixed-B affected passages.
- Manual review covers all 52 residue errors and eighteen comparator errors. Opposite wrapper labels for similar insertion slots and draft/source-gap constructions remain recorded for later definition review.
- Fresh independent review verifies nine complete native results, 117 request hashes, SDK receipts, mixed joins and both reported label conflicts. Dataset Fixture3 matches; prompts, data and public runners remain unchanged.
