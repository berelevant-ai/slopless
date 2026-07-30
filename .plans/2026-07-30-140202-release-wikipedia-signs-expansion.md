# Release Wikipedia signs expansion

## Goal

Publish the reviewed Wikipedia signs expansion as `slopless@0.2.33`, verify the GitHub and npm release paths, and install the published package locally.

## Approach

1. Change `package.json` from `0.2.32` to `0.2.33`.
2. Run repository validation and Fixture3 before merging.
3. Open and merge a pull request from `codex/wiki-signs-expansion` into `main`.
4. Create GitHub release `v0.2.33`, which triggers the npm provenance workflow.
5. Verify CI, the release workflow, npm metadata, and the installed CLI version.

## Key decisions

- Use a patch release because this adds rules and changes one public rule ID within the existing `0.x` package line.
- Publish through the existing GitHub release workflow instead of running `npm publish` locally.
- Do not modify rule behavior during the release step.

## Files to modify

- `package.json`
- `.plans/2026-07-30-140202-release-wikipedia-signs-expansion.spec.json`
- `.plans/2026-07-30-140202-release-wikipedia-signs-expansion.spec.coverage.md`
- `.worklogs/2026-07-30-140202-release-wikipedia-signs-expansion.md`
