# Whole-Text Location Spike

## Result

Jev can select useful paragraph locations while reading the complete text. The first shared location prompt remains incomplete: buried-answer selection leaves twelve detected positives without a location, and repeated explanation often selects the later duplicate while omitting its original anchor.

The experiment uses 400 existing development texts, with 100 hits and 100 no-hits for each type. Frozen detectors flag 98 buried-answer positives and 98 repeated-explanation positives, plus five repeated-explanation no-hits. Only these 201 texts receive new location calls.

| Measurement | Buried answer | Repeated explanation |
| --- | --- | --- |
| Detected true positives | 98 / 100 | 98 / 100 |
| Detected no-hits | 0 / 100 | 5 / 100 |
| Detected positives with at least one reference paragraph located | 86 / 98 | 96 / 98 |
| Every reference paragraph selected | 0 / 98 | 50 / 98 |
| Reference paragraphs selected | 159 / 350 | 171 / 227 |
| Extra paragraphs on detected positives | 9 | 0 |
| Detected positives with no selected paragraph | 12 | 2 |

- The two misses per detector never reach location selection. End-to-end counts with at least one located reference are 86/100 and 96/100.
- The repeated-explanation selector also flags six paragraphs in all five detector false positives. It preserves that upstream false-positive burden.
- Strict reference agreement compares all existing snippets. The paragraph roles in those snippets need the interpretation below.

## What Ran

- Preserve frozen `v13` buried-answer and `v16` repeated-explanation detectors. Reuse their final recorded development probabilities and verify their native requests and seals; repeat no detection calls.
- The [shared location prompt](../../prompts/v23/paragraph-location.md) receives the original check definition and its existing development demonstrations. Add no new demonstrations or holdout writing.
- Textlint visits native paragraph nodes, including nested lists and quotations. Each request receives the complete original text and numbered paragraph text, with independent yes/no questions for at most sixteen paragraph IDs.
- Labels, snippets, expected paragraph IDs and detector probabilities stay outside model requests. Several paragraphs can be selected; the question permits an absent defect.
- The localizer uses Jev `jev-1.13.0`, SDK `0.7.0`, cutoff `0.5` and three concurrent texts. The assembled check instructions contain 959 and 984 words.
- Native textlint reporting produces 345 paragraph ranges. The spike stores each range under its original check and text; production API integration remains unchanged.
- The frozen definitions include six complete development demonstrations. Excluding them leaves a located reference in 85/97 detected buried-answer positives and 94/96 repeated-explanation positives; strict complete-reference counts become zero and 48 respectively.

## Reference Roles

The existing buried-answer snippets include unnecessary run-up and the delayed answer that establishes the relationship. The location prompt explicitly preserves the useful answer. Selecting all snippets therefore conflicts with the requested reporting behavior.

- The latest reference paragraph is unselected in all 98 detected buried-answer positives. This explains why strict full-reference agreement is zero; it does not establish that all selected locations are useless.
- Manual review confirms omitted answer anchors in all 26 reviewed buried-answer texts. It also finds genuine omissions of unwanted run-up.
- The repeated-explanation definition requests both earlier and later parts. Strict complete-reference coverage remains relevant there; the latest reference paragraph is selected in 95/98 detected positives.

Keep the original labels and raw scores. Define which parts should be reported before using snippet agreement as the location acceptance criterion.

## Manual Review

Fresh reviewers assess 26 buried-answer and eighteen repeated-explanation texts. The sample includes every extra selection, every empty location output and every gated no-hit, plus selected incomplete and complete cases. These are error-enriched review counts.

### Buried Answer

- Of 35 reviewed selected paragraphs, 33 identify unnecessary run-up. Two are disputed false positives involving useful load-in or route-access instructions.
- All nine selections outside the recorded snippets identify valid run-up. The snippet list therefore omits some valid reporting locations.
- All twelve empty outputs miss a present defect. This is a substantive location-recall failure, independent of answer-anchor scoring.
- The 67 omitted reference paragraphs comprise 33 unwanted run-up paragraphs, 27 useful answer anchors and seven disputed targets.
- Nine of 26 reviewed outputs cover the full detour under the reviewer's usability criterion. This sampled count measures completeness, beyond identifying any useful location.

Example `000031-004`:

- The model selects paragraph three, beginning "It might help to remember how we got to the current setup." That paragraph recounts old secrets storage before answering the offboarding question.
- It leaves the operative answer, "rotate the webhook signing secret today", unselected in paragraph six. This is appropriate for reporting material to revise.
- It misses additional run-up in paragraph four. The useful selected location is therefore incomplete rather than wholly wrong.

Example `000031-001` receives no location. Consortium/catalog history and the lending team's workload delay renewal instructions, but their paragraph scores remain below `0.5`.

### Repeated Explanation

- Eleven of eighteen reviewed outputs are actionable: three cover every reference paragraph and eight omit only useful original anchors while locating the unnecessary later repetition.
- The reviewer upholds all six selected paragraphs on the five no-hit texts as false positives. They concern useful summaries, explanations applied to another context and renewed instructions.
- One empty output misses a later duplicate; the other has a disputed reference because the repetitions serve worksheet and footnote applications.
- Of fourteen missing reference paragraphs in this sample, eleven are original anchors, one is an upheld later duplicate and two have disputed later-function labels.

Example `000037-007`:

- Paragraph two explains that exports held database connections during file uploads. Its location score is `0.47`.
- Paragraph five repeats that explanation, beginning "History requests timed out because export jobs were occupying the available database connections while their files uploaded." Its score is `0.85`.
- The output points to the duplicate a writer can revise, while failing the stricter requirement to mark both parts.

## Runtime And Verification

- New inference comprises 1,501 paragraph judgments in 201 requests. Recorded provider-call duration sums to 33.05 seconds; three-worker inference wall time is 11.74 seconds, excluding credential retrieval and preparation.
- Usage is 662,632 input tokens and 26,409 output tokens. The complete text is shared within each request; paragraph candidates are also supplied explicitly.
- Input snapshots, model requests, response probabilities, runtime receipt and native locations are stored in [the result JSON](text-location-v23-spike.json).
- Dataset Fixture3 matches; six existing paragraph-boundary contracts pass. Native offline `validate` and formatting checks pass.
- Fresh independent verification confirms all 201 request hashes, 1,501 decisions, 345 native ranges, demonstration exclusions and 44-text review totals. Native replay passes and all eleven tamper probes are rejected.
- The inference-producing source hash remains recorded. Offline-only fixes normalize JSON-omitted undefined report fields, verify stored summaries/errors and seal the independently checked runtime receipt. They change no detector decisions, location requests, raw responses or cutoffs.

## Consequence

The spike supports paragraph-ID selection as a practical direction for locating whole-text findings. It does not yet meet a reliable complete-location standard.

- Keep the detector checks unchanged. Refine and measure the location question separately, distinguishing material to revise from useful original or answer anchors.
- Preserve all observed misses and false positives. Establish consistent reporting targets before comparing another location prompt on development; use fresh holdout material for an independent assessment.
- Sentence or word-level selection and rewrite-quality comparison remain separate experiments. This spike evaluates paragraph locations only.
