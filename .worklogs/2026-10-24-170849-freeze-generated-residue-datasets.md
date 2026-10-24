# Freeze Generated Residue Datasets

## Summary

Freeze ten balanced collections with 2,000 passages and 3,600 judgments before prompt tuning. Each assigned check/collection has exactly 100 hits and 100 no-hits.

## Decisions

- Retain all 317 mandatory pilot and hard cases. Reviewed archive `aca5790c4f21692e0e53104ddf74beca3ec37348` preserves every one of the 416 surplus passages.
- Preserve one mixed holdout's unequal combination counts to retain required cases while maintaining all three exact 100/100 margins. The other mixed collections retain 25 passages per combination.
- Keep reviewed snippets selected by independent reviewers. Curator support verifies changed writing and boolean judgments; exact source text and matching reviewer output verify snippet-only changes.

## Verification

- Independent audit verifies all counts, archive equivalence, mandatory retention, thirty whole-pool reviews, three replenishment reviews and 47 corrected-case follow-ups.
- Fresh full-reference copy replay matches the selected screen: 658,073,000 comparisons, 139 within-development pairs and zero exact, cross-split or prior matches.
- Global reader validation passes for 15,783 documents and 56,253 labels. Dataset Fixture3 matches, and all six paragraph-runner tests pass.
- Initial dependent tests started while the build temporarily removed `dist` and failed on missing compiled imports. Rerunning after the successful build passes both suites; source changes were unnecessary.
- Save the independent audit with its stated read-trace limits. The historical three-reference count increase remains unidentified; fresh replay independently verifies the current complete reference set.

## Context

- `runners/results/generated-residue-v22-data-audit.json` contains independent performed checks and input hashes.
- `runners/results/generated-residue-v22-data-review.json` contains protected holdout review material; prompt authors use aggregate projections only.
- The current deterministic CLI baseline runs the same 1,000 development passages as separate files. Its named-check summary catches 113/800 positives and flags zero of 800 no-hits.

## Next Steps

- Author `prompts/v22/shared.md` and three concise native questions using development examples only.
- Run and tune all eight residue check/collection combinations, report the frozen signposting comparator separately, and confirm selected candidates in fresh inference.
