# Security hardening: SHA-pin actions, ci permissions, dependabot cooldown

## Summary

OpenSSF Scorecard quick wins + the proper resolution of the Dependabot GitHub-Actions PRs.

## Changes

- ci.yml: added top-level `permissions: contents: read` (Token-Permissions 0 -> ~9; the
  repo default was already read, so this is purely declarative, zero risk).
- SHA-pinned every GitHub Action across ci.yml + scorecard.yml to a full commit SHA with a
  `# version` comment (Pinned-Dependencies 0 -> ~9): checkout v6, setup-node v6,
  pnpm/action-setup v6, rust-toolchain stable (+ explicit `toolchain: stable` since the SHA
  ref no longer infers the channel), rust-cache v2, ossf/scorecard-action v2.4.0,
  upload-artifact v7, codeql-action/upload-sarif v4.
- This incorporates the targets of Dependabot #54 (codeql 3->4), #55 (action-setup 4->6),
  #57 (upload-artifact 4->7) and supersedes the stale #56/#58 (checkout/setup-node already
  v6 on ci.yml). Those PRs will be closed as superseded.
- dependabot.yml: added `cooldown: default-days: 2` to the npm updater so bumps clear
  pnpm 11's 24h minimumReleaseAge gate before a PR opens (this is what broke #60's
  `pnpm install --frozen-lockfile`).

## Not done (reported for decision)

- Require >=1 approving review on main: the single biggest OpenSSF detractor (Code-Review
  0), but a real workflow change for a solo maintainer. Left to the maintainer.
- qs -> 6.15.2 pnpm override: clears the one transitive Socket/GHSA advisory, but it is a
  band-aid on a transitive dep and risks the same minimumReleaseAge gate locally. Left out;
  Socket 79 is driven by this one non-default-path medium advisory + new-package noise.
- Finishing the OpenSSF Best Practices (CII) badge: form-filling, no code.

## Verify

- Workflow + dependabot YAML prettier-clean.
- PR CI must confirm the SHA pins + rust-toolchain change still build/validate.
