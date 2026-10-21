# Boilerplate And Signposting Development

## Unnecessary Framing

Select and freeze baseline `b0`: 99 of 100 development hits caught, one miss, zero false positives, and 100 correctly unflagged no-hits. It meets the fixed target of at least 95 catches and at most five false positives.

- Use Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode, threshold `>= 0.5`, and two size-100 requests. All 200 complete target passages enter the evaluation.
- The two SDK requests total 1,338.164584 milliseconds, 43,680 input tokens, and 6,208 output tokens. This time measures provider calls rather than credential loading or the surrounding workflow.
- The complete instructions contain 684 words: `prompts/v13/shared.md`, the check body, its question, and explicit yes/no criteria. Their loaded prompt-object SHA-256 is `00fdaa11482b66da50128036bf699f9f0612ed9c35f9e942b04688f7f2967973`.
- The native trial result is `boilerplate-and-signposting-v13-unnecessary-framing-development-tuning.json`. It preserves prompts, input identities, request hashes, probabilities, scores, and execution settings; no revision or additional development-tuning inference follows this qualifying baseline.
- Fresh independent verification reconstructs both canonical requests byte for byte, validates all 200 responses and scores, and manually reviews the sole error. Public offline scoring and seven tampering checks pass using saved responses.

### Development Demonstrations

- The prompt quotes eight exact selected development passages, highlighting their labeled offending snippets for hits.
  - Hits: `000029-001`, `000029-017`, `000029-159`, and `000029-014`.
  - No-hits: `000029-209`, `000029-002`, `000029-186`, and `000029-218`.
- Excluding those demonstrations leaves 95 of 96 desired hits caught and zero false positives among 96 no-hits. These remain development measurements; the protected holdout assessment follows candidate freezing.

### Reviewed Miss

- `000029-136`, probability `0.48`: "**So where does that leave us?** The reserve account covers two months of rent. Paying the annual insurance premium from it would reduce that cover to five weeks."
- Retain the hit judgment. The opening question advertises the supplied financial point; the remaining sentences explain the reserve's coverage and the proposed payment's consequence. The score falls below the frozen `0.5` threshold.

### Dataset Preparation

- Both full pools contain 240 passages, with 120 hits and 120 no-hits, archived at `49203a48`. Three actual Opus review passes and independent label QA precede balanced selection.
- Selected collections `000029` and `000030` contain 100 hits and 100 no-hits each. All twelve development and twenty-five holdout mandatory cases remain, with unchanged wording, labels, snippets, and source order.
- The protected overlap audit checks all 480 candidates against 15,673 historical files. It finds zero exact or normalized duplicates and zero confirmed cross-split or historical-source near-copies.
- Selected sets retain 99 same-split shared-scenario links: fifty development and forty-nine holdout. Most pair a hit with a no-hit; one full-pool holdout link joins two differently written no-hits. The largest connected scenario group has three passages.
  - These sound contrastive cases test the contribution of framing while retaining similar substantive content. Counts measure passage/check judgments; shared-scenario cases are related observations.
- Archive, ranking, current hashes, surplus IDs, and verification are recorded in the existing two Opus review JSONs. The initial scope-error audit run is discarded; clearance comes from its corrected, frozen-input run.

## Buried Answer

Select and freeze `buried-r1`: 98 of 100 development hits caught, two misses, zero false positives, and 100 correctly unflagged no-hits. Stop tuning at this first qualifying revision.

