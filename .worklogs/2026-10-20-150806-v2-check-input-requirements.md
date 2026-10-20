# V2 Check Input Requirements

## Summary

Excluded decorative-bold checks from V2 and added passage versus full-text input requirements to the accepted taxonomy and root agent instructions.

## Decisions

- Keep useful bold emphasis and bold list labels. Preserve checks for redundant label wording under wordiness and redundancy.
- Declare `input: passage` or `input: text` per finalized issue type. Keep input requirements separate from families and density reporting.
- Assign buried answers, reader-irrelevant background, and repeated closers across sections to full-text input. Preserve complete evaluation texts and provide the required question, conversation, or reader brief.
- Keep cross-sentence reframes and heading/body restatement passage-level when their complete local context is supplied.
- Clarify that credentials can establish relevant expertise or eligibility and follower counts can establish audience reach. Judge their presentation and relevance to the claim.
- Keep these changes in the existing taxonomy and agent instructions. Production prompts, runtime, datasets, and saved fixture outputs remain unchanged.

## Verification

- Read the accepted taxonomy, root agent instructions, and the three latest worklogs before editing.
- Prettier and whitespace checks pass. The inventory retains twelve families, 106 unique mapped entries, and all 26 Humanizer sections, with decorative bold recorded as excluded.
- Read-only review found no contradictions in the exclusions, per-type input requirements, density boundary, or passage/text evaluation guidance.

## Context

- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` contains the accepted families, input declarations, and Humanizer exclusions.
- `AGENTS.md` carries the matching dataset and evaluation requirements.

## Next Steps

- Complete the remaining issue definitions and declare their required inputs before generating development and holdout sets.
- Implement runner input selection when the corresponding V2 checks are developed, then verify whole-text preservation and passage-level execution separately.
