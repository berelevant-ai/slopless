# Root Datasets On Main

## Summary

Consolidated all corpus, source, and model-evaluation data in the canonical Slopless checkout's root `datasets/` folder on `main`. Root `prompts/` contains the four Markdown prompts, and root `runners/` contains the Jev runner and the relocated existing helpers.

## Decisions

- Updated the canonical checkout from its older `development` state to the released `main`. Preserved all local forbidden-terms edits and untracked files through a named stash, then combined overlapping additions with the newer main files.
- Imported the 604 reviewed paragraphs, unchanged labels and audits, four prompt texts, and latest saved model answers from `7197bf7`. Kept production source changes from that experiment branch outside this task.
- Moved the entire old validation corpus into `datasets/corpus`, the generated batch into `datasets/corpus/generated-slop`, and historical research material into `datasets/legacy`.
- Moved 81 experiment data/report files into `datasets/experiments` and 39 executable helpers into `runners/legacy`. Updated their active paths while preserving original data bytes.
- Retained all 267 older Jev artifacts from `2ebcba5` in `datasets/experiments/jev-history-2ebcba5.zip`. Verified each archived entry against its source bytes.
- Installed the existing Jev SDK version `0.7.0` as a pinned development dependency. The runner now uses a standard package import instead of a hidden installation in another checkout.
- Preserved raw dataset formatting and excluded development data, legacy helpers, and browser captures from production formatting/spelling checks. The npm file allowlist retains the public package boundary.
- Fixed the relocated fixture-coverage helper's count: entries configured as `false` are excluded from its enabled-rule list.
- The user authorized ignoring G3TS for this commit. Use `git -c core.hooksPath=/dev/null commit` for this operation; retain the configured `.githooks` path and every hook file.

## Verification

- Specular lint passes. Its initial verification failed on missing root collections; final verification covers all 16 tree requirements, including the local history archive.
- Verified SHA-256 preservation for 279 labeled source files, 175 historical source files, and 15,647 corpus files. Verified all 81 experiment data files and the documented path edits in the 39 helpers.
- Human corpus: 13,680 Markdown documents and 21,632,736 whitespace-delimited words. Generated AI: 400 documents and 186,749 words. Suspected AI: 1,500 documents and 1,611,175 words.
- The generated slop batch preserves ten texts, 18 hit/no-hit Markdown files, configurations, and analysis notes. Corpus documentation explains counting and preserves the original licenses and provenance.
- The Jev runner reproduces all 1,812 detection scores and 439 highlighting scores from its saved batches in this checkout. A completed `run` resumes offline; the installed SDK import succeeds. No provider calls were made.
- `pnpm run validate` passes build, CLI-version verification, ESLint, formatting, spelling, and strict 100% type coverage. Earlier attempts exposed browser-capture formatting and the SDK's package spelling; the final run passes with those addressed.
- Fixture3's default CLI suite matches both approved fixtures. The source-material verifier passes with relocated paths.
- The relocated coverage helper scanned all 36 fixture files and reported 68 enabled rules with six coverage gaps, excluding the ten disabled rules. Its optional term-policy and legacy-rule gaps remain visible in the printed result.
- Git's diff check initially treated conflict-marker examples inside six preserved corpus articles as unresolved merges. Configured a 128-character conflict marker for datasets so Git can distinguish future merge markers from those original examples.
- Repaired eight active manifests that referenced the removed folders; all 101 relocated targets exist and seven historical forbidden-path checks remain intact. Five verifiers pass after the path updates.
- Corrected the fresh-corpus verifier's absolute/relative replay-path comparison so it counts findings on the relocated files. Other historical source-text assertions remain visible rather than changing source or fixtures to satisfy them.
- The repaired actionability checker reports `slopless/corporate-speak` on "The engineer created a north-star diagram for telescope calibration." in the phrases no-hit data. The other two historical failing checks report 20 source-text assertions; their relocation failures are resolved.
- Reviewed all 92 secret-scan findings: 63 published RFC test vectors, 19 explicit documentation placeholders, 6 sequential dummy keys, 2 idempotency identifiers, and 2 JWT demonstrations. Added their 90 unique file/rule/line fingerprints to `.gitleaksignore`; the same placeholder at a separate test path still produces a finding.
- npm's dry run excludes every dataset, prompt, runner, and developer-helper file. All 16,200 dataset files, including the history archive, are staged for the reorganization commit.
- The historical fixture/corpus coverage audit reports 2,047 mismatches: 630 missing case lines, 3 wrong family/bucket values, 42 missing preserved texts, 13 mismatched preservation entries, 1,129 missing entries, 17 extra entries, and 213 missing case findings. Preserved its inputs and reported the failure separately from the data migration.
- Independent review reproduced those same 2,047 audit errors in identical order using the original main inputs and the preserved local finding. It verified all moved file bytes, every saved model decision, and preservation of the original local edits.
- The installed G3TS hook rejects seven-character conflict-marker examples in original technical articles and staged data files above 1,048,576 bytes. Its CLI exposes no data exception, and `init repo --force` retains that policy. The one-command bypass leaves that installation unchanged.
- The final `pnpm run validate` rerun passes build, CLI-version verification, ESLint, Prettier, CSpell, and 100% type coverage.
- The final standalone `gitleaks protect --staged` scan completes successfully over 210,270,284 bytes in 4 minutes 1 second, with zero findings after the reviewed file/rule/line exclusions.

## Context

- `datasets/README.md` indexes all collections; `datasets/corpus/README.md` gives exact corpus counts and provenance.
- `prompts/v1/shared.md` contains the common instructions. The three adjacent files contain the check definitions.
- `runners/README.md` provides Jev commands; `runners/legacy/README.md` describes the existing audit and generation helpers.
- `.fixture3/root-source-migration.json`, `root-corpus-migration.json`, and `root-experiment-migration.json` contain complete local move evidence. The worklog records their verified totals for the committed history.
- The pre-existing term-policy implementation, configuration, and approved-output edits remain outside the reorganization commit. Their named stash is retained as a recovery copy.

## Next Steps

- Use the datasets and prompts directly from the canonical checkout on `main`.
- Keep holdout labels out of model inputs. Use a new prompt version and result file for a wording comparison.
- Review the historical case/corpus mismatches before editing their expected behavior or preservation records.
