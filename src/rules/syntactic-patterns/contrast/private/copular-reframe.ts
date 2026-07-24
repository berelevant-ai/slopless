import {
  FACTUAL_NEGATION_CONNECTORS,
  NEGATION_WORDS,
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

const AGENTIC_SYSTEM_SUBJECTS = new Set([
  "agent",
  "assistant",
  "engine",
  "model",
  "system",
  "tool"
]);
const PAYOFF_VERBS = new Set([
  "compared",
  "considered",
  "encountered",
  "entered",
  "evaluated",
  "found",
  "met",
  "qualified",
  "ranked",
  "reached",
  "reviewed",
  "selected",
  "seen"
]);

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

export function negatedProgressiveNeverPayoff(
  first: readonly Token[],
  second: readonly Token[]
): boolean {
  const negation = findCopularNegation(first);
  if (
    negation === undefined ||
    !AGENTIC_SYSTEM_SUBJECTS.has(negation.subject.at(-1) ?? "") ||
    words(first)[negation.negatedPredicateStart]?.endsWith("ing") !== true
  ) {
    return false;
  }

  const secondWords = words(second);
  const neverIndex = secondWords.slice(1, 4).indexOf("never") + 1;
  return (
    ["it", "they"].includes(secondWords[0] ?? "") &&
    neverIndex > 0 &&
    PAYOFF_VERBS.has(secondWords[neverIndex + 1] ?? "") &&
    !secondWords.some((word) => FACTUAL_NEGATION_CONNECTORS.has(word)) &&
    secondWords.length <= 10
  );
}
