import { hasConcreteCorrectionEvidence } from "../../../../shared/matchers/concrete-evidence.js";
import { type SplitSentence } from "../../../../shared/text/sentences.js";
import { type Token } from "../../../../shared/text/tokens.js";
import { hasFactualConnectorAfterNegation } from "./negation-context-gates.js";
import type { NegationReframeMatch } from "./negation-reframe-matcher.js";
import {
  findCopularNegation,
  findNegationIndex,
  startsWithWords,
  words
} from "./negation-reframe-parts.js";
export { matchesInlineSemicolonReframe } from "./inline-semicolon-reframe.js";

export function inlineNotJustCopularReframe(
  sentence: SplitSentence,
  tokens: readonly Token[]
): NegationReframeMatch | undefined {
  const negation = findCopularNegation(tokens);
  const negationIndex = findNegationIndex(tokens);
  const tokenWords = words(tokens);

  if (
    negation === undefined ||
    negationIndex === undefined ||
    tokenWords[negation.negatedPredicateStart] !== "just" ||
    hasFactualConnectorAfterNegation(tokens, negationIndex) ||
    !hasLaterAffirmativeCopula(tokens, negation) ||
    hasConcreteCorrectionEvidence(sentence.text)
  ) {
    return undefined;
  }

  return {
    end: sentence.end,
    start: sentence.start,
    text: sentence.text
  };
}

function hasLaterAffirmativeCopula(
  tokens: readonly Token[],
  negation: NonNullable<ReturnType<typeof findCopularNegation>>
): boolean {
  for (
    let index = negation.negatedPredicateStart + 1;
    index < tokens.length;
    index += 1
  ) {
    const suffix = tokens.slice(index);
    if (
      startsWithWords(suffix, [...negation.subject, negation.affirmativeAux]) ||
      startsWithWords(suffix, ["it", negation.affirmativeAux])
    ) {
      return true;
    }
  }

  return false;
}

const SHORT_NEGATED_BEAT_VERBS = new Set(["wait"]);
const SHORT_NEGATED_BEAT_PRONOUNS = new Set(["he", "i", "she", "they", "we"]);

function hasPersonalOrNamedSubject(
  tokens: readonly Token[],
  negationIndex: number
): boolean {
  const subject = tokens.slice(0, negationIndex);
  const subjectToken = subject[0];
  const firstCharacter = subjectToken?.text[0];

  return (
    subject.length === 1 &&
    subjectToken !== undefined &&
    (SHORT_NEGATED_BEAT_PRONOUNS.has(subjectToken.normalized) ||
      (firstCharacter !== undefined &&
        firstCharacter >= "A" &&
        firstCharacter <= "Z"))
  );
}

export function inlineShortNegatedBeat(
  sentence: SplitSentence,
  tokens: readonly Token[]
): NegationReframeMatch | undefined {
  const tokenWords = words(tokens);
  const didIndex = tokenWords.findIndex(
    (word, index) =>
      word === "didn't" || (word === "did" && tokenWords[index + 1] === "not")
  );
  const verbIndex =
    tokenWords[didIndex] === "did" ? didIndex + 2 : didIndex + 1;

  if (
    didIndex < 1 ||
    tokenWords.length > 4 ||
    tokenWords[verbIndex + 1] !== undefined ||
    !SHORT_NEGATED_BEAT_VERBS.has(tokenWords[verbIndex] ?? "") ||
    !hasPersonalOrNamedSubject(tokens, didIndex)
  ) {
    return undefined;
  }

  return {
    end: sentence.end,
    start: sentence.start,
    text: sentence.text
  };
}
