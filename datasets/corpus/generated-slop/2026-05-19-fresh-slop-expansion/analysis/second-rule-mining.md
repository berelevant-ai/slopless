# Second rule mining

## Inputs

- Current code state: `e332ab1`.
- Fresh corpus root: `new-corpus/2026-05-19-fresh-slop-expansion`.
- Results file used during mining: `.tmp-rule-mining/fresh-edge-results-second-pass.json`.

## Candidate files updated

- Added 12 `academic-slop` hit candidates and 7 no-hit controls.
- Added 13 `phrases` hit candidates and 8 no-hit controls.
- Added 15 `semantic-thinness` hit candidates and 8 no-hit controls.
- Added 13 `syntactic-patterns` hit candidates and 7 no-hit controls.
- Added 5 `words` hit candidates and 6 no-hit controls.

## Direct-family coverage after candidate update

- `academic-slop`: 132 hit blocks, 70 direct-hit blocks, 178 direct findings, 0 direct no-hit findings.
- `phrases`: 149 hit blocks, 72 direct-hit blocks, 92 direct findings, 0 direct no-hit findings.
- `semantic-thinness`: 159 hit blocks, 66 direct-hit blocks, 66 direct findings, 0 direct no-hit findings.
- `syntactic-patterns`: 157 hit blocks, 100 direct-hit blocks, 106 direct findings, 0 direct no-hit findings.
- `words`: 144 hit blocks, 84 direct-hit blocks, 139 direct findings, 0 direct no-hit findings.

The added no-hit controls are clean for their direct families.

## Expansion 1: corporate phrase formulas

Family: `phrases`.

New candidate shapes:

- `Taken together, these signals tell a bigger story about...`
- `As we move forward, we must continue to center...`
- `Looking ahead, the next chapter will require...`
- `new era of customer-centric innovation`
- `best-in-class solution for next-generation growth`
- `leverages synergies across the value chain`
- `operationalize learnings across the enterprise`
- `pressure-testing the north-star narrative`
- `move the needle by activating the right levers`
- `flywheel of trust, engagement, and measurable impact`
- `future-proof the experience for the AI-native customer journey`
- `meet users where they are with authentic storytelling`

Implementation direction:

- Add literal corporate phrases for high-signal noun compounds:
  - `customer-centric innovation`
  - `cross-functional stakeholders`
  - `best-in-class solution`
  - `next-generation growth`
  - `value chain`
  - `operationalize learnings`
  - `north-star narrative`
  - `move the needle`
  - `activate the right levers`
  - `flywheel of trust`
  - `future-proof the experience`
  - `AI-native customer journey`
  - `authentic storytelling`
- Add phrase-template patterns for lead-ins:
  - `taken together {deicticSubject} {summaryVerb} {biggerStory}`
  - `as we move forward {subject} must continue to {softCorporateVerb}`
  - `looking ahead {futureSubject} will require {abstractList}`

False-positive controls:

- Literal looking ahead through a windshield.
- Literal pressure-test of a valve.
- Literal compass needle, mechanical lever, and flywheel.
- Literal next-generation CPU support.
- Coordinate-system use of `customer-centric`.

## Expansion 2: abstract agency and empty personification

Family: `semantic-thinness`.

New candidate shapes:

- `The data was whispering that...`
- `The market was asking for...`
- `The product knew it needed to...`
- `The silence in the dashboard said...`
- `The roadmap stopped being a plan and started becoming...`
- `Something opens when...`
- `The answer was always closer than...`
- `The body becomes the map...`
- `Hope pooled at the edges of...`
- `Clarity entered the conversation like...`
- `The path forward is obvious once...`
- `The real opportunity is to let the work teach us...`

Implementation direction:

- Extend `abstract-agency-personification` with more abstract-agent subjects:
  - `data`, `market`, `product`, `dashboard`, `roadmap`, `answer`, `body`, `path forward`, `real opportunity`.
- Add templates for abstract speech/cognition:
  - `{abstractAgent} was {speechVerb} that {emptyInstitutionalClaim}`
  - `{abstractAgent} was asking for {softAnswer}`
  - `{abstractAgent} knew it needed to {identityChange}`
  - `{abstractSilence} in {technicalSurface} said {emptyComparison}`
- Add templates for empty emergence:
  - `something opens when {softCondition}`
  - `{pathSubject} is obvious once {abstractObstacle} is no longer allowed to lead`
  - `{opportunitySubject} is to let {abstractWork} teach us what {abstractWork} is`
- Extend body-wisdom templates separately:
  - `{bodySubject} becomes the map when {mindSubject} is still {abstractMotion}`
  - `{cellsSubject} recognize the difference between {abstractState} and {abstractState}`

