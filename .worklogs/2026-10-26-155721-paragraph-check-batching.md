# Batch Paragraph Checks

## Summary

Implement one shared paragraph request containing independent questions for all enabled paragraph checks. Preserve native textlint reporting and the existing whole-text request format.

## Decisions

- Keep version-specific shared instructions inside each check question alongside its definition and examples. Only the actual paragraph is shared across judgments.
- Share evaluation per parsed document while retaining separate rule modules. This preserves named rule findings, independent thresholds, severity and suppression comments.
- Exclude disabled checks and group checks by model. Split provider-size failures into smaller question groups without truncating text or instructions.
- Preserve unrelated term-policy changes in the worktree. Publish no new npm version for this request.

## Verification

- Specular fails for the expected missing implementation before coding, then passes. Forty-seven runtime/HTTP contracts and six paragraph-runner contracts pass.
- Build, lint, formatting, spelling and 100% type coverage pass. Fixture3 matches all twenty deterministic suites, the shared-runtime suite and both CLI suites.
- A completed live comparison evaluates 400 development examples with two checks in combined and separate requests. All 400 explicitly labeled decisions agree; six additional unlabelled check/example decisions differ near the threshold.
- Empty takeaway catches 100/100 hits with zero false positives in both modes. Circular explanation catches 99/100 with four false positives in both modes.
- Combined execution uses 400 calls rather than 800, with 562,794 rather than 687,188 input tokens. Saved receipts and the report record reviewed differences and remaining errors.
- An initial comparison is retained as incomplete after a concurrent rebuild removed its prompt assets. The completed rerun uses a stable build.
- A clean index export builds successfully and passes all 47 contracts. Its packed artifact passes 18 installation contracts and is installed globally through npm; the installed library batches two paragraphs into two requests with 52 questions each.
- The previous CI run exposes a fixed-delay stdin-cancellation test on Node 22. Replace its delay with a stdin-readiness notification; the revised 47-contract run passes.
- All 47 contracts also pass under Node 22.22.0. Fresh independent review verifies source boundaries, paired request inputs, final metrics, manual error observations and complete verification logs; it reports no outstanding objections.

## Context

- `.plans/2026-10-26-154130-paragraph-check-batching.md` and its Specular files define the implemented scope.
- `src/adapters/jev/paragraph.ts`, `detector.ts`, `client.ts` and `src/runtime.ts` implement per-paragraph grouping and native reporting.
- `scripts/paragraph-batching.test.mjs` and `scripts/runtime.test.mjs` exercise public and HTTP behavior.
- `runners/paragraph-batching.mjs` and `runners/results/paragraph-batching.md` provide the reproducible live comparison and reviewed counts.

## Next Steps

- Continue the broader input-assignment and whole-text format work from the earlier input-repair plan as a separate task.
