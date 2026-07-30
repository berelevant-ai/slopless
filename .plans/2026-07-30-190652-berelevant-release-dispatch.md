# Be Relevant Release Dispatch

## Goal

After npm successfully publishes a Slopless GitHub release, notify the Be
Relevant repository of the exact published version so its validated worker
update can begin without polling or manual intervention.

## Approach

1. Extend the existing release workflow after `pnpm publish`.
2. Derive the version from the release tag that was already checked against
   `package.json`.
3. Send a `slopless-released` repository dispatch to
   `berelevant-ai/berelevant` with the version in `client_payload`.
4. Authenticate the cross-repository request with a dedicated Actions secret.
   Keep the release workflow's default permissions read-only.

## Key Decisions

- Dispatch only after npm publication succeeds. The receiving workflow can
  therefore validate and install the requested public package.
- Keep the receiving automation in the consuming repository. Slopless only
  publishes the immutable version event and does not know Railway or worker
  implementation details.
- A failed dispatch fails the release workflow after publication, making the
  missed synchronization visible. The receiver also supports manual recovery.

## Files To Modify

- `.github/workflows/release.yml`
