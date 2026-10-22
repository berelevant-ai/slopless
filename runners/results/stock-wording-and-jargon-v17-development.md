# Stock Wording And Jargon Development

## Result

All five checks have completed the bounded development search and one confirmation of the selected candidate. Hidden-significance adverbs meet the target; the other four exceed the false-positive limit or miss too many labeled hits.

- Each isolated and mixed set contains 100 expected hits and 100 expected no-hits for each evaluated check.
- The target is at least 95 caught hits and at most five false positives in both sets and both measurements.
- The selected prompts are in `prompts/v17/`. The [experiment record](stock-wording-and-jargon-v17-development.json) preserves every original and corrected-cohort result, producing commits and prediction changes.

| Check | Selected revision | Isolated caught / false positives | Mixed caught / false positives | Confirmation isolated | Confirmation mixed |
| --- | --- | --- | --- | --- | --- |
| Cliche | R2 | 97 / 7 | 100 / 17 | 97 / 7 | 100 / 16 |
| Borrowed jargon | R1 | 97 / 8 | 98 / 10 | 97 / 10 | 98 / 9 |
| Tortured phrasing | R1 | 71 / 1 | 65 / 4 | 73 / 1 | 68 / 4 |
| Hidden-significance adverb | Baseline | 96 / 4 | 99 / 0 | 98 / 3 | 100 / 0 |
| Stock vocabulary | R1 | 93 / 23 | 100 / 20 | 94 / 25 | 100 / 22 |

These are synthetic, label-relative development results. Confirmation measures repeat behavior on the same writing. The protected holdout contains 1,200 passages and 2,000 judgments; its model evaluation awaits separate authorization. Production remains version `0.2.41`.

## Mixed Passages

Each of the same 200 mixed passages receives all five judgments: 1,000 complete decisions per measurement, with zero incomplete targets.

- All expected issues are found in 148/186 affected passages during selection and 152/186 during confirmation.
- All five answers match their labels in 125/200 passages during selection and 126/200 during confirmation.
- At least one issue is found in 185/186 affected passages in both measurements.
- Seven of fourteen passages labeled clear for all five checks receive a finding in both measurements. The clean group is small; retain these exact counts when describing the result.

The seven selected-run clean-label findings concern different boundaries:

- Borrowed jargon flags `000051-001`, containing "engineer your personal connection strategy". Its no-hit label treats engineer as ordinary causation; that interpretation is a substantive style boundary.
- Cliche flags `000051-081` and `000051-171`, using "one-stop shop" and "go above and beyond" beside supplied services or access assistance. Their labels preserve the useful-meaning reading.
- Tortured phrasing flags `000051-127`, which documents the course booklet's altered terminology before stating the actual subject. The label preserves documented wording.
- Vocabulary flags `000051-007`, `000051-103` and `000051-112`. Their labels preserve enough supplied scope, information or route distinctions to leave fewer than three ornaments.

These findings require issue-assignment and definition review. An overall finding on slop elsewhere in a passage does not satisfy a missed named check.

## What Changed

- Cliche R2 tests a conventional expression's contribution and preserves useful idioms. Against the corrected baseline it removes 55 false positives, adds four and loses three catches across both sets.
  - R3 increases mixed false positives from seventeen to thirty-six. Retain R2.
- Borrowed-jargon R1 distinguishes ordinary causation, real technical work and useful technical correspondence from decorative imported language. It removes 53 false positives, adds one and loses four catches.
  - R3 increases mixed false positives from ten to thirty-five. Retain R1.
- Tortured-phrasing R1 distinguishes adopted corrupted names from documented wording. It gains 38 catches, loses fifteen, removes nine false positives and adds three.
  - Many corrupted terms remain missed. R3 catches 64 isolated and 54 mixed hits, compared with 71 and 65 for R1.
