# Regenerate Metaphor Datasets

## Goal

Replace the surreal unexplained-metaphor development and holdout collections with realistic prose. Each split needs at least 100 hits and 100 no-hits, reviewed blind by Opus and independently for label correctness and writing quality.

## Approach

1. Rebuild development in `000011`, retaining all thirty reviewed pilot passages and their stable IDs. Generate the remaining coverage from the accepted definition and realistic everyday writing.
2. Use a separate author context for a fresh `000012` holdout. Keep its text, snippets, and case-level decisions outside this prompt-development context.
3. Vary topics, register, passage length, metaphor form, and surrounding detail. Include localized defects, useful figurative compression, recoverable implicit meaning, and explanation wording in both classes.
4. Review every final passage through authenticated Claude Opus with labels and class balance withheld. Adjudicate objections against the definition; retain model disagreements and distinguish label-informed snippet selection if needed.
5. Have fresh reviewers check both collections, actual review inputs and responses, label decisions, snippet provenance, overlap, and realistic writing. Correct labels and add examples when a class falls below 100.
6. Validate the pairs, root datasets, and Fixture3 dataset contracts. Update the index, remove the folded pilot pair and record, then commit and push the reviewed replacement on main.

## Decisions

- Keep the accepted check definition and production behavior unchanged. This task regenerates data; it does not tune or evaluate Jev.
- Replace the old collections under the user's regeneration request. Git commit `32c921ec` retains their earlier contents and review records.
- Give newly authored passages fresh IDs rather than reusing IDs for different text. Preserve the pilot's `000019-*` IDs when moving it into development.
- Keep sound cases when correcting labels. Class minimums justify additions rather than deletion or forced model agreement.
- Check replacement samples for natural wording before generating a full positive cohort. Prefer plausible figurative non-explanations over forcing personification variants or arbitrary wording quotas.
- Treat label correctness and realism separately. Reject unnatural drafts even when Opus agrees; preserve useful controls and document quality replacements independently of label corrections.
- Store unique temporary review inputs and responses by collection, split, and pass. Keep raw generation and review material outside the active dataset folders.

## Files

- `datasets/ai-synthetic/passages/000011-semantic-thinness-unexplained-metaphor-development.md` and paired labels.
- `datasets/ai-synthetic/passages/000012-semantic-thinness-unexplained-metaphor-holdout.md` and paired labels.
- `runners/results/unexplained-metaphor-{development,holdout}-opus-review.json`.
- Remove the folded `000019` pilot pair and its separate review record after verifying preservation.
- `datasets/README.md` and the task worklog.
