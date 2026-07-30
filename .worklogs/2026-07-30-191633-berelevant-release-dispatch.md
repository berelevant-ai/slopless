# Be Relevant Release Dispatch

## Summary

Extended the npm release workflow to notify the Be Relevant repository of each
successfully published Slopless version.

## Decisions Made

- Dispatch occurs after npm publication, so the receiver can verify and install
  the public package.
- The payload contains only the immutable package version.
- Cross-repository authentication uses the dedicated
  `BERELEVANT_RELEASE_DISPATCH_TOKEN` Actions secret. The release job otherwise
  retains read-only repository permissions.

## Key Files For Context

- `.github/workflows/release.yml`
- `.plans/2026-07-30-190652-berelevant-release-dispatch.md`

## Next Steps

- Store the cross-repository token as the named secret.
- Verify the next published release dispatches and completes the receiving
  workflow.
