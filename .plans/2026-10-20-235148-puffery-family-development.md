# Puffery And Overstatement Development

## Goal

Prepare reviewed development and protected holdout datasets for every consolidated issue type in puffery and overstatement, then tune concise Jev prompts using development alone. Stop with a reviewed development report and frozen candidates; reserve holdout model evaluation for a later task.

Execution started on 2026-10-21 at the user's request. The two finalized types are inflated evaluation and sweeping generalization; each uses passage input. Holdout inference remains excluded from this task.

## Previous Method And Lessons

- Semantic thinness used separate authors for development and holdout, blind Opus classification, adversarial objections, adjudication, exact-snippet checks, and independent final review.
- Review counts varied. Circular explanation used two initial blind calls and two targeted follow-ups, plus author adjudication and independent QA. Realistic metaphor data needed regeneration, further review, and balancing.
- Final active sets have exactly 100 hits and 100 no-hits per type per split. Surplus reviewed passages remain in Git with their labels.
- Model agreement measures agreement. Accepted definitions and independent adjudication decide labels; valid difficult cases survive reviewer disagreement.
- Development gains sometimes failed to transfer to holdout. Preserve the split boundary and record development-derived prompt examples so later evaluation can measure transfer.

## Scope And Definitions

1. Read the accepted family inventory and the implementations of `puffery-evaluative-claim`, `formulaic-challenges`, and `universalizing-claims`, including inherited examples and exceptions.
2. Consolidate those sources into issue definitions in the accepted V2 taxonomy plan. Give each type its input, offending principle, hit, close no-hit, and boundary with adjacent families.
3. Assign stock challenge-and-recovery wording according to its defect: inflated optimism belongs here; an empty consequence or unnecessary introduction belongs to its existing family. Record each source branch's disposition and rejudge blanket digit, name, and quotation exemptions against the new definitions.
4. Freeze the definitions before generating either split. Split types when they judge different defects; merge equivalent constructions rather than creating datasets for every legacy matcher.

For each finalized type, create 200 development examples and 200 independently authored holdout examples, using passages or complete texts according to its declared input. A family with K finalized types therefore has 400K examples and four dataset files per type.

## Dataset Generation And Review

### Generation

- Assign one author context per type and split. Authors receive the accepted definition and variation requirements; holdout authors receive independently written briefs without development passages or candidate prompts.
- Use at least eight subject areas per type, with both labels represented in each. Include business writing, technical explanations, factual reporting, practical advice, personal writing, and storytelling where relevant.
- For passage-level types, target 25 short passages of 8-20 words, 50 medium passages of 21-44 words, and 25 longer passages of 45-90 words per class. Keep hit and no-hit length distributions matched.
- For text-level types, generate complete cohesive writing with intact sample boundaries and enough length for the stated defect. Match the classes by complete-text length; judge the submitted text intact in requests.
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
- Run Jev only on explicit development paths in this task, with development-only mode selected. Check every collection's declared split before credentials or SDK initialization, and reject holdout or missing split metadata, including mixed directories and misleading filenames.
- Holdout generation and label review are part of data preparation. Holdout detector evaluation remains a separate later task after candidate freeze.

## Runner Preparation

- Reuse `runners/datasets.mjs`, the version 2 schema, `runners/jev.mjs`, and its existing request and response helpers.
- `loadDataset` currently filters and assigns `semantic-thinness`. Extend the existing runner with explicit family selection while preserving its legacy default and named-check scoring.
- Add classification-only execution to the same runner, covering batch planning, scoring, completion, and resumption together. Record family and execution mode in snapshots; preserve the current default highlighting behavior.
- Interpret absent legacy snapshot fields as `family: semantic-thinness` and detection plus highlighting. Add an offline contract proving an old-format result still validates and resumes under those defaults.
- Extend `scripts/datasets-contract.mjs` through the existing Fixture3 suite to cover the new family, check-scoped no-hits, classification-only completion/resumption, and requests containing text without labels or snippets.
- Test development-only protection with synthetic contract data: holdout metadata under an innocuous filename, a mixed directory, and missing split metadata. Preserve offline holdout validation and later explicitly requested holdout inference.
- Keep one family trial JSON using the previous temporary orchestration approach and exported runner helpers. Append an immutable snapshot and response batches for each revision; the permanent runner's existing single-run snapshot remains a separate supported format.
- Both the permanent CLI and temporary tuning driver must use the same exported split preflight before credentials or SDK initialization. Exercise both with the synthetic holdout, mixed-directory, and missing-metadata rejection cases.
- Reproduce the new-family rejection and holdout-protection requirement before changing the runner; verify both through the public runner afterward. Use the narrowest Specular verification required by the eventual code-change scope.

## Prompt Development

