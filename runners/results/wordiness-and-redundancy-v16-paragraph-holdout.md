# Paragraph Input Comparison

## Result

Paragraph input reduces false positives substantially, while losing some real catches. The same 200 texts and frozen labels produce 498/600 correct judgments, compared with 424/600 when every check receives the complete text.

- Wordiness changes from 93/100 hits caught and 79/100 false positives to 91/100 caught and 47/100 false positives. Nine hits are missed and 53 no-hits remain unflagged.
- Redundancy changes from 79/100 caught and 54/100 false positives to 70/100 caught and 1/100 false positives. Thirty hits are missed and 99 no-hits remain unflagged.
- Repeated explanation retains the existing complete-text predictions: 100/100 caught and 15/100 false positives. Its 85 correctly unflagged no-hits remain unchanged.
- All three answers match in 113/200 texts, up from 69/200. Every expected issue is found in 138/175 affected texts, down from 150/175.
- Counting any family finding flags 171/175 affected texts and 7/25 completely clean texts, compared with 167/175 and 8/25 before. This broader count can hide an incorrect issue assignment.

All three checks still fail the selected bounds of at least 95 caught hits and at most five false positives per 100 examples of each class. Redundancy's false-positive count is now within the bound, while its sensitivity falls further below it.

## Changed Judgments

- Wordiness gains five catches and loses seven. It corrects 33 false positives and introduces one, for 46 changed judgments.
- Redundancy gains seven catches and loses sixteen. It corrects 53 false positives and introduces none, for 76 changed judgments.
- The 122 changes affect 87 distinct texts. Ninety-eight judgments improve and 24 worsen, yielding 74 additional correct judgments overall.

### What Improved

- Fifty of redundancy's corrected false positives contain separated repeated explanations. Removing distant material separates these from the local-duplication question.
- In `000040-002`, the copied-project release note repeats the layer-order change after substantive release details. Redundancy probability falls from 0.87 to 0.19; the separated repetition retains its repeated-explanation assignment.
- Redundancy newly catches "free gift at no charge" in `000040-065`, from 0.41 to 0.74. The complete local duplicate appears in the second paragraph.
- Wordiness newly catches "make a comparison of the restrictions" in `000040-125`, from 0.45 to 0.63. Twenty-seven of its 33 corrected false positives occur in texts labeled for repeated explanation.

### What Remains Wrong

- Forty-two remaining wordiness false positives contain labeled local redundancy. Another flags the already disputed customization duplicate in `000040-073`; four flag useful expressions rather than padding.
- The four useful-expression cases are `000040-049`, `000040-121`, `000040-129`, and `000040-177`. They distinguish a current check, calculation, approval stage, or booking contact. Review finds zero remaining false positives caused by losing documented-quotation context between paragraphs.
- The new false positive is `000040-177`: "For visitors planning to examine maps, the booking contact is the archive secretary at the library desk." Wordiness rises from 0.43 to 0.58; the sentence supplies a person and location.
- All seven lost wordiness catches and sixteen lost redundancy catches retain their labeled local constructions within one paragraph. Splitting removes none of the required wording for those losses; five of their labels attract the disputes below.
- A supported wordiness loss is `000040-149`: "The archivist performed an inspection of the binding before opening it on the reading table." Probability falls from 0.61 to 0.48.
- A supported redundancy loss is `000040-004`: "Friday morning at nine a.m." Probability falls from 0.76 to 0.28 despite retaining the complete doubled timing in one paragraph.
- Redundancy's sole remaining false positive is `000040-073`: "The maps are custom-made to our own bespoke design." Review already disputes that no-hit label; the frozen score remains one false positive.

## Review And Labels

Two independent reviewers inspect all 122 changed judgments against complete originals and actual child inputs, plus all 48 remaining passage-check false positives. The parent reads the complete inputs for the five new label disputes; every label and reported denominator remains unchanged.

- Wordiness hit `000040-034`: "The chef has made a record of the readings on the kitchen's temperature sheet." Review disputes whether naming a retained record supplies identifiable padding beyond an available shorter paraphrase.
- Wordiness hit `000040-150`: "The carpenter made a record of the position of every old fixing before lifting the rail." Review raises the same retained-record boundary.
- Redundancy hit `000040-028`: "in chronological sequence, following the order in which events happened in time" may serve as a useful plain-language gloss.
- Redundancy hit `000040-040`: "The depot manager described the conversion as an unexpected surprise when she spoke at the opening" may qualify for the documented-speech exception.
- Redundancy hit `000040-058`: "The northern ward has annual volumes issued every year, while the riverside ward has only every third year" may supply useful frequency contrast.

The earlier eighteen disputes remain in the [original holdout report](wordiness-and-redundancy-v16-holdout.md). These five additional disputes require adjudication; this comparison preserves the original correctness reference.

## Execution And Verification

- The [native result](wordiness-and-redundancy-v16-paragraph-holdout.json) contains 756 exact-source passages and 1,512 new judgments in 96 requests. Each original text is positive for a passage check when any child probability reaches 0.5.
- Jev 1.13.0, SDK 0.7.0, the v16 shared/check prompts, original labels, and batches of sixteen stay fixed. Only the supplied target boundaries change; repeated explanation reuses its 200 earlier predictions.
- Usage is 425,502 input tokens and 49,524 output tokens, with 24,098 milliseconds of summed request time. The two original whole-text checks used 188,755 input tokens in 26 requests and 6,519 milliseconds.
- Headings remain attached to their openings, and every non-whitespace source character remains present in ordered exact slices. All 96 request hashes and recomputed scores reproduce offline.
- `000040-024` has snippets in two child paragraphs, so no single child contains every labeled snippet. Both independent local duplicates remain intact and caught at 0.85 and 0.81; the example remains in every denominator.
- Independent runner review identifies two verification gaps in the first implementation. Textlint's parser now rejects unsupported blocks, and the completed-result seal covers raw probabilities as well as scores.
- Archive `0da391358628c4faa0142851ddab81de27aa2050` retains the exact inference-producing source and raw result. Offline sealing verifies both against Git; all prediction, target, assessment, and original snapshot values remain unchanged.
- Six offline boundary tests pass, including unsupported Markdown and a probability edit that leaves the parent maximum unchanged. CI runs them on Node 22 and 24.

## Interpretation

Paragraph execution resolves most confusion between local redundancy and separated repeated explanations. Wordiness still treats local duplication as padding, and both passage checks lose supported catches even when the relevant wording stays together.

This follow-up uses holdout results to choose a different input arrangement. It measures the same exposed cohort; a fresh holdout is required for an independent assessment of a subsequently selected execution design.
