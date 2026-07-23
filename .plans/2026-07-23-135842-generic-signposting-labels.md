# Generic signposting labels

## Goal

Extend `syntactic-patterns:generic-signposting` to detect two ways prose labels
its content instead of stating one connected claim:

1. Adjacent component assignments that split one action relationship into an
   actor or author role and an input, source, output, or goal declaration.
2. A short evaluative `X is Y:` prefix followed by a noun phrase or inventory
   that contains the useful content.

The existing public family, rule ID, reporting policy, and registry remain
unchanged.

## Approach

### Component assignment pairs

Add a private matcher under
`src/rules/syntactic-patterns/lead-ins/private/` that accepts two clauses. It
will match only when:

- one clause assigns an actor or author role;
- the other assigns an input, source, output, basis, material, or goal;
- both clauses use a short `X is Y` or `X are Y` form;
- the clauses are adjacent in the same Markdown paragraph, or are joined in
  one sentence by a comma, semicolon, colon-independent dash, or full stop.

The matcher will not flag a single component declaration. It will not treat
general technical components such as clients, transports, ports, formats, or
storage engines as writing-process roles.

Convert `generic-signposting` from the single-unit convenience builder to the
existing `defineTextlintRule` with sentence and paragraph units. Preserve all
existing sentence-level matches. Use the shared sentence splitter inside each
paragraph unit to match adjacent pairs and report the complete pair without
crossing Markdown node boundaries.

### Evaluative colon prefixes

Add a private matcher under the same existing rule owner. It will match a
sentence when:

- text before the colon is a short subject plus `is`, `are`, `was`, `were`,
  `feels`, or `looks` and a vague evaluative adjective;
- text after the colon contains the explanation, instruction, noun phrase, or
  inventory;
- the material after the colon is not a measurement, equation, ratio, time,
  date, code value, quoted value, or explanation beginning with an
  identifier-like technical name such as `GPTBot`.

The finding reports the evaluative prefix as the evidence. A continuation does
not become clean merely because it contains a verb; doing so would require a
brittle hand-written verb inventory.

### Fixtures and corpus comparison

Add generalized hit cases for both constructions, including punctuation and
slot, tense, number, and capitalization variations. Add no-hit cases for lone
interface declarations, concrete technical architecture assignments, literal
measurements, definitions, and named technical explanations.

Before implementation, capture Fixture3 output for all textlint fixtures and
run the current built CLI across every Markdown file under `new-corpus`. After
implementation, repeat both runs. Write the complete added and removed
findings to a Markdown report, grouped by requested hit, expected corpus hit,
false positive, and removed finding. Review every new finding manually.

## Key decisions

- Keep one public rule. Both constructions are generic signposting behavior.
- Pair detection belongs in a private matcher, not in the shared text layer.
- Pair matching cannot cross paragraph or Markdown-node boundaries.
- Do not detect all adjacent `X is Y` statements. Require one writing actor
  role and one writing-flow component.
- Do not detect every `X is Y:` construction. Require a vague evaluation and
  reject measured, quoted, code, and named technical explanations.
- Do not add a punctuation rule. The colon is evidence for the signposting
  construction, not the defect by itself.
- Do not run the 20-million-word human validation corpus in this iteration.

## Files to modify

- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `src/rules/syntactic-patterns/lead-ins/private/component-assignment-frame.ts`
- `src/rules/syntactic-patterns/lead-ins/private/evaluative-colon-frame.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.preserve.json`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`
- `behavior/analysis/2026-07-23-generic-signposting-labels.md`
- Fixture3 approved output changed by reviewed findings