- Hidden-significance adverbs retain the baseline. Both selected and confirmation results meet the fixed bounds.
- Vocabulary R1 tests each choice's meaning and ownership before counting distinct ornaments per paragraph. It removes 26 false positives, adds eleven, gains two catches and loses seven.
  - R2's explicit inventory categories produce sixty errors; R3 produces fifty-five. R1 has fifty, so the fixed rule retains R1 after two non-improvements.

The full search contains five baselines and three revisions each for cliche, borrowed jargon, tortured phrasing and vocabulary. Every selected check receives one confirmation on its final inputs; unchanged isolated adverb confirmation is reused.

## Data And Judgment Corrections

- Twelve active collections contain 2,400 passages and 4,000 judgments. Every check has 100 hits and 100 no-hits per split in isolated and mixed data; both mixed sets cover all 32 combinations.
- Full reviewed pools preserve 302 surplus passages in Git. Corrected vocabulary pools are archived before selection at `3f663d8b` for development and `5ad88d08` for holdout.
- Vocabulary error review exposed inconsistent judgments about generic grades beside useful functionality. The clarified definition tests the word's own property rather than treating any useful feature as justification.
  - Across complete development pools, nineteen no-hits become hits, nineteen hits become no-hits and one hit's snippets change. The original active cohort contains nineteen, sixteen and one of those corrections respectively.
  - Protected review corrects six holdout cases. Writing and other checks' labels remain unchanged throughout correction.
- Corrected selection uses reviewed labels and stable IDs, without detector predictions. Original measurements remain separate; all affected candidate comparisons use the same corrected cohort.
- Final packaging preserves all 728 required cases, including every corrected case. All 2,805 literal snippets validate; the 2,400 current passage IDs have zero collisions with other datasets.

The copy screen finds zero candidates across 721,563,600 eligible comparisons with prior datasets. Protected checking against the union of old and corrected exposed development writing also finds zero candidates. Conservative cliche review retains at least 52 unseen central constructions among the 100 holdout positives.

### Remaining Judgment Boundaries

- Vocabulary's fresh R1 review raises 22 case-specific questions. Fourteen are resolved through existing meaning or ownership definitions; eight property-reading disputes remain recorded with unchanged labels.
  - These include whether a rota's extra swaps column supports "multifaceted", and whether an on-time salon visit supports "seamless". Their retained labels determine the reported errors.
  - Proposed teaching example `000051-108` was replaced before R3 evaluation: comparing interpretations and recording disagreements could support its "nuanced" wording. Its frozen evaluation label remains unchanged.
- Tortured-phrasing review records five disputed boundaries affecting 28 cases, including functional paraphrases and attribution versus adoption of altered course names.
- Borrowed jargon retains the disputed positive "operationalize the students' authentic voices" alongside ordinary-creation no-hits. Cliche retains disputed useful-idiom judgments.
- Repeated workshop/transcription contexts and a small set of garbled terms limit coverage diversity. The counts above describe these fixed collections; fresh writing remains part of the later corpus stage.

## Prompt Exposure

Each selected prompt contains three hit and three no-hit development demonstrations. Thirty demonstration judgments cover 29 distinct passages. All selected assembled prompts are below 1,000 words, including shared instructions, the question and both criteria.

- Exact examples are development material. Protected holdout passages, labels and snippets stay outside prompt-authoring contexts and provider requests.
- The experiment record also scores each selected candidate with its own demonstrations removed. All four failing checks still fail a bound; the adverb check retains its passing rates.
- Remaining development passages informed error analysis and candidate selection. Holdout supplies the next independent assessment.

## Execution And Verification

- Use the existing native runner, Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode, threshold `0.5` and sixteen-target batches.
- Unique native outputs contain 11,400 passage/check judgments across 741 requests, including original trials, corrected-input reassessments and confirmations. Repeated offline validation adds zero provider calls.
- Recorded usage totals 3,620,647 input tokens and 354,929 output tokens. Summed request time is 194.45 seconds; parallel requests and review work have separate elapsed times.
- Native response seals, exact request contents, dataset assignments, producing prompt hashes and offline scores are checked before combining final mixed results.
- `pnpm run validate` passes. All 15,697 dataset pairs validate, all 46 dataset contracts pass, Fixture3's dataset suite matches, and all six paragraph-runner tests pass after compilation.
  - Initial dependent probes raced a concurrent build's removal of `dist`; rerunning them after the completed build passes.

