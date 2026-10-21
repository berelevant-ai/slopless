# Review Unnecessary Framing Pools

## Summary

Preserve the complete development and holdout pools before selecting balanced evaluation sets. Each pool contains 240 passages with 120 desired hits and 120 desired no-hits; independent label QA passes for both.

## Decisions

- Keep every reviewed passage and its original judgment in this archive. Select the final 100/100 sets independently of detector scores after overlap clearance.
- Preserve all mandatory boundary cases: twelve development hits and twenty-five holdout cases, including five hits and twenty no-hits. Keep holdout writing and adjudications outside the prompt-authoring context.
- Continue whole-text generation for buried answer after approval of both six-text pilots. Preserve useful setup and adequate early answers as close no-hits.

## Verification

- Development has twelve successful Opus CLI calls, including nine final-pool calls covering all 240 current passages in three review roles. Fresh independent QA verifies labels, snippets, provenance, matched length bands, ten domains, and all mandatory cases.
- Holdout has eleven successful Opus CLI calls covering all 240 current passages in three roles. Protected independent QA verifies labels, snippets, provenance, length/class balance, and all mandatory cases.
- Both independent reviews require zero repairs. The separate source/split overlap audit remains running; this archive precedes balanced selection and Jev evaluation.
- Fixture3's dataset suite matches its approved output. The temporary tuning driver passes 133 existing integrity checks after retaining explicit question criteria in per-check snapshots; the selection helper passes eight existing passage checks and five complete-text checks.

## Key Files And Next Steps

- Collections `000029` and `000030` under `datasets/ai-synthetic/passages/` hold the complete framing pools and minimal labels. Their review records are `runners/results/unnecessary-framing-development-opus-review.json` and `unnecessary-framing-holdout-opus-review.json`.
- Independent QA details remain at `/tmp/000029-independent-qa.json` and `/tmp/000030-independent-qa.json`. Preserve protected material when continuing their audits.
- Finish source/split overlap review, select balanced subsets while retaining mandatory cases, and verify unchanged retained writing and judgments against this archive.
- Finish and independently review collections `000031` and `000032`, then freeze the family's datasets before development-only prompt tuning and its separate holdout assessment.
