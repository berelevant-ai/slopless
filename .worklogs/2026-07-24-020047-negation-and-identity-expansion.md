# Negation and identity expansion

## Summary

Expanded the existing negation-reframe, generic-signposting, and
semantic-thinness rules to catch generalized contraction reframes, exclusion
sequences, audience replacements, reaction signposting, and artifact identity
slogans. Added reviewed hit/no-hit cases, flowing corpus coverage, preserve
entries, approved Fixture3 outputs, and a same-input baseline comparison.

## Decisions made

- Kept every new behavior under an existing public rule; no registry, preset,
  export, dependency, or public rule ID was added.
- Centralized negative auxiliary contractions and action vocabulary in private
  modules owned by `negation-reframe`.
- Required complete structural evidence for each broad construction rather
  than making `never`, contractions, semicolons, or `X is Y` independently
  reportable.
- Required identity-metaphor heads for semicolon reframes, complete personal
  reaction endings, bounded progressive payoffs, and equivalent content cores
  for audience replacements.
- Preserved rhetorical repeated-cause action mirrors while rejecting a cause
  introduced only in the corrective sentence.
- Changed `empty-scene-transition` from substring matching to complete short
  sentences after a new factual control exposed false positives inside
  concrete prose.
- Accepted only reviewed Fixture3 changes. Nine new no-hit controls produce no
  family findings.

## Verification

- The same-input comparison against commit `2da9593` covered every Markdown
  fixture and all 32 `new-corpus` Markdown files.
- Findings changed from 4,685 to 4,794: 126 added, 17 removed, and 787 messages
  changed.
- All 126 additions occur in new hit cases and their editorial corpus copies.
- The 17 removals are documented false positives.
- All 69 new hit cases report through their intended family.
- All 80 new no-hit cases remain clean for their intended family.
- All 19 Fixture3 suites match approved output.
- `pnpm validate`, `specular lint`, `specular verify`, JSON validation, and
  `git diff --check` pass.
- The final adversarial review reported no blockers or remaining risks.

## Key files for context

- `.plans/2026-07-23-165954-negation-and-identity-expansion.md`
- `.plans/2026-07-23-165954-negation-and-identity-expansion.md.spec.json`
- `behavior/analysis/2026-07-23-negation-and-identity-expansion.md`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `src/rules/syntactic-patterns/contrast/private/sequence-reframes.ts`
- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`

## Next steps

- Review and merge `fix/what-matters-frame` when the behavior is approved.
- Release and reinstall only after the user requests a release.
