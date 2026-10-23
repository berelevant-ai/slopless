# Freeze Narrative Data And Development Demonstrations

## Summary

Select balanced isolated evaluation data for the full Narrative Craft family and preselect six development demonstrations for each remaining prompt before inference. A fresh mechanical audit verifies the first 7,200-row selection; subsequent pre-inference annotation review corrects four labels in two collections.

## Decisions

- Preserve 2,220 pilot and reviewed hard cases through deterministic selection from archived candidates. Keep the previously frozen emotion-telling pair byte-identical.
- Use explicit curator replacements as rewrite provenance when a collection-wide decision explains several rows. Compare original and current rows independently to identify changed wording and labels.
- Preserve the four newly disputed passages and correct their judgments before testing. The developed reconciliation metaphor becomes a no-hit; three generic emotional interpretations of pauses become hits.
- Archive the two corrected 240-row pools before selecting their balanced replacements. Keep all other isolated selections and all 102 preselected demonstrations recorded.
- Exclude four unadopted holdout replenishment candidates whose snippets accidentally reached the authoring context. Generate fresh replacements under protected contexts; preserve this incident in the review record.

## Verification

- A fresh audit passes all 43 mechanical check groups for the initial 36-collection selection. It checks archived source hashes, exact text, minimal labels, 100/100 balance and all mandatory retention.
- The lexical screen finds zero candidates across 3,414,982,560 comparisons of 10,560 current passages against prior datasets, fixtures and definition examples.
- All seventeen demonstration-selection executions finish successfully. Schema, development-only input scopes, six distinct IDs, three examples per class and the 580-word combined-example limit pass.
- Independent blind review agrees with the four proposed annotation corrections. These checks have no detector responses, so judgments remain independent of model performance.
- The public dataset reader and all six paragraph-runner contract tests pass. The archived-candidate commit `7160d5a6` passes all four GitHub workflows.

## Key Files

- `runners/results/narrative-craft-v21-data-review.json` records selected and corrected sources.
- `runners/results/narrative-craft-v21-isolated-freeze-audit.json` preserves the mechanical audit before annotation correction.
- `runners/results/narrative-craft-v21-development-tuning.json` records demonstrations selected before inference.

## Next Steps

- Finish the two corrected selections and mixed-set replenishment. Test the remaining isolated prompts, then all applicable mixed development inputs; preserve every response and confirm selected prompts against the fixed quality bounds.
