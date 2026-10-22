# Revise Three Wording Prompts

## Summary

Complete all five baselines and a fresh adverb confirmation. Revise cliche, borrowed jargon and tortured phrasing from complete-input error review while independent vocabulary-label adjudication proceeds.

## Decisions

- Distinguish useful idiomatic meaning from generic rhetoric and separate conventional expressions from neighboring defects.
- Require borrowed jargon to transfer a technical process or structure onto an ordinary activity. Preserve real technical work, ordinary causation and meaningful implementation.
- Judge adoption versus documentation before testing a garbled name. Accurate explanation beside a corrupted adopted name leaves its naming defect intact.
- Keep labels fixed for these three checks. Record disputed boundaries explicitly; adjudicate the vocabulary controls independently after finding clear conflicts with the existing definition.

## Verification

- Baseline isolated/mixed caught hits and false positives: cliche 100/48 and 100/28; borrowed jargon 100/14 and 99/54; tortured phrasing 72/8 and 41/3; adverb 96/4 and 100/0; vocabulary 97/46 and 100/11.
- Fresh adverb confirmation catches 98 isolated hits with three false positives and 99 mixed hits with zero false positives. Both baseline and confirmation meet the fixed bounds.
- Fresh reviewers inspect every baseline error using complete writing. The three revised prompts contain six labeled development demonstrations each and 722-737 assembled words.
- All original responses remain in native result files. Offline validation reconstructs the baseline requests and reproduces their scores.

## Key Files And Next Steps

- The native outputs and family experiment record are under `runners/results/`. The exact producing baseline prompts remain at `913ba940`.
- Evaluate the three first revisions, preserve their request hashes and source commit, and continue bounded general tuning. Complete vocabulary adjudication before changing that prompt.
