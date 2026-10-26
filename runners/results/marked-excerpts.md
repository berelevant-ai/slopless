# Marked Excerpt Trial

The marked input improves the labeled prose and heading controls but worsens lists, misses three required wording hits and introduces off-target errors. The article gains useful catches alongside more false assignments. Keep the production input unchanged while resolving these failures.

## Exact Change

- The experimental [shared prompt](../../prompts/v24/shared.md) is the four-paragraph instruction shown to the user. It replaces the earlier target-paragraph reading instructions.
- `state.text` contains one excerpt with the native target enclosed by `<target kind="heading|paragraph|list-item">` and `</target>`. Context remains in its original source order around that target; article heading ancestry can precede the excerpt.
- Each question names the marked target and keeps its original rulebook, examples and yes/no criteria. Inflated evaluation uses the exact question shown to the user; other checks ask whether the target contributes an instance of their named issue.
- The model remains Jev `1.13.0`, SDK `0.7.0`, with the original per-check thresholds. This tests the complete proposed request arrangement, including changed shared and question wording.
- The [runner](../article-context.mjs) retains native source ranges independently of the marked excerpt. Production source, rule definitions and accepted model outputs remain unchanged.

## Structural Controls

- [The existing development collection](../../datasets/ai-synthetic/passages/000140-structural-context-development.md) supplies forty underlying examples represented in three structures: 120 assigned-check judgments.
- Both arrangements use full batches: 52 questions per paragraph/list target and seventeen per heading. The earlier 120 baseline responses are reused only after exact request-hash equality.
- Under the original frozen labels, both arrangements catch all sixty positive controls. False positives decrease from 25 to fourteen among sixty no-hits.
  - Prose: twenty of twenty hits retained; false positives decrease from nine to four out of twenty.
  - Headings: twenty of twenty hits retained; false positives decrease from nine to two out of twenty.
  - Lists: twenty of twenty hits retained; false positives increase from seven to eight out of twenty.

### Required Wording Hits

- The user's subsequent instruction requires "narrower remit" to remain flagged even with an explanation. The three corresponding original no-hits are `000140-061`, `062` and `063`.
- Under this product-policy view, the assigned checks catch 63 of 63 desired hits with 22 false positives among 57 remaining no-hits. Marked input catches sixty of 63 under those assigned checks with fourteen false positives among the 57 no-hits.
- The marked arrangement misses all three explained-remit wording cases at `.36`, `.21` and `.43`; the baseline flags them at `.62`, `.58` and `.54`.
- These are misses under unspecified scope. Hollow significance still flags the prose and list variants at `.52` and `.56`; the heading receives no finding from any enabled check and passes.
- Original labels stay preserved because the frozen unspecified-scope definition permits explained boundaries. Record the required wording behavior separately while revising that definition consistently.

### Per-Check Results

Under the original labels, every check retains twelve of twelve positives across all three structures:

- Empty takeaway: false positives decrease from six to three among twelve no-hits.
- Hollow significance: false positives decrease from nine to seven among twelve no-hits.
- Unspecified scope: false positives decrease from six to two among twelve no-hits, including the three wording hits whose original NO labels are disputed.
- Inflated evaluation: false positives decrease from four to two among twelve no-hits.
- Unnecessary framing: zero false positives in both arrangements among twelve no-hits.
- These counts score the 120 assigned-check labels. Marked batches also produce 231 other-check findings, compared with 183 previously; their correctness is unassessed by this collection's labels.

## Defects Outside The Target

- [The localization collection](../../datasets/ai-synthetic/passages/000141-marked-target-localization-development.md) supplies thirty targeted negatives derived from ten underlying examples in three structures.
- Each complete passage contains a named defect outside its clean target. Positive passage labels identify that context defect with exact snippets; the targeted evaluation expects silence because those snippets occur outside the selected node.
- A fresh restricted reviewer approves all thirty passage labels, clean-target judgments and source boundaries before inference.
- The previous input makes zero assigned-check errors. Marked input makes two out of thirty: one prose target and one heading.
  - Target: "Payments settle on the next working day."
  - Outside text: "Choosing this provider carries a price. Procurement received its proposal on Wednesday."
  - Hollow significance wrongly flags the clean prose target at `.52` and heading at `.67`.
- There are four additional marked findings under checks absent from these labels, compared with zero previously. Three flag the literal renewal-meeting time as hollow significance; another flags refund-retrieval wording as redundancy.

## BGaming Article

