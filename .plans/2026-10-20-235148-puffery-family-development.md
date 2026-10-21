# Sequential Slopless V2 Family Development

## Goal

Complete the next three families in order: unsupported authority, staged contrasts, then boilerplate and signposting. For each family, prepare reviewed datasets, tune all its checks on development, freeze candidates, evaluate holdout once, and commit/push the reviewed results before continuing automatically.

Puffery and overstatement is complete through isolated development and holdout classification; its results remain below. Execution of the three-family extension started on 2026-10-21 at the user's request.

- Unsupported authority is reviewed through development and the frozen holdout assessment. Vague attribution catches 100 holdout hits with five false positives; prestige padding catches 99 with 23 false positives. Preserve that transfer failure. Next family: staged contrasts, using `prompts/v12/` after this assessment commit.
- Allocate collections `000023`/`000024` to vague-attribution development/holdout and `000025`/`000026` to prestige-padding development/holdout. Preserve the existing dataset and prompt versions.
- Consolidate staged contrasts into `staged-opposition`, including invented objections as a wording variant of the same unnecessary-opposition defect. Allocate `000027`/`000028` to its development/holdout collections and retain `prompts/v12/`.
- Staged opposition has independently verified 100/100 development and holdout subsets retaining all 94 mandatory cases. Complete pools are archived at `bfb57f52` and `4d712948`; seven holdout replacements resolve confirmed overlap. Its first bounded tuning round fails the development target; preserve the restored best `staged-r1` prompt at 96 catches and ten false positives while continuing the controlled comparison below.

## Execution Order

This update records the full three-family sequence. Wait for the user's next execution goal before starting further generation, tuning, or inference. Once authorized, continue through all three families; completing one family alone does not finish the sequence.

1. Unsupported authority (`unsupported-authority`), using `prompts/v11/`.
   - Complete vague attribution and prestige padding, including relevant credentials and supported audience-size statements as no-hits.
2. Staged contrasts (`staged-contrasts`), using `prompts/v12/`.
   - Complete unnecessary rhetorical opposition across negation, temporal replacement, comparisons, and imagined objections under the consolidated `staged-opposition` definition.
3. Boilerplate and signposting (`boilerplate-and-signposting`), using `prompts/v13/`.
   - Consolidate local introductions, evaluative wrappers, stock endings, and importance announcements; evaluate buried answers on complete texts.

- Finish every consolidated check in one family before beginning the next family. Within a family, delegate independent authoring and review tasks in parallel.
- After committing a family, continue to the next without requesting feedback or ending the execution goal. Completing the first family is a checkpoint, rather than completion of this sequence.
- Treat tuning limits as round boundaries. Preserve a failed round and resolve its remaining errors through a separately justified development round before advancing; keep labels, thresholds, and acceptance criteria fixed.
- Advance only after every current-family check catches at least 95/100 development hits with at most 5/100 false positives, candidates are frozen, the separate holdout assessment is complete, and reviewed results are committed and pushed.
- Finish after all three families meet the development target and complete their holdout assessments. Report holdout transfer failures separately while preserving the assessed candidates.

## Current Development Follow-Up

### Staged-Opposition Next Development Round

- Stop the first prompt round after `staged-r2` and `staged-r3` fail to improve `staged-r1`. Preserve all four trials, their prompt snapshots and probabilities, and the failed gate in the existing family result/report.
- Keep both labeled splits fixed. The best first-round prompt has eight direct development demonstrations; the attempted round exposes twelve unique development examples. Jev holdout assessment remains unrun.
- Run one model-only comparison through the existing public runner, using restored `staged-r1` wording on `jev-1.14.0`. Preserve SDK `0.7.0`, threshold `>= 0.5`, size-100 requests, and the exact 200 development inputs.
  - Save it as `runners/results/staged-contrasts-v12-jev-1-14-development.json`. Its separate model-bound cache preserves the older model's immutable trial history.
  - Compare caught/missed hits, false positives, transitions, request time, and tokens against saved `staged-r1`. Keep the same 95-catch/five-false-positive target and obtain independent result review.
