# Empty-Takeaway Development Batch

## Goal

Produce one reviewed development collection for `semantic-thinness/empty-takeaway`, containing 100 desired hits and 100 close no-hits. Use one Markdown file and one minimal labels file in `datasets/ai-synthetic/passages/`.

## Approach

1. Generate varied passages for this one check across professional and narrative subjects. Use a mixture of short examples and multi-sentence contexts.
2. Validate unique passage IDs, exact hit snippets, no-hit label shape, counts, and duplicate passages. Keep labels separate from the Markdown writing.
3. Have Claude Opus classify every shuffled passage without seeing the author's labels, then examine disagreements and doubtful cases adversarially.
4. Resolve objections by correcting labels or replacing ambiguous examples. Review replacements and preserve the final 100/100 balance.
5. Save review results under `runners/results/`, summarize the decisions in the worklog, and show representative passages and the complete files.

## Decisions

- This batch is development data for one issue type. Preserve the holdout material and existing production behavior.
- Use the agreed minimal labels: passage ID, named check, expected boolean, and exact snippets for hits. Keep passage boundaries in the collection's samples.
- The current reader requires legacy explanations and evidence fields. Add backward-compatible support for the minimal annotation shape rather than putting those rejected fields into the new data.
- Keep shared validation in the existing dataset reader and schema. Retain old annotation support so existing datasets and the historical Jev comparison remain usable.

## Files

- `datasets/ai-synthetic/passages/000001-semantic-thinness-empty-takeaway-development.md` and paired `.labels.json`: the new batch.
- `runners/dataset.schema.json` and `runners/datasets.mjs`: minimal-label validation with legacy compatibility.
- `runners/jev.mjs` and `runners/README.md`: consume resolved labels and preserve check-specific no-hit scoring.
- `scripts/datasets-contract.mjs`: integration coverage for minimal labels and invalid snippets.
- `datasets/README.md`: describe the minimal label shape and the new collection.
- `runners/results/`: Opus review output, kept separate from labels.
- `.worklogs/`: batch counts, reviewer objections, resolutions, and verification.
