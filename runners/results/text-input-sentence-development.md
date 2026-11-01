# Full-Text Input With Sentence Decisions

## Result

Complete-text sentence questions increase recall and false positives for both tested checks. Keep the current production behavior while investigating these errors.

- Wordiness: paragraph input flags 77/100 positive texts and 39/100 negative texts. Full-text sentence questions flag 97/100 positive texts and 62/100 negative texts.
- Redundancy: paragraph input flags 52/100 positive texts and 1/100 negative texts. Full-text sentence questions flag 85/100 positive texts and 40/100 negative texts.
- Correct locations matter: sentence questions select a labeled offending sentence in 93 wordiness texts and 78 redundancy texts. The other four and seven positive-text detections select different sentences.

## What We Sent

- Use the existing mixed development collection `000039`: 200 texts, 47,945 whitespace-separated words and 3,040 sentence targets. Each check has 100 expected hits and 100 no-hits.
- Each text contains 185-430 words. These are complete short texts; testing full-length articles remains a separate comparison.
- Baseline: capture the current public runtime's paragraph requests and replay their exact shared paragraph and two independent check questions. This makes 786 provider requests.
- Candidate: send one rule with the complete numbered text in `state.article`. Ask whether each specified sentence contains or participates in that rule's defect; split groups at sixteen questions and keep the complete text in every group.
- The candidate makes 468 requests. Several sentences can be positive independently; a sentence can participate in a construction that spans multiple sentences.
- Keep the original v16 definitions, demonstrations, shared instructions, original defect questions, answer criteria, Jev 1.13.0 and cutoff 0.5. Add the [sentence-participation instructions](../../prompts/v25/sentence-location.md).
- Each question supplies its sentence ID, exact text and structural role. Textlint and the installed sentence-splitter supply source ranges; the model selects existing sentences.
- Evaluate the candidate directly from sentence answers. A positive whole-text gate is absent from this experiment.

This tests the combined change in input context, target size and question wording. The recorded gains and regressions belong to that complete design.

## Changed Classifications

- Wordiness adds 22 positive-text detections and loses two. It corrects five false positives and adds 28.
- Redundancy adds 33 positive-text detections, with every previous positive retained. It adds 39 false positives and corrects none.
- All 129 changed text/check classifications remain in the [recording](text-input-sentence-development.json.gz), alongside the complete writing, expected snippets and selected sentences.

## Location Quality

- Wordiness selects its reference sentence in 93/100 positive texts, compared with 65/100 where a baseline paragraph covers that reference. All wordiness references occupy one sentence.
- Redundancy selects at least one reference sentence in 78/100 positive texts, compared with 52/100 for baseline paragraphs. It selects every reference sentence in 67/100 texts, compared with 52/100 for the baseline.
- Across redundancy references, 109/143 sentences are selected. The candidate also selects 66 sentences outside saved snippets on positive texts for each check; those selections require semantic review rather than automatic negative labels.
- On no-hit texts, wordiness selects 80/1,522 sentences and redundancy selects 65/1,568. Aggregating by any flagged sentence produces 62 and 40 affected texts respectively.

## Reviewed Wordiness Examples

- Newly caught, `000039-207`: "The clerk wound both clocks **prior to the commencement of business** each Monday." The candidate selects the sentence containing the labeled padding.
- Newly caught, `000039-215`: "You also need to **make a decision as to whether** the overflow will return to the downpipe or run to another suitable outlet."
- Lost, `000039-071`: "Please **make a selection of that location** if you still need storage today." The baseline flags its paragraph; the candidate selects no sentence in this text.
- Wrong location, `000039-170`: the label identifies "**made an adjustment to** the order sheet". The candidate instead selects "They showed the sequence in which deliveries were to be made," which repeats the preceding delivery-order statement.
- Unwanted assignment, `000039-005`: "The amount you save depends on the extent to which you are able to use the electricity as it is produced." The frozen no-hit label preserves degree and ability; the candidate calls it wordiness.
- Unwanted assignment, `000039-103`: "I asked each supplier to provide an indication of whether the glass carries a permanent maker's mark." Its question and supplier responses have a practical purpose in the complete text.
- Wrong check, `000039-024`: "attendance will be **compulsory and mandatory**" is a labeled redundancy. The wordiness definition explicitly assigns duplicated meaning to the separate redundancy check.

