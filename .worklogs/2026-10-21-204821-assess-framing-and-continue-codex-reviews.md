# Assess Framing And Continue Codex Reviews

## Summary

Framing's frozen holdout catches all 100 desired hits with nine false positives. Claude's weekly quota interrupts buried-answer preparation; the user authorizes Codex for the remaining reviews, preserving the existing data requirements.

## Decisions

- Preserve the candidate frozen at `e18a4a20` and unchanged holdout labels. Its nine false positives exceed the five-false-positive target despite qualifying on development.
- Complete this independent assessment while buried-answer preparation continues. Keep protected framing error details outside the remaining prompt-authoring context.
- Use fresh Codex reviewer contexts for the remaining buried-answer roles. Preserve completed Opus opinions and distinguish actual reviewers instead of reporting incomplete Opus passes as complete.
- Complete the twelve missing development texts through original Codex authoring. Integrate them under their assigned stable IDs with honest mixed-model provenance; final labels still require review.

## Verification

- The saved Claude envelope reports HTTP 429 `usage_limit_reached`, with a reset time of 13:00 Europe/Lisbon and no date. The user explicitly directs review with Codex instead.
- Two fresh authors produce the missing twelve development texts. Parent checks confirm assigned IDs, booleans, word bands, and exact hit snippets; each batch contains three hits and three no-hits.
- The framing evaluator uses the frozen public runner once: two requests, 200 decisions, 739.239082 milliseconds, 43,489 input tokens, and 6,208 output tokens. It reviews all nine errors and preserves the native result bytes.
- Fresh protected verification reconstructs both requests, snapshots, and all 200 scores, and reviews all nine errors. It confirms the failed five-false-positive gate, unchanged prompt and labels, native result hash, and factual report claims with zero additional provider calls.
- CI, CodeQL, Code Quality, and Scorecard pass for the frozen development commit `e18a4a20`.

## Key Files And Next Steps

- `runners/results/boilerplate-and-signposting-v13-unnecessary-framing-holdout.json` preserves the native assessment. The family holdout Markdown contains the protected error review and marks buried answer pending.
- The sequential plan records authorized reviewer substitution and per-check scheduling. The family development report preserves both framing results and remaining requirements.
- Finish and freeze both complete-text pools; give fresh reviewers shuffled opaque aliases and complete writing while withholding labels and snippets. Reconcile blind and adversarial findings before final fresh review.
- Archive reviewed pools, select 100 hits and 100 no-hits per split with mandatory cases retained, and complete overlap checks before buried-answer prompt tuning and its protected assessment.
