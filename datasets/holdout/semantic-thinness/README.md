# Semantic-thinness holdout

This dataset contains 604 paragraphs and 24,046 words, with 364 expected hits and 240 expected passes for the semantic-thinness family.

## Files

- Each of the 36 existing pattern folders and the `superficial-analysis` folder contains `paragraphs.json` and `labels.json`.
- Each paragraph belongs to one primary construction, chosen from its intended defect or clean boundary. Per-folder scores therefore add up to the complete dataset.
- Broad-significance helper examples belong to `hollow-significance`; scoped boring-solution examples belong to `solution-boring-frame`. Source references in the label records remain unchanged.
- IDs `holdout-001` through `holdout-200` are the first two independently generated batches. IDs `201` through `600` add source-linked coverage; IDs `601` through `604` are supplemental controls.
- Paragraph records contain neutral identifiers and target text. Label records contain expected decisions, reasons, and defective spans; withhold them from every classification benchmark request.
- `claude-label-review.md` and `claude-label-review-002.md` contain Claude's objections for the user's judgment. Corresponding JSON files preserve the review executions and responses.
- `coverage-review.md` summarizes source-linked coverage and audit objections. `claude-label-review-003.json` through `claude-label-review-008.json` retain the complete blind and adversarial assessments.

## Source-linked Coverage

- The additional 400 paragraphs reference all 243 template entries and all 115 stated rejection conditions in the family's 36 JSON pattern files.
- Another 42 references cover helper forms and precision boundaries. Three proposed existing exemptions are absent from the implementation; those desired-pass examples remain as stress tests, with the distinction recorded in the review.
- Supplemental controls complete the actual Markdown heading/list-label and praise-with-measurements cases. A proposed label change for the bare bullet `holdout-602` awaits the user's judgment.
- Coverage references identify intended cases. Claude's audit separately checks whether each paragraph demonstrates its assigned construction and whether its editorial label is defensible.
- The scope is the declared constructions and their clean boundaries. Listed slot words supply examples; their combinations are not individually enumerated.

## Evaluation Rules

- Keep these paragraphs out of demonstrations, rulebooks, prompt revisions, training data, and development fixtures permanently.
- Supply a paragraph only as the target being classified. Keep its label, rationale, and marked spans separate until scoring.
- Freeze the prompt, model, threshold, and input format before evaluation. Record their versions with the results.
- Preserve every original record and author label, including disagreements and failures. Record any disputed labels separately in an evaluation report.
- The first evaluation round compares four previously frozen configurations on every paragraph. Further prompt development based on these results requires a fresh holdout for independent measurement.
- A separately authorized label audit may inspect both files and the rule definitions. Save its objections separately for the user's judgment and preserve the original labels.

## Provenance

- The author started without the parent conversation and was instructed to avoid existing prompts, benchmark inputs, fixtures, corpora, and results.
- The first writer reports inspecting four implementation files. The second writer used supplied general coverage principles and reports reading only the writing instructions and its new files.
- The second Claude audit first judges all 100 new paragraphs without author labels, then scrutinizes every label against the text, the blind judgment, and the full rule definitions.
- Four additional fresh writers inspected their assigned source definitions while avoiding prior holdouts and benchmark material. Their batches receive the same two-pass review, extended to verify source-linked coverage claims.
- The set is synthetic, with agent-assigned labels. Report performance as agreement with these labels.
- Commit `90aaae9` retains the original eight paragraph/label batches at their former experiment path. All paragraph and label records survived the regrouping unchanged.
- Audit JSON files remain byte-identical. Their historical paths and hashes describe the original batches; reconstruct those files with `git show 90aaae9:<path>`.
- The comparison runner verifies preservation against that commit before making requests or scoring. It sends target text and frozen instructions; labels and group assignments stay in offline scoring.
- Run instructions and results are in [the comparison report](../../../developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout-comparison/report.md).
