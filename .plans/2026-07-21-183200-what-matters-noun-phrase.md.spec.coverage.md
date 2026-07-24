# What matters noun-phrase coverage

## Goal

- Fixture3 verifies noun-phrase and list findings through public Slopless output.
- Fixture3 verifies factual clause complements through the same public output.

## Approach

- The source content block requires the existing matcher to own the added grammar.
- Hit content requires article, possessive, numeric-determiner, bare-noun, gerund, infinitive, technical-noun, measured-noun, number-plus-noun, and numeric-answer variants.
- No-hit content covers every excluded clause starter, including `whether`, `that`, `how`, `which`, `who`, `whose`, `what`, `when`, `where`, `why`, and `if`.
- Fixture3 owns finding ranges, messages, and interactions with every enabled rule.

## Key decisions

- The tree check forbids a separate rule module.
- Registry, package, and root export checks forbid a new public rule ID.
- The source content block limits the broad complement boundary to `What matters is`.
- The frame bypasses the generic concrete-implementation filter without changing that shared filter for other rules.

## Files to modify

- Specular requires the existing matcher and both public case files.
- Fixture3 verifies and stores the reviewed syntactic-pattern output.
