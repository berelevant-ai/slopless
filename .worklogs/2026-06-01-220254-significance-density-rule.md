# Document-level significance-signposting density rule (committed, NOT released)

## Summary

The significance-hedge class needed a different mechanism than the local-window
`formal-transition-density`. Real slop disperses significance signposts across a whole
piece, it does not cluster them in 5 sentences. New rule `significance-density` counts
sentence-initial significance markers per DOCUMENT and fires on rate, not local proximity.

## What changed

- New `src/rules/syntactic-patterns/lead-ins/significance-density.ts`: document-level
  (`unitKind: "document"`). Counts sentence-initial significance markers (notably,
  importantly, crucially, significantly, interestingly, remarkably, curiously, tellingly,
  strikingly + worth-noting / important-to-note-or-remember / it-bears-mentioning phrases).
  Fires once per document when count >= 3 AND rate >= 3 per 1,000 words. A single or double
  use passes. Word count via a whitespace character scan (no regex; G3TS gate bans regex in
  prose rules).
- Reverted the significance markers out of `formal-transition-density` (back to formal
  transitions only: however/therefore/moreover/...). Those DO cluster locally; the
  significance class does not, so it does not belong in that rule.
- Registered in `registries/syntactic-patterns/lead-ins.ts` and `presets/everything.ts`.
- Fixture `cases/syntactic-patterns/significance-density.md` (a short doc with 4 signposts)
  locks the catch; golden re-approved (only cases-syntactic-patterns drifted).

## Why / evidence

Measured sentence-initial significance markers per doc and per 1,000 words:
- Technical-human (PEPs/MDN/RFCs, 600 docs, ~1,412 words median): >=3 markers 0%, rate
  >=3/1k 0%. Technical writers barely signpost.
- Synthetic marketing slop (40 docs, ~329 words median): >=3 markers 88%, rate >=3/1k 100%.
- dev.to: ~0%.

The rule then validated end-to-end via the CLI: synthetic 87.5% TP, technical-human 0% FP
(450 docs), dev.to 0% FP (300 docs). The local-window approach (committed in the prior
change) caught 0% on both dev.to and synthetic because the signposts are dispersed, not
clustered; this document-level rate rule is the correct mechanism and matches the user's
"more than once per ~1,000 words" model.

## Hype/cliché terms FP re-check (same session)

Kept hype/cliché terms screened on the human VC corpus: Paul Graham 0/193, a16z 4/250 (all
genuine hype: "10X your company", "secret sauce", the "move fast and break things" slogan,
"speaks volumes about"). User decided to keep the hype class, so these are intended catches.

## Verification

`pnpm run validate` passes (incl. the everything-preset / registry sync check). fixture3:
0 drift after re-approving cases-syntactic-patterns.

## Next steps (before release)

- Release still held by user instruction ("don't release until it's clean"); it now
  validates clean. Awaiting the go-ahead to bump the version and release.
- Optional further corpus coverage: Stack Exchange + Hacker News pre-2021 (more FP register),
  and tuning the significance threshold if the 12% missed synthetic (2-marker docs) matters.
