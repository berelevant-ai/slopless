# Wordiness And Redundancy Development

## Current Results

Each isolated check uses the same 100 expected hits and 100 expected no-hits across its trials. Keep the labels fixed and report every failed candidate.

- Wordiness selects `wordiness-r2`: 98 hits caught, two missed, and 20 false positives. The false-positive gate fails.
- Redundancy retains `b0`: 83 hits caught, seventeen missed, and eleven false positives. Both gates fail; two consecutive worse revisions stop its round.
- Repeated explanation selects `repeated-r2`: 98 hits caught, two missed, and five false positives. It meets both development bounds and the 1,000-word prompt limit.
- On final mixed development, unchanged prompts catch 99/100 wordiness hits with 75/100 false positives, redundancy 83/46, and repeated explanation 99/twelve. All three exceed the false-positive bound.

## Attempts

- Wordiness: `b0` 97 caught/23 false positives; `r1` 99/23; `r2` 98/20; `r3` 99/23. The three-revision limit stops this round.
- Redundancy: `b0` 83/11; `r1` 93/27; `r2` 66/9. Greater local sensitivity increases false positives; stronger protection loses many real duplicates.
- Repeated explanation: `b0` 100/7; `r1` 97/4; `r2` 98/5. R1 exceeds the prompt-size limit at 1,024 assembled words and remains ineligible. R2 uses 962 words. Count shared instructions, check body, and effective question fields separately throughout.

Native histories are [wordiness](wordiness-v16-development.json), [redundancy](redundancy-v16-development.json), and [repeated explanation](repeated-explanation-v16-development.json). Each preserves request hashes, prompt snapshots, raw responses, probabilities, and usage for every attempt. Reconstruct complete requests from those snapshots and their frozen datasets.

## Comparison And Exposure

- Across the 600 isolated judgments, baseline prompts catch 280/300 hits and flag 41/300 no-hits. Selected prompts catch 279/300 and flag 36/300: 543 correct judgments versus 539 at baseline.
- Relative to baseline, selected prompts add two catches, lose three, correct six false positives, and introduce one. The twelve changed classifications improve eight judgments and worsen four.
- Selected prompts quote sixteen complete development inputs: six for wordiness, six for redundancy, and four for repeated explanation. Thirteen wordiness inputs and sixteen redundancy inputs appear as demonstrations across all attempted revisions; repeated explanation uses the same four throughout.
- Excluding current demonstrations, wordiness catches 95/97 hits with 20/97 false positives; redundancy catches 81/97 with 11/97; repeated explanation catches 96/98 with 5/98. The remaining inputs were still available during development and error review.
- All ten isolated trials total 2,000 decisions in 53 requests, with 648,254 input tokens, 58,612 output tokens, and 16,970 milliseconds of saved request time. Human-facing elapsed work also includes writing, review, adjudication, and mechanical checks.
- Keep Jev 1.13.0, SDK 0.7.0, classification-only mode, and threshold 0.5 fixed. Passage batches contain 100 targets; complete-text batches contain sixteen, with an eight-target final batch.

## Remaining Errors

- Wordiness still overflags useful formal language, capabilities, permissions, named outputs, and quoted wording. Its two misses retain action and location scaffolding. Fresh review inspects all thirty-nine union-error inputs; separate adjudication retains the disputed ordinary-language control consistently with the pre-inference pilot boundary.
- Redundancy misses phrase-level duplicates while overflagging useful glosses, documentary quotations, and meaningful heading/opening relationships. Fresh review retains all labels after inspecting the sixty-four union-error inputs; its first revision trades eleven new catches for sixteen new false positives and one lost catch.
- Repeated explanation misses the repeated credit mechanics in `000037-022` and repeated rain-protection rationale in `000037-188`. Its five false positives concern a useful comparison recap, two point-of-use explanations, and two renewed procedural precautions.
- All failed checks retain their best measured candidate and explicit failed gate. Further tuning requires a separately justified development round; the selected prompts remain research candidates.

## Reviewed Correction

- Independent adjudication removes two yellow-badge callback snippets from `000037-188`; the rain-protection pair still supports its existing hit label. The complete text and every classification boolean stay unchanged.
- Appended native `rescores` entries in the [repeated-explanation history](repeated-explanation-v16-development.json) preserve every original prediction and score value, confirming zero classification-score changes. The dataset review record documents the snippet correction.
- A pre-inference prompt-size guard now checks the shared instructions, check body, question, and both criteria in the existing private development driver. Its regression probe first reproduces SDK access with an oversized prompt, then all 157 integrity probes pass after the repair.