- Baseline `b0` catches 98 hits with 22 false positives. The revision catches one previously missed hit, loses one catch, corrects all 22 false positives, and introduces zero new false positives.
- The revised question, criteria, and principle distinguish answer-delaying detours from explanations that deliver the answer through relevant evidence or reasoning. These fields change jointly; demonstrations and shared instructions remain unchanged.
- Use Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode, threshold `>= 0.5`, and batch size 16: twelve requests of sixteen texts and one of eight.
- The selected trial totals 4,049.751125 milliseconds of provider calls, 203,596 input tokens, and 5,852 output tokens. Its largest request uses 18,128 input tokens.
- The complete instructions contain 978 words. Their loaded prompt-object SHA-256 is `5af65a66800aead9e989091570353f094d3ec1dfbbd336396084d79c1065ce01`.
- The native two-trial result is `boilerplate-and-signposting-v13-buried-answer-development-tuning.json`, SHA-256 `17f3899e041485542fc7fbcaa452607c63a52214d28a21bfa91f1bde6cc0ac71`. Preserve its original snapshots, requests, probabilities, and scores.
- Fresh Codex QA reconstructs all 26 canonical requests and 400 decisions, reproduces both scores and transitions, and rejects all 32 cache-mutation tests. Its proof is `/tmp/buried-answer-v13-development-independent-qa.json`, SHA-256 `37c09ec959b7c1be136350aa9d35b3ca345d09524fe57b7a6d82c98dd6a9c709`.

### Development Demonstrations And Misses

- Both prompts quote two complete development texts: hit `000031-022` and no-hit `000031-044`. Excluding them leaves 97 of 99 hits caught; false positives fall from 22 of 99 to zero of 99.
- Newly caught `000031-159` replaces lost catch `000031-179`; `000031-199` remains missed. Preserve their labels and the selected threshold.
- `000031-179`, probability `0.47`, postpones a camping decision behind preparation history. Its early promise mentions a poll whose result is absent, leaving the chosen campsite unspecified.
- `000031-199`, probability `0.45`, postpones usable shipping conditions behind a visit recap. Its early "almost" answer leaves the workable cutoff and pickup arrangements unspecified.
- Parent and fresh QA read both complete missed texts and retain their hit judgments. The independent assessment follows candidate freezing.

### Dataset Preparation

- Both reviewed 240-text pools remain archived at `72f7d7da`: development has 120 hits/120 no-hits; holdout has 117 hits/123 no-hits after three pre-evaluation label corrections.
- Active collections `000031` and `000032` each contain exactly 100 hits and 100 no-hits. Selection preserves selected wording, judgments, snippets, IDs, and relative source order, retaining all 76 development and 100 holdout mandatory cases.
- The 80 surplus texts retain their original labels in the archive. Deterministic selection precedes inference and uses mandatory status and length bands, independently of detector scores.
- Six Codex reviewers inspect all 3,259 overlap candidates against 15,675 historical files containing 28,974,232 normalized words. They require zero repairs; mechanical checks find zero exact/normalized copies and zero stable prefixed-ID collisions.
- The selected sets retain 29 same-split related pairs in 27 connected groups, with at most three texts per group. Scores therefore measure related text/check judgments as well as independent scenarios.
- Actual short/medium/long counts are development hits 24/49/27 and no-hits 24/50/26; holdout hits 23/47/30 and no-hits 18/52/30. Mandatory-first selection preserves hard cases rather than imposing exact final length quotas.
- Fresh applied-file verification confirms all 400 selected texts and labels match the approved proposal and all 176 mandatory cases remain. Its proof SHA-256 is `efcb9482efa18377650f3b7ade0a43521299eccde7dba45ba486fe927bba5264`.

## Assessment Status

- Framing's frozen holdout catches all 100 hits with nine false positives, versus 99 catches and zero false positives on development. The holdout exceeds the fixed five-false-positive target; preserve this transfer failure and the assessed candidate. Its native result and protected error review are in the existing holdout files.
- Buried answer's candidate is frozen at `1bc285f8`. Its once-only holdout catches 94 hits with two false positives, versus 98 and zero on development. Independent protected verification and all eight error reviews pass; preserve the missed reference target and unchanged candidate.
- Dataset records preserve completed Opus opinions separately from authorized fresh Codex reviews after Claude's weekly limit. Source-copy hygiene uses historical writing; detector corpus validation remains a separate V2 stage.
