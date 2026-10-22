# Excessive Hedging Development

## Result

User review: pending. The bounded development round finishes with one `excessive-hedging/hedge-stacking` check meeting its selection and fresh-confirmation targets.

- Selection catches 95/100 isolated hits with four false positives, and 96/100 mixed hits with two false positives.
- Fresh confirmation catches 96/100 isolated hits with five false positives, and 97/100 mixed hits with two false positives.
- Each measurement requires at least 95 caught hits and at most five false positives in each set. The [experiment JSON](excessive-hedging-v18-development.json) records every native output and its producing prompt commit.
- Holdout inference awaits separate authorization. Production remains `0.2.41`; this round develops datasets and prompts.

These are synthetic, label-relative development measurements. Confirmation measures repeat behavior on the same inputs; the protected holdout supplies the later independent assessment.

## What The Check Judges

Catch repeated tentative qualification of the same proposition when a layer can be removed while preserving meaningful uncertainty and communicative function. Preserve distinct probability, evidence, population, conditions, capability, permission, politeness and purposeful narrative hesitation.

- The two legacy checks supply 68 vocabulary slots, including all twenty quantifier targets and five quantifier leads. Every collection represents all slots in context.
- The new check handles adjacent qualifications, uncertainty frames around already tentative outcomes and repeated possibilities across sentences. It judges contribution rather than token membership.
- Vague attribution and inflated evaluation remain separate mixed judgments using frozen `v11` and `v10` prompts.

## Data And Review

- Four paired collections, `000053` through `000056`, contain 800 passages and 1,600 judgments. Every evaluated check has exactly 100 hits and 100 no-hits per collection and split.
- Each mixed set contains 25 passages for each of eight combinations across hedging, attribution and puffery. Ten plausible settings cover professional, technical, academic, community, consumer and narrative writing.
- Three independent full reviews precede selection. Eight development judgments across seven passages change to no-hits before inference; complete writing remains intact.
- Six protected review attempts exceeded their permitted inputs and are invalidated. Replacement reviews use extracted definitions and explicit input allowlists; the review records distinguish these passes.
- The selected sets retain all 92 required cases. Git preserves forty reviewed surplus passages per collection: isolated development at `93be1e7f`, mixed development at `44f8782d`, and both holdouts at `8b80d26f`.
- Final copy screening finds zero candidates across 241,166,000 eligible comparisons against prior writing and the opposite split. A fresh mechanical freeze audit passes all 43 checks.

The split-specific [development](excessive-hedging-development-review.json) and [protected review](excessive-hedging-holdout-review.json) records preserve source hashes, adjudications, review scope and selection counts. Labels stay frozen throughout model evaluation.

## Prompt Development

The selected prompt is [hedge-stacking.md](../../prompts/v18/hedge-stacking.md), combined with unchanged [shared.md](../../prompts/v18/shared.md). It contains 945 assembled words and six complete development demonstrations, with three hits and three no-hits.

1. Baseline: 88 isolated hits with three false positives; 87 mixed hits with two.
2. Revision one: 92 isolated hits with five false positives; 94 mixed hits with two.
   - Clarify that a possibility frame and a modal predicting the same event can duplicate uncertainty. Preserve practical capability, evidence, negotiable requests and narrative hope.
3. Revision two: 95 isolated hits with four false positives; 96 mixed hits with two.
   - Clarify modal-plus-conceivably, adopted versus documentary quotations, and possible effects versus proposed causes. Replace one complete hit demonstration with a development possibility-frame example.
4. Stop at this first passing candidate. Run exactly one fresh confirmation, yielding 96/five isolated and 97/two mixed.

Against baseline, selection gains sixteen hits, loses none, and adds one false positive across both sets. Confirmation adds two catches and one false positive relative to selection.

- The added catches concern a damaged thumbnail (`000053-e9b529a0eedd`, probability 0.41 to 0.50) and printer reconnection (`000055-b37f8d8f6dfb`, 0.46 to 0.51).
- The added false positive concerns a bicycle symptom and proposed cause (`000053-be614aca59df`, 0.43 to 0.50). The fixed threshold includes exactly 0.50.

### Development Exposure

