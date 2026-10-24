# Narrative Craft Development

## Goal

Complete the entire accepted `narrative-craft` family: reviewed development and protected holdout datasets for every named check, JSON Jev questions in the existing prompt format, and development tuning until every check meets the fixed quality bounds. Preserve the assessed rhythm prompts and production behavior.

- On 2026-10-23, the user explicitly expands this task to the whole family and starts an ongoing goal. Completing one dataset, one prompt, a failed search round or a subset of the checks cannot complete that goal.
- The attached text is read before execution; it concerns an unrelated SEO discussion. The explicit Narrative Craft instruction governs this goal.

## Complete Coverage

Keep all nineteen accepted identifiers visible through definitions, data, prompts and results. Overlapping defects can receive several positive labels; no label is exclusive to its family or check.

- `abstract-personification-line`.
- `body-action-density`.
- `body-emotion-shorthand`.
- `emotion-as-substance`.
- `emotion-telling`.
- `empty-atmosphere-shift`.
- `empty-beat`.
- `empty-emotional-weather`.
- `empty-scene-state`.
- `fake-timestamps`.
- `fixed-metaphor-frame`.
- `gaze-choreography`.
- `low-information-beat-density`.
- `low-information-physical-blocking`.
- `narrative-cliches`.
- `perception-verb-density`.
- `sensory-instead-of-frame`.
- `silence-as-actor`.
- `summary-fog-transition`.

The density-named checks recognize weak cues independently of reporting frequency. Preserve each source's coverage while keeping occurrence counting and severity in the separate reporter; the Jev question asks whether the named cue occurs in its complete passage.

## Approach

1. Read all nineteen legacy checks, their template data, shared guards, reporting policies and relevant case fixtures. Map each recognition branch to the defect it attempts to find.
2. Review the nineteen definitions independently before generation. Retain their accepted names, permit overlap and preserve every source branch; approve no consolidation that silently reduces this full-family goal.
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

## Source Review

- Start with `body-emotion-shorthand` and the bodily-reaction branches of `narrative-cliches`. The remaining cliche branches cover voice, atmosphere, time transitions and foreshadowing and retain their coverage for later definitions.
- `empty-beat` and `low-information-physical-blocking` are the strongest consolidation candidate: both detect placeholder pauses or positioning. Review `gaze-choreography` separately against useful observations.
- `body-action-density`, `low-information-beat-density` and `perception-verb-density` supply candidate actions and observations. Their counters establish frequency; meaningful defects still require contextual definitions.
- Keep `emotion-as-substance`, `emotion-telling` and `abstract-personification-line` distinguishable while reviewing their scopes. The first bodily-reaction batch establishes none of their labels.
- `empty-scene-state`, `empty-atmosphere-shift`, `empty-emotional-weather` and `silence-as-actor` overlap around generic mood description. Any consolidation must preserve useful observations and independently meaningful figurative description.
- `fixed-metaphor-frame` and `sensory-instead-of-frame` require informative imagery controls. The literal frame alone cannot distinguish decoration from a useful image or sensory contrast.
- `summary-fog-transition` needs controls for purposeful compression and memory limitations. `fake-timestamps` needs relevance controls; its recognized time spelling supplies no finding of fabrication.

## Dataset Requirements

- Cover plausible fiction, memoir, factual incident accounts, travel writing, sports narration, workplace stories and explanatory examples with narrative passages.
- Include different names, species, ages, perspectives and tenses. Vary sentence and paragraph length; preserve enough connected context to judge what the action or observation contributes.
- Pair stock-looking language with concrete functions: a glance reveals a signal, a bodily response affects an action, a pause changes an exchange, quiet reveals a hazard, or a minute establishes a deadline.
- Put useful details beside independent filler in hit passages. Keep no-hits natural; avoid artificial justifications whose only purpose is to announce that a detail matters.
- Preserve coherent positive passages whose bad sensory grounding or generic decoration is the intended defect. Repair independent setup contradictions or missing context that prevents judging the target.
- Use minimal schema-version-two labels with exact snippets for hits. Missing judgments stay unassessed; independent checks can both be positive on the same passage.
- Screen exact and near-duplicate writing against prior datasets, old case fixtures, definition examples and the opposite split. Archive reviewed surplus in Git before balanced selection.

## First Dataset Batch

- Begin with `body-emotion-shorthand`, whose legacy templates and narrative-cliche branches both express generic physical reactions as automatic emotion tags. Finalize its definition before authoring.
- Prepare separate development and protected holdout pairs with 100 hits and 100 no-hits each. The first completed batch targets 400 passages and 400 independent judgments.
- Reserve `000077-narrative-craft-body-emotion-shorthand-development` and `000078-narrative-craft-body-emotion-shorthand-holdout` after checking all dataset origins for conflicting filenames.
- Generate 240 candidates per split and review all candidates before balanced selection. Preserve varied reactions, mixed useful/filler context, physiological symptoms, exertion, practical consequences, dialogue and documented quotations.
- Keep the full family's consolidation review separate from this first type. Define mixed collections after the interacting checks have precise definitions; declare each label independently.
- Finish this batch's data-quality review before authoring a prompt. The batch tests whether the definition supports reliable labels on realistic writing before scaling to the rest of narrative craft.

## Full Dataset Allocation

