# Developer Helpers

This directory is not part of the Slopless public tool.

It contains internal agent material:

- analytics notebooks and CSV exports
- Python manifest verifiers used during development

Do not import this directory from `src/`.
Do not include it in the npm package.
Do not run public package checks against it.

Slopless datasets and corpora live in root `datasets/`, including historical source material under `datasets/legacy/`. Model prompts live in root `prompts/`, and experimental runners live in root `runners/`.