- Six current demonstrations cover five isolated passages and one mixed no-hit. Seven distinct passages appeared across all prompt revisions.
- Removing current demonstrations leaves 92/97 isolated hits caught with four false positives among 98 negatives; confirmation records 93/97 and five.
- The corresponding mixed counts are 96/100 caught with two false positives among 99 negatives; confirmation records 97/100 and two.
- Removing all seven passages ever demonstrated leaves 91/96 isolated hits caught during selection and 92/96 on confirmation, with four and five false positives among 98 negatives. Mixed counts remain as above.
- Remaining development writing informed error analysis and selection. Protected holdout writing, labels and snippets stay outside prompt authoring and model requests.

## Mixed Results

Frozen attribution catches 91/100 hits with two false positives, then 91/100 with three on confirmation. Frozen puffery catches 70/100 with two false positives in both measurements; both comparators fail the reference limits on this new set.

- Attribution's equal catch counts include two gained and two lost catches. Its additional false positive concerns an identified lab procedure; puffery's thresholded answers remain identical.

- Across all three checks, selection finds every expected issue in 134/175 affected passages; confirmation finds them in 136/175.
- All three answers match labels in 154/200 passages during selection and 155/200 during confirmation.
- At least one check fires in 164/175 affected passages, then 165/175. Three of 25 passages labeled clear for all three checks receive a finding in each measurement.
- Hedging catches 24/25 passages containing only hedging in both measurements. With puffery it catches 24/25, then 25/25; with attribution it catches 23/25 twice; with both it catches 25/25 twice.
- Its two mixed false positives occur in one all-no-hit passage and one attribution-plus-puffery passage. Each invocation judges complete passages independently; joint scores join fully qualified check answers by passage ID.

## Legacy Comparison

Run only legacy `hedge-stacking` and `softening-language` on the identical 400 development inputs. Their union catches 18 isolated hits with 27 false positives, and 23 mixed hits with sixteen false positives under the new definition.

- Selection adds 150 caught hits, loses none of the legacy catches, corrects 42 legacy false positives, and introduces five new false positives. One legacy false positive remains shared.
- Confirmation adds 152 caught hits, loses none, corrects the same 42 false positives, and introduces six. This yields seven false positives in total.
- These counts compare the named legacy checks with the consolidated definition. The [saved baseline](excessive-hedging-v18-legacy-development.json) records actual findings and implementation hashes.

## Remaining Errors

- Four isolated confirmation misses retain duplicated possibility: a research effect qualified by "might conceivably", a service comparison framed as "within the bounds of possibility ... could", a possible payment-failure cause, and possible restoration of a contact number.
- Three mixed misses concern a repair that "might be needed", a schedule that "may be the older draft", and recorder awareness that "may affect" responses, each already qualified by possibility wording.
- Five isolated false positives affect a quoted breakfast clause, permission versus attendance requirements, a possible bicycle symptom versus its cause, courier-bag membership versus arrival, and a negotiable meeting request.
- Two mixed false positives affect purposeful narrative hope and uncertainty about a technician's practical capability. Other defects in those passages remain independently eligible.

### Review Disagreements

- Independent hedging review covers all 35 changed or erroneous passages across every trial. It classifies 23 cases as clear model mistakes and twelve as substantive interpretation disputes.
- Of fourteen confirmation errors, nine are upheld model mistakes and five have competing readings. All fourteen remain in the reported errors.
- The courier-bag no-hit remains disputed. One review accepts the distinction between being inside a bag and arriving in it; another reads the sentences as the same delivery forecast. The frozen label preserves the distinct-event reading.
- Capability disputes include a shorter application attracting people, a service shortening uploads, and restoring a contact number. A concrete mechanism can describe practical capability or a possible outcome; the selected prompt preserves the distinction, while these passages expose its interpretive limits.
- Comparator review covers 46 passage/check judgments: all 43 baseline errors, 44 confirmation errors and five changed answers. Ten judgments have competing readings involving adopted versus documented opinion, implied rebuttal, or proportionate qualitative praise.
- Legacy-change review covers all 200 changed passages. It upholds 152 new catches, 42 removed legacy false positives and five new false positives; it also challenges the courier-bag no-hit.

Labels, writing and measurements remain unchanged after evaluation. The existing development review record preserves case-specific reasons; these disputes require judgment review before treating the sets as a definitive correctness standard.

## Complete Development Examples

Bold marks the labeled offending snippets. Classification-only Jev answers judge passages; the bold spans come from dataset labels.

### Five Hits

