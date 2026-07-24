import type { Token } from "../../../shared/text/tokens.js";
import quietlyContextVocabulary from "../data/quietly-context.json" with { type: "json" };

const ABSTRACT_CHANGE_WORDS = new Set(
  quietlyContextVocabulary.abstractChangeWords
);
const STRONG_ABSTRACT_CHANGE_WORDS = new Set(
  quietlyContextVocabulary.strongAbstractChangeWords
);
const DETACHED_COMPANION_WORDS = new Set(
  quietlyContextVocabulary.detachedCompanionWords
);
const TECHNICAL_EVIDENCE_WORDS = new Set(
  quietlyContextVocabulary.technicalEvidenceWords
);

function startsWithDigit(word: string): boolean {
  const first = word.at(0);
  return first !== undefined && first >= "0" && first <= "9";
}

export function hasSpecifiedTechnicalEvidence(
  words: readonly string[]
): boolean {
  const evidenceCount = words.filter((word) =>
    TECHNICAL_EVIDENCE_WORDS.has(word)
  ).length;
  return (
    words.some(startsWithDigit) ||
    words.includes("because") ||
    evidenceCount >= 2
  );
}

export function hasLinkedTechnicalEvidence(
  text: string,
  tokens: readonly Token[],
  index: number
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
    hasSpecifiedTechnicalEvidence(evidence.map((token) => token.normalized))
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
  if (clauseWords.includes("from") && clauseWords.includes("to")) {
    return true;
  }

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