- Run all 123 paragraphs and thirty headings of [the unchanged article](../../datasets/ai-normal/texts/000139-bgaming-b2b-igaming-solutions.md) under the same question eligibility as the previous trial.
- Paragraph findings increase from eighteen to 29; list findings increase from five to ten. Both arrangements produce zero heading findings when section context is supplied.
- Failures across the 34 named article no-hit judgments decrease from seven to six. The additional findings require the full audit below rather than interpreting that subset count as overall precision.

### Useful Findings

- Line 48, hollow significance: "shapes the digital gambling experience you can offer" is recovered at `.55`.
- Line 147, sweeping generalization: "remembers the wait longer than the win" remains caught at `.67`. Both previously confirmed article defects now fire; the prior input caught only one.
- Line 113, redundancy: "B2B compliance tools for regulatory compliance checks" repeats the function without adding a distinction.
- Line 56's duplicated launch setting remains assigned to wordiness, although the definition places it under redundancy.
- Line 102's removable "sections below" narration is newly assigned to wordiness, although its defect belongs to framing.
- Line 71's "narrow platform" is a desired hit under the user's wording policy. Its qualitative comparison supplies scope under the frozen definition, so count this usefulness separately from correctly assigned frozen-check findings.

### False Assignments

- Twenty-three of the 29 assignments are false, in addition to the two useful edits assigned to the wrong checks and the separate wording-policy hit. Three findings match their frozen named definitions.
- New placeholder findings flag ordinary list text at lines 159, 219 and 239: "Prepaid vouchers and mobile payments", "Termination duties: customer-data transfer planning" and "The product differentiation that justifies any custom work".
- Line 205's question "Who owns support when a connected service fails" receives both missing-actor and unspecified-scope findings. The question requests an answer rather than promising that the passage already supplies one.
- Line 113 also receives circular explanation, although the bare function label asserts no purported reason. Line 194's useful distinctions among scalability, security and support receive formulaic-enumeration criticism.
- Additional wordiness assignments at lines 25, 64, 106, 165, 194 and 230 fail to establish the specific padding required by that check. Existing framing, scope and significance false flags persist elsewhere.
- The exact comparison has twenty additions: two correct named-check catches, one useful wrong-check finding, one wording-policy hit and sixteen false assignments.
- Nine assignments disappear: eight confirmed false flags and the unresolved annual-cap completeness concern. Preserve that concern as unresolved rather than counting it as a verified correction.

### Marker Diagnostic

- Six additional requests compare HTML target markers with plain-language delimiters on the three newly flagged placeholder targets, preserving the question and source words.
- HTML/plain probabilities are `.46/.75` for prepaid vouchers, `.51/.53` for termination duties and `.51/.46` for product differentiation.
- Plain delimiters fail to provide a consistent repair. Both forms produce false placeholder findings; the evidence does not identify HTML syntax alone as the cause.

## Verification

- All three recordings complete: 240 structural responses including 120 reused baseline responses, sixty localization responses and 153 article responses. The marker diagnostic preserves six additional responses.
- Thirty-three requests initially exhaust rate-limit retries: nine structural, three localization and 21 article requests. Resumption submits only those missing requests, and attempt history remains saved.
- Native marker boundaries match source text for every target. Independent review validates model, frozen rulebooks, criteria, thresholds, request hashes, label provenance, controls and all 29 article assignments.
- Review finds that the old scorer reads live registry thresholds. The repair makes it use saved definitions and reject changed dataset-label hashes before scoring; offline rescoring preserves all reported results.
- Syntax, lint, formatting, dataset validation and the existing dataset and shared-runtime Fixture3 suites pass. No holdouts are read and no model output is promoted into approved fixtures or labels.

## Reproduce

Recordings: [structural controls](marked-excerpts-controls.json.gz), [localization controls](marked-excerpts-localization.json), and [BGaming article](marked-excerpts-article.json.gz). The runner reads compressed recordings directly; offline scoring writes an uncompressed JSON copy.

```sh
node runners/article-context.mjs prepare-controls --marked --reuse runners/results/article-context-batched-controls.json --output runners/results/new-marked-controls.json
node runners/article-context.mjs prepare-controls --marked --dataset datasets/ai-synthetic/passages/000141-marked-target-localization-development.md --output runners/results/new-marked-localization.json
node runners/article-context.mjs prepare --marked --output runners/results/new-marked-article.json
JEV_API_KEY=... node runners/article-context.mjs run --output runners/results/new-marked-controls.json
```

Run the other prepared recordings with the same `run --output FILE` command. Use `score --output FILE` for offline reconstruction against frozen thresholds and labels.

## Decision

Preserve the marked trial as experimental. Its better prose and heading controls coexist with worse lists, missed required wording hits and incorrect target selection. The next request revision must retain the original check-specific question semantics and verify explanation use and target ownership separately.
