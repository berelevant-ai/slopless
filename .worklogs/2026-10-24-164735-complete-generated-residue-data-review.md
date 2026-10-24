# Complete Generated Residue Candidate Review

## Summary

The complete reviewed pool contains 2,416 passages and 88,600 words across ten collections. Preserve it in Git before selecting the final balanced 2,000 passages.

## Decisions

- Complete three fresh whole-pool review passes and recheck repaired cases. Correct fourteen remaining judgments through fresh split-only adjudication, preserving all passage wording at that step.
- Invalidate two earlier mixed-split adjudication contexts as protected-review evidence. Replacement reviewers read only their own split's disputes and the definition extract; preserve both invalidation records.
- Add sixteen protected holdout controls after corrected wrapper labels leave only 99 no-hits. All sixteen pass three independent blind reviews without disagreements; retain them during balancing.
- Preserve every pilot and every disputed or repaired hard case in final selection. Archive surplus independently of detector performance.

## Verification

- The existing dataset reader validates all ten reviewed pairs and literal snippets.
- Final reviewed-pool copy screening covers 795,447,464 comparisons against 328,034 reference inputs. It finds zero exact duplicates, cross-split near-duplicates or matches to prior material.
- Its 212 similarity candidates occur entirely within development data. Preserve these matched-context controls and distinguish demonstration-related evaluation from untouched holdout assessment.
- No Jev classification has run. Prompt authoring begins after balanced selection and its independent audit.

## Context

- Original complete author pools are archived at `99e73874`; the reviewed archive created by this commit supplies the balanced selection source.
- `runners/results/generated-residue-v22-data-review.json` preserves protected judgments, permitted reads, corrections and invalidated reviews.
- `/tmp/slopless-generated-residue-v22/selection-report.json` will record deterministic selection and mandatory-case retention.

## Next Steps

- Select exactly 100 hits and 100 no-hits per assigned check/collection, prove archive equivalence and retain every required case.
- Develop and confirm the three concise prompts on isolated and mixed development inputs; keep the full-family goal active until all gates pass.