False-positive controls:

- Literal market procurement.
- Product telemetry and timers.
- Dashboard metrics with numeric evidence.
- Roadmap documents with named owners or tasks.
- Biological cells under microscopy.
- Body maps as literal diagrams.
- Numeric answer comparisons.
- Conversation transcripts.

## Expansion 3: syntactic slop formulas

Family: `syntactic-patterns`.

New candidate shapes:

- `In a world where X, Y becomes the real advantage.`
- `If we want better outcomes, we need better conversations.`
- `If we care about impact, we have to care about conditions...`
- `This is the moment to choose X over Y.`
- `It is a simple idea with profound implications.`
- `Better X create better Y.`
- `X is not Y; it is Z.`
- `Execution is not activity; it is intention made visible.`

Implementation direction:

- Add a lead-in formula rule or extend existing lead-ins:
  - `in a world where {abstractCondition} {abstractSubject} becomes {emptyAdvantage}`
- Add an `if-we-want-we-need` formula:
  - `if we want {abstractOutcome} we need {abstractMeans}`
  - `if we care about {abstractValue} we have to care about {abstractCondition}`
- Add aphorism templates:
  - `better {abstractPlural} create better {abstractPlural}`
  - `{abstractSubject} is not {abstractNoun} it is {abstractDefinition}`
  - `{abstractSubject} is not {abstractNoun} it is {abstractNoun} made {thinAdjective}`

False-positive controls:

- World-map sentence.
- Server conditionals.
- Battery/range causal test.
- Database/repository factual correction.
- Physics worksheet definitions.
- Contract clause definitions.

## Expansion 4: academic formula frames

Family: `academic-slop`.

New candidate shapes:

- `provides a comprehensive overview of the evolving discourse surrounding...`
- `serves as a key driver of meaningful change...`
- `offers a robust pathway for understanding the shifting contours of...`
- `highlights the importance of centering...`
- `emerges as a critical touchstone for reimagining...`
- `illuminates the ways in which...`
- `profound implications for researchers seeking to bridge theory and practice`
- `reveals a tapestry of perspectives...`
- `fertile ground for rethinking...`
- `broader ecology of knowledge exchange`
- `gestures toward a more expansive understanding...`
- `essential dimension of academic praxis`

Implementation direction:

- Extend `academic-formula-frames` with templates:
  - `the {paperNoun} provides a comprehensive overview of {discourseObject}`
  - `{evidenceNoun} suggests that {abstractActor} serves as a key driver of {abstractChange}`
  - `{frameworkNoun} offers a robust pathway for understanding {contourObject}`
  - `the {discussionNoun} highlights the importance of centering {academicObject}`
  - `{abstractConcept} emerges as a critical touchstone for {academicGerund}`
  - `{paperNoun} illuminates the ways in which {academicActor} {academicVerb} {abstractObject}`
  - `{insightNoun} have profound implications for {scholarNoun} seeking to bridge theory and practice`
  - `{paperNoun} gestures toward a more expansive understanding of {academicObject}`
- Add a small literal academic phrase list only for compounds that are already academic cliches:
  - `fertile ground`
  - `broader ecology`
  - `academic praxis`
  - `bridge theory and practice`

False-positive controls:

- Survey instrument, codebook, and response counts.
- Battery failure evidence.
- Software framework route.
- Consent script section references.
- Policy actor filing counts.
- Database query and inclusion criteria.
- Quoted examples of bad academic prose.

## Expansion 5: vocabulary density

Family: `words`.

New candidate vocabulary:

- `intentional`
- `authentic`
- `stakeholders`
- `operationalize`
- `learnings`
- `value chain`
- `customer-centric`
- `next-generation`
- `AI-native`
- `synergies`
- `future-proof`
- `engagement`

Implementation direction:

- Keep these in density-only detection.
- Do not add them to one-to-one `llm-vocabulary`.
- Add contextual allows before widening:
  - `stakeholders` in contracts, governance, and voting rights.
  - `operationalize` when a lesson plan asks for the definition.
  - `value chain` in supply-chain descriptions.
  - `AI-native` in file-format or metadata descriptions.
  - `authentic` for materials such as shellac, documents, or signatures.
  - `sustainable` in measured resource reports.

## Not actionable from this pass

- `metrics`: many generated blocks are too short or too long by construction. The useful decision is fixture shape, not rule design.
- `orthography`: remaining major candidate is spaced em dash behavior, explicitly excluded for now.
- `term-policy`: generic generated corpus cannot meaningfully exercise configured term policy without project-specific required/recommended terms.
