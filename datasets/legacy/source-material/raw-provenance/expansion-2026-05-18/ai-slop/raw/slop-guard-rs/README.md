# slop-guard

Detect AI slop patterns in prose. Scores text 0-100 using ~80 regex rules that target common LLM writing tics.

## Install

```sh
cargo install slop-guard
```

If you don't have Rust installed:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install slop-guard
```

## Usage

```sh
# Analyze from stdin
echo "This is a crucial, groundbreaking paradigm shift." | slop-guard

# Analyze files
slop-guard essay.md blog-post.txt
```

### Output
JSON object with:
- `score`: 0-100 (higher = cleaner)
- `band`: clean / light / moderate / heavy / saturated
- `violations`: array of detected patterns with context
- `advice`: actionable suggestions
- `counts`: per-category violation counts

### As a library
```rust
use slop_guard::analyze;

let result = analyze("Your text here");
println!("Score: {}/100 ({})", result.score, result.band);
```

## What it catches

| Category | Examples |
|----------|----------|
| Slop words | crucial, groundbreaking, delve, tapestry, moreover |
| Slop phrases | "it's worth noting", "let's dive in", "at the end of the day" |
| Structural patterns | Bold-header blocks, excessive bullet runs, triadic lists |
| Tone markers | "would you like", "feel free to", "certainly" as opener |
| Weasel phrases | "experts suggest", "studies show", "many believe" |
| AI disclosure | "as an AI", "as a language model" |
| Rhythm monotony | Uniform sentence lengths (low coefficient of variation) |
| Em dash overuse | Excessive em dashes relative to word count |
| Contrast pairs | "X, not Y" constructions |
| Setup-resolution | "This isn't X. It's Y." flips |
| Colon density | Overuse of elaboration colons |
| Pithy fragments | Short evaluative pivots ("Simple, but effective.") |
| Phrase reuse | Repeated multi-word phrases |

## Score bands

| Band | Range | Meaning |
|------|-------|---------|
| Clean | 80-100 | Minimal AI patterns |
| Light | 60-79 | A few tells, mostly human-sounding |
| Moderate | 40-59 | Noticeable AI patterns |
| Heavy | 20-39 | Significant AI influence |
| Saturated | 0-19 | Strongly AI-generated |

## Claude Code Plugin

slop-guard ships as a Claude Code plugin with a `/slop-guard` skill. The skill runs slop-guard on files or text you've written and revises it to eliminate AI patterns.

### Install the plugin

Add the marketplace and install:

```
/plugin marketplace add nwyin/slop-guard-rs
/plugin install slop-guard@slop-guard
```

### Use the skill

```
/slop-guard essay.md
/slop-guard blog-post.txt
/slop-guard last
```

The skill will:
1. Check that `slop-guard` is installed (offers to install via `cargo install` if missing)
2. Run the analysis and report the score, band, and top violations
3. Revise the text to fix detected patterns
4. Re-run to verify the score improved to >= 80 (clean)

## Contributing

```sh
cargo test
cargo fmt
cargo clippy --all-targets --all-features
```

## License

MIT

---

[nwyin.com](https://nwyin.com)
