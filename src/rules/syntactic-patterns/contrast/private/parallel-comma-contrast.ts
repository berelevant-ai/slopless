import { hasConcreteCorrectionEvidence } from "../../../../shared/matchers/concrete-evidence.js";
import type { SplitSentence } from "../../../../shared/text/sentences.js";
import { wordTokens, type Token } from "../../../../shared/text/tokens.js";
import {
  pronounCopularReframe,
  sameSubjectCopularReframe
} from "./copular-reframe.js";
import { hasCommaBeforeNegation, words } from "./negation-reframe-parts.js";
import { shouldReportCopularReframe } from "./reframe-classification.js";

// "pay for problems we can demonstrate, not rules we can merely count": the
// halves around ", not" repeat a word pair, which is the slogan parallelism.
// Function-word-only pairs ("of the") are not evidence of parallel structure.
const FUNCTION_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "for",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to"
]);
const MINIMUM_HALF_WORDS = 3;

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
  return bigrams(after).some((pair) => beforePairs.has(pair));
}

// "It is not a failure, it is a signal." is the two-sentence copular reframe
// joined by a comma. Split at each comma and apply the pair matchers.
export function inlineCommaCopularReframe(sentence: SplitSentence): boolean {
  const text = sentence.text;
  if (hasConcreteCorrectionEvidence(text)) {
    return false;
  }

  for (let index = 0; index < text.length; index += 1) {
    if (text[index] !== ",") {
      continue;
    }

    const aTokens = wordTokens(text.slice(0, index));
    const bTokens = wordTokens(text.slice(index + 1));
    if (
      shouldReportCopularReframe(aTokens, bTokens, text) &&
      (sameSubjectCopularReframe(aTokens, bTokens) ||
        pronounCopularReframe(aTokens, bTokens))
    ) {
      return true;
    }
  }

  return false;
}
