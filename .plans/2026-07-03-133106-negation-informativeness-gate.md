# Negation reframe classification

Goal:
Change only `syntactic-patterns:negation-reframe` so it keeps known sloppy reframes, including detailed ones, while suppressing concrete factual corrections.

Approach:
- Replace the universal informativeness gate with a private pair classifier beside the sentence-pair matcher.
- Keep short label reversals without applying a factual-correction suppression.
- Keep reframes whose subject or first four words after the negation contain a framing noun: `goal`, `answer`, `fix`, `solution`, `point`, `problem`, `strategy`, `key`, or `issue`. The bounded predicate check catches `This is not a coffee problem` without treating later technical uses such as `problem statement` as framing.
- Keep action-payoff patterns such as `RAG does not replace search. It depends on it.` without applying the copular factual-correction suppression.
- For other broad copular pairs, suppress only when the replacement has a factual structure: a direct instruction; ownership, purpose, definition, amount, symptom, or distinct-cause wording; causal provenance; or reference evidence combined with a passive explanation. A repeated `not caused by X, caused by Y` contrast remains reportable. Neither reference evidence nor a passive verb is sufficient alone. A single number, names, sentence length, an explanatory clause, or `part of` is not sufficient because corpus testing showed that each also occurs in known slop.
- Apply the same classifier to explicit contrast pivots, but require combined factual evidence so detail alone cannot suppress them. Corpus testing must retain clear slop such as `This is not a framework. It is a calibration layer.` and `These are not experimental toys anymore. They are the new default workflow.`
- Keep detailed metaphorical or evaluative replacements that lack that evidence.
- Keep the requested hit examples: `It is never sudden. It is timely.`, `It was nobody important. It was a guest.`, `RAG does not replace search. It depends on it.`, and `Indexing is not the boring technical step anymore. It is the gate everything else has to pass through.`
- Add hit coverage for detailed goal/fix/answer reframes and detailed metaphorical product or self-help reframes that the rejected universal gate removed.
- Add no-hit coverage for the observed protocol, biography/history, health, medical-definition, and financial/legal factual corrections.
- Run fixture3 on syntactic-patterns, inspect diff, and do not approve blindly.
- Compare current changed-rule behavior against the previous committed behavior on human, ai-suspected, and ai-generated corpora with a direct matcher audit. Report gained/lost hits and manually classify representative changes.

Key decisions:
- The boundary is communicative function, not the spelling of the negator or sentence length.
- The fix belongs in the rule matcher, because the false positives are produced before reporting.
- Pattern-specific decisions replace one universal gate because the broad pair patterns do not share one safe boundary.
- Keep the public rule ID unchanged.

Files to modify:
- src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts
- src/rules/syntactic-patterns/contrast/private/copular-reframe.ts
- src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts
- src/rules/syntactic-patterns/contrast/private/reframe-classification.ts
- src/rules/syntactic-patterns/contrast/private/negative-slop-frames.ts
- behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md
- behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md
