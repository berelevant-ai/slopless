# Over-tightened gates: candidates for further generalization

## Goal

List detectors whose recognition is narrower than the slop they target, ranked by expected catch gain per false-positive risk, for a scope decision. Verified against source at main `c386ff4` (0.2.39). No code changed.

## Ranked candidates

1. `lesson-framing` (`lead-ins/lesson-framing.ts`): five exact literals plus a fixed-position `the {noun} is {cue}` frame, present tense only. Escapes: `The takeaway here is clear.`, `The lesson was clear.`, `The fix is usually boring.` Expansion: `the [modifier] {lesson|takeaway|fix|answer|move|point} [here|for me] {is|was|remains} [usually|often] {clear|simple|boring|plain|small}`. Risk: low; the frame nouns are already the rule's vocabulary.

2. `summative-closer` (`closers/summative-closer.ts`): no leading-prefix stripping, and one bare `when `, `if `, `with `, `by ` or any digit anywhere vetoes the sentence. Escapes: `Ultimately, in conclusion, ...`, `The bottom line is that teams ship faster when they cut scope.` Expansion: strip the shared prefixes; restrict the veto to a colon or a digit adjacent to a unit. Risk: low to medium; `because` after the frame is a real explanation and should stay a veto.

3. `generic-signposting` question and answer arms: 21 literals. Escapes: `The right question is ...`, `A better question is ...`, `The real question here is ...`, `The honest answer is simple.` Expansion: `{the|a} {real|better|right|honest|useful|practical|obvious|interesting|harder} {question|answer|conclusion|move|point}[s] [here] {is|are|was|becomes}`. Risk: low; same shape as the existing evaluative frame matcher.

4. `emotion-telling` (`narrative-slop/emotion-telling.ts`): subject must be token 0 in `he/i/she/they/we` or capitalized, verb must be `felt/was/were` at token 1, and the emotion word must end the sentence; 15 emotion words. Escapes: `She was afraid of the audit.`, `I feel nervous.`, `You were scared.`, `She was anxious.` Expansion: allow `you`, present tense, a short trailing prepositional phrase, and a sourced emotion list (WordNet feeling nouns and adjectives already extracted for narrative-slop). Risk: medium; keep the concrete-object veto for `afraid of the dog bite`.

5. `false-question` (`closers/false-question.ts`): five literals, contraction `isn't` only, section-last-sentence only. Escapes: `Is that not the point?`, `Isn't that the whole point?`, `Aren't those the goals?` Expansion: `{isn't|is not|aren't|wasn't} {that|this|it|those|these} [the] [whole|real|entire] {point|goal|idea|question|lesson}` on any sentence ending with `?`. Risk: low.

6. Shared guard `hasConcreteImplementationSummary` (`shared/matchers/concrete-evidence.ts`): one of `body`, `key`, `page`, `source`, `table`, `numbers`, `contract`, `commands`, `returned`, `slide`, `physics`, or any digit vetoes the whole sentence in seven rules. Escapes: `The lesson here is clear: the body of the page matters.`, `In 2024 the takeaway is clear.` Expansion: require the token plus a verb or a number, or drop the most generic entries, per rule. Risk: medium; this guard is what keeps technical prose quiet, so change it rule by rule with the fixture suite as the check.

7. `observer-guidance` exact-sentence arms: the sentence must equal the literal. Escapes: `You see it everywhere now, especially in onboarding.`, `This is where teams get stuck.` Expansion: anchored prefix plus a five-noun subject list widened to any plural human or team noun. Risk: low.

8. `empty-emphasis` (`repetition/empty-emphasis.ts`): every arm pins an exact token count (3, 4, 5, or 6) and literal tokens; referents are `part` and `bit`; the virtue label is only `discipline`. Escapes: `That part really matters.`, `This is patience.` Expansion: optional adverb slot, referents `detail|piece|moment|step`, virtue list. Risk: low; the rule is already document-scoped.

9. `universalizing-claims`: 24 subject n-grams at token 0, verbs in a four-token window, no `believe/think/need/understand`. Escapes: `Every parent wants clarity.`, `All of us want clarity.`, `Most teams believe this works.` Expansion: `{most|every|all|no} [of {us|them}] {people|parents|teams|leaders|readers|buyers|...}` plus a wider verb list. Risk: medium; keep the vague-quantifier plus abstract-noun arm removed.

10. `uncited-authority`: eight-token minimum, any parenthesis counts as a citation, any digit vetoes, authority phrase must open the sentence. Escapes: `Research shows sleep matters.`, `Experts agree that 8 hours is ideal.`, `Recent studies show ...`. Expansion: drop the length floor, treat only `(Author, year)` or a link as a citation, allow one or two modifiers before the authority noun. Risk: medium for the digit change (numbers are often the evidence), low for the rest.

11. `demonstrative-emphasis`: 12-token cap, sentence-final verb only within 5 tokens, and the document threshold needs three detections. Escapes: any document with one or two `That matters.` lines. Expansion: report at two; keep the cap. Risk: medium; this is the rule most likely to touch ordinary prose, so measure on the human corpus first.

12. Shared guard `hasConcreteCorrectionEvidence`: `code`, `red`, `closed`, `exit`, `audit`, `package`, `patient`, `api`, `server` veto five contrast matchers. Escape: `It's not about the code. It's about the craft.` Expansion: require two correction tokens, or a token plus a digit. Risk: medium.

13. `boilerplate-framing` filler openers: 33 literals, and the reflective opener is vetoed by any capitalized token. Escapes: `To be perfectly clear, ...`, `Make no mistake, ...`, `At the end of the day, ...`, `The reality is ...`, `I keep coming back to what Slack taught us.` Expansion: allow one adverb inside `to be [perfectly|completely] {clear|honest|blunt}`, add the missing openers, and veto only capitalized tokens directly after `to` (place names) rather than anywhere. Risk: low.

14. `superficial-analysis`: verb must be a gerund from a 28-item list right after a comma or semicolon. Escapes: `... and reflects the region's enduring cultural significance.`, `..., which underscores its lasting legacy.` Expansion: finite forms and `which` relative clauses using the same verb stems. Risk: low; the significance-noun requirement stays.

15. `quietly-overuse` and siblings: minimum four occurrences before any rate check, while `actually-overuse` reports at two. Escape: three `quietly` in a 500-word post. Expansion: minimum two with the per-1,000 rate unchanged. Risk: low; the rate still gates.

Also small: `affirmation-closers` (two contraction-only literals, six-token cap), `hedge-stacking` (missing `could`, `may`, `somewhat`, `arguably`, `tend`, `roughly`), `humble-bragger` (two openers), `empty-beat` duration pause pinned to tokens 1 to 4.

## Guards to keep

Concrete markers (backticks, URLs, ticket ids, dotted identifiers), digit-plus-unit evidence, quoted-segment stripping, the `as such` and `in my experience` removals, the `when it comes to` opener anchoring, the two-word floor on weak meta-context words, and the two-hit floor in `simplicity`. Each blocks a large class of ordinary technical writing with one precise test rather than a common noun.

## Suggested order

Groups 1, 3, 5, 7, 8, 13, 14, 15 are list-to-grammar rewrites with low risk and can ship together with fixture and generated-set checks. Groups 2, 4, 9, 10 need a human-corpus slice review. Groups 6, 11, 12 change shared guards or thresholds and need the full human run.
