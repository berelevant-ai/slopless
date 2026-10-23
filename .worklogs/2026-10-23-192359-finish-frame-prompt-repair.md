# Finish Frame Prompt Repair

## Summary

Complete the bounded repair attempt and retain unchanged `v19`. Both revised prompts worsen development accuracy; the report preserves every attempted prompt and result.

## Decisions

- Keep baseline's 78 errors over candidate one's 96 and candidate two's 88. One fresh baseline confirmation records 77 errors; mixed A still has 61/100 false findings against frozen labels.
- Keep all judgments unchanged. The independent review reads all 133 erroneous or changed passages and disputes two no-hit labels, which every tested prompt flags; changing them would preserve candidate ranking.
- Correct the earlier worklog's net-loss wording: candidate one loses 32 baseline positives and gains one. Record that 27 losses are adjacent takeaway pairs and that candidate two restores all 32.
- Remove rejected authoring files while retaining exact bodies in the experiment record and producing commits. Preserve the existing runner, threshold, model and production behavior for this task.

## Verification

- Independently verify 14 native outputs, frozen inputs, prompt commits, request records, scores and demonstration exclusions: 2,440 judgments in 159 requests.
- `pnpm run validate` passes, including build, lint, formatting, spelling and 100% type coverage. All six paragraph-runner tests pass, and Fixture3's dataset suite matches its approved output.
- Preserve initial verification failures separately. Initial Fixture3 attempts exit 2 without results, and the paragraph suite encounters a missing compiled module during a concurrent build; completed retries pass after build.
- Holdout inference remains unused in this repair. Preserve unrelated term-policy changes in the working tree.

## Key Files

- Read `runners/results/sentence-frame-v20-development-repair.md` for scores, changed detections, interpretation disputes and retained failures.
- Read the adjacent JSON for exact candidate prompts, native outputs, independent review notes and verification summaries.
- Read `.plans/2026-10-23-190656-repair-frame-prompt.md` for the frozen stopping and selection rules; `prompts/v19/sentence-frame-repetition.md` remains active.

## Next Steps

- Complete the final report recheck, commit and push these records, and verify remote CI. This repair leaves the frame false-finding problem unresolved; further experimentation needs a separately chosen approach.
