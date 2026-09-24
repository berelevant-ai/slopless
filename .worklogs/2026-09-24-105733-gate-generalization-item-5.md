# Gate generalization, item 5: false-question

## Summary

false-question now matches a grammar (negated or negative-inverted copula, deictic, optional determiner and evaluative, summary noun, or a what/why/how clause) anywhere in a section-final question instead of five contraction-only literals.

## Decisions

- Kept the section-last-sentence scope; the preserved no-hit `Isn't that the goal? The report answers it with churn data.` depends on it.
- Full corpus: zero added or removed on human, ai-suspected, and ai-generated text; the construction is rare outside the fixture material. Three fixture findings relabeled with the new signal text.

## Verification

- 3 hit and 2 no-hit cases added with corpus prose; all suites match; validate passes.

## Next steps

Item 6: shared implementation-summary guard.
