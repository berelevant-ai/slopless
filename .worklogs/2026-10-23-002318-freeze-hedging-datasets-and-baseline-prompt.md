# Freeze Hedging Datasets And Baseline Prompt

## Summary

Freeze the four balanced excessive-hedging datasets and prepare the first concise Jev prompt. An independent audit validates the selections, archives and native input boundaries before provider evaluation.

## Decisions

- Retain exactly 100 hits and 100 no-hits per evaluated check and collection. Mixed sets retain all eight combinations with 25 passages each.
- Preserve all 92 required cases, every source vocabulary slot and the 160 reviewed surplus passages in their Git archives. Keep protected writing outside prompt authoring.
- Use the unchanged shared instructions and one 761-word assembled check prompt. Its six complete development demonstrations contain three hits and three no-hits, with offending wording highlighted.
- Keep model `jev-1.13.0`, SDK `0.7.0`, threshold `0.5`, classification-only mode, batch size sixteen and the fixed revision/confirmation limits.

## Verification

- A fresh independent auditor passes 43 checks covering all 800 passages, 1,600 judgments, required IDs, source slots, archive parity, native loading and holdout refusal.
- Final overlap screening finds zero candidates against prior dataset writing and the opposite split. Full dataset validation passes 15,701 pairs and 30,253 labels.
- Native offline validation accepts isolated hedging, mixed hedging and both frozen comparators with 200 targets each. Its zero requests and incomplete-prediction status correctly precede inference.
- Scoped prompt formatting passes after a mechanical front-matter correction. The parsed prompt hash remains unchanged; every demonstration matches its complete development passage.
- Independent prompt review finds no correctness defects across six demonstrations and verifies that requests exclude target labels. Full validation passes; all 46 dataset contracts, six paragraph tests and the Fixture3 dataset comparison pass.

## Key Files And Next Steps

- Read the execution plan, split-specific review records and `prompts/v18/`. The legacy-development JSON records the two old checks on identical development inputs.
- Commit the reviewed baseline, then run all four planned baseline invocations.
- Follow the bounded prompt revision and fresh confirmation sequence, review errors and prediction changes, and finish the independent results audit. Holdout inference and release remain separately gated.
