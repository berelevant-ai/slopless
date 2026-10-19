# Semantic thinness

Flag constructions that announce meaning, change, importance, emotion, or action while replacing the information that would make the claim useful. Ask what the reader learns: what changed, what was discovered, what should happen, or why it matters.

Find every case of the principles below, including unseen paraphrases, synonyms, subjects, tenses, and sentence structures. The highlighted examples illustrate defects; they are examples of general constructions, not a list of exact strings to match. Judge every claim in the paragraph. Return yes if any claim qualifies.

## Empty conclusions

A lesson, answer, promise, or task is announced while its specific content stays unstated.

- Hit: **The answer is consistency.**
- Hit: **That is the real promise.**
- Hit: **The real work begins.**
- No hit: The fix is to initialize the parser before reading offsets.

## Abstract contrasts and equations

Labels are opposed or equated as if that explains a practical difference or relationship.

- Hit: **The point is not control. The point is repair.**
- Hit: **The dashboard is the decision.**
- No hit: The bug is not in the parser. It is in the offset mapper.
- No hit: The feed is the product catalog uploaded to S3.

## Unsupported importance

Importance, prestige, or impact is asserted without an identified outcome or supporting comparison. Naming an audience supplies no consequence.

- Hit: The agreement **marks a pivotal turning point for the evolving industry**.
- Hit: **That matters when marketing leaders choose what to do next.**
- No hit: The report demonstrates that revenue rose 14 percent after the strategy changed.

## Unspecified change

A state or difficulty changes, but the changed property, cause, or consequence stays unspecified.

- Hit: **Everything changed.**
- Hit: **The work became more complicated.**
- No hit: The work became more complicated because the API added pagination.

## Personification and atmosphere

An abstraction or place receives understanding, intention, or emotional weight instead of a described event or behavior.

- Hit: The **room seemed to understand** that **something important was beginning to shift**.
- Hit: The **silence became heavy**.
- No hit: The room sensor reported that occupancy increased after the doors opened.
- No hit: The room was quiet enough to hear the loose hinge scrape.

## Emotion and realization shortcuts

Emotion becomes a moving substance, or knowledge is announced while the discovery, thought, or triggering event stays unstated.

- Hit: **Relief washed over Cassia.**
- Hit: **She realized the truth.**
- Hit: **The body knows what it knows.**
- No hit: Her chest hurt because the harness strap had twisted under her arm.
- No hit: She realized the router was still using the old DNS record.

## Filler action and looking

A generic physical or viewing beat replaces a concrete observation, goal, object, cause, or result.

- Hit: **His eyes moved from the shadows to the rooftops.**
- Hit: The group **waited quietly**.
- No hit: She looked under the bench for the missing badge.

## Circular meaning and empty measurement

An explanation repeats its original abstraction, or announces quantification while leaving the measurement and result unstated.

- Hit: This moment **matters because it invites us to rethink what matters**.
- Hit: The report **just put a number on it**.
- No hit: The report just put a number on it: 42%.

## Stock wrappers

- Hit: The **solution is boring**: move copy into raw HTML. The instruction leaves the boring-solution wrapper intact.
- No hit: The movie is boring.
- Hit: The **rest of the drill was a blur**. Fog replaces the event sequence.
- No hit: The blur in the photo came from a cracked lens.
- Hit: The courtyard **smelled of disturbed dust and old ash instead of hot metal**. The stacked scent contrast supplies no source.
- No hit: The courtyard smelled of ash because the kiln had cracked during firing.

## Decision boundary

Preserve claims whose context supplies the missing fact, mechanism, observation, or consequence. A name, number, or technical word elsewhere in the paragraph helps only when it explains the targeted claim. Evaluate each claim separately.
