# Complete Semantic-thinness Holdout

## Goal

Add 400 fresh paragraphs to cover the implemented semantic-thinness constructions and their stated clean boundaries. Preserve all earlier holdout records and keep every holdout paragraph out of Jev demonstrations and prompt revisions.

## Coverage

- Cover all 243 declared template forms across 36 pattern files with a desired-hit paragraph for each form.
- Cover all 115 declared `rejectIf` entries with a corresponding informative clean paragraph.
- Add 42 helper and precision-stress cases for broad significance, scoped boring-solution forms, superficial trailing analysis, and concrete-detail relevance.
- Record source filenames and template/rejection indices or named helper cases in labels. Paragraph records retain only neutral IDs and text.

## Execution

1. Four fresh writers generate 100 paragraphs each in batches 003-006, numbered `holdout-201` through `holdout-600`.
2. Verify coverage references against the source inventory, unique IDs/text, evidence spans, fresh wording, and unchanged original data and Jev prompts.
3. Run Claude's blind assessment for each batch without author labels, followed by the adversarial label and coverage audit with labels supplied.
4. Preserve disagreements and unsupported coverage claims for the user's judgment. Repair missing or misassigned coverage through additional fresh paragraphs while retaining original records and review evidence.
5. Independently review counts, coverage evidence, audit results, and the report; commit and push with a worklog.

## Decisions

- Coverage follows declared constructions and stated exceptions rather than every combination of slot words. The slots contain 2,275 listed entries; enumerating their Cartesian products would duplicate wording without establishing semantic generalization.
- Fresh semantic variants must preserve the assigned construction's defining relationship or grammar. Unrelated bad prose cannot count as coverage merely because it belongs to the same broad concept.
- Source guards can conflict with paragraph-level editorial intent. Claude must expose those conflicts instead of changing labels to imitate implementation output.
- The original 200 paragraphs remain exploratory coverage. The new 400 provide explicit source-linked coverage, with 264 desired hits and 136 desired passes planned.

## Files

- Add `paragraphs-003.json` through `paragraphs-006.json` and corresponding `labels-*.json` in the existing experiment's `holdout/` folder.
- Add corresponding Claude audit JSON artifacts and one consolidated Markdown discrepancy and coverage report in that folder.
- Update its README and add the completion worklog. Leave library code, source fixtures, original holdout files, and the selected Jev prompt unchanged.

## Coverage Review Additions

- Added four supplementary controls in batches 007-008 after review found that describing a heading and reporting a factual ranking did not demonstrate the assigned source boundaries.
- Preserved the disputed bare bullet and added an explicitly marked list label. Retained all original records and audit objections for the user's judgment.
