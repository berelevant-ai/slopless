# Summary

Expanded two existing rule owners to catch unsupported total-impact statements and vague superlative claims about the source of important changes. Added 30 hit cases, 30 no-hit controls, matching engineering-review corpus prose, exact preservation metadata, and reviewed Fixture3 approvals.

# Decisions made

- Extended `hollow-significance` instead of adding a rule. Full-sentence templates combine a bounded summary subject with a total-impact verb and object.
- Extended `universalizing-claims` instead of adding a rule. The matcher requires the complete sequence: broad quantity, importance qualifier, abstract outcome, optional abstract domain, source predicate, and vague source.
- Kept measured changes, named causes, physical changes, named studies, named people, and narrower sentence structures outside both matchers.
- Recomputed every engineering-review preserve line after fixture insertion exposed stale line numbers.
- Bumped the package from 0.2.31 to 0.2.32.

# Key files for context

- `.plans/2026-07-28-122116-vague-shift-impact-claims.md`
- `.plans/2026-07-28-122116-vague-shift-impact-claims.md.spec.json`
- `src/rules/semantic-thinness/patterns/hollow-significance.json`
- `src/rules/syntactic-patterns/generalization/universalizing-claims.ts`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`

# Verification

- `specular lint` and `specular verify` pass.
- `pnpm run validate` passes.
- `fixture3 doctor` passes.
- `fixture3 check --all` passes.
- All 30 added hit cases fire under their intended rule in cases and corpus.
- All 30 added no-hit controls receive no finding in isolated case files and no finding from either expanded rule in the corpus.
- A packed local install reports both user examples under the intended public rule IDs.
- The adversarial review found and resolved one closing-position fixture regression; the follow-up review found no blockers.

# Next steps

- Commit and push the feature branch.
- Merge after CI passes.
- Publish and install `slopless@0.2.32`.
