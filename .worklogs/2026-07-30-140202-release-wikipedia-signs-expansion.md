# Release Wikipedia signs expansion

<!-- textlint-disable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->

## Summary

Prepared the reviewed Wikipedia signs expansion for publication as `slopless@0.2.33`.

## Decisions made

- Selected a patch release because the changes extend the existing rule package without changing the CLI contract.
- Kept publication in the GitHub release workflow so npm receives provenance metadata.
- Made no detector changes during release preparation.

## Key files for context

- `.plans/2026-07-30-140202-release-wikipedia-signs-expansion.md`
- `.plans/2026-07-30-140202-release-wikipedia-signs-expansion.spec.json`
- `package.json`
- `.github/workflows/release.yml`

## Next steps

- Merge the feature pull request after CI passes.
- Create GitHub release `v0.2.33`.
- Verify npm publication and reinstall the published CLI locally.

<!-- textlint-enable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->
