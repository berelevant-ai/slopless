# Relative signposting and evidence limitation

## Summary

Extended `generic-signposting` with generalized relative discourse frames and `contrastive-aphorism` with generalized evidence-proxy limitation pairs. Added public hit and no-hit fixtures without adding a public rule, registry entry, export, family, or dependency.

## Decisions made

- Kept relative frames in a private matcher beside the existing discourse-evaluation matcher because that module was at its enforced 400-line boundary.
- Added a plan-local Specular verifier that parses every TypeScript import and package exports so matcher ownership and the unchanged public surface are checked mechanically.
- Required a discourse head plus either a colon-ended helper clause or a complete `makes <object> <usefulness adjective> is <evaluation>` predicate.
- Kept evidence-limitation matching in a new private matcher owned by `contrastive-aphorism`.
- Generalized evidence and reporting verbs while requiring an evidence-proxy subject such as a review, rating, benchmark, screenshot, metric, survey, or testimonial.
- Excluded scientific and operational document subjects such as studies, reports, results, and statistics because their limitation clauses are commonly substantive.
- Required an adjacent pronoun-led limitation shaped as `little`, `very little`, `nothing`, `not much`, `only so much`, `something`, or an auxiliary `does/did not <verb> much` form.
- Required the evidence proxy to be the simple subject head at the start of the assertion and required singular or plural agreement with the second sentence's pronoun. Conditional clauses, subordinate clauses, and complex subjects with prepositional modifiers remain clean.
- Rejected coordinated subjects and accepted one modal or perfect auxiliary between the evidence subject and assertion verb.
- Limited `little`, `much`, `nothing`, `something`, and `anything` to terminal objects or continuations beginning with `about`; concrete continuations such as `little change` and `something concrete: p95 latency rose 20 percent` remain clean.
- Kept complete relative evaluation frames catchable even when they contain technical nouns. Factual definitions remain clean because they do not end in the empty evaluation predicate required by the matcher.
- Preserved scientific limitation pairs by excluding unrestricted subjects. `The theorem proves the sequence converges. It says little about the convergence rate.` remains clean.

## Verification

- Added 24 public hit cases and 28 public no-hit controls. Every hit reports through the intended existing rule, and every new no-hit remains clean.
- `pnpm run validate`, `specular lint`, and `specular verify` pass.
- All 19 normal Fixture3 suites match after removing the known worktree-path difference.
- A targeted changed-matcher audit covered 21,451,621 human words, 187,695 generated-AI words, and 1,598,327 suspected-AI words.
- The audit found zero human matches, zero generated-AI matches, and one suspected-AI relative-frame match: `The rule that works: URL wins where it speaks.`
- The long full-library corpus check was not run.

## Key files for context

- `.plans/2026-07-21-190541-relative-signposting-and-evidence-limitation.md`
- `src/rules/syntactic-patterns/lead-ins/private/relative-discourse-frame.ts`
- `src/rules/syntactic-patterns/contrast/private/evidence-limitation-pair.ts`
- `src/rules/syntactic-patterns/contrast/contrastive-aphorism.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`

## Next steps

- Run the long full-library human/AI corpus check only when requested.
- Release separately after behavior approval.
