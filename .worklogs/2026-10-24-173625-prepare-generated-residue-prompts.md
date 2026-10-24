# Prepare Generated Residue Prompts

## Summary

Reselect the corrected candidate archive into ten balanced collections before detector tuning. Add three concise development prompts and preserve the shared instructions from version 21.

## Decisions

- Preserve all 356 mandatory cases while selecting 2,000 passages and 3,600 judgments. The full corrected archive at `c852cca5187b50a2f64d2366cff181c85689ca2b` retains 416 surplus passages.
- Use three highlighted hit and three no-hit development demonstrations per check. The assembled questions contain 604, 659 and 644 words.
- Keep professional qualifications and source discussion separate from model leakage. Keep genuine correspondence and editing procedures separate from helper-to-requester drafting scaffolding.
- Preserve the original selection and copy receipts as history. Current receipts bind the corrected selected text and label hashes.

## Verification

- Global dataset validation passes with 15,783 documents and 56,253 labels. Dataset Fixture3 matches, and all six paragraph-runner contracts pass.
- All nine development jobs pass offline request preparation. Each judges 200 complete passages through thirteen batches of at most sixteen independent questions.
- The deterministic CLI baseline catches 115 of 800 assigned positives with zero false positives among 800 assigned no-hits. Its raw output and mapped summary use the corrected selected writing.
- Independent selection verification finishes with zero failures across 2,619 checks. It confirms reviewed corrections, archive equivalence, mandatory retention and current hashes; declared reviewer scopes and the existing four-reference copy run define its stated verification limits.
- The first nine Jev development jobs complete successfully. Both artifact collections and two wrapper collections meet the bounds; model disclaimers and the remaining wrapper collection require tuning. Holdout detector inference remains separately authorized.

## Context

- `.plans/2026-10-24-134324-generated-residue-development.md` defines the whole-family completion bounds.
- `prompts/v22/` contains the three initial questions and shared instructions.
- `runners/results/generated-residue-v22-data-review.json` contains protected review material; prompt authors read aggregate projections only.

## Next Steps

- Finish independent data verification, then run the nine development jobs. Review errors, tune all three residue checks to their fixed bounds and repeat the selected candidates.
