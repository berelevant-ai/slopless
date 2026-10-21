# Boilerplate And Signposting Development

## Unnecessary Framing

Select and freeze baseline `b0`: 99 of 100 development hits caught, one miss, zero false positives, and 100 correctly unflagged no-hits. It meets the fixed target of at least 95 catches and at most five false positives.

- Use Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode, threshold `>= 0.5`, and two size-100 requests. All 200 complete target passages enter the evaluation.
- The two SDK requests total 1,338.164584 milliseconds, 43,680 input tokens, and 6,208 output tokens. This time measures provider calls rather than credential loading or the surrounding workflow.
- The complete instructions contain 684 words: `prompts/v13/shared.md`, the check body, its question, and explicit yes/no criteria. Their loaded prompt-object SHA-256 is `00fdaa11482b66da50128036bf699f9f0612ed9c35f9e942b04688f7f2967973`.
- The native trial result is `boilerplate-and-signposting-v13-unnecessary-framing-development-tuning.json`. It preserves prompts, input identities, request hashes, probabilities, scores, and execution settings; no revision or additional inference follows this qualifying baseline.
- Fresh independent verification reconstructs both canonical requests byte for byte, validates all 200 responses and scores, and manually reviews the sole error. Public offline scoring and seven tampering checks pass using saved responses.

### Development Demonstrations

- The prompt quotes eight exact selected development passages, highlighting their labeled offending snippets for hits.
  - Hits: `000029-001`, `000029-017`, `000029-159`, and `000029-014`.
  - No-hits: `000029-209`, `000029-002`, `000029-186`, and `000029-218`.
- Excluding those demonstrations leaves 95 of 96 desired hits caught and zero false positives among 96 no-hits. These remain development measurements; the protected holdout assessment follows candidate freezing.

### Reviewed Miss

- `000029-136`, probability `0.48`: "**So where does that leave us?** The reserve account covers two months of rent. Paying the annual insurance premium from it would reduce that cover to five weeks."
- Retain the hit judgment. The opening question advertises the supplied financial point; the remaining sentences explain the reserve's coverage and the proposed payment's consequence. The score falls below the frozen `0.5` threshold.

## Dataset Preparation

- Both full pools contain 240 passages, with 120 hits and 120 no-hits, archived at `49203a48`. Three actual Opus review passes and independent label QA precede balanced selection.
- Selected collections `000029` and `000030` contain 100 hits and 100 no-hits each. All twelve development and twenty-five holdout mandatory cases remain, with unchanged wording, labels, snippets, and source order.
- The protected overlap audit checks all 480 candidates against 15,673 historical files. It finds zero exact or normalized duplicates and zero confirmed cross-split or historical-source near-copies.
- Selected sets retain 99 same-split shared-scenario links: fifty development and forty-nine holdout. Most pair a hit with a no-hit; one full-pool holdout link joins two differently written no-hits. The largest connected scenario group has three passages.
  - These sound contrastive cases test the contribution of framing while retaining similar substantive content. Counts measure passage/check judgments; shared-scenario cases are related observations.
- Archive, ranking, current hashes, surplus IDs, and verification are recorded in the existing two Opus review JSONs. The initial scope-error audit run is discarded; clearance comes from its corrected, frozen-input run.

## Remaining Family Work

- Finish buried-answer complete-text generation and review, freeze both balanced splits after overlap checks, and evaluate its development prompt on intact texts with a capacity-tested batch size.
- Preserve framing's qualifying prompt and labels while that work continues. Run each check's protected holdout assessment once after freezing its candidate and settings, then review and report the complete family.
