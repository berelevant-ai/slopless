import type { Token } from "../../../../shared/text/tokens.js";
import {
  FACTUAL_NEGATION_CONNECTORS,
  findCopularNegation,
  pronounCopulaStart,
  stripLeadingPairPivot,
  words
} from "./negation-reframe-parts.js";

const FRAMING_SUBJECT_NOUNS = new Set([
  "answer",
  "fix",
  "goal",
  "issue",
  "key",
  "point",
  "problem",
  "solution",
  "strategy"
]);
const INSTRUCTION_ADJECTIVES = new Set([
  "best",
  "better",
  "critical",
  "essential",
  "important",
  "necessary",
  "recommended",
  "safest"
]);
const CONCRETE_PASSIVE_VERBS = new Set([
  "associated",
  "caused",
  "classified",
  "created",
  "entered",
  "linked",
  "owned",
  "paid",
  "passed",
  "produced",
  "recorded",
  "regulated",
  "sent",
  "stored",
  "used"
]);
const REFERENCE_PASSIVE_VERBS = new Set(["defined", "described", "marked"]);
const PASSIVE_EXPLANATION_LINKS = new Set([
  "as",
  "by",
  "for",
  "from",
  "in",
  "to",
  "with"
]);
const CLAUSE_BOUNDARIES = new Set([
  "and",
  "but",
  "that",
  "when",
  "where",
  "which",
  "while"
]);
const CONCRETE_RELATIONS = [
  ["amount", "of"],
  ["defined", "to", "be"],
  ["derived", "from"],
  ["intended", "for"],
  ["owned", "by"],
  ["property", "of"],
  ["symptom", "of"],
  ["unit", "of"]
] as const;
const MAX_SHORT_SENTENCE_WORDS = 6;
const QUANTITY_WORDS = new Set([
  "half",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten"
]);
const TIME_DETAIL_WORDS = new Set([
  "today",
  "tomorrow",
  "tonight",
  "yesterday",
  "noon",
  "midnight",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
]);

function digitTokenCount(tokens: readonly Token[]): number {
  return tokens.filter((token) =>
    [...token.text].some((character) => character >= "0" && character <= "9")
  ).length;
}

function quantityTokenCount(tokens: readonly Token[]): number {
  return (
    digitTokenCount(tokens) +
    tokens.filter((token) => QUANTITY_WORDS.has(token.normalized)).length
  );
}

function acronymCount(tokens: readonly Token[]): number {
  return tokens.filter(
    (token) =>
      token.text.length >= 2 &&
      token.text === token.text.toLocaleUpperCase("en") &&
      token.text !== token.text.toLocaleLowerCase("en")
  ).length;
}

function properNameCount(tokens: readonly Token[]): number {
  return tokens.filter((token, index) => {
    const first = token.text[0];
    return (
      index > 0 &&
      first !== undefined &&
      first >= "A" &&
      first <= "Z" &&
      token.text !== token.text.toLocaleUpperCase("en")
    );
  }).length;
}

function hasReferenceEvidence(
  aTokens: readonly Token[],
  bTokens: readonly Token[],
  pairText: string
): boolean {
  const digits = digitTokenCount(aTokens) + digitTokenCount(bTokens);
  const quantities = quantityTokenCount(aTokens) + quantityTokenCount(bTokens);
  const names = properNameCount(aTokens) + properNameCount(bTokens);
  return (
    digits >= 2 ||
    pairText.includes("/") ||
    pairText.includes("_") ||
    pairText.includes("@") ||
    (acronymCount(aTokens) + acronymCount(bTokens) >= 1 && digits >= 1) ||
    names >= 3 ||
    (names >= 2 && quantities >= 1)
  );
}

function startsWithSequence(
  source: readonly string[],
  sequence: readonly string[]
): boolean {
  return sequence.every((word, index) => source[index] === word);
}

function containsSequence(
  source: readonly string[],
  sequence: readonly string[]
): boolean {
  for (let index = 0; index <= source.length - sequence.length; index += 1) {
    if (startsWithSequence(source.slice(index), sequence)) {
      return true;
    }
  }
  return false;
}

