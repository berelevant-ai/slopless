# Slopless V2

## Goal

- Develop cheap, fast decision-model checks that generalize Slopless writing patterns. Scope tasks to named checks; measure missed slop and false positives by family and issue type.
- This document specifies the target workflow. Inspect the current schema and runners before implementing it; report which parts are operational.

## Product Scope

- Target standardized sloppiness checks with fixed definitions and tested defaults; CLI flags select checks. Business-specific terminology belongs to the separate existing Python workflow.
- Judge the supplied passage or full text. External fact-checking, source verification, and decisions about a particular reader's prior knowledge belong to the separate editor.
- Keep readability measurement and terminology-policy enforcement outside this V2 iteration.
- Compare Jev with the old CLI before deciding which deterministic checks remain useful and whether textlint support should continue.
  - Base decisions on labeled evaluation, later corpus validation, highlighting quality, latency, and cost. Preserve production behavior while evaluating the replacement.
- Read [the accepted V2 taxonomy](.plans/2026-10-20-125402-v2-rule-taxonomy.md) when assigning families and issue types. It maps existing checks and records Humanizer additions and exclusions.
  - Use its consolidated semantic-thinness definitions for that family's datasets and checks. Treat the legacy identifiers as coverage sources rather than separate issue types.
- Exclude decorative-bold checks. Judge redundant label wording independently of its formatting.
- Declare `input: passage` or `input: text` in each finalized issue definition. The submitted writing is the complete input.
  - A passage can include several paragraphs. A text is the complete article, story, or reply; text-level checks use it intact.
  - Classify buried answers and repeated explanations within the submitted text as text-level checks. Keep density reporting separate from this input requirement.

## Storage

- Keep all datasets in root `datasets/`, under `human/`, `ai-suspected/`, `ai-normal/`, or `ai-synthetic/` according to origin.
  - Each origin has `passages/` for independent examples and `texts/` for cohesive articles, stories, or chapters.
  - A passage can contain several sentences or paragraphs. Preserve the complete context needed to judge it.
- Pair `<six-digit-id>-<short-descriptive-slug>.md` with the same stem plus `.labels.json`.
  - Assign each file pair a globally unique, stable ID. Describe its content in the slug; retain source and model details in JSON.
  - Store passage IDs and boundaries in the paired JSON alongside separate judgments. Keep cohesive texts intact and locate judgments within them.
- Each label contains the passage ID, issue type, a boolean expected hit or no-hit, and `snippets` for hits.
  - Snippets are exact text copied from the passage that identifies the offending wording or sequence. Use several snippets when a construction crosses sentences; no-hit labels omit snippets.
  - Validate that each snippet occurs in the passage. Derive character positions in code only when needed for highlighting; agents author and review the text itself.
  - Explain why the pattern is bad once in the shared issue-type definition. Omit passage-level explanations, source history, prior runs, and review transcripts from labels.
  - Missing labels mean unassessed. Several checks can label the same passage without copying its text.
  - Preserve original linguistic scores and annotations as their original measurements.
- Keep versioned prompts in root `prompts/<version>/`: `shared.md` plus concise check-specific Markdown files.
  - Keep common instructions in `shared.md`; put each check's principle and highlighted development examples in its specific prompt.
  - Require detection of all instances of the pattern, including unseen wording. Keep each assembled check prompt within 1,000 words.
- Keep execution code in root `runners/`. Use Fixture3's approved, received, and diff outputs for regression comparisons.
  - Keep provider responses and experiment results under `runners/results/`; keep predictions separate from dataset labels.
  - Include the collection ID, split, and review pass in temporary input and response filenames so parallel jobs preserve each other's review artifacts.
  - Reuse the same source datasets across runners. Avoid parallel copies, catalogs, and generation-history folders.

## Labeled Evaluation Sets

- Generate and review separate development and holdout file pairs for each issue type being developed, using passages or complete texts according to its declared input.
  - Include the family, type, and `development` or `holdout` in each slug; record the split in JSON.
  - Freeze isolated sets at exactly 100 desired hits and 100 desired no-hits per type in each split, with varied wording and contexts. Each caught hit or false positive then represents one percentage point within its class.
  - Correct labels before selecting the final set. Generate replacements when needed, preserve reviewed hard cases, and archive surplus passages with their original labels in a linked Git commit.
  - Choose the balanced set before detector evaluation, independently of detector scores. Compare candidates on the same examples and report uncertainty when drawing conclusions.
  - Check identical and near-identical writing across splits before freezing them, including passage/full-text copies.
- Maintain isolated sets that test one issue type and mixed sets that deliberately combine issues within the same passage or complete text.
  - Name mixed sets with `mixed`, the covered families or types, and the split. Use `passages/` for independent excerpts and `texts/` for complete texts, with the same paired format.
  - Cover relevant within-family combinations, cross-family pairs, and larger mixtures among the named checks. Report mixed-set counts separately.
  - Assess every evaluated check in mixed passages and texts, including expected no-hits. Score checks separately, all expected issues found together, and exact matches with no unexpected issues.
- Derive family evaluations from labels. Report per-type results, passage/check or text/check judgment counts, and distinct passage or text counts according to the declared input.
  - Match findings to the labeled check and passage or complete text. An unrelated finding does not satisfy an expected hit.

## Development Loop

1. Prepare the labeled sets above and freeze their judgments before tuning.
2. Tune against development examples and results in an authoring context that has never seen the holdout material.
   - Use development demonstrations. Keep holdout passages, labels, and snippets out of that context.
3. Freeze the candidate, prompts, model, thresholds, execution settings, and acceptance criteria before evaluating holdout.
   - Compare candidates on identical inputs. Run independent passages separately; preserve complete texts for whole-text checks.
4. Report results per issue type, family, and isolated versus mixed sets.
   - Count caught and missed positives, correctly unflagged negatives, false positives, newly caught positives, lost positives, and corrected false positives.
   - Report passage detection and highlighting separately when the runner produces both.
5. Use a fresh holdout for an independent assessment after holdout results influence revisions or candidate selection.
   - Reclassify exposed tuning material as development while preserving its judgments.

## Corpus Validation And Migration

- Run broad human, suspected-AI, ordinary-AI, and synthetic texts after labeled evaluation, with the candidate frozen.
  - Keep this stage separate from labeled prompt development. Review changed findings; bring selected discoveries into a later labeled development round.
  - Before reporting rates, define a sample and label it for each evaluated check, including passages where the detector found nothing.
- Treat accepted Fixture3 output as the best-known regression expectation, including results on unlabeled writing.
  - Explicit labels remain the correctness reference. Record any reviewed prediction adopted as a label explicitly; an absent finding on unlabeled text remains unassessed.
  - Preserve known misses and false positives in the labels when accepting a behavioral snapshot.
- During migration, save the current CLI output once on the comparison inputs, then compare the replacement on those same inputs.
  - Review additions, removals, changed issue assignments, and highlighting against labels before establishing the replacement baseline.
  - Record exact input hashes, detector and runner versions, configuration, and applicable prompt/model versions with saved results.
  - Rescore saved predictions when only judgments change. Verify the replacement before removing superseded runners and results; Git retains their history.

## Completion

- Show the prompts or detector changes, evaluation counts, reviewed regressions, and remaining misses for the named checks.
- Keep this workflow in this file. Update it when decisions change instead of creating another competing instruction document.
