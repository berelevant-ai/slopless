# Refine Negative Demonstration Coverage

## Summary

Perception's explanation-only trial improves recall but retains six isolated false positives. Test three distinct useful-perception controls while keeping the rule definition and positive demonstrations fixed.

## Results

- The explanation-only candidate catches 98 hits/six false positives isolated and 96/three mixed. No common cutoff meets both fixed bounds.
- Preserve both complete native results, exact original summaries and historical demonstration-excluded counts.

## Decisions

- Keep the three hit texts and their short explanations. Replace negative demonstrations with quoted wording under examination, spatial orientation and observation of another person's conduct.
- Keep the native question, criteria and general principle unchanged. Register the two additional development IDs before inference; the quoted-wording control was already exposed.
- The assembled candidate contains 955 words. Model, thresholds, current datasets and execution settings remain fixed.
- Protected final review accepts all new labels and snippets but rejects one prose-quality characteristic across the sixteen additions. Preserve all original 240 records and rewrite only those uncommitted additions, followed by fresh blind classification.

## Next Steps

- Evaluate the negative-example revision on both complete development collections and confirm a successful candidate on the same inputs.
- Finish protected rewriting and independent reviews, then archive and rebalance the corrected holdout pools without running holdout detector inference.
