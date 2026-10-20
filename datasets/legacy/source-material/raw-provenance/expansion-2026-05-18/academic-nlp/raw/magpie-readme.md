# MAGPIE Corpus
This is the **MAGPIE Corpus**, a large sense-annotated corpus of potentially idiomatic expressions (PIEs), based on the British National Corpus (BNC). Potentially idiomatic expressions are like idiomatic expressions, but the term also covers literal uses of idiomatic expressions, such as 'I leave work *at the end of the day*.' for the idiom 'at the end of the day'. The corpus contains 56,622 instances, covering 1,756 different idiom types, all of which have crowdsourced meaning labels. For details, see our [LREC paper](http://www.lrec-conf.org/proceedings/lrec2020/pdf/2020.lrec-1.35.pdf).

## Contents & Usage
This repository contains three jsonl-files containing the annotations. `MAGPIE_unfiltered.jsonl` contains the complete set of PIEs, regardless of annotation confidence or sense label.  The `MAGPIE_filtered_split_*.jsonl` files contain a filtered subset of the full corpus, including only PIEs with an annotation confidence level of 75% and binary sense labels, that is, only with the label *idiomatic* or *literal*. Of these, `MAGPIE_filtered_split_random.jsonl` is randomly split into a training, development, and test set, whereas `MAGPIE_filtered_split_typebased.jsonl` is split so that there is no overlap in idiom types between the training, development, and test sets.

The corpus is in [JSON Lines](http://jsonlines.org/) format, so it is easy to use across platforms, but also human-readable.

## Format
One instance in the corpus looks like this:

```
{
    u 'confidence': 1.0,
        u 'context': [u 'They were not .',
            u 'Emboldened by an alliance with Britain made in 1902 , Japan attacked Russian forces in January 1904 and proceeded to inflict a series of devastating defeats upon her by land and sea .',
            u 'In Russia the war aroused no more than a brief flicker of patriotic enthusiasm : years of nationalist propaganda under the last two tsars failed to bear fruit .',
            u 'The war was widely regarded , not without justice , as the product of intrigue at court and among a handful of entrepreneurs .',
            u 'Mobilization was unpopular : there was serious disaffection within the armed forces , dramatically highlighted by the mutiny on the battleship Potemkin in June 1905 .'
        ],
        u 'document_id': u 'EA6',
        u 'genre': u 'W ac:humanities arts',
        u 'id': 12366,
        u 'idiom': u 'bear fruit',
        u 'judgment_count': 3,
        u 'label': u 'i',
        u 'label_distribution': {
            u '?': 0.0,
            u 'f': 0.0,
            u 'i': 1.0,
            u 'l': 0.0,
            u 'o': 0.0
        },
        u 'non_standard_usage_explanations': [],
        u 'offsets': [
            [148, 152],
            [153, 158]
        ],
        u 'sentence_no': u '1592',
        u 'split': 'test',
        u 'variant_type': u 'identical'
}
```
