# Empty-Takeaway Development Batch

## Summary

Added 200 development passages for `semantic-thinness/empty-takeaway`: 100 hits and 100 close no-hits, totaling 5,145 words. Claude Opus classified every passage blind and agreed with every author label, while raising three boundary objections for adjudication.

## Decisions

- Keep this batch specific to empty takeaways, with varied professional and narrative subjects. A no-hit applies to this check even when another family could flag the wording.
- Shuffle neutral passage IDs and separate the Markdown writing from minimal labels. Hit labels contain exact snippets; no-hit labels omit snippets.
- Keep the three disputed passages as no-hits because the surrounding events supply their lessons.
  - `000001-050` contrasts door photographs with names-only directions; the successful choice is inferable.
  - `000001-069` describes simultaneous saves overwriting entries and separate files reconciling correctly.
  - `000001-149` describes cutting an explanation so a forged signature reveals the deception.
- Preserve reviewer objections and resolutions in one compact result file. Keep author labels and review notes outside inference inputs.
- Add version 2 support to the existing reader because version 1 requires rejected explanation fields and repeated finding offsets. Preserve raw metadata and expose resolved ranges separately for execution.
- Preserve legacy annotations and saved Jev results. Score version 2 no-hits against their named check and retain legacy family-wide controls.

## Verification

- Generated both halves through one author agent and reviewed each with `claude-opus-5-5`, using disabled tools, shuffled passages, hidden author labels and snippets, and no requested class balance. Frozen input hashes match both reviewed drafts.
- Checked all 200 labels, exact hit snippets, passage boundaries, checksums, and normalized text uniqueness. The longest passages contain 63 words; 27 passages contain at least 45 words, split between 14 hits and 13 no-hits.
- The dataset validator passes for all 15,646 documents and 16,053 labels. The new Markdown and labels also load through the Jev reader.
- Reproduced rejection of minimal labels before adding reader support. All 28 reader and Jev contract checks pass afterward; reviewed and approved the four new checks through the existing Fixture3 datasets suite.
- Replayed the saved historical Jev output offline: all 604 targets, 27 requests, and 2,251 decisions remain valid. Assigned positives remain 28 of 29 caught across the three existing prompts, with 13 of 240 clean controls flagged.
- Build, changed-source ESLint, Prettier, and whitespace checks pass. Production detection code and prompts retain their existing behavior.
- A fresh read-only reviewer found no blocking issues after inspecting affected callers, replaying all 28 contracts, running nine schema rejection probes, and checking dataset counts and review hashes.

## Key Files

- `datasets/ai-synthetic/passages/000001-semantic-thinness-empty-takeaway-development.md` and paired `.labels.json`: the complete development batch.
- `runners/results/empty-takeaway-development-opus-review.json`: review counts, frozen-input hashes, models, objections, and decisions.
- `runners/datasets.mjs`, `runners/dataset.schema.json`, and `runners/jev.mjs`: compatible minimal-label loading and check-specific scoring.
- `scripts/datasets-contract.mjs`: reader and inference-boundary integration checks.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md`: the accepted definition used for generation and adjudication.

## Next Steps

- Review this first development batch with the user before generating the other eight semantic-thinness types.
- Use the accepted development material to tune the empty-takeaway prompt, then prepare independently reviewed protected holdout material before measuring it.
