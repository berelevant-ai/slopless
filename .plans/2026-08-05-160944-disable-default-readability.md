# Disable default readability rules

## Goal

Make the CLI stop reporting Coleman-Liau, Flesch-Kincaid, and Gunning Fog
while preserving their direct package exports and all intended default rules.

## Approach

1. Add explicit preset entries for every exported rule that was omitted from
   `rulesConfig`.
2. Set the three readability rules to `false`; set the four intended default
   detectors to `true`.
3. Add a packed-CLI Fixture3 suite whose input triggers the three readability
   formulas and approve an empty finding list.
4. Run every existing all-rules Fixture3 suite and require unchanged output;
   those suites intentionally continue testing the opt-in metric rules.
5. Publish the correction as `slopless@0.2.35` after CI passes.

## Key Decisions

- Use explicit `false` values because Textlint enables exported preset rules
  whose configuration entry is missing.
- Keep direct readability exports for consumers that choose those metrics.
- Make all seven previously omitted rules explicit so preset behavior no
  longer depends on Textlint's missing-key fallback.

## Files To Modify

- `src/presets/everything.ts`
- `package.json`
- `fixture3.yaml`
- `scripts/cli-replay.sh`
- `behavior/fixtures/slopless-cli/defaults/readability.md`
- `behavior/golden/slopless-cli-defaults/approved.normalized.json`
- `behavior/golden/slopless-cli-defaults/approved.meta.json`
- `.plans/2026-08-05-160944-disable-default-readability.spec.json`
- `.worklogs/<timestamp>-disable-default-readability.md`
