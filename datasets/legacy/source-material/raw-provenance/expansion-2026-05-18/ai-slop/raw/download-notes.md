# AI Slop Raw Capture Notes

## Scope

Owned folder: `legacy/source-material/expansion-2026-05-18/ai-slop/`

Created:

- `raw/`
- `derived/`

No product rules, behavior fixtures, package files, or golden output were edited.

## Downloaded Small Source Files

- Antislop sampler:
  - URL: `https://github.com/sam-paech/antislop-sampler`
  - Captured: README, `slop_phrase_prob_adjustments.json`, `slop_phrases_2025-04-07.json`, `slop_words_2025-04-07.json`, `slop_regexes.txt`.
  - Not captured: `slop_phrase_prob_adjustments_full_list.json`, size about 1.9 MB, because the plan says large data should be metadata/sample only.
- Auto-Antislop:
  - URL: `https://github.com/sam-paech/auto-antislop`
  - Captured: README, human writing profile info, human writing profile JSON.
  - Note: `slop-forensics` is a Git submodule or redirected API target, not copied here. Existing repo already has `datasets/labeled/ai-slop/llm-slop-lists/slop-forensics/`.
- SlopSquid:
  - URL: `https://github.com/QRY91/slopsquid`
  - Captured: README, embedded `words.json`, `trigrams.json`, `patterns.json`.
- LLM Slop Detector:
  - URL: `https://github.com/mandakan/llm-slop-detector`
  - Captured: README, `builtin-rules.json`, `builtin-packs/fiction.json`, `builtin-packs/structural.json`.
- nanxstats/llm-cliches:
  - URL: `https://github.com/nanxstats/llm-cliches`
  - Captured: README, adjective/noun/verb lists.
- slop-guard-rs:
  - URL: `https://github.com/tnguyen21/slop-guard-rs`
  - Captured: README and `src/lib.rs`, which contains the static rule arrays and scoring logic.
- Stop Slop:
  - URL: `https://github.com/hardikpandya/stop-slop`
  - Captured: README, `SKILL.md`, `references/phrases.md`, `references/structures.md`, `references/examples.md`.
- RAID:
  - URL: `https://github.com/liamdugan/raid`
  - Captured: README only.
  - Dataset URLs recorded, not downloaded: `https://huggingface.co/datasets/liamdugan/raid`, `https://dataset.raid-bench.xyz/train.csv`, `test.csv`, `extra.csv`.
- MAGE:
  - URL: `https://github.com/yafuly/MAGE`
  - Captured: README only.
  - Dataset URL recorded, not downloaded: `https://huggingface.co/datasets/yaful/MAGE`.
- HC3 and HC3 Plus:
  - HC3 URL: `https://github.com/Hello-SimpleAI/chatgpt-comparison-detection`
  - HC3 Plus URL: `https://github.com/suu990901/chatgpt-comparison-detection-HC3-Plus`
  - Captured: repo READMEs, HC3 README, HC3 Plus README, HC3 English indicating-word files.
  - Full datasets recorded, not downloaded.
- M4GT-Bench:
  - URL: `https://github.com/mbzuai-nlp/M4GT-Bench`
  - Captured: README only.
  - Dataset Google Drive URL recorded, not downloaded.
- Beemo:
  - URL: `https://github.com/Toloka/beemo`
  - Dataset URL: `https://huggingface.co/datasets/toloka/beemo`
  - Captured: GitHub README and Hugging Face dataset card.
  - Full `dataset.parquet` was not downloaded; GitHub reports about 8.3 MB and the plan says benchmark corpora should stay metadata/sample only.
- aismells:
  - URL: `https://aismells.com/`
  - Captured: `llms.txt`, `llms-full.txt`.
- SynkrLAB:
  - URLs:
    - `https://synkrlab.com/chatgpts-most-overused-words-and-phrases/`
    - `https://synkrlab.com/how-is-the-use-of-chatgpt-obvious-in-the-workplace/`
  - Captured: HTML pages.
- Your AI Slop Bores Me:
  - URL captured: `https://www.youraislopbores.com/`
  - Captured: homepage HTML.
  - Note: search results also showed `https://www.youraislopbores.me/` references, but the `.com` page was the accessible capture used here.
- SlopDetector taxonomy:
  - URL: `https://slopdetector.org/slop-taxonomy`
  - Captured: HTML page.
- ChatGPT cliche gists:
  - URL: `https://gist.github.com/chrisgherbert/c734ec50ae464135be57cd03b84281f9`
  - Captured: raw gist.
  - Existing repo already contains other community gist captures under `datasets/labeled/ai-slop/llm-slop-lists/community-gists/`.

## Inaccessible Or Intentionally Not Downloaded

- No assigned source was fully inaccessible.
- Large benchmark corpora and multi-megabyte lists were intentionally not downloaded.
- Auto-Antislop `slop-forensics` was not copied from the submodule because equivalent prior capture already exists in `datasets/labeled/ai-slop/llm-slop-lists/slop-forensics/`.
