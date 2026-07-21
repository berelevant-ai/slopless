# Negation reframe classification

## Summary

Replaced the blanket passive-definition exclusion with a pattern-specific classifier for sentence-pair negation reframes. The rule retains short and evaluative reframes while suppressing factual instructions, definitions, ownership relations, protocol references, numeric/name evidence paired with passive explanations, purpose statements, and causal provenance.

## Decisions made

- Kept action-payoff patterns independent from factual suppression because examples such as `RAG does not replace search. It depends on it.` are target behavior.
- Applied classification to copular, explicit replacement, and explicit contrast-pivot paths so factual corrections cannot bypass it.
- Required combined evidence for broad signals. A URL, number, name, passive verb, sentence length, or detailed clause does not suppress a finding alone.
- Preserved framing nouns near the negation because `goal`, `fix`, `solution`, `problem`, and related nouns remain strong reframe signals even in detailed prose.
- Added public hit and no-hit fixtures and reviewed every Fixture3 golden change before approval.

## Key files for context

- `.plans/2026-07-03-133106-negation-informativeness-gate.md`
- `src/rules/syntactic-patterns/contrast/private/reframe-classification.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/golden/textlint-rules-cases-syntactic-patterns/approved.normalized.json`

## Next steps

- The full public CLI took more than 30 minutes over the 20M-word human corpus because it runs every rule. The targeted changed-rule audit finished in under a minute. Investigate corpus-audit performance separately before relying on the full CLI for iterative rule analysis.
- Continue using the human, suspected-AI, and generated-AI corpus comparison whenever the negation classifier boundary changes.
