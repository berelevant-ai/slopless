# Sentence Frame Prompt Repair

Both prompt revisions perform worse overall than the unchanged `v19` baseline. The original prompt remains active; the failed `v20` authoring files are removed, and their exact contents remain in the experiment JSON and producing Git commits.

## Procedure

- Keep all 600 development passages and judgments fixed across isolated, mixed-A and mixed-C collections. Every collection has 100 desired hits and 100 no-hits.
- Freeze each prompt before inference. Preserve Jev `jev-1.13.0`, SDK `0.7.0`, threshold `0.5`, classification-only mode and batch size sixteen. Shared instructions remain unchanged.
- Candidate one prioritizes repeated words and their own function; candidate two moves the two-adjacent-takeaway branch first and explicitly distinguishes beginnings, internal wording and endings. Each uses three positive and three negative development demonstrations.
- Stop after two consecutive failures to improve the best total-error score. Retain baseline, then run one fresh confirmation and replay the existing context diagnostics.
- Keep holdout writing outside authoring and inference. Existing holdout observations influenced this task; a later independent assessment needs fresh holdout data.

## Scores

Each caught count is out of 100 positives and each false-finding count is out of 100 no-hits.

### Fresh Baseline

- isolated: **100/100 caught**, **4/100 false findings**.
- mixed-a: **97/100 caught**, **62/100 false findings**.
- mixed-c: **97/100 caught**, **6/100 false findings**.

Total errors: **78**.

### Candidate One

- isolated: **92/100 caught**, **1/100 false findings**.
- mixed-a: **91/100 caught**, **54/100 false findings**.
- mixed-c: **80/100 caught**, **4/100 false findings**.

Total errors: **96**.

### Candidate Two

- isolated: **100/100 caught**, **8/100 false findings**.
- mixed-a: **100/100 caught**, **72/100 false findings**.
- mixed-c: **100/100 caught**, **8/100 false findings**.

Total errors: **88**.

### Retained Baseline Confirmation

- isolated: **100/100 caught**, **4/100 false findings**.
- mixed-a: **97/100 caught**, **61/100 false findings**.
- mixed-c: **97/100 caught**, **6/100 false findings**.

Total errors: **77**.

## Changes Versus Baseline

- Candidate one gains one positive, loses 32, corrects 21 false findings and introduces eight.
- Candidate two gains six positives, loses none, corrects five false findings and introduces 21.

## Demonstration Exposure

The JSON preserves literal demonstration IDs and scores excluding every frame demonstration from the earlier family trials and this repair. These exclusions change the denominators.

### b0

- isolated: 8 demonstrations excluded; 95/95 caught and 4/97 false findings.
- mixed-a: 5 demonstrations excluded; 97/100 caught and 59/95 false findings.
- mixed-c: 0 demonstrations excluded; 97/100 caught and 6/100 false findings.

### c1

- isolated: 8 demonstrations excluded; 88/95 caught and 1/97 false findings.
- mixed-a: 5 demonstrations excluded; 91/100 caught and 52/95 false findings.
- mixed-c: 0 demonstrations excluded; 80/100 caught and 4/100 false findings.

### c2

- isolated: 8 demonstrations excluded; 95/95 caught and 8/97 false findings.
- mixed-a: 5 demonstrations excluded; 100/100 caught and 70/95 false findings.
- mixed-c: 0 demonstrations excluded; 100/100 caught and 8/100 false findings.

## Interpretation

Candidate one loses 27 intended takeaway pairs, three distinctive-subject triples, one ordinary opening triple and one internal frame. Candidate two restores all 32 lost catches but increases false findings. Both revisions fail the fixed quality bounds.

- `000057-013450f259fd`: Candidate one misses "The result is greater ease. The result is improved convenience." despite retaining this exact positive demonstration.
- `000057-04d1770ebae5`: Candidate one misses "Anticipation filled the kitchen. Anticipation colored the afternoon. Anticipation shaped the silence."
- `000075-857a9bb81019`: Candidate one misses three "The purpose is ..." statements that repeat identifying change.

These losses describe observed responses to the complete revised prompts. Testing individual instruction changes separately would be needed to identify which change caused each loss.

The retained prompt still flags ending-only repetition. On `000071-8cb62df650df`, three statements end "goes a long way"; both rewrites correctly stop flagging them. On `000071-3e749972aa50`, three statements end "comes first"; every version flags them incorrectly for frames.

## Label Review

A fresh reviewer read all 133 passages with errors or changed predictions against the accepted definition. Two frozen no-hit labels remain disputed; the reported scores preserve their original judgments.

- `000071-18bec5d783cd`: "At a deeper level, this develops insight. At a deeper level, this builds understanding. At a deeper level, this promotes comprehension."
- `000071-8f1a3900997e`: "In practical terms, this reflects connection. In practical terms, this expresses togetherness. In practical terms, this embodies a shared bond."

The reviewer judges both as defective repeated frames. Their opening phrases also fall near the prompt's connector-only exclusion. Every tested version flags both, so changing these judgments would leave the candidate ranking unchanged.

## Diagnostics And Verification

- The retained prompt flags 22/32 selected context probes and 3/8 semantic probes. Their provisional judgments are all no-hits; these targeted probes diagnose known failures separately from the balanced evaluation.
- The independent audit verifies all 14 saved outputs, frozen inputs, request records, scores and producing prompt commits: 2,440 judgments in 159 requests.
- `pnpm run validate` passes build, formatting, lint, spelling and full type coverage. The six paragraph-runner tests pass; Fixture3's dataset suite matches its approved output.
- Initial Fixture3 attempts exit 2 without results; the initial paragraph test fails because the compiled sentence module is absent during a concurrent build. Both suites pass after the build completes; the experiment record preserves both attempts.

Original definitions, labels and the active `v19` prompt remain unchanged by this repair. No holdout inference ran. The experiment JSON preserves review notes, rejected prompts, verification summaries and per-passage changes.
