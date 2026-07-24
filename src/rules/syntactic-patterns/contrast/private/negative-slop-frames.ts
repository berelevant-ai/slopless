import type { Token } from "../../../../shared/text/tokens.js";
import { hasFactualConnectorAfterNegation } from "./negation-context-gates.js";
import { hasAbstractPolicyDirectObject } from "./policy-object.js";
import { negatedProgressiveNeverPayoff } from "./copular-reframe.js";
import { GENERIC_ACTION_VERBS } from "./action-reframe-vocabulary.js";
export { shouldReportCopularReframe } from "./reframe-classification.js";
export {
  progressiveVerbMirror,
  pronounCopularReframe,
  sameSubjectCopularReframe,
  startsWithNegatedPronounCopula
} from "./copular-reframe.js";
export { matchSequenceReframe } from "./sequence-reframes.js";
import {
  ACTION_NEGATIONS,
  EXPLICIT_DO_AUXILIARIES,
  FACTUAL_NEGATION_CONNECTORS,
  PRONOUN_REFRAME_STARTS,
  findCopularNegation,
  pronounCopulaStart,
  skipOptionalAdverbs,
  startsWithAny,
  startsWithSubjectOrPronoun,
  startsWithWords,
  stripLeadingPairPivot,
  validSubject,
  words
} from "./negation-reframe-parts.js";

const NEGATED_ACTION_REFRAME_VERBS = new Set([
  "avoid",
  "change",
  "create",
  "end",
  "erase",
  "fix",
  "guarantee",
  "make",
  "mean",
  "remove",
  "replace",
  "require",
  "skip",
  "solve"
]);
const REPLACEMENT_SUBJECT_PRONOUNS = new Set(["he", "she"]);
const EMBEDDED_CLAUSE_VERBS = new Set([
  "believed",
  "explained",
  "reckoned",
  "reported",
  "said",
  "thought"
]);
const PRONOUN_PAYOFF_VERBS = new Set([
  "becomes",
  "creates",
  "depends",
  "exposes",
  "lands",
  "means",
  "moves",
  "needs",
  "points",
  "requires",
  "reveals",
  "shifts",
  "shows",
  "turns"
]);
const PRONOUN_SUBJECTS = new Set(["it", "this", "that", "they", "we", "you"]);
const ACTION_REPLACEMENT_CONNECTORS = new Set([
  ...FACTUAL_NEGATION_CONNECTORS,
  "after"
]);

function startsWithPassiveCopula(tokens: readonly Token[]): boolean {
  const tokenWords = words(tokens);
  const predicateIndex = startsWithAny(tokens, PRONOUN_REFRAME_STARTS)
    ? skipOptionalAdverbs(tokenWords, 2)
    : undefined;

  return tokenWords[predicateIndex ?? -1]?.endsWith("ed") === true;
}

function noLongerCopularReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const tokenWords = words(aTokens);
  const contractedStart = pronounCopulaStart(aTokens);

  if (
    contractedStart !== undefined &&
    tokenWords[contractedStart.predicateStart] === "no" &&
    tokenWords[contractedStart.predicateStart + 1] === "longer"
  ) {
    return (
      startsWithSubjectOrPronoun(bTokens, contractedStart.subject) &&
      !startsWithPassiveCopula(bTokens)
    );
  }

  for (let index = 0; index < tokenWords.length - 2; index += 1) {
    const current = tokenWords[index];
    const subject = tokenWords.slice(0, index);

    if (
      current === undefined ||
      !validSubject(subject) ||
      current !== "was" ||
      tokenWords[index + 1] !== "no" ||
      tokenWords[index + 2] !== "longer"
    ) {
      continue;
    }

    return (
      startsWithSubjectOrPronoun(bTokens, subject) &&
      !startsWithPassiveCopula(bTokens)
    );
  }

  return false;
}

function fragmentDefinitionReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const tokenWords = words(aTokens);

  if (
    tokenWords[0] !== "not" ||
    !["a", "an", "the"].includes(tokenWords[1] ?? "") ||
    tokenWords.length > 8
  ) {
    return false;
  }

  return (
    startsWithAny(bTokens, PRONOUN_REFRAME_STARTS) ||
    startsWithWords(bTokens, ["a"]) ||
    startsWithWords(bTokens, ["an"]) ||
    startsWithWords(bTokens, ["the"])
  );
}

function negatedActionSubject(
  tokens: readonly Token[]
): readonly string[] | undefined {
  const tokenWords = words(tokens);
  const copularNegation = findCopularNegation(tokens);
  if (
    copularNegation !== undefined &&
    validSubject(copularNegation.subject) &&
    tokenWords[copularNegation.negatedPredicateStart]?.endsWith("ing") === true
  ) {
    return copularNegation.subject;
  }

  for (let index = 0; index < tokenWords.length; index += 1) {
    const current = tokenWords[index];
    const next = tokenWords[index + 1];
    const subject = tokenWords.slice(0, index);

    if (
      !validSubject(subject) ||
      subject.some((word) => EMBEDDED_CLAUSE_VERBS.has(word))
    ) {
      continue;
    }

    if (ACTION_NEGATIONS.has(current ?? "")) {
      return tokenWords[index + 1] !== undefined &&
        !tokenWords.slice(index + 1).includes("and")
        ? subject
        : undefined;
    }

    if (EXPLICIT_DO_AUXILIARIES.has(current ?? "") && next === "not") {
      return tokenWords[index + 2] !== undefined &&
        !tokenWords.slice(index + 2).includes("and")
        ? subject
        : undefined;
    }
  }

  return undefined;
}

