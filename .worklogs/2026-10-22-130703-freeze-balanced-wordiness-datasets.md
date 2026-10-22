# Freeze Balanced Wordiness Datasets

## Summary

Keep 200 reviewed inputs per check and split at the six canonical dataset paths. Commit `1f29be1f` preserves all 1,333 reviewed inputs; this selection retains 1,200 and leaves 133 surplus inputs in that archive.

## Decisions

- Preserve all mandatory cases before filling ten hits and ten no-hits per setting. Whole-text selection also preserves connected repetition and useful-return examples under the final review's coverage constraints.
- Rebuild Markdown ranges, exact snippets, and checksums from the selected complete writing. Retain archived text and labels at the same paths in Git history.
- Keep labels fixed before Jev evaluation. The three prompts quote only selected development material; protected holdout inference remains separately gated.

## Verification

- Every active pair contains exactly 100 hits and 100 no-hits. The selected text and judgments match the independently approved pools, and every mandatory ID remains present.
- Fresh independent verification reports zero violations across the six active pairs, all 497 declared retention requirements, 991 exact snippets, and recoverability of every surplus input from the archive.
- The active dataset validator passes 15,683 documents and 23,453 labels, including 20 protected holdout documents.
- The full-pool identity audit checks all 15,683 dataset documents: all 1,333 new IDs are globally unique. The public Fixture3 dataset suite matches 46 contracts.
- Independent review clears the prompts and strict revision-limit parsing. All 149 offline driver probes pass; assembled prompts contain 718, 628, and 984 words.

## Key Files And Next Steps

- Read the family plan, six `000033` through `000038` dataset pairs, compact review records, and `prompts/v16/`. Dataset and prompt indexes now link this work.
- Evaluate each frozen development check with the pinned Jev settings, preserve every attempt, and stop at the planned gate or revision limit. Review mixed labels and score the same frozen candidates on mixed development; holdout inference requires user authorization.
