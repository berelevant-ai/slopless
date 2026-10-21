# Boilerplate And Signposting Protected Holdout

Unnecessary-framing assessment is complete: 100 caught hits, zero misses, 91 correctly unflagged no-hits, and nine false positives across 200 passage/check judgments. The candidate exceeds the frozen maximum of five false positives; the required minimum of 95 catches is satisfied.

- Framing: complete, including native inference, offline reconstruction, and manual review of every error.
- Buried answer: pending.
- Fresh protected review: complete in a separate Codex native context, including both request reconstructions, all 200 decisions, and all nine manual error reviews. Return aggregates and integrity evidence to the authoring context.

## Frozen Assessment

- Candidate: `e18a4a208e0b7f9594e785c2e16effce8d2fd565`; HEAD matched this commit before inference.
- Scope: `boilerplate-and-signposting/unnecessary-framing`, isolated collection `000030`, split `holdout`, with 100 hits and 100 no-hits.
- Settings: `prompts/v13`, `jev-1.13.0`, SDK `0.7.0`, Node `v24.14.0`, classification-only, threshold `>= 0.5`, batch size 100.
- The frozen development report supplies the acceptance limits: at least 95 catches and at most five false positives. It records 99 development catches, zero false positives, eight demonstrations, and 684 instruction words.
- Every selected dataset byte, label byte, prompt byte, runner byte, dataset-reader byte, schema byte, and taxonomy byte matched the frozen commit before provider access and after inference.
- The public dataset reader validated sample boundaries, text checksum, labels, and snippets. All 200 loaded targets belonged to the selected check.

The single native run used the approved credential through the runner with `JEV_API_KEY` removed. Both requests succeeded; the native partial-result resume path was unnecessary.

```sh
env -u JEV_API_KEY node runners/jev.mjs run --prompts prompts/v13 --dataset datasets/ai-synthetic/passages/000030-boilerplate-and-signposting-unnecessary-framing-holdout.md --family boilerplate-and-signposting --mode classification-only --check unnecessary-framing --model jev-1.13.0 --threshold 0.5 --batch-size 100 --output runners/results/boilerplate-and-signposting-v13-unnecessary-framing-holdout.json
```

- Native process handle: exec session `91487`, initial chunk `7cf05d`, completion chunk `097076`, exit code 0. The process has finished.
- SDK retries: `maxRetries: 0`. Exactly two detection requests produced 200 decisions.
- Native result: `boilerplate-and-signposting-v13-unnecessary-framing-holdout.json`, 17,353 bytes; preserve these bytes unchanged.

## Results And Timing

- Caught hits: 100/100; missed hits: 0/100.
- Correctly unflagged no-hits: 91/100; false positives: 9/100.
- Recall: 100%; specificity: 91%; precision: 100/109, or 91.7431%; accuracy: 191/200, or 95.5%.
- Provider-call time: 739.239082 ms total. This is the sum of native SDK-call measurements; credential retrieval and workflow time are outside that measurement.
- Input tokens: 43,489; output tokens: 6,208; total tokens: 49,697.
- Classification-only output supplies passage decisions. Highlighting was outside this assessment.
- Counts describe this isolated check and its 200 distinct passages. The frozen preparation record identifies 49 same-split scenario links, with groups of at most three related passages.

### Request 1

- Recorded: `2026-10-21T19:43:53.400Z`; 100 decisions; 428.858291 ms.
- Tokens: 21,769 input and 3,104 output.
- Canonical request SHA-256: `9a063f54674aec3f58c9ada432a9e4b4d35e6a364a692851653109550ee4af13`.
- Saved response-object SHA-256: `dbd7d99bf6c229f7e39a777c23ef312d7037e63955c3e5392149e3eb86c02f9f`.

### Request 2

- Recorded: `2026-10-21T19:43:53.712Z`; 100 decisions; 310.380791 ms.
- Tokens: 21,720 input and 3,104 output.
- Canonical request SHA-256: `9277d90362a5bd4586f7b4c300e4a3d4fe74c938877318a8550d50c2c54e8da3`.
- Saved response-object SHA-256: `7d2cc1df9c03e53d99227c75c8b4859ae118f2fef236d7efb47ff1a53f66f498`.

