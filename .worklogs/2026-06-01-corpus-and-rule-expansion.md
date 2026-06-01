# Corpus + rule/family expansion (overnight, NOT released)

Branch `corpus-and-rules-expansion`. Big overnight build per /goal. Commit incrementally; do
NOT release.

## Corpus (gitignored, ~23M words, for private repo)

Built a multi-topic human (FP) + AI (TP) corpus. New tree `article/corpus/{human,ai-generated,
ai-suspected}/<topic>/<source>/`, plus legacy dirs (wikipedia/gutenberg/gov-health/tech-human/
tech-vc/ai-slop) pending migration (Task 40). Per-source LICENSE.md + master LICENSES.md.

Human (FP oracle): Stack Exchange 10 topic-sites x200 (legal/medical/food/finance/fitness/
travel/parenting/science/motivational/education, CC BY-SA); arXiv 300 + PubMed 300 (science/
medical); CourtListener 250 (legal, PD); Wikinews 300 (CC BY) + HN 250 (2010-2020); Gutenberg
self-help/cookbooks (collecting). Plus legacy wikipedia/gutenberg/gov-health/PEPs/MDN/RFCs/PG/a16z.
AI (TP): ai-generated/<topic>/claude 360 (Haiku/Sonnet, 15 topics x24); ai-slop devto 1500 +
synthetic 40. (codex generation abandoned - concurrent `codex exec` deadlocks on a session lock.)

## Rule research -> brainstorm -> screen -> curate (Tasks 41-44)

4 web-research agents catalogued ~1370 slop patterns -> 9 brainstorm agents produced 700
candidates -> screened with the real matcher over the full corpus (human=FP, AI=TP) via
`article/experiments/screen_candidates.mjs` -> curated with `curate.mjs`/`assemble.mjs`.
Guideline applied: keep clearly-sloppy phrases even with a little human use; DROP heavy-legit-use
/ precise terms / common connectives. Dropped e.g. bandwidth, in other words, as such, of course,
be present, best practices, state-of-the-art, value proposition, paradigm shift, when it comes to,
the future of, and citation phrases (studies have shown) that are legit when actually cited.

## Implemented (Task 45)

Existing families expanded:
- corporate-speak.json: +50 (-> 114)
- cliches.json: +59 (-> 852) [excluded ~19 narrative/body cliches that would FP on memoir/fiction]
- boilerplate-framing FILLER_OPENERS: +24 sentence-initial openers (at its core, let's be honest,
  make no mistake, picture this, in a world where, ...)

New families (phrases family; rule = findUnquotedPhraseMatches over a data list):
- seo-filler (48): "in today's digital age", "the ultimate guide to", "let's delve into", ...
- self-help-cliches (71): "trust the process", "unlock your potential", "you can't pour from an
  empty cup", ...
- genre-cliches (64): "hidden gem", "melt-in-your-mouth", "breathtaking views", "look no further", ...
- weasel-attribution (49): "most experts agree", "a growing body of evidence suggests",
  "the scientific community agrees", ... (highest FP-risk family - vague attribution can be legit
  journalism; kept only the screened low-FP set.)

Each new family: data JSON + rule .ts + registered in registries/phrases.ts + everything preset.
Smoke-tested: all 4 fire; FP screen showed kept phrases at <=3 hits across 8476 human docs/11M words.

Deferred: narrative-cliches expansion (the 47 narrative/body phrases need token-template authoring
with slots + fiction-context FP validation my corpus is too light on; the narrative-slop family
already gates these). llm-vocabulary single-word density additions (need rate-based screen).

## Verify + commit

build OK; cspell clean on new files. fixture3 re-approve broad drift (new rules fire across the
slop-heavy fixtures + corpus). `pnpm run validate` (incl everything-preset == registry check).
Commit. DO NOT release.

## Next (this session)
- Task 40: migrate legacy corpora into human/ai-* tree + finalize LICENSES.md.
- Task 47: final report (families, rules, FP/TP stats, corpus file tree).
