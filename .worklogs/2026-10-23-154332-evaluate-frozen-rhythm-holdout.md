# Evaluate Frozen Rhythm Holdout

## Summary

Run all seven selected rhythm-and-repetition prompts once on every applicable holdout collection, plus the frozen hedging comparator for mixed C. Preserve all prompts, datasets and labels.

## Decisions

- The user's explicit holdout request opens this evaluation gate. Use the selected `v19` prompts and frozen `v18` hedging comparator from development commit `a9049d68`.
- Preserve Jev `jev-1.13.0`, SDK `0.7.0`, threshold `0.5`, classification-only mode and batch size sixteen. Keep protected writing and individual judgments outside the authoring context.
- Save native responses separately from labels. Validate every input hash, request, response seal and recomputed score; join mixed C by identical passage IDs and complete-text hashes.

## Results

- Sixteen complete outputs cover 2,000 passages and 3,200 judgments in 208 requests. Seven-check totals are 1,364/1,500 hits caught and 157/1,500 no-hits flagged.
- Action cadence and formulaic lists meet the fixed limits in both isolated and mixed holdout. The other five checks retain failures.
- Frames flag 61/100 mixed-A no-hits. Word repetition catches 49/100 isolated and 57/100 mixed positives, with seven and eleven false positives.
- The frozen hedging comparator catches 81/100 with four false positives on mixed C. Three-check exact matches are 113/200 in A, 180/200 in B and 120/200 in C.
- A fresh read-only audit approves the saved evaluation. It independently verifies the native requests, scores, mixed joins, frozen prompt hashes and all forty unchanged dataset files.

## Key Files

- `runners/results/rhythm-and-repetition-v19-holdout.json` stores aggregate scores, inputs, selected settings and native output references.
- Native `*-holdout.json` files preserve provider responses and original inference seals. The accepted taxonomy and `prompts/README.md` link this evaluation.

## Next Steps

- Commit and push the saved evaluation. Return short per-check holdout metrics.
- Keep the frozen candidate intact; further tuning requires its own decision and independent evaluation data after holdout feedback influences revisions.
