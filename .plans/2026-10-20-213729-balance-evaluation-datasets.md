# Balance Evaluation Datasets

## Goal

Keep exactly 100 hits and 100 no-hits in each of the eighteen semantic-thinness development and holdout collections. Archive surplus passages in Git at `06de26256011e1d1689dd84b18e2ca20b49c371f` with their exact labels and snippets.

## Approach

1. Select existing reviewed passages using a deterministic, length-stratified selection within each class. Preserve the approved metaphor pilot and reviewed hard cases where present.
2. Keep selected text, IDs, labels, snippets, and split assignments unchanged. Rebuild Markdown passage boundaries and checksums with the existing reader.
3. Have a separate agent select and validate holdout material. Keep its writing and case-level decisions outside the prompt-development context.
4. Record the active selection in the existing review records while retaining their full-cohort review history. Link the archive commit from the dataset index.
5. Update `AGENTS.md` to require exact class sizes after review. Validate all eighteen sets, source preservation, root datasets, Fixture3 contracts, formatting, and independent review before committing and pushing main.

## Decisions

- Apply the fixed size to all existing issue-type sets so reported catches out of 100 are comparable. Keep other corpora unchanged.
- Use the already committed full collections as the archive. This preserves surplus examples and their review records outside active evaluations.
- Select before detector evaluation and independently of detector scores. Keep length coverage and known difficult examples rather than retaining only easy agreements.
- Preserve the protected holdout split in the archive and active sets.

## Files

- `datasets/ai-synthetic/passages/000001-*` through `000018-*`, where a class exceeds 100.
- Corresponding `runners/results/*-opus-review.json` records for changed selections.
- `datasets/README.md`, `AGENTS.md`, and the task worklog.
