# GUM

Repository for the Georgetown University Multilayer Corpus (GUM)

This repository contains release versions of the Georgetown University Multilayer Corpus (GUM), a corpus of English texts from 24 written and spoken text types:

  * Main genres: (available in train/dev/test)
    * academic writing
    * biographies
    * courtroom transcripts
    * essays
    * fiction
    * how-to guides
    * interviews
    * letters
    * news
    * online forum discussions
    * podcasts
    * political speeches
    * spontaneous face to face conversations
    * textbooks
    * travel guides
    * vlogs

  * Out-of-domain test genres: (test2 partition):
    * dictionary entries
    * live esports commentary
    * legal documents
    * medical notes
    * poetry
    * mathematical proofs
    * course syllabuses
    * threat letters

The corpus is created as part of the course LING-4427 (Computational Corpus Linguistics) at Georgetown University. For more details see: https://gucorpling.org/gum.

## A note about Reddit data

For one of the 24 text types in this corpus, Reddit forum discussions, plain text data is not supplied, and you will find ❗**underscores**❗ in place of word forms in documents from this data (files named `GUM_reddit_*`). To obtain this data, please run `python get_text.py`, which will allow you to reconstruct the text in these files. This, and all data, is provided with absolutely no warranty; users agree to use the data under the license with which it is provided, and Reddit data is subject to Reddit's terms and conditions. See [README_reddit.md](README_reddit.md) for more details.

Note that the `get_text.py` script only regenerates the files named `GUM_reddit_*` in each folder, and will not create full versions of the data in `PAULA/` and `annis/`. If you require PAULA XML or searchable ANNIS data containing these documents, you will need to recompile the corpus from the source files under `_build/src/`. To do this, run `_build/process_reddit.py`, then run `_build/build_gum.py`.

