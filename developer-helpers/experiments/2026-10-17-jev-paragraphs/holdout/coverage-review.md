# Semantic-thinness Holdout Coverage Review

Added 404 examples (13,631 words): 400 source-linked paragraphs and four supplementary controls. Together with the earlier 200 paragraphs, the holdout contains 604 examples and 24,046 words.

## Coverage

- All 36 pattern definitions have source-linked examples for all 243 template entries and all 115 declared rejection entries. Each reference lives in its label record, separate from target text.
- The additional 42 cases exercise broad-significance branches, scoped boring-solution forms, superficial trailing clauses, and precision boundaries. Three of their claimed existing guards are absent from the implementation; their valid negative examples remain useful stress tests.
- Source coverage means fresh instances of each declared relationship or construction and clean boundary. It does not enumerate every combination of slot words or require identical literal wording.
- Four added controls preserve an actual heading, a disputed bare bullet, a supported evaluative claim with measurements, and an explicitly labeled instructional list item.
- Claude supports at least one example for each of the 358 core source references. Independent review also confirms complete core coverage after the supplemental controls; individual judgments below remain visible.

## Review Results

- Ran 12 `claude -p` processes: a blind assessment and an adversarial label-and-coverage audit for each of six batches. All 404 new records received both assessments.
- Claude kept every author label in the 400 main paragraphs. The supplemental bare bullet, `holdout-602`, has one proposed pass-to-hit change. Original labels remain unchanged.
- Final verdicts: 394 agreements, 1 proposed label change, 3 boundary questions, 1 explanation error, and 5 coverage objections.
- Verified complete ID coverage, exact evidence spans, unchanged data hashes, and reconstruction of all 12 request hashes. Blind requests contain target text and references, with no author labels or coverage assignments.
- The 400 main paragraphs share no normalized eight-word sequence with the earlier 764 benchmark paragraphs, prior 200 holdouts, or prompt files checked. All 404 new targets are unique and contain no normalized whole-paragraph copies from the earlier sets.
- All original holdout files and Jev prompts remain unchanged. No Jev calls were made.

## Discrepancies For Judgment

### holdout-220: Boundary question

Author: pass. Claude recommends: pass. Confidence: medium.

> The replacement lid has a vent that releases steam away from the cook's wrist instead of toward the handle. **That difference matters.** During pouring, the wrist stays beside the handle and outside the vent's discharge path.

- Author's reason: The preceding sentence precisely identifies vent direction, and the summary is supported by the explained protection during pouring.
- Claude's reason: The surrounding sentences state both the changed vent direction and its safety consequence. Claude preserves the summary while acknowledging its removable wording.
- Counterargument: 'That difference matters.' is a hollow-significance positive example and adds no information the neighbors lack, so a strict reading flags it.

### holdout-228: Boundary question

Author: pass. Claude recommends: pass. Confidence: medium.

> The glaze test keeps clay, firing temperature, and cooling time identical, changing only the amount of iron oxide. **That is the point.** Any colour difference between the tiles can therefore be attributed to the changed iron content.

- Author's reason: The precise preceding experimental design makes the short payoff a valid summary, and the final sentence explains its inferential purpose.
- Claude's reason: The experiment design states the point, and the final sentence explains the inference. Claude preserves the summary while acknowledging its removable wording.
- Counterargument: 'That is the point.' is the literal vague-connective-payoff template 0 form and the paragraph reads identically without it.

### holdout-304: Boundary question

Author: pass. Claude recommends: pass. Confidence: medium.

> **The method was boring to perform**: I copied each handwritten address onto a separate card for the entire afternoon. **The task required no choices once the handwriting was legible**, and I welcomed the tea break.

- Author's reason: Boring describes the narrator's literal experience of performing repetitive copying rather than presenting unglamorousness as a solution's virtue.
- Claude's reason: The narrator describes the experience of repetitive copying. Claude keeps the pass, while acknowledging that method is also a solution-like noun targeted by the rulebook.
- Counterargument: The rulebook also targets calling a method boring. That broader wording could support a hit despite the stated repetitive experience.

### holdout-336: Coverage objection

Author: pass. Claude recommends: pass. Confidence: medium.

> In the fictional Harbor Lab salt-spray report, the copper lantern **ranked first for corrosion resistance, retaining an unbroken coating after every exposure cycle**. **The aluminum model developed pits** during the same sequence.

- Author's reason: A specified report and matched exposure comparison supply a concrete basis for the lantern's first-place evaluation.
- Claude's reason: Pass is correct: the ranking is sourced and backed by an observed property and comparison.
- Coverage objection: The paragraph reports a supported test ranking, so it is a good pass example, but lacks the praise framing assigned to this source exception.
- Added `holdout-603` to exercise an evaluative success frame with concrete measurements. Claude accepts its pass label and coverage.

