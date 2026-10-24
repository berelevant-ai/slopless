# Approve Reviewed Narrative Predictions

## Summary

The final dataset audit passes 122,717 assertions and the reviewed prediction snapshot passes Fixture3 after approval. Updated documentation describes the full nineteen-check family and explicitly protects holdout review material.

## Decisions

- Approve the ten-collection comparison within the fixed 95/5 bounds: 45 errors are corrected and eighteen introduced errors remain recorded. Keep two disputed corrected pause hits in the primary count and a stricter 43-correction sensitivity count.
- Keep all 44 added and 44 removed memberships separate from the 63 changed common predictions. All nineteen newly added no-hits remain scored; archived source writing preserves the thirty removed no-hit judgments.
- Preserve every correctness label, known error and original approved snapshot. All 161 previously reviewed error passage/check pairs remain in their current datasets after balancing.
- The data auditor independently verifies all 52 pairs, all source archives, selection quotas, offsets and snippets. Seven initial verifier assumptions are corrected without changing the datasets.

## Verification

- `fixture3 approve --manifest /tmp/slopless-narrative-v21-full/label-repair.fixture3.yaml --suite narrative-label-repair` records reviewed acceptance; the subsequent check matches.
- Original approved SHA-256 is `55036eafb8647ebd65de6497047ce2c29a431b8d76a83ba3b528d2d62ea0b87a`. The approved current snapshot is `1f81560fdc0a0d52037e113dd64b965414efda443c42c611a8883ad0b336f11e`.
- The current Fixture3 review records the ten native source paths and their hashes. Its native files reconstruct each `{check,id,hit}` prediction using the saved probability and snapshot threshold, sorted by check and ID.
- The documented offline Narrative Craft command validates 200 development passages without provider requests. Global dataset validation, the dataset Fixture3 contract and six paragraph-runner tests already pass.

## Context

- `runners/results/narrative-craft-v21-current-final-data-audit.json` records the full current-data proof.
- `runners/results/narrative-craft-v21-current-fixture3-review.json` preserves all current prediction differences and known errors.
- The existing execution plan, dataset guide, prompt guide and runner guide now describe the current scope instead of the initial body-emotion batch.

## Next Steps

- Complete the independent current-development audit, resolve verified objections and record final delivery CI. Keep protected model inference and production integration in their separate stages.
