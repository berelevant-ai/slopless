# Archive Four Further Label Corrections

## Summary

Archive complete corrected development pools before balanced selection. Four reviewed hits become no-hits across perception and empty-beat collections; every source passage and other-check label stays unchanged.

## Decisions

- Preserve the original pools, previous supported/replenished pools and prior frozen selections before writing corrections. Keep original reviewed inputs untouched.
- Store all corrected source records in the archive: 240 perception passages, 240 mixed-A passages and 247 mixed-B passages. These full pools precede the balanced 200-passage selections.
- Add the four adjudicated cases to the existing curator record so the selector treats them as mandatory controls. Selection keeps its fixed hash ordering and exact per-check 100/100 margins.
- Keep every original native result and label snapshot. Re-run affected checks after selection rather than treating changed labels or membership as detector improvement.

## Verification

- Structured correction checks prove all four target labels were hits before correction. Passage text and every other named-check judgment compare equal before and after.
- The public dataset reader validates all three packed full pools: 727 passages and 38,740 words. Source-only preflight establishes enough reviewed candidates for balanced selection.

## Key Files

- The three affected dataset pairs contain the complete corrected archive pools in this commit.
- The existing data-review record preserves source backups, exact hashes, four decisions and independent review provenance.

## Next Steps

- Use this archive commit in the deterministic selector, pack final selections and verify mandatory retention and 100/100 margins before pushing the balanced HEAD.
- Re-evaluate all seven named check/collection combinations and reconfirm accepted checks on changed mixed inputs. Continue protected holdout annotation repair separately.
