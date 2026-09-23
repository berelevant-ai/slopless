# Slopless rule development hand-off

## Assignment

Expand Slopless's coverage of poor English prose through generalized deterministic patterns. Begin with missed passages, identify the class of writing problem, inspect the existing implementation, then broaden the rule that owns that behavior. Add a new rule only when no existing rule fits. Deliver working rules, preserved hit/no-hit cases, corresponding readable corpus prose, and a reviewed before/after report. More findings alone do not establish improvement.

The intended user prefers catching known slop over conservative silence and accepts some false positives. This does not authorize flagging every negation, abstract noun, short sentence, or ordinary physical action. Preserve specific known bad examples and demonstrate which useful writing remains unaffected. Report unresolved tradeoffs with quoted passages, not general assurances.

This document delegates development, not automatic production release. Commit and push the finished work to a development branch, open a PR, and return the reviewed results. Merge and publish only when instructed.

## Verified starting state

- Checked on September 23, 2026: fetched `origin/main` points to `0fd96bc24a88931693876b05882555692e92c768`, the merge of PR #127. The preceding release work published `0.2.38`. Recheck remote history, npm version, and installed CLI version before starting; do not assume they remain unchanged.
- The canonical checkout at `/Users/tartakovsky/Projects/agent-quality-controls/slopless` is on older `development` commit `69880c7` with unrelated tracked and untracked changes, including term-policy work. Do not reset, clean, stash, overwrite, or commit those changes as part of this assignment. Start a separate branch/worktree from fetched `origin/main`.
- Old worktrees under `/tmp` are listed as prunable. Historical paths to compiled audit snapshots and local output are not evidence that those artifacts still exist. Locate inputs and rebuild reproducible baselines before claiming a rerun.
- Read the applicable instructions and the latest three to five worklogs in the chosen branch. Plans describe intentions; code, registration, public output, and completed checks establish behavior.

## Architecture to preserve

- `src/rules/types.ts` defines rule input and detection records. Each detection carries its rule ID, text-unit ID, range, evidence, and label; optional group, ordinal, and data describe the occurrence.
- `src/rules/<family>/` owns detection logic and family-specific vocabulary. Keep private matching logic under its existing owner. Do not move domain rules into shared code merely because they both use words or sentences.
- `src/reporting/types.ts` defines report policies and report records. The available policies include one-to-one, density, threshold, density-rate, and sequence. Read their implementations before choosing one; their thresholds and boundaries differ.
- `src/reporting/` counts and selects detections for reporting. Detectors identify occurrences; reporting decides whether an occurrence or accumulation warrants a finding. Do not pool unrelated rules into one slop count or hide density checks inside a detector.
- `src/adapters/textlint/` handles the textlint integration. Reuse textlint, the existing adapters, sentence-splitter, Compromise, and existing offset handling. Do not build a second tokenizer, sentence splitter, runner, or result format.
- `src/registries/`, `src/presets/`, and `package.json` determine public availability. A source file existing or matching in isolation does not prove that the installed CLI uses it. Check registration, exports, default behavior, ignore behavior, and the packed installation.
- Internal IDs follow `family:rule`; public findings must retain the existing CLI/textlint naming. Do not introduce a new naming scheme.
- `developer-helpers/` contains internal research and audit utilities, not runtime dependencies. Keep dataset material and development tools out of the published runtime.

Use `src/rules/narrative-slop/flat-action-cadence.ts` as an example of detector/report separation, not a universal rule recipe. Its current policy requires three eligible clauses within four clause positions in a paragraph, including two actor/body actions. That policy is not a document-wide density rate and must not be described as one.

## First investigation

