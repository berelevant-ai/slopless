# Next rule mining

## Inputs

- Current code state: `d2e70e1`.
- Fresh corpus root: `new-corpus/2026-05-19-fresh-slop-expansion`.
- Results file used during mining: `.tmp-rule-mining/fresh-results.json`.

## Current rule output on fresh corpus

- Total findings: 2,122.
- Top finding rules:
  - `triple-repeat`: 425.
  - `negation-reframe`: 245.
  - `academic-boilerplate`: 166.
  - `paragraph-length`: 152.
  - `prohibited-words`: 126.
  - `word-repetition`: 114.
  - `semantic-thinness`: 104.
  - `perception-verb-density`: 93.
  - `body-action-density`: 90.
  - `repeated-sentence-starts`: 77.
  - `demonstrative-emphasis`: 69.
  - `fragment-stacking`: 69.
  - `llm-vocabulary`: 68.
  - `prohibited-phrases`: 42.

## Direct-family coverage

- `academic-slop`: 120 hit blocks, 178 direct findings, 50 missed hit blocks, 0 direct no-hit findings.
- `metrics`: 140 hit blocks, 76 direct findings, 68 missed hit blocks, 0 direct no-hit findings.
- `narrative-slop`: 140 hit blocks, 151 direct findings, 49 missed hit blocks, 0 direct no-hit findings.
- `orthography`: 140 hit blocks, 90 direct findings, 50 missed hit blocks, 0 direct no-hit findings.
- `phrases`: 136 hit blocks, 54 direct findings, 89 missed hit blocks, 0 direct no-hit findings.
- `semantic-thinness`: 144 hit blocks, 63 direct findings, 81 missed hit blocks, 0 direct no-hit findings.
- `syntactic-patterns`: 144 hit blocks, 104 direct findings, 46 missed hit blocks, 0 direct no-hit findings.
- `term-policy`: 120 hit blocks, 3 direct findings, 119 missed hit blocks, 0 direct no-hit findings.
- `words`: 139 hit blocks, 129 direct findings, 65 missed hit blocks, 0 direct no-hit findings.

Direct-family no-hit controls are clean. Cross-family findings still exist in some no-hit files and should be reviewed before broad widening.

## Candidate 1: academic formula frames

Family: `academic-slop`.

Current gap:

- Existing `academic-boilerplate` catches literal noun phrases.
- Missed academic slop is often a sentence frame, not a fixed phrase.

Examples:

- `The paper contributes a fresh perspective to the ongoing dialogue about pedagogical innovation.`
- `The findings indicate that mentorship can unlock new forms of academic belonging.`
- `The article situates these practices within a broader matrix of institutional change.`
- `The study offers a roadmap for scholars seeking to navigate the complexities of interdisciplinary work.`
- `The discussion reveals how meaning-making practices shape the contours of student success.`
- `The study reveals the potential of cross-sector partnerships to catalyze systemic transformation.`

Implementation:

- Add `academic-slop:academic-formula-frames`.
- Use token templates, not exact sentence strings.
- Candidate templates:
  - `the {paperNoun} contributes {article} {valueNoun} to {article} {discourseNoun} about {academicObject}`
  - `the {findingNoun} indicate that {abstractActor} can {enableVerb} {abstractOutcome}`
  - `the {paperNoun} situates {academicObject} within {article} broader {matrixNoun} of {abstractChange}`
  - `the {paperNoun} offers {article} roadmap for {scholarNoun} seeking to {academicVerb} {complexityNoun}`
  - `the {discussionNoun} reveals how {processNoun} shape the contours of {successNoun}`
- Keep no-hit controls for actual paper results with numbers, named methods, named cohorts, citations, concrete variables, and quoted examples.

Why implementable:

- The bad shape is formulaic.
- Slots are constrained.
- It belongs cleanly in `academic-slop`.

Risk:

- Academic prose can legitimately use `findings indicate`.
- The rule must require multiple abstract slots in the same sentence.

## Candidate 2: corporate phrase formulas

Family: `phrases`.

Current gap:

- Missed phrase slop is multi-word business idiom, not isolated vocabulary.

Examples:

- `This is a game-changer for teams ready to embrace the next horizon.`
- `Our mission is to empower teams to unlock their full potential.`
- `We need to double-click on the opportunity before we socialize the proposal.`
- `This work sits at the intersection of innovation, empathy, and execution.`

Implementation:

- Expand `corporate-speak` and `prohibited-phrases`.
- Add literal phrases:
  - `game-changer`
  - `unlock their full potential`
  - `unlock your full potential`
  - `double-click on`
  - `socialize the proposal`
  - `next horizon`
- Add template:
  - `{subject} sits at the intersection of {abstractNoun}, {abstractNoun}, and {abstractNoun}`

No-hit controls:

- Product names or quoted examples containing the phrases.
- Literal UI instruction to double-click.
- Real intersection of streets, roads, data sets, or geometric objects.
- Socialize as animal behavior or child-development usage.

Why implementable:

- The phrases are stable and common.
- Literal matching with quoted/meta guards should be enough for most of them.

Risk:

