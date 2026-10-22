# Archive Corrected Protected Vocabulary Pools

## Summary

Archive the complete corrected vocabulary holdout pools before balanced selection. Protected reviewers resolve six corrected cases, preserving every passage's writing and other checks' labels.

## Decisions

- Keep holdout writing, labels and snippets outside the prompt-authoring context. Parent integration processes files mechanically and receives aggregate review results.
- Use an independent twelve-case changed/control review before selection. Preserve all corrected cases and original required controls.
- Retain the complete 240-passage isolated and 246-passage mixed pools in this commit. The balanced selections will link this archive.

## Verification

- Fresh review resolves twelve cases with zero changes to the proposed corrected judgments and zero unresolved disputes.
- Protected selection QA reports 200 passages and 100 hits/100 no-hits per check, all 32 mixed combinations, 94 isolated required cases and 44 mixed required cases.
- Isolated selection retains 194 prior IDs; mixed selection retains all 200. New generation and capacity conflicts are both zero.

## Key Files And Next Steps

- The paired protected collections are `000050` and `000052`. Their existing holdout-review record will preserve correction and selection summaries.
- Pack the balanced selections, finalize source metadata, and verify preservation and overlap. Holdout inference requires separate user authorization.
