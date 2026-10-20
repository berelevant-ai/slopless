# Root Datasets On Main

## Goal

Make the datasets, prompts, and runners available in `/Users/tartakovsky/Projects/agent-quality-controls/slopless` on `main`, including the complete old and newly generated corpus material.

## Approach

1. Preserve the checkout's local edits while updating `main` to `origin/main`. Resolve overlapping additions by retaining both the latest released behavior and the local forbidden-terms additions.
2. Import the consolidated holdout, source datasets, Markdown prompts, and Jev runner from `7197bf7`, without importing production-rule changes from the experiment branch.
3. Move `article/corpus` into `datasets/corpus`, including human, generated-AI, suspected-AI, licenses, and audit data. Move the generated `new-corpus` batch into `datasets/corpus/generated-slop`.
4. Move historical source material from `developer-helpers/legacy` into `datasets/legacy`. Keep existing internal source organization and update active verifiers and references.
5. Inspect experiment outputs and generated examples outside those folders. Move additional data into datasets and keep executable helpers under runners, preserving every file before deleting old locations.
   - Retain all earlier Jev artifacts from `2ebcba5` in one lossless archive under `datasets/experiments`, with source-to-entry hashes checked before commit.
6. Update dataset documentation, path references, language-statistics attributes, and tool exclusions. Keep behavioral fixtures under `behavior/` and update their runner inputs only if necessary.
7. Verify byte preservation for every moved file, all 604 holdout records, and saved model answers. Exercise the Jev runner in this checkout, run package validation and relevant Fixture3 suites, and obtain independent review.
8. Commit only this reorganization and its worklog on `main`; retain unrelated local edits as uncommitted work. Push `main` and report the physical root paths.

## Decisions

- Root means the user's existing Slopless CLI checkout. Additional worktrees are unnecessary for this task.
- `datasets/corpus` owns the old validation corpus and generated prose. `datasets/holdout` owns the reviewed evaluation records; upstream sources and legacy material remain distinguishable within the same root folder.
- Large local corpus files move physically with complete hashes. Commit files permitted by repository size limits; document and retain any oversized data locally under the same datasets root.
- Prompt files remain Markdown under `prompts/v1`, with `shared.md` holding the common instructions. Results remain separate from data and instructions.
- Preserve original labels and disputed review records. Use saved responses to verify organization changes without calling the model.
- The saved local-change stash remains available until preservation is verified. Its production-rule edits are excluded from the reorganization commit.

## Files And Coverage

- `datasets/**`: all current source data, legacy material, corpus documents, audits, generated samples, and semantic holdout records; verify source/destination hashes.
- `prompts/**` and `runners/**`: import the verified four-prompt runner, update local paths, and compare saved scores and highlights.
- `article/experiments/**` and `developer-helpers/scripts/**`: update references to relocated corpus/source data; preserve helper code and outputs.
- `.gitignore`, `.gitattributes`, `.prettierignore`, `eslint.config.js`, `cspell.config.json`: keep development data outside production checks and package output.
- `datasets/README.md` and relevant existing inventories: document every collection's location and format.
- Adjacent Specular JSON: use built-in tree checks for the physical layout. Use hash comparisons and actual runner commands for data preservation and execution behavior.
