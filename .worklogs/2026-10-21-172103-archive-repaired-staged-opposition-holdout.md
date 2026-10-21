# Archive Repaired Staged-Opposition Holdout

## Summary

Archived the repaired, independently verified holdout pool before balancing. Seven passages receive new writing to remove confirmed development overlap; the other 233 passages remain unchanged.

## Decisions

- Independent source review dismisses all four development source-pair concerns and three cross-split concerns. Regenerate the seven confirmed holdout overlaps while preserving coverage and mandatory lineage.
- Give every replacement three fresh Opus review roles. Preserve original writing in `92e9bdb7`, all earlier votes, replacement hashes, and rejected interpretations in the existing review record.
- Resolve one protected label disagreement independently and retain its current no-hit. The pool remains 106 hits and 134 no-hits, with 67 mandatory cases comprising 27 hits and forty no-hits.

## Verification

- Three replacement calls return 21 judgments; independent QA verifies all seven replacements and unchanged remaining passages. The complete record preserves 22 provider attempts and 1,541 returned judgments, including one failed chunk.
- Incremental overlap review clears the replacements against 15,671 pinned source pairs and the complete exposed development pool. It examines 47 required pairs and six supplemental pairs; independent review confirms zero unresolved overlaps.
- Protected QA verifies formatting, ranges, snippets, provenance, and final bytes. Its aggregate proof is `/tmp/000028-holdout-independent-qa-post-replacement-final-aggregate-proof.json`, SHA-256 `097b636b903e3cf9a186ee83ec5aaa7fa258245ea9e3da4e6aefb5fc5a82e0e6`.
- Parent confirms the final three file hashes and 240/106/134 counts. `fixture3 check --suite datasets --json` matches approved output; all 38 dataset-runner contract groups pass.

## Key Files And Next Steps

- The existing `000028` Markdown/labels pair and `staged-opposition-holdout-opus-review.json` retain this repaired full pool. The development subset and 683-word prompt are frozen at `14a9ccec`.
- After this archive, select exactly 100 hits and 100 no-hits, preserve every mandatory case, verify selection independently, and finalize source-proof inheritance. Then run development baseline `b0` and bounded tuning before the separate frozen-candidate holdout assessment.
