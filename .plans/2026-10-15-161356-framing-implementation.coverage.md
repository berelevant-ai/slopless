# Framing implementation coverage

- The architecture plan at `.plans/2026-10-15-150716-framing-extension-architecture.md` defines recognition and ownership. This iteration implements its framing and adverb changes.
- Specular tree/content checks cover the private matcher modules, integration, vocabulary dependency direction, and branch-specific adverb vocabulary.
- Existing syntactic-patterns and words hit/no-hit fixtures cover public detection. Add cases before runtime edits; compare baseline and candidate through textlint.
- Corresponding corpus prose preserves the new case text. Full Fixture3 replay covers public results and unrelated-rule changes on those inputs.
- Changed-rule audits cover available human, generated, suspected-AI, and expansion text; identify input locations and counts before claiming coverage.
- Packed CLI checks exercise the supplied article and new examples. Severity and exit status are reported separately; the separate CLI contract proposal remains outside this iteration.
- Reviewer regressions exercise clauses, noun-phrase subjects, partial quotations, possessive continuations, passive actions, structural materials, spelled measurements, and combined auxiliary/contraction forms. The shared `subjectBefore` helper provides grammatical scope; each rule keeps its own semantic vocabulary.
