# Disable default readability rules

<!-- textlint-disable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->

## Summary

Corrected the default preset so the CLI stops running Coleman-Liau,
Flesch-Kincaid, and Gunning Fog. Added a packed-CLI Fixture3 suite that tests
the published installation boundary instead of loading every rule directly.

## Decisions made

- Set all seven previously omitted exported rules explicitly in the preset.
  Textlint enables an exported preset rule when its configuration key is
  missing.
- Marked the three readability rules `false` and the four intended detectors
  `true`.
- Kept the readability rule exports so package consumers can opt into them.
- Preserved every existing all-rules fixture result. The new CLI fixture alone
  asserts that default readability output is empty.
- Prepared version 0.2.35 because 0.2.34 did not complete the requested default
  behavior change.

## Key files for context

- `.plans/2026-08-05-160944-disable-default-readability.md`
- `.plans/2026-08-05-160944-disable-default-readability.spec.json`
- `src/presets/everything.ts`
- `scripts/cli-replay.sh`
- `fixture3.yaml`
- `behavior/fixtures/slopless-cli/defaults/readability.md`
- `behavior/golden/slopless-cli-defaults/approved.normalized.json`

## Verification

- `pnpm run validate` passes.
- `specular lint` and `specular verify` pass.
- All 20 Fixture3 suites match, including the new packed-CLI suite.
- A packed 0.2.35 CLI reports the intended prose findings without any
  readability findings.
- The packed package still imports all three direct metric exports.

## Next steps

- Merge the corrective pull request after CI passes.
- Publish `slopless@0.2.35` and install it globally.
- Verify the globally installed CLI against the release smoke fixture.

<!-- textlint-enable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->
