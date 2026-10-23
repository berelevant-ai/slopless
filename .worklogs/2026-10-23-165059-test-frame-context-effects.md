# Test Frame Context Effects

## Summary

Test eight known development false positives with four controlled inputs each. Added ending sequences change the frame judgment while useful comparison text stays fixed.

## Decisions

- Use the selected frame prompt and frozen model settings unchanged. Keep holdout writing outside this diagnostic and preserve all benchmark labels and source text.
- Select six ending-only errors and two transition-only errors before inference. Test original text, removal of the other block, that block alone and a reworded block within the original context.
- Treat the 32 inputs as targeted diagnosis of known errors. Retain source IDs and exact edit recipes with the native response so the temporary execution view can be reconstructed.

## Results

- One native run completes 32 judgments in two requests. All eight originals trigger; removing the other block leaves one finding; the blocks alone trigger five findings; changing their wording leaves seven findings.
- All six ending cases stop triggering after block removal. Five of their six isolated ending blocks trigger the frame check; five retain a frame finding after their ending words change.
- The locker comparison scores `0.21` alone, `0.69` with its original generic ending block, `0.69` for that block alone, and `0.64` with a reworded generic block.
- These answers fail the current frame definition's actual-word and position requirements. The response to reworded generic claims supports a broader repetition judgment as the explanation to investigate.
- A fresh read-only audit verifies exact inputs, frozen hashes, native requests, offline scores and the provisional expectations. It prioritizes receipt routes and parser compatibility for human review of useful repeated wording.

## Key Files

- Read `runners/results/rhythm-and-repetition-v19-sentence-frame-context-diagnostic.md` for every complete input and its probability.
- Its paired JSON preserves source IDs, exact block edits, frozen hashes and scores. The adjacent native `*-development.json` preserves provider responses and its inference seal.

## Next Steps

- Commit and push this diagnosis. Review the paired inputs with the user before changing the check definition or no-hit labels.
