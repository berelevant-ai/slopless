# Source license: US government / public-health prose (public domain)

This directory holds two distinct US-government sources, both public domain. They are
distinguished by filename prefix.

## A. Federal Register (`fr-*.md`, 400 files)

- **Source**: Federal Register documents, 2014-2019.
- **Provenance / retrieval**: federalregister.gov API v1
  (`https://www.federalregister.gov/api/v1/documents.json`), filtered to
  `publication_date` 2014-01-01..2019-12-31. Build script: `build_gov_health.py`.
- **Register**: formal government / regulatory prose.
- **Date**: 2014-2019. Genuinely pre-2020 baseline.
- **License**: US federal government work, public domain (17 U.S.C. 105).

## B. MedlinePlus (`med-*.md`, 687 files)

- **Source**: MedlinePlus health-topic summaries (US National Library of Medicine / NIH).
- **Provenance / retrieval**: `https://medlineplus.gov/xml.html` topics file, English
  health-topic full summaries. Build script: `build_gov_health.py`.
- **Register**: consumer health / wellness prose.
- **Date**: MODERN (topics file dated 2026). NOT part of the pre-2020 baseline; use for
  register coverage and note the date when measuring.
- **License**: US government work (NLM/NIH), public domain.

## License (both sources)

| Permission | Allowed | Condition |
|---|---|---|
| Redistribute | Yes | - |
| Modify / derive | Yes | - |
| Commercial use | Yes | - |
| Attribution required | No | Public domain (courtesy credit optional) |

- **References**: https://www.usa.gov/government-works ;
  https://www.nlm.nih.gov/web_policies.html

## Publishable

**Yes**, both. US-government public-domain works.

## Notes

- MedlinePlus summaries are NLM-authored and public domain; MedlinePlus also links out to
  externally copyrighted material, which is not included here (only the NLM summary text).
- Federal Register prose is often wordy, so some slop-bucket hits here are real slop, not
  false alarms.
