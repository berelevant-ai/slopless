# One-Shot Repeated Explanation

## Result

One Jev request returns both a whole-text decision and paragraph locations. On the same 200 development texts, paragraph coverage improves substantially, while false positives increase. The whole-text and location answers disagree on nine texts.

- Whole-text detection catches 97/100 hits and flags 6/100 no-hits. The frozen detector caught 98 and flagged five.
- Paragraph selection finds a labeled reference in all 100 hit texts and every reference in 95. The two-stage run located a reference in 96 and every reference in fifty, among its 98 detected hits.
- Direct paragraph output flags twelve no-hit texts. Requiring a positive whole-text answer reduces that to six and leaves three hit texts unreported.

## Request And Inputs

- Run `wordiness-and-redundancy/repeated-explanation` on collection `000037` development only: 100 hits and 100 no-hits. Preserve original text, corrected labels, snippets and native textlint paragraph IDs.
- Each request receives the complete text, numbered paragraphs, the v16 rule definition and two separately named instruction fields. Ask one whole-text yes/no question and one independent yes/no question per paragraph.
- Preserve the v16 detection question and criteria and the v23 location question and criteria. Each question explicitly references its own instruction field; the shared-state arrangement changes from the previous requests.
- Use Jev `jev-1.13.0`, SDK `0.7.0`, cutoff `0.5` and three concurrent requests. All texts fit one request: 1,283 paragraphs plus 200 whole-text questions, with at most sixteen questions per request.
- Labels and expected locations remain outside requests. The existing development demonstrations remain in the rule definition; prompts and holdout material remain unchanged.
- Preserving both instruction sets makes the combined instruction content 1,118 words, exceeding the project's 1,000-word assembled-prompt target. The separate detector and location prompts contain 962 and 984 words; a compact combined candidate needs its own development comparison.

The changed state layout accompanies batching. Attribute these results to this complete request design; a separate comparison would be needed to isolate which layout change improved location selection.

## Detection Changes

- `000037-060` changes from hit `0.52` to no-hit `0.48`. It repeats the pending-extension explanation after calendar details; its later duplicate still receives a positive location answer.
- `000037-167` changes from hit `0.53` to no-hit `0.37`. Earlier review disputed whether the translation exercise's later applications deserve its frozen positive label.
- `000037-188` changes from no-hit `0.49` to hit `0.66`. It selects P1, containing rain and badge explanations, plus P5's useful badge callback, while missing P4's labeled later registration explanation. The paragraph answer cannot distinguish the two explanations inside P1.
- `000037-143` adds a false positive, changing from `0.40` to `0.59`. Its local adjacent repetition belongs to the separate redundancy check.

All other 196 whole-text classifications retain their previous result. Raw expected labels remain unchanged.

## Paragraph Coverage

- On the same 98 formerly detected hit texts, any-reference coverage improves from 96 to 98, and complete-reference coverage improves from fifty to 95.
- Across all 100 hits, the new selector covers 225/231 reference paragraphs, adds five paragraphs outside the snippets, and selects the latest reference paragraph in 99 texts.
- Five texts retain omitted references: `000037-022`, `060`, `167`, `188` and `196`. Five of the six missing paragraphs are earlier anchors; `188` misses its later registration reference.
- Exact reference agreement reaches 92/100. Three texts select every reference plus additional paragraphs; the remaining five omit at least one reference.
- Existing demonstrations contain two hits and two no-hits. Excluding all four leaves 98/98 hits with a reference selected and 93/98 with every reference selected.

The nine inconsistent outputs all contain selected paragraphs despite a negative whole-text answer: three labeled hits and six labeled no-hits. Every positive whole-text answer has a location.

## Reporting Policies

- Reporting every positive location produces 100/100 located hits and 12/100 flagged no-hits, with 255 selected paragraphs. These include 225 reference paragraphs, five extra paragraphs on hits and 25 paragraphs on no-hits.
- Requiring a positive whole-text decision produces 97/100 located hits and 6/100 flagged no-hits, with 238 selected paragraphs. It covers 221 reference paragraphs, with five extras on hits and twelve paragraphs on no-hits.
- The earlier two-stage output produced 96/100 located hits and 5/100 flagged no-hits, with 177 selected paragraphs. It covered 171 reference paragraphs and selected six paragraphs on no-hits.

Gating inside application code therefore remains useful even when both kinds of answers arrive in the same request. Preserve raw answers to expose disagreements during evaluation.

## Reviewed Findings

Review covers all twelve flagged no-hit texts, all five extra selections on positive texts, and all four changed whole-text decisions. Existing labels remain the numerical reference.

- Useful departure checklists are selected in `000037-045`, `134` and `147`. For example, `045` repeats password, request-submission and reader-card checks before the visitor leaves home; that consolidation serves the visit.
- Useful procedural reminders are selected in `000037-178` and `182`. The drainage instruction returns when watering the repotted plant; the photograph-handling precaution returns when enclosing prints.
- Adjacent duplication is selected in `000037-079`, `137` and `143`. For example, "The Sunday evening slot will remain unbookable. Nobody will be able to reserve Sunday evening." belongs to redundancy under the existing definition.
- Later recommendations or explanations in `000037-069`, `100` and `104` apply earlier facts to supplier selection, balance-reading or order-checking tasks. Review upholds these false positives.
- `000037-005` remains a disputed boundary: P4 closely repeats the shelf-fit rationale after strength and price comparisons. The rule's synthesis exception supports its frozen no-hit label.
- Three extra paragraphs are defensible earlier anchors: `000037-024` P1's capacity explanation, `086` P1's correct-booking/wrong-confirmation contrast and `141` P1's repair rationale. Their absence from snippets makes strict exact agreement incomplete as a correctness measure.
- Two extra paragraphs are false selections: `000037-086` P6 usefully consolidates recovery status, and `188` P5 applies badge identification when shoppers arrive through a different gate.

## Runtime And Verification

- New inference makes 200 requests with 1,483 answers. Provider calls sum to 33.85 seconds; concurrent inference wall time is 11.64 seconds, excluding preparation and credential retrieval.
- Usage totals 692,179 input tokens and 26,246 output tokens. Every no-hit receives all paragraph questions, increasing the workload compared with detection-gated selection.
- The earlier pipeline used thirteen batched detection requests plus 103 location requests. Combined recorded usage was 398,545 input tokens and 17,484 output tokens, with 20.18 seconds of summed request duration.
- This one-shot design uses more total requests and tokens because it evaluates every paragraph and repeats instructions once per text. The previous detector shared instructions across sixteen independent texts per detection request.
- The old location wall-time record combines both checks. Use the recorded request sums above for this one-rule comparison; this experiment does not establish an end-to-end speed improvement over the earlier complete pipeline.
- Native offline replay passes for both saved results. Dataset Fixture3 matches, and all six existing paragraph-boundary contract tests pass.
- Four corruption probes reject edited probabilities, edited derived locations, missing summaries and an edited runtime receipt. Source formatting and `git diff --check` pass.
- A fresh independent reviewer verifies comparison counts, original-source equality, both native offline replays and complete writing for all twelve flagged no-hits, five extra selections and four classification changes. Review identifies eleven upheld no-hit errors, one disputed boundary and two false extra paragraphs; raw labels remain unchanged.

## Decision

Use independent paragraph questions alongside the whole-text question as a viable one-request design. Preserve the whole-text decision as an explicit reporting gate while improving location precision on useful recaps and procedural reminders. Compare another frozen candidate on development before assessing independent holdout quality.
