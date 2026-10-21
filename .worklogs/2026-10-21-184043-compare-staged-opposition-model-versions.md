# Compare Staged-Opposition Model Versions

## Summary

Ran the restored best staged-opposition prompt on Jev 1.14 with the same 200 development inputs. It catches 95 hits with ten false positives, compared with 96 hits and ten false positives on 1.13.

## Decisions

- Retain 1.13 for the next bounded prompt round. Keep data, shared instructions, threshold, batch size, and request construction fixed while testing a clearer contextual-contribution instruction.
- Preserve the complete 1.14 result separately because its model differs from the existing family trial history. Keep holdout sealed until a qualifying development candidate is frozen.

## Verification

- Fresh review reconstructs every request and confirms model is the only changed field. Both versions use SDK 0.7.0 and the frozen text and labels.
- The comparison catches development passage 129 and loses 166 and 168; all ten false-positive IDs remain unchanged.
- Two requests return 200 decisions in 774.667 milliseconds, with 26,189 input tokens and 6,208 output tokens. The saved result retains hashes, probabilities, timings, and usage.

## Key Files And Next Steps

- `runners/results/staged-contrasts-v12-jev-1-14-development.json` preserves this completed comparison. The existing family development report and execution plan record its effect and the next round.
- Test revisions `staged-r4` through `staged-r6` under the existing qualifying-first ranking and stopping rules. Review all changed decisions before selecting a candidate.
