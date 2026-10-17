# Example-grounded Jev family experiment

## Summary

- Rebuilt the Jev prompt for the complete semantic-thinness family using 374 labeled example entries from existing source and fixtures, alongside actual construction templates and specific boundaries.
- Ran 1,528 independent rule/paragraph questions. Desired-hit recovery improved, while factual-control errors and findings assigned to the wrong rule remain.

## Decisions

- Included both public family rules: semantic-thinness and superficial-analysis. Each receives its own question and Markdown rulebook.
- Preserved the 36 JSON patterns' 194 positive and 133 negative examples. Added 47 verified fixture examples for expanded artifact metaphors, significance frames, boring solutions, quantification, and trailing analysis.
- Replaced conflicting broad exception notes in the prompt with specific boundaries. Names, quantities, or causal connectors supply an exemption only when they explain the targeted claim.
- Kept the original fixture wording and 764 paragraph ranges. Preserved pinned model `jev-1.13.0`, threshold 0.5, and every earlier provider artifact.
- Tagged targets containing demonstration text from either rulebook. Reported those targets separately from paragraphs without demonstration text; acknowledged examples can remain in neighboring corpus context.
- Kept metadata intentions, runtime findings, and questionable fixture labels distinct. Source inspection found documented examples whose desired label differs from current mechanical matching.

## Verification

- Source and prompt review checked all 36 patterns and the TypeScript expansions. Added five missing broad-significance constructions identified by independent review before inference.
- Every fixture supplement is verified verbatim against its original case file. All 374 demonstration entries, generated prompts, source files, and requests have recorded hashes.
- All four real SDK requests returned the expected 1,528 bounded probabilities. Their summed latency is 2.2047 seconds; 170,856 input tokens cost $0.007175952 at the published rate.
- Runner syntax, source-range and hash assertions, exact answer coverage, threshold calculations, and complete Markdown rendering pass.
- The main rule catches 235/265 hit cases and flags 18/237 no-hit cases. On targets without demonstration text, it catches 135/159 hits and flags 17/174 no-hits.
- The superficial rule retains all 24 baseline-positive hit cases, while adding 21 findings there and three control flags. Separate decisions expose ownership errors instead of hiding them in a family-wide count.
- Independent result review verifies the aggregate counts and 374 example entries. It identifies 25 wrong-rule superficial judgments and two new literal/consequence false positives in LinkedIn; the report includes those regressions.
- The commit hook rejected the 1,124,407-byte pretty-printed comparison at its 1 MiB file limit. Compact JSON preserves every result and matched baseline record within the existing limit.

## Context

- `.plans/2026-10-17-175242-jev-grounded-semantic-family.md` records the experiment.
- `developer-helpers/experiments/2026-10-17-jev-paragraphs/grounded-semantic/task.md` and the two rulebook Markdown files contain exact model instructions.
- `supplements.json` owns the explicitly reviewed fixture examples and translated boundary explanations; the source JSON patterns remain unchanged.
- `run.mjs`, `inputs.json`, `demonstrations.json`, and exact request/response files preserve reproduction and overlap auditing.
- `review.md`, `results.json`, and `paragraph-results.md` record the output and interpretation.

## Next Steps

- Review the supplied-negative instruction failure, factual-transition false positives, and cross-rule classifications before selecting another model experiment.
- Keep the model outside production reporting while these recorded failures remain unresolved. Reproduce a chosen experiment in a separate directory to preserve the frozen evidence.
