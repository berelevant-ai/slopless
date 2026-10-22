# Select Hedging Revision Two

## Summary

Revision two is the first candidate to meet both development bounds. Freeze it for one fresh confirmation on identical isolated and mixed inputs.

## Decisions

- Selection catches 95/100 isolated hits with four false positives and 96/100 mixed hits with two false positives. Stop revisions at this first pass under the predeclared rule.
- Preserve the 945-word assembled prompt from `93daffd6`. Hold the model, threshold, execution mode, batching, inputs and labels unchanged.
- Run one uncached confirmation for the new check and each frozen comparator. A failed repeat ends this development round rather than triggering further attempts.

## Verification And Next Steps

- Both revision-two native outputs contain thirteen completed requests and 200 judgments. Preserve them with baseline and revision one.
- Finish native provenance validation, independent review of changed predictions and errors, mixed joint scoring, and the final report. Holdout inference and production release remain gated.
