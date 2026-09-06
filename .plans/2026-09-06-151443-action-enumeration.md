# Goal

Detect passages that repeatedly present an actor followed by an action, producing the list-like rhythm in the user's examples. Recognize the structure despite changes in names, verbs, tense, modifiers or punctuation. Report the repeated structure, not a claim that every action is useless.

The success criterion is coverage of the construction and its shorter variations, not three complete example paragraphs returning an error. Recognition and reporting must be tested separately.

## Evidence from 0.2.37

- All three full passages trigger. Across all 77 order-preserving sentence subsets, no subset with fewer than four sentences triggers the cadence rule.
- The first passage contributes sentences 1, 2, 4 and 5. The tagger mistakes `raised` in `the raised bolt` for an additional verb, excluding sentence 3. Neither contiguous four-sentence subset triggers.
- The second passage requires every sentence, including `It was the flag from the classroom.`
- The third passage contributes its first four sentences. Its final longer sentence contributes nothing.
- The new matcher requires four of five short sentences, past tense, at least three actions with complements, and no quantities after the verb. It excludes sentences containing any listed subordinating word. These restrictions can hide the same construction rather than distinguish good writing from bad writing.
- Thresholding happens inside `subject-action-cadence.ts`. `flat-action-cadence.ts` wraps the resulting paragraph match as a one-to-one finding. This does not follow the occurrence-detection/reporting separation already used by body-action and perception density.
- The human audit added 21 cadence findings: 15 unwanted, three debatable and three intended. An editorial paragraph of grouped examples also acquired an unwanted finding. These must be included in the next evaluation, not described only as a small rate over millions of words.

# Decisions

1. Keep the existing `narrative-slop:flat-action-cadence` rule ID. Do not create another family, synonym rule, action dictionary or parallel fallback matcher.
2. Have the rule emit individual structural occurrences through the existing `RuleDetection` boundary. The reporting layer owns count, proximity, overlap and severity. A detection is not itself an accusation of bad writing.
3. Count independent actor-action clauses, not every verb. `Mira hurried back and froze` is one actor-action clause with coordinated actions. `Mira hurried back; Eli opened the gate` contains two independent clauses. Shared-subject action lists remain eligible through the existing clause matcher; they must not become three subject-first occurrences merely by duplicating the subject internally.
4. Preserve the distinction between action clauses and descriptions such as `It was the flag`. A description can occupy intervening space but must not be necessary to trigger three preceding actions.
5. Start the reporting experiment at three action occurrences among four consecutive independent clauses in one paragraph, at error severity. One or two do not trigger this rule. Four or five qualifying actions continue to trigger. This is an explicit candidate threshold, not a validated definition of bad writing.
6. Keep detection local. A thousand-word rate does not describe this rhythm: three adjacent actions and three actions spread over an article are different cases. Existing unrelated density policies stay unchanged.
7. Keep paragraph, heading, list and code boundaries explicit. Single Markdown line breaks inside a paragraph must not change results. Blank paragraphs remain boundaries in this iteration; do not claim coverage across them. Cross-paragraph accumulation is a separate decision, not a silent expansion.
8. Do not infer narrative usefulness from grammar. An incident account can share the same structure. If the evaluation cannot separate it without source-specific exclusions, report the overlap and the measured tradeoff before approval or release.

# Implementation sequence

## 1. Establish the behavioral specification before changing code

Use the existing narrative hit/no-hit files and corpus. No separate case registry or expected-label system.

- Preserve all current cases. Review a disputed no-hit explicitly; move it to hits only with a written reason. Never delete it to make a run pass.
- Add each complete supplied passage and every contiguous three- and four-sentence excerpt. Also test all order-preserving subsets as a generated audit, without committing 77 separate fixture files.
- Label the first two three-sentence excerpts of example 1 as expected hits. Label the first three sentences of example 2 as a hit without relying on its final description. Label both three-sentence excerpts within the first four sentences of example 3 as hits.
- Keep one- and two-action excerpts as no-hits for this rule. A different rule may report them independently.
- Add recognition assertions that include `Mira hurried back and froze at the raised bolt` and the main action in `But Mira did not call at all, because ...`. Additional explanation must not make the main action disappear from the recognition output.
- Add at least 60 positive and 60 negative blocks covering the transformations and counterexamples below. Each block must be long enough for its expected behavior. Add their verbatim text to topic-relevant corpus passages.
- Write a Specular JSON spec and coverage map using built-in tree/content checks where applicable. Behavioral coverage belongs in Fixture3; add a focused runner only for the internal occurrence output that the public findings cannot expose. Verify the expected failures before implementation.

## 2. Prove the existing grammar dependency can recognize the required clauses

Inspect Compromise's documented public sentence/verb interfaces and run a fixed grammar probe before choosing implementation details. Do not invent a clause API or recreate a parser with word lists.

The probe must distinguish:

- `Mira bent to pull it free`: main action `bent`; `to pull` is not another independent clause.
- `Mira hurried back and froze at the raised bolt`: one actor, two coordinated actions; `raised` modifies `bolt`.
- `Mira hurried back; Eli opened the gate`: two actor-action clauses.
- `The children searched under the tables`: plural noun subject.
- `A gust of wind wrapped the flag around her ankle`: multiword subject.
- `Her stomach squeezed tight`: body-part subject without requiring a body-word dictionary.
- `The guide said the stairs were unsafe`: distinguish the outer statement from its embedded statement.
- `The rope snapped. The crate fell. The lid broke.`: recognize all actions even without complements; their reporting classification is a separate review.

