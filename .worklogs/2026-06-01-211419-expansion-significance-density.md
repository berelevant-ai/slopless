# Phrase-class expansion + significance-hedge density refactor (committed, NOT released)

## Summary

Second expansion pass on slopless prose rules. Widened the openers / hype / inflated-verb
classes, cut the false positives a new technical corpus exposed, and consolidated the
significance-hedge class into a single density-based rule. Committed incrementally; the
release is held until the hype-term true positives are confirmed against the VC/synthetic
corpora.

## What changed (tracked)

- `corporate-speak.json`: +17 hype terms (secret sauce, force multiplier, boil the ocean,
  best-of-breed, go-to-market motion, bleeding-edge, drive value, deliver impact, move fast
  and break things, 10x your, data-driven insights, actionable insights, empower your team,
  ecosystem of partners, innovate at the speed of, reimagine the future of, built for the
  enterprise). Dropped 7 precise technical terms that were FPs (single source of truth,
  end-to-end solution, real-time insights, scalable solution, digital transformation,
  disruptive innovation, time to value).
- `cliches.json`: +23 inflated-verb clichés (serves as a reminder/testament to, paves the
  way for, ushers in a new era, speaks volumes about, reflects a broader, stands as a beacon
  of, represents a paradigm shift, embodies the spirit of, cements its place as, leaves an
  indelible mark, heralds a new era, signals a seismic shift, drives home the point, brings
  to the fore, takes center stage, reshapes the landscape, charts a new course, shines a
  spotlight on, amplifies the need for, redefines the boundaries of, paints a vivid picture
  of, holds the key to). Dropped underscores the importance of, lays the foundation for,
  highlights the need for (legit in technical/academic prose).
- `boilerplate-framing.ts`: +15 honesty/throat-clearing openers (truth be told, if I'm being
  honest, let me level with you, no sugarcoating, here's the deal, the fact of the matter is,
  ...). Removed the significance hedges (worth noting / it bears mentioning) - moved to density.
- `formal-transition-density.ts`: added the significance class (importantly, interestingly,
  significantly, remarkably, curiously, tellingly, strikingly + worth-noting / important-to-
  note-or-remember / it-bears-mentioning phrases). These are now DENSITY-only: a single use
  passes, a cluster of >=3 signposts in a short span fires.
- `generic-signposting.ts`: removed IMPORTANT_TO_PATTERNS (moved to density).
- `response-wrapper-patterns.json`: emptied `paragraphStartsWith` (the 4 significance hedges
  moved to density).
- Fixtures: added hits for the kept hype/cliché/opener patterns; removed the cut ones.
  Goldens re-approved for the 4 drifted suites (drift verified: only the intended rules).

## Why / key decisions

- A new technical-human corpus (PEPs/MDN/RFCs, see below) exposed that the original corpus
  (Wikipedia/Gutenberg/gov) has no software/VC register, so eng terms like "single source of
  truth" scored a false 0-FP. Those terms are precise and correct in technical writing -> cut.
- Significance hedges ("it's worth noting that", "it's important to note") are FPs on single
  use (technical writers hedge constantly) but slop when stacked. User's model: make them
  density-based. The architecturally-correct home was the existing `formal-transition-density`
  (already a density signpost-cluster rule containing notably/crucially), not a new rule.
  Removed the scattered per-instance flags. Verified 0 added FP on 1,914 technical docs.
- `paves the way for` and `bleeding-edge` kept as signals per explicit user decision despite
  low-rate technical FPs.

## Corpora (gitignored under article/corpus/, destined for a private repo)

Each source dir has a `LICENSE.md`; master index `article/corpus/LICENSES.md` tracks
publishability. Built: tech-human/{peps 538, mdn 883, rfcs 493}, ai-slop/devto 1500.
In flight: tech-vc/{paulgraham, a16z}, ai-slop/synthetic. Build/screen scripts in
article/experiments/{validate_candidates,validate_tech_corpus,measure_signposting}.mjs.

## Next steps (before release)

1. When tech-vc + synthetic land: re-run the FP screen (hype terms on VC prose) and confirm
   hype/signpost true positives on the synthetic set. dev.to was too code-heavy to show them.
2. Add regression fixtures: a single-use significance hedge in cases/syntactic-patterns/
   no-hits.md (locks the FP-pass) and a cluster in hits.md (locks the density catch).
3. Full `pnpm run validate`, then release (version bump + gh release) only when clean.
