import type { Token } from "../../../shared/text/tokens.js";
import hiddenSignificanceVocabulary from "../data/hidden-significance-context.json" with { type: "json" };

const ABSTRACT_CHANGE_WORDS = new Set(
  hiddenSignificanceVocabulary.abstractChangeWords
);
const STRONG_ABSTRACT_CHANGE_WORDS = new Set(
  hiddenSignificanceVocabulary.strongAbstractChangeWords
);
const DETACHED_COMPANION_WORDS = new Set(
  hiddenSignificanceVocabulary.detachedCompanionWords
);
const AUXILIARIES = new Set(hiddenSignificanceVocabulary.auxiliaries);

export function startsWithDigit(word: string): boolean {
  const first = word.at(0);
  return first !== undefined && first >= "0" && first <= "9";
}

function relativeClauseIndexBefore(
  sentenceTokens: readonly Token[],
  sentenceIndex: number
): number {
  const start = Math.max(0, sentenceIndex - 6);
  const localIndex = sentenceTokens
    .slice(start, sentenceIndex)
    .findLastIndex((token) => token.normalized === "that");
  if (localIndex < 0) {
    return -1;
  }

  const clauseIndex = start + localIndex;
  const onlyAuxiliaries = sentenceTokens
    .slice(clauseIndex + 1, sentenceIndex)
    .every((token) => AUXILIARIES.has(token.normalized));
  return onlyAuxiliaries ? clauseIndex : -1;
}

export function hasLinkedMeasurementEvidence(
  sentenceTokens: readonly Token[],
  sentenceIndex: number
): boolean {
  const clauseIndex = relativeClauseIndexBefore(sentenceTokens, sentenceIndex);
  if (clauseIndex < 0) {
    return false;
  }

  return sentenceTokens
    .slice(Math.max(0, clauseIndex - 4), clauseIndex)
    .some((token) => startsWithDigit(token.normalized));
}

export function hasLinkedTechnicalSubjectEvidence(
  sentenceTokens: readonly Token[],
  sentenceIndex: number,
  technicalEvidenceWords: ReadonlySet<string>
): boolean {
  const clauseIndex = relativeClauseIndexBefore(sentenceTokens, sentenceIndex);
  if (clauseIndex < 0) {
    return false;
  }

  return sentenceTokens
    .slice(Math.max(0, clauseIndex - 3), clauseIndex)
    .some((token) => technicalEvidenceWords.has(token.normalized));
}

export function hasSpecifiedTechnicalEvidence(
  words: readonly string[],
  technicalEvidenceWords: ReadonlySet<string>
): boolean {
  const evidenceCount = words.filter((word) =>
    technicalEvidenceWords.has(word)
  ).length;
  return (
    words.some(startsWithDigit) ||
    words.includes("because") ||
    evidenceCount >= 2
  );
}

export function hasTechnicalEvidencePair(
  words: readonly string[],
  technicalEvidenceWords: ReadonlySet<string>
): boolean {
  return words.filter((word) => technicalEvidenceWords.has(word)).length >= 2;
}

export function hasLinkedTechnicalEvidence(
  text: string,
  tokens: readonly Token[],
  index: number,
  technicalEvidenceWords: ReadonlySet<string>
): boolean {
  const following = tokens.slice(index + 1);
  const boundaryIndex = following.findIndex((token) =>
    ["after", "because", "when"].includes(token.normalized)
  );
  const quietToken = tokens[index];
  const colonIndex =
    quietToken === undefined ? -1 : text.indexOf(":", quietToken.end);
  const evidence =
    boundaryIndex >= 0
      ? following.slice(boundaryIndex + 1)
      : colonIndex >= 0
        ? following.filter((token) => token.start > colonIndex)
        : [];

  return (
    (following[boundaryIndex]?.normalized === "because" &&
      evidence.length >= 3) ||
    hasSpecifiedTechnicalEvidence(
      evidence.map((token) => token.normalized),
      technicalEvidenceWords
    )
  );
}

export function hasDetachedCompanion(
  text: string,
  tokens: readonly Token[],
  index: number
): boolean {
  const companion = tokens
    .slice(0, index)
    .findLast((token) => DETACHED_COMPANION_WORDS.has(token.normalized));
  const target = tokens[index];
  return (
    companion !== undefined &&
    target !== undefined &&
    text.slice(companion.end, target.start).includes(",")
  );
}

export function hasInformativeChangeEvidence(
  clauseTokens: readonly Token[],
  clauseIndex: number,
  sentenceTokens: readonly Token[],
  sentenceIndex: number
): boolean {
  const clauseWords = clauseTokens.map((token) => token.normalized);
  const actionIndices = clauseWords.flatMap((word, index) =>
    ABSTRACT_CHANGE_WORDS.has(word) || STRONG_ABSTRACT_CHANGE_WORDS.has(word)
      ? [index]
      : []
  );
  const actionIndex = actionIndices.reduce<number | undefined>(
    (nearest, candidate) =>
      nearest === undefined ||
      Math.abs(candidate - clauseIndex) < Math.abs(nearest - clauseIndex)
        ? candidate
        : nearest,
    undefined
  );
  if (
    actionIndex !== undefined &&
    clauseWords.slice(actionIndex + 1, actionIndex + 7).some(startsWithDigit)
  ) {
    return true;
  }
  if (actionIndex === undefined) {
    return false;
  }

  const changeDetails = clauseWords.slice(actionIndex + 1, actionIndex + 11);
  const fromIndex = changeDetails.indexOf("from");
  const toIndex = changeDetails.indexOf("to");
  if (fromIndex >= 0 && toIndex > fromIndex) {
    return true;
  }
  const leadingDetails = clauseWords.slice(
    Math.max(0, actionIndex - 10),
    actionIndex
  );
  const leadingFromIndex = leadingDetails.indexOf("from");
  const leadingToIndex = leadingDetails.indexOf("to");
  if (leadingFromIndex >= 0 && leadingToIndex > leadingFromIndex) {
    return true;
  }

  const sentenceActionIndex = sentenceTokens.findIndex(
    (token) => token.start === clauseTokens[actionIndex]?.start
  );
  if (sentenceActionIndex < 0) {
    return false;
  }

  const explanation = sentenceTokens.slice(sentenceActionIndex + 1);
  const boundaryIndex = explanation.findIndex(
    (token) => token.normalized === "after" || token.normalized === "because"
  );
  return (
    sentenceActionIndex <= sentenceIndex &&
    boundaryIndex >= 0 &&
    explanation.length - boundaryIndex > 4
  );
}
