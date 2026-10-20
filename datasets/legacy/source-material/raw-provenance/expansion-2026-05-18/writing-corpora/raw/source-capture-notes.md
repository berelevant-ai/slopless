# Writing Corpora Source Capture Notes

Captured on 2026-05-18.

No full datasets were downloaded. Captures are metadata, README excerpts, public source notes, public schema notes, and short sample pairs from public pages or public repositories.

## Source URLs

- BEA-2019 W&I+LOCNESS: https://www.cl.cam.ac.uk/research/nl/bea2019st/
- CLC FCE Dataset: https://ilexir.co.uk/datasets/index.html and https://researchdatasets.cambridge.org/
- NUCLE: https://huggingface.co/datasets/nusnlp/NUCLE
- JFLEG: https://github.com/keisks/jfleg and https://arxiv.org/abs/1702.04066
- cLang-8 / Lang-8: https://github.com/google-research-datasets/clang8 and https://sites.google.com/site/naistlang8corpora/home
- EFCAMDAT: https://ef-lab.mml.cam.ac.uk/EFCAMDAT.html
- Write & Improve Corpus 2024: https://researchdatasets.cambridge.org/datasets/write-and-improve-corpus-2024
- ELLIPSE Corpus: https://github.com/scrosseye/ELLIPSE-Corpus and https://zenodo.org/records/11217937
- PERSUADE 2.0: https://github.com/scrosseye/persuade_corpus_2.0
- DREsS: https://github.com/XingxingZhang/dress and https://xingxingzhang.github.io/dress/
- ArgRewrite V.2: https://github.com/omidkashefi/ArgRewrite and https://arxiv.org/abs/2206.01677
- USC First-Year English Corpus: https://wacclearinghouse.org/jwa/corpora/fye/
- CROW: https://writecrow.org/about-our-corpus/
- LEAF: https://github.com/shabnam-b/LEAF and https://aclanthology.org/2024.naacl-short.36/
- ERRANT: https://github.com/chrisjbryant/errant
- ASSET: https://github.com/facebookresearch/asset and https://arxiv.org/abs/2005.00481
- MinWikiSplit: https://arxiv.org/abs/1909.12131 and https://huggingface.co/datasets/cl-nagoya/min-wikisplit

## Public Samples Captured

### BEA-2019 M2 example

- Source: `This are a sentence .`
- Edit 1: `R:VERB:SVA` to `is`
- Edit 2: `M:ADJ` insert `good`

### JFLEG dev sample

- Source: `So I think we can not live if old people could not find siences and tecnologies and they did not developped .`
- Reference: `So I think we would not be alive if our ancestors did not develop sciences and technologies .`

### ERRANT example

- Source: `This are gramamtical sentence .`
- Corrected: `This is a grammatical sentence .`
- Types: `R:VERB:SVA`, `M:DET`, `R:SPELL`

### ASSET sample

- Complex: `Adjacent counties are Marin (to the south), Mendocino (to the north), Lake (northeast), Napa (to the east), and Solano and Contra Costa (to the southeast).`
- Simple: `countries next to it are Marin, Mendocino, Lake, Napa, Solano, and Contra Costa.`

### ArgRewrite annotation sample

- Old: `[While] he computers within the car are so complex... like if [there were] a police officer directing traffic.`
- New: `[And while] the computers within the car are so complex... like if a police officer [was] directing traffic.`
- Labels: `Word-Usage/Clarity`, `Conventions/Grammar/Spelling`

### LEAF feedback sample

- Essay issue: redundant prompt framing and prompt mismatch.
- Feedback labels implied by paper and repository: topic response, spelling/grammar/style, point of view, argument support, conclusion.

## Access Limits

- NUCLE requires the NUS licensing agreement.
- Lang-8 requires a request form; cLang-8 also requires separate Lang-8 source data.
- EFCAMDAT requires administrator approval, academic affiliation, and Google Drive access.
- Write & Improve Corpus 2024 requires a Cambridge license and prohibits sharing full or partial corpus data with others.
- CROW full and offline access requires request review and additional training.
- PERSUADE 2.0 test split is password-protected; training data is hosted outside GitHub.
- ELLIPSE test/raw files are password-protected, though passwords are listed in the README.
- DREsS Newsela data requires Newsela access and an NDA.