Require correct subject/action ranges on every probe, not merely one hit somewhere in the paragraph. If Compromise cannot meet this probe through its maintained public interfaces, stop that implementation path and compare an alternative local parser on the same fixed probe, package size and article runtime. Do not patch `raised`, `bent` or the supplied names as special words. No second dependency is authorized by this plan without that comparison.

## 3. Replace paragraph matching with occurrence detection

In `src/rules/narrative-slop/private/subject-action-cadence.ts`, return the recognized occurrences rather than the first four-of-five span. Use the existing source-range and detection types.

- Emit the subject/action evidence and exact clause range, including clauses that do not yet form a reportable run.
- Remove count thresholds from the detector.
- Do not require past tense, a following object, or absence of a number to recognize an occurrence.
- Replace whole-sentence keyword exclusions with the grammatical distinctions established by the probe. `before` inside a phrase is not automatically a complex sentence.
- Do not use sentence length as proof that a structure is absent. Preserve length/extra-clause evidence for evaluation instead of discarding the action.
- Consolidate the old weak-action and comma-clause paths into the same occurrence output. Preserve their existing catches unless individually reviewed; do not retain two mutually exclusive paragraph matchers.

## 4. Put the reporting decision in reporting

Use `src/reporting/types.ts` and `src/reporting/reports.ts`. The current density policy counts occurrences in sentence windows and returns only the first span; it cannot directly express independent-clause adjacency. Extend the typed reporting policy only with the behavior needed here rather than embedding those decisions back in the detector.

- Evaluate the three-among-four candidate on the ordered clauses supplied by the rule.
- Count each independent clause at most once. Two verbs sharing a subject do not independently satisfy this threshold.
- Do not let a trailing description create an otherwise missing action occurrence.
- Merge overlapping qualifying spans into one report; emit separate reports for separated runs in a long paragraph.
- Keep the rule's counts independent of body-action, perception and negation rules. An unrelated finding never contributes to the cadence count.
- Name the evidence in the message: `Three nearby clauses repeat actor + action: Children searched; Eli ran; Mira hurried.` Do not call an individual action empty or recommend adding irrelevant sensory detail.
- Run unchanged reporting-policy fixtures to verify other rules retain their behavior. Do not rename existing public configuration fields as part of this task.

## 5. Test transformations, not only collected phrases

Positive transformations must retain the expected report:

- Different names, pronouns, plural subjects, body subjects and environmental subjects.
- Past and present tense; negated actions where the structure remains the same.
- Irregular verbs, coordinated actions and adjective/verb ambiguities.
- Extra adjectives or location phrases, including sentences beyond the old 14-word cutoff.
- Periods versus semicolons between independent clauses; single Markdown line wrapping.
- Unrelated text before or after a qualifying run, including longer paragraphs.
- One intervening nonmatching clause within the declared four-clause window.

Negative and disputed controls must include:

- One or two actions, plus one or two descriptions: descriptions must not manufacture the third action.
- Varied sentence openings and actions integrated into longer grammatical constructions, rather than merely padded with adjectives.
- Instructions, definitions, specifications, credits, historical summaries, sports reporting and incident accounts.
- Repetition used deliberately in dialogue or dramatic narration.
- Every unwanted human excerpt and the grouped editorial example from 0.2.37.
- Headings, list-item boundaries, code, blank paragraph boundaries and quoted examples.

Do not label every factual sequence a no-hit automatically. `The rope snapped. The crate fell. The lid broke.` can be causally meaningful and still have the requested rhythm. Record that as a disputed editorial decision rather than pretending a complement requirement resolves it.

## 6. Evaluate and select the reporting boundary

- Compare the candidate with 0.2.37 on all application fixtures and the full expansion folder using Fixture3.
- Run the changed cadence rule over every available human, generated and suspected-AI corpus file. Keep the same inventory as the prior audit; record differences in inventory separately.
- Compare three consecutive, three-among-four and the released four-among-five policies on the same occurrence output. No re-parsing or different exclusions between threshold comparisons.
- Read every added, removed or shortened finding. Report counts and excerpts separately for narrative, incident/history, technical writing, credits and other genres.
- Report the fraction of reviewed additions judged unwanted, not only false positives divided by millions of words. Show the count of known positive cases lost and the count of no-hit cases newly flagged.
- Reject a policy that needs all of the user's paragraphs intact or depends on a description to reach its action threshold.
- Reject new grammatical misclassifications and unresolved no-hit regressions. Do not conceal them by approving new goldens.
- If all policies that catch the required triples also flag too many reviewed controls, present those examples and the threshold comparison. Do not claim that structural matching solved semantic usefulness or silently restore four-of-five.

## 7. Completion

Before approval: every required action has correct recognition evidence; the specified three-action excerpts trigger; shorter controls remain clear; transformation checks pass; all changed corpus findings have been reviewed and documented.

Run Specular lint/verify, build, lint, formatting, spelling, type coverage, relevant reporting fixtures and all Fixture3 suites. Measure the installed package on the same 3,496-word fiction scene. Approve outputs only after reviewing the complete comparison.

This request is planning only. Do not implement, approve findings, merge or release under this planning task.

# Files to change during implementation

- `src/rules/narrative-slop/flat-action-cadence.ts`
- `src/rules/narrative-slop/private/subject-action-cadence.ts`
- `src/reporting/types.ts` and `src/reporting/reports.ts`
- Narrative hit/no-hit cases, narrative corpus and preserve metadata.
- Relevant Fixture3 runner/configuration and approved outputs after review.
- Analysis report, executable spec, coverage map and worklog.
- Package metadata only if the parser comparison demonstrates a dependency change is necessary.

Do not modify the fragment rule again unless this work exposes a separately demonstrated bug. Do not expand the scope to all density rules or unrelated corpus bookkeeping.
