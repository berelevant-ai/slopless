Summary:
Changed no-fragment pair handling so duplicate clipped `No... No...` pairs are flagged instead of suppressed. Added the human-corpus `No conflict. No antagonist.` example to pinned hit coverage.

Decisions made:
- Removed the duplicate-pair guard from `fragment-stack-detector.ts`; duplicate clipped fragments are still bad prose, even when the source corpus example came from a table artifact.
- Moved `No change. No change.` and `No significant change from. No significant change from.` from no-hits to hits.
- Added `No conflict. No antagonist.` to hits because the detector already catches it and the case should be pinned explicitly.
- Kept concrete inventory guards unchanged, so checklist-style evidence such as `No phone. No legal pages or terms.` remains outside this detector.

Verification:
- `fixture3 check --suite textlint-rules-cases-syntactic-patterns` differed, then was reviewed and approved.
- `fixture3 check --feature textlint-rules` passed.
- `pnpm run validate` passed.
- Human corpus audit over 13,678 files and 20,966,300 words now reports 3 no-fragment detector hits: `No conflict. No antagonist.`, `No change. No change.`, and `No significant change from No significant change from`.

Key files for context:
- `src/rules/syntactic-patterns/repetition/private/fragment-stack-detector.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/golden/textlint-rules-cases-syntactic-patterns/approved.normalized.json`

Next steps:
- Continue the broader density and template design separately.