### holdout-464: Coverage objection

Author: pass. Claude recommends: pass. Confidence: medium.

> In his draft, **Pavel writes, "The practical remedy for shrinking audiences remains boring."** **His editor circles boring and asks him to name the remedy** and its expected effect on ticket renewals. She deletes the sentence when he supplies neither.

- Author's reason: The boring-solution wording is a specifically attributed object of criticism, with the missing remedy and effect explicitly identified.
- Claude's reason: The boring-remedy line is Pavel's quoted draft, criticized and deleted. Label false is correct.
- Coverage objection: The helper lacks an attribution/criticism guard. The expected pass follows the editorial rulebook rather than an implemented helper exemption.
- This is retained as a precision-stress negative. The missing implementation guard is an observed distinction from a missing example; its editorial pass label remains supported.

### holdout-540: Incorrect explanation

Author: hit. Claude recommends: hit. Confidence: high.

> **The point is not rehearsal. The point is the rhythm.** This year's dance festival used the old assembly hall for its evening performances, with tickets sold from a desk beside the front entrance.

- Author's reason: The repeated point construction claims a distinction between rehearsal and rhythm while specifying neither the performance feature nor the review's conclusion.
- Claude's reason: The festival logistics leave the abstract contrast unexplained. The author's reference to a review is inaccurate because the paragraph contains no review.
- Counterargument: The stray reference does not change the label, so this is a minor rationale defect.

### holdout-588: Coverage objection

Author: pass. Claude recommends: pass. Confidence: high.

> The added brace held the beam level, **ensuring continued alignment within 0.4 millimeters of the survey marks during the load test**. The fictional inspector recorded the reading after each load increment.

- Author's reason: The comma introduces participial ensuring, but the alignment result is an observed, bounded measurement rather than empty significance.
- Claude's reason: The alignment clause states a measured result. Claude keeps its pass label and identifies an implementation gap in the comma-participle path.
- Coverage objection: The concrete-result exemption applies only to finite verbs; the comma-participle path still reports this measured clause.
- This is retained as a precision-stress negative. The missing implementation guard is an observed distinction from a missing example; its editorial pass label remains supported.

### holdout-597: Coverage objection

Author: pass. Claude recommends: pass. Confidence: high.

> The jig's witness marks coincide, **confirming continued alignment within the specified half-millimeter tolerance**. **Here alignment means that the bore centers differ by less than half a millimeter**; the probe readings show a 0.2 millimeter offset.

- Author's reason: Alignment has a literal geometric definition, an explicit tolerance, and probe evidence, resolving the apparently abstract target word.
- Claude's reason: The paragraph defines alignment geometrically and supplies a measurement. Claude keeps its pass label and identifies the same implementation gap.
- Coverage objection: The matcher checks abstract-looking words lexically and applies its concrete-tail exemption only to finite verbs. This measured comma-participle clause remains exposed.
- This is retained as a precision-stress negative. The missing implementation guard is an observed distinction from a missing example; its editorial pass label remains supported.

### holdout-602: Proposed label change

Author: pass. Claude recommends: hit. Confidence: medium.

> - **The answer becomes clear**

- Author's reason: The text starts with '- ', making the brief generic answer construction an actual Markdown list label.
- Claude's reason: Claude treats the bullet as a standalone claim rather than a structural label. It supplies neither the answer nor explanatory content.
- Counterargument: An isolated bullet could be an outline label awaiting expansion. The text alone leaves that intention unsettled.
- Added `holdout-604` with an explicit bold list label and instructional body. Claude keeps its pass label, while disputing whether the list-label or colon-content exception supplies the coverage.

### holdout-604: Coverage objection

Author: pass. Claude recommends: pass. Confidence: medium.

> - **The answer remains discipline:** Count the returned costumes against the checkout sheet, record any missing pieces beside the borrower's name, and leave the storage rail unlocked until the stage manager has checked the discrepancies.

- Author's reason: The thin-looking construction is a bold Markdown list label ending in a colon. The following body gives concrete costume-return instructions that the label organizes.
- Claude's reason: Claude keeps the pass because the instructions define the abstract claim after the colon, while disputing the list-label coverage assignment.
- Coverage objection: Claude assigns the case to the colon-example exception (`rejectIf[2]`) rather than the structural-label exception (`rejectIf[3]`).
- Independent review recognizes the explicitly marked list label. Both clean conditions can apply to one example; the actual heading in `holdout-601` independently covers this source rejection entry.

