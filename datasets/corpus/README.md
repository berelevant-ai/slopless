# Corpus Collections

The collections moved byte-for-byte from `article/corpus` and `new-corpus/2026-05-19-fresh-slop-expansion` on 2026-10-20, preserving their provenance directories and labels.

## Collections

- `human/`: 13,680 documents, 21,632,736 words, and 133,005,851 bytes across 13,705 files.
- `ai-generated/`: 400 documents, 186,749 words, and 1,250,092 bytes across 402 files.
- `ai-suspected/`: 1,500 documents, 1,611,175 words, and 11,345,287 bytes across 1,501 files.
- `_audit/`: four JSONL files totaling 37,039,348 bytes.
- `generated-slop/2026-05-19-fresh-slop-expansion/`: 34 files totaling 586,501 bytes, generated for deterministic rule mining on 2026-05-19.

The generated-slop batch includes ten prose texts containing 34,304 words, 18 Markdown edge-case files containing 52,367 words, two term-policy configurations, three analysis documents, and its original README.

## Measurement And Provenance

Document counts cover Markdown files excluding license files and READMEs. Word counts use non-whitespace tokens in the complete document bytes, including Markdown and embedded metadata. Collection byte totals include accompanying licenses and metadata.

The migration preserved 15,647 original files totaling 183,230,574 bytes, including the master license index. Source and destination SHA-256 hashes are recorded in `.fixture3/root-corpus-migration.json`; this README is additional documentation.

`LICENSES.md` and each source's `LICENSE.md` retain the original provenance and redistribution terms. Existing paths inside preserved documents identify their historical locations. The largest moved file is `_audit/readability-signals.jsonl` at 22,910,316 bytes.
