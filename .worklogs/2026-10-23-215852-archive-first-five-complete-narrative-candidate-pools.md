# Archive First Five Complete Narrative Candidate Pools

## Summary

Preserve the first five 240-passage candidate pools before full review and balanced selection. They contain 1,200 passages and 63,238 words across abstract personification, body actions and emotion telling.

## Decisions

- Preserve the original fifty pilots at `4b2e124b`. The independent pilot-packaging audit validates their exact source preservation, 944 stable IDs and minimal labels.
- Retain every pilot passage in its expanded pool. Require 120 hits and 120 no-hits before full review; annotation corrections follow definition correctness rather than detector scores.
- Review complete pools blindly, adversarially and finally. Correct technical inconsistencies and repeated passage constructions before freezing selections; rewritten writing requires fresh review.
- Keep holdout inference disabled and protected writing outside prompt authoring. Continue the full-family goal while the remaining pools are generated.

## Verification

- Public dataset validation passes on all five expanded pairs. Their source role records satisfy the permitted-input lists and literal snippet checks.
- Pilot copy screening finds zero matches across 300,738,104 eligible comparisons. This result applies to the original pilot archive and must be repeated for expanded and final data.
- The two completed first full-pool blind reviews cover 480 passages, with zero classification disagreements and eleven quality notes. Further reviews remain in progress.

## Key Files

- Root dataset pairs 000079, 000080, 000081, 000082 and 000086 now hold original complete candidate pools.
- `runners/results/narrative-craft-v21-data-review.json` links original pilot provenance and current candidate-pool hashes.
- `runners/results/narrative-craft-v21-pilot-packaging-audit.json` records the independent archive audit.

## Next Steps

- Finish every candidate pool and all reviews, reconcile labels and realism problems, and preserve reviewed surplus before selecting balanced sets. Then tune the other eighteen prompts and evaluate all checks on isolated and mixed development data.
