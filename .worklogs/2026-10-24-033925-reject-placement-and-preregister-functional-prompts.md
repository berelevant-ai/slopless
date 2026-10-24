# Reject Placement And Preregister Functional Prompts

## Summary

Reject the four completed placement-only trials and prepare shorter bodily-action and empty-beat prompts. Perception and cliche authors separately revise their functional boundaries against development mistakes.

## Decisions

- Keep all nineteen checks in scope and preserve the 95-hit/five-false-positive bounds. Moving examples into native criteria yields no feasible common cutoff for either tested check.
- Body-action placement catches 97 hits with six false positives in isolation and 98 with thirteen in mixed passages. Empty-beat placement catches 90 with zero and 85 with ten.
- Return demonstrations to Markdown. Replace repeated instructions with a shorter functional question and use mixed negative demonstrations that preserve useful behavior beside unrelated slop.
- Retain the original three positive demonstrations and one original negative per check. Register the four additional development IDs before inference and exclude every historically exposed example from the additional score report.
- Keep protected holdout annotation review separate. A corrected registration path lets its fresh reviewer continue substantive review after a completed mechanical audit.

## Verification

- Public snapshot validation and exact score reconstruction pass for all four placement runs. Core4 assembled counts are 771 words for bodily actions and 785 for empty beats.
- Perception core4 contains 855 assembled words and preserves six demonstrations. Cliches core4 contains 730 assembled words; its preceding prompt had zero literal demonstrations, which the author preserves. The earlier instruction assuming six cliche demonstrations was incorrect.
- All six paragraph-runner contracts pass. All four GitHub workflows pass for `aa638d21`; production behavior remains unchanged.

## Key Files

- The existing tuning record preserves the failed placement trials, source hashes and new demonstration exposure.
- `prompts/v21/` contains the next development candidates; native JSON criteria retain the existing schema.

## Next Steps

- Freeze the remaining two author reports, commit the four candidates and run both complete development collections for every candidate.
- Review all errors and resolve separately reported label concerns by the frozen definitions before changing any judgment. Preserve prior writing and results.
