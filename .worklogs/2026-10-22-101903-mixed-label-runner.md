# Support Mixed Labels In The Jev Runner

## Summary

Load writing once when several checks label the same input, score each judgment independently, and add complete-target aggregate scores. Keep the existing dataset format, production rules, and historical single-check behavior.

## Decisions

- Preserve the original single-label row shape and snapshot format. Add the independent label array only when a target has multiple judgments in the selected family.
- Count all-issues-found among fully labeled positive targets; count exact matches among all fully labeled targets, including all-negative controls. Exclude incomplete labels from both aggregates while retaining their available per-check judgments.
- Recompute derived aggregate scores from validated saved predictions. Label-only rescoring preserves original inference records and appends corrected per-check and aggregate results.
- Keep all prior Fixture3 contracts. Review and approve only the four additional public-boundary contract entries after independent verification.

## Verification

- Specular lint passes; verification first fails for the missing aggregate export and four contract names, then passes after implementation.
- The public dataset contract command passes 46 checks. Fixture3's received JSON adds four passing entries and preserves all 42 previously approved entries exactly; parent reconstruction confirms that comparison.
- Fresh independent review reports no findings and recommends approving the four contract additions. Its HEAD comparison verifies 3,200 development rows, 32 snapshots, 115 generated request bodies, and 64 scores unchanged; thirty historical trials supply 31 inference records and 106 validated saved batches.
- Parent and reviewer independently run the 133 private driver probes successfully. The reviewer separately confirms the planned 200-target/600-judgment mixed denominators of 175 positive targets and 200 exact-match targets.
- Scoped ESLint, Prettier, Specular lint/verify, and diff checks pass. Provider-backed mixed inference remains a subsequent dataset-evaluation step.

## Key Files And Next Steps

- `runners/jev.mjs` contains mixed target loading, check-specific scoring, aggregate scoring, and cache/rescore integration.
- `scripts/datasets-contract.mjs`, `runners/README.md`, and the timestamped mixed-runner Specular files document and verify those boundaries.
- Finish pilot corrections and reviews, generate the balanced isolated sets with protected holdouts, then tune development prompts and exercise mixed data with the reviewed runner.
