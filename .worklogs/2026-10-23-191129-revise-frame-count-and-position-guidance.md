# Revise Frame Count And Position Guidance

## Summary

Preserve the first repair's regression and prepare the second bounded candidate. The first revision loses intended takeaway pairs and distinctive-subject triples while retaining many ending-related false findings.

## Decisions

- Put the two-adjacent-takeaway branch before the ordinary three-instance requirement. State explicitly that synonymous recommendations after repeated introductions remain eligible.
- Explain opening/internal recurrence separately from ending repetition and judge useful comparisons independently of generic commentary elsewhere.
- Keep the same six demonstrations, model settings, threshold and dataset judgments. Preserve every first-revision response and its producing prompt snapshot.

## Results

- Fresh baseline catches 100/100 isolated, 97/100 mixed-A and 97/100 mixed-C positives, with four, 62 and six false positives.
- Candidate one catches 92, 91 and 80, with one, 54 and four false positives. Its 96 total errors exceed baseline's 78; it remains rejected at this checkpoint.

## Key Files

- Read `runners/results/sentence-frame-v20-development-repair.json` for frozen prompts, demonstrated IDs and every native output.
- Read the existing frame-repair plan and `prompts/v20/sentence-frame-repetition.md` for the bounded second candidate.

## Next Steps

- Commit and execute candidate two on the same 600 development judgments. Stop according to the plan, then select, confirm and audit the results.
