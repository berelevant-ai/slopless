Goal:
Extend negation-reframe detection so sloppy negation templates survive surface-form changes such as `not` -> `never`, `isn't`, `doesn't`, and pronoun contractions like `it's`.

Approach:
- Update `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts` to model negation forms as shared syntax:
  - include `never` in negation words
  - let copular negation find `is never`, `was never`, and equivalent copular forms
  - normalize pronoun copula starts such as `it's`, `that's`, `they're`, `we're`, and `you're`
  - add helpers for do-negated lexical actions so `doesn't replace` and `does not replace` share one path
- Update `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`:
  - use the broader copular helper for pair reframes
  - add a negated lexical-action -> pronoun payoff branch for patterns like `RAG doesn't replace search. It depends on it.`
- Keep factual guards:
  - do not flag negations with factual connectors after the negation
  - do not flag technical/passive definition pairs
  - keep existing concrete-correction guard for explicit replacement frames
- Add hit and no-hit cases to `behavior/fixtures/textlint-rules/cases/syntactic-patterns`.
- Review and approve only the syntactic-patterns golden output if the diff matches the intended behavior.

Key decisions:
- Do not add a separate rule. These are forms of `negation-reframe`, so the rule ID should stay stable.
- Do not rely on literal phrase lists for `never` or `doesn't`; normalize the operator and reuse pair logic.
- Keep the change pair-based. Single-sentence negation widening is a different false-positive surface.

Files to modify:
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/golden/textlint-rules-cases-syntactic-patterns/*` after review
