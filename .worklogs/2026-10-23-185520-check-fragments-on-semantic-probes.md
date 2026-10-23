# Check Fragments And Redundancy

## Summary

Run the unchanged fragment-stacking and redundancy checks on the eight existing semantic probes. The user's changed paragraph receives a redundancy finding and no fragment finding; a different complete-sentence control produces a false fragment finding.

## Decisions

- Preserve all text, original labels and prompts. Use a temporary fragment-specific no-hit view of the same eight texts because the public runner requires the selected check to have an assigned group.
- Keep the pinned model, threshold, batch size and classification-only mode. One initial attempt fails before provider access; the corrected input view completes eight judgments in one request.
- Run frozen `v16/redundancy` on the same eight texts using its own provisional judgments. Repeated meaning is positive in six inputs; distinct practical information is negative in two.

## Results

- The user's first-negative variant scores `0.43` in context and `0.14` alone. Both stay below the fixed `0.5` threshold.
- Three negative paraphrases in context score `0.52`, producing a false fragment finding. All other cases remain below threshold.
- Public snapshot, request and score validation pass. The current fragment definition excludes complete clauses and commands; short complete statements retain their own subjects and verbs.
- Redundancy catches all six provisionally positive inputs and preserves the two distinct-information controls. The user's changed paragraph scores `0.88`, and its block alone scores `0.75`.
- Fresh reviewers independently verify both complete runs, identical inputs, scores and current rule definitions. Both audits report no corrections.

## Key Files

- Read the "Fragment Rule Cross-Check" in the existing context diagnostic Markdown and its paired JSON.
- `runners/results/rhythm-and-repetition-v19-fragment-context-diagnostic-development.json` preserves the native answers and inference seal.
- The adjacent `rhythm-and-repetition-v19-redundancy-context-diagnostic-development.json` preserves the independent redundancy request and answers.

## Next Steps

- Commit and push this diagnostic. Review the intended frame definition and the recorded fragment false finding before changing prompts or benchmark labels.
