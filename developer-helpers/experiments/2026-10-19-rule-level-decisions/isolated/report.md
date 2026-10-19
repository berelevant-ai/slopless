# Sending Each Check Separately

## Result

- Keeping the same descriptions while changing how they are sent reduced false alarms from 15 to 13 of 240 clean paragraphs, but lost one previously caught positive: 28/29 instead of 29/29.
  - Abstract contrast: 5/5 caught; false alarms fell from one to zero.
  - Empty realization: 8/9 caught instead of 9/9; false alarms remained at four, with two old errors removed and two new errors introduced.
  - Emotion-as-substance: 15/15 caught; false alarms fell from eleven to nine.
- Within the three types' own 20 clean examples, both runs flagged three. The clean-example improvement comes from the wider control set.
- All 28 caught assigned positives selected exactly the evidence-bearing sentences. The four two-sentence contrasts still selected both sentences together.
- This is a recall/false-alarm trade-off. Preserve the earlier detector while investigating the lost positive and the remaining type-label errors.

## What Was Sent

- Every detection request contains the unchanged general instructions and exactly one unchanged type description. All descriptions and examples come from the existing [criteria file](../criteria.json).
  - Abstract contrast uses 99 words; realization uses 76; emotion-as-substance uses 103. The shared instructions remain 77 words.
  - Each question directly contains the target paragraph. Other paragraphs are separate questions, rather than entries in a shared paragraph list.
  - Each request contains up to 100 questions about the same type. All 604 paragraphs are checked independently against each of the three types.
- Positive decisions receive the same sentence-participation task, with the paragraph and numbered sentences supplied directly. Each follow-up request also contains only one type description.
  - The task keeps findings when no sentence is selected. Seven of the 150 positive type decisions received no selected sentence, compared with 21 of 190 previously.
- The question wording replaces references to the shared paragraph list with direct `target`, `rulebook`, and `sentences` fields. Definitions, examples, shared instructions, model, threshold, target text, and labels remain unchanged.
  - Paragraph grouping changes from 33 paragraphs and 99 mixed-type questions to 100 paragraphs and 100 same-type questions. These sending-format changes are evaluated together.
- [A recorded request](detection/abstract-contrast-batch-01.request.json) shows the complete submitted structure. [Inputs](inputs.json) pin the unchanged criteria and the previous results to their pre-run hashes and commit.

## What Improved

- Four previously flagged clean paragraphs now pass every tested check.
  - `holdout-037`: customer satisfaction rising from 62 to 74 percent is correctly treated as a measurement. Its emotion score fell from 0.85 to 0.03.
  - `holdout-130`: grief is grounded in carrying shopping bags after a father's death. Its emotion score fell from 0.85 to 0.49, just below the unchanged 0.5 cutoff.
  - `holdout-195`: a workshop critiques a quoted transformation phrase and supplies a concrete revision. Its realization score fell from 0.62 to 0.35.
  - `holdout-235`: dispatch latency falls from eight seconds to three with an operational consequence. Its realization score fell from 0.80 to 0.03.
- The contrast check stops flagging `holdout-567`, an attributed metaphor discussed for revision. The emotion check still flags that paragraph, so it remains a clean-paragraph false alarm.
- Several earlier wrong-type decisions disappear.
  - `holdout-347`, a claim about the best booking process, stops receiving a realization label.
  - `holdout-324`, a breath catching in a throat, stops receiving an emotion-as-substance label.

## What Got Worse

- `holdout-506` changes from a desired hit to a miss: its realization score falls from 0.86 to 0.41.
  - The offending sentence is "We learned that the process was not simple." The rest names survey equipment and supplies no explanation of what made the process difficult.
  - The original positive label remains unchanged. None of the three checks reports the paragraph, so the highlighting step never runs for it.
- Two previously clean passes become false alarms under realization.
  - `holdout-464`: an editor critiques a quoted boring-remedy sentence and deletes it when the writer supplies no remedy. Its score rises from 0.26 to 0.51; the follow-up selects the quote and the editor's deletion sentence.
  - `holdout-510`: an explicitly quoted screenplay line, "I finally understood," is discussed for replacement with a concrete explanation. Its score rises from 0.40 to 0.81.
- Type confusion continues in paragraphs containing other known problems.
  - `holdout-010` gains an abstract-contrast label for a circular resolution claim that supplies no opposing claims.
  - `holdout-036` gains a realization label for praise about research reaching a more distinguished plane.
  - `holdout-508` gains a realization label for "Shame moved through the review," which describes emotion movement.
- The remaining clean false alarms are `335`, `399`, `405`, `433`, `464`, `488`, `510`, `521`, `560`, `567`, `592`, `601`, and `602`.
  - They include explained emotions, quoted wording under discussion, a Markdown heading, and the previously disputed list-label example. Original labels are preserved.

## Scope And Cost

- The dataset is the same 604 synthetic holdout paragraphs, with 364 family-positive labels and 240 clean labels. Only three types are being tested; they have 29 assigned positives between them.
- Additional type decisions in paragraphs assigned to other positive groups fell from 145 to 109. Those records have incomplete multi-type labels, so that reduction supplies no automatic precision score.
- Detection required 1,812 decisions in 21 requests. Highlighting required 439 decisions in six requests, totaling 2,251 decisions and 27 requests.
- Summed request time was 8.38 seconds, compared with 8.08 seconds previously. Usage was 385,180 input tokens and 61,680 output tokens.
- This run measures the requested sending format. Separating the contributions of direct targets, single-type requests, and paragraph grouping requires separate controlled comparisons.

## Verification

- The original command reproduces the original results byte for byte. The isolated command checks request completeness, exact payloads, request hashes, returned model and answer keys, score bounds, dataset hashes, unchanged criteria, and pinned comparison results.
  - Returned timing must be finite and nonnegative. Input and output token counts must be nonnegative integers.
- Manually reviewed all six clean paragraphs whose overall decisions changed, the lost positive, its absent highlight, and every newly added type decision in other positive paragraphs.
- [Results](results.json) preserve every score and selected range, plus paired changes against the earlier three-check run.
- Production rules, public exports, fixtures, dataset labels, and package version remain unchanged.

```sh
node developer-helpers/experiments/2026-10-19-rule-level-decisions/run.mjs validate isolated
node developer-helpers/experiments/2026-10-19-rule-level-decisions/run.mjs summarize isolated
```
