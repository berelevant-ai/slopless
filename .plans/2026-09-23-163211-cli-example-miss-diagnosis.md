# Why the supplied CLI examples are not caught

## Goal

Turn the supplied missed passages into generalized rule expansions under their existing owners, following `.plans/2026-09-23-162404-rule-development-handoff.md`. This document records the first-investigation result (cause per miss) and the proposed construction per owner, for a scope decision before implementation.

## Baseline

- Installed CLI: `slopless 0.2.38` (npm latest is also 0.2.38). Branch `docs/rule-expansion-handoff` at `9427d2c` on top of `origin/main` `0fd96bc`.
- Command: `slopless sample.md` on the supplied passages, one paragraph each. Output: 2 findings, both `negation-reframe`, on "I do not see ... I see ..." and "I am not asking you ... I am asking you ...". Exit 1.
- `scripts/behavior-replay.sh sample.md` (branch build) produces the same two findings plus the three readability metrics that the CLI preset disables. So every other bracketed passage is a matching failure in a registered rule, not a registration or reporting-threshold problem, with the exception noted under demonstrative-emphasis.

## Cause per miss

1. `I keep coming back to advice about ...` - no rule recognizes a first-person reflective opener. `boilerplate-framing` has `FILLER_OPENERS` for honesty openers ("to be honest", "here's the thing") but nothing for "I keep coming back to / returning to / thinking about". Cause: unrecognized construction. Owner: `syntactic-patterns:boilerplate-framing`.

2. `That matters when marketing leaders decide budgets.` - `demonstrative-emphasis` only classifies `that/this + emphatic verb` when the sentence is 3 to 5 tokens and the verb is the last token. A trailing `when/because/for` clause defeats it. Its report policy also needs more than 2 detections per document, and this document has 0. Cause: sentence-shape restriction plus threshold. Owner: `syntactic-patterns:demonstrative-emphasis`.

3. `The difference mattered.` and `The distinction matters.` - `demonstrative-emphasis` requires a demonstrative subject (`that difference matters` is an approved hit; `the difference mattered` is not classified because `the` is not in `DEMONSTRATIVE_SUBJECTS`). `semantic-thinness` hollow-significance has `{deicticSubject} {significanceVerb} {intensifier}.` which needs an intensifier, and `{summarySubject} {linkingVerb} ...` which needs a copula. Probe confirms even the bare `That mattered.` is missed. Cause: missing template for a bare significance predicate with a deictic or definite abstract subject. Owner: `semantic-thinness:semantic-thinness` (hollow-significance), with `demonstrative-emphasis` for the definite-subject variant.

4. `I've seen that difference shape a whole quarter.` - broad-significance `matchShapingMovement` needs `shape` followed by a movement noun (`shift`, `conversation`, `landscape`). "shape a whole quarter" fails. Cause: object list too narrow; also no rule sees the first-person witness frame `I've seen X do Y`. Owner: `semantic-thinness` broad-significance. Lower confidence that a clean generalization exists.

5. `brought that choice into focus for me` - no phrase list contains `into focus`. Cause: missing phrase. Owner: `phrases:cliches`. Cheapest fix; add `bring/brought ... into focus` and `came into focus`.

6. `The study compared existing pages using a prediction model. It did not establish a causal link.` - `contrastive-aphorism` evidence-limitation pair needs (a) a subject head in `EVIDENCE_PROXY_HEADS` (`study`, `findings`, `data`, `research`, `paper` are absent), (b) an assertion verb in the first sentence (`compared` is absent), and (c) a low-information limit in the second sentence (`little`, `nothing`, `not much`); `establish a causal link` is not in that set. Cause: three list gaps, all in the same matcher. Owner: `syntactic-patterns:contrastive-aphorism`.

7. `Its findings can inform a test. They cannot settle the word count for every page.` - `negation-reframe` only pairs sentences when the FIRST sentence carries the negation. Here the affirmative comes first and the negated modal second. No matcher handles `can X. cannot Y.` in either order. Cause: unrecognized construction (affirm-then-limit modal pair). Owner: `syntactic-patterns:contrastive-aphorism` (same family as the evidence-limitation pair, which is also affirm-then-limit).

