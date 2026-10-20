# Grounded Metaphor Passages

## Summary

Added fourteen everyday passages to the existing metaphor development pilot: five hits and nine no-hits, totaling 531 words. The pilot now contains thirty passages and 1,131 words, with ten hits and twenty no-hits.

## Decisions

- Use bakery reporting, appointment administration, library access, software explanation, student guidance, restaurant reviewing, and newsletter advice. Put the questionable metaphor within ordinary surrounding prose.
- Keep useful conventional metaphors as controls, including a queue as a waiting room and a tutor as a first port of call. Include numbers and practical detail in both classes.
- Add useful explanations containing a why-question and the reason. These controls prevent explanatory wording alone from separating hits and no-hits.
- Run blind Opus review before and after adding the two explanatory controls. Preserve the requested model, actual model, raw input and response hashes, and objections in the existing review record.
- Reclassify the restaurant passage as a no-hit. Finding its rhythm conveys staff settling into coordinated service; the named check preserves that broad meaning.
- Preserve all sixteen earlier pilot passages, labels, snippets, and sample positions. Append to the existing pair and review record; the protected holdouts and original family collections remain unchanged.

## Quality Findings

- The new examples use recognizable situations and localized figurative wording instead of extended abstract imagery. They vary from one to five sentences.
- The bakery example invokes a handshake to explain a longer queue. The indexing example invokes a load-bearing layer to explain fewer useful search results. Neither supplies the claimed causal relationship.
- The new positive subset covers metaphor replacing an explanation or decision criterion. Further development should include standalone empty metaphors before regenerating the full collection.

## Verification

- Opus agreed with all twelve initial author labels and raised one objection. The independent reviewer corrected the restaurant label and accepted the other eleven.
- After adding two controls, Opus agreed with thirteen of fourteen final labels. Its remaining disagreement concerns the restaurant passage; the final review records all three objections and their decisions.
- The existing reader verifies passage boundaries, checksums, minimal labels, and exact snippets. All new hit snippets come from the blind Opus review.
- Root dataset validation, all 28 Fixture3 dataset contract checks, formatting, and whitespace checks pass.

## Key Files

- `datasets/ai-synthetic/passages/000019-semantic-thinness-unexplained-metaphor-development-pilot.md` and paired `.labels.json`: new passages `000019-017` through `000019-030`.
- `runners/results/000019-unexplained-metaphor-development-opus-review.json`: the new subset's review calls and quality findings under `extensionReview`.
- `datasets/README.md`: current pilot counts and coverage limits.

## Next Steps

- Review the new ordinary-prose examples with the user before scaling generation. Preserve useful figurative compression and require the complete passage to leave the claimed relationship unresolved.
