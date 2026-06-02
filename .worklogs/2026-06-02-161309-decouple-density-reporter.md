# Decouple density + severity judgment from rules into the reporter

## Summary

Moved all density and severity judgment out of the actually-overuse rule and into the
reporting layer. The rule now only detects occurrences; the reporter applies a reusable
density-calculation module and decides none / warning / error. Output-preserving: every
golden suite is unchanged.

## Why

The first version of actually-overuse computed the per-1,000-word rate and chose the
severity inside its `detect`. That put judgment in the detector, unlike every other
density rule (perception-verb-density's `detect` just tags verbs; the density policy
judges). This refactor brings actually-overuse in line with that separation.

## Layers

- Detection (rule): `src/rules/words/actually-overuse.ts` emits one detection per
  "actually" token - no count, no rate, no severity.
- Density module: `src/reporting/density.ts` - `rateVerdict(occurrences, words,
  thresholds)` returns `{ perUnit, severity }` or undefined. Pure; no rule or textlint
  knowledge. Exports `WARNING_SEVERITY` / `ERROR_SEVERITY`.
- Reporter: `src/reporting/reports.ts` - new `density-rate` policy handled by
  `densityRateReports`, which counts a unit's detections, gets its word count, calls the
  density module, and produces a report carrying `severity` and a `metric` ({count,
  perUnit}) for the message.
- Emit: `src/adapters/textlint/report.ts` now reads `report.severity` (set by the
  reporter) instead of `detection.data.severity`. Plain-object report path unchanged.

## Policy

`reportPolicy: { kind: "density-rate", scope: "document", wordsPerUnit, warningPerUnit,
errorPerUnit, minimumOccurrences }` - declarative thresholds the reporter consumes, same
convention as the existing window `density` policy (which declares windowSentences etc.).
The detector stays free of these.

## Verification

- Tiers unchanged: 1/1,000 clean; single use clean; 2/1,000 warning (sev 1); 3/1,000
  error (sev 2).
- All 19 fixture suites match (the cases-words/actually-overuse.md golden is byte-identical
  - the refactor changed structure, not output).
- `pnpm run validate` passes (build, preset-sync, eslint, prettier, cspell, type-coverage 100).

## Notes

- The window `density` reporting math still lives inline in reports.ts. It could move into
  density.ts for full symmetry, but it is a working, tested unit; left as-is to avoid an
  unrelated refactor.
- `RuleReport` gained optional `severity` and `metric`, set only by the reporter.

## Key files

- src/reporting/density.ts, src/reporting/reports.ts (densityRateReports),
  src/reporting/types.ts, src/adapters/textlint/report.ts, src/rules/words/actually-overuse.ts.
