# Narrative Craft Development

## Goal

Develop the next accepted V2 family, `narrative-craft`, using realistic reviewed passages, concise Jev prompts and separate measurements of missed slop and false positives. Preserve the assessed rhythm prompts and all production behavior.

## Approach

1. Read all nineteen legacy checks, their template data, shared guards, reporting policies and relevant case fixtures. Map each recognition branch to the defect it attempts to find.
2. Review proposed definitions independently before generation. Consolidate checks only when they ask the same question; keep the complete nineteen-source coverage map in the accepted taxonomy.
3. Start with small development and protected holdout pilots. Review realism and classifications before expanding any collection; preserve ordinary storytelling, informative physical actions and useful scene details as hard controls.
4. Generate 240 candidates per isolated collection, then perform blind classification, adversarial label review and fresh final review. Reconcile mistakes, review rewritten passages and freeze exactly 100 hits and 100 no-hits per check and split.
5. Create mixed collections after testing whether their label combinations are independently possible. Assess every named check separately and preserve passages with several simultaneous defects.
6. Freeze datasets before prompt tuning. Keep holdout writing and individual labels outside the authoring context; use distinct protected authors and reviewers with explicit permitted-input lists.
7. Reuse the existing dataset reader and Jev runner. Keep prompts under `prompts/v21/`, paired datasets under root `datasets/ai-synthetic/passages/` and results under `runners/results/`.
8. Tune each check on isolated and relevant mixed development data. Preserve all trials, then run one fresh confirmation of the selected prompt and review every error or changed prediction.
9. Have a fresh reviewer verify the report against source passages, producing prompts and completed commands. Commit and push milestones with worklogs; verify remote CI.

## Definition Decisions

- Judge the function of the supplied writing. An informative action, emotion report, observation, sensory contrast or exact time can be useful in fiction and factual narration.
- Check empty staging separately from mechanical sentence rhythm. The existing `flat-action-cadence` definition and prompt remain frozen as a comparator where relevant.
- Inventory `narrative-cliches` by branch. Body reactions, voice tags, atmospheric imagery, foreshadowing and compressed time cannot be assigned by the old module name alone.
- Keep occurrence detection separate from later density reporting. A word count, repeated body-part noun or nearby causal word alone cannot determine whether an action supplies information.
- Determine gratuitous clock detail from its role in the passage. The supplied text supports judgments about relevance; it supplies no evidence that a timestamp was fabricated.
- Record the reviewed final checks, input declarations and ownership boundaries in the existing accepted taxonomy. Keep protected definition extracts free of development examples and historical scores.

## Dataset Requirements

- Cover plausible fiction, memoir, factual incident accounts, travel writing, sports narration, workplace stories and explanatory examples with narrative passages.
- Include different names, species, ages, perspectives and tenses. Vary sentence and paragraph length; preserve enough connected context to judge what the action or observation contributes.
- Pair stock-looking language with concrete functions: a glance reveals a signal, a bodily response affects an action, a pause changes an exchange, quiet reveals a hazard, or a minute establishes a deadline.
- Put useful details beside independent filler in hit passages. Keep no-hits natural; avoid artificial justifications whose only purpose is to announce that a detail matters.
- Use minimal schema-version-two labels with exact snippets for hits. Missing judgments stay unassessed; independent checks can both be positive on the same passage.
- Screen exact and near-duplicate writing against prior datasets, old case fixtures, definition examples and the opposite split. Archive reviewed surplus in Git before balanced selection.

## First Dataset Batch

- Begin with `body-emotion-shorthand`, whose legacy templates and narrative-cliche branches both express generic physical reactions as automatic emotion tags. Finalize its definition before authoring.
- Prepare separate development and protected holdout pairs with 100 hits and 100 no-hits each. The first completed batch targets 400 passages and 400 independent judgments.
- Reserve `000077-narrative-craft-body-emotion-shorthand-development` and `000078-narrative-craft-body-emotion-shorthand-holdout` after checking all dataset origins for conflicting filenames.
- Generate 240 candidates per split and review all candidates before balanced selection. Preserve varied reactions, mixed useful/filler context, physiological symptoms, exertion, practical consequences, dialogue and documented quotations.
- Keep the full family's consolidation review separate from this first type. Define mixed collections after the interacting checks have precise definitions; declare each label independently.
- Finish this batch's data-quality review before authoring a prompt. The batch tests whether the definition supports reliable labels on realistic writing before scaling to the rest of narrative craft.

## Prompt Evaluation

- Pin Jev `jev-1.13.0`, SDK `0.7.0`, threshold `0.5`, classification-only mode and batch size sixteen. Use `--development-only` and one named check per judgment.
- Copy shared instructions unchanged from `v19`; keep each assembled prompt below 1,000 words with at most three positive and three negative development examples.
- Require at least 95/100 caught positives and at most five false positives in each applicable development collection.
- Evaluate baseline plus at most three revisions; stop at first pass, two consecutive failures to improve the best total errors, or the revision limit. Preserve failed bounds and keep the earliest best candidate on ties.
- Confirm the selected candidate once on the same inputs. Report copied-demonstration exclusions, new and lost catches, corrected and introduced false positives, label disputes and mixed results separately.
- Holdout inference, broad corpus validation, span detection and production integration keep their separate stages. The current task starts with source review and definition quality before scaling data generation.

## Files

- This plan and `.plans/2026-10-20-125402-v2-rule-taxonomy.md` for execution and reviewed definitions.
- `datasets/ai-synthetic/passages/` and `datasets/README.md` for frozen writing and minimal labels.
- `prompts/v21/` and `prompts/README.md` for new prompts; `runners/results/` for native outputs and review records.
- Reuse `runners/datasets.mjs`, `runners/jev.mjs`, the dataset Fixture3 suite and paragraph-runner contracts unchanged.

## Execution Status

- The preceding frame repair is recorded as unsuccessful, with its original prompt retained. The user asks to move on on 2026-10-23.
- Independent source review covers all nineteen identifiers. Preserve distinct defects and leave broad consolidations proposed; the first dataset batch uses only `body-emotion-shorthand`.
- Definition review corrects three boundaries: include embodied-object burden, judge the bodily reaction's specific contribution rather than mere sequence, and preserve involuntary communication as well as intentional signals. The reviewer approves the revised extract before generation.
- The accepted taxonomy now contains that first reviewed definition. Separate authors are generating twenty-case development and protected holdout pilots, each with ten hits and ten no-hits, before pool expansion.
