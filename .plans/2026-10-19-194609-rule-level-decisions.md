# Rule-level Paragraph Decisions

## Goal

- Test stable family/type identities with one paragraph-level decision per type. A positive decision can cover a phrase, sentence, or cross-sentence construction without running duplicate sentence detectors.
- Revise the taxonomy to organize writing problems by their existing family and rule, with required context and reporting behavior described underneath.

## Approach

- Freeze three short criteria from existing semantic-thinness source definitions: `abstract-contrast`, `generic-realization`, and `emotion-as-substance`. Keep all holdout text and explanations out of the criteria.
- Evaluate each criterion on all 604 existing holdout paragraphs with Jev 1.13.0 and threshold 0.5. Preserve request and response hashes, elapsed times, and usage.
- After positive paragraph decisions, ask which numbered sentences participate in that specific construction. Preserve the paragraph finding when localization selects no sentence.
- Compare decisions with the assigned type's existing positive labels and the 240 family-clean controls. Other positive paragraphs lack exhaustive type labels; report those extra classifications separately.
- Compare with the existing native findings and frozen family-level model results. Report their broader task separately from the new type-specific task.
- Read every assigned-type miss and every clean-control false alarm. Check localization against the existing marked evidence where its format supplies spans.
- Run a fresh independent review, correct verified objections, record the worklog, and commit and push the experiment and taxonomy changes.

## Decisions

- Keep the current public rule and internal pattern IDs. Use existing Jev SDK, Markdown parsing, and sentence splitting rather than adding a framework or production adapter.
- Use paragraph-level detection followed by sentence participation, rather than rerunning complete-issue detection on isolated sentences.
- Keep all existing labels, fixtures, prompts, and production rule implementations unchanged. This experiment measures a proposed execution model before a production refactor.

## Files

- `developer-helpers/rule-taxonomy.md`: remove sentence/paragraph ownership groups while preserving every existing rule and subtype.
- `developer-helpers/experiments/2026-10-19-rule-level-decisions/`: frozen criteria, runner, request/response artifacts, results, and report.
- `.worklogs/`: source-backed summary and concrete continuation instructions.
