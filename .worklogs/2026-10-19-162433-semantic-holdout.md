# Semantic-thinness holdout

## Summary

- A fresh writer generated 100 paragraphs and assigned 50 expected hits and 50 expected passes. The set contains 5,179 words, with 34-87 words per paragraph.
- Saved target text and the answer key separately under `developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout/`. The README prohibits using this material in demonstrations, prompt revisions, training, or development fixtures.

## Decisions

- Used a writer without the parent conversation. It reports reading four implementation files and the writing instructions; existing fixtures, corpora, prompts, and benchmark results remained unread.
- The reported implementation files were `src/rules/semantic-thinness/semantic-thinness.ts`, `src/rules/semantic-thinness/private/pattern-matcher.ts`, `src/rules/semantic-thinness/private/concrete-guards.ts`, and `src/rules/private/textlint-rule-builders.ts`.
- Interpreted the requested false-positive examples as expected passes that tempt a semantic-thinness classifier. Expected hits contain an issue according to the writer's editorial judgment.
- Preserved the writer's decisions independently of classifier behavior. Generation and verification made no Jev or Slopless calls, and existing prompts remain unchanged.

## Verification

- Parsed both JSON files and checked exactly 100 unique aligned IDs, unique normalized paragraphs, 50 boolean labels of each kind, nonempty rationales, and verbatim positive evidence spans.
- Checked target records contain only IDs and text. Paragraphs use ASCII and contain no internal line breaks.
- Compared against all 764 original benchmark paragraphs, the selected prompt, and the earlier grounded prompt. Found zero whole-paragraph copies and zero shared consecutive eight-word sequences after punctuation and case normalization.
- Paragraph SHA-256: `c7d168a60bb3665a4c4d4f331aa91e504a7f178f549e1eeaeb655868702e7813`.
- `labels.json` SHA-256: `dad709ba590a7d3bf3135be3ab3c946fade308d61bcc3d9b48cffab7815cefad`.
- A fresh reviewer confirmed counts, separation, spans, word totals, hashes, and the evaluation policy. Provenance about unread material is the writer's disclosure.
- The reviewer identified an overstatement in the rationale for `holdout-038`: the paragraph supplies a behavioral response. I verified this against the text; its marked decorative imagery still supports the positive label, so the author's original key remains intact.
- The first commit attempt triggered the generic credential detector on a checksum beside an ambiguous label. Naming `labels.json` beside its checksum removes that ambiguity while preserving the digest and scanner configuration.

## Context And Next Steps

- Freeze the prompt, model, threshold, and request format before evaluating this set. Send each paragraph as the classification target while withholding every label, rationale, and evidence span.
- Score agreement against the fixed answer key after responses return. Preserve failures and disputed labels in the report; subsequent development informed by results needs another untouched holdout for independent measurement.
