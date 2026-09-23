# Gate generalization, item 2: summative-closer

## Summary

Summative closers now strip a leading connective before matching, accept a why-closer with a pronoun subject (`that's why we`, `this is why it`, `which is why they`), and only treat a colon, `because`, `since`, or a digit as concrete. The closer list gained `at its core`, `at the end of the day`, `in a nutshell`, `simply put`, `put simply`, `the upshot is`, `the net effect is`, `the moral of the story`, `what this means is`, `when all is said and done`, and the `here` variants of lesson and takeaway.

## Decisions

- Full-corpus tally (baseline 0.2.39 vs candidate): human +413, ai-suspected +48, ai-generated +21 before pruning. `in the end` (158 human vs 3 AI), `in short` (78 vs 3), and `in essence` (23 vs 0) were ordinary connectives and were removed with the reviewer's approval. `at its core` was the strongest AI signal (14 ai-generated, 3 human) and stays.
- Dropped the blanket vetoes on `by`, `from`, `after`, `before`, `when`, `if`, `with`, `without`; they silenced `The bottom line is that teams ship faster when they cut scope.`
- A first control sentence, `That is why the pump failed: the seal was cracked.`, pushed the no-hit document over the demonstrative-emphasis document threshold and surfaced two latent detections; it was replaced by a non-demonstrative control rather than approving those.
- Draft-driven pattern from the previous commit: the full run showed 21 literal human hits (`It works in two ways`, `It lasted for 11 albums`), so the occasion template is limited to matter/count/stick verbs and when/whenever/for/once; a rerun is in progress.

## Verification

- 720-file human sample: +23 before pruning. Fixture suite: 16 added on hit-labeled passages, 9 relabeled, 0 on no-hits; 5 hits and 4 no-hits added with corpus prose; all suites match; validate passes.
- `verify-corpus-preserve.py` still reports the pre-existing `quietly` and `significance-density` records plus one `words/no-hits` violin case that predates this branch.

## Next steps

Item 3: generic-signposting question and answer arms as a grammar.
