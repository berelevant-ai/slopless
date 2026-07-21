# What matters frame

## Summary

Extended `generic-signposting` so `What matters is` catches noun phrases, lists, bare nouns, numeric answers, gerunds, and infinitives. Explicit factual clauses remain clean.

## Decisions made

- Reused the existing `matchWhatFrame` function and public `generic-signposting` rule.
- Replaced a noun-starter allowlist with a clause-starter exclusion after targeted corpus mining exposed missed forms such as `What matters is one rule` and `What matters is being thoughtful`.
- Limited the broader complement boundary to `What matters is`; neighboring `What helps/works/changes is` behavior is unchanged.
- Bypassed the shared concrete-implementation filter only for this frame so technical noun phrases and measured noun phrases are not suppressed.
- Kept numeric complements inside the rule instead of adding an open-ended English-number parser.
- Added twenty-two public hit cases and eleven factual-clause no-hit cases.

## Targeted corpus audit

- Searched all 15,609 corpus files for `what matters is`, then ran Slopless only on the 27 matching files. No full-corpus CLI run was performed.
- The changed rule reports 9 occurrences: 3 already matched by version 0.2.24 and 6 added by this change.
- New findings are 3 in AI-suspected text, 2 in AI-generated text, and 1 in human text.
- The human finding is `What matters is the attempt, and the recognition that...` from a Wikipedia discussion of Kurt Vonnegut. It matches the intended noun-list frame and is retained under the requested harsh boundary.

## Key files for context

- `.plans/2026-07-21-183200-what-matters-noun-phrase.md`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/golden/textlint-rules-cases-syntactic-patterns/approved.normalized.json`

## Next steps

- Run the long human/AI corpus comparison only when requested.
- Release separately after the user approves the behavior.
