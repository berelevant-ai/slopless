# Complete Three-Family Classification

## Summary

All five checks meet the fixed development target on independently reviewed balanced sets. Buried answer's frozen holdout catches 94 hits with two false positives; independent protected verification and all eight complete-text error reviews pass.

## Decisions

- Preserve the first qualifying buried-answer candidate frozen at `1bc285f8`. Its holdout misses the 95-catch reference by one; keep prompts and labels fixed after that assessment.
- Separate development completion from transfer results. Vague attribution meets the same target on holdout; prestige padding, staged opposition, framing, and buried answer require fresh development/holdout rounds before deployment.
- Update only progress in the accepted taxonomy. Preserve every definition and all model inputs; the parent verifies the frozen taxonomy hash after native completion and before editing progress.
- Preserve native result bytes, existing protected error reviews, and unrelated term-policy changes. The task covers isolated classification; mixed sets, broad detector corpus validation, highlighting, and production integration follow the established V2 workflow.

## Verification

- Native buried assessment contains thirteen requests and 200 decisions on complete texts. It catches 94/100 hits, misses six, correctly leaves 98/100 no-hits unflagged, and produces two false positives.
- Its saved calls total 4,493.154917 milliseconds, 205,599 input tokens, and 5,852 output tokens. Native SHA256 is `3b05e421e6f8ac18a421266f51b1201487ae0bebb8452d1f7b6f87e579c6ee19`.
- Public offline scoring exits zero and reports a complete result. Frozen prompts, paired holdout files, runner, reader, and taxonomy match `1bc285f8` after inference; taxonomy SHA256 is `7afb254333c8f7154395e64f070ccfd70a53b896cede4ff794d5687f27be40b2` before the progress update.
- Fresh completion audit verifies all ten active splits have exactly 100 hits and 100 no-hits, matching text checksums. It reproduces the five development summaries and four earlier holdout summaries from saved results.
- Freeze `1bc285f8` passes CI on Node 22/24, CodeQL, Code Quality, and Scorecard. Dataset validation, Fixture3's dataset suite, formatting, and diff checks pass at the freeze.
- Fresh protected QA reproduces all thirteen requests and 200 decisions, validates models/usage/hashes, retains every error label after full-text review, and approves the finalized report. Its proof SHA256 is `2635640815adae79d6ab364639abd1bc7cbb4e19d253c61c8bdf3dab082c1fee`; it makes zero provider calls.
- Final dataset validation again passes 15,677 documents and 22,253 labels, including seventeen holdout documents. Fixture3's dataset suite matches its approved output; scoped formatting and diff checks pass.

## Key Files And Next Steps

- The accepted taxonomy and sequential execution plan record definitions, reviewed data requirements, selected candidates, transfer failures, and the remaining V2 stages.
- Existing reports under `runners/results/` preserve per-check scores, immutable trial history, protected holdout assessments, and manual error reviews. Root `prompts/v11/`, `v12/`, and `v13/` contain the selected instructions.
- The three-family isolated development and assessment work is complete. Preserve all five selected candidates and assessed holdouts; future revisions informed by these results require fresh development/holdout rounds under `AGENTS.md`.
