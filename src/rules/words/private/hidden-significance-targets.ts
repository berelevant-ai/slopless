import type { Token } from "../../../shared/text/tokens.js";
import hiddenSignificanceVocabulary from "../data/hidden-significance-context.json" with { type: "json" };
import {
  hasLinkedMeasurementEvidence,
  hasLinkedTechnicalEvidence,
  hasLinkedTechnicalSubjectEvidence,
  hasSpecifiedTechnicalEvidence,
  hasTechnicalEvidencePair,
  startsWithDigit
} from "./hidden-significance-evidence.js";

export type HiddenSignificanceTarget = "quietly" | "silently";

export type WordPairGroup = {
  readonly actions: readonly string[];
  readonly markers: readonly string[];
};

export type HiddenSignificanceTargetConfiguration = {
  readonly actorMannerWords: ReadonlySet<string>;
  readonly actorWords: ReadonlySet<string>;
  readonly passiveTechnicalActionWords: ReadonlySet<string>;
  readonly postposedTechnicalActionWords: ReadonlySet<string>;
  readonly technicalActionWords: ReadonlySet<string>;
  readonly technicalBoundary: "explained" | "technical-context";
  readonly technicalEvidenceWords: ReadonlySet<string>;
  readonly technicalPhraseGroups: readonly WordPairGroup[];
  readonly token: HiddenSignificanceTarget;
};

const TARGET_CONFIGURATIONS: Readonly<
  Record<HiddenSignificanceTarget, HiddenSignificanceTargetConfiguration>
> = {
  quietly: {
    actorMannerWords: new Set(),
    actorWords: new Set(),
    passiveTechnicalActionWords: new Set(),
    postposedTechnicalActionWords: new Set(),
    technicalActionWords: new Set(
      hiddenSignificanceVocabulary.specifiedTechnicalWords
    ),
    technicalBoundary: "explained",
    technicalEvidenceWords: new Set(
      hiddenSignificanceVocabulary.technicalEvidenceWords
    ),
    technicalPhraseGroups: [],
    token: "quietly"
  },
  silently: {
    actorMannerWords: new Set(
      hiddenSignificanceVocabulary.silentlyActorMannerWords
    ),
    actorWords: new Set(hiddenSignificanceVocabulary.silentlyActorWords),
    passiveTechnicalActionWords: new Set(
      hiddenSignificanceVocabulary.silentlyPassiveTechnicalActionWords
    ),
    postposedTechnicalActionWords: new Set(
      hiddenSignificanceVocabulary.silentlyPostposedTechnicalActionWords
    ),
    technicalActionWords: new Set(
      hiddenSignificanceVocabulary.silentlyTechnicalActionWords
    ),
    technicalBoundary: "technical-context",
    technicalEvidenceWords: new Set(
      hiddenSignificanceVocabulary.silentlyTechnicalEvidenceWords
    ),
    technicalPhraseGroups:
      hiddenSignificanceVocabulary.silentlyTechnicalPhraseGroups,
    token: "silently"
  }
};

const PASSIVE_AUXILIARIES = new Set([
  "are",
  "be",
  "been",
  "being",
  "is",
  "was",
  "were"
]);

export function hiddenSignificanceTargetConfiguration(
  target: HiddenSignificanceTarget
): HiddenSignificanceTargetConfiguration {
  return TARGET_CONFIGURATIONS[target];
}

export function hasPostposedTechnicalAction(
  tokens: readonly Token[],
  index: number,
  actionWords: ReadonlySet<string>
): boolean {
  return tokens
    .slice(Math.max(0, index - 3), index)
    .some((token) => actionWords.has(token.normalized));
}

export function isPassiveTechnicalUse(
  tokens: readonly Token[],
  index: number,
  passiveActionWords: ReadonlySet<string>
): boolean {
  const candidateIndices = tokens.flatMap((token, candidateIndex) =>
    passiveActionWords.has(token.normalized) &&
    Math.abs(candidateIndex - index) <= 3
      ? [candidateIndex]
      : []
  );
  return candidateIndices.some((actionIndex) =>
    tokens
      .slice(Math.max(0, actionIndex - 3), actionIndex)
      .some((token) => PASSIVE_AUXILIARIES.has(token.normalized))
  );
}

function containsAny(
  words: readonly string[],
  candidates: ReadonlySet<string>
): boolean {
  return words.some((word) => candidates.has(word));
}

function isNormalSilentlyTechnicalUse(
  tokens: readonly Token[],
  index: number,
  localWords: readonly string[],
  sentenceTokens: readonly Token[],
  sentenceIndex: number,
  target: HiddenSignificanceTargetConfiguration
): boolean {
  const allWords = tokens.map((token) => token.normalized);
  const localClauseWords = tokens
    .slice(Math.max(0, index - 12), index + 13)
    .map((token) => token.normalized);
  const hasTechnicalContext =
    containsAny(localClauseWords, target.technicalEvidenceWords) ||
    matchesPairGroup(localWords, allWords, target.technicalPhraseGroups);
  if (
    hasPostposedTechnicalAction(
      tokens,
      index,
      target.postposedTechnicalActionWords
    )
  ) {
    return true;
  }
  if (
    hasLinkedMeasurementEvidence(sentenceTokens, sentenceIndex) ||
    hasLinkedTechnicalSubjectEvidence(
      sentenceTokens,
      sentenceIndex,
      target.technicalEvidenceWords
    ) ||
    (hasTechnicalContext &&
      containsAny(localWords, target.postposedTechnicalActionWords))
  ) {
    return true;
  }
  return (
    hasTechnicalContext &&
    (isPassiveTechnicalUse(tokens, index, target.passiveTechnicalActionWords) ||
      matchesPairGroup(localWords, allWords, target.technicalPhraseGroups) ||
      hasTechnicalEvidencePair(allWords, target.technicalEvidenceWords) ||
      localClauseWords.some(startsWithDigit))
  );
}

export function isNormalTechnicalUse(
  text: string,
  tokens: readonly Token[],
  index: number,
  localWords: readonly string[],
  sentenceTokens: readonly Token[],
  sentenceIndex: number,
  target: HiddenSignificanceTargetConfiguration
): boolean {
  if (!containsAny(localWords, target.technicalActionWords)) {
    return false;
  }
  if (target.technicalBoundary === "technical-context") {
    return isNormalSilentlyTechnicalUse(
      tokens,
      index,
      localWords,
      sentenceTokens,
      sentenceIndex,
      target
    );
  }
  const allWords = tokens.map((token) => token.normalized);
  return (
    hasSpecifiedTechnicalEvidence(allWords, target.technicalEvidenceWords) ||
    hasLinkedTechnicalEvidence(
      text,
      sentenceTokens,
      sentenceIndex,
      target.technicalEvidenceWords
    )
  );
}

export function matchesPairGroup(
  localWords: readonly string[],
  allWords: readonly string[],
  groups: readonly WordPairGroup[]
): boolean {
  return groups.some(
    ({ actions, markers }) =>
      actions.some((word) => localWords.includes(word)) &&
      markers.some((word) => allWords.includes(word))
  );
}

export function matchesRequiredPairGroup(
  localWords: readonly string[],
  allWords: readonly string[],
  groups: readonly WordPairGroup[]
): boolean {
  return groups.some(
    ({ actions, markers }) =>
      actions.some((word) => localWords.includes(word)) &&
      markers.every((word) => allWords.includes(word))
  );
}
