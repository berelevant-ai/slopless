# Generic signposting labels

## Summary

Expanded the existing generic-signposting rule to detect chopped writing-role
assignments and vague evaluative prefixes before colons. Added hit and no-hit
cases, flowing corpus coverage, approved Fixture3 output, and a reviewed
before/after report covering all fixtures and non-human corpora.

## Decisions made

- Kept both constructions under `syntactic-patterns:generic-signposting`
  because both replace a direct statement with a removable label.
- Used existing sentence and paragraph units plus the shared sentence splitter.
  Adjacent component findings now highlight both sentences and never cross a
  Markdown paragraph boundary.
- Restricted component pairs to writing actors and writing-flow components.
  Numbers, citations, causal detail, and technical interfaces remain clean.
- Matched evaluative colon prefixes across present and past tense and singular
  and plural subjects. Measurements, quantities, dates, code, quoted values,
  and identifier-led technical explanations remain clean.
- Added a TypeScript-aware Specular verifier for exact private-module imports
  and exported matcher signatures.
- Compared commit `28e6a67` with the new engine on the same updated inputs.
  The result was 41 added findings, 0 removed findings, and no reviewed false
  positives. The user excluded the 20-million-word human corpus.

## Key files for context

- `.plans/2026-07-23-135842-generic-signposting-labels.md`
- `.plans/2026-07-23-135842-generic-signposting-labels.md.spec.json`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `src/rules/syntactic-patterns/lead-ins/private/component-assignment-frame.ts`
- `src/rules/syntactic-patterns/lead-ins/private/evaluative-colon-frame.ts`
- `behavior/analysis/2026-07-23-generic-signposting-labels.md`

## Next steps

- The corpus-preservation verifier still reports 263 pre-existing missing
  entries. Every case added in this change is represented and does not appear
  in that output.
- `fixture3 check --all` can race because every suite deletes and rebuilds
  `dist` concurrently. Eighteen suites matched in the combined run; the one
  process that returned empty output also matched when rerun alone. Fixing the
  shared-build runner race is separate repository work.
