# Second Semantic-thinness Holdout

## Summary

- A fresh writer generated another 100 paragraphs, IDs `holdout-101` through `holdout-200`, with 50 expected hits and 50 expected passes. The batch contains 5,236 words and preserves the first batch unchanged.
- Strengthened Claude's label audit with a blind first pass followed by an adversarial review of every author label, rationale, and independent judgment.

## Decisions

- The writer started without conversation history and reports reading only the writing instructions and its newly authored files. It received general coverage principles and avoided prior prompts, fixtures, corpora, labels, and results.
- Supplied Claude with the same 55 reference files as the first audit. Withheld author labels during its first pass, then required an explicit verdict and strongest objection for all 100 records in the second pass.
- Preserved original texts and author labels pending the user's decisions. Kept both batches out of Jev examples and tuning; made no Jev calls.

## Verification

- A separate reviewer verified counts, unique aligned IDs, exact evidence spans, ASCII text, separated labels, and the 46-59-word paragraph range.
- Both checks found zero normalized paragraph copies or shared eight-word sequences against the original 764 paragraphs, first holdout batch, and current/grounded prompts. The independent review also found no within-batch repeats.
- `paragraphs-002.json` SHA-256: `05a23a5e98b63c89bdf445236c81c7318e088963969e38ee363803462f3a419b`.
- `labels-002.json` SHA-256: `99425538bda843b7ad17498e454420df91d9179440fe169f51d73367542e5170`.
- Both Claude passes returned complete validated coverage. The blind pass took 152.680 seconds, and the adversarial audit took 341.243 seconds; both identify `claude-fable-5-1`.
- The final audit accepts 99 author labels and recommends changing `holdout-175` from hit to pass. Four accepted records retain medium confidence on attribution boundaries: `holdout-138`, `holdout-145`, `holdout-156`, and `holdout-169`.
- Reconstructed both request hashes and confirmed the blind request excludes author labels. Verified all five report paragraphs against the source and confirmed the preserved data hashes.
- The separate reviewer found no report discrepancies and confirmed the attribution discussion is presented as Claude's interpretation. It did not reproduce the blind request hash; that reconstruction was verified by the parent process.

## Context And Next Steps

- Both new data files live in `developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout/` alongside the original batch.
- `claude-label-review-002.json` preserves both audit stages, their instructions, request/source hashes, responses, and timing.
- `claude-label-review-002.md` presents the recommended change and all four medium-confidence agreements with full context. Both batches together contain 200 paragraphs and 10,415 words.
- Present the completed audit discrepancies to the user before changing any labels. Keep the selected Jev prompt frozen.