## Integrity Evidence

- Loaded prompt-object SHA-256: `00fdaa11482b66da50128036bf699f9f0612ed9c35f9e942b04688f7f2967973`.
- Raw `unnecessary-framing.md` SHA-256: `3ca2a7f6a89375ebd525a0731155f0d24f7e468095f1cc0f39f58b15d62d82d4`.
- Raw `shared.md` SHA-256: `6268f6f77af964d6beec6567d279415aa166a32fa4cf030bec01a75adde04527`.
- Raw dataset Markdown SHA-256: `7506c4147ce4d7569380e27a39e46c2c786cfe1a8aa17f88762bb6ca855f2433`.
- Raw labels JSON SHA-256: `850c1c4260778d2c86e86960f87600a94d5300d3a6c9f7cd8f5401d5ee5fea7a`.
- Snapshot text SHA-256: `6e79985ee8a366b876643f57719ff387b9d35808e196f35aca372af80fcc49e2`.
- Snapshot labels SHA-256: `0d098c7a10e9c9b780da6b46c48b8d15ca17ad98ae02bb066e42703ad6427f3d`.
- Snapshot targets SHA-256: `cf688fcb17bbaac5cbd5e309df03a6a4366aff7fe479f26efd1b2cad04f91df8`.
- Complete snapshot-object SHA-256: `89750abb3bc231329894d3263220ccda65bae2edad8467fd0a57511a2d9099e8`.
- Native result-file SHA-256: `ac58db3b2e218c8484efb1c89cf5b8e436c0a6757812dd3274e4e484c21ce1c8`.
- Native inference SHA-256: `5675bbf5b080e7c0b9a5f1d2409ceb7e558697aa9eb9e5cf0d969d1c2dc75c55`.
- Public runner SHA-256: `7a2e7030e77df4cb5d6aacb4e5502d1419e025e6da94ed83c74885a225d709d4`.
- Public dataset-reader SHA-256: `1414d9e49d37254f5a94407d18e7807933725a38b6db17ae3be84aafceb7ab6f`.
- Dataset schema SHA-256: `cc90d3f32515638c06e17bbf0fbeb3b0cafe2be4e93ce580df93fea360a3a9e3`.
- Frozen taxonomy SHA-256: `7afb254333c8f7154395e64f070ccfd70a53b896cede4ff794d5687f27be40b2`.

### Offline Verification

- Reconstructed rows with public `loadDataset` and prompts with public `loadPrompts`; public `createSnapshot` exactly reproduced the saved snapshot.
- Public `batchPlans` and `buildRequest` reproduced both canonical request hashes, including every complete target, question, criterion, model, and instruction.
- Public `validateResponse` verified every response's model, usage, exact question-key coverage, answer type, and probability range. Both responses contain 100 valid Noul answers.
- Public `validateResult` confirmed a complete result and its inference checksum. Public `score` exactly reproduced all saved summaries and finding scores.
- A separate direct threshold count over every saved answer reproduced 100 true positives, zero false negatives, 91 true negatives, and nine false positives.
- Native public CLI `validate` and `score`, with the frozen arguments and saved output, both exited 0 and reported a complete 200-decision result. These commands run offline.
- Verification used the existing native response objects; it made zero additional provider calls.
- Fresh protected verification independently repeated the public-helper checks and complete-input error review. Its private proof is `/tmp/unnecessary-framing-v13-holdout-independent-qa.json`; the rounded six-decimal provider-call sum is 739.239082 ms.

## Protected Manual Error Review

Reviewed every mismatch against its complete loaded passage and the frozen taxonomy's consolidated unnecessary-framing definition. All nine fixed no-hit labels remain appropriate. There are zero missed positives to review.

The model returns probabilities rather than reasons. The explanations below identify the textual boundary violated by each prediction; they are the reviewer's assessments of the saved decisions.

### 000030-098: False Positive, 0.77

> Wind speed fell after sunset, revealing nature's delicate tapestry. Surface water cooled by three degrees. We logged both measurements at ten-minute intervals until the batteries failed.

