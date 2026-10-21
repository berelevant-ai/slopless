# Freeze Explicit-Criteria Staged Opposition

## Summary

Selected a staged-opposition classifier that catches 96 of 100 development hits with two false positives. The existing public research runner now reproduces its exact requests from one check Markdown file containing JSON question metadata and the existing shared instructions.

## Decisions

- Preserve all six failed Markdown revisions, the failed model comparison, and all five request experiments. Keep the original 200 development examples and judgments unchanged.
- Select explicit yes/no criteria with the saved contextual examples and a clarified documentary-versus-adopted boundary. Keep Jev 1.13, SDK 0.7.0, threshold 0.5, and size-100 requests.
- Store the question and criteria in JSON front matter in the existing check file. Builtin JSON parsing and runtime assertions validate the restricted format; legacy Markdown and highlighting keep their earlier request shapes.
- Treat the 899-word candidate's ten direct demonstrations as development exposure. Excluding them gives 92/96 hits caught and two false positives among 94 no-hits; the one-shot holdout remains the separate assessment.

## Verification

- Fresh result review verifies all seven original trials and five experiments, complete requests, hashes, probabilities, unchanged labels, and selected errors. It identifies and corrects a Choice comparison adapter error, a one-word counting discrepancy, and historical exposure wording.
- Canonical public helpers reconstruct both winning requests byte for byte and validate a complete result view using the saved responses. The proof under `canonicalVerification` preserves hashes and records zero additional provider calls.
- Specular lint and structural verification pass. The dataset Fixture3 run passes all 42 contract groups; its expected diff adds four groups while preserving all 38 previous groups unchanged.
- Focused ESLint, formatting, JavaScript syntax, and TypeScript no-emit checks pass. Fresh source review confirms 25 legacy prompt configurations and fifty request comparisons remain unchanged; the four reviewed Fixture3 additions are approved.

## Key Files

- `prompts/v12/staged-opposition.md` stores the selected question, binary criteria, principle, and ten examples; `shared.md` remains unchanged.
- `runners/results/staged-contrasts-v12-development-tuning.json` preserves attempts and canonical equivalence; the adjacent report records scores, exposure, transitions, and six remaining errors.
- `runners/jev.mjs` loads optional question metadata; `scripts/datasets-contract.mjs` exercises input rejection, request serialization, highlighting compatibility, and cache binding.
- `.plans/2026-10-21-185815-question-metadata.spec.json` and its coverage map define the bounded runner change.

## Next Steps

- Commit and push the frozen candidate, then authorize the protected evaluator to run its untouched 100-hit/100-no-hit holdout once.
- Preserve that assessment and advance to boilerplate and signposting under the existing three-family execution plan.
