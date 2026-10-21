# Freeze Authority Development Candidates

## Summary

Both authority checks pass the frozen development target. Prestige padding selects revision 4 at 99 caught hits and three false positives; vague attribution selects revision 1 at 99 caught hits and four false positives.

## Decisions

- Keep all labels fixed. Resolve writer adoption separately from documentary reporting and preserve meaningful source identification, relevant qualifications, and bounded observations.
- Preserve every attempted revision. Two successive nonimprovements stop both checks; prestige also reaches the six-revision limit. Restore selected prompt contents exactly from immutable trial snapshots.
- Disclose all fourteen quoted development demonstrations, including the two prestige examples added at revision 3. Keep holdout writing and labels in protected contexts through candidate selection.

## Verification

- Ten trials retain 2,200 predictions in 22 requests with 9.061 seconds total measured request time. Independent review reproduces original inference payloads, all scores and transitions, candidate ranking, stopping decisions, and the 31-error union.
- Selected assembled prompts contain 789 and 560 words. On unquoted development examples, prestige catches 95/96 hits with three false positives; vague attribution catches 96/97 with four false positives.
- Parent validates all ten trials offline and confirms unchanged cache bytes, inode, and modification time. Formatting checks pass; the committed runner's CI workflows pass on `f23a5356`.

## Key Files And Next Steps

- `prompts/v11/` contains the selected prompts. `runners/results/unsupported-authority-v11-development-tuning.json` preserves all trials, selection, exposure, and timing metadata; the adjacent report explains changes and remaining errors.
- Run each frozen check once on its corresponding holdout with the same model, threshold, mode, and size-100 requests. Review errors in the protected context, commit the separate assessment, then begin staged contrasts automatically.
