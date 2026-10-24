# Freeze Corrected Data And Core3 Candidates

## Summary

Freeze the two corrected mixed development collections and two further prompt candidates before inference. Both collections retain 200 passages and exactly 100 hits and 100 no-hits per check.

## Decisions

- Retain all 160 mandatory reviewed cases across the two collections. Independent mathematics verifies `000117` combination counts of 27, 24, 24, 25, 24, 25, 25 and 26; `000123` retains uniform 25s.
- Preserve all original wording. The new selections retain 191 and 198 prior passages; the eleven rotated optional passages remain verbatim in full-pool archive `87a1accc`. All eleven corrected cases and four reviewed additions are selected.
- Keep the original hash ranking and choose quotas before detector evaluation. The selector explicitly checks mandatory retention and every 100/100 margin; quality acceptance remains 95 caught hits and at most five false positives.
- Preregister bodily-action and empty-beat core3 prompts at 0.5. Main verifies their unchanged demonstrations and public assembled counts of 957 and 950 words.

## Verification

- The selector recomputes all fifty new-family collection selections successfully, preserving unaffected frozen selections. Global dataset validation reports 15,773 documents and 52,653 labels.
- Fixture3's dataset-reader/runner contract matches and all six paragraph-runner contracts pass. These contracts test reader and runner behavior; the separate data audit verifies corpus changes.
- A temporary Fixture3 suite records 2,000 pre-inference native prediction decisions across ten cohorts and eight checks, including the best bodily-action and empty-beat baselines. Explicit labels remain the correctness reference; new predictions will be compared before approval.
- Independent data verification passes 12,522 assertions across all 52 pairs, including all 160 mandatory cases and every correction and addition. Three protected blind passes complete 1,440 holdout annotation judgments; a protected curator reconciles them without exposing individual writing or judgments to authoring.
- Store the audit acknowledgment in the tuning record, keeping provenance one-way. The final audit hash binds the unchanged data-review input bytes.

## Key Files

- The two changed dataset pairs and existing data-review record contain the corrected source provenance and selections.
- `prompts/v21/body-action-density.md` and `empty-beat.md` contain the core3 candidates.
- The tuning record stores candidate hashes, exact authoring scopes and the Fixture3 baseline.

## Next Steps

- Run the six changed check/collection combinations and four core3 jobs. Reconfirm the accepted neighboring checks on the changed inputs.
- Review Fixture3 prediction diffs against corrected labels. Complete protected holdout label review without detector inference or exposure to prompt authors.
- Continue all four unfinished checks until the full nineteen-check objective passes its unchanged quality bounds.
