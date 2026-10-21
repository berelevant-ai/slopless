# Freeze Unnecessary Framing Development

## Summary

Freeze the first unnecessary-framing prompt at 99 development hits caught with zero false positives. Both balanced datasets retain all mandatory cases and their original wording and judgments from the archived full pools.

## Decisions

- Select the qualifying baseline without further prompt tuning. Preserve its known missed rhetorical question and the unchanged `0.5` threshold.
- Use eight exact development demonstrations in 684 words of complete instructions. Keep the holdout outside the authoring context and preserve the native inference result bytes.
- Tune each ready check after its own datasets pass review, selection, and overlap clearance. Independent generation for buried answer can continue; every family check still completes before advancement.
- Preserve sound shared-scenario controls and disclose their dependence. The selected sets contain fifty development and forty-nine holdout links, with groups of at most three passages.

## Verification

- Fresh protected subset review verifies 100/100 per split, all 37 mandatory cases, exact archive retention, deterministic selection, historical-versus-current metadata scope, and input hashes.
- Protected overlap review covers all 480 full-pool passages against 15,673 historical files. It clears cross-split/source copying and documents one discarded initial scope-error run.
- The real baseline evaluates all 200 development passages in two requests totaling 1,338.164584 milliseconds. Exact demonstration checks, complete-instruction word counting, and development-only preflight pass.
- The temporary driver passes all 133 existing integrity checks after check-specific loading. Fixture3's dataset suite matches approved output; archive commit `49203a48` passes CI, CodeQL, Code Quality, and Scorecard.
- Fresh independent result verification confirms all 200 decisions, 684 words, eight demonstrations, both canonical requests byte for byte, and the retained miss. Public offline scoring and seven tampering checks pass using saved responses, with zero additional provider calls.

## Key Files And Next Steps

- `prompts/v13/shared.md` and `unnecessary-framing.md` contain the common instructions and selected check. The existing per-check trial JSON preserves its complete native result.
- `runners/results/boilerplate-and-signposting-v13-development.md` records settings, examples, the miss, dataset preparation, and remaining family work.
- Collections `000029` and `000030` hold the balanced framing sets; their Opus review records link the full-pool archive and selection proof.
- Finish the complete-text collections `000031` and `000032`, then tune buried answer and complete the protected family holdout assessment. Keep unrelated term-policy changes unstaged.