## Additional Coverage Review

- Independent review found that `holdout-297` describes quoted heading wording rather than presenting a heading. The original remains intact; `holdout-601` supplies the actual Markdown heading.
- The substitutions in `holdout-214` (in/within) and `holdout-368` (user/member) preserve the assigned construction. They count as semantic variants; exact lexical substitutions would defeat this holdout's generalization purpose.

## Verified Implementation Findings

The worktree public exports were loaded explicitly through textlint with only `semantic-thinness` and `superficial-analysis` enabled. This separates source verification from installed-package resolution.

- Nine informative or literal significance cases emit `hollow-significance`: `302`, `307`, `339`, `349`, `351`, `370`, `371`, `383`, and `384`. The helper returns before the generic concrete-detail guards.
- Two measured technical clauses, `588` and `597`, emit `superficial-analysis`. The concrete-tail exemption is limited to finite verbs, leaving these comma-participle clauses exposed.
- Slop case `313` produces no family finding. Its assigned real-work construction contains `when`, which the common rejection-token gate suppresses.
- The quoted-and-criticized boring frame in `464` demonstrates the editorial attribution boundary. Its claimed attribution guard is absent from the helper; this was not counted among the reproduced false positives.
- These data examples and their desired labels remain present. Library implementation changes are separate from this generation task.

## Source Inventory

- abstract-agency-personification: 15 template entries; 2 clean-boundary entries.
- abstract-contrast: 5 template entries; 3 clean-boundary entries.
- abstract-metaphor-claim: 21 template entries; 4 clean-boundary entries.
- abstract-personification-line: 4 template entries; 3 clean-boundary entries.
- body-emotion-shorthand: 6 template entries; 4 clean-boundary entries.
- body-knows: 6 template entries; 3 clean-boundary entries.
- deictic-summary: 27 template entries; 3 clean-boundary entries.
- different-job-summary: 1 template entry; 2 clean-boundary entries.
- emotion-as-substance: 10 template entries; 3 clean-boundary entries.
- empty-atmosphere-shift: 6 template entries; 4 clean-boundary entries.
- empty-emotional-weather: 4 template entries; 4 clean-boundary entries.
- empty-quantification: 1 template entry; 3 clean-boundary entries.
- empty-scene-state: 9 template entries; 4 clean-boundary entries.
- empty-scene-transition: 5 template entries; 4 clean-boundary entries.
- empty-significance-occasion: 5 template entries; 2 clean-boundary entries.
- fixed-metaphor-frame: 1 template entry; 3 clean-boundary entries.
- gaze-choreography: 4 template entries; 4 clean-boundary entries.
- generic-lesson-extraction: 4 template entries; 4 clean-boundary entries.
- generic-pressure-or-stakes: 4 template entries; 3 clean-boundary entries.
- generic-realization: 4 template entries; 4 clean-boundary entries.
- hollow-significance: 15 template entries; 4 clean-boundary entries.
- low-information-physical-blocking: 4 template entries; 5 clean-boundary entries.
- missing-conversation-plan: 3 template entries; 2 clean-boundary entries.
- point-is-frame: 5 template entries; 3 clean-boundary entries.
- puffery-evaluative-claim: 14 template entries; 3 clean-boundary entries.
- real-work-begins: 5 template entries; 3 clean-boundary entries.
- recursive-meaning-frame: 5 template entries; 3 clean-boundary entries.
- sensory-instead-of-frame: 1 template entry; 3 clean-boundary entries.
- silence-as-actor: 7 template entries; 3 clean-boundary entries.
- solution-boring-frame: 7 template entries; 3 clean-boundary entries.
- something-shifted: 12 template entries; 3 clean-boundary entries.
- summary-fog-transition: 1 template entry; 2 clean-boundary entries.
- truth-answer-moves: 6 template entries; 3 clean-boundary entries.
- vague-connective-payoff: 8 template entries; 3 clean-boundary entries.
- vague-summary-cost: 2 template entries; 2 clean-boundary entries.
- vague-threshold-change: 6 template entries; 4 clean-boundary entries.

## Evidence Files

- `paragraphs-003.json` through `paragraphs-008.json` contain target text only. Corresponding `labels-*.json` files contain expectations, reasons, evidence, and source coverage references.
- `claude-label-review-003.json` through `claude-label-review-008.json` retain complete blind judgments, adversarial assessments, instructions, source/data hashes, model metadata, and timing.
- Keep all these targets, labels, and review explanations out of Jev examples, rulebooks, and prompt tuning permanently. User decisions on disputed labels must be recorded before treating them as settled evaluation labels.


