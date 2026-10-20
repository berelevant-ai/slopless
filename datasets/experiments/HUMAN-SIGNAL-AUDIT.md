# Human-corpus false-positive audit

Date: 2026-05-29.

## What this is

We ran slopless over the entire human corpus (7,347 files: 4,000 Wikipedia, 2,260 Gutenberg, 1,087
gov/health), excluding the formatting/orthography bucket (smart quotes, em dashes, sentence case, etc.). That
left 32,933 "slop" signals and 123,604 readability-metric findings (readability is a per-document threshold,
not a per-instance signal you can call false, so it is set aside here).

We then audited every slop rule by reading spread samples of its hits and judged it:
- TRUE = the rule correctly identified the construction it targets (a real, if sometimes mild, issue), even
  though a human wrote it.
- FALSE = the rule misfired on legitimate human prose (over-broad pattern, wrong threshold, or a narrative
  rule firing on non-narrative text).

The split is rule-level (sample-audited), so per instance it is approximate; a few rules are mixed.

## Headline

- 32,933 slop signals on genuine, mostly pre-AI human text.
- 27,224 (82.7%) judged FALSE positive.
- 5,709 (17.3%) judged TRUE positive.

The false positives are concentrated in a handful of broad structural rules. `triple-repeat` alone is 12,453
signals (38% of everything, ~46% of the false pile). The true positives are dominated by the high-precision
lexical/phrase rules.

## Verdict by rule (counts; rules with >= 40 hits)

| verdict | count | rule | why |
|---|---|---|---|
| FALSE | 12,453 | triple-repeat | flags repeated "the"/"it"/"she" openers in normal reference prose; also an empty-opener bug ("") |
| TRUE | 4,740 | wordiness | "in order to", "a number of" are genuinely wordy (mild) |
| FALSE | 4,671 | negation-reframe | normal "not X but Y" correlative (Austen, Conrad, Douglass, Shakespeare) |
| FALSE | 1,723 | simplicity | "numerous" -> "many" is a nitpick, not slop |
| FALSE | 1,440 | fragment-stacking | fires on reference lists, tables of contents, credits, not prose |
| FALSE | 1,006 | softening-language | appropriate hedging in reference/science writing |
| FALSE | 765 | llm-vocabulary | legit human use of "comprehensive/moreover/vital" |
| FALSE | 754 | semantic-thinness | narrative "empty-scene-transition" template misfires on concrete factual sentences (verified) |
| FALSE | 699 | perception-verb-density | 2 perception verbs is normal in narrative/biography |
| FALSE | 671 | prohibited-words | "actually" and similar are ordinary words in human prose |
| TRUE | 574 | cliches | "first and foremost", "for free" are genuine cliches |
| FALSE | 499 | generic-signposting | "as such" is a normal connective |
| FALSE | 478 | repeated-sentence-starts | expected structure in factual/list prose |
| FALSE | 473 | hedge-stacking | appropriate caution in reference writing |
| FALSE | 438 | body-action-density | low threshold; e.g. "heart" 3x in a health article |
| FALSE | 346 | universalizing-claims | flags vague quantifiers ("some aspects"), the opposite of a universal |
| FALSE | 204 | demonstrative-emphasis | "This phenomenon was..." is normal scientific prose |
| FALSE | 174 | uncomparables | pedantic; "most perfect"/"very true" accepted in literary prose |
| TRUE | 160 | redundancy | "close proximity", "absolutely essential" are genuine redundancy |
| FALSE | 123 | boilerplate-framing | "X includes..." is normal factual listing |
| FALSE | 104 | empty-beat | narrative rule firing on non-narrative text |
| FALSE | 88 | low-information-beat-density | narrative rule; "heart/chest" in health text |
| FALSE | 65 | contrastive-aphorism | misfires on ordinary technical sentences (verified) |
| TRUE | 54 | uncited-authority | "some argue", "studies suggest" are genuine weasel words |
| FALSE | 47 | response-wrapper | "Certainly" used as a normal adverb, not chat scaffolding (verified) |
| TRUE | 45 | corporate-speak | "synergy", "plays a key role" are genuine filler (borderline) |
| TRUE | 40 | skunked-terms | "hopefully" etc. genuinely skunked (pedantic) |

Long tail (<40, mostly TRUE): academic-boilerplate 21, summative-closer 16, prohibited-phrases 15,
formal-transition-density 13, llm-vocabulary-density 9, narrative-cliches 7, humble-bragger 6, emotion-telling
4, boilerplate-conclusion 3, affirmation-closers 2; flat-action-cadence 3 (FALSE).

## Verified misfires (actual flagged human lines)

- negation-reframe: "John Dashwood had not the strong feelings of the rest of the family; but he was affected
  by a recommendation..." (Austen). Normal correlative.
- semantic-thinness: "Hurricane Beth was a short-lived tropical cyclone which traveled from Florida to Nova
  Scotia in the middle of August 1971." Concrete fact, not an empty transition.
- response-wrapper: "Certainly other professionals in the decade 1810-1820..." "Certainly" is an adverb here.
- body-action-density: "3 body cues (heart)" inside a MedlinePlus article about the heart.

## Caveats

- Rule-level routing, sample-audited, not per-instance. Mixed rules exist: `wordiness` is TRUE but mild;
  `corporate-speak` is borderline; `triple-repeat` has rare genuine cases (4 sentences truly hammering one
  opener). So 82.7% / 17.3% is approximate, but the direction and the dominant contributors are robust.
- The corpus is Wikipedia-heavy (long encyclopedic nonfiction), which is the worst case for these structural
  rules. The false-positive rate would differ on other registers.

## Implications

For the article:
- The earlier "AI trips slopless ~4x more than humans" gap was built partly on rules that over-fire on both
  AI and human text (the AI side's top slop hits were also negation-reframe, prohibited-words, triple-repeat).
  Recompute the human-vs-AI gap using ONLY the TRUE-reliable rules (wordiness, cliches, redundancy,
  uncited-authority, corporate-speak, prohibited-phrases, llm-vocabulary-density, summative-closer, etc.).
  That is the defensible version of the claim.

For the product (report, not yet fixed):
- The broad structural rules need precision work or density/clustering gates before they can stand as "AI
  tells": triple-repeat (and its empty-opener bug), negation-reframe, simplicity, fragment-stacking (skip
  reference lists), softening/hedge-stacking (allow reference-grade caution), perception/body/empty-beat/
  low-info-beat (narrative rules should not run on non-narrative text), semantic-thinness (the scene-transition
  template), response-wrapper ("certainly"), prohibited-words ("actually"), generic-signposting ("as such"),
  universalizing-claims (vague quantifiers), demonstrative-emphasis, contrastive-aphorism, boilerplate-framing.
- The high-precision lexical/phrase core holds up on human text: cliches, redundancy, wordiness,
  uncited-authority, corporate-speak, skunked-terms, prohibited-phrases.

## Files

- `article/corpus/_audit/slop-signals.jsonl` - all 32,933 (gitignored).
- `article/corpus/_audit/false-positives.jsonl` - 27,224.
- `article/corpus/_audit/true-positives.jsonl` - 5,709.
- `article/corpus/_audit/readability-signals.jsonl` - 123,604 (set aside).
- Scripts: `collect_signals.mjs`, `split_audit.mjs` (verdict map lives here).
