# Coverage map

- Goal: `content` checks for the parser change, supplied hit case, corpus copy, and factual no-hit; `fixture3` checks reporting behavior and regressions.
- Approach: parser and fixture changes map to the four `content` blocks; output review maps to `fixture3`; package checks map to mechanical verification.
- Key decisions: `content` confirms reuse of `skipOptionalAdverbs`; code review confirms no new rule, vocabulary list, or reporting policy; `fixture3` confirms existing rule ownership.
- Files to modify: the parser, cases, and corpus map to `content`; preserve metadata and approved output map to corpus-preserve verification and `fixture3`.
