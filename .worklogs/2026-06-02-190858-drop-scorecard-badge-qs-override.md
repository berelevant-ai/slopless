# Drop scorecard badge; qs override; @types/node ignore

## Summary

Post-review config follow-ups from the badge/score pass.

## Changes

- README: removed the OpenSSF Scorecard badge. Its headline (5.2) is dragged down mostly by
  Code-Review 0/10, which requires a second reviewer on main - deferred while solo. Socket
  badge stays.
- .plans/2026-05-23-152521-promotion-master.md: recorded the deferred multi-dev items
  (require >=1 review on main; re-add the scorecard badge once review enforcement is on and
  the score reflects the #69 hardening).
- pnpm-workspace.yaml: added an `overrides` entry forcing the patched `qs` 6.15.2 across the
  transitive tree (textlint -> MCP SDK -> express -> body-parser -> qs), clearing CVE-2026-8723.
  Note: pnpm 11 no longer reads `overrides` from package.json's `pnpm` field - it must live in
  pnpm-workspace.yaml. Verified the lockfile resolves qs to 6.15.2 only and
  `pnpm install --frozen-lockfile` passes (qs 6.15.2 is ~17 days old, clear of pnpm's 24h gate).
- .github/dependabot.yml: ignore `@types/node` semver-major so it stays aligned with the
  Node-22 baseline (engines: node >=22), not jumped ahead of the runtime it types.

## Verify

- `pnpm run validate` passes (build, lint, prettier, cspell, type-coverage 100).
- `pnpm install --frozen-lockfile` clean; qs resolves to 6.15.2 across the tree.
