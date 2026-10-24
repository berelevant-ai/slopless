# Freeze Second Corrected Development Selection

## Summary

Restore balanced final selections after archiving four label corrections in `9e52d9ba`. The three affected collections contain 600 passages, with exactly 100 hits and 100 no-hits for every assigned check.

## Decisions

- Retain all mandatory controls under the existing deterministic selector. Mixed-A keeps 25 per combination; mixed-B uses 28, 23, 23, 26, 24, 25, 25 and 26 in binary combination order to preserve its enlarged mandatory control group.
- Preserve the original full pools and all rotated optional cases in the archive. Source writing stays unchanged; detector predictions never enter selection.
- Mark five accepted checks as requiring confirmation on the changed inputs. Their earlier passing runs remain valid historical evidence for the previous selections.

## Verification

- Selector execution completes with zero unproven changes, zero missing hard-case retention and zero replenishment requirements. Its archive proof binds all corrected source passages to the full archive commit.
- Public dataset readers validate all three final pairs. Explicit assertions verify 200 rows per collection and 100/100 for each of seven assigned check/collection combinations.
- The first inspection attempted a nonexistent top-level samples field; the corrected inspection reads the paired metadata schema and passes the checks above.

## Key Files

- The three affected dataset pairs contain final balanced writing and labels.
- The existing data-review record stores round-two source provenance and packing; the tuning record distinguishes historical passing results from required current-data confirmations.

## Next Steps

- Run seven changed development combinations, then fresh confirmations for accepted checks. Independently verify the changed data and preserve all original responses.
- Complete protected holdout annotation repair while keeping its passages and individual judgments outside authoring.
