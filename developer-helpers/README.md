# Developer Helpers

This directory is not part of the Slopless public tool.

It contains internal agent material:

- analytics notebooks and CSV exports
- Python manifest verifiers used during development

Do not import this directory from `src/`.
Do not include it in the npm package.
Do not run public package checks against it.

Slopless writing datasets live in root `datasets/`, grouped as human, suspected AI, ordinary AI output, and synthetic examples. Model prompts live in root `prompts/`, and model runners live in root `runners/`.

The source-download and experiment files used by older manifest verifiers are retained in Git at `41d34169`. Current dataset validation runs through `node runners/datasets.mjs` and Fixture3's `datasets` suite.
