# Skunked Terms Source

- Source package: `proselint==0.16.0`
- Source package license: BSD-3-Clause
- Source package URL: `https://github.com/amperser/proselint`
- Imported file: `proselint/checks/skunked_terms.py`
- Cross-check source: Vale `proselint/Skunked.yml`
- Import date: 2026-05-13

The JSON list in `skunked-terms.json` is the source list trimmed, deduplicated, sorted, and normalized.

`hopefully` and `Thankfully` were dropped after the corpus audit: as sentence adverbs they are now standard usage (51 and 3 human hits, 0 AI), a prescriptivist peeve rather than a slop signal. The retained terms (`bona fides`, `deceptively`, `decimate`, `effete`, `fulsome`, `impassionate`) carry genuine sense ambiguity or misuse.
