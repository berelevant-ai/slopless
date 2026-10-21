# Archive Staged-Opposition Development Pool

## Summary

Archived the complete independently reviewed development pool before balancing or classifier inference. Its 240 passages contain 106 hits and 134 no-hits under the frozen staged-opposition definition.

## Decisions

- Preserve all writing, original author judgments, and three-role Opus votes. Final labels differ from fourteen initial author labels after reconciliation and independent review.
- Retain all 27 mandatory hard cases during selection: seven hits and twenty no-hits. Select the remaining slots using the frozen length allocation and deterministic hash order.
- Keep the holdout pool in its separate protected review process. This archive includes development files only.

## Verification

- Nine fresh Opus sessions provide 720 judgments over every current passage. Independent QA reads all 240 passages, canonical labels, snippets, adjudications, and raw-review provenance.
- QA corrects nine judgments relative to the first reconciled pool and verifies zero unresolved material concerns. Fourteen final labels differ from initial author labels; the review record preserves both stages.
- Parent validates schema, ranges, checksums, 106/134 class counts, and the three file hashes against the independent handoff. Writing remains unchanged throughout label reconciliation.

## Key Files And Next Steps

- `datasets/ai-synthetic/passages/000027-staged-contrasts-staged-opposition-development.md` and its paired labels retain the full pool. `runners/results/staged-opposition-development-opus-review.json` records provenance and independent QA.
- Freeze the balanced 100/100 development subset after this archive, verify conservation independently, finish protected holdout QA and cross-source overlap checks, then begin development-only Jev tuning.
