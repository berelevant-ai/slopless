# Archive All Isolated Narrative Candidates

## Summary

Preserve reviewed candidates for every Narrative Craft check before balanced selection. The thirty-six new isolated pools contain 8,640 reviewed passages and 458,904 words; the existing body-emotion pair remains frozen separately.

## Decisions

- Pack thirty-four reviewed 240-row sources while preserving the two already selected emotion-telling files. Their full reviewed pools remain at `fdb78b0f`; each later selection retains its own archive proof.
- Keep original judgments, current text reviews, correction support and detector predictions separate. Preserve all original IDs and review-backed difficult cases before selecting 100 hits and 100 no-hits.
- Continue mixed review independently. A rejected unsupported label correction receives a new blind opinion and fresh adjudication, preserving one supported no-hit correction and retaining the other passage's expected hit.
- Prepare development-example selection jobs for the other seventeen prompts. Run them only after balanced development files are frozen, with explicit permitted inputs and no holdout or detector output.

## Verification

- Public dataset validation passes on 15,773 documents and 55,693 labels. The reader checks both raw reviewed pools and the already selected emotion-telling pair.
- The current lexical screen finds zero candidates across 3,862,896,520 comparisons. It includes all fifty new collections, prior datasets, legacy fixtures and definition examples.
- All six paragraph-runner contract tests pass. Commit `19bcda07` passes all four GitHub workflows.
- A fresh mechanical reviewer checks all thirty-six new isolated sources, current-text review coverage and packing. Its 12,051 passing assertions identify two current labels requiring independent support; fresh blind judgments and exact-source repacking resolve both.
- Keep the atmosphere passage as a difficult no-hit and restore the unspecified head movement to a hit. The latter correction changes one label while preserving every passage's wording; the original audit findings and their verified resolution remain recorded.

## Key Files

- Dataset pairs `000079` through `000114` cover the other eighteen isolated checks, alongside the existing `000077` and `000078` body-emotion pair.
- `runners/results/narrative-craft-v21-data-review.json` records reviewed source totals, execution hashes and per-stage input scopes.
- `runners/results/narrative-craft-v21-isolated-reviewed-data-audit.json` preserves the original audit and independently verified resolutions.
- The Narrative Craft plan retains the full data, prompt and development-evaluation requirements.

## Next Steps

- Select balanced sets from the archived reviewed pools, preserve existing selections, and recheck all selected writing. Choose three positive and three negative demonstrations per remaining prompt before inference; evaluate and tune every isolated and mixed check.
