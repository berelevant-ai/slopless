# Test Frame Meaning Changes

## Summary

Test the user's exact change to the locker example: "A little foresight is bad for you." Keep the other two claims and the complete locker context fixed.

## Decisions

- Compare four blocks: the previous positive paraphrases, one reversed claim, three similar negative claims and three distinct practical statements. Evaluate each block alone and in the original context.
- Keep the frame prompt, model, threshold and benchmark labels unchanged. Freeze all eight inputs before one additional native request; use development writing only.
- Append the derived results to the existing context diagnostic and preserve the new native responses separately.

## Results

- Complete-passage probabilities are `0.64`, `0.62`, `0.69` and `0.21` respectively. The first three trigger at the fixed `0.5` threshold.
- Standalone blocks score `0.33`, `0.18`, `0.30` and `0.04`; all remain below threshold. The supplied context materially changes the answers in this example.
- Public request, snapshot, hash and score validation pass for all eight answers. No prompt tuning, holdout inference or original-label changes occur.
- A fresh read-only reviewer verifies all eight complete inputs, scores, unchanged prompts and source writing, and the report's limited conclusions. It reports no corrections.

## Key Files

- Read the "Meaning Change Follow-Up" section of `runners/results/rhythm-and-repetition-v19-sentence-frame-context-diagnostic.md` and its paired JSON for exact blocks and source/edit recipes.
- `runners/results/rhythm-and-repetition-v19-sentence-frame-semantic-diagnostic-development.json` preserves the single native response and its inference seal.

## Next Steps

- Commit and push the result. Use these complete examples for the user's review of intended frame behavior.
