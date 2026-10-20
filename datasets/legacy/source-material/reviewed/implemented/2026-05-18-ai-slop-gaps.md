# Implemented: AI Slop Gap Batch

This file archives candidates from `legacy/source-material/expansion-2026-05-18/` that were implemented in Slopless on 2026-05-18.

The raw source files stay in place for provenance. These candidate groups should not remain in the active implementation queue.

## Implemented Candidate Groups

### Assistant leakage and chat scaffold

Source candidate files:

- `ai-slop/derived/high-confidence-deterministic-candidates.json`
- `rule-libraries/derived/high-confidence-candidates.json`

Implemented in:

- `src/rules/phrases/llm-disclaimer.ts`
- `src/rules/phrases/data/llm-disclaimer-expansions.json`
- `src/rules/syntactic-patterns/llm-artifacts/response-wrapper.ts`
- `src/rules/syntactic-patterns/llm-artifacts/data/response-wrapper-patterns.json`
- `src/rules/syntactic-patterns/lead-ins/llm-openers.ts`

Implemented forms:

- `as an ai`
- `as a language model`
- `i cannot browse`
- `up to my last training`
- `as of my last cutoff`
- `my knowledge cutoff is`
- `my last knowledge update was`
- `would you like me to`
- `if you'd like, i can`
- `here are a few options`
- `here are some options`
- `great question`
- `certainly`
- `let me know if you have any questions`
- `let me know if you have any further questions`
- `let me know if you have any other questions`

Fixture coverage:

- `behavior/fixtures/textlint-rules/cases/phrases/hits.md`
- `behavior/fixtures/textlint-rules/cases/phrases/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`

### Hidden Unicode controls

Source candidate files:

- `ai-slop/derived/high-confidence-deterministic-candidates.json`

Implemented in:

- `src/rules/orthography/hidden-unicode-controls.ts`
- `src/registries/orthography.ts`
- `src/presets/everything.ts`

Implemented character set:

- U+00AD SOFT HYPHEN
- U+200B ZERO WIDTH SPACE
- U+200C ZERO WIDTH NON-JOINER
- U+200D ZERO WIDTH JOINER
- U+200E LEFT-TO-RIGHT MARK
- U+200F RIGHT-TO-LEFT MARK
- U+202A LEFT-TO-RIGHT EMBEDDING
- U+202B RIGHT-TO-LEFT EMBEDDING
- U+202C POP DIRECTIONAL FORMATTING
- U+202D LEFT-TO-RIGHT OVERRIDE
- U+202E RIGHT-TO-LEFT OVERRIDE
- U+2060 WORD JOINER
- U+2066 LEFT-TO-RIGHT ISOLATE
- U+2067 RIGHT-TO-LEFT ISOLATE
- U+2068 FIRST STRONG ISOLATE
- U+2069 POP DIRECTIONAL ISOLATE
- U+FEFF ZERO WIDTH NO-BREAK SPACE

Fixture coverage:

- `behavior/fixtures/textlint-rules/cases/orthography/hits.md`
- `behavior/fixtures/textlint-rules/cases/orthography/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`

### Negative-pivot formulas

Source candidate files:

- `ai-slop/derived/high-confidence-deterministic-candidates.json`
- `rule-libraries/derived/high-confidence-candidates.json`

Implemented in:

- `src/rules/syntactic-patterns/contrast/negation-reframe.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
- `src/rules/syntactic-patterns/contrast/private/negative-slop-frames.ts`

Implemented forms:

- `not only X`
- `not merely X`
- `not just X`
- `no longer just X`
- `X is not the problem. Y is.`
- `The problem is not X. Y is.`
- `Not because X. Because Y.`

Fixture coverage:

- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`

### Generic LLM openers

Source candidate files:

- `ai-slop/derived/high-confidence-deterministic-candidates.json`
- `rule-libraries/derived/high-confidence-candidates.json`

Implemented in:

- `src/rules/syntactic-patterns/lead-ins/llm-openers.ts`

Implemented forms:

- `in today's fast-paced world`
- `in today's digital age`
- `in the ever-evolving landscape`
- `in the realm of`
- `in the world of`

Fixture coverage:

- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`

## Still Active After This Batch

The active queue remains in:

- `legacy/source-material/reviewed/deferred/remaining-candidates.md`

Do not re-queue the implemented groups above unless new source material adds a distinct bounded pattern that is not covered by these rules.
