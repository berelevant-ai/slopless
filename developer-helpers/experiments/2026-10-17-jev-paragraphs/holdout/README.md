# Semantic-thinness holdout

This set contains 200 independently authored paragraphs in two batches, each with 50 expected hits and 50 expected passes. A separate fresh agent wrote and labeled each batch using its editorial judgment.

## Files

- `paragraphs.json` and `labels.json` contain the original 100 paragraphs and their author's labels.
- `paragraphs-002.json` and `labels-002.json` contain the additional 100 paragraphs, numbered `holdout-101` through `holdout-200`.
- Paragraph records contain neutral identifiers and target text. Label records contain expected decisions, reasons, and defective spans; withhold them from every classification benchmark request.
- `claude-label-review.md` and `claude-label-review-002.md` contain Claude's objections for the user's judgment. Corresponding JSON files preserve the review executions and responses.

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
- The set is synthetic, with agent-assigned labels. Report performance as agreement with these labels.
- The worklog records file hashes after structural and overlap checks. Generation and validation make no Jev calls.