8. `That guidance does not speak for every AI system. It does, however, rule out ...` - `negation-reframe` pair matchers require either the same verb mirrored (`actionVerbMirror`), a `not just/only` pivot, or a payoff verb from a fixed list (`means`, `shows`, `reveals`...). `rule out` after an emphatic `does, however,` matches none. Probe confirms the miss with and without `however` and with a repeated subject. Cause: unrecognized construction (negated `do` followed by emphatic affirmative `do/does/did` on the same subject or pronoun). Owner: `syntactic-patterns:negation-reframe`.

9. `offer a useful corrective` and `left me with a simple priority` - `generic-signposting` recognizes `{the} {FRAME_ADJECTIVE} {FRAME_NOUN} is ...` only in subject position. Here the evaluative frame noun is the sentence-final object, and the next sentence delivers the payoff. Cause: frame recognized only as subject plus copula. Owner: `syntactic-patterns:generic-signposting` (lead-ins). `priority` is already a frame noun; `corrective` is not.

10. `Marketing budgets should pay for problems we can demonstrate, not rules we can merely count.` - inline `, not Y` contrast requires an abstract word from `INLINE_COMMA_ABSTRACT_WORDS` somewhere in the sentence. Probe: `Budgets should pay for clarity, not rules.` is caught because `clarity` is listed; the original is not because `problems` and `rules` are not. Cause: word-list gate. The stronger signal here is structural: the two halves repeat a token sequence (`we can ... we can ...`), which is the slogan parallelism. Owner: `syntactic-patterns:negation-reframe`.

11. `That is the whole ask.` - deictic-summary template `{deicticCopula} the {evaluativeAdjective} {summaryNoun}.` has `whole` but not `ask`. `demonstrative-emphasis` rejects it because the predicate starts with `the`. Cause: slot gap. Owner: `semantic-thinness` deictic-summary.

12. Caught already: both `I do not ... I ...` pairs.

## Found while probing (not in the supplied list)

- `It is not a failure, it is a signal.` inline with a comma is missed by `negation-reframe`; only the two-sentence form is caught. The comma gate looks for a comma BEFORE the negation.
- The `src/rules/semantic-thinness/patterns/README.md` says the pattern data is inactive. All 35 JSON files are imported through `pattern-data-a.ts` to `pattern-data-e.ts` and compiled at load. The README is stale.

## Proposed generalized constructions

Each proposal names the owner, the variable parts, what stays unflagged, and reporting. Counts per group are workload targets for independent case generation, per the hand-off.

### A. Bare significance predicate (hollow-significance + demonstrative-emphasis)

- Construction: `{deictic or definite abstract subject} {significance verb} [{subordinate clause}]`. Subjects: `that`, `this`, `it`, `the/that/this {difference, distinction, detail, part, choice, shift, gap, order, timing, ...}`. Verbs: existing `significanceVerb` slot plus present-tense forms (`matters`, `counts`, `sticks`, `helps`, `works`, `lands`, `holds`).
- Add to hollow-significance: `{deicticSubject} {significanceVerb}.` and `the {abstractDifferenceNoun} {significanceVerb}.` as full matches, and a `contains`-mode variant that allows a trailing `when/for/because` clause whose payload is itself abstract (no digit, no concrete-guard token).
- Keep unflagged: `That mattered because it removed the last failing repayment case.` (existing no-hit, concrete guard) and `The technical note says the firmware version matters before flashing.` (existing no-hit, embedded clause).
- Demonstrative-emphasis: allow `the` in `classifyDemonstrativeEmphaticVerb` so `The difference mattered.` accumulates toward the document threshold. Do not lower the threshold.

### B. Affirm-then-limit pairs (contrastive-aphorism)

