# Boilerplate And Signposting Protected Holdout

Both isolated holdout checks are assessed. Unnecessary framing catches 100/100 hits with nine false positives; buried answer catches 94/100 hits with two false positives. Framing exceeds the frozen maximum of five false positives by four; buried answer falls below the minimum of 95 catches by one.

Together, these checks produce 194 catches, six misses, 189 correctly unflagged no-hits, and eleven false positives across 400 judgments: 200 passage/check judgments and 200 complete-text/check judgments. Mixed-set evaluation and corpus validation remain separate stages.

- Framing: complete, including native inference, offline reconstruction, and manual review of every error.
- Buried answer: complete saved native result, offline reconstruction, and manual review of all eight errors.
- Fresh protected review is complete for both checks in separate Codex contexts. Framing verifies both requests, 200 decisions, and all nine errors; buried answer verifies thirteen requests, 200 decisions, and all eight complete-text errors. The authoring context receives aggregates and integrity evidence.

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
- Framing's fresh protected independent review is complete without delegation or additional provider calls. All nine adjudications and the failed false-positive gate remain unchanged. Buried-answer evidence follows below.

## Buried-Answer Assessment

The once-only buried-answer holdout assessment caught 94 of 100 hits and flagged two of 100 no-hits. It fails the frozen minimum of 95 catches by one case and satisfies the maximum of five false positives.

- Scope: 200 complete texts from isolated holdout collection `000032`; 100 hits and 100 no-hits.
- Frozen candidate: `buried-r1` at `1bc285f838cc397cac0c2d1c79ba38e86bea9a28`.
- Settings: `prompts/v13`, selected check `buried-answer`, family `boilerplate-and-signposting`, model `jev-1.13.0`, classification-only, threshold `>= 0.5`, batch size 16.
- Runtime: Node `v24.22.1`, SDK `0.7.0`; 978 assembled instruction words and two frozen development demonstrations.
- The saved native result is complete, with all 13 response records, final summaries, and an inference checksum. This report reconstructs that completion offline; the separate fresh QA will confirm it.
- The saved execution proof records the command below with `JEV_API_KEY` removed. The frozen runner configures SDK retries to zero.

```sh
env -u JEV_API_KEY node runners/jev.mjs run --prompts prompts/v13 --dataset datasets/ai-synthetic/texts/000032-boilerplate-and-signposting-buried-answer-holdout.md --family boilerplate-and-signposting --mode classification-only --check buried-answer --model jev-1.13.0 --threshold 0.5 --batch-size 16 --output runners/results/boilerplate-and-signposting-v13-buried-answer-holdout.json
```

### Counts And Runtime

- True positives: 94; false negatives: 6; true negatives: 98; false positives: 2.
- Recall: 94%; specificity: 98%; precision: 97.9167%; accuracy: 96%.
- Exactly 13 detection requests produced 200 decisions: twelve batches of 16 and one batch of eight.
- Complete target texts stayed intact in each request. Stable-ID sorting preserved their relative source order.
- Native SDK-call time: 4,493.154917 ms summed across requests; median 291.299250 ms; range 249.759208 to 834.092416 ms.
- Saved execution-proof wall time: 5,523.288042 ms, including credential retrieval and local execution outside the SDK-call measurements.
- Usage: 205,599 input tokens; 5,852 output tokens; 211,451 total tokens.
- Saved execution-proof interval: `2026-10-21T22:38:05.772Z` to `2026-10-21T22:38:11.302Z`. Native responses were recorded from `2026-10-21T22:38:07.205Z` through `2026-10-21T22:38:11.290Z`.
- Classification-only decisions measure detection on intact complete texts; highlighting remains unassessed.

### Development And Holdout

- The frozen development candidate catches 98/100 hits with two misses, zero false positives, and 100 true negatives. Holdout catches four fewer hits and produces two more false positives, with unchanged prompt, model, threshold, mode, and batch size.
- Development includes two prompt demonstrations; excluding them gives 97/99 catches and zero false positives among 99 no-hits. These are different splits, so newly caught or lost individual cases cannot be derived from their aggregate difference.
- The frozen development report records 29 related pairs in 27 same-split groups across the selected sets, with at most three texts per group. Treat these as isolated text/check results with some related scenarios.

### Frozen Bytes And Reconstruction

