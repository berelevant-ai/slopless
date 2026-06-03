# Pin release.yml actions to SHA-pinned v6

## Summary
`release.yml` still used unpinned `@v4` actions (actions/checkout, pnpm/action-setup,
actions/setup-node) running on Node 20, which GitHub deprecated (forced to Node 24 on 2026-06-16) and
which the security-hardening pass had pinned everywhere else. Bumped all three to the same SHA-pinned
v6 refs `ci.yml` uses. `ci.yml` and `scorecard.yml` were already fully pinned; this was the last gap.

## Why these SHAs
Reused ci.yml's exact pins so versions match across workflows:
- actions/checkout@de0fac2... (v6)
- pnpm/action-setup@0e279bb... (v6)
- actions/setup-node@48b55a0... (v6)

## Note
Shipped on a throwaway branch (not `development`) so the release-PR auto-delete-head-branch setting
doesn't delete the working trunk again.

## Key files
- `.github/workflows/release.yml`
