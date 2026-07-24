import { wordTokens, type Token } from "../../../shared/text/tokens.js";
import quietlyContextVocabulary from "../data/quietly-context.json" with { type: "json" };
import { quietlyClauseFor } from "./quietly-clause.js";
import {
  hasDetachedCompanion,
  hasInformativeChangeEvidence,
  hasLinkedTechnicalEvidence,
  hasSpecifiedTechnicalEvidence
} from "./quietly-evidence.js";

export type QuietlyContextClass =
  | "abstract-change"
  | "background-significance"
  | "detached-emphasis"
  | "evaluative-intensifier"
  | "hidden-harm"
  | "unannounced-trend";

export type QuietlyContextMatch = {
  readonly evidence: string;
  readonly label: QuietlyContextClass;
  readonly range: {
    readonly end: number;
    readonly start: number;
  };
};

const TARGET = "quietly";
const DETACHED_EXPLANATION_WORDS = new Set(
  quietlyContextVocabulary.detachedExplanationWords
);
const DETACHED_RESULT_WORDS = new Set(
  quietlyContextVocabulary.detachedResultWords
);
const AUXILIARIES = new Set(quietlyContextVocabulary.auxiliaries);
const EVALUATIVE_WORDS = new Set(quietlyContextVocabulary.evaluativeWords);
const ABSTRACT_CHANGE_WORDS = new Set(
  quietlyContextVocabulary.abstractChangeWords
);
const STRONG_ABSTRACT_CHANGE_WORDS = new Set(
  quietlyContextVocabulary.strongAbstractChangeWords
);
const ABSTRACT_SUBJECT_WORDS = new Set(
  quietlyContextVocabulary.abstractSubjectWords
);
const HIDDEN_HARM_WORDS = new Set(quietlyContextVocabulary.hiddenHarmWords);
const BACKGROUND_ACTION_WORDS = new Set(
  quietlyContextVocabulary.backgroundActionWords
);
const BACKGROUND_SIGNIFICANCE_WORDS = new Set(
  quietlyContextVocabulary.backgroundSignificanceWords
);
const TREND_ACTION_WORDS = new Set(quietlyContextVocabulary.trendActionWords);
const TREND_SUBJECT_WORDS = new Set(quietlyContextVocabulary.trendSubjectWords);
const TITLE_CONTEXT_WORDS = new Set(quietlyContextVocabulary.titleContextWords);
const NORMAL_MANNER_WORDS = new Set(quietlyContextVocabulary.normalMannerWords);
const PRIVATE_ACTION_WORDS = new Set(
  quietlyContextVocabulary.privateActionWords
);
const SPECIFIED_TECHNICAL_WORDS = new Set(
  quietlyContextVocabulary.specifiedTechnicalWords
);

type PairGroup = {
  readonly actions: readonly string[];
  readonly markers: readonly string[];
};

function containsAny(
  words: readonly string[],
  candidates: ReadonlySet<string>
): boolean {
  return words.some((word) => candidates.has(word));
}

function governingWords(
  tokens: readonly Token[],
  index: number
): readonly string[] {
  const words: string[] = [];
  const after = nextMeaningfulWord(tokens, index);
  if (after !== undefined) {
    words.push(after);
  }

  for (let cursor = index - 1; cursor >= Math.max(0, index - 3); cursor -= 1) {
    const word = tokens[cursor]?.normalized;
    if (word === undefined || AUXILIARIES.has(word)) {
      break;
    }
    words.push(word);
  }

  return words;
}

function wordsNear(
  tokens: readonly Token[],
  index: number,
  radius: number
): readonly string[] {
  return tokens
    .slice(Math.max(0, index - radius), index + radius + 1)
    .map((token) => token.normalized);
}

function matchesPairGroup(
  localWords: readonly string[],
  allWords: readonly string[],
  groups: readonly PairGroup[]
): boolean {
  return groups.some(
    ({ actions, markers }) =>
      actions.some((word) => localWords.includes(word)) &&
      markers.some((word) => allWords.includes(word))
  );
}

function matchesRequiredPairGroup(
  localWords: readonly string[],
  allWords: readonly string[],
  groups: readonly PairGroup[]
): boolean {
  return groups.some(
    ({ actions, markers }) =>
      actions.some((word) => localWords.includes(word)) &&
      markers.every((word) => allWords.includes(word))
  );
}

function isFirstPersonBuild(
  tokens: readonly Token[],
  index: number,
  localWords: readonly string[],
  sentenceWords: readonly string[]
): boolean {
  const before = tokens.slice(0, index).map((token) => token.normalized);
  return (
    containsAny(localWords, TREND_ACTION_WORDS) &&
    containsAny(sentenceWords, TREND_SUBJECT_WORDS) &&
    (before.includes("i") ||
      before.includes("i've") ||
      before.includes("my") ||
      before.includes("we") ||
      before.includes("we've"))
  );
}

function nextMeaningfulWord(
  tokens: readonly Token[],
  index: number
): string | undefined {
  for (let cursor = index + 1; cursor < tokens.length; cursor += 1) {
    const word = tokens[cursor]?.normalized;
    if (word !== undefined && !AUXILIARIES.has(word)) {
      return word;
    }
  }
  return undefined;
}

