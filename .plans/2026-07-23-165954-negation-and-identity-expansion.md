# Negation and identity expansion

## Goal

Catch the supplied formulaic reframes and identity slogans through generalized
extensions to existing rule owners, while preserving factual history,
technical definitions, ordinary narrative negation, and concrete instructions.

Target constructions:

- `That's the shift.`
- `It's not about the storefront. It's about the feed.`
- `It used to be database hygiene. Now it's distribution.`
- `Nobody reads your product page anymore. An AI reads your product feed.`
- `This isn't a data problem. It's a distribution problem.`
- `To the machine doing the shopping, the feed is the product.`
- `Skip a field, and you don't lose the comparison. You never enter it.`
- `Not compared and rejected - never compared at all.`
- `The agent isn't matching keywords anymore. It reasons through specifications.`
- `It doesn't guess. It reads the attributes, filters, and moves on.`
- `An empty field is not sloppy data; it is a door the customer cannot walk through.`
- `The agent wasn't rejecting it. It had never met it.`
- `Here's the part that got me.`
- `So the feed is the product now.`

## Contraction parsing

Extend the existing copula parser rather than rewriting individual templates.
Recognize subject-copula contractions used by current pair rules:

- `I'm`
- `you're`
- `we're`
- `they're`
- `he's`
- `she's`
- `it's`
- `that's`

`findCopularNegation` must interpret a contracted copula followed by `not`,
`never`, `no`, `nobody`, `nothing`, `none`, or `nowhere`. Existing affirmative
pair parsing must accept the same contractions. Apostrophe variants remain the
tokenizer's responsibility.

The shared negator inventory must also recognize `aren't`, `isn't`, `wasn't`,
`weren't`, `don't`, `doesn't`, `didn't`, `can't`, `couldn't`, `hadn't`,
`hasn't`, `haven't`, `mightn't`, `mustn't`, `needn't`, `shan't`, `shouldn't`,
`won't`, and `wouldn't`. A contraction alone is not reportable; the
surrounding reframe must still match.

Extend `deictic-summary` with a phrase slot that accepts the explicit and
contracted forms of `that is`, `this is`, and `it is`. This catches
`That's the shift.` without changing every semantic template or globally
rewriting tokens.

The semantic matcher intentionally treats punctuation in contains templates as
decorative, because many existing patterns match a clause prefix. Protect
concrete continuations such as `That is the point guard assigned to Curry.`
through the existing concrete-evidence gate. A named assignment is concrete
evidence; it is not a deictic summary.

## Past-to-present reframes

Add a private matcher owned by `negation-reframe` for adjacent complete
sentences shaped as:

- a short subject plus `used to be` and a short category label;
- a second sentence beginning with optional `now`, followed by the same subject
  or a matching pronoun and an affirmative copula;
- at least one old or new label headed by an abstract work, content, search,
  policy, market, or distribution category.

Reject dates, numbers, quoted values, passive explanations, causal connectors,
locations, physical properties, and detailed historical descriptions. A
factual statement such as `The warehouse used to be a school. Now it is a
clinic.` must remain clean. Limit the first subject to content, search, data,
page, product, audit, feed, metadata, indexing, visibility, or a deictic
pronoun. Organizational history remains clean.

## Audience replacement

Add a private matcher owned by `negation-reframe` for an adjacent pair where:

- the first sentence starts with `nobody`, `no one`, or a negated human
  audience and ends its claim with `anymore`, `any longer`, `now`, or
  `these days`;
- the first predicate is an observation, search, comparison, selection, or
  purchase verb;
- the second sentence starts with an AI, agent, model, bot, crawler, algorithm,
  machine, assistant, or system actor;
- the second sentence repeats the first predicate.

Require shared content after the predicates. Reject different predicates,
causal explanations, quoted examples, numbers, pronoun replacements, and
human-to-human replacements.

## Negative consequence sequences

Add two private matches under `negation-reframe`.

The first catches adjacent sentences when both state an abstract exclusion
consequence: the first uses a negative auxiliary with a consequence verb such
as losing, missing, or failing to reach consideration; the second uses `never`
with an entry, appearance, qualification, comparison, selection, or reach
verb. Require abstract comparison, selection, distribution, ranking, market,
or decision objects. Reject technical state, data-loss, safety, and imperative
instructions. The first consequence must contain a negative auxiliary.
Positive consequences remain clean. A missing-field premise may use either an
omission command or `no` plus a named information field.

The second uses a two- or three-sentence window. It requires an information
artifact subject, `never` plus an information verb, an optional outcome
fragment of at most three words, and a final negative selection or visibility
claim that repeats a selection predicate or stacks two selection predicates.
Reject narrative subjects, debugging terms, measurements, citations, and
causal explanations. This covers `not compared ... never compared at all`
without flagging one ordinary use of `never`. Stacked `never` predicates
require the preceding information-artifact sentence; only a repeated
`not X ... never X` dash form may report alone.

## Negative action replacement

