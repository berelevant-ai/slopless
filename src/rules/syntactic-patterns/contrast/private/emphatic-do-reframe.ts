import { hasConcreteCorrectionEvidence } from "../../../../shared/matchers/concrete-evidence.js";
import type { Token } from "../../../../shared/text/tokens.js";
import { hasFactualConnectorAfterNegation } from "./negation-context-gates.js";
import {
  DO_NEGATIONS,
  EXPLICIT_DO_AUXILIARIES,
  FACTUAL_NEGATION_CONNECTORS,
  NEGATION_WORDS,
  skipOptionalAdverbs,
  startsWithWords,
  stripLeadingPairPivot,
  validSubject,
  words
} from "./negation-reframe-parts.js";

// "X does not A. X does, however, B." The negated do-verb sets up an emphatic
// affirmative do-verb on the same subject or a pronoun. Same-verb mirrors
// ("does not help. It helps.") are handled by actionVerbMirror; this covers the
// different-verb emphatic form that stages a contrast instead of stating B.
const EMPHATIC_INTERJECTIONS = new Set([
  "also",
  "however",
  "instead",
  "nonetheless",
  "still",
  "though"
]);
const PRONOUN_SUBJECTS = new Set([
  "he",
  "i",
  "it",
  "she",
  "that",
  "they",
  "this",
  "we",
  "you"
]);

function negatedDoSubject(
  tokens: readonly Token[]
): readonly string[] | undefined {
  const tokenWords = words(tokens);

  for (let index = 0; index < tokenWords.length; index += 1) {
    const current = tokenWords[index] ?? "";
    const subject = tokenWords.slice(0, index);
    if (!validSubject(subject)) {
      continue;
    }

    const negationIndex = DO_NEGATIONS.has(current)
      ? index
      : EXPLICIT_DO_AUXILIARIES.has(current) && tokenWords[index + 1] === "not"
        ? index + 1
        : undefined;
    if (negationIndex === undefined) {
      continue;
    }

    const verb = tokenWords[skipOptionalAdverbs(tokenWords, negationIndex + 1)];
    return verb === undefined ||
      hasFactualConnectorAfterNegation(tokens, negationIndex)
      ? undefined
      : subject;
  }

  return undefined;
}

function affirmativeDoVerb(
  bTokens: readonly Token[],
  subject: readonly string[]
): number | undefined {
  const content = stripLeadingPairPivot(bTokens);
  const contentWords = words(content);
  const subjectLength = startsWithWords(content, subject)
    ? subject.length
    : PRONOUN_SUBJECTS.has(contentWords[0] ?? "")
      ? 1
      : undefined;
  if (
    subjectLength === undefined ||
    !EXPLICIT_DO_AUXILIARIES.has(contentWords[subjectLength] ?? "")
  ) {
    return undefined;
  }

  let verbIndex = subjectLength + 1;
  while (EMPHATIC_INTERJECTIONS.has(contentWords[verbIndex] ?? "")) {
    verbIndex += 1;
  }
  verbIndex = skipOptionalAdverbs(contentWords, verbIndex);
  const verb = contentWords[verbIndex];

  return verb === undefined || NEGATION_WORDS.has(verb) ? undefined : verbIndex;
}

export function emphaticDoReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[],
  pairText: string
): boolean {
  const subject = negatedDoSubject(aTokens);
  if (subject === undefined) {
    return false;
  }

  const verbIndex = affirmativeDoVerb(bTokens, subject);
  return (
    verbIndex !== undefined &&
    !words(stripLeadingPairPivot(bTokens))
      .slice(verbIndex + 1)
      .some((word) => FACTUAL_NEGATION_CONNECTORS.has(word)) &&
    !hasConcreteCorrectionEvidence(pairText)
  );
}
