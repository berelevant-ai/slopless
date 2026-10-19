# Rule-level Paragraph Decisions

## Summary

- Reorganized the taxonomy around existing family, rule, and internal type identities. Removed sentence/paragraph ownership groups while preserving all 77 public rules and all listed template types.
- Tested three semantic-thinness types against all 604 holdout paragraphs, then localized positive decisions by sentence participation. The 29 assigned positives were caught and localized; 15 clean paragraphs received false alarms.

## Decisions

- Freeze the 355-word criteria from existing source definitions before inspecting target text. Keep all original holdout labels and earlier prompts unchanged.
- Make one paragraph-level detection decision per named type, followed by sentence participation for positives. Preserve paragraph findings when participation selects no sentence.
- Keep counting separate from this prototype. Paragraph/type decisions and highlighted sentences do not identify separate occurrences for density reporting.
- Score each type's assigned positives against the 240 family-clean controls. Review extra labels on other positive paragraphs separately because the dataset has one primary type per paragraph.
- Reuse the installed Jev SDK and existing sentence splitter. Store compact derived results referencing dataset IDs instead of duplicating complete target text and labels.

## Verification

- Completed 1,812 detection decisions and 551 localization decisions across 25 requests. Summed SDK request time is 8.08 seconds, with 389,736 input tokens and 64,885 output tokens.
- Abstract contrast caught 5/5 assigned positives with one false alarm; empty realization caught 9/9 with four; emotion-as-substance caught 15/15 with eleven. Sixteen false type decisions affect fifteen unique clean paragraphs.
- All 29 detected assigned positives selected exactly the evidence-bearing sentences. Four abstract contrasts required both sentences, which the participation stage selected together.
- Compared the same 29 positives with saved baselines: the previous broad family prompt caught 29; the native family caught 15. The old broad-family task and the new type-specific task have different coverage.
- Manually reviewed all assigned positives, flagged clean paragraphs, and paragraphs with additional positive type decisions. The report gives concrete wrong-type findings, contextual failures, the disputed list-label expectation, and localization disagreements.
- `validate`, offline `summarize`, Node syntax validation, and `git diff --check` pass. Every saved request and response is checked against reconstructed inputs; criteria, source data, model, answer keys, and probability bounds are verified.
- Checked all 77 public IDs, all 36 semantic pattern IDs, document links, ASCII typography, and JSON parsing. All 53 JSON files parse; the largest artifact is 876,794 bytes.
- Fresh review independently reproduced every reported score, request, source example, localization, baseline comparison, and usage total. Fixed its two runner objections by rejecting unexpected batch artifacts and hashing the historical comparison against its pre-experiment commit.
- Negative CLI checks reject an altered baseline hash and an extra response file. Restored both test changes and reran offline summarization with unchanged results. Baseline hash metadata was added after review; criteria, targets, requests, and responses stayed unchanged.
- Production implementations, public exports, fixtures, and package version remain unchanged. Full production suites and a release were outside this experimental change.

## Context And Next Steps

- `developer-helpers/rule-taxonomy.md` supplies the revised family/rule/type hierarchy.
- `developer-helpers/experiments/2026-10-19-rule-level-decisions/report.md` explains the results and every clean false alarm. Adjacent criteria, runner, inputs, requests, responses, and derived results preserve the experiment.
- Strengthen type boundaries and contextual exemptions using development examples, then evaluate against fresh independently labeled data. Preserve Markdown node kinds during input preparation.
- Evaluate cross-paragraph context and separate-occurrence grouping before connecting this model output to production density reporting.