- The saved execution proof records matching preflight and post-inference hashes for the dataset, labels, selected prompts, runner, reader, schema, taxonomy, sentence source, TypeScript configuration and lockfile against the frozen commit. This report's initial offline comparison also matched those bytes to the commit and saved pins.
- During final report checks, concurrent taxonomy progress bookkeeping changed that file's current SHA-256 to `0d495eacdf0cc5c5765dff0e8d5a4eda71be8063aaf65a58673a5c415fce2b49`. The frozen buried-answer definition remains byte-identical; execution-time pins and the native result remain preserved.
- Saved preflight and post-inference pins also match the current installed sentence helper, SDK package metadata and SDK entry. The prior evaluator recorded the sentence helper's match to the frozen source's in-memory emit during preflight.
- One manifest exception was recorded: another change added only the unrelated `./rules/term-policy/forbidden-terms` export. Dependencies and the lockfile matched the freeze; the manifest stayed unchanged throughout inference.
- Public `loadDataset`, `loadPrompts` and `createSnapshot` reproduced the saved inputs in this report review. Public `validateResult` reconstructed all 13 request hashes, checked every response and verified the native inference checksum.
- Public `batchPlans` and `buildRequest` confirmed twelve intact-text batches of 16 and one of eight, with exact target text in every request. Public `score` reproduced every saved summary and finding score; a separate direct threshold count reproduced 94 catches, six misses, 98 true negatives and two false positives.
- Offline verification made zero provider calls. All eight private error records exactly match the loaded canonical texts, labels and saved probabilities.
- Dataset Markdown SHA-256: `a224aeb9c0db3eccecea5f4c28e21e0e7652440ee7b3cf791c7c82bb082973c9`.
- Labels JSON SHA-256: `06a0ff01221f36d23ae63319463146ba1565a916d463a18a60c342e0c36949eb`.
- Loaded prompt-object SHA-256: `5af65a66800aead9e989091570353f094d3ec1dfbbd336396084d79c1065ce01`.
- Raw selected prompt SHA-256: `a0413a3d9d46c4c59a3259757ae33d4ef77d8c5d260cca574c032facbdbcd23b`.
- Snapshot targets SHA-256: `a0f005e54417f4c5232bb9d41f79ce1e5461e059a4ef60ecbf1cb311bad1871b`.
- Snapshot text SHA-256: `e180a1b734e9eb0d2a317744b64e09a966b1f0af1caaa1804851611ac2ee3099`.
- Snapshot labels SHA-256: `f61efef5c0947098676ede2dbc87f8b2da868e2a79159d8afefe8ccf447901f8`.
- Native result: `boilerplate-and-signposting-v13-buried-answer-holdout.json`, 19,051 bytes; SHA-256 `3b05e421e6f8ac18a421266f51b1201487ae0bebb8452d1f7b6f87e579c6ee19`.
- Native inference SHA-256: `d67447cc252383915706d49a2433b9f9e52ab63fcaca373e5c4d4cef5a8e0bf5`.
- Execution pins and timing proof: `/tmp/000032-buried-answer-held-eval-GTYwiR/execution-proof.json`.
- Offline reconstruction and aggregate metrics: `/tmp/000032-buried-answer-held-eval-GTYwiR/offline-metrics.json`.

### Protected Complete-Text Error Review

This report review read all six misses and both false positives in full, including titles, questions, answers and qualifications, against the frozen consolidated definition. All eight labels remain appropriate. The saved model responses contain probabilities; the boundary explanations below are manual judgments.

- Private complete inputs and frozen labels: `/tmp/000032-buried-answer-held-eval-GTYwiR/errors-complete.private.json`.
- Earlier evaluator's private per-error adjudications: `/tmp/000032-buried-answer-held-eval-GTYwiR/manual-error-review.private.json`. The judgments below come from this report review's complete-text reads.

#### 000032-011: Miss, 0.47

- The task asks how wardrobe should handle the 75-minute turnaround. The answer begins, "We recommend that wardrobe stops trying to launder everything inside the gap."
- Before that answer, "Turnarounds of this kind sit where several concerns meet, and every wardrobe department weighs them a little differently." introduces a general survey, followed by "There is also a wide range of methods to choose from."
- The later stock count, timing, repairs and costs explain the specific plan. The preceding hygiene and methods survey delays it with general background. Retain the hit label and count the below-threshold decision as a miss.

#### 000032-058: Miss, 0.38

