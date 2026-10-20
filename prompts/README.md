# Prompts

- `v1/shared.md` contains the common instructions.
- The three adjacent Markdown files describe the individual checks. The runner supplies the common instructions and one selected check per request.
- Copy a version folder when testing revised wording, then pass its path with `--prompts`. Keep the holdout paragraphs and labels out of prompt examples.

Run commands are in [runners/README.md](../runners/README.md). Version `v1` preserves the wording from commit `2ebcba5`.
