# Model Experiment Layout

## Goal

Keep source datasets and holdouts under root `datasets/`, Markdown prompts under root `prompts/`, and experimental execution under root `runners/`.

## Approach

1. Move `developer-helpers/datasets/labeled` to `datasets/labeled`, preserving every source file byte for byte. Update the source-material verifier and active references.
2. Merge the semantic holdout's 37 paragraph/label pairs into two JSON files. Preserve IDs, text, labels, evidence, source references, and review objections; carry the primary type as record metadata.
3. Extract the existing shared instructions into `prompts/v1/shared.md` and the three existing check descriptions into adjacent Markdown files. Keep the words unchanged.
4. Replace the current request-file-dependent experiment with `runners/jev.mjs`. Read Markdown prompts and consolidated data directly; keep completed batch answers, request hashes, timing, and usage in one chosen JSON result file.
5. Keep prior versions in Git at `2ebcba5`. Remove superseded experiment directories after extracting their dataset inputs and compact saved results; document historical reproduction from that commit.
6. Verify preservation against Git, reconstruct the existing direct requests, replay saved answers through the new runner, and compare every score and highlight. Exercise changed-input and malformed-result failures before committing.

## Decisions

- `shared.md` contains common instructions. Version folders contain the specific descriptions so one selected version identifies a complete prompt set.
- `datasets/labeled` keeps the existing source/topic organization; `datasets/holdout/semantic-thinness` holds the reviewed evaluation set. Fixtures remain under `behavior/`.
- The runner filters by check while retaining all family-clean controls in scoring. Labels and primary-type metadata are excluded from model requests.
- A result file contains the execution settings and completed batches needed to resume. Separate request manifests and per-batch files are replaced by that record.
- Preserve review records separately from author labels. Existing disagreements remain available without changing expected answers.
- Leave sibling worktrees intact because each belongs to an independent branch. Repository content is consolidated on the existing experiment branch.

## Files And Verification Coverage

- `datasets/**`: source-file hash preservation, all 604 targets and labels, all audit records, 364 expected hits and 240 clean controls.
- `prompts/v1/*.md`: exact extraction of the shared instructions and three descriptions from committed `criteria.json`.
- `runners/jev.mjs`: CLI validation, request reconstruction, saved-result replay, complete clean-control scoring, sentence highlighting, and resume checks.
- `developer-helpers/experiments/**`: transfer unique dataset inputs and useful saved outputs before removing superseded experiment trees.
- `.prettierignore`, `.gitattributes`, `eslint.config.js`, `cspell.config.json`: retain developer-material treatment for relocated files.
- `developer-helpers/scripts/verify-source-material.py`: point source checks to root datasets.
- Root folder READMEs and `developer-helpers/README.md`: explain current paths and commands.
- Adjacent Specular JSON: built-in tree checks cover the required layout and removal of duplicated paths. Preservation and replay exercise the actual data boundaries separately.
