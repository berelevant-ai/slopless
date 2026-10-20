# Model Experiment Layout

## Summary

Consolidated source data under root `datasets/`, extracted four Markdown prompts into `prompts/v1/`, and replaced the experiment-directory runners with `runners/jev.mjs`. Preserved the latest 27 model batches in one 149,017-byte result file; earlier experiments remain in Git at `2ebcba5`.

## Decisions

- Use `shared.md` for the common instructions and adjacent files for the three checks. All four texts remain word-for-word identical to the committed criteria.
- Merge 74 holdout input files into `paragraphs.json` and `labels.json`. Preserve every original field and all 11 audit files; add offline family/group metadata to target records.
- Move all 279 upstream labeled source files byte for byte to `datasets/labeled/`. Preserve the existing inventory at `datasets/INVENTORY.md`.
- Keep request construction, validation, scoring, and resumable execution in one runner. A chosen result file contains settings, hashes, responses, timing, and usage; labels and group metadata stay outside requests.
- Remove 267 superseded experiment files after verifying their committed state and preserving the latest answers. Their four article snapshots still match the existing behavioral fixtures byte for byte.
- Leave sibling worktrees intact. Production source, fixtures, approved outputs, package exports, dependencies, and version remain unchanged.

## Verification

- Specular lint passes; verification failed on the missing layout before implementation and now passes all 13 built-in tree checks.
- Independently compared all moved source Git blobs, every original target and label record, all audit bytes, and all prompt strings against `2ebcba5`. Preserved 604 targets across 37 groups, 364 expected hits, and 240 expected passes.
- Reconstructed all 27 saved requests exactly and replayed their answers through the new runner. All 1,812 detection scores, 439 highlighting scores, selected sentences, and ranges match the prior results.
- Offline scores remain 5/5 abstract contrasts with zero false alarms, 15/15 emotion descriptions with nine, and 8/9 realizations with four, each against all 240 clean controls. The false alarms affect 13 unique clean paragraphs.
- CLI checks reject wrong request hashes, models, prompt hashes, negative timing/token counts, out-of-range scores, missing answers, duplicate batches, unknown checks, invalid thresholds, and missing selected outputs.
- An incomplete output validates its completed prefix but fails scoring. A complete `run` resumes successfully with an unavailable SDK path, proving that completed work requires no further inference.
- `pnpm run validate` passes build, version synchronization, 35 source-range checks, ESLint, formatting, spelling, and 100% type coverage. A formatting failure after shortening prompt paths was corrected before rerunning successfully.
- Fixture3's `slopless-cli-defaults` suite matches approved output for all three fixtures. `python3 developer-helpers/scripts/verify-source-material.py` and `git diff --check` pass.
- npm's dry run contains 253 files and excludes datasets, prompts, runners, and developer helpers. No API calls were made during this reorganization.
- A preservation command exceeded its buffer while reading the existing upstream ZIP; reran using Git blob hashes for source files and completed all 279 comparisons.
- Fresh review independently reproduced all 27 requests, all 2,251 scores and highlights, every resume prefix, source preservation, and the reported counts. It found that an unknown group could hide a missed positive; added an allowed-group list inside the dataset and reject unknown assignments before scoring.

## Context And Next Steps

- `datasets/README.md` describes sources and the semantic holdout. `datasets/INVENTORY.md` preserves the detailed source inventory.
- `prompts/README.md` explains shared instructions and version folders. `runners/README.md` provides commands, result counts, and historical reproduction instructions.
- `runners/jev.mjs` is the active runner; `runners/results/semantic-thinness-v1.json` contains the preserved answers.
- For a new wording comparison, create `prompts/v2/` and choose a separate result file. Preserve holdout separation and report assigned-positive catches against all family-clean controls.
