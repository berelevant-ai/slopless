# Consolidate Staged Opposition

## Summary

Consolidated staged-contrast source coverage into one passage-level check before dataset generation. The definition covers thin rhetorical foils, negation and temporal reversals, paired comparisons, evidence limitations, blame reframes, and gratuitous objections.

## Decisions

- Merge the proposed imagined-objection type into staged opposition. Independent review compared direct foils with equivalent rhetorical questions and found the same defect judgment and editing operation.
- Preserve useful corrections, scientific limits, relevant anticipated concerns, consequential narrative contrasts, and documentary quotation. Judge what the opposition contributes separately from detail in the preferred statement.
- Allocate collections `000027` and `000028` to independently authored development and holdout. Preserve production behavior and completed authority candidates.

## Verification

- Source inspection covers the negation dispatch and its inline, paired, block, temporal, audience, and consequence branches. A separate source reviewer covers aphorism, evidence-limitation, blame, and abstract-contrast behavior.
- Fresh adversarial definition review identifies overlapping labels and an overly restrictive documentary boundary. The consolidated definition incorporates both corrections before generation.
- The existing definition extractor resolves the new family and passage input. Dataset generation and classifier evaluation follow this definition freeze.

## Key Files And Next Steps

- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` contains the consolidated definition and source mapping. `.plans/2026-10-20-235148-puffery-family-development.md` retains the sequential execution protocol.
- Generate both splits independently, obtain three blind Opus review roles and independent data QA, freeze balanced sets, then tune the development classifier before its separate holdout assessment.
