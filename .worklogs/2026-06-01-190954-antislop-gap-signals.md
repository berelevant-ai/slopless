# Antislop-gap signals: honesty/throat-clearing openers + hype clichés (release 0.2.18)

## Summary

From a comparison with github.com/grahamrowe82/antislop (a small same-philosophy Python checker), most of
its patterns were already covered by slopless. The genuine gaps got added here, and one proposed addition
(en-dash) was dropped after reviewing real signals.

## Decisions

- `boilerplate-framing`: added sentence-initial filler openers (to be clear, to be honest, let me be clear,
  let me be honest, in all honesty, here's the thing, here's the kicker, honestly, frankly, candidly).
  Reused this rule rather than adding new ones, because its "Start with the specific point" message fits
  honesty-advertising and throat-clearing exactly, and anchoring to the start of each sentence keeps false
  positives low ("she spoke frankly" does not match; "Frankly, ..." does).
- `corporate-speak`: added hype/business terms (table stakes, next-level, supercharge, world-class,
  best-in-class, north star). Removed the redundant "best-in-class solution" entry, which bare "best-in-class"
  now subsumes (was double-flagging).
- `cliches`: added "stands as a testament to".
- `em-dashes`: extended to the en dash, then REVERTED. (See review.) Still flags only the closed em dash.

## Review (run on real text, judged by hand, not zero-chasing)

- Human corpus (426 docs: Wikipedia, Gutenberg, gov-health, AI inputs): the phrase additions fired 0. Wrong
  register; no false positives but no evidence either.
- Full fixture set + fresh-slop corpus (60 files): true positives appeared. "To be clear, this is not just a
  launch, but a movement" (boilerplate-framing); "best-in-class experience", "revert back to its original
  north star", "The North Star is a cohesive experience that delights users" (corporate-speak). Genuine
  marketing/motivational slop.
- en-dash: 0 true positives across both sets; its only hits were false positives (a Wikipedia line defining
  the en-dash symbol, and the legitimate compound "New York-London"). Dropped it; the em dash remains the
  high-precision dash signal.

## Verification

- build, eslint, prettier, cspell, type-coverage 100% all pass. (Note: dash/apostrophe constants use
  String.fromCharCode to keep the source ASCII; the rule code may not use regex per the repo's lint gate.)
- Added fixture cases for the new patterns (cases/phrases/hits.md, cases/syntactic-patterns/hits.md).
- fixture3 check --all: after approving 5 drifted suites, 0 drift. All drift was additions of
  corporate-speak / cliches / boilerplate-framing only; em-dashes unchanged.

## Next

- Remaining audit residuals (still parked): negation-reframe pair path + block-overcapture bug, narrative
  rules firing on non-narrative text, fragment-stacking on reference lists, softening/hedge-stacking,
  prohibited-words list trim. The honesty/throat-clearing openers currently fire only at sentence start; a
  broader mid-sentence variant could be added if wanted.