Run the selected check on development through the public runner:

```sh
node runners/jev.mjs run --prompts prompts/v17 --dataset datasets/ai-synthetic/passages/000041-stock-wording-and-jargon-cliche-development.md --family stock-wording-and-jargon --check cliche --model jev-1.13.0 --mode classification-only --threshold 0.5 --batch-size 16 --development-only --output runners/results/cliche-new-development-run.json
```

The existing [development review](stock-wording-and-jargon-development-review.json) and [protected packaging review](stock-wording-and-jargon-holdout-review.json) retain source hashes, selection constraints and review coverage. A fresh independent report audit passes all 57 native outputs, fifty complete examples and six command results with zero actionable objections; its outcome is recorded in the experiment JSON.

## Complete Development Examples

Each check has five expected hits and five expected no-hits below. Bold marks the labeled offending snippets; Jev supplied passage classifications. Examples include correct predictions and errors, and are selected independently for each named check.

### cliche

#### 000041-063: expected hit, unflagged (isolated)

**Christmas has come early** for the warehouse team with this week's update. Delivery sheets now print the shelf location beside each item, using the location stored on the product record. Items without a location print a blank space. The sheet still groups items by the supplier's order number.

#### 000041-120: expected hit, unflagged (isolated)

I would describe Meadow Couriers as **a safe pair of hands** for our shop deliveries. It collects from the rear entrance at four and sends a list of parcel numbers by email. The competing service collects an hour earlier. Neither quote includes Saturday collection, which we would have to arrange separately.

#### 000041-011: expected hit, flagged (isolated)

The revised bus timetable is **the light at the end of the tunnel** for our village. From Monday, route 14 will stop outside the surgery at 8:40 and return from the town centre at 12:15. Printed copies of the timetable are available from the post office and the reception desk at the surgery.

#### 000041-012: expected hit, flagged (isolated)

The interviews offer **a rich tapestry of student experience**. We asked twenty commuters to describe their first week on campus, including travel times and missed classes. Twelve reported leaving home before seven. The accounts are grouped by journey length so that readers can compare students facing similar travel schedules.

#### 000041-014: expected hit, flagged (isolated)

We **go the extra mile** for our customers. Your invoice is available under Billing in your account, and the Download button saves a PDF copy. If the company address needs changing, reply with the new address and I will update the invoice. Your payment date and the amount charged will stay the same.

#### 000041-013: expected no-hit, flagged (isolated)

The preview panel brings your data into sharp focus. After selecting a CSV file, choose the column that contains the account number. The panel shows the first twenty rows with that column shaded. Check that the numbers have retained any leading zeroes before pressing Import; the imported file will use the displayed values.

#### 000041-050: expected no-hit, flagged (isolated)

I have refunded the damaged mug and cancelled the replacement request. You can keep the saucer, so every cloud has a silver lining. The refund should appear on the card statement within three working days. Please reply to this message if the bank asks for a transaction reference.

#### 000041-001: expected no-hit, unflagged (isolated)

I bought this scale to check the weight of gold before taking some old jewellery to a dealer. It reads to two decimal places and includes a small calibration weight. The tray holds a necklace without letting the chain hang over the edge, which was a problem with my kitchen scale.

#### 000041-002: expected no-hit, unflagged (isolated)

Your parcel is on the van today. The courier has to drive an extra mile because the bridge on Mill Road is closed, so the delivery window now ends at six rather than five. The tracking page will show the driver's position once your address is the next stop.

#### 000041-004: expected no-hit, unflagged (isolated)

The tapestry has a richer range of reds along its lower edge, where the hanging above it protected the wool from daylight. We compared fibres from the exposed and covered sections under the same lamp. This difference helps distinguish fading after installation from the weaver's original choice of colours.

### borrowed-jargon

