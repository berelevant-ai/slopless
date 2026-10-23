# Archive Reviewed Narrative Pools

## Summary

Complete review of all 480 body-emotion candidates before selecting balanced sets. Preserve original versions at `2f5af44d` and archive the reviewed pools in this commit.

## Decisions

- Correct two development labels and one protected label against the frozen definition. Retain 120/120 development and 119/121 protected candidate counts.
- Clarify three development passages and four protected passages for realism or causal clarity. Preserve their stable IDs; independently review every replacement three times.
- All other current passages retain three full review passes. Protected final review preserves two challenged cases after rejecting their proposed quality objections.
- Keep all corrected cases, rewritten cases, pilots and disputed snippet boundaries mandatory in balanced selection. Select without Jev predictions; no classifier inference has run.

## Verification

- Fresh final development review approves all 240 current classifications and snippets. Protected full final review and three replacement reviews complete its 240-case reconciliation.
- The reviewed-pool copy screen reports zero candidates against prior datasets, legacy fixtures, definition examples and other new passages. Both reviewed pairs pass the public dataset reader.
- Original and reviewed pool hashes, permitted read scopes and correction decisions remain separate from the minimal dataset labels in the two review records.

## Key Files

- The `000077` development and `000078` protected pairs currently retain all 240 reviewed candidates each.
- Read `runners/results/narrative-craft-development-review.json` and `narrative-craft-holdout-review.json` for review coverage and provenance.
- Read the narrative development plan and accepted taxonomy for the unchanged issue definition.

## Next Steps

- Select exactly 100 hits and 100 no-hits per split while retaining every mandatory case. Preserve surplus in this Git archive, validate the final pairs and complete an independent packaging audit.
