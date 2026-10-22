# Freeze Corrected Development Cohort

## Summary

Select the corrected vocabulary and mixed development collections after archiving their complete pools at `3f663d8b`. Both collections contain 200 passages with 100 hits and 100 no-hits per named check.

## Decisions

- Preserve all 83 isolated and 74 mixed required cases. Use reviewed labels, prior membership and stable IDs for selection, with zero detector-prediction input.
- Retain all 32 mixed combinations. Adjust complementary quotas to preserve corrected controls; record setting and combination allocations in the existing development-review file.
- Compare earlier prompt candidates again on this same corrected mixed cohort. Preserve original measurements as a separate cohort.

## Verification

- `node runners/datasets.mjs` validates 15,697 documents and 28,653 labels.
- `fixture3 check --suite datasets --json` matches the approved dataset contracts.
- Root text, sample IDs and labels equal both selected raw pools exactly. No writing was changed or newly generated during correction.
- Protected holdout correction review completes twelve cases with eleven blind agreements and one resolved disagreement. Its proposed corrections remain unchanged; protected selection follows separately.

## Key Files And Next Steps

- Read `runners/results/stock-wording-and-jargon-development-review.json` for corrections and selection constraints.
- Reassess saved candidates on the corrected development inputs, complete final allowed revisions and fresh confirmations, and keep holdout inference gated.