- The official [model list](https://docs.typesafe.ai/models) gives both versions the same input-token price and context limits. Its [1.13 limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13) identify literal reading and indirection as risks; the model-only comparison tests the version effect before changing request construction.
- Determine the next concrete development step from that measured comparison. Preserve all failed attempts and keep the holdout sealed throughout development; the family advances only after its development gate is met.

## Previous Method And Lessons

- Semantic thinness used separate authors for development and holdout, blind Opus classification, adversarial objections, adjudication, exact-snippet checks, and independent final review.
- Review counts varied. Circular explanation used two initial blind calls and two targeted follow-ups, plus author adjudication and independent QA. Realistic metaphor data needed regeneration, further review, and balancing.
- Final active sets have exactly 100 hits and 100 no-hits per type per split. Surplus reviewed passages remain in Git with their labels.
- Model agreement measures agreement. Accepted definitions and independent adjudication decide labels; valid difficult cases survive reviewer disagreement.
- Development gains sometimes failed to transfer to holdout. Preserve the split boundary and record development-derived prompt examples so later evaluation can measure transfer.
- Authority's holdout exposes a writer-voice weakness: documentary accounts and fictional characters' limited beliefs attract false positives. Before deployment, authority requires a fresh development round and independently authored holdout; preserve the completed assessment and continue this sequence as planned.

## Completed Puffery Scope

1. Read the accepted family inventory and the implementations of `puffery-evaluative-claim`, `formulaic-challenges`, and `universalizing-claims`, including inherited examples and exceptions.
2. Consolidate those sources into issue definitions in the accepted V2 taxonomy plan. Give each type its input, offending principle, hit, close no-hit, and boundary with adjacent families.
3. Assign stock challenge-and-recovery wording according to its defect: inflated optimism belongs here; an empty consequence or unnecessary introduction belongs to its existing family. Record each source branch's disposition and rejudge blanket digit, name, and quotation exemptions against the new definitions.
4. Freeze the definitions before generating either split. Split types when they judge different defects; merge equivalent constructions rather than creating datasets for every legacy matcher.

For each finalized type, create 200 development examples and 200 independently authored holdout examples, using passages or complete texts according to its declared input. A family with K finalized types therefore has 400K examples and four dataset files per type.

## Next Family Coverage

These are required behaviors to consolidate, not a fixed count of new checks. At the start of each family, inspect the cited implementations and accepted taxonomy, define distinct defects, merge equivalent constructions, and freeze the resulting issue definitions before generating either split.

### 1. Unsupported Authority

- Consolidate vague attribution from `authority-padding`, `uncited-authority`, and `weasel-attribution`. Include unnamed experts, unspecified studies, consensus claims, and appeals to evidence whose relevant source stays unidentified in the passage.
  - Start with `src/rules/syntactic-patterns/authority/`, `src/rules/phrases/weasel-attribution.ts`, and its data file.
- Cover prestige and self-credentialing from `humble-bragger` and the accepted prestige-list addition. Judge credentials, outlet names, years of experience, and follower counts used to imply support beyond their relevance.
  - Start with `src/rules/phrases/humble-bragger.ts`. Preserve relevant qualifications, direct experience, eligibility requirements, and audience-size claims supported by follower counts.
- Use passage input with enough neighboring writing to resolve an attribution. Include named sources, references earlier or later in the passage, meaningful uncertainty, attributed criticism, and unsupported claims surrounded by irrelevant numbers.
- Judge how support is presented in the supplied writing. External source authenticity and verification remain with the editor; inflated evaluation and unspecified substantive content retain their existing families.

### 2. Staged Contrasts

- Consolidate negation reframes across sentences and paragraphs, including contractions, never, nobody, missing/absence wording, rejected alternatives, and temporal replacements such as "used to be X; now Y".
  - Inspect `src/rules/syntactic-patterns/contrast/negation-reframe.ts` and its private matchers. Treat these wordings as variants of a defect, rather than separate checks per negator.
- Cover abstract oppositions, less/more and paired comparisons, blame reframes, and evidence-limitation sequences. Inspect `contrastive-aphorism.ts`, its private matchers, `blame-reframe.ts`, and `src/rules/semantic-thinness/patterns/abstract-contrast.json`.
- Include the accepted imagined-objection behavior: a straw alternative or rhetorical opponent manufactured to dramatize an otherwise direct claim. Preserve genuine objections, useful distinctions, and explained alternatives.
- Use passage input, including multi-paragraph cases when both halves are needed. Balance factual corrections, technical exclusions, supported before/after changes, dialogue, and useful comparisons against rhetorical reversals in the same domains.
- Judge the unnecessary staged opposition. Negation alone remains ordinary language; an unexplained metaphor, missing takeaway, or inflated evaluation alone belongs to its existing check.
- Source review and independent definition review consolidate these behaviors into one passage-level check. A separate imagined-objection label would change with argumentative wording while requiring the same contribution test and correction; preserve that coverage within `staged-opposition`.

### 3. Boilerplate And Signposting

- Consolidate introductory frames, reader instructions, empty defensive prefaces, evaluative labels, graded "useful/simple/boring" wrappers, staged questions, stock endings, and redundant narration of the document's layout or method.
  - Inspect `src/rules/syntactic-patterns/lead-ins/`, `src/rules/syntactic-patterns/closers/`, `src/rules/orthography/colon-dramatic.ts`, and `src/rules/academic-slop/academic-formula-frames.ts` with its data.
- Follow mixed legacy behavior into the semantic pattern files and `generic-signposting` private matchers. A supplied concrete point inside an unnecessary wrapper belongs here; a missing point retains its semantic-thinness label.
- Define buried answers as `input: text`: unnecessary preliminary explanation delays the main answer identified by the submitted question, title, or argument. Generate complete texts with the necessary question and answer intact.
  - Preserve useful introductions, necessary prerequisites, meaningful methodology, source credits, qualified answers, and purposeful navigation. Judge the submitted text without assuming an external reader profile.
- Use passage input for local framing checks; include headings, adjacent paragraphs, or closing context when required. Preserve the distinction between one unnecessary wrapper and repetitive structures handled by rhythm and repetition.
- Retain the legacy `significance-density` coverage for unnecessary verbal importance announcements such as "Importantly" and "It is worth noting". Judge the signposting contribution here; keep density aggregation separate from detection and structural repetition in its existing family.
- Keep repeated explanations and repeated closers assigned to wordiness and redundancy. Layout conventions and decorative typography remain outside this sequence.

## Per-Family Execution

1. Freeze consolidated definitions in the accepted taxonomy, including `input: passage` or `input: text`, source coverage, hits, close no-hits, and boundaries with existing families.
2. Generate and reconcile each type's development and independently authored holdout sets under the review protocol below. Finish all types before detector tuning.
3. Freeze exactly 100 hits and 100 no-hits per split and type, preserve mandatory hard cases, archive surplus, and independently audit global IDs and cross-split/source overlap.
4. Reuse the completed runner and shared prompt instructions. Tune every check on development under the existing bounded selection and stopping rules; freeze all family candidates and settings.
5. Have a separate evaluator run each selected candidate once on its holdout. Review all errors, compare with development, and report the same 95-catch/five-false-positive reference target.
   - Preserve labels and prompts. Record transfer failures without selecting a different candidate from holdout scores or tuning on exposed examples.
6. Obtain fresh review of requests, scores, errors, provenance, and reports. Run relevant validation and Fixture3 checks, then commit/push the family and continue to the next numbered family.

- Assign fresh development authoring contexts per family. Holdout authors, reviewers, and cross-split auditors never become prompt authors; the orchestrator supplies only approved definitions and development material to authors.
- Baseline prompt drafting may overlap protected holdout review after the complete development sets pass independent QA and freeze. Holdout authors receive only the frozen definitions; finish all split review, selection, and overlap checks before the first detector trial.
- Keep text-level inputs intact. Match hit/no-hit text-length distributions and test request capacity before freezing execution settings; reduce batch size rather than truncating or splitting complete texts.
- The generation, balancing, review, prompt-length, and holdout-protection requirements below apply to every new family and type.

## Dataset Generation And Review

### Generation

- Assign one author context per type and split. Authors receive the accepted definition and variation requirements; holdout authors receive independently written briefs without development passages or candidate prompts.
- Use at least eight subject areas per type, with both labels represented in each. Include business writing, technical explanations, factual reporting, practical advice, personal writing, and storytelling where relevant.
- For passage-level types, target 25 short passages of 8-20 words, 50 medium passages of 21-44 words, and 25 longer passages of 45-90 words per class. Keep hit and no-hit length distributions matched.
- For buried-answer texts, target 25 short texts of 250-449 words, 50 medium texts of 450-749 words, and 25 longer texts of 750-1,000 words per class and split. Preserve complete context and match both classes by text length.
- Vary sentence structure, punctuation, subjects, indirect wording, and where resolving information appears. Include nearby explanations, useful implicit meaning, misleading unrelated detail, quotations under criticism, and wording associated with neighboring checks.
- Give both classes names, numbers, domain terms, and evaluative words. Generate realistic excerpts whose labels depend on their meaning rather than obvious surface cues or comments explaining the intended label.
- Audit class-associated words, attribution, sentence structures, and explanatory framing before detector evaluation. Rewrite unnatural or shortcut-heavy prose, then obtain a new blind review.
- Label only the named type in these isolated sets. Hit snippets copy the offending words or sequence exactly; no-hit labels omit snippets.

### Three Planned Review Passes

1. Blind classification: send shuffled neutral IDs and passage text to Claude Opus with the definition, tools disabled, and author labels, snippets, ordering, and requested balance withheld. Request its own hit/no-hit judgment, hit snippets, and ambiguity objections.
2. Adversarial Opus review and reconciliation: review every disagreement and objection, then have Opus challenge the complete collection for wrong labels, weak controls, repetitive constructions, unnatural prose, and missing variants. Change labels when warranted; rewrite only defective prose and obtain a new blind review of every changed passage.
3. Final blind review and independent audit: present the final complete writing to a fresh Opus context, reconcile remaining disagreements against the definition, and have a fresh agent verify classifications, snippets, diversity, provenance, and mechanical checks.

- Use three passes as the starting schedule; continue review when material objections remain. The gate is zero unresolved material label or realism concerns, rather than a prescribed agreement percentage.
- Preserve sound difficult passages when correcting labels. Generate and review additional examples when a class falls below 100; select the final balanced set before any Jev evaluation.
- Preserve surplus reviewed examples with their original labels in a linked Git commit. Before selection, freeze mandatory IDs: approved seeds and sound examples retained after adjudicating classification disagreements or material boundary objections.
- Retain mandatory cases first. Allocate remaining slots proportionally across the declared length groups using largest-remainder rounding; redistribute exhausted buckets among those with available examples under the same rule.
- Within each bucket, use ascending SHA-256 of family, type, split, and stable example ID; break hash ties by ID. More than 100 mandatory cases in either class is an explicit selection blocker, recorded before inference.
- Audit exact and normalized duplicates, shared eight-word sequences, and closest paraphrases within and across splits, including existing passage and full-text copies. A separate auditor can read both splits; the prompt author receives only aggregate holdout audit results.
- A material definition change invalidates the affected earlier reviews. Re-review both splits under the revised frozen definition through their separate contexts.

## Holdout Protection

- The holdout generation and review contexts handle its writing, labels, snippets, and adjudications. They return only counts, hashes, and readiness status to the prompt author; semantic review findings stay private.
- Holdout reviewers and cross-split auditors never become prompt authors for this family. Keep their contexts separate throughout execution.
- After data review and balancing, freeze holdout files and record their hashes. The authoring context never opens them, searches their contents, or includes their text in prompt examples.
- During tuning, run Jev only on explicit development paths with development-only mode selected. Check every collection's declared split before credentials or SDK initialization, and reject holdout or missing split metadata, including mixed directories and misleading filenames.
- Holdout generation and label review are part of data preparation. After the complete family's candidates freeze, the separate evaluator runs the planned one-shot holdout assessment before the sequence advances.
- Holdout errors never enter a later prompt revision for the same assessment. A new tuning round influenced by them requires fresh independently authored holdout material.

## Completed Runner Preparation

Runner preparation is implemented and verified in `52f1e3f6`. Reuse it for all three families.

- `runners/datasets.mjs` and the version 2 schema load paired text and labels. `runners/jev.mjs` already provides family selection, classification-only execution, snapshots, resume, scoring, and label-only rescoring.
- Existing Fixture3 contracts cover legacy defaults, classification-only completion/resumption, label-free requests, immutable inference validation, and split protection before credential or SDK access.
- Temporary tuning orchestration uses the exported runner helpers and shared development-only preflight. Keep one family trial JSON with immutable prompt snapshots and responses; preserve the public runner's single-run result format for holdout checks.
- Retain input, prompt, request, prediction, and score hash checks when adapting orchestration to each new family. Verify whole-text request capacity before the first text-level baseline; scope any demonstrated runner limitation through the repository's executable-spec and contract workflow.
- Result-write safety is repaired and independently reviewed in `c608a2e4`. Both save paths use the shared exclusive, uniquely named atomic JSON writer; the temporary driver restricts output to JSON under `runners/results/` and rejects symlink escapes before provider access.
  - All 83 private driver probes and 34 public contract groups pass, including input preservation behind stale temporary symlinks and cleanup after failed replacement. Request and result schemas remain unchanged.
- Whole-text capacity is reproduced with synthetic inputs: 100 complete 997-word targets return HTTP 400 `max_tokens_exceeded`; the identical first 16 targets succeed with 19,613 input tokens. The two-call proof is `/tmp/slopless-capacity-20261021-115855-TYg9ai/proofs.json`.
  - Add `--batch-size` to the existing research CLI and temporary tuning driver, defaulting to 100 and accepting integers from 1 through 100. Validate it before target loading or provider initialization.
  - Bind nondefault batch size to immutable snapshots and family trial settings. Interpret absent historical settings as 100; preserve default snapshot bytes, request bytes, response records, and completed-cache behavior.
  - Reject existing saved results containing null, arrays, or other non-object values before target loading or SDK initialization. Create fresh results only for absent files and preserve rejected cache bytes and timestamps.
  - Reuse public `batchPlans` in the temporary driver, including partial final batches. Keep complete targets intact; measure the final text prompt's capacity and freeze the batch size before its first baseline.
  - Extend the existing Specular specification, coverage map, public contracts, and private driver probes. Exercise size-16 planning, resume, score, label-only rescore, highlighting, invalid values, and changed-setting rejection while preserving every existing test.
  - The implementation and independent review pass all 38 public contract groups and 133 private probes. Invalid saved-result rejection also passes 18 independent reproductions; the historical 27-request, 2,251-decision result validates with its cache bytes and timestamps unchanged.

## Prompt Development

1. Use the family's version directory from Execution Order, with the existing complete-passage instructions in `shared.md` and one Markdown prompt per finalized type. Keep each assembled prompt within 1,000 words; preserve completed `v10` prompts.
2. State the principle, highlight offending wording in varied development examples, give close no-hits, and require detection of unseen variants. Keep common instructions in `shared.md`.
3. Freeze a first prompt baseline before inference. Use `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, and one selected check per complete input. Batch passage checks at 100 independent questions; freeze a validated whole-text batch size before its baseline and preserve it across comparable trials.
4. Score all 100 development hits and all 100 development no-hits. Inspect every missed hit and false positive in its complete passage; revise the general decision boundary rather than adding passage-specific exceptions.
5. Use a proposed development gate of at least 95 caught hits and at most five false positives per 100. Plan three revisions per type, with a maximum of six revisions after baseline to limit repeated fitting to the same examples.
6. Any qualifying candidate outranks every nonqualifying candidate. Within each group, rank by fewest total errors, then more caught hits, then the earlier revision; compare new candidates with the best recorded candidate.
7. Stop tuning that check at 100 caught and zero false positives, after two successive revisions fail to improve that best-so-far result, or at the revision limit. Reset this two-revision counter only on an improvement; ties retain the earlier candidate.
8. When no candidate meets both thresholds, preserve the best observed revision and report the failed round. Record and justify the next development round, keep the holdout sealed, and resolve the failed gate before advancing the family.

- Freeze labels before tuning. A newly discovered label defect requires independent correction and offline rescoring of every saved candidate on the same corrected set; preserve the original scores and record that change separately from detector improvement.
- The existing offline rescoring verifies identical target text, example IDs, check assignments, prompts, requests, and predictions, then records the corrected judgment hash separately. Use it for independently approved label corrections; changed inference inputs require new calls.
- Keep exact prompt snapshots, request/input hashes, raw predictions, timings, token usage, and per-type transitions in one family development result file. Record every attempted revision, including regressions.
- Ask a fresh adversarial reviewer to inspect prompts against the definition for unnecessary restrictions, broad exemptions, copied examples, and exceptions tailored to individual passages. Disclose every development-derived demonstration.
- Keep holdout sealed throughout tuning and review. Model, threshold, definitions, and generation rules stay fixed during a comparable prompt trial.

## Files And Artifacts

- Update `.plans/2026-10-20-125402-v2-rule-taxonomy.md` with consolidated definitions and progress; keep this file as the execution plan.
- Store dataset pairs in `datasets/ai-synthetic/passages/` or `texts/` according to declared input, using `<six-digit-id>-<family>-<type>-<development-or-holdout>.md` and matching `.labels.json`.
- Keep IDs globally unique. Update the existing `datasets/README.md` index rather than adding a catalog.
- Save one compact review record per collection under `runners/results/`, following the existing `<type>-<split>-opus-review.json` convention.
- Use collection ID, split, and pass in temporary generation and review filenames. Retain distinct responses until hashes, final snippets, and adjudications are verified.
- Keep new prompts in `prompts/v11/`, `v12/`, and `v13/` in the stated family order. Keep execution in the existing `runners/`, with one development trial JSON and concise report per family, plus immutable check holdout results and one family holdout report.
- Record worklogs and commit/push completed milestones on `main`, preserving unrelated changes. Keep production detection and published packages unchanged during this task.

## Completion And Report

- Every finalized type has independently reviewed and frozen 100-hit/100-no-hit development and holdout pairs, exact valid snippets, and zero unresolved material data objections.
- Each type has a measured baseline, recorded prompt iterations, a frozen selected candidate, an explicit pass/fail against the proposed development target, and a fresh review of remaining errors and overfitting risks.
- Dataset validation, relevant Fixture3 contracts, formatting, and changed-code checks pass. Independent review confirms recorded results and verifies holdout input was excluded from development Jev calls and prompt authoring.
- Report per type: class counts, review corrections, baseline and selected caught hits, missed hits, false positives, new/lost catches, corrected/new false positives, prompt length, and remaining errors.
- Distinguish development performance from the frozen-candidate holdout assessment. Keep mixed-set evaluation, broader corpus validation, highlighting, CLI integration, and release in the V2 plan for their separate stage.
- Work autonomously through all three families and every finalized type. Continue after each completed family; report completion only after every check meets the development target and all three separate holdout assessments and reviewed commits are complete.

## Development Outcome

- Both finalized types have independently reviewed 100-hit/100-no-hit development and holdout sets. The 800 active passages retain their reviewed hard cases; 289 surplus passages remain in linked Git archives.
- Inflated evaluation selects `r1`: 100 caught hits, zero missed hits, three false positives. Sweeping generalization selects `b0`: 100 caught hits, zero missed hits, two false positives.
- Tuning stops after two successive revisions fail to improve each check's best candidate. Rejected prompts and predictions remain in the family trial JSON; labels stay fixed throughout evaluation.
- The [development report](../runners/results/puffery-and-overstatement-v10-development-tuning.md) records all trials, exposure, corrections, and remaining errors. Selected prompts are frozen in `prompts/v10/`.
- Holdout inference and the remaining V2 evaluation stages remain separate tasks. Production behavior is unchanged.

## Holdout Assessment

- The user authorized holdout inference on 2026-10-21. Run the selected `v10` prompts once on each check's corresponding 100-hit/100-no-hit holdout.
- Verify prompts and input files against commit `fd5eb5c0` before inference. Preserve `jev-1.13.0`, classification-only mode, threshold `>= 0.5`, and 100 independent questions per request.
- Save separate immutable check results under `runners/results/`, review every classification error, and compare with the selected development scores. Report the existing 95-catch/five-false-positive target as a reference for transfer.
- Preserve prompts and labels throughout assessment. Record findings in one family holdout report, obtain fresh review, then commit and push only the assessment artifacts and worklog.
- Completed result: inflated evaluation catches 99/100 hits with zero false positives; sweeping generalization catches 100/100 with zero false positives. The [holdout report](../runners/results/puffery-and-overstatement-v10-holdout.md) records the single miss and frozen execution settings.
