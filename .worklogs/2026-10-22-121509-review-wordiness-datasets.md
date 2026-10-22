# Review Wordiness Datasets

## Summary

Prepare six independently reviewed wordiness-family pools containing 1,333 inputs. Select 100 hits and 100 no-hits per check and split, retaining 133 surplus inputs for Git history before detector evaluation.

## Decisions

- Repair implausible stacks and inconsistent scenarios; retain meaningful formal language, useful glosses, operational distinctions, recaps, and renewed reminders as controls.
- Preserve original IDs in the reviewed pools and mandatory hard cases in the selected sets. Record corrected labels and rewritten-input counts before balancing, with no detector feedback.
- Keep protected holdout writing outside prompt-authoring contexts. Separate reviewers approve its labels and repairs; a source-bound lexical screen finds zero overlap candidates across 444,216 pool pairs.
- Draft four `v16` Markdown files: shared instructions and three checks. Development examples highlight offending wording; assembled prompts contain 718, 628, and 984 words. The repeated-explanation demonstrations cover a verdict and a mechanism.

## Verification

- All six final pool reviews approve their current labels and writing. Fresh canonical-pair and selection review verifies the counts and preservation; its three documentation/model-attribution objections are corrected before committing.
- The complete dataset validator passes 15,683 documents and 23,586 labels, including these six full pools. Fixture3's datasets suite matches all 46 public contract checks.
- The private development driver passes 149 offline integrity probes. Independent follow-up confirms strict decimal parsing repairs the empty-argument failure and clears the prompts after two wording/highlighting corrections.
- Root formatting ignores research files. Explicit formatting uses `--ignore-path /dev/null --prose-wrap preserve`; dataset source text remains unchanged.

## Key Files And Next Steps

- The wordiness execution plan records definitions, gates, generation, review, and mixed evaluation. The six `000033` through `000038` dataset pairs contain the reviewed full pools; their compact review records contain selection and retention information.
- Archive these pools, then replace the same paths with their selected 200 inputs and link the archive commit. Freeze in Git before Jev development inference.
- Finish prompt review and run development with Jev 1.13.0, SDK 0.7.0, threshold 0.5, and at most three revisions per check. Complete mixed-data review and development evaluation; holdout inference requires the user's separate authorization.
