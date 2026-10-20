# SlopSquid

**CLI tool for detecting AI writing patterns in text**

Scans files and websites for words, phrases, and structural patterns that are statistically overrepresented in LLM output compared to human writing. Based on frequency-ratio data from the [Antislop paper](https://arxiv.org/abs/2501.01345) (Paech et al., 2025), which analyzed 67 AI models against human writing baselines.

## Quick Start

```bash
# Build from source
git clone https://github.com/QRY91/slopsquid
cd slopsquid
go build -o slopsquid ./cmd/slopsquid
```

```bash
# Scan a file for AI patterns
slopsquid scan README.md

# Score files 0-100 for slop density
slopsquid score docs/*.md

# Generate a report for a website
slopsquid report qry.zone

# Generate a report for a local directory
slopsquid report ./docs/
```

## Commands

### `scan` — Detailed hit-by-hit analysis

Reports every detected pattern with line numbers, severity, and explanations.

```bash
slopsquid scan file.md
slopsquid scan docs/ -r          # recursive (default)
slopsquid scan docs/ --json      # machine-readable output
slopsquid scan docs/ -v          # verbose (show skipped files)
```

Example output:

```
! test_doc.md — score: 68/100 (heavy)
  [!!] line 3: "flickered" — banlist word, 98.5% of 67 models overuse
  [! ] line 7: "murmured" — banlist word, 73.1% of 67 models overuse
  [  ] line 12: "furthermore" — banlist word, 25.0% of 67 models overuse
  [!!] line 15: "voice barely whisper" — trigram, 68.7% of 67 models overuse
  [  ] line 20: "it's not just X, but Y" — structural pattern, 4.0x overrepresented
  18 hits in 42 lines, 387 words — density: 46.5 per 1k words
```

### `score` — Quick density scores

One line per file: score, rating, hit count, word count.

```bash
slopsquid score *.md
```

```
! 68.0  heavy     18 hits    387 words  test_doc.md
* 31.2  moderate   4 hits    892 words  blog_post.md
.  8.5  clean      1 hits   1204 words  README.md
```

Ratings: `.` clean (0-19) / `*` moderate (20-49) / `!` heavy (50-100)

### `report` — Consolidated site or directory analysis

Crawls a website or scans a directory, then produces aggregate statistics.

```bash
# Website — respects robots.txt, seeds from sitemap.xml
slopsquid report qry.zone
slopsquid report https://example.com --max-pages=50 --workers=5

# Local directory
slopsquid report ./src/
```

Report flags (URL mode only):

| Flag | Default | Description |
|------|---------|-------------|
| `--depth` | 10 | Maximum crawl depth |
| `--max-pages` | 200 | Maximum pages to crawl |
| `--delay` | 200 | Delay between requests (ms) |
| `--workers` | 3 | Concurrent requests |

## Detection System

Three layers of pattern matching, all derived from the Antislop dataset:

### 1. Banlist Words (45 words)

Words that appear at statistically abnormal rates across LLM outputs. Each word is weighted by how many of the 67 analyzed models overuse it.

**High severity:** `flickered` (98.5%), `flicker` (94%), `elara` (85%), `gaze` (80.6%)
**Medium severity:** `murmured` (73.1%), `hesitated` (68.7%), `whispered` (68.7%)
**Low severity:** `leverage` (35%), `utilize` (35%), `paradigm` (25%), `furthermore` (25%)

### 2. Trigrams (27 phrases)

Three-word sequences overrepresented in AI-generated text:

`voice barely whisper` (68.7%) / `said voice low` (61.2%) / `air thick scent` (49.3%) / `took deep breath` (44.8%) / `smile playing lips` (43.3%)

### 3. Structural Patterns (5 regex patterns)

Sentence-level constructions with known AI frequency ratios:

- **"It's not X, it's Y"** — 6.3x overrepresented
- **"Not just X, but Y"** — 4.0x overrepresented
- **"Worth noting" hedging** — 3.0x overrepresented
- **Hedging phrases** ("one might say", "it could be argued") — 2.5x
- **AI enthusiasm markers** ("great question", "fascinating", "compelling") — 5.0x

## Scoring

- **Score (0-100):** Weighted hits per 1000 words, normalized
- **Density:** Raw hits per 1000 words
- **Rating:** clean (0-19), moderate (20-49), heavy (50-100)

Each hit carries a weight based on the frequency ratio from the Antislop paper — a word used by 98% of models scores higher than one used by 25%.

## File Formats

Markdown (.md), HTML (.html — tags stripped), plain text (.txt), reStructuredText (.rst), AsciiDoc (.adoc), XML (.xml). Max file size: 10MB.

## Global Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--json` | | Output as JSON |
| `--recursive` | `-r` | Process directories recursively (default: true) |
| `--verbose` | `-v` | Show skipped files and processing details |

## Development

```bash
go mod tidy
go build ./cmd/slopsquid
```

## License

MIT

---

**Website**: [slopsquid.com](https://slopsquid.com)
**Part of**: [QRY Tool Ecosystem](https://github.com/QRY91)
