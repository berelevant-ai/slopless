# Release expanded prose coverage

<!-- textlint-disable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->

## Summary

Prepared the reviewed elliptical action, solution-boring, evaluative signpost,
repeated internal frame, and `actually` density changes for publication as
`slopless@0.2.34`. The default preset also stops running the three readability
score rules.

## Decisions made

- Used a patch release because the CLI contract remains unchanged.
- Rebased all detector changes onto the merged dependency maintenance commit
  before release verification.
- Kept npm publication in the GitHub release workflow so the package includes
  provenance.
- Made no detector changes during release preparation.

## Key files for context

- `.plans/2026-08-05-155353-release-expanded-prose-coverage.md`
- `.plans/2026-08-05-155353-release-expanded-prose-coverage.spec.json`
- `behavior/analysis/2026-08-05-elliptical-action-stacks.md`
- `behavior/analysis/2026-08-05-expanded-boring-frame.md`
- `behavior/analysis/2026-08-05-security-post-coverage.md`
- `package.json`

## Verification

- `pnpm run validate` passes.
- `specular lint` and `specular verify` pass.
- `fixture3 doctor` and `fixture3 check --all` pass.
- `pnpm audit` reports zero vulnerabilities.
- The packed npm artifact reports version 0.2.34 and runs the changed fixture
  families through its installed CLI.

## Next steps

- Push the rebased branch and merge its pull request after CI passes.
- Create GitHub release `v0.2.34` and verify npm publication.
- Install the published package locally and verify the installed CLI version.

<!-- textlint-enable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->
