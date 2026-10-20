# Human reference corpus (false-positive baseline)

Downloaded human-written text, used to measure how often slopless fires on genuine human prose versus AI
prose. The text lives under `article/corpus/` and is **gitignored** (large, and some sources are
license-restricted for redistribution). These scripts rebuild it from scratch.

## Why pre-AI text

People who read a lot of AI now copy its habits, so recent human writing already carries AI patterns. To get a
clean human baseline we prefer text written before AI writing spread. Each source is tagged by date below.

## Sources and counts

- `wikipedia/` - 4,000 files. WikiText-103-raw (Merity et al., 2016), built from verified Good/Featured
  Wikipedia articles. License CC BY-SA. Pre-2020. De-tokenized back to natural prose; one article per file.
  Script: `build_wikipedia.py`.
- `gutenberg/` - 2,260 files. Project Gutenberg public-domain books (mostly pre-1928), found via the Gutendex
  catalog. Public domain; commercial use OK. The PG header/footer/license is cut, and any file still mentioning
  "Project Gutenberg" was deleted. Split into ~700-word chunks. Script: `build_gutenberg.py`.
  Caveat: old, literary style and curly quotes, so the readability and formatting checks fire for reasons
  unrelated to slop. Lead with the slop bucket for this source.
- `gov-health/` - 1,087 files, two parts:
  - `med-*.md` (687): MedlinePlus health topics (NLM/NIH). Public domain. Best match for the wellness register.
    MODERN (topics file dated 2026), so NOT part of the pre-2020 baseline; use for register coverage and note
    the date.
  - `fr-*.md` (400): Federal Register documents, 2014-2019. Public domain. Genuinely pre-2020 formal government
    prose. Caveat: official writing is often wordy, so some hits here are real slop, not false alarms.
  Script: `build_gov_health.py`.

Total: 7,347 article-length files, about 96 MB.

## License summary (for a commercial article)

- Wikipedia (CC BY-SA): reuse OK with credit and share-alike. Quote with attribution.
- Gutenberg (public domain, PG references removed): any use, including commercial and quoting. Safest to quote.
- MedlinePlus and Federal Register (US public domain): any use, including quoting.

All four are fine for a commercial article. We deliberately did NOT use the non-commercial-only Blog Authorship
or Brown corpora.

## Rebuild

From this directory:

```
# Wikipedia: first download WikiText-103-raw, then split
curl -sSL -o /tmp/wt103.zip https://wikitext.smerity.com/wikitext-103-raw-v1.zip
unzip -o /tmp/wt103.zip -d /tmp
python3 build_wikipedia.py /tmp/wikitext-103-raw/wiki.train.raw ../../corpus/wikipedia 4000

python3 build_gutenberg.py ../../corpus/gutenberg 200 2500
python3 build_gov_health.py ../../corpus/gov-health 1200 400
```

## Measurement note

Report findings in three buckets (slop / readability / formatting) and lead with the slop bucket. Readability
and formatting fire on lots of legitimate human writing (old style, curly quotes, bureaucratic prose), so they
are not clean false-alarm signals. Treat slop-bucket hits on pre-2020 human text as the worst-case
false-alarm rate.
