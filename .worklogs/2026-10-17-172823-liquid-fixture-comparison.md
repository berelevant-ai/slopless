# Liquid fixture comparison

## Summary

- Evaluated `d1-ultra` on the saved final Jev experiment: 764 fixture paragraphs and 1,026 questions with identical state, criteria, instructions, and threshold.
- Liquid flags 213/265 semantic hit cases and 3/237 no-hit cases, compared with Jev's 198 and 17. Ten successful requests took 54.47 seconds and reported $0.492001524.

## Decisions

- Selected Liquid's most capable hosted decision model and reused the installed official TypeSafe SDK. The configured endpoint is `https://api.liquid.ai/decisions/v1/systemone`, with compression and automatic retries disabled.
- Preserved the initial HTTP 422 failure: Liquid accepts at most 128 questions. Split only the question lists into ten batches, retaining the whole original state in each.
- Kept original Jev artifacts and production behavior unchanged. Model comparison lives under the existing internal experiment folder.
- Retained raw probabilities and the 0.5 threshold. Treated no-hit file flags and baseline disagreements separately from manual false-positive judgments.
- The user authorized replacing the unused Liquid key. Revoked `codex`, created `slopless-fixture-comparison`, and privately verified its saved Agent API Keys credential.
- Updated the global access inventory. An explicit `/dev/stdin` template was required for native 1Password edits from the child process; private read-back confirmed the final secret.

## Verification

- Runner syntax, frozen-input preparation, and comparison generation pass. Original source and request hashes match, including every saved Jev row's probability, source metadata, expectation, and baseline matches.
- All ten successful responses identify `d1-ultra`, contain exactly their requested answers, and return finite probabilities between zero and one with zero generated tokens.
- Batch validation proves identical shared state, unchanged question instructions, unique complete coverage of all 1,026 questions, and at most 128 questions per request.
- Markdown output contains all 764 paragraphs and 1,026 comparison entries. Provider-reported cost matches the published input-token calculation.
- Independent review identified missing baseline validation and HTTP-failure recording; both are implemented before paid successful inference.
- Final independent case review identifies 14 recovered targets, five clear regressions against Jev, 27 remaining clear baseline misses, and one clear no-hit false positive. Two other no-hit flags remain ambiguous.
- Independent corpus review covers all 29 Liquid/baseline differences and all 41 Liquid/Jev differences. Baseline comparison yields 13 clear misses, three useful additions, and 13 contextual disagreements; the added corpus findings have zero clear false positives.

## Context

- `.plans/2026-10-17-171339-liquid-fixture-comparison.md` records the bounded comparison and the observed provider limit.
- `developer-helpers/experiments/2026-10-17-jev-paragraphs/liquid-run.mjs` prepares frozen requests, runs paid inference, and generates comparisons.
- `liquid/review.md` explains quality changes and measured cost and latency. `liquid/paragraph-results.md` records every paragraph judgment.
- `liquid/*.batch-*.request.json` and response files preserve the actual HTTP payloads and results. `liquid/results.json` contains the combined comparison.
- The sibling original `review.md` and final Jev response files supply the frozen comparison baseline.

## Next Steps

- Discuss whether individual-construction questions or smaller paragraph context should be evaluated next, using the recorded misses and factual controls.
- Keep model experimentation separate from production rule reporting until a chosen experiment demonstrates the required behavior.
