# Tune Generated Residue Boundaries

## Summary

Run four development revisions while keeping the balanced labels unchanged. Artifact placeholders and model disclaimers pass every assigned collection and a fresh confirmation; assistant wrappers still need mixed-collection work.

## Decisions

- Keep artifact revision one and disclaimer revision three at cutoff `0.5`. Their five fresh confirmation combinations each meet the fixed 95/5 bounds.
- Clarify indirect production narration, professional-scope limits and separate missing-information explanations. Model disclaimers require an identity, limitation or unavailable-information substitution; an unrelated writing offer cannot satisfy that condition.
- Test broader wrapper wording while preserving ordinary letters, procedures, bare slots and disclaimer-only passages. Four revisions expose remaining confusion with signposting and guessed-fact explanations.
- Preserve every producing prompt body and development demonstration. All inference uses explicit development paths, Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode and batch size sixteen.

## Verification

- Initial artifact scores are 96/100 and 100/100 caught hits, with one and four false positives. Confirmation catches 95 and 99 with one and four false positives.
- Disclaimer revision three catches 97, 97 and 100 hits with two, two and zero false positives. Confirmation catches 97, 98 and 100 with the same false-positive counts.
- Wrapper revision four catches 100, 100 and 96 hits with two, six and ten false positives. No cutoff meets both bounds across its three collections.
- `pnpm run validate` passes build, CLI version verification, lint, formatting, spelling and 100% type coverage. Production source edits in the worktree belong to concurrent work and remain unstaged.

## Context

- `runners/results/generated-residue-v22-development-tuning.json` preserves the prompt trials.
- Native results under `runners/results/generated-residue-v22-*` preserve requests, probabilities and input hashes.

## Next Steps

- Finish wrapper tuning and fresh confirmation. Join independent mixed predictions, compare all checks with the deterministic CLI through Fixture3, review remaining errors and complete independent report review.
