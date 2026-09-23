import { hasConcreteCorrectionEvidence } from "../../../../shared/matchers/concrete-evidence.js";
import type { SplitSentence } from "../../../../shared/text/sentences.js";
import { wordTokens, type Token } from "../../../../shared/text/tokens.js";
import {
  pronounCopularReframe,
  sameSubjectCopularReframe,
  startsWithNegatedPronounCopula
} from "./copular-reframe.js";
import {
  FACTUAL_NEGATION_CONNECTORS,
  findCopularNegation,
  hasCommaBeforeNegation,
  words
} from "./negation-reframe-parts.js";
import { shouldReportCopularReframe } from "./reframe-classification.js";

// "pay for problems we can demonstrate, not rules we can merely count": the
// halves around ", not" repeat a word pair or a content word ("features users
// ask for, not features we wish they asked for"), which is the slogan
// parallelism. Function words alone are not evidence of parallel structure.
const FUNCTION_WORDS = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "as",
  "at",
  "been",
  "but",
  "by",
  "for",
  "from",
  "have",
  "her",
  "his",
  "in",
  "into",
  "its",
  "just",
  "like",
  "more",
  "most",
  "not",
  "of",
  "on",
  "only",
  "or",
  "our",
  "some",
  "than",
  "that",
  "the",
  "their",
  "them",
  "these",
  "they",
  "this",
  "those",
  "to",
  "was",
  "were",
  "what",
  "when",
  "which",
  "will",
  "with",
  "your"
]);
const MINIMUM_HALF_WORDS = 3;
const MINIMUM_CONTENT_WORD_LENGTH = 4;

function contentWords(tokenWords: readonly string[]): readonly string[] {
  return tokenWords.filter(
    (word) =>
      !FUNCTION_WORDS.has(word) && word.length >= MINIMUM_CONTENT_WORD_LENGTH
  );
}

function hasDigit(text: string): boolean {
  return [...text].some((character) => character >= "0" && character <= "9");
}

function bigrams(tokenWords: readonly string[]): readonly string[] {
  const pairs: string[] = [];
  for (let index = 0; index < tokenWords.length - 1; index += 1) {
    const first = tokenWords[index] ?? "";
    const second = tokenWords[index + 1] ?? "";
    if (!FUNCTION_WORDS.has(first) || !FUNCTION_WORDS.has(second)) {
      pairs.push(`${first} ${second}`);
    }
  }
  return pairs;
}

export function hasParallelCommaContrast(
  sentence: SplitSentence,
  tokens: readonly Token[],
  negationIndex: number
): boolean {
  const negation = tokens[negationIndex];
  if (
    negation === undefined ||
    !hasCommaBeforeNegation(sentence.text, negation.start)
  ) {
    return false;
  }

  const before = words(tokens.slice(0, negationIndex));
  const after = words(tokens.slice(negationIndex + 1));
  if (before.length < MINIMUM_HALF_WORDS || after.length < MINIMUM_HALF_WORDS) {
    return false;
  }

  const beforePairs = new Set(bigrams(before));
  const beforeContent = new Set(contentWords(before));
  // A shared content word is weaker evidence than a shared pair, so a digit
  // ("sent to the Berlin office, not the Hamburg office, on March 3") vetoes it.
  return (
    bigrams(after).some((pair) => beforePairs.has(pair)) ||
    (!hasDigit(sentence.text) &&
      contentWords(after).some((word) => beforeContent.has(word)))
  );
}

// "It is not a failure, it is a signal." is the two-sentence copular reframe
// joined by a comma. Split at the first comma after the negation and apply
// the pair matchers. A negated clause that already continues with "but",
// "and", or a factual connector ("you are not holding ..., but if she ...")
// is an ordinary sentence, not a staged reframe.
const CLAUSE_CONTINUATIONS = new Set([
  ...FACTUAL_NEGATION_CONNECTORS,
  "and",
  "but",
  "or"
]);

export function inlineCommaCopularReframe(sentence: SplitSentence): boolean {
  const text = sentence.text;
  const negation = findCopularNegation(wordTokens(text));
  const index = negation === undefined ? -1 : text.indexOf(",");
  if (index < 0 || hasConcreteCorrectionEvidence(text)) {
    return false;
  }

  const aTokens = wordTokens(text.slice(0, index));
  const bTokens = wordTokens(text.slice(index + 1));
  return (
    findCopularNegation(aTokens) !== undefined &&
    !words(aTokens).some((word) => CLAUSE_CONTINUATIONS.has(word)) &&
    !startsWithNegatedPronounCopula(bTokens) &&
    shouldReportCopularReframe(aTokens, bTokens, text) &&
    (sameSubjectCopularReframe(aTokens, bTokens) ||
      pronounCopularReframe(aTokens, bTokens))
  );
}