Review covers all wordiness changes and every selected sentence on its 62 no-hit texts. Of those texts, 39 contain a selection overlapping another check's positive snippets, 35 contain selections outside those snippets, and twelve belong to both groups.

## Reviewed Redundancy Examples

- Newly caught, `000039-016`: "The final deadline is the 18th, **which is the last day requests can be submitted**." The selected sentence contains the labeled duplicate.
- Newly caught, `000039-047`: "Repairs are **free and carry no charge**, though donations toward hall hire are welcome." Additional selections repeat an earlier venue explanation after intervening content, which belongs to repeated explanation under the frozen definitions.
- Wrong location, `000039-019`: the label identifies "**maximum weight limit**". The candidate instead selects the later ventilation explanation and misses the labeled phrase.
- Wrong check, `000039-007`: the selected later paper-signup explanation repeats earlier material after intervening garden instructions. The redundancy definition assigns that relationship to repeated explanation.
- Excess selection, `000039-221`: the candidate correctly selects both deadline statements and also selects the orienting heading "Closing date."
- Incomplete selection, `000039-169`: the candidate selects the second participant, S6, while omitting the labeled first participant, S5.

Fresh review reads complete texts for all 72 changed redundancy decisions and all forty flagged no-hit texts, covering 73 distinct texts. Of 33 new positive-text flags, 26 select a reference sentence and 25 select every reference sentence.

The reviewer disputes the redundancy no-hit for `000039-198`: adjacent statements express twenty-four trials as twenty-four photograph-selection opportunities, after recognition was already defined as photograph selection. Both arrangements flag the pair. Preserve its frozen label and reported score pending separate label review.

## Interpretation

- The combined full-text sentence-question design detects more labeled constructions. Sentence questions also increase the number of chances to flag a text; small sentence-level error rates accumulate under an any-sentence reporting policy.
- Wordiness continues to confuse unnecessary elaboration with duplicated information and useful formal wording. That behavior persists while the complete text is available.
- Sentence selection provides usable locations for many genuine defects, but four wordiness and seven redundancy positive texts are flagged without selecting a labeled offending sentence. Track those separately from correct localized catches.
- Preserve this candidate as an experiment. The measured false-positive increases rule out adopting it as the default replacement for paragraph checks in this form.

## Execution And Reproducibility

- All 1,254 requests complete in 40.03 seconds with six concurrent requests and zero failed provider attempts. Preserve raw probabilities and the installed SDK version 0.7.0.
- Baseline usage is 1,805,904 input tokens and 43,230 output tokens. Candidate usage is 7,399,215 input tokens and 107,712 output tokens.
- The saved development texts share some identical paragraphs: 46 request hashes occur twice. Score each planned target using its exact request's first recorded answer and retain both raw answers.
- Only one repeated request changes a thresholded answer, from wordiness 0.49 to 0.50. Repeating scoring with every last-recorded answer changes zero text classifications, location summaries or reported totals.
- The recording binds dataset text, labels, prompts, selected runtime-module hashes, SDK version, producing runner, request hashes and raw responses. The offline scorer validates exact request reconstruction, answer IDs, model, probabilities and token fields.
- Reproduce scoring with `node runners/jev-sentences.mjs score`. The runner reads the compressed recording when the JSON file is absent and writes a JSON replay beside it.
- Production source, protected holdouts, dataset labels and approved model outputs remain unchanged. Dataset and shared-runtime Fixture3 suites match; all six existing paragraph-boundary contracts pass.
- Fresh independent review reproduces both checks' scores, reference coverage, token totals and repeat sensitivity. It checks every baseline request, candidate context, sentence range and snippet mapping, then reviews the complete redundancy error inputs and this report.
