# Gate generalization, items 6, 7, 8

## Summary

Item 6 narrows the shared implementation-summary guard to technical tokens plus two structural signals (a possessive proper name, a passive location such as "documented in"), dropping body/key/page/source/table/numbers/contract/commands/returned/slide/physics/audit/checklist. demonstrative-emphasis caps the first predicate clause of a definite copular sentence at five words unless the subject is a discourse noun. Item 7 turns observer-guidance exact literals into prefix matches with a where-bridge grammar (quantified plural human subjects and stall verbs; abstract noun and arrival verb). Item 8 turns empty-emphasis into a deictic, qualifier, referent, adverb, emphatic-verb grammar with a wider virtue-label list.

## Decisions

- A colon payoff does not count as concrete: "the fun part is: ..." and "The missing layer is page judgment: ..." are frames. The latter moved from no-hits to hits on that basis, matching approved hits of the same shape.
- Guard consumers over the full corpus (baseline 0.2.39, so items 1 and 3 are included): human demonstrative-emphasis -170 (encyclopedic "The nucleus is the largest cellular organelle in animal cells." class removed by the predicate cap) and +44 (technical-doc sentences such as "This option is provided as a special case." that the removed tokens used to veto); generic-signposting +30 of which about 15 come from item 3; lesson-framing +4; boilerplate-conclusion +1. AI-suspected: demonstrative-emphasis -54 +16, generic-signposting +60, lesson-framing +9.
- Items 7 and 8 over the full corpus: human +0; ai-suspected observer-guidance +11 ("This is where the magic happens." four times, "This is where most beginners get trapped.") and empty-emphasis +7 ("That distinction matters." six times, "That is growth."); ai-generated observer-guidance +2.
- Two controls I added first raised the no-hit document over the demonstrative-emphasis document threshold and were swapped for non-demonstrative controls rather than approving latent findings.
- Four previously approved no-hit false positives disappeared ("The dashboard is the screen mounted on the west wall.", "The index is the numbered list at the back of the book.", "The pipeline is the steel pipe that carries water to the tank.", "The Stripe dashboard is the product.").

## Verification

- All 22 suites match; validate passes. 9 hits and 3 no-hits added for items 7 and 8 with corpus prose.

## Next steps

Items 9 (universalizing-claims), 10 (uncited-authority), 11 (demonstrative threshold), 12 (correction guard), 13 (boilerplate openers), 14 (superficial-analysis), 15 (quietly minimum).
