# Semantic-thinness Holdout Results

The earlier direct prompt caught 358/364 expected hits and flagged 24/240 expected passes. The selected revision caught 350 and flagged 15; it reduces false alarms at the cost of missed slop.

## Dataset And Execution

- [The dataset](../../../../datasets/holdout/semantic-thinness/README.md) contains 604 independently generated paragraphs, 24,046 words, and the original author labels.
- Its 37 folders use the 36 existing pattern IDs and `superficial-analysis`. Each paragraph has one primary group; the target text and label records are preserved unchanged.
- Four frozen configurations ran on every paragraph using `jev-1.13.0` and a fixed threshold of 0.5. Requests carried the saved task and rulebook, neutral IDs, and target prose.
- Each paragraph received one decision per option. Requests batched at most 100 decisions and retained the earlier shared paragraph-map layout; direct options additionally put the target text in each question.
- Labels, evidence, explanations, group names, and Claude reviews stayed outside classification requests. The rulebooks and question wording came from prior saved requests, with target IDs and text substituted.
- The complete round returned 2,416 valid scores in 28 requests, totaling 9.12 seconds of measured request time. The SDK reported 460,672 input tokens and 50,848 output tokens.
- The fresh-built deterministic reference loaded only the worktree's two public family rules through textlint. It uses `0.2.42-dev.0` source and default rule options.
- Scores measure paragraph-level agreement with the synthetic author labels. Group assignments identify intended constructions; Jev returned a single score rather than a pattern name or evidence span.

## Overall Results

- **681 words, indirect target:** 345/364 catches (94.8%), 19 misses, and 15/240 false alarms (6.3%).
- **681 words, direct target:** 358/364 catches (98.4%), 6 misses, and 24/240 false alarms (10.0%).
- **868 words, direct target:** 352/364 catches (96.7%), 12 misses, and 16/240 false alarms (6.7%).
- **878 words, direct target:** 350/364 catches (96.2%), 14 misses, and 15/240 false alarms (6.3%).
- **Deterministic family:** 223/364 catches (61.3%), 141 misses, and 35/240 false alarms (14.6%).

## What Improved And Degraded

- Switching from the earlier indirect configuration to its direct counterpart recovered 13 expected hits and lost zero existing catches. It corrected two expected passes and introduced 11 false alarms.
  - Both use the same 681-word rulebook and task. The direct configuration changes question wording and structure as well as target placement, so the measured difference applies to that combined change.
  - Recovered examples include the unexplained "The timing counted" (`291`), an unexplained glance (`326`), and "The report adds another surface to the audit" (`559`).
- Moving from the direct 681-word prompt to the selected 878-word prompt recovered three hits and lost 11. It corrected 12 expected passes and introduced three false alarms.
  - It preserves literal numbering of an auction chair (`280`), a bodily reaction with a stated fear (`335`), and a quoted gaze with a stated purpose (`356`).
  - It loses "That helped a lot" with no stated outcome (`223`), "The audit became specific" with no changed content (`243`), and "That was the missing piece" with no identified gap (`407`).
  - It starts flagging the fully explained safety significance of a kettle vent (`220`) and two cost claims with stated mechanisms (`408`, `457`).
- The 868-word revision has 28 total disagreements, versus 29 for the selected 878-word revision. Relative to 868 words, the selected option recovers one hit, loses three, corrects two passes, and introduces one false alarm.
- The previously selected prompt therefore improves on the old indirect baseline by five net catches at the same false-alarm count. The strongest catch rate comes from the earlier direct configuration.

## Remaining Failures

- All four options miss three intended hits: "I turned away" without a purpose (`346`), "We followed his gaze to the yard" without an observation (`381`), and an unexplained tea/salt-versus-bread scent contrast (`534`).
- The six misses from the highest-catch option additionally include an unspecified lesson being allowed to be seen (`202`), "The doorway went dark" without a cause (`442`), and an unspecified framing influencing participants' interests (`489`).
- The selected prompt's 15 false alarms fall into four observed groups.
  - Eight paragraphs quote or discuss defective wording: `058`, `195`, `290`, `297`, `464`, `510`, `567`, and `569`.
  - Four explain the significance or waste being asserted: `053`, `220`, `408`, and `457`.
  - One supplies the concrete event causing relief: `560`.
  - Two use Markdown structure: the heading `601` and disputed bare bullet `602`.
- For example, `464` quotes Pavel's boring-remedy line and then describes his editor deleting it for failing to name the remedy. All four options flag the paragraph, including both revisions that explicitly preserve attributed wording discussed as wording.
- The deterministic reference catches literal or explained language that all four Jev options preserve, including optical "focal point" (`302`) and measured alignment (`588`, `597`). Its 141 missed positives also show how many fresh semantic variants escape the current templates.

## Label Disputes

- Original labels remain in every score. The earlier Claude audits proposed changing `175` from hit to pass and `602` from pass to hit; both await judgment.
- Every Jev option flags both records. Adopting both proposed changes would exchange one true positive and one false positive, leaving every Jev option's aggregate counts and ranking unchanged.
- For the deterministic reference, adopting both proposed changes would correct two errors. Its totals would become 224 catches, 140 misses, 34 false alarms, and 206 correct passes.
- [The first audit](../../../../datasets/holdout/semantic-thinness/claude-label-review.md), [second audit](../../../../datasets/holdout/semantic-thinness/claude-label-review-002.md), and [coverage review](../../../../datasets/holdout/semantic-thinness/coverage-review.md) retain the other boundary questions and rationale objections.

## Results By Construction

Each entry gives the number of expected hits and passes, followed by five pairs of **caught hits / false alarms** in this order: 681 indirect; 681 direct; 868 direct; 878 direct; deterministic family.

