# General pattern principles

## Summary

- Replaced example-specific explanations with general construction principles in the semantic-thinness prompt. Explicitly required finding every case, including unseen paraphrases and sentence structures.
- Updated the shared task with the same generalization requirement. The main prompt is 681 words and retains its 35 labeled examples.

## Decisions

- Kept marked defective spans and concrete counterexamples. Each principle describes the relationship or missing information that makes equivalent wording a target.
- Preserved the saved experiment requests and responses. Added a note to its report identifying the results as preceding this prompt revision.

## Verification

- All 35 examples retain their source wording and labels. Every positive example still marks its defective span, and the prompt remains below 750 words.
- Inspected actual saved requests: each document shares its task, rulebooks, and paragraph map, with one question for each paragraph/rule pair.
- The previous batch contained two rulebooks and two questions per paragraph. A one-rule batch uses one question per paragraph; the output is a bounded score classified at 0.5.
- Independent review checked the prompt and execution explanation. Replaced an action-only requirement with specific content and limited the physical-beat principle to generic movement and viewing.

## Context And Next Steps

- `developer-helpers/experiments/2026-10-17-jev-paragraphs/annotated-semantic/semantic-thinness.md` and `task.md` contain the revised instructions.
- This revision awaits a model test. Limit the next requested test to one prompt and a small fixed sample.
