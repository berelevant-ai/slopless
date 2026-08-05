# Elliptical action stacks

<!-- textlint-disable slopless/coleman-liau, slopless/flesch-kincaid, slopless/fragment-stacking -->

## Summary

Expanded `syntactic-patterns:fragment-stacking` to catch a complete action followed by two or more subjectless action or complement fragments. Added 25 hit cases, 26 no-hit controls, matching corpus prose, reviewed Fixture3 output, and a 2.23-million-word human sample audit.

## Decisions made

- Kept the public rule ID and reporting path. A private matcher now owns the new sentence shape.
- Required at least two adjacent continuations after a complete action. One continuation remains allowed.
- Covered sequence markers, directions, locations, modifiers, omitted-subject actions, plural subjects, and base present verbs.
- Rejected complete clauses, questions, introduced commands, explicit subjects, title and initial splits, chapter indexes, and Markdown soft line wraps.
- Fixed shared sentence boundaries instead of adding phrase exceptions for `Mrs. Darling`, `Jason M. Glanz`, and wrapped Markdown prose.
- Retained `Off, quiet. On, noise.` as a harsh finding because it uses the clipped parallel structure this rule checks.

## Key files for context

- `src/rules/syntactic-patterns/repetition/private/elliptical-action-stack.ts`
- `src/rules/syntactic-patterns/repetition/private/elliptical-action-guards.ts`
- `src/rules/syntactic-patterns/repetition/private/fragment-stack-detector.ts`
- `src/shared/text/sentences.ts`
- `behavior/analysis/2026-08-05-elliptical-action-stacks.md`
- `.plans/2026-08-05-130329-elliptical-action-stacks.md`

## Next steps

- No implementation work remains for this change.
- Release only when requested.

<!-- textlint-enable slopless/coleman-liau, slopless/flesch-kincaid, slopless/fragment-stacking -->
