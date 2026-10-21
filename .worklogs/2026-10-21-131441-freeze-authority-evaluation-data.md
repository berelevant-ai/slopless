# Freeze Authority Evaluation Data

## Summary

Independent final QA passes all four authority collections. Freeze 800 passages: 100 hits and 100 no-hits for each of two types in development and independently authored holdout.

## Decisions And Verification

- Retain all 124 mandatory cases across the four collections. Preserve 160 surplus passages and preceding wording in their linked full-pool Git archives.
- The final selected passages and labels exactly match 800 members of the audited 960-passage pools. Protected selection replay verifies the repaired holdout against `40137cd5`, including all 31 mandatory cases and complete three-pass review coverage.
- Source auditing covers 15,667 existing file pairs and 28,918,570 whole-file words. It confirms zero global ID collisions, exact or normalized duplicates, cross-split eight-word matches, and source copies; the identified near-paraphrase has been independently repaired and reviewed.
- Parent verifies all twelve final Markdown, label, and review hashes against the protected aggregate readiness artifact. The auditor returns counts and hashes while keeping holdout writing and case-level judgments outside prompt authoring.

## Key Files And Next Steps

- Collections `000023` through `000026` and their existing review records preserve the final inputs, corrections, archive links, and independent approvals.
- `datasets/README.md` indexes the two types. The accepted taxonomy inventory now identifies authority as consolidated under its frozen definitions.
- Freeze and review the measured batch-capacity repair, then run the authority baseline and bounded development revisions. Keep the holdout sealed until candidates freeze; continue to staged contrasts and boilerplate/signposting after the separate assessment.