- `000053-260cebb228d0`: caught in selection and confirmation.

**There is a possibility that the parser might consume the final separator.** That would leave an empty field at the end of each record. Compare the raw bytes with the parsed field count before trimming whitespace; trimming first would remove the evidence we need.

- `000053-2ed5a403a09b`: caught in both. The second forecast repeats the weaker consequence of the first without an updated estimate.

**The mentoring places will probably fill before the end of term.** **The places are likely to be taken by the end of term.** Last year, most applications came after the first information session. We have added a second session for late-shift staff and asked supervisors to pass the dates to colleagues without regular email access.

- `000053-ca332cc500c2`: caught in both; the writer adopts the quoted diagnosis.

I now accept the repair shop's diagnosis: "The hinge **may perhaps** be bent." The door catches in the same place even after I level the cabinet, and changing the seal made no difference. I have booked an inspection for Monday and sent photographs of the gap so the technician can bring the right parts.

- `000055-74702d833726`: caught in both after baseline missed it. The other named checks judge the independent attribution and puffery.

Saved searches now include the date range selected when they were created. **Perhaps the range could help distinguish a current report from an older one.** Reporting specialists say keeping this context helps teams interpret results. This addition will remove ambiguity from business reporting. You can change the range before running the search, and the saved version remains unchanged until you choose to update it.

- `000053-17bdc66a0da4`: missed in both despite the clarified possibility instruction.

Our pilot research suggests that participants used the border as a timing cue. Removing it **might conceivably** reduce the apparent practice effect. The next experiment will keep the display interval constant while varying the border independently, rather than changing both features together.

### Five No-Hits

- `000053-08a85b4a4b7b`: correctly preserved in both; frequency, population and possible change contribute separate meaning.

These errors are often seen in some people during the first practice block. That frequency may decline with instruction, but our current session contains no repeat block. The methods section should distinguish the observed first-block pattern from the proposed learning explanation.

- `000053-52e9c69b9d42`: correctly preserved by selection and confirmation after revision one flagged it. A possible effect and proposed cause are distinct.

The compiler could reject this name. Perhaps the included header defines it as a macro. Check the preprocessed file.

- `000055-a297452ce803`: correctly preserved in both; uncertain practical capability depends on the lift. This complete passage is a prompt demonstration.

The two laundry quotes charge the same amount per bag, but Lin includes collection from the upstairs landing. There is a possibility that we could manage without that extra service when the lift is working. Our caretaker moved last week's bags downstairs on his ordinary round. I would still ask for the collection option during the planned lift repair.

- `000053-6ba5a266f72c`: falsely flagged in both; the passage documents contractual wording while asking what it covers.

The accommodation broker's contract says a booking "may not necessarily include breakfast." The hotel quotes breakfast as a separate item. We need the broker to identify which rooms include it before comparing the totals; the wording alone leaves that part of the price unsettled.

- `000055-c4d130c82989`: falsely flagged for hedging in both; the label preserves uncertainty about practical preparation capability.

Your repair appointment is now linked to the original fault report. There is a possibility that the technician could prepare the required parts before visiting. Repair advisers recommend sharing the report in advance. This preparation will make repeat visits unnecessary. Please add a photograph if the fault has changed since your first message, as the technician will otherwise see only the original description.

## Execution And Verification

- Jev `jev-1.13.0`, SDK `0.7.0`, threshold `0.5`, classification-only mode, batch size sixteen, and `--development-only` remain fixed.
- Twelve complete invocations make 156 requests and 2,400 judgments: 1,600 for hedging and 800 for frozen comparators. The fixed maximum was 2,800; first-pass stopping leaves revision three unused.
- Responses report 633,104 input tokens and 92,416 output tokens. Recorded request durations sum to 32.58 seconds; each 200-target invocation totals 2.48 to 2.97 seconds of request time. Process startup and review are separate.
- Offline validation reconstructs historical prompts from each producing commit and verifies all snapshots, request hashes, complete target assignments, inference seals and recomputed native scores.
- Dataset validation covers 15,701 pairs and 30,253 labels. All 46 dataset contracts, six paragraph-runner tests and the Fixture3 dataset comparison pass; full build, lint, spelling, formatting and type validation pass before evaluation.
- Final report review and final-commit CI are recorded when complete. User review and the separately gated holdout assessment remain the next quality decisions.
