# Rule-level Paragraph Decisions

## Result

- Paragraph-level decisions caught all 29 assigned positives across three existing semantic-thinness types. Follow-up sentence participation selected exactly the sentences touched by the recorded evidence in all 29.
  - `abstract-contrast`: 5/5 caught; 1 false alarm among 240 clean paragraphs.
  - `generic-realization`: 9/9 caught; 4 false alarms among the same 240 clean paragraphs.
  - `emotion-as-substance`: 15/15 caught; 11 false alarms among the same 240 clean paragraphs.
- The 16 false type decisions affect 15 distinct clean paragraphs. One quoted example received two wrong labels.
- Paragraph input supports sentence-local and cross-sentence constructions under the same type. The model also confuses neighboring issue types and overlooks explanatory context in several clean paragraphs.

## Input And Execution

- [Frozen criteria](criteria.json) define the three types in 355 words, including the shared instructions. Examples come from existing source definitions; holdout paragraphs appear only as targets.
- Each independent decision receives one target paragraph, the named type, and its criterion. Batched requests share an indexed state; instructions explicitly keep other paragraphs separate.
- All 604 existing holdout paragraphs were evaluated against each type: 1,812 detection decisions with Jev `jev-1.13.0`, threshold 0.5.
- Positive decisions trigger sentence-participation questions using the complete paragraph and the same criterion. Those 551 questions localize the positive findings.
  - The question asks whether a sentence participates in the complete construction, including its setup or payoff. It does not require each sentence to contain the whole defect alone.
  - Findings remain attached to the paragraph when participation selects no sentences. This happened for 21 of 190 positive type decisions.
- The 2,363 decisions completed in 25 batched requests, with 8.08 seconds of summed request time, 389,736 input tokens, and 64,885 output tokens.
  - Request time measures SDK calls. Preparing inputs, inspecting results, and writing this report are separate operations.
- [Inputs](inputs.json) freeze criteria and dataset hashes. Saved request and response files preserve each payload, returned score, and duration; [results](results.json) contain all derived scores and ranges.
  - After review, the comparison artifact was pinned to its unchanged pre-experiment commit and hash. Execution totals now use only the expected, validated batch files.

## Comparison With Earlier Results

- On the same 29 assigned positives, the previous 868-word family-level revision also caught 29/29. The native family caught 15/29: one contrast, four realizations, and ten emotion-as-substance examples.
- The new output adds a type-specific decision and selected sentences. The earlier model output answered whether any family issue appeared in the paragraph.
- All five assigned contrast positives were localized correctly. Four span two sentences; one occupies a single sentence inside a longer paragraph.
  - The same criterion selected both sides of the paired forms. Sentence and paragraph variants share one detection step and one type identity.
- All nine realization positives and all fifteen emotion-as-substance positives selected the evidence-bearing sentence and left the surrounding sentences unselected.
- These scores measure agreement with synthetic author labels. Each paragraph has one assigned primary type; additional types inside positive paragraphs have incomplete evaluation labels.
  - The run produced 145 additional type decisions in paragraphs assigned to other positive groups. They require type review rather than counting as automatically correct discoveries.
  - The earlier full-family false-alarm totals cover all family types. The new totals cover three selected types, so they measure different coverage.

## Manual Review

- Read all 29 assigned positives, all 15 flagged clean paragraphs, and every paragraph with an additional positive type decision. Original target text and labels remain unchanged.
- Wrong-type findings show that high catch rates alone overstate classification quality.
  - `holdout-039`: an abstract membrane metaphor was called `abstract-contrast`, although the passage supplies no opposing claims.
  - `holdout-458`: a denial of perfection was called `abstract-contrast` despite lacking the replacement required by this criterion.
  - `holdout-236`: an unspecified platform transformation was called `generic-realization`; the paragraph announces change rather than understanding.
  - `holdout-347`: a claim about the best booking process was called `generic-realization`; it is evaluative praise.
  - `holdout-324`: a breath catching in a throat was called `emotion-as-substance`; the subject is a bodily response rather than an abstract emotion moving as a substance.
  - `holdout-460`: busy silence was called `emotion-as-substance`; its defect is personification.
