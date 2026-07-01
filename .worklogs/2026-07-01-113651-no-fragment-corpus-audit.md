Summary:
Added the missing real-corpus audit correction for the no-fragment pair detector. The detector now rejects identical adjacent no-fragment pairs, which removes table-style artifacts while keeping varied rhetorical pairs.

Decisions made:
- Kept the `No X. No Y.` detector in `fragment-stack-detector.ts` because it belongs with existing fragment stacking logic.
- Rejected identical adjacent no-fragment pairs such as `No change. No change.` because the real corpus showed those came from MDN table/status artifacts, not prose slop.
- Kept non-identical clipped pairs such as `No conflict. No antagonist.` because they match the same rhetorical prose structure as the target examples.

Verification:
- `fixture3 check --feature textlint-rules` passed.
- `pnpm run validate` passed.
- Target probes passed: `No implant. No brain surgery.` and `No fever. No rash.` fire; `No change. No change.`, `No significant change from. No significant change from.`, and finite negation sentences do not fire.
- Rebuilt `dist` and ran the exact detector over 15,578 real corpus Markdown files under `article/corpus/human`, `article/corpus/ai-generated`, and `article/corpus/ai-suspected`.
- Real corpus no-fragment hits after the guard: human 1, ai-generated 2, ai-suspected 162.
- The remaining human hit is `No conflict. No antagonist.`, classified as a kept hit.

Key files for context:
- `src/rules/syntactic-patterns/repetition/private/fragment-stack-detector.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/golden/textlint-rules-cases-syntactic-patterns/approved.normalized.json`

Next steps:
- Continue the density-tier design separately. This change only fixes no-fragment pair coverage and its false positives.
