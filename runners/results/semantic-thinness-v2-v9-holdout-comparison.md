# Scope And Circular Explanation Holdout Comparison

## Result

Both frozen candidates retain 98% holdout accuracy, matching their baselines. Scope exchanges one caught hit for one fewer false positive; circular explanation exchanges one corrected false positive for one new false positive.

- Each check uses 200 isolated synthetic passages: 100 hits and 100 no-hits. Together they cover 400 distinct passages and 800 classification decisions.
- Scope `v2`: 100 caught, zero missed, 96 correctly unflagged, four false positives. Scope `v9`: 99 caught, one missed, 97 correctly unflagged, three false positives.
- Scope transitions: zero newly caught, one lost catch, three corrected false positives, two new false positives.
- Circular explanation `v2` and `v9`: 100 caught, zero missed, 96 correctly unflagged, four false positives each.
- Circular transitions: zero newly caught, zero lost catches, one corrected false positive, one new false positive.

## Development Comparison

- Scope development improves from 99 caught and seven false positives to 100 caught and one false positive: 96% to 99.5% accuracy.
  - Development transitions: one newly caught, zero lost catches, six corrected false positives, zero new false positives.
- Circular development retains 100 catches while false positives fall from five to one: 97.5% to 99.5% accuracy.
  - Development transitions: zero newly caught, zero lost catches, four corrected false positives, zero new false positives.
- Both selected candidates score 1.5 percentage points lower on holdout than development. The measured development accuracy gains transfer as zero net holdout gains on these inputs.
- Trial `r1` catches 100 scope hits with two false positives and 98 circular hits with two false positives. Trial `r2` catches 100 hits with one false positive for each check.
- Selection independently reproduces `r2` for both checks using fewest errors, then more caught hits, then the earlier revision.

## Manual Review

The fresh evaluator read every complete passage in the union of baseline and all trial or candidate classification errors against the accepted taxonomy. This union includes every changed classification between the recorded versions.

- Development review covers eight scope passages and seven circular passages; holdout review covers seven scope passages and five circular passages. All 27 were reviewed manually; label concerns total zero.
- Scope development baseline errors comprise seven false positives and one missed unspecified endpoint.
  - False positives concern editorial discussion twice, supplied boundaries three times, an unsettled boundary once, and another issue type once. The selected candidate retains one editorial-discussion false positive.
- Circular development baseline false positives concern a supplied mechanism once, teaching or editing three times, and constituent requirements once.
  - Trial `r1` additionally misses two synonymous explanations. Trial `r2` restores those catches and retains one supplied-mechanism false positive.
- Scope holdout baseline false positives concern three supplied boundaries and one editorial discussion.
  - The candidate retains the editorial false positive, adds one stylistic-compression and one other-issue false positive, and misses one unstated question boundary.
- Circular holdout baseline false positives concern three supplied mechanisms or derivations and one teaching exercise.
  - The candidate corrects the teaching false positive, retains the three context-resolved explanations, and adds one explained-feedback false positive.
- These categories identify where predictions cross the accepted boundaries. Labels and recorded errors remain unchanged; the evaluated prompts remain frozen.

## Integrity And Execution

- Independently reconstructed 20 requests and 2,000 decisions: four relevant development baseline requests, eight trial requests, and eight holdout requests.
- Rebuilt each request independently from prompt snapshots and source passages, matched every recorded SHA-256, and compared the reconstruction with the runner helper. Independently rescored every relevant response and reproduced all saved scores and transitions.
- Every request carries one named check and 100 independent Noul questions. Question instructions contain only the detection question, target text, and rulebook reference; labels and snippets stay outside requests.
- Model `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, passage ordering, dataset text and label hashes, and runner hash match the saved development baseline and evaluation records.
- Both selected prompt snapshots match `r2`. Shared prompt files are byte-identical to `v2`; assembled prompts contain 493 scope words and 569 circular words.
- Selection froze at `2026-10-20T22:38:16.495Z`, before holdout evaluation started at `2026-10-20T22:38:53.251Z`. Every holdout response follows the freeze; every development trial response precedes it.
- `run` and offline `score` both exit zero. Eight holdout requests total 2.826 seconds of request latency, 94,178 input tokens, and 24,432 output tokens.
- Review of the development report, tuning plan, and prompt index passes against raw responses, prompt snapshots, and taxonomy. The parent reports Fixture3 exit zero with one matched fixture containing 28 passed contracts; this evaluator inspected the approved contract names and independently audited the recorded requests.

## Overlap Audit

- Compared every development passage with every holdout passage for both matching checks and both cross-check pairings: 160,000 passage pairs in total.
- Normalization uses Unicode NFKC, lowercase text, and consecutive Unicode letter-or-number tokens, treating punctuation as separators. Exact matches use original passage bytes; maximum overlap uses consecutive normalized words.
- All four cross-split pairings contain zero exact duplicates, zero normalized duplicates, and zero pairs sharing eight consecutive normalized words.
  - Matching-check maxima are six words each. Cross-check maxima are five words from scope development to circular holdout and four words in the reverse pairing.
- Within each split, exact and normalized duplicate counts are zero. Circular development contains one pair sharing ten consecutive normalized words; each other within-split comparison has zero eight-word pairs.
  - Manual inspection confirms the shared wording is incidental context in a positive/negative contrast. Both remain development material with their original labels.
- Compared all eight final scope example bullets and nine circular example bullets with their respective development and holdout passages. Every comparison has zero exact duplicates, zero normalized duplicates, zero eight-word pairs, and a three-word maximum.
- Development-derived examples and boundary analogues are documented in the development report. These overlap counts measure wording reuse separately from that declared tuning influence.

## Evidence And Scope

- The adjacent JSON preserves raw responses, exact prompt snapshots, input hashes, and aggregate fresh-review findings. Its case-level response data remains protected from the authoring context; this report contains aggregates and categories only.
- Temporary review code is `/tmp/20261020-223912-scope-circular-protected-audit.mjs`. It reconstructs requests, verifies hashes and scores, and computes duplicate and word-overlap counts offline.
- Measured results cover isolated synthetic passage classification for these two checks. Mixed-set evaluation, broad corpus validation, and highlighting require their own runs.
