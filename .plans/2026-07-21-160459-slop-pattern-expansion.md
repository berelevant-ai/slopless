# Slop pattern expansion

## Goal

Catch the seven supplied slop constructions by extending their existing rule owners wherever one exists. Add one semantic-thinness pattern for empty quantification because no current detector owns that behavior. Keep concrete literal uses clean.

## Approach

1. Extend the private discourse-evaluation matcher used by `syntactic-patterns:generic-signposting`:
   - Match discourse subjects followed by `is doing real work`.
   - Match discourse subjects followed by `is load-bearing`, tokenized as `is load bearing`.
   - Require a known discourse noun for both forms so literal subjects such as `crew`, `wall`, and `beam` remain clean.
2. Extend the abstract-frame matcher in `generic-signposting`:
   - Generalize the existing `the result worth caring about` form to known frame nouns followed by `worth paying attention to`, `worth noticing`, `worth watching`, `worth tracking`, or `worth caring about`.
   - Match `the` plus an evaluative adjective plus a frame noun plus `starts`, `begins`, `happens`, or `lives` plus a vague location such as `upstream`, `downstream`, `here`, `there`, or `earlier`.
   - Add `audit` and `diagnosis` to the existing frame-noun inventory.
   - Keep the existing concrete-implementation guard, including numbers and technical objects.
3. Add `the fun part is` to the sentence-level formulaic lead-ins in `syntactic-patterns:generic-signposting`. Do not put it in `llm-openers`, because that rule only sees the first sentence of a Markdown section and would miss ordinary paragraph lead-ins.
4. Extend `syntactic-patterns:affirmation-closers` with the exact short formula `that's the good stuff` and its uncontracted form. Do not match longer literal references to purchased or selected goods.
5. Extend `syntactic-patterns:negation-reframe`:
   - Add `set` as a replacement action only when its nearby object is an abstract policy noun such as `rule`, `policy`, `criterion`, `threshold`, `condition`, `requirement`, `principle`, or `standard`.
   - Permit a colon-ended second sentence only for this negated-action replacement path. Do not make colon endings complete sentences for every negation matcher.
   - Preserve factual-connector rejection.
   - Keep direct abstract-object parsing in a private contrast helper so the negation matcher stays below the repository file-size limit.
6. Add `empty-quantification.json` under semantic-thinness:
   - Match `just`, `simply`, `merely`, or `basically` plus `put a number on` plus `it`, `this`, or `that` in suffix mode, allowing an arbitrary subject while rejecting measured or literal continuations.
   - Keep numbered labels, measured values, and explanations with existing concrete-evidence and connector guards outside the pattern.
   - Import the pattern through the existing pattern-data module. Do not add a public rule ID.
7. Add isolated public hit and no-hit cases to the existing syntactic-patterns and semantic-thinness fixture files before accepting output.
8. Run direct public CLI probes, Fixture3, repository validation, and targeted changed-rule audits over human, suspected-AI, and generated-AI corpora. Review all changed findings before approval.

## Key decisions

- Reuse `generic-signposting`, `affirmation-closers`, `negation-reframe`, and `semantic-thinness`; the supplied forms do not justify another public rule family.
- Do not add a wildcard to the semantic template engine. Existing token matchers already support generalized discourse subjects, and the empty-quantification pattern can begin at the diagnostic phrase rather than enumerating arbitrary subjects.
- Do not treat every colon-ended fragment as a sentence. The exception belongs only to the negated-action replacement that needs it.
- Prefer a constrained abstract-object inventory for `set` over banning every `did not X. She set Y:` pair.
- Err toward reporting formulaic prose, but retain literal walls, beams, crews, numbered labels, measurements, and factual explanations as no-hits.

## Files to modify

- `src/rules/syntactic-patterns/lead-ins/private/discourse-evaluation.ts`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `src/rules/syntactic-patterns/closers/affirmation-closers.ts`
- `src/rules/syntactic-patterns/contrast/private/negative-slop-frames.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `src/rules/syntactic-patterns/contrast/private/policy-object.ts`
- `src/rules/semantic-thinness/patterns/empty-quantification.json`
- `src/rules/semantic-thinness/private/pattern-data-e.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- Fixture3 golden output for the changed suites after manual diff review