#### 000043-024: expected hit, unflagged (isolated)

Our Monday walking group offers a weekly **cognitive tune-up** for anyone working from home. We meet outside the post office at twelve, walk beside the river, and return in time for lunch. Come along if you would enjoy some fresh air and a conversation with people from the village.

#### 000043-084: expected hit, unflagged (isolated)

The retreat gave me a chance to **recalibrate my inner compass** through guided journaling. Each morning we wrote about a person we missed and something we would enjoy doing together. I appreciated the hour alone on the terrace afterward, and the host brought tea without expecting anyone to join a discussion.

#### 000043-002: expected hit, flagged (isolated)

Saturday's shared lunch is a chance to **reengineer how we connect as neighbors** after the winter. Bring a dish to the hall at noon, or come along and eat what others have brought. There will be a separate table for children, and anyone who has recently moved into the street is welcome to join us.

#### 000043-005: expected hit, flagged (isolated)

To **bootstrap your personal operating system**, open the Morning List tab and write down three things you would like to do today. Put the most urgent item first, then choose a reminder time. The list remains on your home screen until you check off the items or replace them the following morning.

#### 000043-008: expected hit, flagged (isolated)

The paired discussion serves as a **confidence debugger** before students present their proposals. Each partner describes a worry about speaking in front of the class, and the other offers encouragement. The lecturer then invites volunteers to read their opening paragraph aloud. The exercise takes ten minutes at the beginning of the seminar.

#### 000043-067: expected no-hit, flagged (isolated)

The new Welcome Wall helps you engineer belonging from the first day. New members can post a photograph and a few sentences about themselves, while existing members can reply with a greeting. Administrators can pin the wall above the discussion board for the first week of a new course.

#### 000043-072: expected no-hit, flagged (isolated)

Try the Sunday page as a way to operationalize joy in your week. Add one meal you would like to cook and one person you would enjoy seeing, then choose a day for each. Your reminders will appear alongside appointments, and you can move either plan if your working hours change.

#### 000043-001: expected no-hit, unflagged (isolated)

Northgate includes firmware updates in the scanner lease; Bell Street charges for each engineer visit. Both scanners read our existing parcel labels, but Northgate can install updates remotely after the depot closes. I would choose its lease because we can schedule those installations without taking a scanner away from the packing bench.

#### 000043-006: expected no-hit, unflagged (isolated)

Please refactor the welcome-email renderer so the two account types use the same address-formatting function. The current copies disagree about where to put the postcode. Keep the customer-facing wording unchanged, and include examples for both account types in the review so we can check that the shared function handles each format.

#### 000043-007: expected no-hit, unflagged (isolated)

After the tenants' meeting, Rosa compiled a new telephone list from the slips people had handed in. She called the two households whose numbers were hard to read, then printed a copy for each floor. Residents could ask her for another copy at the caretaker's desk during the following week.

### tortured-phrasing

#### 000045-001: expected hit, unflagged (isolated)

Alder's **profound learning** system trains a multilayer neural network on our labeled weld photographs. Bell's system instead compares each photograph with a fixed reference image. Alder needs more examples during setup, while Bell requires the camera and lighting to remain in the same positions after calibration.

#### 000045-002: expected hit, unflagged (isolated)

The **irregular forest** classifier builds many decision trees from resampled training observations. At each split, it considers a random subset of the available features. We average the trees' predictions for the final estimate, then assess the model on photographs that were excluded from training and parameter selection.

#### 000045-003: expected hit, flagged (isolated)

The community centre will host a **bosom peril** information session on Thursday evening. A screening nurse will demonstrate how mammograms are taken and explain what happens if a lump needs further investigation. The session starts at seven in the upstairs meeting room, with step-free access through the rear lift.

#### 000045-005: expected hit, flagged (isolated)

Receipt capture now uses **counterfeit consciousness** to suggest a category for each purchase. It learns to recognize purchase types from labeled receipts and runs on your device. Suggested categories appear beside the extracted totals, and you can change them before saving. Existing entries keep their current categories after the update.

