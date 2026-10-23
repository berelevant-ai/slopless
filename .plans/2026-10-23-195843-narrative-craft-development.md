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

- Pin Jev `jev-1.13.0`, SDK `0.7.0`, threshold `0.5`, classification-only mode and batch size sixteen. Use `--development-only` and one named check per judgment.
- Copy shared instructions unchanged from `v19`; keep each assembled prompt below 1,000 words with at most three positive and three negative development examples.
- Require at least 95/100 caught positives and at most five false positives in each applicable development collection.
- Use the existing Markdown prompt files with JSON `instructions` and `criteria.true`/`criteria.false` front matter. The native runner sends these as typed Noul questions; introduce no parallel prompt format.
- Freeze each candidate before inference and retain every response. Work in bounded rounds of baseline plus up to three revisions, then review errors and choose the next evidence-backed approach when a check still fails.
- A failed bounded round remains unfinished work under the active full-family goal. Continue development until all nineteen checks meet the fixed limits in every applicable development collection and one fresh confirmation.
- Keep definitions, labels, model, threshold and execution settings frozen during a tuning round. Never change them or remove hard cases to improve a score; review annotation corrections separately and preserve original results.
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

- The preceding frame repair is recorded as unsuccessful, with its original prompt retained. The user asks to move on on 2026-10-23.
- Independent source review covers all nineteen identifiers. Preserve distinct defects and leave broad consolidations proposed; the first dataset batch uses only `body-emotion-shorthand`.
- Definition review corrects three boundaries: include embodied-object burden, judge the bodily reaction's specific contribution rather than mere sequence, and preserve involuntary communication as well as intentional signals. The reviewer approves the revised extract before generation.
- The accepted taxonomy contains the first reviewed definition. Both twenty-case pilots pass independent blind review: ten hits and ten no-hits per split, with one development snippet-boundary difference retained separately.
- The pilot copy screen finds zero candidates against 15,721 earlier dataset documents, 39 legacy Markdown fixtures and definition examples. Its 317,502 reference inputs produce 12,700,480 eligible comparisons.
- Two independent writers per split produce all 480 candidates, preserving the pilots. Original pools remain at `2f5af44d`; three-pass reviewed pools remain at `232e81dc`.
- Review corrects three labels and clarifies seven passages while preserving their IDs. Each rewritten passage receives three independent reviews against the same frozen definition.
- Balanced selections contain 400 passages and 22,190 words, with exactly 100 hits and 100 no-hits per split. All 66 mandatory cases remain selected; eighty surplus passages retain their reviewed labels in Git.
- Final copy screening finds zero candidates across 127,080,600 eligible comparisons. Global dataset validation, Fixture3's dataset comparison and all six paragraph-runner tests pass.
- A fresh independent packaging/report audit passes with no corrections after an earlier auditor's out-of-scope taxonomy read invalidates that pass. The first type's data-quality phase is complete; new prompts, Jev inference, other narrative types and mixed evaluations remain subsequent work.
- The new full-family goal supersedes the earlier first-batch stopping point. All nineteen checks, remaining datasets, mixed collections and development-passing prompts are now required before completion.
- All nineteen final definitions pass independent source review at `fcfc8079`; the first body definition and its judgments remain unchanged.
- Body-emotion prompt b2 catches 99/100 positives with one false positive, then 99/100 with two false positives in a fresh confirmation. An independent audit verifies the saved requests and all changed judgments; mixed evaluation remains pending.
- Original pilots for all other fifty collections remain at `4b2e124b`: 944 passages and 59,366 words. Independent packaging review verifies exact text, labels, stable IDs, snippets and class/vector counts.
- The pilot copy screen finds zero candidates against prior datasets, legacy fixtures, definition examples and other new pilots across 300,738,104 eligible comparisons. This result applies to the archived pilot versions.
- Blind pilot review identifies one classification disagreement and 82 quality notes. Reconciliation and fresh review precede expansion; full candidate pools then receive three independent reviews before balanced selection.
- The first five full candidate pools contain 1,200 passages and 63,238 words. Additional approved collections are expanding; the family remains incomplete until every dataset, prompt and development bound is verified.
- Development annotation exposes a sensory-definition gap before detector tuning: useful perception can coexist with independently stock decoration in the same contrast. Expand that check explicitly, preserve ordinary informative perceptions, and review both isolated splits and mixed C against the revised extract. Preserve earlier definition and label versions in Git; keep development passages out of protected review prompts.
- All fifty new candidate pools are generated: 12,000 passages and 611,668 words. Isolated pools contain 120 hits and 120 no-hits; mixed pools start with thirty passages per three-check combination. Full review, reconciliation and balanced selection remain active.
- CLI headers identify `gpt-6.1-sol` as the generator. The source metadata records that observed model; repeated packing preserves the first commit reference when the writing and phase are unchanged.
- All nineteen native JSON questions now exist in `prompts/v21/`. Eighteen definition-only drafts await reviewed development demonstrations and inference; the body-emotion b2 prompt remains unchanged.
- Definition-only prompt review finds two ambiguous false criteria, for silence and summary-fog: a useful candidate could excuse a separate weak candidate. Both criteria now require every candidate to satisfy a protected function. All nineteen prompts load through the public reader and remain within 1,000 assembled words.
- The first five fully reviewed pools contain 1,200 passages and 63,860 words. Preserve their surplus before balanced selection; complete the other forty-five new collections and re-screen all reviewed and selected writing before inference.
- Scheduler capacity accounting now releases completed workers' reservations. Replacing its process interrupts ten incomplete reviews; their preserved logs and explicit recovery records identify the unchanged inputs being rerun. Completed responses remain intact.
