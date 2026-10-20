# Prompts

- `v1/shared.md` contains the common instructions.
- The three adjacent Markdown files describe the individual checks. The runner supplies the common instructions and one selected check per request.
- Copy a version folder when testing revised wording, then pass its path with `--prompts`. Keep the holdout paragraphs and labels out of prompt examples.
- `v2/` covers the nine consolidated semantic-thinness types. Its shared and generic-realization wording is unchanged from `v1`; the other eight prompts start from the accepted definitions.
- The first balanced development classification run is saved in `runners/results/semantic-thinness-v2-development-classification.json`, with analysis in the adjacent Markdown file.
- `v3/` contains revised missing-actor and unexplained-metaphor prompts plus unchanged shared instructions. The other seven checks retain `v2` wording. Development trials and the selected revisions are saved in `runners/results/semantic-thinness-v3-development-tuning.json`.
- `v4/` contains the tuned generic-realization prompt plus unchanged shared instructions. Its four development trials and selected revision are saved in `runners/results/semantic-thinness-v4-development-tuning.json`; other checks keep their latest wording.
- `v5/` contains the tuned unspecified-change prompt plus unchanged shared instructions. Development trials are in `runners/results/semantic-thinness-v5-development-tuning.json`; the frozen original/new holdout comparison is in `runners/results/semantic-thinness-v2-v5-holdout-comparison.json`.

Run commands are in [runners/README.md](../runners/README.md). Version `v1` preserves the wording from commit `2ebcba5`.
