# TAACO 2.1
This repository houses the source code for the newest versions of the Tool for the Automatic Analysis of Cohesion (TAACO). For more information about TAACO, see www.linguisticanalysistools.org.

## New Features in TAACO 2.1.x
The previous version of TAACO (2.0.4) was written in Python 2.7 (which is no longer supported) and used Stanford CoreNLP (written in Java) for text pre-processing, part of speech tagging, and parsing.

TAACO 2.1.x is written for Python 3 and uses Spacy (which runs natively in Python) for text pre-processing, part of speech tagging, and parsing. The output of TAACO 2.1.x is slightly different than the output in TAACO 2.0.4 due to slight differences in sentence segmentation, tokenization, part of speech tagging, and parsing between Spacy and Stanford CoreNLP. By all accounts, however, Spacy is more accurate than CoreNLP, and should produce more accurate results.

See the file entitled "20230821_ELLIPSE_2.1.1_Validation_Summary.xlsx" for an overview of the correlations between TAACO 2.0.4 and 2.1.1 for all indices (based on the ELLIPSE corpus of second language writing).

## Dependencies
In order for TAACO to run properly, users will need to install the Spacy package and download the "en_web_core_sm" model. See <a href="https://spacy.io/" target="_blank">Spacy's website</a> for guidance.

## Running the TAACO GUI
To run TAACO with a graphical user interface, make sure that your working directory is the TAACO directory and run the following command in the terminal/command prompt:
```terminal
python TAACO_2.1.3.py
```
This will open a graphical user interface that can be used to run TAACO with the desired parameters.

## Running TAACO without the GUI
To run TAACO without the graphical user interface, ensure that your working directory is the TAACO directory, allowing the user to import TAACO as a Python package and process a folder of texts.

```python
from TAACOnoGUI import runTAACO

#set processing options
sampleVars = {"sourceKeyOverlap" : False, "sourceLSA" : False, "sourceLDA" : False, "sourceWord2vec" : False, "wordsAll" : True, "wordsContent" : True, "wordsFunction" : True, "wordsNoun" : True, "wordsPronoun" : True, "wordsArgument" : True, "wordsVerb" : True, "wordsAdjective" : True, "wordsAdverb" : True, "overlapSentence" : True, "overlapParagraph" : True, "overlapAdjacent" : True, "overlapAdjacent2" : True, "otherTTR" : True, "otherConnectives" : True, "otherGivenness" : True, "overlapLSA" : True, "overlapLDA" : True, "overlapWord2vec" : True, "overlapSynonym" : True, "overlapNgrams" : True, "outputTagged" : False, "outputDiagnostic" : False}

# Run TAACO on a folder of texts ("ELLIPSE_Sample/"), give the output file a name ("packageTest.csv), provide output for particular indices/options (as defined in sampleVars)
runTAACO("Ellipse_Sample/","packageTest.csv",sampleVars)
```
### Explanation of TAACO options
TAACO takes a dictionary of option keys with boolean values that can be adjusted as desired. Each corresponds to a checkbox/button in the GUI and is described below:

#### Source overlap indices:
Source overlap indices are used for integrated production tasks (e.g., read-write or listen-write tasks). They measure overlap between the source text (e.g., a reading passage) and the target text (e.g., an essay that references the source text).
- "sourceKeyOverlap": When a source text is provided, calculate key word overlap between target text and source text
- "sourceLSA" - When a source text is provided, calculate semantic similarity (via LSA) between target text and source text
- "sourceLDA" - When a source text is provided, calculate semantic similarity (via LDA) between target text and source text
- "sourceWord2vec" - When a source text is provided, calculate semantic similarity (via Word2Vec) between target text and source text

#### Word types to consider:
- "wordsAll" - Calculate indices (overlap and ttr) for all words
- "wordsContent" - Calculate indices (overlap and ttr) for content words
- "wordsFunction" - Calculate indices (overlap and ttr) for function words
- "wordsNoun" - Calculate indices (overlap and ttr) for nouns
- "wordsPronoun" - Calculate indices (overlap and ttr) for pronouns
- "wordsArgument" - Calculate indices (overlap and ttr) for arguments
- "wordsVerb" - Calculate indices (overlap and ttr) for verbs
- "wordsAdjective" - Calculate indices (overlap and ttr) for adjectives
- "wordsAdverb" - Calculate indices (overlap and ttr) for adverbs

#### Types of overlap:
- "overlapSentence" - Calculate sentence to sentence overlap
- "overlapParagraph" - Calculate paragraph to paragraph overlap
- "overlapAdjacent" - Calculate overlap for adjacent sections (sentences or paragraphs)
- "overlapAdjacent2" - Calculate overlap for two adjacent sections (sentences or paragraphs)
- "otherTTR" - Calculate TTR
- "otherConnectives" - Calculate connective indicidence indices
- "otherGivenness" - Calculate givenness indices
- "overlapLSA" - Calculate semantic similarity (LSA) across text sections
- "overlapLDA" - Calculate semantic similarity (LDA) across text sections
- "overlapWord2vec" - Calculate semantic similarity (Word2vec) across text sections
- "overlapSynonym" - Calculate synonym overlap across text sections
- "overlapNgrams" - Include ngram indices
- "outputTagged" - Output tagged representation of each text
- "outputDiagnostic" - Output diagnostic file (number of words, sentences, paragraphs, etc. per file)

## Future work
- Release a full TAACO Python package
- Release compiled versions of the GUI for Mac OSX, Windows, and Linux

## License
TAACO is available for use under a Creative Commons Attribution-NonCommercial-Sharealike license (4.0)

For a summary of this license (and a link to the full license) <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">click here</a>.