- Classification also has legitimate overlaps. The temporal abstract replacement in `holdout-314` supports a contrast judgment despite its primary personification label.
  - Primary dataset groups supply enough labels for the reported positive recall. Measuring complete multi-type precision requires reviewing all applicable types per paragraph.

### Clean Paragraphs Flagged

- `abstract-contrast`: `holdout-567` is an attributed metaphor discussed for revision. It also lacks a contrast; the model selected its quoted sentence anyway.
- `generic-realization`:
  - `holdout-195`: a workshop critiques an explicitly quoted transformation phrase and supplies a concrete revision.
  - `holdout-235`: dispatch latency falls from eight seconds to three, with an identified operational consequence. The paragraph contains no empty realization.
  - `holdout-601`: a Markdown heading is treated as prose despite its clean dataset label. This prototype passes raw Markdown to a criterion without an explicit heading exemption.
  - `holdout-602`: the unchanged dataset labels a Markdown list item as a clean list label. The earlier Claude audit recommends changing this label; its current expectation remains preserved.
- `emotion-as-substance`:
  - `holdout-037`: quantified customer satisfaction rising from 62 to 74 percent is mistaken for emotional substance movement.
  - `holdout-130`: grief is tied to carrying shopping bags after a father's death and a concrete adjustment to that routine.
  - `holdout-335`: a bodily reaction is linked to the risk that a forged signature will be exposed at a border.
  - `holdout-399`: a quoted line from a radio play is discussed as a performance choice.
  - `holdout-405`: tension leads to concrete payment and receipt-reconciliation actions around a named duplicate charge.
  - `holdout-433`: unease follows disclosure of a family relationship in procurement and leads to recorded corrective action.
  - `holdout-488`: an attributed image from a prose poem is analyzed beside its earlier imagery.
  - `holdout-521`: relief has an explicit cause: every missing diver has returned aboard.
  - `holdout-560`: a driving-test certificate supplies the concrete cause for the following relief statement.
  - `holdout-567`: the attributed draft metaphor is discussed for revision; it is also outside this type's substance construction.
  - `holdout-592`: panic follows a reported footbridge collapse and produces an emergency call.
- The second pass selected no sentence for four of these false type decisions: `037`, `195`, `235`, and `521`.
  - The prototype preserves those paragraph findings. Treating missing highlights as an automatic rejection would change the detector and its measured behavior.

## Implementation Consequences

- Organize rules by existing family and rule, with internal types underneath. Supply enough context for each judgment and attach the resulting ranges afterward.
  - [The taxonomy](../../rule-taxonomy.md) now uses that hierarchy. It preserves all 77 public rules and their existing subtype names.
- Keep paragraph detection separate from localization. The observed four paired contrasts demonstrate why isolated-sentence detection would split required evidence.
- Before shipping type-specific prompts, test stronger definitions of neighboring types and their contextual exemptions on development cases, then evaluate against fresh independently labeled data.
  - Use the recorded wrong-type findings to identify the boundary that needs clarification. Keep their wording and the remaining holdout material out of future prompts and examples.
- Preserve Markdown structure at input preparation. Route headings according to the rule's existing policy instead of sending them as ordinary paragraphs.
  - The disputed list-label expectation remains a separate label decision for the user.
- Preserve occurrence counting in the reporter. This prototype returns a paragraph/type decision and contributing sentences; several same-type occurrences can share that finding.
  - A sentence count cannot supply the occurrence count required for a density policy. Counting separate occurrences needs its own evaluated grouping behavior.
- The current run evaluates independent paragraphs. Article-level cross-paragraph context and production integration remain untested in this experiment.

## Reproduction

```sh
node developer-helpers/experiments/2026-10-19-rule-level-decisions/run.mjs validate
node developer-helpers/experiments/2026-10-19-rule-level-decisions/run.mjs summarize
```

- `run` resumes missing requests using the approved Jev credential and validates saved responses before reuse. Existing criteria and dataset hashes must match the frozen inputs.
- Production rule code, public exports, fixtures, and package version remain unchanged.
