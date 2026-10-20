# Dataset Inventory

Fixture3 fixtures are not datasets. This inventory covers only source/training/evaluation data.

## academic-slop

- Path: `datasets/labeled/academic-slop`
- Contents: tortured-phrase CSVs, extracted previews, and Cabanac supplement archive.
- Labels: known or suspected tortured phrases, tortured abbreviations, and academic slop fingerprints.
- App state: partially implemented in `academic-slop:tortured-phrases`; remaining rows are unsafe without domain-specific context.

## academic-nlp

- Path: `datasets/labeled/academic-nlp`
- Contents: MPQA subjectivity lexicon, puffery/peacock terms, specificity sample, VAQUUM vagueness sample, MAGPIE idiom sample, DIMLEX connectives, GUM/STREUSLE syntax samples, and derived analysis files.
- Labels: subjectivity, puffery, specificity, vagueness, idiom literalness, discourse connectives, and syntax annotations.
- App state: selected puffery, vagueness, and authority ideas were implemented as bounded rules; MAGPIE is source-only because idiom literalness is not bad prose by itself.

## ai-slop

- Path: `datasets/labeled/ai-slop`
- Contents: empirical excess-vocabulary CSVs, LLM cliche word lists, AI-writing word lists, slop-forensics ngrams, community AI slop lists, and 2026-05-18 derived candidates.
- Labels: AI-associated words, phrases, ngrams, and candidate patterns.
- App state: selected assistant leakage, response wrapper, negative pivot, narrative, summary, vague, and subjective patterns were implemented; broad vocabulary remains source-only.

## plain-english

- Path: `datasets/labeled/plain-english`
- Contents: extracted GOV.UK, GCA, and Plain English Campaign avoid-word and replacement notes.
- Labels: plain-English replacements, discouraged words, wordiness notes, and pattern notes.
- App state: selected wordiness and corporate-speak candidates were implemented; broad domain-specific style advice remains source-only.

## prose-linter-lexicons

- Path: `datasets/labeled/prose-linter-lexicons`
- Contents: selected npm prose-linter packages, selected proselint checks, and 2026-05-18 rule-library derived candidates.
- Labels: cliches, wordiness, redundancy, corporate speak, hedges, skunked terms, uncomparables, weasel words, and related lint categories.
- App state: high-confidence lexicons and templates were implemented where false-positive controls were clear.

## style-guides

- Path: `datasets/labeled/style-guides`
- Contents: selected Vale rule packages from Microsoft, Google, Elastic, and Joblint.
- Labels: style-guide rule categories and lexical replacement rules.
- App state: mined for source ideas; product rules keep only reviewed high-confidence data.

## writing-corpora

- Path: `datasets/labeled/writing-corpora`
- Contents: extracted source index, example pairs, and rule/fixture candidates.
- Labels: corpus-level examples and source metadata.
- App state: source-only for future model and fixture generation.
