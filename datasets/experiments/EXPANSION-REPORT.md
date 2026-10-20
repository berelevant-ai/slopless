# Overnight corpus + rule expansion - report

Branch `corpus-and-rules-expansion`, commit `d106a28`. **Committed, NOT released.**

## 1. Corpus expansion

Built a multi-topic, provenance-separated, licensed corpus (gitignored; for a private repo).
Net new content is ~1.2M+ words across 11+ new topics (the 300k target is far exceeded).

Tree (`article/corpus/`, doc counts):
```
human/   (false-positive oracle, ~21.6M words / 13,680 docs)
  reference/wikipedia 4000     literary/gutenberg 2260      gov/gov-health 1087
  tech/{peps 538, mdn 883, rfcs 493, hackernews 250}
  business/{paulgraham 193, a16z 250}
  legal/{courtlistener 250, stackexchange 200}
  science/{arxiv 300, stackexchange 200}     medical/{pubmed 300, stackexchange 200}
  news/wikinews 300     motivational/{gutenberg 290, stackexchange 200}
  food/{gutenberg 286, stackexchange 200}
  finance/ fitness/ travel/ parenting/ education/  stackexchange 200 each
ai-generated/  (we own; ~187k words / 400 docs)
  <15 topics>/claude 24 each (360)     business/synthetic-claude 40
ai-suspected/  (likely-AI, unverified; ~1.6M words / 1500 docs)
  tech/devto 1500
```
Every source dir has a `LICENSE.md`; master index + publishability in `article/corpus/LICENSES.md`.
Publishable (CC/PD): Wikipedia, Gutenberg x3, gov-health, Stack Exchange x10, CourtListener,
Wikinews, PEPs/MDN/RFCs, AI-generated (labeled synthetic). Internal-only (copyright): Paul
Graham, a16z, arXiv/PubMed, dev.to.

Sources newly collected this run: Stack Exchange 10 topic-sites (2000), arXiv (300), PubMed
(300), CourtListener (250), Wikinews (300), Hacker News pre-2021 (250), Gutenberg self-help
(290) + cookbooks (286); AI-generated Claude across 15 topics (360). (codex generation
abandoned: concurrent `codex exec` deadlocks on a session lock.)

## 2. Method

Research (4 agents, ~1370 patterns catalogued) -> brainstorm (9 agents, 700 candidates) ->
screen with the REAL matcher over the whole corpus (human = FP, AI = TP) -> curate by the
guideline: keep clearly-sloppy phrases even with light human use; drop heavy-legit-use /
precise terms / common connectives. Scripts in `article/experiments/`.

## 3. Implemented (commit d106a28)

4 NEW families (phrases family; phrase-list rules over a data JSON):
- **seo-filler** (48): "in today's digital age", "the ultimate guide to", "let's delve into".
- **self-help-cliches** (71): "trust the process", "unlock your potential", "you can't pour from an empty cup".
- **genre-cliches** (64): "hidden gem", "melt-in-your-mouth", "breathtaking views", "look no further".
- **weasel-attribution** (49): "most experts agree", "a growing body of evidence suggests".

Expanded EXISTING families:
- corporate-speak +49 (-> 113), cliches +59 (-> 852), boilerplate-framing openers +24.

Registry split into `registries/phrases/{builtin,families}.ts` to respect the 10-import limit;
added to the everything preset; 6 fixture goldens re-approved.

## 4. False-positive / true-positive stats (screen vs full corpus)

Human FP oracle: 8,476 docs / 11M words. AI TP: 1,900 docs. Per-phrase human-FP ceiling = 3
(<=0.035% of docs); aggregate per family:

