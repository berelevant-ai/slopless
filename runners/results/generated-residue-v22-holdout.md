# Generated Residue Holdout

Artifacts and model disclaimers pass every assigned holdout collection. Assistant wrappers pass in isolation and fail both mixed collections. Across the residue family, the frozen candidate catches 776/800 expected hits with 28 false positives among 800 no-hits.

## Results

Each row below represents 100 expected hits and 100 expected no-hits. The acceptance bounds remain at least 95 caught hits and at most five false positives.

- Artifact placeholders, cutoff `0.5`:
  - Isolated: 99 caught, one missed, zero false positives. Pass.
  - Mixed A: 100 caught, zero missed, zero false positives. Pass.
- Model disclaimers, cutoff `0.5`:
  - Isolated: 99 caught, one missed, one false positive. Pass.
  - Mixed A: 98 caught, two missed, two false positives. Pass.
  - Mixed B: 95 caught, five missed, zero false positives. Pass.
- Assistant wrappers, cutoff `0.55`:
  - Isolated: 95 caught, five missed, one false positive. Pass.
  - Mixed A: 91 caught, nine missed, seventeen false positives. Fail both bounds.
  - Mixed B: 99 caught, one missed, seven false positives. Fail the false-positive bound.
- Frozen unnecessary-framing comparator, `v13`, cutoff `0.5`:
  - Mixed B: 86 caught, fourteen missed, four false positives. Fail the recall bound; report separately from the residue family.

Artifacts total 199/200 caught hits with zero false positives. Disclaimers total 292/300 with three false positives; wrappers total 285/300 with 25 false positives.

The [assessment record](generated-residue-v22-holdout.json) links all nine native results, source hashes, independent labels and frozen settings. Complete passages and snippets remain in the paired holdout datasets.

## Mixed Passages

- Mixed A contains 200 passages and 600 independent judgments across all three residue checks.
  - Every expected issue is found in 161/172 affected passages. All three answers match in 170/200 passages.
- Mixed B contains 200 passages and 600 independent judgments across disclaimers, wrappers and framing.
  - Every expected issue is found in 155/175 affected passages. All three answers match in 170/200 passages.
- Predictions are joined by collection, passage and full check name. Each check uses its own cutoff; all-negative passages remain eligible for exact-match scoring.

## Reviewed Failures

- The single artifact miss is a dummy testimonial headed "Jane Doe, successful apprentice" (`000130-e93555ca16e1`). Jev preserves the surrounding factual account and misses that unfinished stand-in.
- Disclaimer misses remain concentrated in professional-scope and source-gap narration. The eight misses include an unexamined patient handout and an essay attributing sculpture choices without the artist's correspondence.
  - Three false positives flag useful scope or interpretation limits. Their frozen no-hit labels remain intact; this is the boundary already identified during development.
- Wrapper Mixed A misses eight bracketed drafting instructions and one introduction. Artifacts catches all eight bracketed passages independently.
  - The seventeen false positives flag neighboring source-gap narration, draft descriptions and an unfinished-price marker as wrappers. Check assignments are independently scored against the frozen labels.
- Wrapper Mixed B misses a direction to retain a sponsor's name in a transferred headline. Its seven false positives flag source-gap or capability narration and a pending-source marker.
- The isolated wrapper false positive is ordinary sign-painter dialogue: "Would you like a different version?" The five misses are drafting comments or completion instructions around useful content.
- The comparator misses staged questions and significance lead-ins. Four false positives flag drafting directions or source-gap narration.

## Label Boundaries

Two cross-split comparisons expose inconsistent distinctions that require review before more wrapper tuning. Preserve all labels and measured failures in this assessment.

- Development `000135-9a7376196366` expects no wrapper for "[Insert sponsor quote here.]"; holdout `000136-b4a9d95e0d23` expects a wrapper for "[Insert venue address.]".
  - Both are bare insertion slots surrounded by publishable content. The current definition supplies no consistent distinction for assigning opposite wrapper labels to these examples.
- Development `000137-b00ef6f2bde3` expects a wrapper for a draft venue listing followed by an admission that its capacity was guessed.
  - Holdout `000136-5cecc0abfe1b` expects no wrapper for a draft school profile followed by an admission that its founding year was guessed.
  - These constructions overlap with the prompt's proposed-copy presentation criterion. Their differing expected labels contribute to the mixed-set transfer failure.

For the next development round, reconcile the definitions and labels for these distinctions before tuning. A subsequent independent assessment needs fresh holdout material; current prompts, cutoffs and labels remain frozen.

## Verification

- User authorization is recorded before inference. Candidate commit `cc376f692e6f1348029c6d3f22aef0366fc5ae83` anchors the selected prompts and data.
- Nine runs assess 1,000 passages, 1,600 residue judgments and 200 comparator judgments. Every native result completes thirteen batches at most sixteen questions long.
- Model `jev-1.13.0`, SDK `0.7.0`, classification-only mode and selected cutoffs match development. SDK module and package hashes are captured for every run.
- Public replay verifies native request hashes, completed seals and independently recomputed scores. Input, label, prompt and runner hashes remain identical to registration.
- Fresh independent review verifies all nine complete results, 117 request hashes, SDK receipts, mixed joins, every reported count and both cross-split label conflicts. It confirms six of eight primary combinations pass; the whole family's holdout acceptance fails on wrappers.
- Dataset Fixture3 matches. This assessment leaves production behavior unchanged.
