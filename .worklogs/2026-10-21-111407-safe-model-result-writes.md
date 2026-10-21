# Safe Model Result Writes

## Summary

Repaired reproduced result-write risks before classifier inference. The shared atomic writer preserves inputs behind stale conventional temporary symlinks; the temporary family driver rejects unsafe output locations before reading targets or initializing provider access.

## Decisions

- Export `writeAtomicJson` from the existing Jev runner and reuse it in both save paths. Use a private temporary directory, exclusive file creation, atomic replacement, and cleanup without adding dependencies or changing result schemas.
- Require the temporary driver's output to be a regular JSON file under canonical `runners/results/`, with real directory ancestors. Reject protected folders, sibling prefixes, symlink escapes, and directory destinations early.
- Preserve request wording, hashes, default modes, legacy scores, and completed-cache bytes. Keep the Opus review helper and definition extractor frozen.

## Verification

- A synthetic public-CLI reproduction overwrote its input before repair. Repeating it after repair preserves the exact input hash and completes successfully.
- Parent and fresh independent review run all 83 private driver probes successfully. Public contracts pass all 34 groups; the original 32 groups are unchanged and two additive groups cover atomic-write preservation and failure cleanup.
- Reviewed and approved only the Fixture3 dataset-suite additions. Existing term-policy goldens remain outside this change.
- The worker verifies Specular's expected initial failure, final lint/verify, build, scoped lint, formatting, syntax, cleanup, and compatibility. Fresh review independently confirms the source delta and original request/hash behavior.
- Parent inspection and runtime verification confirm the shared writer, early path guard, and immutable-cache behavior. All tests use synthetic inputs and local provider substitutes.

## Key Files

- `runners/jev.mjs`: shared writer and public save path.
- `scripts/datasets-contract.mjs`: two integration-contract groups.
- `.plans/2026-10-21-000340-bounded-runner.spec.json` and coverage map: narrow safety requirements.
- `/tmp/slopless-family-development.mjs`: validated temporary driver, SHA-256 `772f167a1f952504e44827c129653927bae98d99a6a89960ae70c06d616ec03a`.

## Next Steps

Finish authority data QA and balanced selection, then tune using this verified driver. Continue through staged contrasts and boilerplate/signposting under the active plan.
