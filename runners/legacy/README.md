# Legacy Experiment Helpers

Run these helpers from `/Users/tartakovsky/Projects/agent-quality-controls/slopless`. They use the existing root `src` and built `dist` trees.

## Locations

- `datasets/experiments` preserves the former `article/experiments` data layout, including candidates, keep/final lists, audit verdicts, research, reports, and editor experiment inputs and outputs.
- `datasets/corpus` contains the human, generated-AI, suspected-AI, and audit collections. `datasets/corpus/generated-slop` contains the former `new-corpus` collection.
- Historical Markdown and JSON labels retain their original bytes and old path references. Translate `article/experiments` to `datasets/experiments`; executable helpers now live here, including `corpus-build/*.py`.
- `.fixture3/root-experiment-migration.json` records every source and destination hash and every helper path substitution. Embedded generator prompts retain their text.

## Helper Groups

- `analyze.mjs`, `measure_*.mjs`, `actually_measure.mjs`, `show_rule.mjs`, and `corpus_stats.mjs` print measurements.
- `screen_*.mjs`, `validate_*.mjs`, `significance_validate.mjs`, and `syn_tp.mjs` screen candidates or measure rule findings.
- `audit_fp.mjs`, `find_sentences.mjs`, `edge_cases.mjs`, `review_*.mjs`, and `fixture_coverage.mjs` print review samples or coverage.
- `merge_candidates.mjs`, `curate.mjs`, and `assemble.mjs` write candidate and keep/final datasets. `apply_data.mjs` and `drop_fp.mjs` write production phrase data under `src/rules`.
- `collect_signals.mjs`, `split_audit.mjs`, `corpus_lint.mjs`, and `ai_capture.mjs` write corpus audit data. Supply a destination under `datasets/experiments` when `ai_capture.mjs` requests an output filename.
- `compare.mjs` and `judge-variance.mjs` write summaries from saved experiment results.
- `corpus-build/*.py` download or transform sources. Supply paths under `datasets/corpus` for their input and output arguments.
- `generate_codex.mjs` calls Codex and writes generated corpus files and intermediate text. `reorg_corpus.sh` moves historical corpus directories.
- `screen_candidates.mjs` retains optional obsolete-layout fallbacks under `datasets/corpus`; the current corpus is read through its human and AI branches.

## Local Commands

These commands read existing files and print results:

```sh
node runners/legacy/analyze.mjs datasets/experiments/ai-editor-vs-gate/inputs/01-linkedin.md
node runners/legacy/measure_rules.mjs datasets/experiments/ai-editor-vs-gate/inputs/01-linkedin.md
node runners/legacy/show_rule.mjs datasets/corpus/human/reference/wikipedia wiki- generic-signposting 10 5
node --check runners/legacy/generate_codex.mjs
bash -n runners/legacy/reorg_corpus.sh
```

The migration checks parse all helpers and verify their paths and hashes. Collectors, generators, and output-writing helpers require an explicitly requested run.

## Coverage Counts

- `fixture_coverage.mjs` filters disabled rules before reporting its enabled count and gap list.
