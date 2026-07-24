# Goal

Extend the existing `generic-signposting` rule to detect deictic evaluative
frames that announce a judgment instead of stating the claim directly:

- `Here is the odd part.`
- `Here is a nice thing.`
- `That is the best part.`
- `Here's the strange bit: the result improved.`
- `This was the surprising detail: sales rose as visits fell.`

The matcher must generalize across openers, copular surface forms, evaluative
adjectives, and discourse nouns. It must not become a literal phrase list or
flag concrete identification such as `Here is the broken part inside the
pump.`

# Approach

1. Add `matchDeicticEvaluativeFrame` to
   `src/rules/syntactic-patterns/lead-ins/private/discourse-evaluation.ts`.
2. Match four typed slots:
   - opener: `here`, `this`, or `that`
   - copula: `is`, `was`, or the normalized contractions `here's`, `this's`,
     and `that's`
   - determiner: `a`, `an`, or `the`
   - evaluative adjective followed by a discourse noun
3. Use an explicit evaluative-adjective set:
   `best`, `better`, `biggest`, `central`, `core`, `crucial`, `funny`, `good`,
   `great`, `hard`, `important`, `interesting`, `key`, `main`, `neat`, `nice`,
   `odd`, `obvious`, `remarkable`, `strange`, `surprising`, `tricky`, `useful`,
   `weird`, and `wild`.
4. Use an explicit discourse-noun set:
   `angle`, `aspect`, `bit`, `catch`, `detail`, `element`, `idea`, `part`,
   `piece`, `point`, `thing`, and `twist`.
5. Call the matcher from `matchExpandedDiscourseFrame`. In
   `generic-signposting.ts`, keep this frame active when a trailing clause
   contains concrete evidence; the unnecessary signpost remains the target.
   Preserve the existing public rule ID, reporting path, and one-to-one policy.
6. Add isolated hit cases for combinations of every slot category and
   adversarial no-hit cases for concrete adjectives, concrete nouns, and
   allowed adjective-noun pairs that continue into concrete identification.
7. Add the reviewed cases to coherent paragraphs in
   `behavior/fixtures/textlint-rules/corpus/engineering-review.md` and update
   its preserve list.
8. Use Fixture3 to review the syntactic-pattern case and engineering-review
   corpus diffs. Approve only the intended new `generic-signposting` findings.
9. Bump the package patch version to `0.2.27`, validate, merge through a pull
   request, publish from GitHub Actions, and install the published version
   locally.
10. Remove the Fixture3 parallel-build race exposed by repository-wide
    verification. Compile each behavior replay into its own temporary output
    directory instead of deleting and rebuilding shared `dist/`.

# Key Decisions

- This is an existing generic-signposting behavior, not a new rule or family.
- The discourse noun is a slot. The matcher is not restricted to `part`.
- Evaluative adjectives are explicit because accepting every adjective would
  flag concrete identification such as `broken part` and `replacement piece`.
- `there` is excluded because `There is the broken part` is predominantly
  locative rather than signposting.
- Trailing clauses and colon explanations do not suppress the frame. The
  signpost remains redundant even when a concrete claim follows it.
- A space after the matched noun means the noun phrase continues, so the
  matcher does not report it. Sentence-ending punctuation and punctuation
  that introduces an explanation remain reportable boundaries.
- Existing concrete-evidence suppression does not apply to this frame because
  the target is the unnecessary evaluative lead-in itself.

# Files To Modify

- `src/rules/syntactic-patterns/lead-ins/private/discourse-evaluation.ts`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`
- `behavior/golden/textlint-rules-cases-syntactic-patterns/`
- `behavior/golden/textlint-rules-corpus-engineering-review/`
- `package.json`
- `scripts/behavior-replay.sh`
- This plan, its Specular specification and coverage map, and the worklog
