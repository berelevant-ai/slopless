# Summary

Added `words:quietly-filler`, a one-to-one severity-1 rule for contextual
`quietly` filler, while leaving `words:quietly-overuse` unchanged. The rule
classifies six contextual uses, reports the exact token, and excludes normal
manner, private, measured, technical, title, heading, image, and code uses.

# Decisions Made

- Kept contextual use and repetition as separate rules because one occurrence
  can be bad without being overused.
- Added severity to the shared one-to-one reporting policy instead of bypassing
  the reporting layer.
- Classified each occurrence from its own clause. Sentence-wide evidence is
  used only for a linked explanation or a first-person build claim.
- Split rule paragraph traversal from document readability traversal. List
  prose now reaches sentence and paragraph rules without changing prior
  document metrics.
- Masked inline code and image text with same-length spaces. Prose rules skip
  them while later source ranges remain unchanged.
- Retained the existing private, physical, title, measured-change, and
  explicitly explained technical boundaries.

# Verification

- Specular lint and verify passed.
- Fixture3 doctor passed.
- All changed Fixture3 diffs were reviewed before approval.
- All 19 Fixture3 suites match their approved output.
- `pnpm run validate` passed, including build, CLI version, ESLint,
  Prettier, CSpell, and 100% type coverage.
- The final 293-file corpus replay covered 335 reviewed prose occurrences:
  91 AI warnings, 36 AI no-hits, 8 human warnings, and 200 human no-hits.
- Public textlint output contained 99 contextual warnings. All 99 matched the
  audit by source file, line, and class, with no missing or extra warnings.
- Clause-local adversarial probes report only the bad occurrence in a mixed
  sentence.
- Measured changes before and after `quietly`, inline code, image text, and
  detailed technical explanations remain silent.
- Existing one-to-one rules retain severity 2.

# Key Files For Context

- `src/rules/words/quietly-filler.ts`
- `src/rules/words/private/quietly-context.ts`
- `src/rules/words/private/quietly-clause.ts`
- `src/rules/words/private/quietly-evidence.ts`
- `src/rules/words/data/quietly-context.json`
- `src/shared/text/sections.ts`
- `src/shared/text/traverse.ts`
- `behavior/analysis/quietly-ai-reviewed.json`
- `behavior/analysis/quietly-human-reviewed.json`
- `.plans/2026-07-24-212048-contextual-quietly-warnings.md`

# Next Steps

- Commit and push the feature branch.
- Merge after CI passes, publish `0.2.29`, and install the published package
  globally.
