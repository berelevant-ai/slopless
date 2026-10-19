# Claude Holdout Label Audit

## Summary

- Ran the requested `claude -p` audit over all 100 holdout paragraphs and original labels, with 55 source/instruction files for context. The response identifies `claude-fable-5-1`; execution completed successfully in 122.948 seconds.
- Claude recommends zero label changes. Its three formal objections concern one incorrect explanation and two ambiguous boundaries; it also mentions two related records.

## Decisions

- Disabled filesystem, execution, and MCP tools for the review. Supplied source text through stdin and required structured output with complete checked-ID coverage.
- Kept label review separate from classification benchmarking. Updated the holdout policy to permit this expressly authorized audit while withholding labels from benchmark requests.
- Preserved all original labels and texts. Saved the three formal objections and the two related cases with complete paragraphs for the user's judgment.

## Verification

- Verified successful process/model status, exact coverage of all 100 IDs, original labels, and exact evidence substrings. Both holdout hashes and the selected Jev prompt remain unchanged.
- Checked the five discussed paragraphs against their original labels. The source emotion pattern preserves stated causes; the real-work pattern preserves concrete work items, supporting the report's boundary questions.
- A separate reviewer checked the report against the saved Claude response, original records, and rule definitions, and found no discrepancies. Mechanical checks also confirmed all five quoted paragraphs and all 55 source hashes.
- No Jev calls or Slopless runs were made. This audit measures Claude's objections to annotation quality, rather than holdout classification performance.

## Context And Next Steps

- `developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout/claude-label-review.md` contains the complete discrepancy list for the user's judgment.
- `claude-label-review.json` preserves the audit instructions, source hashes, CLI options, timing, and full structured response.
- Wait for the user's decisions before changing labels. Keep these records out of prompt examples and tuning permanently.