- The complete passage combines measurements with an ornamental metaphor. The metaphor describes the scene rather than announcing the point or its presentation.
- The frozen family boundary assigns hollow metaphors to semantic thinness. A separate disposable framing announcement is absent; retain the framing no-hit and count this prediction as a false positive.

### 000030-107: False Positive, 0.73

> It is important to warn the downstairs tenant before closing the stopcock: it supplies both flats, and their washing machine is running a cycle this morning.

- The instruction prioritizes a warning before an action that interrupts the other flat's running washing machine. Its significance follows from the supplied shared-water consequence.
- The frozen definition preserves useful prioritization and procedural instructions. The prediction treats this consequential warning as framing; retain the no-hit and false-positive count.

### 000030-109: False Positive, 0.68

> Keep this date in your diary: Ms. Okafor closes draft submissions on 18 March. Handwritten work goes in the office tray; electronic drafts go through the portal.

- The first clause asks the reader to record an actionable deadline. The rest supplies the date and the submission routes.
- The frozen definition distinguishes performing an action from being told to appreciate a point. Retain the no-hit: this reminder is an instruction with a practical purpose.

### 000030-114: False Positive, 0.50

> "Here is the secret: chill the dough" was printed on the packet I found in my grandmother's tin. Under it she had written, "The kitchen was cold enough in winter; in July I put the bowl in the well." The note explains why the same recipe gave her such different results across the year.

- The complete passage documents wording on an old packet and a handwritten note, then interprets the seasonal recipe results. The quoted wording is evidence in that account.
- The frozen definition preserves quotation used for documentation or examination. The native `>= 0.5` comparison makes the saved 0.50 a hit; retain this false positive at the exact threshold.

### 000030-131: False Positive, 0.58

> The library lends calculators. The school calls this service "a triumph of educational inclusion," though borrowers still need a student card and must return the calculator after each exam.

- The passage attributes the evaluative wording to the school and immediately contrasts it with borrowing restrictions. It records and qualifies the school's claim.
- The frozen quotation boundary preserves this documented wording. Its evaluative content also retains the existing family assignments; retain the framing no-hit and false positive.

### 000030-133: False Positive, 0.92

> The fare cap resets every Monday, ushering in a new era of passenger empowerment. Journeys after midnight count toward the new week, and unused credit stays on the card.

- The first sentence inflates the significance of the fare-cap reset. The remaining writing explains how the weekly reset and retained credit operate.
- The frozen definition assigns exaggerated claims to their existing family and requires an additional disposable frame for framing. Retain the framing no-hit and count the prediction as a false positive.

### 000030-141: False Positive, 0.63

> The pharmacy opens at seven; that is good news for night staff.

- The evaluation identifies a concrete beneficiary of the opening time. It connects the schedule to the staff whose working hours make it useful.
- The frozen definition preserves evaluative language that contributes a relevant property or comparison. Retain the no-hit: the beneficiary supplies meaning beyond an importance announcement.

### 000030-197: False Positive, 0.92

> The new window latch is a game-changing triumph of domestic design. It prevents the cat from pushing the guest room window open while we are out.

- The first sentence exaggerates the latch's quality; the second supplies its practical effect. The evaluation concerns the object rather than the act of presenting a point.
- The frozen family boundary requires an additional disposable frame beyond an exaggerated claim. Retain the framing no-hit and count this prediction as a false positive.

### 000030-202: False Positive, 0.74

> Important: expenses close on the twentieth this month, three days earlier.

- The importance label prioritizes a deadline that has moved three days earlier. The supplied change explains the warning's practical relevance.
- The frozen definition preserves useful prioritization. Retain the no-hit: this label highlights a consequential schedule change.

## Disposition

- Preserve all nine false positives in the reported result, with every label and snippet fixed. The model fails the frozen false-positive limit by four cases.
- Keep the candidate unchanged for this assessment. Any later framing revision requires a separate development round and a fresh protected holdout before independent assessment.
- Preserve the native JSON result bytes. This report is the only authored assessment document; prompts, labels, production code, commits, and releases remain unchanged by this assessment.
- Fresh protected independent review is complete without delegation or additional provider calls. All nine adjudications and the failed false-positive gate remain unchanged; buried answer remains pending.
