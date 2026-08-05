# Dependabot Maintenance

## Goal

Leave the repository with no stale Dependabot pull requests, no known vulnerable
packages in the lockfile, and a dependency set that validates on Node 22 and 24.

## Approach

1. Update the direct development dependencies proposed by Dependabot, except
   TypeScript 7. Keep TypeScript on 6.0.3 because typescript-eslint 8.65.0
   supports TypeScript versions below 6.1.
2. Update pnpm/action-setup from 6.0.8 to 6.0.9 in CI and release workflows.
3. Refresh transitive resolutions so packages already allowed by parent ranges
   resolve to patched fast-uri, ip-address, hono, @hono/node-server,
   body-parser, js-yaml, and brace-expansion releases.
4. Configure Dependabot to ignore TypeScript major updates until the lint stack
   supports TypeScript 7.
5. Run the repository validation, audit the installed dependency graph, and run
   the validation under Node 22 and Node 24.
6. Push a replacement pull request, merge it after CI passes, then close the
   superseded Dependabot pull requests.

## Key Decisions

- Do not add pnpm overrides. Every patched transitive version fits an existing
  parent range, so a normal lockfile refresh preserves package ownership.
- Do not accept TypeScript 7. The current typescript-eslint release rejects it,
  and the repository policy is to use TypeScript 6.
- Keep @types/node on major version 22 to match the minimum supported runtime.

## Files To Modify

- `package.json`
- `pnpm-lock.yaml`
- `.github/dependabot.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`