1. Run the supplied missed passages unchanged through the installed baseline and the current branch. Record versions, complete JSON output, and commands. Confirm the relevant rule is loaded. A readability warning does not count as catching a missing rhetorical pattern.
2. Trace each miss to one specific cause: unrecognized construction, missing word class or inflection, overbroad exclusion, sentence/paragraph boundary, reporting threshold, offset error, or absent public registration. Separate matching failure from reporting suppression.
3. For each proposed expansion, name the existing owning rule, files to change, the construction to recognize, its variable parts, the useful construction to preserve, and how the reporter should treat occurrences. Write this in the plan, with examples. Do not create another runtime catalog or expected-result system.
4. Inspect previously collected material before collecting it again: `developer-helpers/datasets/`, `developer-helpers/legacy/source-material/`, `developer-helpers/legacy/plans-source-material/`, and `new-corpus/2026-05-19-fresh-slop-expansion/`. Read the source records and decisions. A source being archived does not prove that every candidate was implemented.
5. Search the entire relevant family before adding a rule. Negation replacements, evaluative signposting, metaphorical substance, perception/body-action density, and repeated sentence structure already have implementations. Determine why those implementations miss the new text.

## Generalize the construction

Describe the matching operation before implementation. For each variable part, specify where its allowed words or grammatical categories come from and how they are checked. Reuse existing sourced lexicons and Compromise analyses when applicable. WordNet membership can provide candidate word classes but does not determine the meaning of a word in context; test literal and figurative uses separately.

Exercise changes of subject, names, singular/plural, pronouns, tense, contractions, negator, punctuation, clause order, modifiers, and surrounding prose. Include unseen combinations of those changes. Extending `not` to `never` is insufficient if the rule still only accepts one pronoun, verb, or separator.

For a negation/replacement construction, compare slogan-like replacement with informative correction; do not ban a negator alone. For evaluative signposting, recognize the introductory frame and its continuation rather than one adjective. For narrative repetition, recognize the relevant action class and apply the repetition policy without requiring the same literal verb or character name.

If a sourced list needs expansion, record the source and extraction method. Do not claim that a hand-selected list is exhaustive or that synonym substitution proves generalization. Do not add a model, hosted inference, a new parser, or a new runtime dependency without a separate justified decision. ML is outside this assignment.

## Cases and corpus

- Use the existing family files under `behavior/fixtures/textlint-rules/cases/<family>/hits.md` and `no-hits.md`. Add a new file only when the existing runner or input structure requires it.
- A case contains enough text to exercise the behavior. It may be a sentence, paragraph, or multiple paragraphs. For paragraph-level and cross-sentence rules, a one-line fragment is not adequate. Keep independent cases separated so unrelated examples do not manufacture a density hit. Verify how the selected reporter treats the separator.
- Label new cases before tuning the implementation. Keep a reserved group of cases that the implementation agent does not use for tuning. Once used to change a rule, those cases are no longer reserved; generate or select a fresh group for the next evaluation.
- Never delete a no-hit to make a check pass. Fix the false positive or explicitly justify moving the unchanged passage into hits. Do not rewrite an old case to make it easier to detect.
- A family's no-hit case can legitimately trigger a different rule. Review each finding by rule and passage; neither blindly approve all cross-family findings nor require every rule to be silent.
- Preserve new cases in topic-appropriate flowing prose under `behavior/fixtures/textlint-rules/corpus/`. Keep the case wording while writing the surrounding prose. Avoid adding a large collection of unrelated tiny corpus files.
- Run rules on both isolated cases and corpus context. The corresponding corpus passage must retain the intended finding; an expected no-hit must remain free of the unwanted finding. Presence of the same words alone does not prove this, because sentence boundaries, context, and density affect output.
- Do not require equal raw finding totals: surrounding prose can add findings and reporting may group occurrences. Check that each intended case behavior survives at its corresponding corpus location. Explain any discrepancy rather than weakening the requirement.
- Fixtures are application behavior tests. Datasets are source material for training, evaluation, or research. Do not merge them or treat human/AI origin as a good/bad writing label.

