# Bounded Runner Preparation

## Summary

Implemented family selection, classification-only execution, shared development-only metadata preflight, and offline label-only rescoring in the existing Jev runner. Synthetic contracts cover the public CLI and exported helpers, including legacy highlighting snapshots.

## Decisions

- Preserve `semantic-thinness` and `detect-and-highlight` as defaults, including snapshots that omit those fields. Preserve the existing detection/highlighting request wording and legacy family-wide no-hit scoring.
- Export `preflightDataset(input, { developmentOnly })` and retain `loadDataset(input, family)` for the parent's temporary driver. Preflight checks every collection before target loading or provider initialization.
- Export existing planning/scoring helpers plus `createSnapshot`, `validateResult`, and `rescoreResult`. New snapshots bind target text, IDs, ranges, and check assignments separately from judgments.
- Preserve original batches, scores, timing, usage, request hashes, and provenance through an inference hash. Append corrected summaries and their label hash instead of replacing original results.
- Allow exported rescoring with immutable retained prompt contents, verified against prompt and request hashes. The CLI uses the selected on-disk prompt files.
- Require a target hash and preserved original summaries for label-only rescoring. Legacy snapshots continue to validate, score, and resume offline under their original defaults.
- Use existing dataset readers, hashing, requests, and response validation. Add no dependencies or provider calls; exercise missing-batch resume through a local synthetic SDK with a synthetic credential.

## Verification

- `specular lint .plans/2026-10-21-000340-bounded-runner.spec.json` exited 0 before implementation. The initial `specular verify` exited 1 with the expected missing exports, options, contracts, and documentation.
- The initial `node scripts/datasets-contract.mjs behavior/fixtures/datasets/contract.json` exited 1 on the unsupported `--family` option. The completed contract runs exit 0 with all 32 groups passing.
- Contracts reject synthetic holdout metadata under an innocuous filename, a mixed directory, and missing split metadata through the CLI and shared preflight. Stale text hashes and an invalid SDK path establish that rejection occurs before target loading and SDK initialization.
- Contracts validate, score, and resume synthetic old-format snapshots with highlighting defaults. Classification-only contracts cover completed resume, partial validation, incomplete-score rejection, and missing-batch resume without network access.
- Rescore contracts preserve original results and append corrected scores. They reject changed targets, IDs, assignments, model, threshold, family, mode, prompts, request hashes, predictions, original scores, and incomplete results.
- `pnpm run build`, both changed-file `node --check` commands, focused ESLint, Prettier checks, and scoped `git diff --check` exited 0. ESLint's configured TypeScript rules apply to `src/**/*.ts`; the `.mjs` files also receive syntax and integration verification.
- Final Specular lint and verify exit 0. The spec uses built-in content verification; the paired coverage map assigns behavioral checks to the synthetic integration contracts.
- `fixture3 check --suite datasets --json` executes all 32 passing contract groups and exits 1 for the reviewed additive snapshot difference: the original 28 groups are unchanged and four runner groups are added. Golden files remain owned by the parent; approval is pending there.
- Fresh independent review remains with the parent under this worker's no-further-delegation scope. All inspected dataset content was synthetic contract material.

## Key Files

- `runners/jev.mjs`: shared API, CLI options, snapshots, compatibility, and rescore implementation.
- `scripts/datasets-contract.mjs`: synthetic reader and runner integration coverage.
- `runners/README.md`: API signatures, CLI examples, saved-result fields, and rescore requirements.
- `.plans/2026-10-21-000340-bounded-runner.spec.json` and its `.coverage.json` companion: executable requirements and behavioral coverage map.

## Next Steps

- Runner preparation is ready for development evaluation after the datasets freeze. Keep per-trial prompt contents, original summaries, and inference hashes immutable.
- Complete independent data QA and development tuning before reporting the family as ready. Preserve unrelated dirty files throughout the remaining work.

## Parent Verification