function hasConcreteRelation(tokenWords: readonly string[]): boolean {
  return CONCRETE_RELATIONS.some((relation) =>
    containsSequence(tokenWords, relation)
  );
}

function hasInstruction(tokens: readonly Token[]): boolean {
  const tokenWords = words(tokens);
  const start = pronounCopulaStart(tokens);
  return (
    start !== undefined &&
    INSTRUCTION_ADJECTIVES.has(tokenWords[start.predicateStart] ?? "") &&
    tokenWords[start.predicateStart + 1] === "to"
  );
}

function hasPassiveExplanation(bTokens: readonly Token[]): boolean {
  const tokenWords = words(bTokens);
  const start = pronounCopulaStart(bTokens);
  const isConcretePassive = (word: string): boolean =>
    CONCRETE_PASSIVE_VERBS.has(word) || REFERENCE_PASSIVE_VERBS.has(word);

  if (
    start !== undefined &&
    isConcretePassive(tokenWords[start.predicateStart] ?? "")
  ) {
    return true;
  }

  const boundary = tokenWords.findIndex((word) => CLAUSE_BOUNDARIES.has(word));
  const firstClause = boundary < 0 ? tokenWords : tokenWords.slice(0, boundary);
  return firstClause.some(
    (word, index) =>
      isConcretePassive(word) &&
      PASSIVE_EXPLANATION_LINKS.has(firstClause[index + 1] ?? "")
  );
}

function hasPurposeOrProvenance(tokenWords: readonly string[]): boolean {
  return (
    containsSequence(tokenWords, ["used", "to"]) ||
    (["uses", "used"].includes(tokenWords[1] ?? "") &&
      tokenWords.some(
        (word, index) =>
          ["created", "produced"].includes(word) &&
          ["by", "from", "in"].includes(tokenWords[index + 1] ?? "")
      ))
  );
}

function hasCausalPassiveExplanation(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  return (
    words(aTokens).some((word) => FACTUAL_NEGATION_CONNECTORS.has(word)) &&
    hasPassiveExplanation(bTokens)
  );
}

function hasCausalConcreteCorrection(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  return (
    words(aTokens).some((word) => FACTUAL_NEGATION_CONNECTORS.has(word)) &&
    (quantityTokenCount(bTokens) > 0 ||
      words(bTokens).some((word) => TIME_DETAIL_WORDS.has(word)))
  );
}

function hasDistinctCauseExplanation(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const aWords = words(aTokens);
  const bWords = words(stripLeadingPairPivot(bTokens));
  return (
    !aWords.includes("caused") && containsSequence(bWords, ["caused", "by"])
  );
}

function hasConcreteExplanatoryEvidence(
  aTokens: readonly Token[],
  bTokens: readonly Token[],
  pairText: string
): boolean {
  const tokenWords = words(stripLeadingPairPivot(bTokens));
  return (
    hasInstruction(bTokens) ||
    hasConcreteRelation(tokenWords) ||
    hasPurposeOrProvenance(tokenWords) ||
    hasDistinctCauseExplanation(aTokens, bTokens) ||
    hasCausalPassiveExplanation(aTokens, bTokens) ||
    hasCausalConcreteCorrection(aTokens, bTokens) ||
    (hasReferenceEvidence(aTokens, bTokens, pairText) &&
      hasPassiveExplanation(bTokens))
  );
}

function hasFramingNoun(tokens: readonly Token[]): boolean {
  const negation = findCopularNegation(tokens);
  if (negation === undefined) {
    return false;
  }

  const predicate = words(tokens).slice(
    negation.negatedPredicateStart,
    negation.negatedPredicateStart + 4
  );
  return [...negation.subject, ...predicate].some((word) =>
    FRAMING_SUBJECT_NOUNS.has(word)
  );
}

function isShortReversal(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  return (
    aTokens.length <= MAX_SHORT_SENTENCE_WORDS &&
    bTokens.length <= MAX_SHORT_SENTENCE_WORDS
  );
}

export function shouldReportCopularReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[],
  pairText: string
): boolean {
  return (
    isShortReversal(aTokens, bTokens) ||
    hasFramingNoun(aTokens) ||
    !hasConcreteExplanatoryEvidence(aTokens, bTokens, pairText)
  );
}
