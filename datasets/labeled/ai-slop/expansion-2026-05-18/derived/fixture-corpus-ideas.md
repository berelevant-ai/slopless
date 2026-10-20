# Fixture And Corpus Ideas

## Deterministic Hit Fixtures

- Assistant leakage:
  - `As an AI language model, I cannot browse the web.`
  - `My knowledge cutoff is January 2024.`
  - `Let me know if you have any further questions.`
- Hidden characters:
  - A prose sentence containing U+200B between two ordinary letters.
  - A paragraph containing U+202E outside code.
- Negative pivot density:
  - A paragraph with `not just X, but Y`, `not the problem. Y is`, and `not because X. Because Y.`
- Fiction density:
  - A fantasy scene with `took a deep breath`, `voice barely above a whisper`, `heart hammered ribs`, `ghost of a smile`, and `air thick with scent`.
- Uncited authority:
  - A health or business paragraph with `studies have shown`, `experts agree`, and no named source.

## No-Hit Fixtures

- A Unicode documentation paragraph naming U+200B and U+202E without embedding those characters.
- A legal or typography paragraph using non-breaking spaces deliberately.
- A literary paragraph using one antithesis once.
- A medical paragraph about breath and heart rate using literal physiology.
- A sourced academic paragraph using `research suggests` followed by a named study and citation.
- A human transcript with one natural `here's the thing`.

## Flowing Corpus Ideas

- Benchmark pair corpus:
  - Use HC3 or HC3 Plus to place a human answer next to a ChatGPT answer for the same prompt.
  - Preserve provenance and labels as comments or frontmatter.
- Mixed authorship corpus:
  - Use Beemo for human, raw machine, expert-edited machine, and LLM-edited machine variants.
  - Evaluate whether Slopless reports raw output more heavily than expert edits.
- Robustness corpus:
  - Use RAID adversarial categories to create small synthetic samples for zero-width, homoglyph, casing, whitespace, and misspelling variants.
- Fiction corpus:
  - Use Antislop and SlopSquid trigrams to build one generated-looking scene and one normal scene with literal physical action.

## Source-Only Ideas

- Broad vocabulary such as `robust`, `innovative`, `landscape`, `comprehensive`, `vital`, `important`.
- Wellness phrases such as `you are enough` and `give yourself grace` without density or genre gating.
- Fictional names such as `Elara` and `Kael` unless tied to a known generated corpus context.
