# Confirm Two Joint Checks And Preregister Calibration

## Summary

Confirm sensory substitution and emotional weather on both development cohorts. Preserve two unsuccessful example-only revisions, then preregister a separate calibration experiment using saved development probabilities.

## Decisions

- Keep all 0.5-cutoff comparisons and original native responses unchanged. The initial rounds measured prompt changes; the next round measures decision calibration with fixed prompts and labels.
- Require a feasible range at least 0.05 wide across every applicable cohort and repeat. Choose its midpoint rounded down to two decimals, favoring recall, before fresh confirmation.
- Select timestamp b4 at 0.63 from the 0.56-0.71 range and restore personification b3 at 0.58 from the 0.56-0.61 range. Keep the 95-hit/five-false-positive bounds unchanged.
- Retain the other failed checks. Saved probabilities give no working cutoff for bodily actions, perception or silence; narrow one-point intervals for other checks provide insufficient calibration margin.

## Verification

- Fresh joint confirmations score sensory substitution 100/4 isolated and 100/1 mixed; emotional weather scores 97/2 isolated and 99/0 mixed.
- Timestamp b4 at 0.5 scores 99/10 isolated and 100/1 mixed. Perception b4 scores 88/6 isolated and 89/2 mixed; replacing examples alone fails to meet the gates.
- Common-target comparison excludes twelve old/new demonstrations per check: timestamp catches 94/94 hits with nine false positives among 94 controls; perception catches 83/94 with six false positives.
- Offline calibration uses the public dataset-hash and scoring functions against saved responses. The selected timestamp cutoff scores 99/3 and 100/0; personification scores 97/2 and 95/1. Fresh inference remains required.
- The orchestrator passes its preregistered cutoff through the existing CLI parameter and records the value. Its default remains 0.5; the previous driver bytes preserve historical hash verification.

## Key Files

- Eight b4/joint-confirmation results preserve complete native responses.
- The development record stores calibration ranges, chosen cutoffs and unchanged reference results.
- The Narrative Craft plan distinguishes controlled prompt comparison from development-only calibration.

## Next Steps

- Freeze this calibration choice in Git and confirm both candidates on isolated and mixed development. Continue the remaining checks with the frozen data; keep holdout inference disabled.