#### 000045-008: expected hit, flagged (isolated)

The calculator still worked, but two digits on its **fluid gem display** had become unreadable. The repairer removed the flat panel from beneath the glass and cleaned the contacts along its edge. When she put it back, all eight digits appeared during the startup test, including the two missing segments.

#### 000045-011: expected no-hit, flagged (isolated)

The new chapter introduces a counterfeit consciousness assembled from recordings of the missing captain. Players can question it about the ship's route, but its answers reflect only memories present in those recordings. This update also fixes a conversation loop that prevented the engineer from opening the navigation room.

#### 000051-109: expected no-hit, flagged (mixed)

Our new mentoring lunch lets colleagues spread their wings through a personal presence reboot. We ask everyone to describe an activity they enjoy and practice introducing it to someone outside their usual team. The prompt card is silently instrumental to the conversation, giving both partners the same opening question. Managers quietly chose the date in a closed meeting and withheld the announcement until cover was arranged, so staff will receive the invitation only after their shift manager confirms they can attend.

#### 000045-004: expected no-hit, unflagged (isolated)

The watch has a man-made leather strap that dried quickly after I washed my hands. I found the sleep advice less useful. Its reasoning appeared below each recommendation, but the same suggestion to go to bed earlier appeared after both a short night and a full eight hours.

#### 000045-007: expected no-hit, unflagged (isolated)

Measure the signal-to-noise ratio with the microphone in its intended position and the ventilation running. Record ten seconds of room noise, then read the calibration sentence at the normal speaking level. The clamor from the loading bay should remain in the noise sample if operators will hear it during normal use.

#### 000045-009: expected no-hit, unflagged (isolated)

Please change 'data and interchanges innovation' to 'information and communications technology' in the course outline before sending it to the college. The phrase came from the translation draft. Keep the module descriptions as they are; the tutor has already checked the sections on networking, spreadsheets, and workplace email.

### hidden-significance-adverb

#### 000047-058: expected hit, unflagged (isolated)

A transcription convention specifies how pauses and interruptions are marked on the page. It **silently** underpins the comparison between interviews: the same mark must refer to the same kind of event in every transcript. Otherwise, differences introduced by the transcribers may be mistaken for differences between the speakers.

#### 000047-082: expected hit, unflagged (isolated)

The town's published market reports showed stalls **quietly** returning to the square after the road reopened. Eight traders attended the first Saturday and fourteen the next. The organiser marked out two more rows for the following week, leaving a clear passage from the bus stop to the pharmacy entrance.

#### 000047-001: expected hit, flagged (isolated)

The removable crumb tray makes this toaster **quietly** superior to the one it replaced. I can empty it over the sink without turning the whole appliance upside down. The toast is about the same, and the timer knob is harder to read, but cleaning it takes much less effort.

#### 000047-002: expected hit, flagged (isolated)

The saved date range is a **quietly** important addition for monthly reconciliation. It restores the period selected during the previous session, so returning to an unfinished reconciliation no longer requires entering both dates. The range remains editable from the same calendar control.

#### 000047-004: expected hit, flagged (isolated)

The earlier closing time **quietly** changes the plan for Saturday's repair session. The caretaker must lock the hall at noon, so the last repair will be accepted at eleven. Please bring lamps and small appliances to the side entrance, where a volunteer will record your name and the fault.

#### 000047-077: expected no-hit, flagged (isolated)

The committee quietly approved temporary fee waivers at a closed meeting on Monday. Individual applications contain personal financial details, so the discussion will not be published. Members will receive a summary showing the number of waivers and their total value alongside the usual monthly accounts.

#### 000047-089: expected no-hit, flagged (isolated)

I am quietly pleased with how the trainee handled that complaint. She let the customer finish, checked the receipt, and offered the replacement without turning the exchange into an argument. I told her afterwards that she had done well, rather than drawing attention to her in front of the queue.

#### 000047-003: expected no-hit, unflagged (isolated)

