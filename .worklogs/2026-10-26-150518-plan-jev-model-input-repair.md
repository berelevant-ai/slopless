# Plan Jev Model Input Repair

## Summary

Plan model-input repair after integration changed request structure and evaluated input. Planning includes a native textlint shape audit of the 54 isolated development collections; production code remains unchanged.

## Decisions

- Restore separate frozen instructions/definitions and structured questions containing their own paragraph targets. Share rule material across a batch rather than article paragraphs.
- Keep text checks on complete writing with independent detection and paragraph-location judgments. Compare a single-copy labeled article against the accepted location request before adopting it.
- Treat input decomposition separately from transport changes. Preserve original multi-paragraph cases and judgments while reviewing paragraph versus text assignments.
- Keep the pinned model and cutoffs during repair. Measure all 54 checks through the public runtime, with development comparisons separated from independent holdout assessment.

## Findings

- Native textlint parsing covers 10,800 isolated development examples. Seven hundred fifty have multiple paragraphs; four hundred belong to the two existing text checks.
- The remaining 350 span twenty currently paragraph-level checks. Redundancy contributes 109, wordiness 44, staged opposition 28 and sentence-frame repetition 26.
- Live provider documentation confirms shared state reaches every question and supports question-local structured targets. Jev's documented context limits differ from the API body-size limit.
- Independent review tightens baseline parity, separate input-assignment evaluations, acceptance criteria, token-limit handling and duplicate-text isolation tests. Expected over-limit rejections are separated from execution failures on supported inputs.

## Context

- `.plans/2026-10-26-145854-jev-model-input-repair.md` specifies input boundaries, file changes, contracts and the quality comparison.
- `runners/jev.mjs` preserves the earlier structured target/definition request arrangement.
- `src/adapters/jev/` contains the integrated request construction requiring repair.
- `runners/results/shared-runtime-development.md` records current classification changes and location behavior.

## Next Steps

- Review and approve the plan, then create its executable Specular requirements before changing implementation.
- Preserve holdouts, unrelated term-policy work and existing dataset labels throughout request-parity verification.
