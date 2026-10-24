# Cover All Reviewed Perception Contrasts In One Prompt

## Summary

The native-example placement trial retains too many false positives and increases token use. Combine the six already reviewed negative contrasts in one concise prompt while preserving one decision per passage.

## Results

- Placement2 catches 98 hits/seven false positives isolated and 96/seven mixed. Its requests consume 173,308 and 175,680 input tokens; both jobs finish in 3,476 milliseconds.
- Both complete native results validate and reproduce their original scores. Preserve this failed placement trial and its cost evidence.

## Decisions

- Keep the stronger native question and criteria. Use all six previously exposed negative controls for scene observation, interpersonal viewpoint, spatial orientation, quoted wording and observed conduct.
- Retain the three positive examples and concise judgments. Compress repeated Markdown guidance while preserving the frozen functional definition and separate frequency reporting.
- Amend the plan's arbitrary three-negative-example limit for this check. Nine examples fit within 959 assembled words, preserving the user's 1,000-word limit and the existing single-decision runner.
- This candidate introduces no new example IDs. Keep all historical exposure in additional score reports; evaluate every candidate on the same complete labeled inputs.

## Next Steps

- Evaluate the combined contrasts on both complete development collections and confirm any successful candidate on identical inputs.
- Finish protected rewriting and fresh blind reviews, then archive and balance the corrected holdout pools.