## Mixed Development

The final [mixed collection](../../datasets/ai-synthetic/texts/000039-wordiness-and-redundancy-mixed-development.md) was frozen at `61b0f69c` before its assessment. Its 200 complete texts carry 600 judgments, with exactly 100 hits and 100 no-hits for each check.

- Wordiness catches 99 hits, misses one, and produces 75 false positives. Redundancy catches 83, misses seventeen, and produces 46 false positives. Repeated explanation catches 99, misses one, and produces twelve false positives.
- Across all checks, 281/300 expected hits are caught and 133/300 no-hits are flagged. This gives 448/600 correct judgments; all three checks exceed the fixed false-positive bound.
- All expected issues are caught in 152/170 texts containing an issue. All three booleans match in 77/200 texts. If counting any family finding, 166/170 affected texts are flagged, alongside 10/30 completely clean texts.
- The [native result](wordiness-and-redundancy-v16-mixed-development.json) preserves 39 requests and 600 decisions, using 297,310 input tokens and 17,756 output tokens. Saved request time totals 10,190 milliseconds.
- The isolated selected prompts, model, threshold, and execution settings remain unchanged. Each request contains at most sixteen complete targets and one named check; each check uses thirteen requests.

### Findings By Combination

- Among wordiness no-hits, false positives occur in 10/30 texts clean for all three checks, 17/20 with local redundancy alone, 19/20 with repeated explanation alone, and 29/30 with both other issues.
- Redundancy flags 44/45 of its no-hits that contain repeated explanation, versus 2/55 of its other no-hits. Repeated explanation flags 11/45 of its no-hits containing local redundancy, versus 1/55 of its other no-hits.
- These are observed classification differences across labeled groups. The runner thresholds one model probability per check and complete input at 0.5; reviewer quotes explain the labels and remain separate from model highlighting.

### Reviewed Errors

- All 152 final errors have complete-input review coverage. Earlier reviews carry forward for 144 unchanged error judgments; the parent reviews all eight new or changed error judgments across seven complete texts.
- Wordiness overflags useful formal actions and passages whose excess belongs to the repetition checks. A protected example is "The committee can recommend a room allocation, but the department head must approve it before anyone moves": the verbs express different powers.
- Its one remaining miss is `000039-261`, containing "in the event that". Among eighteen original/padding-positive pairs, seventeen variants are caught, fifteen originals are falsely flagged, and only two pairs receive both correct decisions.
- Redundancy misses local duplicated meanings such as "combined together" and "available offline without an internet connection". Its false positives concern separated explanations and useful glosses; "The highest point with the head raised is the height to check" tells the buyer how to measure it.
- Repeated explanation misses the distant register-recording explanation in `000039-158`. Its twelve false positives comprise ten adjacent-duplication cases and two useful returns, including the deadline recap and the sealant warning immediately before application.
- Fresh adjudication retains the deadline recap's no-hit label. The same sentence's "which is the last day requests can be submitted" remains locally redundant; each check judges its own defect.

### Data Review And Preservation

- Independent final review corrects sixteen judgments before inference, preserving their complete texts. Fifteen concern ordinary operation wording; the other is a useful procedural reminder. Fifteen new same-split variants add explicit padding while retaining the original controls.
- The final development set retains all 112 required cases and thirty required all-negative texts. Adjusted combination counts of 20-30 preserve the 100/100 per-check denominators; holdout keeps 25 per combination.
- The corrected full 252-text development pool remains at `d7b01a08`, including 52 surplus texts. The 216-text holdout pool remains at `24144852`, including sixteen surplus texts. The eight active collections contain 800 inputs per split and pass a 640,000-pair lexical overlap screen with zero candidates.
- Development contains eighteen intentional original/variant pairs. They share context and are recorded together; report the 200 inputs as a development sample with related examples.
- One error-review context ran a broad `runners/` search exposing historical holdout-result metadata. Its output was truncated; that context is excluded from future prompt authoring. Prompts remain byte-identical to the pre-incident selected candidates.
- Holdout inference remains separately gated. The isolated and mixed assessments use different inputs; both retain their failed targets and saved predictions.

### Post-Freeze Label Corrections

