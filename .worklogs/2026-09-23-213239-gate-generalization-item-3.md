# Gate generalization, item 3: evaluative question and answer frames

## Summary

`generic-signposting` now recognizes `{determiner} {evaluative adjective} {frame noun, singular or plural} [locator] {linking verb}` instead of the four-token `the {adj} {noun} is` shape plus literal lists. The matcher moved to `lead-ins/private/evaluative-frame.ts` to keep `discourse-evaluation.ts` under the line limit.

## Decisions

- Full corpus (baseline 0.2.39 vs candidate): human +15 on 21.3M words, ai-suspected +33 on 1.58M, ai-generated +2, nothing removed. The reviewer accepted the 15 human additions as is; about ten are technical explanations with a concrete `that` clause (PEP, MDN, Wikipedia) and a code-identifier veto was offered but not applied.
- Adjectives added: actual, correct, deeper, hard, harder, interesting, key, right, sharper, smarter, tricky, uncomfortable, underlying, wrong. Determiners: a, an, this, that, my, our, your. Locators: here, there, now, for me, for us, for you, in practice. Verbs: is, are, was, were, isn't, becomes, remains.
- The occasion pattern from the draft-driven commit was re-measured after limiting it to matter/count/stick: human +0, ai-suspected +20, ai-generated +1.

## Verification

- Fixture suite: 5 hit and 3 no-hit cases added with corpus prose; 0 findings on no-hit passages; all suites match; validate passes.

## Next steps

Item 4: emotion-telling subject, tense, and complement generalization.
