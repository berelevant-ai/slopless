# Freeze Complete-Text Batching

## Summary

Implemented measured batch-capacity support in the existing research runner and temporary family driver. Default size 100 remains compatible; nondefault sizes preserve complete texts and become immutable execution settings.

## Decisions

- Validate integer batch sizes from 1 through 100 before target loading or SDK initialization. Record nondefault settings; interpret absent historical settings as 100.
- Reuse public planning in the driver, including partial final batches. Size 16 processes 200 complete texts in 13 requests, ending with eight.
- Fix the independently reproduced null-cache regression: create defaults only for absent files and reject existing non-object JSON before target loading. Preserve rejected files and completed inference unchanged.

## Verification

- Specular lint passes; verification initially fails on the expected missing batching behavior and passes after implementation. Public contracts and private probes exercise the behavioral requirements beyond content presence.
- All 38 public contract groups and 133 private probes pass. Parent confirms the original 34 approved groups remain an identical prefix and reviews four additions before Fixture3 approval.
- Fresh independent review reproduces and verifies the invalid-cache fix in 18 cases, with zero target reads or SDK initialization and unchanged bytes, inode, and modification time.
- The historical result validates all 27 saved requests and 2,251 decisions without rewriting its cache. Default request and snapshot bytes match captured prepatch sources.
- Full validation, syntax, scoped lint, formatting, and independent review pass. The synthetic provider capacity proof remains separate from classifier evaluation.

## Key Files And Next Steps

- `runners/jev.mjs`, `scripts/datasets-contract.mjs`, `runners/README.md`, and the existing Specular files define and verify the change.
- The frozen temporary driver SHA-256 is `0969b5b7ed6487bf9cb6545103aac0924a8df34bf752ff2e0f10465a42baf2a4`; its 133-probe verification is retained under `/var/folders/04/60qvc12j259_3sx6n2hxnldc0000gn/T/slopless-family-driver-integrity-4IXtnY/proofs.json`.
- Run authority development baseline `b0` at the established size 100, then complete bounded tuning and the separate frozen-candidate holdout assessment. Preserve whole texts and measure the final prompt's size-16 capacity before text-level inference in the later family.
