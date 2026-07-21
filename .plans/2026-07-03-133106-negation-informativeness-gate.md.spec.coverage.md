# Negation reframe classification coverage

## Goal

- Fixture3: `textlint-rules-cases-syntactic-patterns` verifies which negation pairs report and which remain clean.
- Manual corpus comparison: changed `negation-reframe` findings are compared across human, suspected-AI, and generated-AI corpora.

## Approach

- Specular tree requirement: the private classifier, copular matcher, pair matcher, frame module, and both fixture files must exist.
- Fixture3: short reversals, framing-subject reframes, action-payoff reframes, concrete factual corrections, and detailed evaluative replacements are checked through public rule output.
- Manual corpus comparison: concrete-evidence suppression and retained detailed slop are reviewed from changed findings.

## Key decisions

- Fixture3: the public rule ID remains `syntactic-patterns:negation-reframe` in public findings.
- Specular tree requirement: classification remains private to the syntactic-patterns rule implementation.
- Code review: no reporting or unrelated family code participates in the decision.

## Files to modify

- Specular tree requirement: every listed implementation and fixture path is required.
