# Complete Semantic-Thinness Datasets

## Goal

Complete development and protected holdout collections for all nine accepted semantic-thinness types. Each type needs at least 100 hits and 100 no-hits per split, giving at least 3,600 passages across the family including the accepted empty-takeaway collections.

## Approach

1. Assign one development author per remaining type. Generate varied passages and close controls from the accepted definition, then have Opus independently classify all passages without author labels or snippets.
2. Resolve every disagreement and objection against the definition. Review new or clarified passages again, preserve at least 100 examples per class, and use Opus snippets for final hits.
3. Assign fresh holdout authors after development freezes. Generate independently, review blind with Opus, and audit overlap with development, taxonomy examples, current prompts, and existing family collections.
4. Keep holdout content and case-specific adjudications outside this prompt-development context. Exchange aggregate results and paths only.
5. Validate all pairs, exact snippets, IDs, checksums, class counts, frozen-review matches, and duplicate audits. Have fresh reviewers inspect records and adjudications before committing and pushing on main.

## Collections

- `000003` development and `000004` holdout: unspecified-change.
- `000005` development and `000006` holdout: hollow-significance.
- `000007` development and `000008` holdout: generic-realization.
- `000009` development and `000010` holdout: circular-explanation.
- `000011` development and `000012` holdout: unexplained-metaphor.
- `000013` development and `000014` holdout: unspecified-scope.
- `000015` development and `000016` holdout: unspecified-relationship.
- `000017` development and `000018` holdout: missing-actor.

Each stem is `<id>-semantic-thinness-<type>-<split>` under `datasets/ai-synthetic/passages/`, paired with `.labels.json`. Each collection gets one compact review record under `runners/results/`.

## Decisions

- Preserve the accepted definitions and existing empty-takeaway data. Assess each isolated collection for its named type; other checks remain unassessed.
- Include varied domains, indirect forms, misleading irrelevant detail, recoverable meaning, and contextual controls. Include at least 40 passages of 45-90 words per collection, evenly split between labels.
- Use the existing version 2 schema and minimal labels. Keep explanations in the type definitions and adjudications in review records.
- Keep sound passages when correcting their labels. Add examples if a correction leaves a class below 100; preserve useful hard cases rather than changing them to maintain a fixed collection size.
- Reuse the established blind Claude CLI procedure through a temporary generic helper. Keep generation files and full review prompts outside the repository.
- Preserve production rules, model prompts, runtime, existing datasets, and approved Fixture3 behavior. This task completes labeled data before detector development.

## Files

- Sixteen new Markdown/labels pairs under `datasets/ai-synthetic/passages/`.
- Sixteen compact review records under `runners/results/`.
- `datasets/README.md`: describe the completed family collections and protected split.
- `AGENTS.md`: preserve corrected examples and require collision-free temporary review filenames.
- `.worklogs/`: generation counts, review corrections, overlap audits, independent verification, and next steps.
