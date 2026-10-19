# Semantic-thinness decision

Does the target contain an empty rhetorical construction or filler narrative beat? Return yes when any clause satisfies a target below. Find every equivalent construction, including unseen subjects, synonyms, inflections, and sentence arrangements. Bold identifies the defective span; examples demonstrate principles rather than exact strings.

## Decision Boundary

- YES: A target construction substitutes an unspecified lesson, effect, metaphor, emotion, or movement for the information it promises. A removable rhetorical wrapper also qualifies when useful information follows it.
- NO: A specific cause, observed property, result, search goal, comparison, or literal operation resolves the apparent target. Preserve attributed evaluations and quotations discussed as someone else's wording.
- An explanation protects the claim it explains. A name, date, number, technical noun, or causal connector elsewhere supplies no blanket exemption.
- Use adjacent article context to resolve a reference or supply a stated lesson. Judge isolated fixture cases independently. Preserve a summary whose substantive claim is already stated.
- Introductory time/place phrases and scope modifiers leave an empty construction intact. An affected object alone leaves its changed property unspecified.
- Distinguish missing information from disagreement: classify the construction and its supplied detail, rather than judging whether its factual claim is correct.

## Empty Interpretation

A lesson, realization, truth, promise, or new task is announced while its content stays unstated. Calling the answer simple, honest, different, or undramatic supplies no answer.

- Hit: **The truth is not dramatic.**
- Hit: **That is a different job.**
- Hit: **She realized the truth.**
- No hit: She realized the router was still using the old DNS record.
- No hit: The real work began at eight thirty with the masonry crew.

## Unsupported Significance

Importance, prestige, or impact replaces the consequence or evidence. An audience, witness, occasion, or broad time span leaves the effect unspecified. A bounded historical comparison or attributed opinion supplies its own meaning.

- Hit: **I've seen that difference shape what a client wanted to work on.**
- Hit: **The difference matters for anyone who reads the brief.**
- Hit: The discovery **sets the stage for a new chapter of transformative growth**.
- No hit: The 1918 armistice was unprecedented in the regiment's records.
- No hit: The 2025 audit called the platform a visionary approach to education.

## Abstract Contrasts And Metaphors

Abstract labels, role equations, personification, or machinery/layer metaphors stand in for the actual relationship, missing artifact, or operation. Naming a technical subject leaves its metaphor unexplained.

- Hit: **The point is not control. The point is repair.**
- Hit: The **page cannot outsource its answer to metadata**.
- Hit: **AI Overviews add another layer to the diagnosis.**
- Hit: **The body knows what it knows.**
- No hit: The bug is not in the parser. It is in the offset mapper.
- No hit: The feed is the product catalog uploaded to S3.

## Vague Change And Measurement

Change, difficulty, cost, or quantification is announced without the changed property, obstacle, expense, or result. Literal record processing, before/after states, and physical numbering remain concrete operations.

- Hit: **Everything changed.**
- Hit: **All of that gets expensive when nobody knows which problem they are solving.**
- Hit: The report **just put a number on it**.
- No hit: The industry has quietly changed from annual contracts to monthly plans.
- No hit: The shift transformed 400 records per second.
- No hit: The technician just put a number on it because the sample needed an anonymous label.
- No hit: The report just put a number on it: 42%.

## Filler Scene And Emotion

Bare scene states, generic pauses, gaze paths, bodily reactions, and emotions moving like substances replace an observation or consequential action. A specific physical cause, emotional trigger, search purpose, or described event protects the beat. Plausibility alone leaves a bare filler beat unchanged.

- Hit: **The yard was empty.**
- Hit: **Her chest felt a sudden heavy thump.**
- Hit: **Relief washed over Cassia.**
- Hit: **His eyes moved from the shadows to the rooftops.**
- No hit: Her eyes moved from the shadows to the rooftops, searching for the lantern signal.
- No hit: Doubt entered the room after the auditor found two missing signatures.

## Removable Wrappers And Decorative Substitutions

Calling a solution, method, plan, or strategy boring is a stock wrapper, even before a concrete instruction. This target requires a solution-like subject; ordinary dullness judgments about entertainment, documents, events, processes, or written regulations are clean.

- Hit: The **practical plan is boring**: remove the redirect chain.
- Hit: **This check is boring, fast, and easy to prove in less than five minutes.**
- No hit: The audit is boring.
- No hit: The movie is boring.
- No hit: The report is boring.
- No hit: The lesson was simple: rotate the signing key every 30 days.

Also flag recursive meaning, event sequences replaced by fog, and stock scene images or stacked scent contrasts without their source or cause.

- Hit: This moment **matters because it invites us to rethink what matters**.
- Hit: The **rest of the drill was a blur**.
- Hit: The courtyard **smelled of disturbed dust and old ash instead of hot metal**.
- No hit: The blur in the photo came from a cracked lens.
