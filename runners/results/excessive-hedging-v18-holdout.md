# Excessive Hedging Holdout

## Result

The frozen hedging candidate passes isolation and fails the mixed collection's recall bound. It catches 188/200 expected hits and flags five of 200 expected no-hits across the two collections.

| Collection | Caught / 100 hits | Missed | False positives / 100 no-hits | Reference |
| --- | --- | --- | --- | --- |
| Isolated `000054` | 98 | 2 | 4 | Pass |
| Mixed `000056` | 90 | 10 | 1 | Fail: missed hits |

- The fixed reference requires at least 95 caught hits and at most five false positives in each collection.
- Development confirmation recorded 96 caught/five false positives in isolation and 97/two mixed. Holdout isolation improves by two catches; mixed recall falls by seven points on different passages.
- These measurements use independently labeled synthetic passages. The [assessment record](excessive-hedging-v18-holdout.json) preserves every result, input hash and error judgment.

## Frozen Execution

- User authorization: "do holdouts for 1 and 2" on 2026-10-25. Selected candidate: `prompts/v18/hedge-stacking.md` plus `shared.md`.
- Model `jev-1.13.0`, SDK `0.7.0`, cutoff `0.5`, batch size sixteen and classification-only mode remain unchanged from development.
- Two hundred distinct passages per collection receive the hedging check. The mixed collection also receives frozen `v11` vague attribution and `v10` inflated evaluation independently.
- Four jobs produce 800 judgments through 52 requests. Recorded request duration sums to 8.86 seconds; concurrent execution and client work determine end-to-end duration.
- Runtime receipts record the explicit SDK module and package hashes. Native validation verifies input snapshots, request hashes, complete outputs and inference seals.

## Mixed Results

- Every expected issue is found in 160/175 affected passages. All three labels match in 181/200 passages; three of 25 passages labeled clean for all checks receive a finding.
- Vague attribution catches 99/100 hits with two false positives. Inflated evaluation catches 94/100 with one false positive; the latter misses the recall bound.
- These 400 comparator judgments remain separate from the 400 primary hedging judgments. Another check finding a different defect never satisfies a missed hedging label.

## Error Review

All seventeen primary errors and ten comparator errors receive a passage-level review. Frozen scores retain all errors, including the five disputed judgments described below.

- The twelve hedging misses contain repeated uncertainty on an outcome or proposed cause.
  - "It is conceivable that a simple reply request might reveal places that families no longer want" receives `0.18`; both qualifications concern the forecast result.
  - "A paired shift might conceivably make those responsibilities easier to remember" receives `0.15` despite the prompt explicitly covering this construction.
  - "There is a small chance that your replacement lens might reach the branch this afternoon" receives `0.34`; the useful degree and deadline survive removal of the duplicate modal.
- Three hedging false positives suppress useful distinctions or narrative function.
  - An invoice "may reach ... perhaps, before the office closes today" distinguishes possible arrival from its uncertain deadline.
  - "Perhaps he was there. Perhaps, after all these years, he was there" develops a character's hope across the scene.
  - "Maybe, just maybe, the envelope still held the missing photograph" supplies suspense developed by the following actions.
- Two hedging no-hit labels remain disputed.
  - `000054-090507fcf521`: "A possible explanation is that moisture may be trapped" appears to repeat uncertainty on one cause; Jev flags it at `0.71`.
  - `000054-785d6facd634`: "A possible explanation for the silence was that the winding key might not be engaging" has the same scope question; Jev flags it at `0.72`.

The main failure is recognizing the contribution of qualifications in context. The missed examples include constructions explicitly described by the frozen prompt; their presence alongside another defect does not change the scoring procedure.

### Comparator Review

- Vague attribution incorrectly flags an explicitly identified pair of appendix trials and an engineering recommendation that the following paragraph rejects.
- Its missed "A quiet desk is often treated as a useful place" has a disputed authority label: the sentence can be read as a practical observation without an expert or evidence appeal.
- Inflated evaluation misses unsupported superiority and significance claims, including "more mature than rival implementations" and "a turning point in landscape history".
- Its false positive concerns a personal mattress-topper preference with stated comfort and storage reasons.
- Two attributed narrative boasts have disputed puffery labels: the bakery character's uncosted claim and the hotel notice's claim about luggage tags can be read as documented speech rather than adopted promotion.

## Verification And Consequence

- Dataset Fixture3 matches its approved output. Candidate prompts, labels, cutoffs and runner inputs remain frozen throughout assessment.
- Fresh independent review verifies all fourteen jobs across both assessments, 182 request hashes, SDK receipts and all 227 error-review entries.
- Preserve this candidate and its mixed recall failure. A future revision requires development label review and fresh holdout material; production integration and highlighting remain separate work.
