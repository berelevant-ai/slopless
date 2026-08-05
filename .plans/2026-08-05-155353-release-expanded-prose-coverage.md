# Release expanded prose coverage

## Goal

Publish the reviewed rule and reporting changes as `slopless@0.2.34` from a
clean `main` commit after all release checks pass.

## Approach

1. Change the package version from 0.2.33 to 0.2.34.
2. Validate the rebased source and dependency graph.
3. Run every Fixture3 suite and confirm the approved outputs still match.
4. Pack and install the package in an isolated directory, then verify its CLI
   version and the supplied security-post examples.
5. Push the feature branch, merge it after GitHub CI passes, create release tag
   `v0.2.34`, and verify npm publication.
6. Install `slopless@0.2.34` locally from npm and verify the installed CLI.

## Key Decisions

- Use a patch release because the CLI contract is unchanged and the release
  expands existing detector behavior.
- Publish only through the GitHub release workflow so npm provenance remains
  attached to the package.
- Do not modify detector behavior during release preparation.

## Files To Modify

- `package.json`
- `.plans/2026-08-05-155353-release-expanded-prose-coverage.spec.json`
- `.worklogs/<timestamp>-release-expanded-prose-coverage.md`

