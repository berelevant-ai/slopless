# Preserve Expanded Inflated Development

## Summary

Preserved the complete inflated-evaluation development pool before balanced selection: 277 passages, with 137 hits and 140 no-hits. This archive adds reviewed understated comparisons and superlative claims about learning from failure or ordinary moments.

## Decisions

- Retain all 200 initial passages and 77 new passages before selecting the final 100/100 set.
- Change passage 253 to no-hit after independent adjudication of the narrator's stance. Use an earlier Opus snippet for passage 195 because it includes both the quoted claim and its endorsement.
- Freeze 82 mandatory passages, balanced at 41 per class, before selection or Jev inference. Preserve every surplus passage and its reviewed label in this commit.
- Keep all holdout content outside the prompt-authoring context. Independent full-pool and selected-subset reviews remain completion gates.

## Verification

- The dataset reader validates all 277 passages, their ranges, checksum, and exact hit snippets. Parent inspection confirms the 253 judgment and the 195 snippet.
- Prettier checks pass for the Markdown, labels, and compact review record, with prose wrapping preserved.
- The review record links three-pass coverage for every passage. Fresh independent verification of the new source branch remains in progress; this archive preserves the input to that review.

## Key Files

- `datasets/ai-synthetic/passages/000019-puffery-and-overstatement-inflated-evaluation-development.md` and paired labels.
- `runners/results/inflated-evaluation-development-opus-review.json`.

## Next Steps

Resolve independent review objections, then select exactly 100 hits and 100 no-hits under the frozen mandatory-first policy. Freeze both development sets before prompt tuning.
