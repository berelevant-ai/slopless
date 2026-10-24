# Correct Professional Scope Labels

## Summary

A final blind development check identifies a professional caveat mislabeled as model leakage. Correct this boundary before any Jev inference, keeping every passage's words intact.

## Decisions

- Review 54 related candidate passages in separate development and protected holdout contexts. Judge meaningful professional limits independently of unsafe or unsupported claims elsewhere in the passage.
- Preserve model-limit hits when the supplied writing establishes model or answer-production commentary. A professional qualification, assessment request or legal brief alone does not identify a model speaker or writing commission.
- Reclassify source discussion of markers independently from adopted placeholders. Every assigned check remains independently labeled.
- Obtain fresh blind corroboration of changed cases. Resolve three development disagreements against the definition's professional-scope guard; a fresh protected adjudicator resolves the remaining holdout disagreement.
- Retain all reviewed cases and reselect balanced sets from the full archived pool. The initial freeze and audit remain historical evidence in `8c4db917`; the corrected sets require current archive and selection verification.

## Verification

- All original writing remains unchanged. Corrections affect labels and selected snippets before detector tuning.
- The boundary review covers 37 development and seventeen holdout passages. Every reviewer reads only its own split and the extracted definitions.
- Replenished pools still contain 2,416 passages and 88,600 words. Each check retains enough candidate hits and no-hits for balanced selection.

## Context

- `runners/results/generated-residue-v22-data-review.json` records the discovery, split-specific reviews, independent verification and adjudication.
- `/tmp/slopless-generated-residue-v22/pool-scope-final.json` is stored per collection; the selection helper reads those final corrected pools.

## Next Steps

- Archive corrected candidate labels, select exact 100/100 sets with hard-case retention, and verify the new selection before running Jev.
