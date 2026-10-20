# Developer Helpers

This directory is not part of the Slopless public tool.

It contains internal agent material:

- historical source material
- analytics notebooks and CSV exports
- Python manifest verifiers used during development

Do not import this directory from `src/`.
Do not include it in the npm package.
Do not run public package checks against it.

Current datasets are under root `datasets/`. Model instructions are under `prompts/`, and experiment execution is under `runners/`.