- `abstract-agency-personification`: 16 hits, 4 passes; 16/0; 16/0; 16/0; 16/0; 0/0.
- `abstract-contrast`: 5 hits, 4 passes; 5/0; 5/0; 5/0; 5/0; 1/0.
- `abstract-metaphor-claim`: 40 hits, 17 passes; 39/1; 40/1; 40/1; 40/1; 21/0.
- `abstract-personification-line`: 4 hits, 3 passes; 3/0; 4/1; 4/0; 4/0; 4/1.
- `body-emotion-shorthand`: 6 hits, 7 passes; 6/0; 6/2; 6/0; 6/0; 6/1.
- `body-knows`: 6 hits, 3 passes; 6/0; 6/0; 6/0; 6/0; 6/3.
- `deictic-summary`: 27 hits, 5 passes; 27/0; 27/0; 25/0; 25/0; 25/1.
- `different-job-summary`: 1 hit, 2 passes; 1/0; 1/0; 1/0; 1/0; 1/0.
- `emotion-as-substance`: 15 hits, 7 passes; 15/2; 15/1; 15/1; 15/1; 10/0.
- `empty-atmosphere-shift`: 6 hits, 5 passes; 6/1; 6/1; 6/1; 6/1; 6/0.
- `empty-emotional-weather`: 4 hits, 4 passes; 4/1; 4/2; 4/0; 4/0; 4/0.
- `empty-quantification`: 1 hit, 7 passes; 1/1; 1/1; 1/0; 1/0; 1/0.
- `empty-scene-state`: 9 hits, 5 passes; 7/0; 8/0; 9/0; 9/0; 9/2.
- `empty-scene-transition`: 5 hits, 4 passes; 5/0; 5/0; 5/0; 5/0; 5/3.
- `empty-significance-occasion`: 5 hits, 2 passes; 4/0; 4/0; 5/0; 5/0; 5/1.
- `fixed-metaphor-frame`: 1 hit, 3 passes; 1/0; 1/0; 1/0; 1/0; 1/0.
- `gaze-choreography`: 9 hits, 9 passes; 7/0; 8/1; 8/0; 8/0; 4/2.
- `generic-lesson-extraction`: 8 hits, 10 passes; 7/3; 8/4; 8/4; 7/3; 4/1.
- `generic-pressure-or-stakes`: 4 hits, 3 passes; 4/0; 4/0; 4/0; 4/0; 4/0.
- `generic-realization`: 9 hits, 9 passes; 9/0; 9/1; 9/1; 9/1; 4/0.
- `hollow-significance`: 30 hits, 22 passes; 28/1; 30/2; 27/2; 27/3; 24/10.
- `low-information-physical-blocking`: 5 hits, 12 passes; 3/0; 4/0; 4/0; 4/0; 4/0.
- `missing-conversation-plan`: 3 hits, 2 passes; 3/0; 3/0; 3/0; 3/0; 3/0.
- `point-is-frame`: 6 hits, 4 passes; 5/0; 6/0; 6/0; 6/0; 5/1.
- `puffery-evaluative-claim`: 19 hits, 7 passes; 19/0; 19/0; 19/0; 19/0; 2/0.
- `real-work-begins`: 5 hits, 4 passes; 5/1; 5/1; 5/0; 5/0; 4/1.
- `recursive-meaning-frame`: 18 hits, 6 passes; 18/1; 18/1; 18/1; 18/1; 4/0.
- `sensory-instead-of-frame`: 7 hits, 9 passes; 6/0; 6/0; 6/0; 6/0; 0/0.
- `silence-as-actor`: 8 hits, 5 passes; 7/0; 8/0; 8/0; 8/0; 7/0.
- `solution-boring-frame`: 11 hits, 7 passes; 8/1; 11/2; 11/2; 9/1; 11/1.
- `something-shifted`: 13 hits, 8 passes; 13/1; 13/1; 13/1; 13/1; 10/0.
- `summary-fog-transition`: 6 hits, 4 passes; 6/0; 6/1; 6/0; 6/0; 1/0.
- `superficial-analysis`: 6 hits, 6 passes; 6/0; 6/0; 6/0; 6/0; 6/2.
- `truth-answer-moves`: 10 hits, 3 passes; 9/0; 9/0; 10/0; 10/0; 6/3.
- `vague-connective-payoff`: 9 hits, 3 passes; 9/0; 9/1; 7/0; 7/0; 7/1.
- `vague-summary-cost`: 7 hits, 6 passes; 7/1; 7/0; 7/2; 7/2; 2/1.
- `vague-threshold-change`: 20 hits, 19 passes; 20/0; 20/0; 18/0; 19/0; 6/0.

## Evidence And Reproduction

- `inputs.json` records dataset hashes, frozen prompt/task hashes, batch membership, request hashes, model, and threshold.
- Each option folder contains seven request/response pairs. `results.json` retains every score, deterministic finding, error ID, per-group total, and timing.
- `run.mjs` validates all 604 target/label records and all eight audit JSON files against commit `90aaae9` before evaluation or scoring.
- The runner uses the existing `@typesafe-ai/sdk` 0.7.0 installation under `.fixture3/jev-paragraph-probe` and the approved Jev credential from 1Password. Credentials stay in process memory.
- Manually inspected all 57 paragraphs with at least one Jev disagreement and all 35 deterministic false alarms. The original labels and prompts remain frozen after this comparison.
- This evaluation now supports choosing between existing configurations. Prompt changes informed by these failures need a separate fresh set for an independent test.

From the repository root, validate saved inference and regenerate scores with:

```sh
node developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout-comparison/run.mjs validate
node developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout-comparison/run.mjs summarize
```

The `run` mode resumes missing responses and validates existing ones. The `prepare` mode refuses to overwrite the frozen input manifest.