Extend the existing negative-action matcher. Accept negated progressive forms
and ordinary `do` contractions followed by a same-subject or
matching-pronoun affirmative action. Use the existing bounded action
inventory. For an agent, model, system, assistant, engine, or tool, also catch
a negated progressive followed by `it/they had never ...`. Factual clauses
with causal connectors remain clean.

For a single sentence split by a semicolon, catch an evaluative negative label
such as `not sloppy data` or `isn't untidy data` followed by a pronoun identity
metaphor. Do not treat every semicolon correction as slop.

## Reaction signposting

Extend `generic-signposting` with `Here is/Here's the {part, piece, point,
detail, thing} that {got, hit, surprised, stuck with} me/us`. Require the
complete reaction frame so literal part descriptions remain clean.

## Artifact-role identity

Extend the existing `abstract-metaphor-claim` pattern. Add an identity template
for a known content, search, data, or interface artifact equated with a business
role, decision role, audience surface, or outcome:

- feed, page, prompt, dashboard, database, index, schema, metadata, report,
  spreadsheet, interface, pipeline, model, and content;
- product, strategy, decision, answer, business, brand, storefront, market,
  distribution, experience, work, and source of truth.

Keep the existing concrete-evidence rejection. Do not match unrestricted
`X is Y`, scientific definitions, physical classifications, named entities,
measured claims, or longer explanations. Identity templates must match the
whole sentence, with optional leading `the` and trailing `now`; other
templates retain their existing matching mode.

Audience-prefixed identities use complete templates with a bounded automated
audience and optional activity, such as `For the search agent, the page is the
answer` and `To the machine doing the shopping, the feed is the product`.

## Fixtures and corpus

Add every target and generalized variation to the appropriate hit case file.
Add adversarial no-hit cases for:

- every supported contraction in factual prose;
- terminal slogan words embedded in longer noun phrases, such as
  `That is the point guard assigned to Curry.`;
- historical building use, measured state changes, passive history, and dates;
- negative human subjects followed by unrelated or human actions;
- technical failure instructions and concrete data-loss consequences;
- literal and scientific `X is Y` definitions.

Copy every new case into a topic-relevant flowing corpus and preserve map.

Capture the engine at commit `2da9593` and compare it with the implementation
on the same inputs:

- every Markdown fixture under `behavior/fixtures/textlint-rules`;
- all Markdown under `new-corpus`;
- no 20-million-word human validation run.

Write every added and removed finding, plus manual false-positive decisions, to
`behavior/analysis/2026-07-23-negation-and-identity-expansion.md`. Do not approve
Fixture3 output until every changed finding has been reviewed.

## Review corrections

The adversarial review added five required boundaries:

- semicolon reframes require a bounded identity-metaphor complement;
- reaction signposting requires a complete personal reaction ending;
- action replacement rejects a cause introduced only in the second sentence;
- audience replacement compares full content cores rather than one shared word;
- progressive `had never` payoffs require a bounded payoff verb.

The new factual action control exposed an existing semantic matcher bug.
`empty-scene-transition` used substring matching, so `It started after the
battery was replaced` and `whether it moved` were reported. The pattern must
match a complete short sentence and must explicitly support leading weak
modifiers such as `After that, the conversation shifted.`

## Key decisions

- Reuse `syntactic-patterns:negation-reframe` and
  `semantic-thinness:semantic-thinness`.
- Do not add a general negation warning or a general `X is Y` rule.
- Do not make a lone `never` reportable.
- Do not use density across unrelated rules.
- Keep all new pair and window logic inside private modules owned by the
  existing negation rule.
- Replace the rule's narrow `not-X-then-Y` guidance with `Rewrite the staged
  negation as a direct claim.` because the same rule will own negative
  reframes, audience replacements, and exclusion sequences.

## Files to modify

- `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-vocabulary.ts`
- `src/rules/syntactic-patterns/contrast/private/action-reframe-vocabulary.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `src/rules/syntactic-patterns/contrast/private/inline-semicolon-reframe.ts`
- `src/rules/syntactic-patterns/contrast/private/reframe-classification.ts`
- `src/rules/syntactic-patterns/contrast/private/negative-slop-frames.ts`
- `src/rules/syntactic-patterns/contrast/private/temporal-reframe.ts`
- `src/rules/syntactic-patterns/contrast/private/audience-replacement.ts`
- `src/rules/syntactic-patterns/contrast/private/negative-consequence.ts`
- `src/rules/syntactic-patterns/contrast/private/sequence-reframes.ts`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `src/rules/syntactic-patterns/lead-ins/private/reaction-frame.ts`
- `src/rules/semantic-thinness/patterns/deictic-summary.json`
- `src/rules/semantic-thinness/patterns/abstract-metaphor-claim.json`
- `src/rules/semantic-thinness/patterns/empty-scene-transition.json`
- `src/rules/semantic-thinness/private/concrete-guards.ts`
- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `.plans/2026-07-23-135842-generic-signposting-labels-verifier.mjs`
- `.plans/2026-07-21-190541-relative-signposting-and-evidence-limitation.md.spec.verify.mjs`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.preserve.json`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`
- `behavior/analysis/2026-07-23-negation-and-identity-expansion.md`
