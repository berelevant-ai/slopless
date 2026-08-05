# Elliptical action stacks

## Goal

Make `syntactic-patterns:fragment-stacking` detect a complete declarative action followed by two or more parallel fragments that omit and inherit the subject and predicate.

## Approach

1. Add a private elliptical-action matcher beside the existing fragment-stack matcher.
2. Keep `fragment-stacking` as the public rule owner and combine the new matches with its current fragment matches.
3. Recognize complete declarative anchors with a likely predicate in the first six tokens.
4. Recognize adjacent subjectless continuations when each uses a sequence marker, a complement opening, an `-ing`/`-ed` omitted-subject action, or a parallel modifier opening.
5. Report the complete anchor and continuation run as one finding.
6. Preserve title abbreviations in the shared sentence splitter so a name such as `Mrs. Darling` cannot become two false fragments.
7. Reject complete inverted clauses, introduced commands, flattened chapter indexes, and person initials found by human-corpus validation.
8. Keep Markdown soft line wraps inside their sentence when no sentence-ending punctuation precedes the newline.

## Detection boundary

- Require one complete declarative anchor and at least two adjacent continuations.
- Accept varied sequence markers such as `first`, `then`, `next`, `later`, `afterward`, and `finally`.
- Accept broad spatial, directional, temporal, instrumental, and object-complement openings.
- Accept parallel omitted-subject actions and modifiers without sequence markers.
- Reject questions, exclamations, imperatives without a subject, continuations containing explicit subjects or finite helper verbs, and single continuations.
- Leave bare noun inventories without sequence or complement structure to the existing three-fragment behavior.

## Fixture coverage

- Add narrative and expository hit cases for past and present anchors, varied markers, complement openings, omitted-subject actions, and modifiers.
- Add no-hit cases for questions and answers, complete clauses, single continuations, grammatical inline coordination, quoted strings, and bare inventories.
- Copy the new cases into a cohesive project corpus section.
- Review every Fixture3 diff before approval.

## Validation

- Run the syntactic-pattern case suite first, then all Fixture3 suites except the external giant corpus.
- Run `pnpm run validate`, Specular lint and verify, and `git diff --check`.
- Manually inspect every new `fragment-stacking` finding in existing project corpora.

## Files to modify

- `src/rules/syntactic-patterns/repetition/private/elliptical-action-stack.ts`
- `src/rules/syntactic-patterns/repetition/private/elliptical-action-guards.ts`
- `src/rules/syntactic-patterns/repetition/private/fragment-stack-detector.ts`
- `src/shared/text/sentences.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- Fixture3 golden files changed by reviewed behavior
