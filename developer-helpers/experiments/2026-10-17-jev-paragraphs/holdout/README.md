# Semantic-thinness holdout

This set contains 100 independently authored paragraphs, with 50 expected hits and 50 expected passes. A fresh agent assigned the labels using its editorial judgment and access to the rule implementations.

## Files

- `paragraphs.json` contains neutral identifiers and target text.
- `labels.json` contains the author's expected decisions, reasons, and defective spans. Keep this file out of every model request.

## Evaluation Rules

- Keep these paragraphs out of demonstrations, rulebooks, prompt revisions, training data, and development fixtures permanently.
- Supply a paragraph only as the target being classified. Keep its label, rationale, and marked spans separate until scoring.
- Freeze the prompt, model, threshold, and input format before evaluation. Record their versions with the results.
- Preserve all 100 original records and author labels, including disagreements and failures. Record any disputed labels separately in an evaluation report.
- Evaluate the frozen prompt once. Further prompt development based on these results requires a fresh holdout for independent measurement.

## Provenance

- The author started without the parent conversation and was instructed to avoid existing prompts, benchmark inputs, fixtures, corpora, and results.
- The set is synthetic, with agent-assigned labels. Report performance as agreement with these labels.
- The worklog records file hashes after structural and overlap checks. Generation and validation make no Jev calls.