1. Create `prompts/v10/shared.md` with the existing shared instructions and one Markdown prompt per finalized type. Keep each assembled prompt within 1,000 words.
2. State the principle, highlight offending wording in varied development examples, give close no-hits, and require detection of unseen variants. Keep common instructions in `shared.md`.
3. Freeze a first prompt baseline before inference. Use `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, 100 independent questions per request, and one selected check per passage.
4. Score all 100 development hits and all 100 development no-hits. Inspect every missed hit and false positive in its complete passage; revise the general decision boundary rather than adding passage-specific exceptions.
5. Use a proposed development gate of at least 95 caught hits and at most five false positives per 100. Plan three revisions per type, with a maximum of six revisions after baseline to limit repeated fitting to the same examples.
6. Any qualifying candidate outranks every nonqualifying candidate. Within each group, rank by fewest total errors, then more caught hits, then the earlier revision; compare new candidates with the best recorded candidate.
7. Stop immediately at 100 caught and zero false positives, after two successive revisions fail to improve that best-so-far result, or at the revision limit. Reset this two-revision counter only on an improvement; ties retain the earlier candidate.
8. When no candidate meets both thresholds, freeze the best observed revision under the same error-count and recall ordering and report the failed development gate. Complete data preparation and measured tuning for every type before returning; keep unready checks explicitly unready.

- Freeze labels before tuning. A newly discovered label defect requires independent correction and offline rescoring of every saved candidate on the same corrected set; preserve the original scores and record that change separately from detector improvement.
- The current runner rejects changed label hashes. Implement offline rescoring that verifies identical target text, example IDs, check assignments, prompts, requests, and predictions, then records the corrected judgment hash separately. Changed inference inputs require new calls.
- Keep exact prompt snapshots, request/input hashes, raw predictions, timings, token usage, and per-type transitions in one family development result file. Record every attempted revision, including regressions.
- Ask a fresh adversarial reviewer to inspect prompts against the definition for unnecessary restrictions, broad exemptions, copied examples, and exceptions tailored to individual passages. Disclose every development-derived demonstration.
- Keep holdout sealed throughout tuning and review. Model, threshold, definitions, and generation rules stay fixed during a comparable prompt trial.

## Files And Artifacts

- Update `.plans/2026-10-20-125402-v2-rule-taxonomy.md` with consolidated definitions and progress; keep this file as the execution plan.
- Store dataset pairs in `datasets/ai-synthetic/passages/` or `texts/` according to declared input, using `<six-digit-id>-puffery-and-overstatement-<type>-<development-or-holdout>.md` and matching `.labels.json`.
- Keep IDs globally unique. Update the existing `datasets/README.md` index rather than adding a catalog.
- Save one compact review record per collection under `runners/results/`, following the existing `<type>-<split>-opus-review.json` convention.
- Use collection ID, split, and pass in temporary generation and review filenames. Retain distinct responses until hashes, final snippets, and adjudications are verified.
- Keep prompts in `prompts/v10/`, execution in the existing `runners/`, and one family development result JSON plus its concise Markdown report in `runners/results/`.
- Record worklogs and commit/push completed milestones on `main`, preserving unrelated changes. Keep production detection and published packages unchanged during this task.

## Completion And Report

- Every finalized type has independently reviewed and frozen 100-hit/100-no-hit development and holdout pairs, exact valid snippets, and zero unresolved material data objections.
- Each type has a measured baseline, recorded prompt iterations, a frozen selected candidate, an explicit pass/fail against the proposed development target, and a fresh review of remaining errors and overfitting risks.
- Dataset validation, relevant Fixture3 contracts, formatting, and changed-code checks pass. Independent review confirms recorded results and verifies holdout input was excluded from Jev calls.
- Report per type: class counts, review corrections, baseline and selected caught hits, missed hits, false positives, new/lost catches, corrected/new false positives, prompt length, and remaining errors.
- Distinguish development performance from the later holdout assessment. Keep mixed-set evaluation, broader corpus validation, highlighting, CLI integration, and release in the V2 plan for their separate stage.
- When execution is requested, work autonomously across all finalized types through the complete data-review and bounded tuning process. Report passed gates, failed targets, or external blockers with their evidence; never weaken labels or count an unready check as ready.

## Development Outcome

- Both finalized types have independently reviewed 100-hit/100-no-hit development and holdout sets. The 800 active passages retain their reviewed hard cases; 289 surplus passages remain in linked Git archives.
- Inflated evaluation selects `r1`: 100 caught hits, zero missed hits, three false positives. Sweeping generalization selects `b0`: 100 caught hits, zero missed hits, two false positives.
- Tuning stops after two successive revisions fail to improve each check's best candidate. Rejected prompts and predictions remain in the family trial JSON; labels stay fixed throughout evaluation.
- The [development report](../runners/results/puffery-and-overstatement-v10-development-tuning.md) records all trials, exposure, corrections, and remaining errors. Selected prompts are frozen in `prompts/v10/`.
- Holdout inference and the remaining V2 evaluation stages remain separate tasks. Production behavior is unchanged.
