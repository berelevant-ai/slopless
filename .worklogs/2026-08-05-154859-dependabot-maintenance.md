# Dependabot maintenance

<!-- textlint-disable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->

## Summary

Updated the compatible development dependency batch and pnpm setup action,
kept TypeScript on version 6, and refreshed the lockfile to remove all known
vulnerable transitive packages.

## Decisions made

- Kept TypeScript at 6.0.3 because typescript-eslint 8.65.0 rejects TypeScript
  7 and the repository targets TypeScript 6.
- Added a Dependabot major-version ignore for TypeScript so future grouped
  updates do not recreate the same invalid combination.
- Refreshed transitive versions through their parent ranges instead of adding
  pnpm overrides. This updated fast-uri, ip-address, hono, @hono/node-server,
  body-parser, js-yaml, and brace-expansion to patched versions.
- Accepted Prettier 3.9's formatting of `TextUnitKind`; no runtime code changed.
- Replaced the conflicted pnpm action PR and failed grouped dependency PR with
  one branch based on current `main`.

## Key files for context

- `.plans/2026-08-05-154051-dependabot-maintenance.md`
- `.plans/2026-08-05-154051-dependabot-maintenance.spec.json`
- `package.json`
- `pnpm-lock.yaml`
- `.github/dependabot.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`

## Verification

- `specular lint` passes.
- `specular verify` passes.
- `pnpm run validate` passes locally.
- `fixture3 doctor` and `fixture3 check --all` pass.
- Full validation passes in isolated Node 22 and Node 24 containers.
- `pnpm audit --json` reports zero vulnerabilities.

## Next steps

- Push the branch and merge its pull request after GitHub CI passes.
- Close Dependabot pull requests 82 and 101 as superseded.
- Confirm GitHub closes the dependency alerts after processing the new lockfile.

<!-- textlint-enable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->