- Fresh independent review approves the permanent runner changes. Parent reviewed and approved the four additive Fixture3 groups; a subsequent check matches all 32 groups.
- Parent replays the historical cache offline: 604 targets and 27 requests reproduce 28 of 29 assigned catches and thirteen false positives across the three original checks.
- Parent reruns Specular lint and verify, changed-source syntax checks, focused ESLint, and formatting successfully.
- Parent reruns all 31 temporary-driver integrity probes and the changed-probability rejection reproduction. Completed outputs remain immutable and the failing probe leaves provider initialization absent.

## Temporary Driver Integrity Follow-Up

- Goal: preserve completed trial inference records and reject altered retained predictions before output writes or SDK initialization.
- Approach: validate baseline `b0` first, validate every retained completed trial through `validateResult` with per-check batches and retained inference records, then compare stored summaries against verified predictions. Create inference records only at first completion.
- Preserve baseline partial resume until its first completion. Require a verified completed baseline before comparisons or new nonbaseline trials.
- Files: update only `/tmp/20261021-000516-tune-puffery.mjs`, private synthetic integration probes outside the repository, and this worklog. Keep permanent runner files frozen.
- Verification plan: execute the actual driver through a private CWD-adjusted copy with two synthetic 200-row datasets, retained prompt snapshots, real runner helpers, and a local SDK initialization trap. Test byte-preserving completed score/run and rejection of altered answers, summaries, and baseline records.

### Implemented And Verified

- Parent fresh QA approved the permanent runner delta and identified silent inference-hash rebinding in the temporary driver. The pre-fix synthetic reproduction changed a valid probability from `0.75` to `0.6`; `score r1` exited 0 and rewrote the output.
- The temporary driver now verifies baseline `b0` first and then every retained trial before trial creation, comparisons, saves, or SDK access. Completed per-check records pass their retained snapshot, summaries, hash, and filtered batches to `validateResult` against current synthetic inputs and retained prompts.
- Completed trials return their verified stored reports without saving. Inference records are created only at first completion; missing completed records, altered comparison summaries, and altered totals also fail validation.
- `node /tmp/20261021-001628-puffery-driver-integrity.mjs` exits 0 with 31 passing subprocess probes against a private CWD-adjusted copy of the actual driver. Two synthetic development datasets contain 200 rows each and use the real dataset, request, snapshot, scoring, and validation helpers.
- Eight completed score/run probes preserve the entire output, verified by identical bytes, inode, and nanosecond modification time. Twenty-one rejection probes preserve those properties and leave the SDK initialization marker absent.
- Rejections cover valid-range probabilities, original and comparison summaries, baseline records, unselected retained trials, deleted completed inference, new-trial attempts with a corrupt baseline, and attempts to use a partial baseline for comparisons.
- A local synthetic SDK completes the three missing baseline batches while preserving the saved batch prefix. Subsequent completed score/run preserve the resulting inference records. A separate offline probe finalizes fully saved batches that had not yet received their first inference record.
- `node /tmp/20261021-001628-puffery-driver-integrity.mjs --reproduce` now exits 0: the driver exits 1 with `Saved predictions or original scores changed.`, preserves the output, and leaves the SDK marker absent.
- Both temporary files pass `node --check` and Prettier using the repository configuration. Every dataset write stays in the private sandbox; provider calls are excluded by the local SDK trap/stub.
- Final 31-probe evidence: `/var/folders/04/60qvc12j259_3sx6n2hxnldc0000gn/T/slopless-puffery-driver-integrity-fBkSzi/proofs.json`. The rejection reproduction is retained separately under the sibling `slopless-puffery-driver-integrity-tZzIkL` sandbox.
- Final temporary driver SHA-256: `fa5b04c6516ac9531557a7c02cebe7eafde73e32b65ec3b94df3262d176a9dac`. The permanent runner remains `f014f0127fc05162eaf5d695dee178cff3a65edbd7f3db6d8c9c1ad2ae83a670`; permanent source, contract, and README files remain frozen.
- Parent review remains the independent completion gate for this temporary-driver fix under the no-further-delegation instruction.
