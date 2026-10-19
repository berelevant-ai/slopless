# Jev prompts with marked examples

- Every desired hit marks its defective wording in bold and explains that wording beneath the example.
- Every desired no-hit names the preserved wording and explains its literal meaning, concrete detail, or rule exception. Backticks distinguish it from defective wording.
- The annotations cover the frozen semantic-thinness family's 374 demonstration entries. Each entry keeps its original rule, label, and wording.

## Files

- `semantic-thinness.md` and `superficial-analysis.md` contain the revised rulebooks. `task.md` explains how the classifier should apply them.
- `annotations-*.json` contains reviewed excerpts and reasons, indexed against `../grounded-semantic/demonstrations.json`.
- `build.mjs` checks the prior experiment's recorded hashes, then renders the prompts and validates complete coverage and literal excerpts. `manifest.json` records input and output hashes.

## Reproduction

```sh
node developer-helpers/experiments/2026-10-17-jev-paragraphs/annotated-semantic/build.mjs build
node developer-helpers/experiments/2026-10-17-jev-paragraphs/annotated-semantic/build.mjs verify
```

- This revision prepares the marked prompts. A future inference comparison must save its requests and responses separately; the completed `grounded-semantic` experiment retains its original prompts and results.

## Source labels requiring judgment

- Entries 35-38 target unexplained bodily sensations and badge weight, which also allow literal physical readings.
- Entries 79, 109-110, and 125 target short scene statements that can serve legitimate narration when their context supplies the missing detail.
- Entry 122 supplies an inventory event after which rooms are empty; the event alone leaves the cause of their emptiness unresolved.
- Entry 140 preserves an operational-equivalence claim while leaving its operation and comparison referent unstated.
- Entry 198 preserves `This works. That helps.` through an explicit exception, despite supplying no concrete result.
- Entry 248 preserves a named architect's design fact while leaving the adjective `renowned` unsupported.
- Entry 263 supplies compilation as a concrete prerequisite while leaving the subsequent work unnamed.
