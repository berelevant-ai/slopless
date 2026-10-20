# Experiment Migration

## Goal

- Relocate the complete inspected `article/experiments` tree in the canonical checkout on `main`, preserving saved data bytes and helper behavior.

## Approach

1. Record every source file's SHA-256, size, mode, classification, and destination before moving it.
2. Move `.mjs`, `.py`, and `.sh` helpers to `runners/legacy`, retaining paths relative to `article/experiments`. Move all saved data, reports, research, generated prose, and historical documentation to `datasets/experiments` with the same relative paths.
3. Leave the generated Python cache at its ignored source location and record its hash and exclusion. The inspected tree contains no standalone prompt files; retain embedded prompt text in its helper.
4. Apply documented mechanical path substitutions only to helpers. Map explicit historical corpus sources to the existing taxonomy, update experiment data and helper invocation paths, and fix the relocated shell helper's corpus target. Preserve optional obsolete-layout fallbacks as optional paths rather than double-counting current sources.
5. Verify destination hashes, syntax, imports, and data/source paths locally. Save complete evidence and per-file path edits in `.fixture3/root-experiment-migration.json` and add a short helper inventory in `runners/legacy/README.md`.

## Decisions

- Preserve historical Markdown and embedded JSON path labels byte-for-byte; document their old paths in the runner inventory instead of rewriting evidence.
- Keep root-relative source and CLI paths unchanged because helpers run from the canonical repository root and the relocated helpers retain the same directory depth.
- Use local parse and path checks without running collectors, generators, or output-writing helpers. The main migration owns repository-wide configuration and its executable specification.

## Files To Modify

- `article/experiments/**`, `runners/legacy/**`, and `datasets/experiments/**` own this relocation.
- `.fixture3/root-experiment-migration.json` records preservation and verification.
- This plan records the mechanical procedure. Other agents' files, root documentation, configuration, and Git state remain outside this task.