- `double-click` has a real UI meaning.
- `intersection of` has many legitimate literal and technical uses.

## Candidate 3: abstract agency and personified institutions

Family: `semantic-thinness`.

Current gap:

- Existing semantic patterns catch many empty abstractions.
- Missed cases personify abstract systems, rooms, brands, strategies, conversations, and clarity.

Examples:

- `The room seemed to understand that something important was beginning to shift.`
- `The strategy wanted to become more honest with itself.`
- `The brand had been waiting for the courage to become what it was always becoming.`
- `The conversation held the team until the next layer of clarity arrived.`
- `The energy around the situation changed.`
- `The meaning of the decision lives in what it makes available.`

Implementation:

- Add `semantic-thinness` pattern group `abstract-agency-personification`.
- Candidate templates:
  - `{abstractAgent} seemed to {humanCognitionVerb} that {emptyChangeFrame}`
  - `{abstractAgent} wanted to become {selfEvaluation}`
  - `{abstractAgent} had been waiting for {abstractCapacity} to {becomingVerb}`
  - `{abstractContainer} held {humanGroup} until {abstractPayoff} arrived`
  - `{abstractPayoff} arrived`
  - `{abstractMeaning} lives in what it {availabilityVerb}`
- Require abstract-agent slots such as `room`, `strategy`, `brand`, `conversation`, `moment`, `system`, `work`, `decision`, `energy`, `clarity`.
- Require abstract payoff slots such as `clarity`, `meaning`, `courage`, `truth`, `possibility`, `alignment`.

No-hit controls:

- Literal rooms with sensors, doors, temperature, occupancy, acoustics, or measurements.
- Strategy documents with named owners and dates.
- Brand as literal livestock mark, trademark record, or product asset.
- Conversation transcripts with speaker names.
- Clarity as optical resolution or recorded audio quality.

Why implementable:

- The bad cases share a narrow grammar: abstract subject plus human cognition/action plus abstract payoff.

Risk:

- `room` can be literal.
- This rule needs concrete-evidence gates like existing semantic patterns.

## Candidate 4: not-because/because balance frame

Family: `syntactic-patterns`.

Current gap:

- `negation-reframe` catches many `not X but Y` frames.
- It does not consistently catch the paired causal formula `Not because X, but because Y`.

Examples:

- `Not because the work is easy, but because the work matters.`
- `Not because the old model was wrong, but because the next model needs to be better.`
- `Not because everyone agrees, but because the direction is becoming clearer.`

Implementation:

- Add a narrow syntactic pattern under `contrast`.
- Candidate template:
  - `not because {clause}, but because {abstractClause}`
- Require the second clause to contain an abstract payoff word:
  - `matters`, `better`, `clearer`, `direction`, `future`, `purpose`, `alignment`, `work`, `change`.

No-hit controls:

- Factual corrections:
  - `Not because the server failed, but because the token expired.`
  - `Not because the sample was contaminated, but because the vial cracked.`
- Quoted examples and detector descriptions.

Why implementable:

- The formula is explicit.
- It can be guarded by abstract payoff vocabulary.

Risk:

- Valid argumentative prose uses this frame.
- Require abstract payoff vocabulary and no concrete technical/medical evidence.

## Candidate 5: same-sentence narrative beat chains

Family: `narrative-slop`.

Current gap:

- Existing density rules catch many paragraph/window clusters.
- Missed cases often pack several weak body/perception/action beats into one sentence.

Examples:

- `Lila's ears twitched, her tail flicked, her eyes narrowed, and the silence around her seemed to lean closer.`
- `She blinked, swallowed, shifted her weight, and glanced at the floor while the air changed in a way no one named.`
- `The captain walked to the rail, looked across the water, looked back at the crew, and let the moment settle on his shoulders.`
- `Her shoulders tensed, her breath slipped out, her fingers brushed the scar, and she looked away.`
- `He blinked, looked down, looked up, and felt the moment settle like dust across his skin.`

Implementation:

- Extend `low-information-beat-density` or add a companion detector inside the same family for same-sentence beat chains.
- Count weak beat tokens inside a sentence.
- Report when one sentence has at least 4 weak beats and lacks concrete object/task evidence.
- Use existing weak beat groups:
  - body cue: `ears`, `tail`, `eyes`, `shoulders`, `breath`, `fingers`, `jaw`, `throat`.
  - generic action: `blinked`, `swallowed`, `shifted`, `looked`, `glanced`, `walked`, `stepped`, `turned`.
  - empty atmosphere: `silence`, `air`, `moment`, `stillness`.

No-hit controls:

- Medical exam sequences.
- Animal behavior observation with measurement or species study.
- Stage direction with blocking purpose.
- Clue-search sequences where each action changes evidence.

Why implementable:

- This is density-based and fits the current reporting architecture.

Risk:

- Young-reader prose uses short concrete action chains.
- The rule needs concrete-object and task-goal gates.

## Candidate 6: spaced em dash

Family: `orthography`.

Current gap:

- `orthography:em-dashes` catches closed em dashes.
- Fresh hits include spaced em dashes used as dramatic pivots.

Examples:

