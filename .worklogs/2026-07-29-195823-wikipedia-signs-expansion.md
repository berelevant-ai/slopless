# Wikipedia signs expansion

<!-- textlint-disable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->

## Summary

Expanded Slopless with gated detectors for superficial `-ing` analysis, formulaic challenge passages, broad significance claims, three-part word lists, and additional AI-associated vocabulary. Renamed `triple-repeat` to `triple-sentence-repeat`, added adversarial hit and no-hit fixtures, copied every new case into project corpus prose, and reviewed the resulting findings.

## Decisions made

- Preserved the old triple-sentence behavior under the clearer public rule ID instead of changing its matching boundary during the rename.
- Added `triple-word-repeat` as a separate detector because repeated sentence openings and three-part word or phrase lists have different evidence and false-positive controls.
- Kept broad-significance matching under `semantic-thinness` instead of introducing another public family or overlapping rule.
- Required superficial `-ing` clauses to end in an abstract or evaluative claim, which excludes literal ongoing actions.
- Required formulaic challenge language to pair a vague challenge with generic recovery language, while concrete failures, numbers, owners, and deadlines remain unflagged.
- Expanded AI vocabulary but retained short paragraph and four-sentence density windows. Whole-document counting produced eight ordinary human-sample warnings and was rejected.
- Filtered literal, interface, scientific, legal, physical, geographic, quoted, and explicit code/test uses before vocabulary density counting.
- Excluded the 20-million-word human corpus as requested. Audited a deterministic 126-file, 75,677-word sample instead.
- Approved Fixture3 output only after checking the changed no-hit cases and new corpus findings. No package release or production deployment was performed.

## Key files for context

- `.plans/2026-07-29-185041-wikipedia-signs-expansion.md`
- `.plans/2026-07-29-185041-wikipedia-signs-expansion.spec.json`
- `behavior/analysis/2026-07-29-wikipedia-signs-expansion.md`
- `src/rules/semantic-thinness/superficial-analysis.ts`
- `src/rules/semantic-thinness/private/broad-significance.ts`
- `src/rules/syntactic-patterns/closers/formulaic-challenges.ts`
- `src/rules/syntactic-patterns/repetition/triple-word-repeat.ts`
- `src/rules/words/private/vocabulary-context.ts`

## Next steps

- Review the local audit and decide whether the four inherited `triple-sentence-repeat` findings are acceptable.
- Merge and release only after explicit approval.

<!-- textlint-enable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->
