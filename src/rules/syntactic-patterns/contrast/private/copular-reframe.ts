import {
  NEGATION_WORDS,
  PASSIVE_DEFINITION_VERBS,
  findCopularNegation,
  pronounCopulaStart,
  skipOptionalAdverbs,
  startsWithPronounCopula,
  startsWithWords,
  startsWithSubjectCopula,
  validSubject,
  words
} from "./negation-reframe-parts.js";
import type { Token } from "../../../../shared/text/tokens.js";

export function sameSubjectCopularReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const negation = findCopularNegation(aTokens);

  if (negation === undefined || !validSubject(negation.subject)) {
    return false;
  }

  return startsWithSubjectCopula(
    bTokens,
    negation.subject,
    negation.affirmativeAux
  );
}

export function pronounCopularReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const negation = findCopularNegation(aTokens);

  return (
    negation !== undefined &&
    validSubject(negation.subject) &&
    !looksLikePassiveDefinition(bTokens) &&
    !startsWithNegatedPronounCopula(bTokens) &&
    startsWithPronounCopula(bTokens)
  );
}

export function progressiveVerbMirror(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const negation = findCopularNegation(aTokens);

  if (negation === undefined || !validSubject(negation.subject)) {
    return false;
  }

  const tokenWords = words(aTokens);
  const predicateIndex = skipOptionalAdverbs(
    tokenWords,
    negation.negatedPredicateStart
  );
  const verb = tokenWords[predicateIndex];

  return (
    verb !== undefined &&
    verb.endsWith("ing") &&
    startsWithWords(bTokens, [
      ...negation.subject,
      negation.affirmativeAux,
      verb
    ])
  );
}

export function startsWithNegatedPronounCopula(
  tokens: readonly Token[]
): boolean {
  const start = pronounCopulaStart(tokens);
  if (start === undefined) {
    return false;
  }

  const tokenWords = words(tokens);
  const predicateIndex = skipOptionalAdverbs(tokenWords, start.predicateStart);

  return NEGATION_WORDS.has(tokenWords[predicateIndex] ?? "");
}

function looksLikePassiveDefinition(tokens: readonly Token[]): boolean {
  const tokenWords = words(tokens);
  const start = pronounCopulaStart(tokens);
  if (start?.subject[0] !== "it") {
    return false;
  }

  return PASSIVE_DEFINITION_VERBS.has(tokenWords[start.predicateStart] ?? "");
}
