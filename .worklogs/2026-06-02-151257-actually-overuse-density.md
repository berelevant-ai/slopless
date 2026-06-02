# actually-overuse: density rule + per-report severity

## Summary

Replaced the removed flat `actually` ban with a document-scoped, rate-based rule that
targets AI overuse instead of the word itself, and added the framework's first
warning-severity path so the rule can warn vs error per the requested thresholds.

## Why

The flat `prohibited-words` entry for `actually` fired ~522 times on human prose and ~628
on AI - almost all valid emphatic/contrastive use ("see what people actually use versus
what they say"). A single use is fine; AI overuse shows up as density. So the signal is
rate, not presence.

## Rule: words:actually-overuse

- Document-scoped. Counts `actually` tokens and total words.
- Never fires on a single use (`MIN_OCCURRENCES = 2`).
- Warning (severity 1) above 1 per 1,000 words.
- Error (severity 2) above 2 per 1,000 words.
- Message states the count, the per-1,000 rate, and the threshold crossed.
- Constants (`WARNING_PER_UNIT`, `ERROR_PER_UNIT`, `MIN_OCCURRENCES`) are named for tuning.

## Per-report severity (framework addition)

slopless emitted everything at error severity. The textlint kernel only honors a
per-report severity when you report a plain object (not a `RuleError` instance):
`ruleReportedObject.severity || error`. `emitTextlintReport` now reads
`detection.data.severity` and, when present, reports `{ message, padding, severity }`;
otherwise it keeps the `RuleError` (default error). Backward compatible - every existing
rule is unchanged.

This is the first warning-severity rule in slopless. Note for the product contract:
warning-level findings still appear in the JSON output with `severity: 1`. Confirm how the
CLI exit code should treat warning-only results (today exit 1 means findings).

## Verification

- Manual: 1/1,000 -> clean; single use in a short doc -> clean; 2/1,000 -> warning (sev 1);
  3/1,000 -> error (sev 2). Severity field emitted correctly in JSON.
- Fixture: behavior/fixtures/textlint-rules/cases/words/actually-overuse.md locks the
  error tier (sev 2) + wiring; cases-words golden re-approved. All 19 suites match.
- `pnpm run validate` passes (build, preset-sync, eslint, prettier, cspell, type-coverage 100).

## Gaps / follow-ups

- No golden doc for the warning tier: it would need a ~1,000-word filler document to land a
  rate in (1, 2]. Verified manually instead. Can add a dedicated doc if full lock is wanted.
- AI/human density measurement (how much real overuse this recovers, and residual human FP)
  runs after this commit; numbers to follow.

## Key files

- src/rules/words/actually-overuse.ts - the rule.
- src/adapters/textlint/report.ts - per-report severity path.
- src/presets/everything.ts + src/registries/words.ts - registration (kept in sync).
