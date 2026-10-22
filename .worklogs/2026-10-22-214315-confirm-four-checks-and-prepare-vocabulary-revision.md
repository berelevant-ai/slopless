# Confirm Four Checks And Prepare Vocabulary Revision

## Summary

Complete corrected-cohort comparisons for four checks and their fresh confirmations. Freeze the protected balanced collections and prepare the first vocabulary revision.

## Decisions

- Retain cliche R2, borrowed jargon R1 and tortured phrasing R1 under the fixed ranking. Their final revisions increase errors; preserve their outputs as rejected attempts.
- Retain the adverb baseline. Its isolated confirmation is reused because that input and prompt are unchanged; run a fresh confirmation on corrected mixed data.
- Make vocabulary eligibility, expression ownership and distinct-word counting explicit before the final paragraph judgment. The first revision has three hit and three no-hit development demonstrations.
- Keep both protected sets at 200 passages and 100/100 per check. Source metadata links full corrected pools at `5ad88d08`; holdout inference remains gated.

## Verification

- Fresh confirmation isolated/mixed caught hits and false positives: cliche 97/7 and 100/16; borrowed jargon 97/10 and 98/9; tortured phrasing 73/1 and 68/4; adverb 98/3 and 100/0.
- Only the adverb check meets both bounds. Vocabulary R1 contains 887 assembled words; its independent prompt review is pending before inference.
- Offline comparison validates forty native files in fifty source contexts, preserving original scores separately from corrected-cohort measurements. Repeated validation contexts are separate from provider-call counts.
- `pnpm run validate` passes. Six paragraph-runner tests pass after building; initial concurrent probes raced the build's removal of `dist`, so dependent checks were rerun after compilation.

## Key Files And Next Steps

- Read the family experiment record for all candidates and the protected review record for selection constraints.
- Complete vocabulary's bounded trials and confirmation, final protected integrity checks, complete-input error reviews and the family report. Preserve every failed quality bound.