function isAbstractChangeContext(
  tokens: readonly Token[],
  index: number,
  localWords: readonly string[],
  contextWords: readonly string[],
  sentenceWords: readonly string[],
  sentenceTokens: readonly Token[],
  sentenceIndex: number
): boolean {
  const hasChangePattern =
    containsAny(localWords, STRONG_ABSTRACT_CHANGE_WORDS) ||
    (containsAny(localWords, ABSTRACT_CHANGE_WORDS) &&
      containsAny(contextWords, ABSTRACT_SUBJECT_WORDS)) ||
    matchesRequiredPairGroup(
      localWords,
      sentenceWords,
      quietlyContextVocabulary.abstractChangePairGroups
    );

  return (
    hasChangePattern &&
    !hasInformativeChangeEvidence(tokens, index, sentenceTokens, sentenceIndex)
  );
}

function isNormalUse(
  text: string,
  tokens: readonly Token[],
  index: number,
  label: QuietlyContextClass | undefined,
  sentenceTokens: readonly Token[],
  sentenceIndex: number
): boolean {
  const allWords = tokens.map((token) => token.normalized);
  if (containsAny(wordsNear(tokens, index, 5), TITLE_CONTEXT_WORDS)) {
    return true;
  }

  const localWords = governingWords(tokens, index);
  if (
    (label === undefined && containsAny(localWords, NORMAL_MANNER_WORDS)) ||
    containsAny(localWords, PRIVATE_ACTION_WORDS)
  ) {
    return true;
  }

  return (
    containsAny(localWords, SPECIFIED_TECHNICAL_WORDS) &&
    (hasSpecifiedTechnicalEvidence(allWords) ||
      hasLinkedTechnicalEvidence(text, sentenceTokens, sentenceIndex))
  );
}

function contextClassFor(
  text: string,
  tokens: readonly Token[],
  index: number,
  sentenceTokens: readonly Token[],
  sentenceIndex: number
): QuietlyContextClass | undefined {
  const words = tokens.map((token) => token.normalized);
  const sentenceWords = sentenceTokens.map((token) => token.normalized);
  if (sentenceTokens.length === 1) {
    return "detached-emphasis";
  }
  if (
    hasDetachedCompanion(text, tokens, index) &&
    (tokens.length <= 8 || containsAny(words, DETACHED_EXPLANATION_WORDS))
  ) {
    return "detached-emphasis";
  }
  const localWords = governingWords(tokens, index);
  const contextWords = wordsNear(tokens, index, 5);
  const token = tokens[index];
  const isTrailingResult =
    token !== undefined &&
    containsAny(localWords, DETACHED_RESULT_WORDS) &&
    (index === tokens.length - 1 ||
      text.slice(token.end).trimStart().startsWith(":"));
  if (isTrailingResult) {
    return "detached-emphasis";
  }

  const nextWord = nextMeaningfulWord(tokens, index);
  if (nextWord !== undefined && EVALUATIVE_WORDS.has(nextWord)) {
    return "evaluative-intensifier";
  }

  if (
    containsAny(localWords, HIDDEN_HARM_WORDS) ||
    matchesPairGroup(
      localWords,
      wordsNear(tokens, index, 8),
      quietlyContextVocabulary.hiddenHarmPairGroups
    )
  ) {
    return "hidden-harm";
  }
  if (
    isAbstractChangeContext(
      tokens,
      index,
      localWords,
      contextWords,
      words,
      sentenceTokens,
      sentenceIndex
    )
  ) {
    return "abstract-change";
  }
  if (
    containsAny(localWords, BACKGROUND_ACTION_WORDS) &&
    containsAny(contextWords, BACKGROUND_SIGNIFICANCE_WORDS)
  ) {
    return "background-significance";
  }
  if (
    matchesRequiredPairGroup(
      localWords,
      words,
      quietlyContextVocabulary.backgroundPhraseGroups
    )
  ) {
    return "background-significance";
  }
  if (
    (containsAny(words, TREND_SUBJECT_WORDS) &&
      (containsAny(localWords, TREND_ACTION_WORDS) ||
        (index <= 2 && containsAny(words, TREND_ACTION_WORDS)))) ||
    isFirstPersonBuild(tokens, index, localWords, sentenceWords) ||
    matchesRequiredPairGroup(
      localWords,
      words,
      quietlyContextVocabulary.trendPhraseGroups
    )
  ) {
    return "unannounced-trend";
  }

  return undefined;
}

export function findQuietlyContextMatches(
  text: string
): readonly QuietlyContextMatch[] {
  const tokens = wordTokens(text);
  const matches: QuietlyContextMatch[] = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token?.normalized !== TARGET) {
      continue;
    }

    const clause = quietlyClauseFor(text, tokens, index);
    const label = contextClassFor(
      text,
      clause.tokens,
      clause.index,
      tokens,
      index
    );
    if (
      label === undefined ||
      isNormalUse(text, clause.tokens, clause.index, label, tokens, index)
    ) {
      continue;
    }

    matches.push({
      evidence: token.text,
      label,
      range: { end: token.end, start: token.start }
    });
  }

  return matches;
}
