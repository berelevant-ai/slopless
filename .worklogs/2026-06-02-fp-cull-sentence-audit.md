# Sentence-level FP audit + cull (branch corpus-and-rules-expansion, NOT released)

## Why

The first expansion commit (d106a28) judged false positives by aggregate human-hit count
(kept phrases with <=3 hits) + a hand-written recognized-term drop list + brainstorm fp-tags.
It did NOT read the actual kept sentences. Reading them showed the counts hid the truth.

## What

`article/experiments/audit_fp.mjs` ran the real matcher over all 13,680 human docs and pulled
the full enclosing SENTENCE for every shipped-new phrase that fired. Of 107 phrases that fired
on human text, ~104 are legitimate in their instances (literal usage, proper nouns, false
matches, standard idiom, domain terms), e.g.:
- "must-see" <- "I must see you once more"; "boil down to" <- "Boil down to 1 cup" (recipe);
  "take up space" <- CSS render; "crushing it" <- "crushing it in its fall"; "circle back" <-
  "a large circle, back"; "heart skipped a beat" <- literal.
- "tapestry of" <- "Great Tapestry of Scotland"; "the pearl of" <- "Pearl of Great Price".
- "shed light on", "play a crucial role in", "at the forefront of", "in the final analysis".

Dropped all 104 from the data files + boilerplate-framing openers. Kept only 3 that are slop in
their own register: `learnings` (VC jargon), `believe in yourself`, `find your purpose`.

## Result

Revised additions: corporate-speak +38, cliches +36, seo-filler 32, self-help-cliches 60,
genre-cliches 51, weasel-attribution 35, openers +9 kept (~261 phrases). All remaining additions
have ZERO human hits across 11M words except the 3 slop-register keeps. 6 goldens re-approved;
validate passes.

## Lesson

Phrase-level counts are not a sufficient FP gate; read the sentence. The screen/audit scripts now
emit full sentences so this is repeatable. New families that survived clean: seo-filler,
self-help-cliches, genre-cliches, weasel-attribution (still the highest FP-risk - watch it).