- Construction: sentence A asserts what evidence/guidance does; sentence B, same subject or pronoun, limits it with `did not / does not / cannot / can't / will not {establish, prove, settle, tell, show, speak for, decide, answer}`. Add `study`, `studies`, `findings`, `data`, `research`, `paper`, `guidance`, `report` to `EVIDENCE_PROXY_HEADS`; add `compare`, `inform`, `measure`, `describe`, `model`, `predict` to first-sentence verbs; accept a limitation predicate whose object is abstract (no digit, no concrete-guard token) rather than only `little/nothing`.
- Also accept the modal mirror `can X. cannot Y.` and `X can A. X cannot B.` when the subject repeats or is pronominalized.
- Keep unflagged: `The survey showed a 14 percent lift. It did not include returning customers.` (digit and concrete object), and any B sentence with a `because/when/if` connector.

### C. Negated-do then emphatic-do (negation-reframe)

- Construction: A has `{subject} {do/does/did} not {verb}` or contracted; B starts with the same subject or `it/they/this/that` plus `do/does/did` [`, however,` | `still` | `also`] `{verb}` where the verb differs from A's verb. Existing `actionVerbMirror` already handles the same-verb case; this adds the different-verb emphatic case.
- Keep unflagged: B sentences with factual connectors (`because`, `when`, `if`) or concrete correction evidence, reusing the existing gates.

### D. Parallel comma-not contrast (negation-reframe)

- Construction: `... X, not Y` where X and Y share a repeated token bigram (`we can` / `we can`), or Y mirrors X's head structure. Replace the reliance on `INLINE_COMMA_ABSTRACT_WORDS` for this shape with the parallelism check; keep the abstract-word path.
- Keep unflagged: `Not constructed by the king, but by his successor.` (existing no-hit) and short factual corrections with digits or concrete tokens.

### E. Evaluative frame noun as sentence-final object (generic-signposting)

- Construction: `{verb} [me/us] [with] a {FRAME_ADJECTIVE} {FRAME_NOUN}.` at sentence end, followed by a sentence that starts the payoff. Verbs: `offer/offers/offered`, `leave/left ... with`, `give/gave ... `, `provide`, `suggest`. Add `corrective`, `priority` (present), `reminder`, `test`, `rule` to the noun set for this shape only. Report the frame sentence.
- Keep unflagged: same sentence with a colon and concrete content after it, or with digits.

### F. First-person reflective opener (boilerplate-framing)

- Construction: sentence-initial `I keep {coming back, returning, circling back, going back} to` or `I keep thinking about`. Add to `FILLER_OPENERS` as an anchored opener group.
- Keep unflagged: mid-sentence uses.

### G. Slot and phrase additions

- deictic-summary `summaryNoun`: add `ask`, `bet`, `test`, `job`, `deal`.
- cliches: `into focus` (`bring/brought/came into focus`).
- broad-significance `matchShapingMovement`: add `quarter`, `year`, `budget`, `decision`, `outcome` as shaped objects when the subject is a deictic abstract noun. Mark as lower confidence; audit before keeping.

## Reporting

All owners above use `one-to-one` except demonstrative-emphasis (`threshold`, document, minimum 2). No threshold changes proposed.

## Files to modify (by owner)

- `src/rules/semantic-thinness/patterns/hollow-significance.json`, `deictic-summary.json`, `private/broad-significance.ts`, `patterns/README.md` (stale note).
- `src/rules/syntactic-patterns/repetition/demonstrative-emphasis.ts`.
- `src/rules/syntactic-patterns/contrast/private/evidence-limitation-pair.ts`, `negation-reframe-matcher.ts`, `negation-context-gates.ts`, one new private file for the emphatic-do pair.
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts` and `private/discourse-evaluation.ts`.
- `src/rules/syntactic-patterns/lead-ins/boilerplate-framing.ts`.
- `src/rules/phrases/data/` cliche list.
- Fixtures: `behavior/fixtures/textlint-rules/cases/{syntactic-patterns,semantic-thinness,phrases}/hits.md` and `no-hits.md`, plus corpus prose under `behavior/fixtures/textlint-rules/corpus/`.

## Carried-forward open issues (scope decision needed)

From the hand-off: emotion/personification passages (`Anger moved between them...`), unwanted cadence findings in chronologies and verse, body-action findings on technical explanations, literal `on the nose`, escaped-Markdown range mapping, stale preservation records. None are touched by the proposals above.