The Vale unit runs quietly enough for the reception desk, whereas the Arden unit's fan is audible from the waiting chairs. Both printed our test labels clearly. Since reception staff will use the printer during conversations with visitors, the noise difference favours Vale for this particular location.

#### 000047-005: expected no-hit, unflagged (isolated)

The secretary quietly asked three members to cover the overdue rent before the general meeting. She spoke to each of them separately and kept their contributions out of the minutes at their request. At the meeting, she reported that the rent had been paid without naming the people who had paid it.

#### 000047-010: expected no-hit, unflagged (isolated)

The desktop app now downloads updates silently while you work. A small indicator appears only when the download is complete, and installation waits until you quit the app. You can pause downloads from Settings if you are sharing a connection during a call.

### stock-vocabulary

#### 000049-205: expected hit, unflagged (isolated)

Saved searches now appear above the ticket list, a **rich** addition to the page. Select a previous query to run it again. Our **holistic** handling of saved searches includes renaming: open the three-dot menu beside the query and choose Rename. The sidebar follows the same **curated** approach, with a **rich** presentation of your last five searches.

#### 000049-216: expected hit, unflagged (isolated)

I have attached Friday's catering order for approval. The **refined** approach to lunch planning gives a **distinctive** character to the order. Everyone chooses a sandwich by noon on Wednesday, and I send the quantities to the cafe. A **sophisticated** addition to the routine is the collection list beside the kitchen door. Please check your name on this **refined** list.

#### 000049-203: expected hit, flagged (isolated)

Parcel collection has received a **sophisticated** update. From Monday, parcels for residents of blocks A and B will be held beside the caretaker's office. The **curated** process gives residents a **comprehensive** collection experience: bring the delivery email between four and six, and the caretaker will find your parcel. This **curated** arrangement also covers Saturday deliveries.

#### 000049-204: expected hit, flagged (isolated)

I bought this label printer for jars and school folders. Its **refined** approach **elevates** everyday labeling. I choose a saved label on my phone and press print, with **nuanced** handling that also extends to replacement rolls: the app shows the roll I need and a button to order it. This **refined** approach has made it my usual choice for addresses too.

#### 000049-206: expected hit, flagged (isolated)

In April, the records office adopted a **nuanced** approach to planning applications. Clerks copied the street name onto a folder tab and filed each application under that street. The **multifaceted** arrangement lent a **sophisticated** dimension to the daily filing routine. This approach remained in use until September, when the office began numbering the folders instead.

#### 000049-202: expected no-hit, flagged (isolated)

We moved our weekly rota from email to a shared sheet. That holistic adjustment gives shift planning a nuanced character: everyone enters their available hours by Thursday, and I assign the weekend cover on Friday. The multifaceted arrangement also includes a column for swaps. We will carry this holistic approach into next month's rota.

#### 000049-212: expected no-hit, flagged (isolated)

Our team now puts the meeting date in the subject of every agenda email. This holistic adjustment lends a nuanced touch to the inbox. Colleagues search the date to find the papers. The multifaceted approach also covers attachments: we put the meeting date in their names, carrying that holistic touch through to the minutes.

#### 000049-210: expected no-hit, unflagged (isolated)

This holistic update gives the image preview a nuanced presentation. It has richer color on supported displays because it now reads the image's embedded color profile. Gradient bands are smoother at low brightness. The renderer is also more robust against incomplete uploads: it checks the file length before decoding and offers a retry when bytes are missing.

#### 000049-213: expected no-hit, unflagged (isolated)

The toy chest has a robust hinge that held the lid open even when my son leaned against it. The carved leaves are intricate enough to catch dust, so I clean them with a brush. Its vibrant blue matches his curtains. The shop included a thoughtful card addressed to him by name.

#### 000049-218: expected no-hit, unflagged (isolated)

Thank you for the thoughtful description of what happened; including the order number and a photograph saved us a further exchange. I have arranged a replacement lid for tomorrow's post. We have made a considered choice to send the metal version because you said the plastic clip broke twice. The dispatch email will contain the tracking link.