Fixture3 remains fixtures plus project runner plus JSON results, with diff and approval. Approved output is the expected result. Do not add a parallel expected-result catalog, case registry, or collision system. Existing historical preservation helpers are not another source of expected behavior.

## Delegate by ownership

Use one coordinating agent and separate implementation agents for non-overlapping rule owners. Do not give several agents the same shared matcher, reporter, registry, or family fixture file to edit concurrently.

Suggested parallel assignments are: negation and contrast; evaluative lead-ins and signposting; semantic-thinness templates; narrative action/perception/body repetition; phrase and word-class expansions. These are assignments within existing families, not instructions to create five new families. Assign only groups with evidenced misses after the first investigation.

For each implementation agent, provide the exact missed passages, baseline JSON, assigned files, existing rule IDs, relevant source records, known no-hits, and the required result format. Require a proposed generalized construction, boundary cases, implementation, and before/after evidence. Prohibit golden approval, release, unrelated refactoring, and delegation to further agents.

Assign a separate case-generation agent to produce ordinary useful prose and less obvious bad variants without seeing the matcher implementation. Cover narrative, technical explanation, factual correction, instructions, business posts, and academic writing where relevant. As a starting workload, request at least 30 varied intended hits and 30 plausible no-hits per changed construction, plus reserved cases; increase coverage when there are untested grammatical or contextual choices. Counts are workload targets, not evidence of quality. Reject trivial word-swapped duplicates as independent coverage.

Ask prose-generation agents to embed the selected cases in a few coherent texts of different genres. They must preserve the supplied wording and return the location of each preserved passage in their report. This temporary writing instruction does not require a new application metadata format.

The coordinator owns shared changes, registrations, integration, corpus runs, fixture approval, and the final report. A fresh reviewer checks the final implementation and report against source and complete outputs, including removed findings. The reviewer does not delegate further. Verify and resolve their objections before returning.

All delegated Markdown prose paragraphs and list-item paragraphs must occupy one physical source line. Preserve structural newlines and literal examples; do not introduce column-width wrapping.

## Verification procedure

1. Establish immutable baseline and candidate builds with recorded commits/versions. Never compare a candidate against a globally installed CLI that was already replaced by that candidate. Keep audit builds separate from build commands that remove `dist`.
2. Reproduce the missed behavior before editing. For broad multi-file changes, write the plan, Specular JSON, and coverage map; run Specular lint and observe the expected pre-change verification failure. Keep small changes proportionate.
3. Run the affected Fixture3 suites while developing. Read `fixture3 --help` and the checked-out `fixture3.yaml` for current commands. The verified main configuration has 21 suites; `fixture3 check --all` covers those configured suites, not every corpus directory on disk.
4. Run all configured suites before delivery and review differences. `scripts/behavior-replay.sh` runs the discovered rules and additional fixture-specific configurations; `scripts/cli-replay.sh` checks the packed CLI. These serve different purposes. Preserve configurations when cases need explicit options.
5. Separately audit changed rules over all available human, generated-AI, suspected-AI, and expansion text. Record file counts, word counts, exclusions, failures, elapsed time, input locations, and source/build hashes. Do not run unrelated rules over tens of millions of words just to evaluate one changed detector. Do run the full library on the application fixtures and relevant new prose to expose interactions.
6. Read every new and removed finding for the changed rules, with surrounding text. Classify whether it is wanted and explain why. If the output is too large to review, report the incomplete review and revise the candidate; do not call a sample a complete audit. Check retained baseline findings too when making claims about the candidate's overall precision.
7. Measure missed intended hits directly using the labeled cases. Also inspect corpus passages that produced no finding to discover missed constructions. High precision among findings does not prove high recall.
8. Compare stable file/rule/source locations and quoted text. Distinguish a changed message or larger overlapping span from a newly caught passage. A removed finding may be a fixed false positive, a lost wanted hit, or a changed range; inspect it.
9. Check threshold boundaries with one, two, three, and more occurrences, nearby and distant occurrences, short and long documents, paragraphs, and unrelated intervening text. Verify each rule counts independently. State the numerator, denominator, comparison operator, minimum count, and scope for any rate. Do not introduce a minimum count that makes the advertised first warning impossible.
10. Run `pnpm run validate`, applicable Specular checks, and public package checks. Confirm messages identify the objection and point to the correct source, including contractions, emphasis, escaped characters, and repeated text. Approve golden changes only after reviewing the results; rerun to confirm they match.

