The subjectivity clues in the file subjclueslen1-HLTEMNLP05.tff were used
in the work presented in:

Theresa Wilson, Janyce Wiebe and Paul Hoffmann (2005). Recognizing Contextual
Polarity in Phrase-Level Sentiment Analysis. Proceedings of HLT/EMNLP 2005,
Vancouver, Canada.

----------------------------------------------------------------------------

I. Where the subjectivity clues are from

The clues in this file were collected from a number of sources.
Some were culled from manually developed resources.  Others were
identified automatically using both annotated and unannotated data.
A majority of the clues were collected as part of the work reported
in (Riloff and Wiebe, 2003).

II. Format of the clues

Each line in the file contains one subjectivity clue.  Below is an example:

type=strongsubj len=1 word1=abuse pos1=verb stemmed1=y priorpolarity=negative

a. type - either strongsubj or weaksubj
	A clue that is subjective in most context is considered strongly
	subjective (strongsubj), and those that may only have certain
	subjective usages are considered weakly subjective (weaksubj).

b. len - length of the clue in words
	All clues in this file are single words.

c. word1 - token or stem of the clue

d. pos1 - part of speech of the clue, may be anypos (any part of speech)

e. stemmed1 - y (yes) or n (no)
	Is the clue word1 stemmed?  If stemmed1=y, this means that the
	clue should match all unstemmed variants of the word with the
	corresponding part of speech.  For example, "abuse", above, will
	match "abuses" (verb), "abused" (verb), "abusing" (verb), but not
	"abuse" (noun) or "abuses" (noun).

f. priorpolarity - positive, negative, both, neutral
	The prior polarity of the clue.  Out of context, does the
	clue seem to evoke something positive or something negative.

----------------------------------------------------------------------

Riloff and Wiebe (2003). Learning extraction patterns for subjective
expressions. EMNLP-2003.

----------------------------------------------------------------------

Theresa Wilson
11/16/2005
