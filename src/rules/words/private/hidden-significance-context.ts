import { wordTokens, type Token } from "../../../shared/text/tokens.js";
import hiddenSignificanceVocabulary from "../data/hidden-significance-context.json" with { type: "json" };
import { hiddenSignificanceClauseFor } from "./hidden-significance-clause.js";
import {
  hasDetachedCompanion,
  hasInformativeChangeEvidence
} from "./hidden-significance-evidence.js";
import {
  hiddenSignificanceTargetConfiguration,
  isNormalTechnicalUse,
  matchesPairGroup,
  matchesRequiredPairGroup,
  type HiddenSignificanceTarget,
  type HiddenSignificanceTargetConfiguration
} from "./hidden-significance-targets.js";

export type { HiddenSignificanceTarget } from "./hidden-significance-targets.js";

export type HiddenSignificanceContextClass =
  | "abstract-change"
  | "background-significance"
  | "detached-emphasis"
  | "evaluative-intensifier"
  | "hidden-harm"
  | "unannounced-trend";

export type HiddenSignificanceContextMatch = {
  readonly evidence: string;
  readonly label: HiddenSignificanceContextClass;
  readonly range: {
    readonly end: number;
    readonly start: number;
  };
};

const DETACHED_EXPLANATION_WORDS = new Set(
  hiddenSignificanceVocabulary.detachedExplanationWords
);
const DETACHED_RESULT_WORDS = new Set(
  hiddenSignificanceVocabulary.detachedResultWords
);
const AUXILIARIES = new Set(hiddenSignificanceVocabulary.auxiliaries);
const EVALUATIVE_WORDS = new Set(hiddenSignificanceVocabulary.evaluativeWords);
const ABSTRACT_CHANGE_WORDS = new Set(
  hiddenSignificanceVocabulary.abstractChangeWords
);
const STRONG_ABSTRACT_CHANGE_WORDS = new Set(
  hiddenSignificanceVocabulary.strongAbstractChangeWords
);
const ABSTRACT_SUBJECT_WORDS = new Set(
  hiddenSignificanceVocabulary.abstractSubjectWords
);
const HIDDEN_HARM_WORDS = new Set(hiddenSignificanceVocabulary.hiddenHarmWords);
const BACKGROUND_ACTION_WORDS = new Set(
  hiddenSignificanceVocabulary.backgroundActionWords
);
const BACKGROUND_SIGNIFICANCE_WORDS = new Set(
  hiddenSignificanceVocabulary.backgroundSignificanceWords
);
const TREND_ACTION_WORDS = new Set(
  hiddenSignificanceVocabulary.trendActionWords
);
const TREND_SUBJECT_WORDS = new Set(
  hiddenSignificanceVocabulary.trendSubjectWords
);
const TITLE_CONTEXT_WORDS = new Set(
  hiddenSignificanceVocabulary.titleContextWords
);
const NORMAL_MANNER_WORDS = new Set(
  hiddenSignificanceVocabulary.normalMannerWords
);
const PRIVATE_ACTION_WORDS = new Set(
  hiddenSignificanceVocabulary.privateActionWords
);
function containsAny(
  words: readonly string[],
  candidates: ReadonlySet<string>
): boolean {
  return words.some((word) => candidates.has(word));
}

function isInsideUrl(text: string, token: Token): boolean {
  const lowerText = text.toLowerCase();
  const start = Math.max(
    lowerText.lastIndexOf("http://", token.start),
    lowerText.lastIndexOf("https://", token.start)
  );
  if (start < 0) {
    return false;
  }

  const terminators = new Set([" ", "\n", "\t", '"', "'", "<", ">", "(", ")"]);
  return !text
    .slice(start, token.start)
    .split("")
    .some((character) => terminators.has(character));
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
      hiddenSignificanceVocabulary.abstractChangePairGroups
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
  label: HiddenSignificanceContextClass | undefined,
  sentenceTokens: readonly Token[],
  sentenceIndex: number,
  target: HiddenSignificanceTargetConfiguration
): boolean {
  const sentenceWords = sentenceTokens.map((token) => token.normalized);
  if (containsAny(wordsNear(tokens, index, 5), TITLE_CONTEXT_WORDS)) {
    return true;
  }

  const localWords = governingWords(tokens, index);
  if (
    (label === undefined && containsAny(localWords, NORMAL_MANNER_WORDS)) ||
    containsAny(localWords, PRIVATE_ACTION_WORDS) ||
    (containsAny(localWords, target.actorMannerWords) &&
      containsAny(wordsNear(tokens, index, 6), target.actorWords))
  ) {
    return true;
  }

  const localClauseWords = wordsNear(tokens, index, 12);
  if (
    label === "abstract-change" &&
    target.technicalBoundary === "technical-context" &&
    localClauseWords.some((word) => target.technicalEvidenceWords.has(word)) &&
    sentenceWords.includes("without") &&
    (sentenceWords.includes("until") || sentenceWords.includes("when"))
  ) {
    return true;
  }

  return isNormalTechnicalUse(
    text,
    tokens,
    index,
    localWords,
    sentenceTokens,
    sentenceIndex,
    target
  );
}

function contextClassFor(
  text: string,
  tokens: readonly Token[],
  index: number,
  sentenceTokens: readonly Token[],
  sentenceIndex: number
): HiddenSignificanceContextClass | undefined {
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
      hiddenSignificanceVocabulary.hiddenHarmPairGroups
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
      hiddenSignificanceVocabulary.backgroundPhraseGroups
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
      hiddenSignificanceVocabulary.trendPhraseGroups
    )
  ) {
    return "unannounced-trend";
  }

  return undefined;
}

export function findHiddenSignificanceContextMatches(
  text: string,
  targetName: HiddenSignificanceTarget
): readonly HiddenSignificanceContextMatch[] {
  const target = hiddenSignificanceTargetConfiguration(targetName);
  const tokens = wordTokens(text);
  const matches: HiddenSignificanceContextMatch[] = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token?.normalized !== target.token || isInsideUrl(text, token)) {
      continue;
    }

    const clause = hiddenSignificanceClauseFor(text, tokens, index);
    const label = contextClassFor(
      text,
      clause.tokens,
      clause.index,
      tokens,
      index
    );
    if (
      label === undefined ||
      isNormalUse(
        text,
        clause.tokens,
        clause.index,
        label,
        tokens,
        index,
        target
      )
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
