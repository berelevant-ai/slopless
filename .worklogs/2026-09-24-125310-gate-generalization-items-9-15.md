# Gate generalization, items 9 to 15

## Summary

Universalizing subjects, uncited-authority lead-ins, the correction-token guard, honesty openers, finite superficial-analysis forms, and the quietly minimum were generalized. The demonstrative-emphasis document threshold (item 11) was tried at two and reverted to three after the full corpus showed 749 added human findings.

## Decisions

- Item 9 `universalizing-claims`: `[for] {everyone|nobody|we all|all of us|...}` or `{most|many|every|all|no|any} [of] {human group noun}` with a six-token verb window and a wider desire/certainty verb list; a digit vetoes. Full corpus: human +105 (4.9 per million words), ai-suspected +69, ai-generated +17 (49 per million). Government health generalizations ("Most people feel better within a week.") are the main human residue; the reviewer accepted them.
- Item 10 `uncited-authority`: up to four lead-in tokens ("Recent studies show", "A growing body of research shows"), minimum five tokens, parentheses count as a citation only when they hold a digit, more authority phrases. The digit veto was kept because `The evidence suggests that the 12-volt battery failed after 300 cycles.` is a preserved no-hit, so "Experts agree that 8 hours is ideal." still escapes. Human +54, AI +16. `Research shows that children need sleep.` moved from no-hits to hits: it was silent only because of the eight-token floor.
- Item 11: `MAX_PER_DOCUMENT` 1 (report at two lines) added 749 human and 208 AI findings, mostly ordinary statements ("This patent is filed in China."). Reverted to three per document. A proper noun inside a definite subject ("The Stripe dashboard is the product.") and the token `token` now veto, which removed two approved no-hit false positives.
- Item 12 `hasConcreteCorrectionEvidence` needs two correction tokens, or one plus a digit. negation-reframe human +52 (2.4 per million), AI +17 (9.7 per million); the human additions are mostly literary comma contrasts ("such a look, not an angry look").
- Item 13 `boilerplate-framing`: `to be [adverb] {clear|honest|blunt|frank|fair|...}` grammar plus openers (make no mistake, the reality is, the fact is, needless to say, let's face it, as we all know); the reflective-opener place veto now applies only to a capitalized word after to/in/at/from/near. Human +75 ("The fact is, ...", "Needless to say, ...", "To be fair, ..."), AI +27.
- Item 14 `superficial-analysis`: finite verb forms after `and`, `which`, `thereby`, `thus`. Human +20 (Wikipedia "which illustrates the importance of the site"), AI +4.
- Item 15 `quietly-overuse` minimum occurrences 4 to 2: human +7, ai-suspected +16.
- A possessive-name structural guard tried in item 6 was removed here: it vetoed "Google's own requirements offer a useful corrective." (the reviewer's own sample).

## Verification

- 17 hits and 6 no-hits added for items 9 to 14, each behaving as labeled in cases and corpus; all 22 suites match; validate passes. Demonstrative-emphasis full-corpus rerun with the threshold restored is recorded in the next worklog entry.
