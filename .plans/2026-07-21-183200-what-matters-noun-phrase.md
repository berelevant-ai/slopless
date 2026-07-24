# What matters noun-phrase frame

## Goal

Catch formulaic `What matters is` signposting when it introduces a noun phrase, list, bare noun, gerund, infinitive, or numeric answer, including `What matters is the use case, the setting, the constraint, and the measured result.` Keep factual clause complements outside the rule.

## Approach

1. Extend `matchWhatFrame` in `generic-signposting.ts`, the existing owner of `What matters is` detection.
2. Match every complement after `What matters is` except explicit factual clause starters: `whether`, `that`, `how`, `which`, `who`, `whose`, `what`, `when`, `where`, `why`, and `if`.
3. Apply this boundary only when the frame is `What matters is`. Do not widen `What helps is`, `What works is`, or `What changes is` without evidence.
4. Bypass the generic concrete-implementation filter for this frame because technical nouns such as `API`, `contract`, and `database` can occur inside the targeted signposting grammar.
5. Add public hit and no-hit cases, review the Fixture3 diff, run all approval suites, validate the repository, and run an adversarial review.

## Key decisions

- Reuse `generic-signposting`; this is missing coverage in an existing matcher, not a new rule.
- Use a short exclusion list for explicit clause grammar instead of enumerating every possible noun-phrase starter.
- Keep clause complements clean because they state a question or condition rather than announcing a noun-list frame.
- Keep numeric complements inside the rule. The formulaic frame remains present regardless of whether its answer is a noun or a number.

## Files to modify

- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/golden/textlint-rules-cases-syntactic-patterns/approved.meta.json`
- `behavior/golden/textlint-rules-cases-syntactic-patterns/approved.normalized.json`
