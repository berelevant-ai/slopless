# Freeze Staged-Opposition Development Baseline

## Summary

Froze the independently verified development subset at 100 hits and 100 no-hits. Added a 683-word baseline prompt while protected holdout repairs and overlap checks continue before inference.

## Decisions

- Preserve all 27 mandatory cases: eight hits and nineteen no-hits. The complete corrected pool at `bfb57f52` retains seven surplus hits and 33 surplus no-hits.
- Consolidate rhetorical foils, reversals, comparisons, and imagined objections in one check. Independent prompt review broadens the opening from three rhetorical effects to rhetorical force generally, matching the frozen definition.
- Use eight direct development demonstrations: hits `003`, `064`, `108`, and `184`; no-hits `065`, `151`, `138`, and `189`, all under collection `000027`. These examples are prompt exposure; holdout writing remains protected.

## Verification

- Independent allocation reproduces all 200 selected IDs and verifies exact passage, label, and snippet conservation against `bfb57f52`. The subset retains 600 role judgments and all 720 archived original votes.
- Subset review corrects stale metadata and explicitly scopes archived QA and author summaries. The proof is `/tmp/slopless-development-subset-aYkrkyyO/final-proof.json`, SHA-256 `182db6733ec9c9c893dbff63a4b714e2b5b2ad23522d76dd4f3b53c4bf322ace`.
- The first selection script stops on a domain-array/map mismatch after writing its two mechanical outputs. Parent restores only those outputs from the archive, adds input-shape checks, and reruns successfully before independent subset verification.
- Prompt review verifies all eight source passages and four bold hit snippets. Forced formatting changes preserve the exact non-whitespace token sequence; formatting checks and development-only runner preflight pass.
- Shared instructions remain byte-identical to `v11`. The assembled prompt has 94 shared words and 589 check-specific words; no Jev trial has run.

## Key Files And Next Steps

- `prompts/v12/shared.md` and `staged-opposition.md` contain the baseline. The `000027` dataset pair and its existing review record describe the frozen development subset; the existing indexes and plan progress now reflect this state.
- Finish the seven independently reviewed holdout replacements, clear incremental overlap, archive the repaired full pool, and freeze its 100/100 subset. Then run development baseline `b0`, complete bounded tuning, freeze the candidate, and conduct the separate holdout assessment before advancing families.
