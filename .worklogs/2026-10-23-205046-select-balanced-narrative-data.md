# Select Balanced Narrative Data

## Summary

Complete the first narrative-craft data-quality batch for body-emotion shorthand. The active development and protected holdout pairs contain 400 passages and 22,190 words, with exactly 100 hits and 100 no-hits each.

## Decisions

- Preserve all 66 mandatory pilot, corrected, rewritten, challenged and snippet-boundary cases. Fill each remaining class quota by deterministic ID ranking, independently of detector predictions.
- Retain original candidates at `2f5af44d` and reviewed pools at `232e81dc`. All eighty surplus passages and original versions remain available through Git.
- Review corrects three classifications and clarifies seven passages. Every current passage receives three review passes; rewritten passages receive fresh blind, adversarial and final reviews.
- Preserve holdout isolation and the unchanged first definition. Broader family consolidation stays proposed; prompt tuning and Jev inference follow the completed data-quality phase.

## Verification

- Public dataset validation passes on 15,723 documents and 37,053 labels. Fixture3's dataset suite matches its approved output, and all six paragraph-runner tests pass.
- The final copy screen reports zero candidates across 127,080,600 eligible comparisons, including prior datasets, old fixtures, definition examples and new within-/cross-split pairs.
- The fresh independent packaging/report audit passes with no corrections. An earlier packaging pass is invalidated by an out-of-scope taxonomy projection; its mechanical checks and invalidation remain recorded separately.

## Key Files

- Read the `000077` development pair for prompt-authoring inputs. Keep the `000078` holdout writing and individual judgments outside that context.
- Read the narrative-craft development plan and accepted taxonomy for the first definition and remaining family work.
- The two narrative review records preserve selection hashes, source archives, correction decisions and role-specific read scopes.

## Next Steps

- Develop the body-emotion Jev prompt against the frozen development pair. Keep protected holdout inference separately authorized; complete the remaining narrative definitions and mixed datasets through the same workflow.
