# Summary

Completed the contextual `quietly` change-verb vocabulary after the installed
package smoke test exposed missing `shift` and `shifting` forms.

# Decisions Made

- Fixed the configured lexeme rather than changing clause splitting. `while`
  was already a clause boundary.
- Added a mixed-use fixture in which the change use warns and the speech use
  remains silent.

# Key Files For Context

- `src/rules/words/data/quietly-context.json`
- `behavior/fixtures/textlint-rules/cases/words/hits.md`
- `.plans/2026-07-24-212048-contextual-quietly-warnings.md`

# Next Steps

- Publish `0.2.30`, install it globally, and rerun package smoke checks.

# Verification

- The words fixture adds one `abstract-change` warning and leaves the normal
  speech occurrence in the same sentence silent.
- Existing semantic-thinness and engineering fixtures gained the same intended
  warning for `The market is quietly shifting.`
- All 19 Fixture3 suites match approved output.
- `pnpm run validate`, `specular lint`, and `specular verify` pass.
- Direct matcher probes warn on `quietly shifting`, warn only on the first
  occurrence in a mixed sentence, and remain silent on closing a door quietly.
