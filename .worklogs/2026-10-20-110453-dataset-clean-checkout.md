# Dataset Checks In Clean Checkouts

## Summary

The first CI run passed package and dataset validation, then failed because the contract runner assumed `.fixture3/` existed. Both temporary-input runners now create their scratch parent before creating a temporary directory.

The contract runner resolves its child Jev executable from its own module path. Its CLI checks therefore execute the intended program when the test runs from another working directory.

## Verification

- Reproduced the contract failure in an empty temporary working directory: exit 1 with `ENOENT` from `mkdtemp`.
- The same fresh-directory integration completes all 24 contracts after the repair, on Node 22 and Node 24.
- Fixture3's approved contract output remains unchanged.

## Context

- `scripts/datasets-contract.mjs` exercises paired datasets and the Jev request boundary.
- `developer-helpers/scripts/verify-fresh-corpus-actionability.py` retains its original rule thresholds and known phrase false positive.
- GitHub CI run `39405137429` records the original missing-directory failure.

## Next Steps

- Verify the follow-up main CI run on both supported Node versions.
