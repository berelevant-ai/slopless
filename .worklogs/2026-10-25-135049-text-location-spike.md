# Text Location Spike

## Summary

Test location selection for whole-text buried-answer and repeated-explanation findings. Reuse the frozen detectors and development texts while Jev selects native paragraph IDs with full-text context.

## Decisions

- Preserve production code, detector prompts, labels and holdouts. Run one new shared location prompt before considering revisions.
- Use textlint visitors and reports for original positions, including nested list and quotation paragraphs. Keep existing labeled snippets outside model requests.
- Separate detector mistakes, missed locations, extra selections and incomplete localization. Review extras against complete texts before deciding whether they are false positives.

## Context

- `.plans/2026-10-25-135049-text-location-spike.md` defines the experiment.
- `runners/results/boilerplate-and-signposting-v13-buried-answer-development-tuning.json` contains the selected buried-answer detector trial.
- `runners/results/repeated-explanation-v16-development.json` contains the selected repeated-explanation detector trial.

## Next Steps

- Define reporting targets consistently before revising the location prompt. Preserve original detector results, labels and raw location predictions; independent assessment needs fresh holdout material.

## Results

- The two frozen detectors flag 201 of 400 development texts. New inference runs 1,501 location judgments in 201 requests, with 11.74 seconds of three-worker inference wall time.
- Buried answer locates a reference paragraph in 86/98 detected positives, leaving twelve empty outputs. Repeated explanation locates one in 96/98, selecting every reference paragraph in fifty.
- Buried-answer references include delayed-answer anchors that the prompt intentionally preserves, causing zero complete-reference matches. Manual review separates this role mismatch from missed unwanted run-up.
- Fresh reviewers inspect all extra selections, all empty outputs and all gated no-hits within 44 complete texts. Original labels remain unchanged; detailed judgments are attached to the result.
- Dataset Fixture3 and six existing paragraph contracts pass. Offline-only verification repairs normalize undefined textlint report fields and protect saved summaries, errors and runtime provenance; requests and raw predictions remain unchanged.
- Final fresh verification passes all 201 requests, 1,501 decisions, 345 native ranges, demonstration exclusions, sample-scoped review totals and eleven tamper probes. The inference seal remains unchanged.