function constrainedSetSubjectLength(
  tokens: readonly Token[],
  subject: readonly string[]
): number | undefined {
  if (startsWithWords(tokens, subject)) {
    return subject.length;
  }

  if (startsWithSubjectOrPronoun(tokens, subject)) {
    return 1;
  }

  return subject.length > 1 &&
    REPLACEMENT_SUBJECT_PRONOUNS.has(tokens[0]?.normalized ?? "")
    ? 1
    : undefined;
}

export function negatedActionReplacement(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const tokenWords = words(aTokens);
  const subject = negatedActionSubject(aTokens);
  if (subject === undefined) {
    return false;
  }

  const bContentTokens = stripLeadingPairPivot(bTokens);
  const bWords = words(bContentTokens);
  const subjectLength = constrainedSetSubjectLength(bContentTokens, subject);
  const genericVerbIndex =
    subjectLength === undefined
      ? undefined
      : skipOptionalAdverbs(bWords, subjectLength);

  return (
    tokenWords.length <= 14 &&
    !tokenWords.some((word) => FACTUAL_NEGATION_CONNECTORS.has(word)) &&
    !bWords.some((word) => ACTION_REPLACEMENT_CONNECTORS.has(word)) &&
    ((genericVerbIndex !== undefined &&
      GENERIC_ACTION_VERBS.has(bWords[genericVerbIndex] ?? "")) ||
      negatedActionSetReplacement(aTokens, bTokens))
  );
}

export function negatedActionSetReplacement(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const tokenWords = words(aTokens);
  const subject = negatedActionSubject(aTokens);
  if (subject === undefined) {
    return false;
  }

  const bContentTokens = stripLeadingPairPivot(bTokens);
  const bWords = words(bContentTokens);
  const subjectLength = constrainedSetSubjectLength(bContentTokens, subject);
  const verbIndex =
    subjectLength === undefined
      ? undefined
      : skipOptionalAdverbs(bWords, subjectLength);

  return (
    tokenWords.length <= 14 &&
    !tokenWords.some((word) => FACTUAL_NEGATION_CONNECTORS.has(word)) &&
    !bWords.some((word) => ACTION_REPLACEMENT_CONNECTORS.has(word)) &&
    verbIndex !== undefined &&
    hasAbstractPolicyDirectObject(bWords, verbIndex)
  );
}

function notBecauseReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  return (
    startsWithWords(aTokens, ["not", "because"]) &&
    startsWithWords(bTokens, ["because"])
  );
}

function hasTrailingProblemFrame(tokens: readonly string[]): boolean {
  return (
    tokens.at(-3) === "not" &&
    tokens.at(-2) === "the" &&
    tokens.at(-1) === "problem"
  );
}

function hasLeadingProblemFrame(tokens: readonly string[]): boolean {
  return (
    tokens[0] === "the" &&
    tokens[1] === "problem" &&
    tokens[2] === "is" &&
    tokens[3] === "not"
  );
}

function endsWithCopularPredicate(tokens: readonly string[]): boolean {
  const last = tokens.at(-1);
  return last === "is" || last === "was" || last === "are" || last === "were";
}

function notProblemReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const aWords = words(aTokens);
  const bWords = words(bTokens);

  return (
    (hasTrailingProblemFrame(aWords) || hasLeadingProblemFrame(aWords)) &&
    bWords.length <= 8 &&
    endsWithCopularPredicate(bWords)
  );
}

export function hasNegativeSlopPairSignal(tokens: readonly Token[]): boolean {
  const tokenWords = words(tokens);

  return (
    tokenWords.some(
      (token, index) => token === "no" && tokenWords[index + 1] === "longer"
    ) ||
    startsWithWords(tokens, ["not", "because"]) ||
    hasTrailingProblemFrame(tokenWords) ||
    hasLeadingProblemFrame(tokenWords)
  );
}

export function negatedActionPronounPayoff(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const aWords = words(aTokens);
  const bWords = words(stripLeadingPairPivot(bTokens));
  const pronounStart = PRONOUN_SUBJECTS.has(bWords[0] ?? "") ? 1 : undefined;
  if (pronounStart === undefined) {
    return false;
  }

  const payoffVerbIndex = skipOptionalAdverbs(bWords, pronounStart);
  if (!PRONOUN_PAYOFF_VERBS.has(bWords[payoffVerbIndex] ?? "")) {
    return false;
  }

  for (let index = 0; index < aWords.length; index += 1) {
    if (hasNegatedReframeVerb(aTokens, aWords, index)) {
      return true;
    }
  }

  return false;
}

function hasNegatedReframeVerb(
  tokens: readonly Token[],
  tokenWords: readonly string[],
  index: number
): boolean {
  const current = tokenWords[index];
  const next = tokenWords[index + 1];
  const subject = tokenWords.slice(0, index);

  if (!validSubject(subject)) {
    return false;
  }

  const negationIndex = ACTION_NEGATIONS.has(current ?? "")
    ? index
    : EXPLICIT_DO_AUXILIARIES.has(current ?? "") && next === "not"
      ? index + 1
      : undefined;
  if (
    negationIndex === undefined ||
    hasFactualConnectorAfterNegation(tokens, negationIndex)
  ) {
    return false;
  }

  const verbIndex = skipOptionalAdverbs(tokenWords, negationIndex + 1);
  return NEGATED_ACTION_REFRAME_VERBS.has(tokenWords[verbIndex] ?? "");
}

export function negativeSlopReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  return (
    noLongerCopularReframe(aTokens, bTokens) ||
    negatedProgressiveNeverPayoff(aTokens, bTokens) ||
    fragmentDefinitionReframe(aTokens, bTokens) ||
    negatedActionReplacement(aTokens, bTokens) ||
    notBecauseReframe(aTokens, bTokens) ||
    notProblemReframe(aTokens, bTokens)
  );
}
