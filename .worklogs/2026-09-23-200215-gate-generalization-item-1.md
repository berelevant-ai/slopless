# Gate generalization, item 1: lesson-framing grammar

## Summary

Replaced five literal lesson wrappers and a fixed-position frame with a grammar: `the [modifier]{0,2} {frame noun} [locator] {linking verb} [adverb]{0,2} [not] {thin cue}`. Measured on the full article corpus (baseline 0.2.39 vs candidate): human +4 on 21.3M words, ai-suspected +8 on 1.58M, ai-generated +3 on 185k, nothing removed.

## Decisions

- The cue may continue ("smaller than it looks", "plain after the failed import"), because the previous fix-wrapper matched by prefix and those are approved hits. A `because` or `since` clause right after the cue states the reason and vetoes the match (`The rule is boring because each clause repeats the same sentence.` is a preserved no-hit).
- Dropped `the same` as a cue after `The answer was always the same: "Almost eighteen years."` (Dickens) fired.
- Kept two human findings the reviewer may consider borderline: `The strategy was straightforward: "Buy the site, win the franchise, build the building."` and `The message was quite clear.` They share the shape of the RFC line `The message is clear - the Internet renders all parties anonymous.` which is wanted.
- New no-hit `The answer was always the same: "Almost eighteen years."` is flagged by `boilerplate-conclusion` (`the-answer-was`). That is a pre-existing false positive in another rule, recorded in the approved output, not hidden.
- The branch was first created from a stale local `main` (0.2.24). It was reset to `origin/main` at `c386ff4` before any approval; all 21 suites matched at that base.

## Verification

- Full-corpus single-rule audit: 15,580 files in 450 s per run; harness at `.fixture3/audit/audit-changed-rules.mjs` (scratchpad copy `audit-changed-rules.mjs`), rule selected with `RULES=lesson-framing`.
- 720-file stratified human sample (45 per topic, 544k words) at `scratchpad/human-sample` runs in 9 s for one rule; 0 added there.
- Fixture suite: 21 new lesson-framing findings on hit-labeled passages, 6 relabeled, 0 on no-hits; 5 hit and 4 no-hit cases added with corpus prose; all 21 suites match; validate passes.

## Next steps

Items 2 to 15 in `.plans/2026-09-23-191753-over-tightened-gates-review.md`, plus the four misses from the reviewer's real draft (`I keep coming back to` after an introductory clause, `That matters when ...` alone, `I've seen that difference shape what ...`, `The problem ... can take more work to find`), and cross-paragraph evidence-limitation pairs.