Read audit helpers before reusing them. In current main, `developer-helpers/scripts/audit-cadence.mjs` is not a universal audit command: its smoke text switches to `No implant. No brain surgery.` when the optional candidate path is supplied, even though its default candidate is the cadence rule. Its difference key includes range and message, so it also reports wording-only changes as additions/removals. Do not use its output unexamined or copy this behavior into a new harness. If adapting it is necessary, make the selected rule's smoke input and expected behavior explicit and prove the audit loads that rule.

## Historical evidence and open issues

The September 6 audit of the changes released in 0.2.38 covered 13,680 human files / 21,305,305 words, 400 generated files / 184,881 words, 1,500 suspected-AI files / 1,576,838 words, and 32 expansion files / 88,912 words. These are recorded historical counts, not a claim that those files were rerun or are all available today. Missing input material must be located or restored from its recorded source, not silently replaced by generated prose.

Read `.plans/2026-09-06-175918-cadence-precision-results.md` and its JSON companion. The released cadence candidate had 43 human findings: 18 wanted and 25 unwanted after manual review. The rejected broad action counter had 58,554 human findings. All 87 reviewed controls and all three supplied passages passed for the released candidate, but that did not eliminate corpus errors. Generated, suspected-AI, and expansion counts in that report concern the changed rule, not overall library accuracy.

Start investigation of the recorded lost coverage with these two passages, under the existing emotion/personification owner rather than restoring unrestricted action counting:

> Anger moved between them, sudden and red. It was almost visible in the air. It wrapped around their wrists. It pulled at their words.

> Grief came again, thicker this time. It filled the room. It covered the floor. It climbed her legs. She wanted to sink into it and let it close over her head.

Also carry forward the reported unwanted cadence findings in factual chronologies, verse, plot summaries, and figurative verb uses; body-action findings on software and medical explanations; literal `on the nose` caught as a cliche; escaped-Markdown range mapping; and stale preservation records. Reproduce these before changing them. List them in the plan for a scope decision instead of hiding them inside an unrelated expansion.

One documentation inconsistency was verified while preparing this hand-off: `src/rules/semantic-thinness/patterns/README.md` says the pattern data is inactive, but `semantic-thinness.ts` imports the pattern-data aggregator and compiles it, and the aggregator loads the pattern sets. Follow the import chain to determine which particular templates are active. Correct the stale description when working on that area; do not implement a second engine based on the README claim.

## Required delivery

- A concise description of each generalized construction and its existing owning rule, with the exact recognition and reporting changes.
- Before/after output for the original misses and varied examples not used to tune the rule.
- Intended hits caught/missed and no-hits wrongly flagged, before and after, with denominators for each changed rule.
- Corpus file/word counts and new, removed, and retained findings, with quoted wanted/unwanted examples and complete review records. Separate corpus origin from editorial judgment and changed-rule results from whole-library results.
- Every suppression added, with an example it protects and known slop it still catches. No undisclosed loss of wanted coverage, fixture deletion, threshold increase, or runtime cost.
- Passing commands, failed or incomplete checks, exported/installed CLI verification, and the fresh reviewer's findings and their resolution.
- Worklog, commits, branch, and PR. Keep unrelated work untouched. Stop before release unless release was explicitly authorized.

The final report should say what became catchable, what still escapes, and what useful writing is now flagged. Do not report only a total number of findings or claim that all slop is solved.