- The task asks how to repair the leaning shelves before the exhibition. The answer identifies pulled cavity anchors: "The tilt comes from the fixings."
- The labeled detour is exact: "A film finish such as a two-pack lacquer would slow it further, though it would also change the look you chose when the room was fitted out in 2021."
- That alternative finish discusses moisture exchange and appearance before the anchor diagnosis and repair. The complete reply attributes the tilt to crushed plasterboard and supplies a stud-fixing repair; retain the hit label for the separate finish detour and count the miss.

#### 000032-059: Miss, 0.33

- The decision note asks which export-worker concurrency to use and what else must change. Its operative answer begins, "Decision: each export worker runs 3 jobs at a time."
- Before that answer, "Concurrency is one of the most important levers in any queue-based system." opens a general benefits survey, followed by risks and "Teams also have many ways to manage concurrency."
- The subsequent replay measurements, memory limits, account cap and retry settings explain this decision. The earlier general survey postpones that case-specific response. Retain the hit label and count the miss.

#### 000032-073: Miss, 0.30

- The task asks how to hold vegetables across three sittings. The operative answer is, "So the plan is to split the roast rather than hold one batch for ninety minutes."
- The labeled detour says, "Parsnips carry around 5 g of sugar per 100 g and carrots slightly less, which is why parsnips colour first on a shared tray. Fennel relies more on the oil for its colour."
- That comparison explains initial browning before the holding plan. Later instructions explain steam, uncovered pans, reheating and batch timing directly. Retain the hit label for the separate vegetable-composition detour and count the miss.

#### 000032-111: Miss, 0.35

- The requested answer is "which of us is at circulation in each hour from 9:00 to 5:00". The early summary promises two-person coverage; names and hourly assignments arrive later under "Here is the rota as agreed."
- Between them, "Before the details, a few thoughts on the session itself." introduces facilitation commentary, then "Saturday opening has had a long history here." introduces branch history.
- The early staffing summary leaves the requested usable rota withheld behind that recap. The later breaks, lunch coverage and fallback rules support the rota. Retain the hit label under the operative-answer boundary and count the miss.

#### 000032-115: Miss, 0.41

- The task asks whether to buy a flip mirror or keep swapping the camera. Its opening establishes, "Your note already explains the difference:" and describes both options.
- The intervening basics passage begins, "It may help to start with the basics. A telescope brings light to a focus at a point behind the optics called the focal plane."
- The later recommendation specifies the unit, parfocal setup, mirror-shift reason and compatibility limits. The preceding general optics and telescope-design tour delays that choice. Retain the hit label based on the supplied task and complete explanation, and count the miss.

#### 000032-195: False Positive, 0.82

- The task asks which case to use for vehicle travel. The opening states, "The instrument maker's transport sheet specifies the fitted case for vehicle travel, and the empty case is available in the store."
- This supplies the selected case, applicable travel mode and availability before the general observing material. The later command repeats that choice: "Pack the refractor tube in its fitted hard case for the minibus journey."
- The frozen definition accepts an adequate early answer, including one expressed through decisive evidence. Retain the no-hit label and count the false positive; the later background follows an already supplied answer.

#### 000032-228: False Positive, 0.78

- The task asks for finished-mail groups. The opening supplies "600 general-supplement-only records, 200 gardening-supplement-only records, and 100 records receiving both." and defines "bundle" as "a finished-mail group with identical contents".
- It also states, "the mailhouse can feed a preassembled pair into one envelope." These facts supply the three groups and the feasible handling of the combined group before the terminology survey.
- The later instruction restates those same quantities and contents, then adds job tickets and checks. Under the frozen adequate-early-answer boundary, retain the no-hit label and count the false positive.

### Disposition

- Preserve all six misses and both false positives, with the frozen labels and snippets unchanged. Buried answer fails its catch limit by one case; framing fails its false-positive limit by four cases.
- This assessment preserves the candidate, writing, labels, snippets and native prediction bytes. Future candidate selection influenced by these results requires a fresh holdout.
- Fresh protected independent QA by Bacon passes all thirteen request reconstructions, 200 decisions, response/hash/model/usage validation, frozen-input integrity, all eight complete-text error reviews, and this finalized report. Its private proof is `/tmp/buried-answer-v13-holdout-independent-qa.json`, SHA256 `2635640815adae79d6ab364639abd1bc7cbb4e19d253c61c8bdf3dab082c1fee`; native result bytes remain unchanged.
- After frozen inference, the orchestrator's offline scoring output exposes holdout result IDs and probabilities. Holdout writing, snippets, and case-specific reasons remain in protected contexts; the selected prompt stays unchanged and no further tuning follows this exposure.
