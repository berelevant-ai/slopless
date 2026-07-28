# Goal

Catch both reported sentences through existing public rules:

- `That shift changed everything.` through
  `semantic-thinness:semantic-thinness`.
- `Some of the biggest shifts in leadership come from experiences outside
  work.` through `syntactic-patterns:universalizing-claims`.

The implementation must generalize beyond those literals while preserving
concrete descriptions of measured, physical, historical, or named changes.

# Existing Architecture

- `hollow-significance.json` already catches deictic total-impact claims such
  as `It changed everything`, but its subject slots do not accept summary
  change nouns such as `that shift`.
- `universalizing-claims.ts` already owns unsupported broad claims. It matches
  broad human groups plus desire or certainty verbs, but it does not match
  superlative abstract outcomes attributed to vague sources.
- Both rules report one finding for one sentence. Density is not involved.
- Fixture3 case files contain isolated hits and no-hits. The engineering-review
  corpus preserves the same cases in readable prose.

# Hollow Significance Expansion

1. Extend the existing `hollow-significance` pattern instead of adding a rule
   or pattern ID.
2. Add a full-sentence template combining a summary subject with a total-impact
   phrase.
3. Cover deictic and definite summary subjects such as `this shift`, `that
   shift`, `the shift`, `this change`, `that change`, `the decision`, `that
   move`, and `the experience`.
4. Cover total-impact phrases such as `changed everything`, `changes
   everything`, `transformed everything`, `reshaped everything`, `changed the
   whole picture`, and `made all the difference`.
5. Continue using the existing broad-pattern concrete-evidence rejection.
   Sentences with measurements, dates, named mechanisms, or explanatory
   clauses must remain no-hits.

# Universalizing Claims Expansion

1. Extend `syntactic-patterns:universalizing-claims`; do not add another rule.
2. Match the grammatical sequence:
   `some/many of the + superlative + abstract plural outcome + optional
   abstract domain + vague source predicate`.
3. Superlatives include `biggest`, `greatest`, `deepest`, `strongest`,
   `best`, `most important`, `most valuable`, `most useful`, and `most
   meaningful`.
4. Abstract outcomes include `shifts`, `changes`, `lessons`, `ideas`,
   `insights`, `breakthroughs`, `improvements`, `advances`, `decisions`, and
   `skills`.
5. Abstract domains include `leadership`, `business`, `careers`, `life`,
   `management`, `strategy`, `growth`, `work`, `writing`, `design`, and
   `technology`.
6. Source predicates include `come/came from`, `grow/grew from`,
   `emerge/emerged from`, `start/started with`, and `begin/began with`.
7. Vague sources include `experience`, `experiences`, `experiences outside
   work`, `failure`, `failures`, `adversity`, `discomfort`, `setbacks`,
   `challenges`, `unexpected places`, `ordinary moments`, and `elsewhere`.
8. Require the complete sentence shape. Do not match physical or measured
   shifts, named source events, customer research, chapter references,
   numbered evidence, or a different predicate.

# Fixtures And Corpus

1. Add at least 12 hollow-significance hit variants and 12 concrete no-hit
   controls.
2. Add at least 18 superlative-source hit variants across qualifiers, outcomes,
   domains, predicates, and sources.
3. Add at least 18 no-hit controls covering geological movement, surveys,
   named events, numbered results, specific research sources, manuals,
   concrete mechanisms, and near-miss grammar.
4. Put every new case sentence into the engineering-review corpus as readable
   topic-grouped prose.
5. Add preserve records that map every new corpus sentence to its exact case
   file line.
6. Run Fixture3 before implementation and confirm the two reported sentences
   do not have the intended rule findings.
7. After implementation, review every changed finding before approval. Do not
   remove no-hit cases to make output pass.

# Verification And Release

1. Bump the package patch version from `0.2.31` to `0.2.32`.
2. Run `specular lint` and `specular verify`.
3. Run `fixture3 doctor`, inspect the affected suites, review their diffs, and
   run `fixture3 check --all`.
4. Run `pnpm run validate`.
5. Run the packaged and globally installed CLI against both reported
   sentences and representative no-hits.
6. Perform one adversarial review of the plan, specification, implementation,
   fixture changes, and verification output.
7. Commit and push with Eugene Tartakovsky's configured authorship, merge only
   after CI passes, publish `v0.2.32`, and install it globally.

# Key Decisions

- Reuse `hollow-significance` because the first sentence is an unsupported
  total-impact summary, not a new kind of change detector.
- Reuse `universalizing-claims` because the second sentence generalizes from a
  vague source using an inflated superlative frame.
- Keep the patterns separate because their grammar and false-positive
  boundaries differ.
- Use explicit linguistic slots. Matching any noun, adjective, or source would
  flag ordinary factual claims.

# Files To Modify

- `src/rules/semantic-thinness/patterns/hollow-significance.json`
- `src/rules/syntactic-patterns/generalization/universalizing-claims.ts`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`
- `behavior/golden/*` only through reviewed Fixture3 approval
- `package.json`
