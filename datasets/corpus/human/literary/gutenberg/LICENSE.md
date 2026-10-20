# Source license: Project Gutenberg (public-domain books)

- **Source**: Project Gutenberg English plain-text books, discovered via the Gutendex
  catalog API (`https://gutendex.com`).
- **Provenance / retrieval**: per-book plain text from gutenberg.org; the PG
  header/footer/license block and trademark were cut, and any file still mentioning
  "Project Gutenberg" was deleted, so the retained prose carries no PG license or mark.
  Build script: `article/experiments/corpus-build/build_gutenberg.py`.
- **Register**: literary prose (mostly pre-1928 works).
- **Date**: pre-1928 works; pre-AI baseline.
- **Files**: `gb-NNNNN-*-pNN.md` (2,260 ~700-word chunks).

## License

- **License**: US public domain (works published before 1928). The Project Gutenberg
  License applies only to texts that retain the PG trademark/header; those were removed,
  so only the underlying public-domain text remains.
- **Reference**: https://www.gutenberg.org/policy/license.html (explains that stripping
  the PG references leaves the public-domain work unencumbered).

| Permission | Allowed | Condition |
|---|---|---|
| Redistribute | Yes | - |
| Modify / derive | Yes | - |
| Commercial use | Yes | - |
| Attribution required | No | Public domain (courtesy credit optional) |

## Publishable

**Yes**, fully. Public-domain works with PG branding removed. No attribution or
share-alike obligation.

## Notes

- Public-domain status is US-based (pre-1928 rule). A few works may still be in
  copyright in other jurisdictions; the corpus is treated as US public domain.
- Old literary style and curly quotes mean readability/orthography checks fire here for
  reasons unrelated to slop; weight the slop bucket when measuring.