| Family | kept | AI-hits (TP) | human-FP | notes |
|---|---|---|---|---|
| corporate-speak (added) | 49 | 254 | 20 | strongest TP; circle back, key takeaways(dropped), 30,000-foot view |
| seo-filler | 48 | 95 | 20 | strong TP |
| openers (added) | 24 | 58 | <=2/phrase | sentence-initial, distinctive |
| cliches (added) | 59 | 40 | 21 | excl. 19 narrative/body cliches |
| self-help-cliches | 71 | 34 | 12 | |
| genre-cliches | 64 | 12 | 10 | travel/recipe/review |
| weasel-attribution | 49 | 2 | 16 | LOW TP in this AI set + highest FP-risk family (vague attribution can be legit journalism); kept the screened low-FP set only - watch this one |

Dropped as false positives (heavy legit / precise / common): bandwidth, in other words, as
such, of course, be present, best practices, state-of-the-art, value proposition, paradigm
shift, key takeaways, when it comes to, the future of, in this article, deep dive, and
citation phrases ("studies have shown", "research suggests") that are legitimate when the
source is actually named. **0 new false positives on the no-signal / no-hits fixtures** (one
that slipped through, "key takeaways", was caught and removed).

## 5. Deferred (judgment calls, not shipped)

- **narrative-cliches** expansion (47 body/somatic phrases): the family uses curated
  token-templates with slots and gates to fiction; my corpus is too light on fiction to
  validate FP, and ungated they would fire on memoir. Needs token-template authoring + a
  fiction FP set.
- **llm-vocabulary density words** (49 candidates rate-screened, added, then REVERTED): trialed
  in the density set and measured - they pushed FP to **2.7% on dense human academic/tech prose**
  (arXiv/PubMed/MDN, all pre-2021 human) for only ~3.5% AI true positives. Bad ratio; the words
  (harness, leverage, paradigm, streamline, robust, ...) legitimately cluster in technical
  writing, and ~30 candidates were already in the set. NOT shipped - the density family stays as
  tuned. (Many of the AI-vocabulary singles are already covered, or were kept as multi-word
  phrases in corporate-speak/cliches where they are distinctive and low-FP.)
- Fresh per-topic ai-suspected scraping (Medium/Substack): dev.to + generated set covered the
  TP role; more registers would tighten weasel-attribution FP estimates.

## 6a. Sentence-level FP audit + correction (2026-06-02)

The initial FP judgment was count-based (keep if <=3 human hits) + a hand-written drop list of
recognized terms + brainstorm fp-tags + truncated snippets - it did NOT read the actual kept
sentences. Reading them (article/experiments/audit_fp.mjs, real matcher over all 13,680 human
docs, full enclosing sentence per hit) showed the aggregate counts hid the truth: of the 107
shipped phrases that fired on human text, ~104 are LEGITIMATE in their instances, not slop:
- literal / false matches: "must-see"<-"I must see you", "boil down to"<-"Boil down to 1 cup",
  "take up space"<-CSS, "crushing it"<-"crushing it in its fall", "circle back"<-"a large circle,
  back", "you've got this"<-"once you've got this", "heart skipped a beat"<-literal.
- proper nouns: "tapestry of"<-"Great Tapestry of Scotland", "the pearl of"<-"Pearl of Great
  Price", "bucket list"<-"Billy's Bucket List".
- standard idiom / domain term: "shed light on", "play a crucial role in", "at the forefront of",
  "in the final analysis" (a statistics term), "it has been proven that" (math/medicine).

Dropped all 104 from the shipped data + openers. Kept only the 3 that are genuinely slop in their
own register: `learnings` (VC jargon), `believe in yourself`, `find your purpose` (self-help).

Revised shipped additions (after the FP cull): corporate-speak +38, cliches +36, seo-filler 32,
self-help-cliches 60, genre-cliches 51, weasel-attribution 35, boilerplate openers +9 (kept) -
~261 phrases total, all with ZERO human hits across 11M words except the 3 slop-register keeps.
LESSON: phrase-level counts are not enough; sentence-level reading is the FP gate. The screening
scripts now pull the full sentence so this is repeatable.

## 6. Status
Committed on branch `corpus-and-rules-expansion`; validate passes; **not released** per
instruction. The sentence-level FP cull is a follow-up commit on the same branch.
