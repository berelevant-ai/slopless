# Plan Puffery Development

## Summary

Prepared the next family's generation, adversarial review, and development-only Jev tuning plan. Execution remains pending the user's request.

## Decisions

- Consolidate the existing puffery, challenge/recovery, and universalizing source behaviors into named issue definitions before generating examples.
- Use separate development and holdout authors, three planned review passes, blind Opus classifications, independent adjudication, and exact 100-hit/100-no-hit class sizes.
- Keep holdout material in separate generation and review contexts; freeze it after review and exclude it from prompt authoring and Jev inference during this task.
- Reuse existing storage and runners. The inspected runner currently hardcodes semantic thinness, so the plan includes bounded family-selection and classification-only changes with contract coverage.
- Keep labels fixed during tuning, record all candidate trials, disclose development-derived examples, and report remaining errors separately from later validation.
- Propose a development gate of at least 95/100 caught hits and at most five false positives. Bound tuning to baseline plus six revisions and report failed targets explicitly instead of extending repeated fitting indefinitely.
- Fresh plan review identified selection, split-protection, persistence, and corrected-label rescoring gaps. Revised the plan to filter eligible candidates before ranking, validate split metadata before provider initialization, and preserve immutable trial snapshots and original judgments.
- Link the execution plan from the accepted V2 taxonomy plan. Preserve the previously recorded mixed-set, corpus, highlighting, and production-integration stages.

## Verification

- Checked runner loading, batch planning, scoring, saved-result equality, and schema behavior directly against the proposed changes.
- Fresh review confirms the revised stopping rules, candidate selection, split protection, data selection, and compatibility plan, with zero remaining material objections.
- Internal-document formatting and staged whitespace checks pass. This task makes planning changes only.

## Key Files

- `.plans/2026-10-20-235148-puffery-family-development.md`: execution sequence and completion gates.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md`: accepted family inventory and execution-plan link.
- `runners/jev.mjs` and `runners/dataset.schema.json`: inspected current runner restrictions and supported data format.
- The existing development Opus review records and semantic-thinness generation worklogs: verified procedure and lessons.

## Next Steps

After execution is requested, complete issue definitions, prepare reviewed data for every type, and tune on development. Stop with the frozen candidates and report before running holdout detector evaluation.
