# Audit Mixed Rule Evaluation

## Summary

Trace the current prompts, labels, scoring and reporting to distinguish overlapping detections from unnecessary warnings. Record exact-span localization as outside the current evaluation scope.

## Findings

- The runner asks every named check independently, thresholds its probability at `0.5`, and retains every positive passage/check finding. The taxonomy and prompts assign endings, openings and connector repetition separate ownership.
- Per-check scoring and mixed exact matching penalize every unexpected positive. These operations reproduce the frozen definitions; exclusive ownership adds a requirement beyond removing the defect from the writing.
- Mixed A holdout produces at least one warning on 173/175 passages containing an assessed issue, leaves two silent, and warns on 3/25 passages negative for all three checks. Development produces the same 173/175 warning coverage and seven warnings on 25 assessed negatives.
- The workbench example reports frames at `0.66` and endings at `0.94`; evaluation records a correct ending detection and an unexpected frame detection. The quoted editing example reports all three checks despite its examined-wording protection.
- The released CLI still routes through deterministic textlint rules. Jev runs in the evaluation runner; its saved outputs describe the candidate behavior for future V2 integration.
- A fresh read-only reviewer verifies all 89 native outputs and forty frozen dataset files, independently reproducing warning coverage and both concrete examples. Explicit formatting checks pass for the two documentation changes.

## Decisions

- Preserve prompts, labels and original scores while investigating the interpretation. Recording permitted overlap requires consistent definitions and judgments before another tuning round.
- Keep supplied passage boundaries as the current localization mechanism. A future exact-span mechanism has no selected approach and remains outside this task.

## Key Files

- Read `runners/jev.mjs`, especially `buildRequest`, `batchPlans`, `score` and `scoreMixed`, for inference versus scoring behavior.
- Read `prompts/v19/`, the taxonomy's shared ownership instruction and existing rhythm result files for definitions, predictions and labels.
- Read `src/cli.ts` and `package.json` for the released CLI entry point and published file list.

## Next Steps

- Discuss which overlapping checks should accept the same defective construction. Preserve useful comparison, deliberate refrain and examined-wording controls when revising the definitions and labels.
- Verify rewrite-and-rerun behavior separately when assessing whether an editing agent removes every defect. Current measurements evaluate classification.
