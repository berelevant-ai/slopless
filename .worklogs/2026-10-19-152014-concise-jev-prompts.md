# Concise Jev prompts

## Summary

- Replaced the existing prompts in place: semantic thinness is 615 words, superficial analysis is 158 words, and the shared task is 64 words.
- Deleted the annotation datasets, generator, manifest, README, and superseded generation plan. The prompt folder contains three Markdown files.

## Decisions

- Selected 39 existing source examples to illustrate the decisions. Positive examples mark defective wording and explain it; negative examples supply concrete contrasts.
- Removed exhaustive templates and repeated explanations. Kept the existing prompt paths and created no replacement directory or reference copy.

## Verification

- Checked all 39 examples against the previous demonstrations for exact wording, rule ownership, and labels. Every positive example has a marked span.
- Confirmed that the folder contains exactly the three prompt files. Model inference has not run on this revision.
- Independent review verified all examples and highlighted spans. A proposed exclusive rule boundary conflicted with existing baseline findings on hit paragraphs p264 and p265, so both rules retain independent judgments.

## Context And Next Steps

- Read the three Markdown files under `developer-helpers/experiments/2026-10-17-jev-paragraphs/annotated-semantic/` for the current prompts.
- Evaluate the concise prompts on the existing paragraph inputs before reporting classification performance.