You can also run searches in the complete version of the corpus using [our ANNIS server](https://gucorpling.org/annis/#_c=R1VN)

## Train / dev / test / test2 splits

Two documents from each completed genre are reserved for testing and devlopment, but currently growing genres only have one each (total: 32 test documents, 32 dev documents). An additional out-of-domain test2 partition is available with 26 documents from the [GENTLE](https://gucorpling.org/gum/gentle.html) corpus, representing 8 additional 'extreme' genres, such as poetry, eSports commentary and more, which are not represented in the training data. See [splits.md](splits.md) for the official training, development and testing partitions.

## Citing

The best paper to cite depends on the data you are using. To cite the corpus in general, please refer to the following article (but note that the corpus has changed and grown a lot in the time since); otherwise see different citations for specific aspects below:

Zeldes, Amir (2017) "The GUM Corpus: Creating Multilayer Resources in the Classroom". Language Resources and Evaluation 51(3), 581–612.

```bibtex
@article{Zeldes2017,
  author    = {Amir Zeldes},
  title     = {The {GUM} Corpus: Creating Multilayer Resources in the Classroom},
  journal   = {Language Resources and Evaluation},
  year      = {2017},
  volume    = {51},
  number    = {3},
  pages     = {581--612},
  doi       = {http://dx.doi.org/10.1007/s10579-016-9343-x}
}
```

If you are using the **Reddit** subset of GUM in particular, please use this citation instead:

* Behzad, Shabnam and Zeldes, Amir (2020) "A Cross-Genre Ensemble Approach to Robust Reddit Part of Speech Tagging". In: Proceedings of the 12th Web as Corpus Workshop (WAC-XII). Marseille, France, 50–56.

```bibtex
@inproceedings{behzad-zeldes-2020-cross,
    title = "A Cross-Genre Ensemble Approach to Robust {R}eddit Part of Speech Tagging",
    author = "Behzad, Shabnam  and
      Zeldes, Amir",
    editor = {Barbaresi, Adrien  and
      Bildhauer, Felix  and
      Sch{\"a}fer, Roland  and
      Stemle, Egon},
    booktitle = "Proceedings of the 12th Web as Corpus Workshop",
    month = may,
    year = "2020",
    address = "Marseille, France",
    publisher = "European Language Resources Association",
    url = "https://aclanthology.org/2020.wac-1.7/",
    pages = "50--56",
}
```

For papers focusing on the discourse relations, discourse markers or other discourse signal annotations, please cite [the eRST paper](https://aclanthology.org/2025.cl-1.3/):

```bibtex
@article{ZeldesEtAl2025eRST,
    author = {Zeldes, Amir and Aoyama, Tatsuya and Liu, Yang Janet and Peng, Siyao and Das, Debopam and Gessler, Luke},
    title = {{eRST}: A Signaled Graph Theory of Discourse Relations and Organization},
    journal = {Computational Linguistics},
    volume = {51},
    number = {1},
    pages = {23--72},
    year = {2025},
    month = {03},
    issn = {0891-2017},
    doi = {10.1162/coli_a_00538},
    url = {https://aclanthology.org/2025.cl-1.3/},
}
```

For papers using GDTB/PDTB style shallow discourse relations, please cite:

  * Yang Janet Liu, Tatsuya Aoyama, Wesley Scivetti, Yilun Zhu, Shabnam Behzad, Lauren Elizabeth Levine, Jessica Lin, Devika Tiwari, and Amir Zeldes (2024), "GDTB: Genre Diverse Data for English Shallow Discourse Parsing across Modalities, Text Types, and Domains". In: Proceedings of the 2024 Conference on Empirical Methods in Natural Language Processing. Association for Computational Linguistics: Miami, FL, 12287–12303.

```bibtex
@inproceedings{liu-etal-2024-gdtb,
    title = "{GDTB}: Genre Diverse Data for {E}nglish Shallow Discourse Parsing across Modalities, Text Types, and Domains",
    author = "Liu, Yang Janet  and
      Aoyama, Tatsuya  and
      Scivetti, Wesley  and
      Zhu, Yilun  and
      Behzad, Shabnam  and
      Levine, Lauren Elizabeth  and
      Lin, Jessica  and
      Tiwari, Devika  and
      Zeldes, Amir",
    editor = "Al-Onaizan, Yaser  and
      Bansal, Mohit  and
      Chen, Yun-Nung",
    booktitle = "Proceedings of the 2024 Conference on Empirical Methods in Natural Language Processing",
    month = nov,
    year = "2024",
    address = "Miami, Florida, USA",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2024.emnlp-main.684/",
    doi = "10.18653/v1/2024.emnlp-main.684",
    pages = "12287--12303",
}
```

If you are using the OntoNotes schema version of the coreference annotations (a.k.a. OntoGUM data in `coref/ontogum/`), please cite this paper instead:

```bibtex
@inproceedings{ZhuEtAl2021,
  author    = {Yilun Zhu and Sameer Pradhan and Amir Zeldes},
  booktitle = {Proceedings of ACL-IJCNLP 2021},
  title     = {{OntoGUM}: Evaluating Contextualized {SOTA} Coreference Resolution on 12 More Genres},
  year      = {2021},
  pages     = {461--467},
  address   = {Bangkok, Thailand}
```

For papers focusing on named entities or entity linking (Wikification), please cite this paper instead:

```bibtex
@inproceedings{lin-zeldes-2021-wikigum,
    title = {{W}iki{GUM}: Exhaustive Entity Linking for Wikification in 12 Genres},
    author = {Jessica Lin and Amir Zeldes},
    booktitle = {Proceedings of The Joint 15th Linguistic Annotation Workshop (LAW) and
                 3rd Designing Meaning Representations (DMR) Workshop (LAW-DMR 2021)},
    year = {2021},
    address = {Punta Cana, Dominican Republic},
    url = {https://aclanthology.org/2021.law-1.18},
    pages = {170--175},
}
```

For a full list of contributors please see [the corpus website](https://gucorpling.org/gum).

## Directories

The corpus is downloadable in multiple formats. Not all formats contain all annotations: The most accessible format is probably CoNLL-U dependencies (in `dep/`), but the most complete XML representation is in [PAULA XML](https://www.sfb632.uni-potsdam.de/en/paula.html), and the easiest way to search in the corpus is using [ANNIS](http://corpus-tools.org/annis). Here is [an example query](https://gucorpling.org/annis/#_q=ZW50aXR5IC0-YnJpZGdlIGVudGl0eSAmICMxIC0-aGVhZCBsZW1tYT0ib25lIg&_c=R1VN&cl=5&cr=5&s=0&l=10) for phrases headed by 'one' bridging back to a different, previously mentioned entity. Other formats may be useful for other purposes. See website for more details.

**NB: Reddit data in top folders does not inclulde the base text forms - consult README_reddit.md to add it**

  * _build/ - The [GUM build bot](https://gucorpling.org/gum/build.html) and utilities for data merging and validation
  * annis/ - The entire merged corpus (excl. Reddit), with all annotations, as a relANNIS 3.3 corpus dump, importable into [ANNIS](http://corpus-tools.org/annis)
  * const/ - Constituent trees with function labels and PTB POS tags in the PTB bracketing format (automatic parser output from gold POS with functions projected from gold dependencies)
  * coref/ - Entity and coreference annotation in two formats:
    * conll/ - CoNLL shared task tabular format (with Wikification but no bridging or split antecedent annotations)
    * tsv/ - WebAnno .tsv format, including 5+ summaries, entity type, graded salience and information status annotations, Wikification, bridging, split antecedent and singleton entities
    * ontogum/ - alternative version of coreference annotation in CoNLL, tsv and CoNLL-U formats following OntoNotes guidelines (see Zhu et al. 2021)
  * dep/ - Dependency trees using Universal Dependencies, enriched with metadata, 5+ summaries, sentence types, speaker information,  enhanced dependencies, entities, information status, salience, centering, coreference, bridging, Wikification, XML markup, morphological tags/segmentation, CxG constructions, eRST discourse relations/connectives/signals, PDTB style relations and Universal POS tags according to the UD standard
  * paula/ - The entire merged corpus (excl. Reddit) in standoff [PAULA XML](https://github.com/korpling/paula-xml), with all annotations
  * rst/ - Enhanced Rhetorical Structure Theory (eRST) analyses and other discourse relation annotations
    * rstweb/ - full .rs4 format data as used by RSTTool and rstWeb, with secondary edges + relation signals (recommended)
    * lisp_nary/ - n-ary basic RST lisp trees (.dis format)
    * lisp_binary/ - binarized basic RST lisp trees (.dis format)
    * dependencies/ - a converted eRST dependency representation with secondary edges in a separate column (.rsd format)
    * disrpt/ - plain segmentation, connective detection and relation-per-line data formats following the DISRPT shared task specification
    * gdtb/ - shallow discourse relations following PDTB v3 guidelines in two formats: PDTB pipes and DISRPT .rels
  * xml/ - vertical XML representations with 1 token or tag per line, metadata, 5+ summaries and tab delimited lemmas, morphological segmentation and POS tags (extended VVZ style, vanilla, UPOS and CLAWS5, as well as dependency functions), compatible with the IMS Corpus Workbench (a.k.a. TreeTagger format).
