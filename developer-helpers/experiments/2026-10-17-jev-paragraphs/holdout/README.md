# Semantic-thinness holdout

This set contains 604 examples. The first two batches contain 100 expected hits and 100 expected passes; the new source-linked paragraphs and supplementary controls add 264 expected hits and 140 expected passes.

## Files

- `paragraphs.json` and `labels.json` contain the original 100 paragraphs and their author's labels.
- `paragraphs-002.json` and `labels-002.json` contain the additional 100 paragraphs, numbered `holdout-101` through `holdout-200`.
- Batches `003` through `006` contain `holdout-201` through `holdout-600`. Their labels also reference the source template, rejection entry, or named helper case being tested.
- Batches `007` and `008` contain four supplementary controls, `holdout-601` through `holdout-604`, added after coverage review.
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
- Evaluate the frozen prompt once. Further prompt development based on these results requires a fresh holdout for independent measurement.
- A separately authorized label audit may inspect both files and the rule definitions. Save its objections separately for the user's judgment and preserve the original labels.

## Provenance

- The author started without the parent conversation and was instructed to avoid existing prompts, benchmark inputs, fixtures, corpora, and results.
- The first writer reports inspecting four implementation files. The second writer used supplied general coverage principles and reports reading only the writing instructions and its new files.
- The second Claude audit first judges all 100 new paragraphs without author labels, then scrutinizes every label against the text, the blind judgment, and the full rule definitions.
- Four additional fresh writers inspected their assigned source definitions while avoiding prior holdouts and benchmark material. Their batches receive the same two-pass review, extended to verify source-linked coverage claims.
- The set is synthetic, with agent-assigned labels. Report performance as agreement with these labels.
- The worklog records file hashes after structural and overlap checks. Generation and validation make no Jev calls.
