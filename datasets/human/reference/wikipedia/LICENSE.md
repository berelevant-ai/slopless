# Source license: Wikipedia (English) via WikiText-103-raw

- **Source**: English Wikipedia, verified Good/Featured articles, packaged as the
  WikiText-103-raw dataset (Merity, Xiong, Bradbury, Socher; Salesforce Research, 2016).
- **Provenance / retrieval**: `https://wikitext.smerity.com/wikitext-103-raw-v1.zip`
  (`wiki.train.raw`), de-tokenized back to natural prose, one article per file.
  Build script: `article/experiments/corpus-build/build_wikipedia.py`.
- **Register**: encyclopedic reference prose.
- **Date**: pre-2020 (WikiText-103 published 2016). Part of the pre-AI human baseline.
- **Files**: `wiki-NNNNN-*.md` (4,000).

## License

- **License**: CC BY-SA (Wikipedia article text). WikiText-103 is distributed under
  the Creative Commons Attribution-ShareAlike license.
- **License URL**: https://creativecommons.org/licenses/by-sa/4.0/ ;
  dataset: https://blog.salesforceairesearch.com/the-wikitext-long-term-dependency-language-modeling-dataset/

| Permission | Allowed | Condition |
|---|---|---|
| Redistribute | Yes | Attribution + ShareAlike |
| Modify / derive | Yes | Derivatives must be CC BY-SA |
| Commercial use | Yes | - |
| Attribution required | Yes | Credit "Wikipedia and its contributors" + WikiText-103 |

## Publishable

**Yes**, under CC BY-SA with attribution and share-alike. Our de-tokenized derivative
inherits CC BY-SA, so any published release of this subset must carry the same license
and attribution.