- Independent adjudication corrects wordiness labels `000039-005`, `000039-103`, and `000039-149` to no-hit. They preserve degree and ability, tentative evidence, and an ordinary assessment action respectively. Their complete writing remains unchanged.
- The [first assessment at `384f0d64`](https://github.com/berelevant-ai/slopless/blob/384f0d64227fe045268a451391fe663508a8b740/runners/results/wordiness-and-redundancy-v16-mixed-development.json) preserves every original prediction and appended offline rescoring. Wordiness changes from 96/100 caught and 74/100 false positives to 96/97 and 74/103; the other checks retain their counts. Corrected all-issues-found is 152/170 and exact match 77/200.
- Three reviewed variants restore a balanced cohort through the predeclared stable-ID selection rule. The final set keeps 195 previous inputs with identical writing and corrected labels, adds five, and archives five; none of these choices uses detector scores.
- Of the 585 repeated judgments on unchanged inputs, six cross the same 0.5 threshold between runs. Their recorded probabilities fall between 0.44 and 0.54; the prompts and execution settings remain unchanged.
- Final-versus-first differences include label corrections, changed inputs, and observed repeat variability. Report those causes separately from prompt tuning; this stage makes no prompt revisions.

## Complete Development Examples

These are existing labeled inputs, selected at positions 1, 21, 41, 61, and 81 within each class rather than by model score. Each check contributes five hits and five no-hits; the observed classification is stated explicitly.

Bold reproduces labeled hit snippets. For repeated explanation, paired spans show the earlier statement and its unnecessary return. No-hit examples retain their full wording; an unexpected model flag is identified as a false positive.

### Wordiness

Source: [complete development collection](../../datasets/ai-synthetic/passages/000033-wordiness-and-redundancy-wordiness-development.md); [selected prompt](../../prompts/v16/wordiness.md).

#### Expected Hits

##### 000033-078

Expected hit; model hit.

For outdoor use, the sealed keypad **is the one that would be our preferred choice**. Its buttons worked with wet gloves during the trial, and the display stayed readable in direct sun.

Before placing the order, please **carry out the task of noting** the mounting dimensions on the drawing. The older bracket may need another fixing hole.

##### 000033-070

Expected hit; model hit.

Please **arrive at a determination as to whether** the longer warranty justifies the extra $240. Both companies cover parts and labour for the first year. After that, one covers parts only; the other also pays for the engineer's travel, which was expensive on our last repair.

##### 000033-210

Expected hit; model hit.

The alarm sounded while the replacement filter was being fitted. The supervisor stopped the work **for the reason that** the airflow reading had fallen below the permit limit. Staff left the enclosure, the fitter secured the open housing, and the permit was suspended pending a fresh ventilation check.

##### 000033-120

Expected hit; model hit.

Could you please **make a decision in relation to which** cupboard we should clear for the new paper stock? The delivery is due on Wednesday, and it needs a dry space away from the sink. I can move the archived catalogues into the upstairs store if you choose the tall cupboard.

##### 000033-112

Expected hit; model hit.

When choosing a storage box, **take into consideration the question of whether** its lid can open beneath the shelf above it. A box may fit while closed and still be awkward to use in place. Measure with the lid raised, especially if you plan to keep frequently used tools inside.

#### Expected No-Hits

##### 000033-101

Expected no-hit; model no-hit.

An excess is the amount you pay towards an accepted claim. With a $100 excess, an accepted $600 claim would usually leave $500 for the insurer to pay. Some policies apply a different excess to particular kinds of damage, so check the schedule before comparing prices.

##### 000033-002

Expected no-hit; model no-hit.

The address on the replacement order is correct. The label you can see in your account belongs to the original parcel; the warehouse creates the replacement label when it packs the item.

We can request a different delivery day, but the courier has to confirm it. I've requested Thursday and will send you their answer when it arrives. If Thursday is unavailable, would you prefer Friday or a collection from the depot?

##### 000033-020

Expected no-hit; model no-hit.

The museum received the trunk in February, but it remained in the loading bay until the conservator had examined the damp lining. By April the lining was dry enough for the trunk to be moved upstairs.

That move changed its storage location, not its ownership. The family had lent it for the summer exhibition and still intended to collect it in October. The registrar entered both the loan end date and the new shelf number in the record before the case was closed.

##### 000033-094

Expected no-hit; model no-hit.

Both cabinets were found to be standing open when the morning shift arrived, although the closing checklist recorded them as locked. The cabinet keys were still in the key safe. Security retained the access log and asked the evening shift who had last used the cabinets.

##### 000033-128

Expected no-hit; model no-hit.

For tomorrow's collection, please:

- Ask the driver to sign the equipment list.
- Retain one copy at reception.
- Put the other copy in the crate.

The two copies serve different purposes. Reception uses its copy to confirm release, and the workshop checks the enclosed copy against what arrives.

### Redundancy

Source: [complete development collection](../../datasets/ai-synthetic/passages/000035-wordiness-and-redundancy-redundancy-development.md); [selected prompt](../../prompts/v16/redundancy.md).

#### Expected Hits

##### 000035-195

Expected hit; model hit.

**The drainage channel was covered with a metal grate.** **A metal grate lay over the channel** and could be lifted using the hooks stored in the shed. The caretaker removed it before clearing leaves from the outlet.

##### 000035-095

Expected hit; model hit.

**Recovery took longer than planned**

**Recovery took more time than we had planned.** The data copy finished on schedule, and the delay began when the replacement machine failed its disk check. We sourced another machine from the training room and restarted the copy.

##### 000035-023

Expected hit; model hit.

**Collection point:** **The collection point is** the rear loading bay. The front entrance has steps, so please bring the trolley round the side of the building. Ring the bell beside the roller door and someone from stores will let you in.

Your order is on two pallets. We can split it into smaller loads if your van has limited space, but please tell us before you arrive.

##### 000035-206

Expected hit; model hit.

The travel mug weighs **approximately 210 grams or so**, compared with 340 grams for the desk model. Both hold the same amount and use the same lid. The travel version has a narrower handle so it fits into a side pocket.

##### 000035-187

Expected hit; model hit.

**Departure time:** **The time of departure was** 06:20. The crew loaded the last two survey cases in the dark and pushed the launch away from the jetty. At the river bend, they stopped to take the first depth reading.

#### Expected No-Hits

##### 000035-157

Expected no-hit; model no-hit.

In the deposition, the witness said, "I saw it with my own eyes personally." The analysis retains the full wording because the following question challenges whether the witness had a direct view. Removing the personal-observation claim would obscure what the question refers to.

##### 000035-167

Expected no-hit; model no-hit.

Turn the handle in a clockwise direction until the clamp grips the frame. Check that the rubber pad sits flat against the wood before tightening the final quarter turn.

##### 000035-122

Expected no-hit; model no-hit.

I've nearly finished the induction pack. The fire procedure and contact page are ready; the map still needs the new entrance marked. Could someone in facilities check the route with me tomorrow morning? I can then send the complete pack to the starters.

##### 000035-074

Expected no-hit; model no-hit.

Please keep the phrase "free complimentary servicing" in the quotation comparison. It's the supplier's wording. We need them to identify the labour hours, call-out charge and replacement parts covered before we treat that line as a saving.

##### 000035-053

Expected no-hit; model hit (false positive).

The worker now retries a failed transfer once more after the initial retry. The second retry uses a different storage endpoint. The transfer history shows the original attempt and both retries, with a separate status for each.

### Repeated Explanation

Source: [complete development collection](../../datasets/ai-synthetic/texts/000037-wordiness-and-redundancy-repeated-explanation-development.md); [selected prompt](../../prompts/v16/repeated-explanation.md).

#### Expected Hits

##### 000037-094

Expected hit; model hit.

# Delayed invoice delivery

Invoices generated after 15:00 on Wednesday were saved correctly but remained unsent until Thursday morning. The delay affected ninety-one invoices. Customers could still download them from their accounts, and payment links on previously sent invoices continued to work.

**The invoice email worker stopped reading its queue when a large attachment exceeded its memory allowance. Restarting the worker retried the same invoice at the front of the queue, exhausted memory again, and prevented later invoices from being processed.** The attachment came from a manually added supporting document.

Finance noticed the growing unsent count at 08:20 on Thursday and contacted the duty engineer. The engineer removed the large attachment from the pending message, sent that invoice with a secure document link, and restarted the worker at 08:47. The queue cleared by 09:12. Finance checked all ninety-one records for a successful delivery event.

**The large attachment repeatedly exhausted the worker's memory because every restart returned to that same first invoice, leaving subsequent invoices waiting behind it.** Two customers had asked for copies during the delay; finance replied with account download links and checked that neither had paid against the wrong reference.

New attachment uploads now have a size limit that is shown before an invoice can be queued. Existing supporting documents above that limit are delivered as secure links. The engineer tested one large document followed by ordinary invoices and confirmed that the later messages continued through the queue.

Finance has added oldest-unsent age to its afternoon check, alongside the total number waiting. The engineer will add an alert for repeated worker exits under the same invoice reference, with the invoice number included for finance. The ninety-one invoices have been delivered; the new exit alert remains assigned to the platform team and is scheduled for the next deployment.

##### 000037-056

Expected hit; model hit.

Survey room 7.2 adds anonymous links, a clearer completion screen, and additional chart labels. The update is available to all workspaces today and applies to surveys created before the release as well as new ones.

**Anonymous links now discard the visitor's email address before a response is saved. The resulting response has no email field that an owner can export, even if the visitor arrived from an email campaign.** Choose an anonymous link from the Share menu; existing identified campaign links remain identified. The link preview shows which mode you selected.

Completion screens can include a contact button. Survey owners choose its label and destination, and the preview shows it at phone and desktop sizes. The button appears only after a successful submission. A connection failure leaves the response screen open so the visitor can retry rather than being sent to the contact destination.

Chart downloads now place long answer labels beneath the chart instead of cutting them off. The selected date range appears in the image footer. **Anonymous responses contain no exportable email address because the visitor's address is removed before storage, including when the visitor comes through a campaign email.** Owners can also choose whether unanswered questions appear as a separate category in the downloaded chart.

Administrators will see a new link-type column in the survey list. It records the mode of the most recently created share link and opens the full link history when selected. We fixed an error that occasionally showed a completed survey as still in progress after a browser refresh. For local installations, the release package checks the email-removal migration before enabling anonymous links; failed checks leave those links unavailable and display the record count needing attention. Back up the database before applying the package.

##### 000037-095

Expected hit; model hit.

# Unscheduled shutdown of the demonstration room

## Scope

The demonstration room lost power to its presentation sockets at 14:06 on Tuesday. Lighting and the corridor supply remained available. The afternoon training group paused for twenty-two minutes while staff moved the presentation to a battery-powered laptop. No participant equipment was damaged.

## Cause

**The presentation sockets are controlled by a timed contactor intended to switch them off after evening events. Its clock was set twelve hours out, so the programmed 02:00 shutdown occurred at 14:00 instead.** The six-minute delay in the log reflects the controller's staggered switch sequence. **The room's ordinary light switch did not restore the sockets because the timed contactor was still open.**

## Response

The trainer called facilities and asked participants to leave the affected plugs alone. The caretaker checked the circuit labels and contacted the electrical contractor, who attended the site. The contractor corrected the controller clock, checked its programmed schedule, and restored the presentation sockets at 15:05. The trainer completed the lesson using the laptop rather than reconnecting the projector during the final exercise.

The facilities assistant brought printed copies of the exercise sheets. Three participants had been relying on a shared monitor to read small details, so the trainer enlarged those pages before continuing. Their practical exercise ran to completion, while the final question period was moved to an online session on Thursday. The trainer has sent that invitation to the whole group.

## Controller record

**The controller's twelve-hour clock error moved the intended 02:00 socket shutdown to the afternoon, and the open contactor meant the wall light switch could not restore presentation power.** The contractor photographed the corrected display and wrote the next programmed switching time on the service record. The facilities assistant has filed the photograph beside the room circuit diagram.

The clock had been reset during a controller battery replacement on Monday. The contractor's job sheet confirmed the display time but did not record whether the display was using morning or afternoon. A second check will now compare the displayed next switching event with the actual room schedule, rather than approving the digits alone.

## Follow-up

Facilities will observe the next evening shutdown and the following morning startup. The caretaker will record whether the presentation sockets follow the agreed times. **The afternoon interruption happened because a clock twelve hours out applied the overnight contactor shutdown during the day; the ordinary light switch could not override that contactor.** The training coordinator will also keep a printed exercise set in the room cupboard, including enlarged copies for the shared-monitor tasks. Thursday's question session remains booked, and the contractor's switching checks are assigned for tonight and tomorrow morning.

##### 000037-153

Expected hit; model hit.

## Reading an incomplete passenger list

**A missing name in a surviving passenger list can mean that the person did not travel, but it can also mean that the relevant page was lost. Absence from the surviving document therefore leaves those two possibilities open.** The physical condition of the source belongs in the historical argument.

The register used in this exercise begins halfway through a numbered page. Three leaves have been cut out near the binding, and a later clerk has added totals on the inside cover. Students should describe those features before extracting names. A total copied onto the cover might refer to the original volume rather than the pages now present.

Handwriting creates another difficulty. The clerk sometimes abbreviated given names and occasionally put a place of residence in the space normally used for a surname. Compare repeated letter shapes within the same hand before deciding that an unfamiliar mark is a different initial. Record a doubtful reading with an uncertainty marker rather than silently choosing the most familiar name.

The transcription should preserve page numbers and indicate where a line continues from a missing page. **Someone absent from the surviving list may either have stayed behind or appeared on a page that has since disappeared.** Keep expansions of abbreviations in a separate column so another reader can recover the clerk's actual wording.

For the final exercise, select one named passenger and seek a second record made for a different purpose, such as a port payment or a household letter. Compare the dates and identifying details before treating the records as the same person. Submit the transcription together with a short account of the link you accepted and the evidence that made it persuasive.

##### 000037-161

Expected hit; model hit.

**Objects made from stone are more likely to survive in this soil than objects made from wood. The excavated collection can therefore overrepresent stone tools relative to the tools people actually used.** Interpreting a display requires attention to the process that produced the surviving collection.

The teaching case contains material from three pits excavated in different years. The earliest excavation retained only complete implements, while the later teams also collected fragments. Counts across the three pits consequently reflect different collection practices as well as any differences in their contents. Students should inspect the excavation notes before treating each cabinet as a comparable sample.

Descriptions can preserve these distinctions economically. A label might state that the cabinet contains complete implements retained during the first excavation. Another can explain why the fragments from the later pits were kept: their broken edges may show manufacturing stages that a finished object conceals. Drawings of those edges let visitors follow the interpretation without handling the originals.

The photograph panel should include a scale and identify which surfaces have been reconstructed. **Because wooden objects decay more readily here, stone objects have a better chance of reaching the excavation; the recovered tools can consequently make stone use appear more common than it was.** A contrasting background will help visitors distinguish the pale fragments from the support material used to hold them upright.

For the assessed exercise, propose captions for one complete implement and one fragment. Each caption should distinguish what is physically present from the activity inferred from it. Add a source note pointing to the excavation record that supports the inference. The class will compare how much interpretation a short label can carry while keeping the evidence visible.

#### Expected No-Hits

##### 000037-186

Expected no-hit; model no-hit.

# The missing drawer label

When I arrived at the archive, the shallow drawer nearest the window had a blank label holder. Our map request slip said only 'river survey, lower drawer', so I began with the cabinet on that side of the room. There were four lower drawers, each deep enough to hold several folders.

Marta brought the old cabinet plan from the office. Its pencil numbers matched marks inside the drawer handles, and we found the survey beneath a set of road plans. I carried the folder to the reading table while she checked the other drawers against the plan. Two had exchanged contents during last month's cleaning.

The researcher spent the morning comparing the survey with a later street map. At lunch she asked for tracing paper and a longer ruler. I found both in the education cupboard, where the ruler was still attached to a demonstration board with a strip of tape.

During the afternoon, Marta printed new drawer labels and updated the cabinet plan. She put the survey's full reference on its folder and copied that reference onto the request slip. The researcher used it in her notes before returning the maps to the desk.

The next morning a second reader asked for the same river survey. I took his slip to the window cabinet and went straight to the newly labelled drawer. Inside, the matching folder reference was visible without lifting the road plans. I brought it out before Marta had finished entering his name in the day book. She filed the old pencil plan with the cleaning record and put the revised copy by the request forms.

##### 000037-014

Expected no-hit; model no-hit.

The branch library will operate from the town hall's ground-floor room while its roof is repaired. The temporary service opens on Tuesday 6 August and will run on Tuesdays, Thursdays, and Saturdays from ten until two. The library building will be closed to visitors during the work.

The town hall collection will include children's books, recent fiction, and a small selection of local history titles. Other books can be requested through the catalogue and collected there once staff have sent a ready notice. Requests may take an extra day because deliveries will be combined with the central library's existing route.

Public computers will be available at the central library, where staff can also help with printing. The town hall room has wireless internet but no public printer. The Wednesday story session will meet in the park pavilion at its usual time; if heavy rain is forecast, staff will post a cancellation by nine that morning.

You can return borrowed books through the library's external return slot even while the building is closed. Staff will empty it each weekday. The temporary room will accept returns during opening hours, but the town hall reception team cannot take library items when the room is shut.

For a collection visit, go to the town hall on Tuesday, Thursday, or Saturday between ten and two, after receiving your ready notice. For a return outside those hours, use the slot at the library building. For a computer or printing, go to the central library. These different arrangements will remain in place until the roof inspection is complete; a reopening date will be posted at both temporary and permanent entrances.

##### 000037-020

Expected no-hit; model no-hit.

On the first morning of the community workshop, I put a red folder beside the entrance. It held the room booking, the equipment list, and a blank sheet for reporting anything damaged. The caretaker asked us to keep those papers together because another group would be using the room that evening.

Eight people arrived with small repair jobs. We moved two tables under the windows and left the centre of the room clear for larger items. A volunteer checked each job before assigning a place, which kept the queue at the entrance for the first twenty minutes. Once everyone was seated, I made tea and started recording the items people had brought.

Just before lunch, one of the folding tables became unsteady. We cleared it and found that a plastic foot was missing. Nobody had noticed whether it was there when we unfolded the table. I wrote the table's asset number and a description of the missing part on the damage sheet, then taped a note to the folded table so nobody would set it up again.

The last repair took longer than expected, but we finished packing with fifteen minutes left on the booking. We swept the floor, counted the tools, and put the chairs back in rows. The caretaker arrived as we were carrying the tea things out.

I handed him the red folder and opened it at the damage sheet. He recognized the table number and said he had a replacement foot in the store. Before the evening group arrived, he fitted it and crossed the table off his repair list. The papers we had kept together gave him both the room handover and the specific repair to complete.

##### 000037-160

Expected no-hit; model no-hit.

A rate compares a quantity with an exposure. Dividing the number of bus breakdowns by kilometres travelled gives breakdowns per kilometre. It expresses failures relative to how far the buses ran.

Suppose one depot records twenty breakdowns over a million kilometres and another records fifteen over half a million. The second depot has fewer recorded breakdowns but a higher rate: thirty per million kilometres compared with twenty. The exposure changes the comparison because the depots did different amounts of driving.

The denominator still needs a suitable definition. Passenger kilometres would answer a question about service experienced by passengers, giving a crowded bus more weight than an empty one. Vehicle kilometres answer a question about fleet operation. Neither can be selected solely because it produces a smaller number. The report should identify the operational question before choosing the rate.

Reporting per million kilometres makes the values easier to read than small decimal fractions per kilometre. It changes the scale of presentation while preserving the ordering and ratio of the rates. A chart should keep that scaling consistent across depots and years; otherwise the labels can imply changes that arose only from a different multiplier.

Finally, record what counts as a breakdown. A fault fixed during a scheduled stop and a failure requiring a replacement bus could have different consequences. If the count includes both, a second measure of lost service minutes may help describe those consequences. The exercise is to prepare one comparison with the exposure, event definition, and display scale written alongside it, then explain the decision that comparison could inform.

##### 000037-165

Expected no-hit; model no-hit.

A zero rainfall reading records an observed amount of none during the measurement interval. A blank reading records an absence of a usable measurement. The distinction matters because the same empty-looking entry can otherwise be interpreted in two incompatible ways.

In the field exercise, the observer reads the gauge at eight each morning and records rainfall for the preceding day. A dry gauge with a functioning collection system receives zero. If the observer cannot reach the site, the entry is marked missing even if the weather seemed dry elsewhere. The record describes the gauge observation, rather than a guess based on another location.

Suppose a week contains six recorded dry days and one missed visit. Replacing the blank with zero would report seven observed dry days. Keeping it missing preserves the fact that one day's amount is unknown. A weekly total calculated from the six observed days should therefore carry the number of days covered.

The distinction becomes especially important for averages. A spreadsheet can ignore blanks while including zeros. For a sequence with one recorded wet day, including six observed zeros produces a lower daily average than averaging only the wet reading. Both the values and the denominator need inspection before interpreting the result.

For submission, use separate fields for the amount and the observation status. The status field can distinguish a missed visit from a damaged gauge, while the amount field remains numerical whenever a valid amount was observed. Plot missing days as gaps rather than connecting them as dry observations. This makes the uncertainty visible at the point where readers would otherwise infer continuous measurement.
