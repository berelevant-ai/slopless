# Diagnose Context False Positives

## Summary

Investigate the high structural-control false-positive rate and the user's clarification that "narrower remit" is itself undesirable wording. Compare explanation placement on eighteen selected development examples without changing production code or prompts.

## Decisions

- Preserve frozen labels while recording the conflict between the existing missing-information definition and the requested style policy. The three explained-remit variants require a consistent rule-definition decision.
- Select eight no-hits and ten hits for a field-placement diagnostic; exclude scope no-hits from this probe because their intended policy is disputed.
- Preserve all supporting words and check instructions. Compare separate context with the same explanation also placed in the judged text field; retain exact requests and raw responses under `runners/results/`.

## Results

- All 36 requests complete in 0.93 seconds. Separate context produces six false positives out of eight; combined reading produces three, with four corrected decisions and one new false positive.
- Both arrangements catch all ten desired hits. Explained migration exposure and account-policy implications remain falsely flagged; the bounded local-trial comparison becomes falsely flagged at `.53`.
- The diagnostic demonstrates sensitivity to the input arrangement while changing the judged area and duplicating the explanation. Individual effects of the field boundary, instruction wording and duplication require separate comparisons; reporting ownership remains unverified.
- The style-policy mismatch and residual semantic errors remain distinct from batching. The prior full-batch confirmation differs from single-check requests by one assigned-check false positive.

## Context

- `runners/results/article-context-spike.md` records the policy mismatch, request-field diagnosis and exact example probabilities.
- `runners/results/article-context-input-diagnostic.json` preserves the eighteen targets and 36 complete requests and responses.
- `prompts/v2/unspecified-scope.md` and the accepted taxonomy define the current missing-information boundary.

## Next Steps

- Align the narrow/remit definition with the requested wording behavior before revising its labels or suppression logic.
- Verify a context-aware judgment that preserves the original report target, with genuine positives and independently defective supporting context included.
