# Archive Reviewed Label Correction Pools

## Summary

Archive the complete corrected development pools before selecting balanced evaluation data. Collection `000117` contains 247 reviewed passages; `000123` contains 240.

## Decisions

- Apply the eleven sealed label corrections without changing any original passage. Retain all corrected passages as mandatory reviewed cases in the selector.
- Add four new perception-hit passages. Three blind reviewers agree on all 36 named-check judgments; all exact snippets validate.
- Omit the composite collection's model field because the four Codex subagent additions expose no model identifier. Preserve the original generator attribution in the prior archive and record the new authorship separately.
- Preserve the previous temporary pools and selections before replacement. Reuse the established archive, deterministic ranking and balanced packing process; detector predictions never enter selection.

## Verification

- Source preflight finds at least 25 passages in all eight combinations after correction and replenishment. The four additions restore combination `010` to 25.
- Incremental copy screening compares the four additions with 328,159 references across 15,773 dataset documents and 39 legacy files: zero candidates and zero exact matches.
- Public dataset readers validate both complete pool pairs. These archive snapshots precede balanced selection; their counts are intentionally larger than the final evaluation sets.

## Key Files

- The two affected dataset pairs preserve all reviewed source passages and labels in this commit.
- The existing data-review record stores the correction receipt, exact independent read scopes, copy-screen proof and prior selection metadata.

## Next Steps

- Run the deterministic selector against this archive commit, then pack 200 passages per collection and verify 25 per combination. Re-evaluate all six check/collection combinations and reconfirm four accepted neighbors before restoring their confirmed statuses.
- Keep the full nineteen-check goal active; four checks still need prompt work. Holdout inference and production code remain unchanged.
