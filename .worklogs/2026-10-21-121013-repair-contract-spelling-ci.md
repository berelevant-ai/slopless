# Repair Contract-Test Spelling In CI

## Summary

The CI validation jobs fail because CSpell rejects three identifiers introduced by the runner contracts. Added a file-scoped vocabulary directive for those identifiers while preserving all test logic.

## Cause And Change

- GitHub run `39588027179` fails validation on Node 22 and 24 at `cspell .`. Local reproduction reports the same 15 diagnostics in `scripts/datasets-contract.mjs` for `noul`, `rescored`, and `rescores`.
- Add only `// cspell:words noul rescored rescores` to that file. This preserves spelling checks for its other words and every behavioral assertion.

## Verification

- Scoped CSpell changes from exit 1 with 15 diagnostics to exit 0 with none. Fresh independent diff review confirms the single-comment change and unchanged assertions.
- Full `pnpm run validate` exits 0, covering build, CLI version, ESLint, formatting, CSpell, and 100% type coverage.
- Fixture3's `datasets` suite exits 0 with matched approved output and all 34 contract groups retained.

## Context And Next Steps

- Preserve the unrelated term-policy worktree changes. Push this fix and verify both CI validation jobs on the committed revision.
- Continue the final authority source/overlap audit, then classifier evaluation. Whole-text batching has a separately reproduced capacity limit; its implementation remains a later runner-preparation step before text-level inference.
