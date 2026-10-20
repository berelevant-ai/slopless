# SpecificityTwitter is a tool to predict sentence specificity of social media posts.

The dataset and models in this package are obtained using co-training as described in , AAAI 2019.

## Citation and contact

Please cite the AAAI-19 paper: Gao et al., [Predicting and Analyzing Language Specificity in Social Media Posts](https://cpb-us-w2.wpmucdn.com/web.sas.upenn.edu/dist/2/234/files/2018/11/specificity19aaai-26yaaod.pdf)

```
@InProceedings{gao2019specificity,
  author    = {Gao, Yifan  and  Zhong, Yang  and  Preo\c{t}iuc-Pietro, Daniel  and  Li, Junyi Jessy},
  title     = {Predicting and Analyzing Language Specificity in Social Media Posts},
  booktitle = {Proceedings of AAAI},
  year      = {2019},
}
```

## Dependencies

SpecificityTwitter is implemented using Python 3.6+. It depends on the following packages:
- numpy
- pandas
- pickle
- scikit-learn
- [emoji](https://gate.ac.uk/wiki/twitter-postagger.html)
- [GATE Twitter part-of-speech tagger](https://gate.ac.uk/wiki/twitter-postagger.html), please download the twitie-tagger and unzip it in current directory. You can also directly download the tagger we used [here](https://drive.google.com/file/d/18CZ07XpE-JkWpoHNf5NIdNaO0O70S86F/view?usp=sharing)

Our model was trained on a support vector regression model intergraded with scikit-learn. The last three packages together with the StanfordCoreNLP toolkit are required to generate features to be used in prediction.

## Data and resources

Word lexicons for the models are available for download [here](https://drive.google.com/file/d/1T6OrHye4v2pa_cIKQETTJqknsNNOrtjb/view?usp=sharing). Please note that these resources come with license(s). Decompress the folder under the model directory.

### Resources
There are several files in the resource folder.
- **Brown clusters (Turian et al., 2010)**

    browncluster.txt

- **Concrete level (Brysbaert wt al., 2014)**

    concrete.csv

- **[GloVe](https://nlp.stanford.edu/projects/glove/) Word Embedding trained on twitter posts (Pennington et al., 2014)**

    glove.twitter.27B.100d.txt

- **Sentiment words from (Hu and Liu, 2004)**

    negatie-words.txt

    positive-words.txt

- **Stanford NER tagger (Finkel et al., 2005)**

    stanford-ner.jar

    english.muc.7class.distsim.crf.ser.gz



## Running SpecificityTwitter

Call:
```
$ python specificity.py --inputfile inputfile --outputfile predfile
```

- `<inputfile>` should consists of *word-tokenized* sentences, one sentence per line;
- `<predfile>` will be the destination file which SpecicifityTwitter will write the specificity scores to, one score per line in the same order as sentences in `<inputfile>`.

The scores are decimal numbers ranging from 1 to 5, with 1.0 being most general and 5.0 being most specific.

## Practical notes
- Sentences must be word-tokenized before fed into this model.

- Note that the word embedding file is a 1.2 GB file and should be downloaded from the above link. Each run of specificity.py will load the file to generate features. Thus it is best to avoid loading it multiple times, or modify feature.py and tailor it for your data loading purpose.