- `The team did not pivot — it became available to a deeper form of progress.`
- `The launch was not delayed — it was learning how to arrive.`
- `The product was not broken — it was asking for a better story.`
- `The meeting ended — but the work had only begun to reveal itself.`

Implementation:

- Broaden `em-dashes` to report any em dash, closed or spaced.
- Message can stay generic: replace em dash with comma, colon, parenthesis, or spaced hyphen.

No-hit controls:

- Quoted style-guide examples.
- Code or diff examples containing em dash.
- Source text that intentionally tests the rule.

Why implementable:

- Repo style already rejects em dashes in prose.
- This is an orthographic policy, not semantic judgment.

Risk:

- It will increase findings in copied source material if that source material is scanned.
- Ignore quoted/meta examples.

## Candidate 7: broad AI vocabulary density expansion

Family: `words`.

Current gap:

- Existing density rule catches some clusters.
- Misses show more broad AI diction around experience, complexity, empowerment, confidence, and value.

Examples:

- `The platform delivers a holistic experience that empowers users to navigate complexity.`
- `The platform delivers a holistic, frictionless experience that empowers users to navigate complexity with confidence.`
- `The initiative is designed to amplify momentum, catalyze change, and create sustainable value.`
- `The product experience should feel elegant, seamless, accessible, and emotionally resonant.`

Implementation:

- Expand `llm-vocabulary-density`, not one-to-one `prohibited-words`.
- Add density terms:
  - `holistic`
  - `empower`
  - `empowers`
  - `empowering`
  - `frictionless`
  - `amplify`
  - `amplifies`
  - `amplifying`
  - `catalyze`
  - `catalyzes`
  - `catalyzing`
  - `confidence`
  - `complexity`
  - `sustainable`
  - `value`
  - `resonant`
- Keep contextual gates from `vocabulary-context.ts`.

No-hit controls:

- Chemistry use of `catalyze`.
- Physics/mechanics use of `frictionless`.
- Sustainability reports with measured emissions or named criteria.
- Confidence intervals.
- Legal value, accounting value, or explicit price value.

Why implementable:

- Density gating avoids single-word false positives.
- We already have contextual gates.

Risk:

- `value`, `confidence`, and `complexity` are common technical words.
- They should only count in density, never one-to-one.

## Candidate 8: metrics case shape only

Family: `metrics`.

Current gap:

- 68 generated metrics hit blocks have no direct metrics finding.
- The examples are slop, but many do not violate current numeric thresholds by themselves.

Examples:

- Long abstract sentences with `meaningful`, `intentional`, `deeper`, `story`, `possibility`, `broader`, and `conditions`.

Implementation:

- Do not widen metrics from this evidence.
- Use these cases as semantic or syntactic candidates instead.
- If metrics needs more coverage, create longer document-shaped cases that intentionally exceed current thresholds.

Why not implement now:

- Metrics should remain numeric readability/structure checks.
- These misses are not evidence of a metrics bug.

## Candidate 9: term-policy case design only

Family: `term-policy`.

Current gap:

- 119 generated term-policy hit blocks have no direct finding.
- Current sidecar config reports document-level policy failure, not one report per block.

Implementation:

- Do not change term-policy rules.
- If we need more term-policy fixture pressure, split policy examples into separate files or add a verifier that checks configured document-level output.

Why not implement now:

- Term-policy is config-driven.
- The misses are from fixture shape, not rule capability.

## Cross-family no-hit pressure to fix before broadening

These are not direct-family failures, but they matter if we move toward stricter "no-hit means no rule should fire" semantics.

- `metrics/no-hits` emits 45 `fragment-stacking` findings.
  - Cause: repeated short simple control sentences.
  - Likely fix: rewrite the no-hit controls or add technical-list guards to `fragment-stacking`.
- `phrases/no-hits` emits word/phrase findings on product-title and quote contexts.
  - Examples include `Seamless` as product title and `tapestry` in phrase discussion.
  - Likely fix: more title/meta guards in word and phrase matchers.
- `words/no-hits` emits `negation-reframe` on:
  - `The chemistry paper uses "catalyze" for the palladium reaction, not for a business change.`
  - Likely fix: extend negation meta/factual guards to quoted target-word discussion.

## Recommended next implementation order

1. Spaced em dash.
   - Smallest implementation.
   - Clear policy.
   - Low ambiguity.
2. Corporate phrase formulas.
   - High value.
   - Mostly literal/template matching.
   - Requires quote/title/literal guards.
3. Same-sentence narrative beat chains.
   - High value for fiction slop.
   - Fits density architecture.
4. Not-because/because balance frame.
   - Clear syntactic formula.
   - Needs concrete factual no-hit controls.
5. Broad AI vocabulary density expansion.
   - Useful, but needs careful no-hit pressure.
6. Academic formula frames.
   - Useful, but should be template-gated to avoid punishing normal academic claim language.
7. Abstract agency/personification.
   - Highest semantic value.
   - Highest false-positive risk.
   - Needs the most adversarial no-hit work.

## Not recommended from this mining pass

- New single-word bans.
- Metrics threshold changes.
- Term-policy behavior changes.
- A new family.
- ML/model-based checks.