- Retain the reviewed `000077`/`000078` body-emotion sets. Reserve `000079` through `000114` for the other eighteen checks, in the coverage-list order with body-emotion omitted; each adjacent pair is development then holdout.
- Prepare 38 isolated collections: 7,600 passages, with 100 hits and 100 no-hits per check and split. Generate 240 reviewed candidates per new collection before selecting 200.
- Reserve `000115` through `000128` for seven mixed development/holdout pairs. Each collection has 200 passages and labels every check evaluated on it.
- Mixed A covers body-emotion shorthand, empty beats and empty scene states.
- Mixed B covers emotion as substance, perception cues and clock precision.
- Mixed C covers emotion telling, gaze choreography and sensory substitution.
- Mixed D covers abstract personification, body actions and summary-fog transitions.
- Mixed E covers atmosphere shifts, physical blocking and narrative cliches.
- Mixed F covers emotional weather, low-information beats and fixed scene metaphors.
- Mixed G covers silence as actor, body-emotion shorthand and the frozen rhythm `flat-action-cadence` comparator.
- Review logical compatibility before generating combinations. For three independently possible judgments, use 25 passages per combination and 100 hits/100 no-hits per check; correct the grouping before generation if an implication makes that impossible.
- The combined target is 52 paired collections and 10,400 passages, including the existing body-emotion data. Keep all labels minimal, preserve difficult reviewed cases and archive surplus before balancing.

## Prompt Evaluation

- Pin Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode and batch size sixteen. Use `--development-only` and one named check per judgment. Complete controlled prompt comparisons at threshold `0.5` before a separately recorded development-calibration phase.
- Copy shared instructions unchanged from `v19`; keep each assembled prompt below 1,000 words with at most three positive and three negative development examples.
- Require at least 95/100 caught positives and at most five false positives in each applicable development collection.
- Use the existing Markdown prompt files with JSON `instructions` and `criteria.true`/`criteria.false` front matter. The native runner sends these as typed Noul questions; introduce no parallel prompt format.
- Freeze each candidate before inference and retain every response. Work in bounded rounds of baseline plus up to three revisions, then review errors and choose the next evidence-backed approach when a check still fails.
- A failed bounded round remains unfinished work under the active full-family goal. Continue development until all nineteen checks meet the fixed limits in every applicable development collection and one fresh confirmation.
- Keep definitions, labels, model, threshold and execution settings frozen during each comparison round. Preserve every original result and review annotation corrections separately; retain all hard cases.
- After a completed comparison round, assess calibration on development probabilities across every applicable cohort and repeat. Require a feasible cutoff range at least 0.05 wide; choose its midpoint rounded down to two decimal places to favor recall, before fresh inference. Report the cutoff and original 0.5 results separately. Keep the 95/5 quality bounds unchanged and freeze cutoffs before holdout evaluation.
- Confirm the selected candidate once on the same inputs. Report copied-demonstration exclusions, new and lost catches, corrected and introduced false positives, label disputes and mixed results separately.
- Holdout inference, broad corpus validation, span detection and production integration keep their separate stages. Finish the complete family's development evaluation while preserving protected holdout writing and labels.

## Completion Evidence

- Every named check has a reviewed definition, a development pair and a protected holdout pair, each with exactly 100 hits and 100 no-hits. Every selected passage and snippet validates through the public reader.
- All seven mixed pairs complete review, independent labeling, compatibility checks, copy screening and balanced selection. Report their counts separately from isolated data.
- All nineteen concise prompts have valid JSON questions, highlighted development demonstrations and recorded example exposure. Shared instructions, model, threshold and batch size remain fixed within comparisons.
- Saved native development responses and one fresh confirmation prove at least 95/100 caught hits and at most five false positives in every applicable collection for all nineteen checks. Report the frozen comparator separately.
- A fresh reviewer verifies the report against completed commands, source writing, frozen inputs, prompt snapshots and original responses. Global data validation, Fixture3, relevant runner contracts and build/lint/type checks pass.
- Commit and push all completed work with worklogs; verify remote CI. Keep the goal active while any required dataset, check, prompt or quality bound remains unfinished.

## Files

- This plan and `.plans/2026-10-20-125402-v2-rule-taxonomy.md` for execution and reviewed definitions.
- `datasets/ai-synthetic/passages/` and `datasets/README.md` for frozen writing and minimal labels.
- `prompts/v21/` and `prompts/README.md` for new prompts; `runners/results/` for native outputs and review records.
- Reuse `runners/datasets.mjs`, `runners/jev.mjs`, the dataset Fixture3 suite and paragraph-runner contracts unchanged.

## Execution Status

- The complete family has 52 frozen collections: 10,400 passages and 16,000 judgments. Independent verification passes all 36 dataset gates; reviewed surplus and original candidate versions remain in Git.
- All nineteen checks have completed isolated and mixed development runs. The frozen rhythm comparator remains separate; protected holdout inference has never run.
- Ten checks have candidates confirmed within the fixed quality bounds on isolated and every applicable mixed collection. Nine checks still need detector or calibration work.
- The final duplication screen finds zero candidates across 3,231,085,000 comparisons. Its hash-bound reference inventory verifies the original body-emotion pair was included.
- Native prompts remain below 1,000 assembled words. Historical demonstration sets, exact responses, changed predictions, scope incidents and corrected word-count metadata remain in the development record and worklogs.
- Timestamp and perception example-only revisions retain identical question prefixes. Compare them on the same 188 targets outside the union of their old and new demonstrations.
- Offline calibration identifies broad feasible ranges for timestamps and an earlier personification prompt. Test preregistered midpoint cutoffs in fresh development confirmations; preserve all original 0.5 scores.
- Next: complete the remaining checks without changing labels or definitions for detector scores, confirm each selected prompt on every applicable development collection, and obtain final independent verification before completion.
