import {
  ACTION_NEGATIONS,
  DO_NEGATIONS,
  EXPLICIT_DO_AUXILIARIES,
  FACTUAL_NEGATION_CONNECTORS,
  contrastPivotSubject,
  findCopularNegation,
  findNegationIndex,
  isCompleteSentence,
  skipOptionalAdverbs,
  startsWithSubjectOrPronoun,
  startsWithSubjectVerb,
  startsWithWords,
  stripLeadingPairPivot,
  validSubject,
  words
} from "./negation-reframe-parts.js";
import {
  hasAbstractCommaContrast,
  hasAbstractNegationPayoff,
  hasFactualConnectorAfterNegation,
  hasMetaContext
} from "./negation-context-gates.js";
import { hasInlineContrastConnectorAfterNegation } from "./inline-contrast-connector.js";
import { inlineNotBecauseReframe } from "./inline-not-because-reframe.js";
import {
  matchesInlineSemicolonReframe,
  inlineNotJustCopularReframe,
  inlineShortNegatedBeat
} from "./inline-short-negation.js";
import {
  hasNegativeSlopPairSignal,
  matchSequenceReframe,
  negatedActionPronounPayoff,
  negatedActionSetReplacement,
  negativeSlopReframe,
  progressiveVerbMirror,
  pronounCopularReframe,
  sameSubjectCopularReframe,
  shouldReportCopularReframe,
  startsWithNegatedPronounCopula
} from "./negative-slop-frames.js";
import { makeMeaningReframe, meaningReframe } from "./meaning-reframe.js";
import { hasConcreteCorrectionEvidence } from "../../../../shared/matchers/concrete-evidence.js";
import {
  splitSentences,
  type SplitSentence
} from "../../../../shared/text/sentences.js";
import { wordTokens, type Token } from "../../../../shared/text/tokens.js";
export type NegationReframeMatch = {
  readonly end: number;
  readonly start: number;
  readonly text: string;
};

// "not only X but Y" is an additive correlative (it affirms both X and Y), not the
// replacement reframe this rule targets ("it is not X, it is Y"). It was a dominant
// false positive ("not only makes rounds harder but can trigger a down round"), so the
// "only" follower is excluded here.
const INLINE_NON_CONTRAST_NEGATION_FOLLOWERS = new Set([
  "all",
  "any",
  "every",
  "only",
  "too"
]);
const ACTION_PAIR_CONNECTORS = new Set([
  ...FACTUAL_NEGATION_CONNECTORS,
  "after"
]);
function inlineSemicolonEvaluativeReframe(
  sentence: SplitSentence
): NegationReframeMatch | undefined {
  return matchesInlineSemicolonReframe(sentence.text)
    ? {
        end: sentence.end,
        start: sentence.start,
        text: sentence.text
      }
    : undefined;
}

function inlineNegationContrast(
  sentence: SplitSentence
): NegationReframeMatch | undefined {
  const tokens = wordTokens(sentence.text);
  const semicolonMatch = inlineSemicolonEvaluativeReframe(sentence);
  if (semicolonMatch !== undefined) {
    return semicolonMatch;
  }
  const negationIndex = findNegationIndex(tokens);

  if (negationIndex === undefined) {
    return undefined;
  }

  const negation = tokens[negationIndex];

  const notBecauseMatch = inlineNotBecauseReframe(sentence, tokens);
  if (notBecauseMatch !== undefined) {
    return notBecauseMatch;
  }

  const notJustCopularMatch = inlineNotJustCopularReframe(sentence, tokens);
  if (notJustCopularMatch !== undefined) {
    return notJustCopularMatch;
  }

  const shortBeatMatch = inlineShortNegatedBeat(sentence, tokens);
  if (shortBeatMatch !== undefined) {
    return shortBeatMatch;
  }

  if (
    negation?.normalized !== "not" ||
    hasMetaContext(tokens) ||
    hasFactualConnectorAfterNegation(tokens, negationIndex) ||
    INLINE_NON_CONTRAST_NEGATION_FOLLOWERS.has(
      tokens[negationIndex + 1]?.normalized ?? ""
    )
  ) {
    return undefined;
  }

  // The connector branch (not ... but/instead/rather ...) is a normal factual
  // correlative unless the payoff is abstract/evaluative. Requiring an abstract
  // payoff here is what separates the empty reframe ("not a failure, but a
  // signal") from ordinary prose ("not constructed by the king, but by his
  // successor"), which was the dominant false-positive source in the audit.
  return !hasConcreteCorrectionEvidence(sentence.text) &&
    (hasAbstractCommaContrast(sentence, tokens, negation.start) ||
      (hasInlineContrastConnectorAfterNegation(tokens, negationIndex) &&
        hasAbstractNegationPayoff(tokens)))
    ? {
        end: sentence.end,
        start: sentence.start,
        text: sentence.text
      }
    : undefined;
}

function needReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const tokenWords = words(aTokens);

  for (let index = 0; index < tokenWords.length; index += 1) {
    const current = tokenWords[index];
    const next = tokenWords[index + 1];
    const subject = tokenWords.slice(0, index);

    if (!validSubject(subject)) {
      continue;
    }

    if (DO_NEGATIONS.has(current ?? "") && tokenWords[index + 1] === "need") {
      return startsWithNeedAffirmative(bTokens, subject);
    }

    if (
      EXPLICIT_DO_AUXILIARIES.has(current ?? "") &&
      next === "not" &&
      tokenWords[index + 2] === "need"
    ) {
      return startsWithNeedAffirmative(bTokens, subject);
    }
  }

  return false;
}

function startsWithNeedAffirmative(
  bTokens: readonly Token[],
  subject: readonly string[]
): boolean {
  return (
    startsWithWords(bTokens, [...subject, "need"]) ||
    startsWithWords(bTokens, [...subject, "needs"]) ||
    startsWithWords(bTokens, ["they", "need"]) ||
    startsWithWords(bTokens, ["you", "need"]) ||
    startsWithWords(bTokens, ["we", "need"])
  );
}

function actionVerbMirror(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const tokenWords = words(aTokens);
  const bContentTokens = stripLeadingPairPivot(bTokens);
  const bWords = words(bContentTokens);
  const firstConnectors = new Set(
    tokenWords.filter((word) => ACTION_PAIR_CONNECTORS.has(word))
  );

  if (
    bWords.some(
      (word) => ACTION_PAIR_CONNECTORS.has(word) && !firstConnectors.has(word)
    )
  ) {
    return false;
  }

  for (let index = 0; index < tokenWords.length; index += 1) {
    const current = tokenWords[index];
    const next = tokenWords[index + 1];
    const subject = tokenWords.slice(0, index);

    if (!validSubject(subject)) {
      continue;
    }

    if (ACTION_NEGATIONS.has(current ?? "")) {
      const verbIndex = skipOptionalAdverbs(tokenWords, index + 1);
      const verb = tokenWords[verbIndex];

      if (
        verb !== undefined &&
        startsWithSubjectVerb(bContentTokens, subject, verb)
      ) {
        return true;
      }
    }

    if (EXPLICIT_DO_AUXILIARIES.has(current ?? "") && next === "not") {
      const verbIndex = skipOptionalAdverbs(tokenWords, index + 2);
      const verb = tokenWords[verbIndex];

      if (
        verb !== undefined &&
        startsWithSubjectVerb(bContentTokens, subject, verb)
      ) {
        return true;
      }
    }
  }

  return false;
}

function explicitContrastPivotReframe(
  aTokens: readonly Token[],
  bTokens: readonly Token[]
): boolean {
  const subject = contrastPivotSubject(aTokens);

  return (
    subject !== undefined &&
    !startsWithNegatedPronounCopula(bTokens) &&
    startsWithSubjectOrPronoun(bTokens, subject)
  );
}

function startsWithExplicitReplacement(tokens: readonly Token[]): boolean {
  return (
    startsWithWords(tokens, ["instead"]) || startsWithWords(tokens, ["rather"])
  );
}

function hasPairNegationSignal(tokens: readonly Token[]): boolean {
  return (
    findNegationIndex(tokens) !== undefined ||
    findCopularNegation(tokens) !== undefined ||
    contrastPivotSubject(tokens) !== undefined ||
    hasNegativeSlopPairSignal(tokens)
  );
}

function sentencePairReframe(
  a: SplitSentence,
  b: SplitSentence
): NegationReframeMatch | undefined {
  const aTokens = wordTokens(a.text);
  const bTokens = wordTokens(b.text);
  const pairText = `${a.text} ${b.text}`;
  const hasNegatedActionSetReplacement = negatedActionSetReplacement(
    aTokens,
    bTokens
  );
  const hasAllowedReplacementColon =
    b.text.trimEnd().endsWith(":") && hasNegatedActionSetReplacement;

  if (
    !isCompleteSentence(a) ||
    (!isCompleteSentence(b) && !hasAllowedReplacementColon) ||
    !hasPairNegationSignal(aTokens)
  ) {
    return undefined;
  }

  if (
    (shouldReportCopularReframe(aTokens, bTokens, pairText) &&
      (sameSubjectCopularReframe(aTokens, bTokens) ||
        pronounCopularReframe(aTokens, bTokens) ||
        progressiveVerbMirror(aTokens, bTokens))) ||
    (startsWithExplicitReplacement(bTokens) &&
      shouldReportCopularReframe(aTokens, bTokens, pairText) &&
      !hasConcreteCorrectionEvidence(pairText)) ||
    meaningReframe(aTokens, bTokens) ||
    makeMeaningReframe(aTokens, bTokens) ||
    needReframe(aTokens, bTokens) ||
    actionVerbMirror(aTokens, bTokens) ||
    negatedActionPronounPayoff(aTokens, bTokens) ||
    negativeSlopReframe(aTokens, bTokens) ||
    (shouldReportCopularReframe(aTokens, bTokens, pairText) &&
      explicitContrastPivotReframe(aTokens, bTokens))
  ) {
    return {
      end: b.end,
      start: a.start,
      text: `${a.text} ${b.text}`
    };
  }

  return undefined;
}

export function findSentenceNegationReframes(
  text: string
): NegationReframeMatch[] {
  const sentences = splitSentences(text);
  const matches: NegationReframeMatch[] = [];
  const matchedRanges = new Set<string>();

  const addMatch = (match: NegationReframeMatch): void => {
    const range = `${match.start}:${match.end}`;
    if (!matchedRanges.has(range)) {
      matchedRanges.add(range);
      matches.push(match);
    }
  };

  for (const sentence of sentences) {
    const inlineMatch = inlineNegationContrast(sentence);

    if (inlineMatch !== undefined) {
      addMatch(inlineMatch);
    }

    const consequence = matchSequenceReframe(sentence.text, "");
    if (consequence !== undefined) {
      addMatch({
        end: sentence.end,
        start: sentence.start,
        text: consequence
      });
    }
  }

  for (let index = 0; index < sentences.length - 1; index += 1) {
    const current = sentences[index];
    const next = sentences[index + 1];

    if (current === undefined || next === undefined) {
      continue;
    }

    const third = sentences[index + 2];
    const sequence = matchSequenceReframe(current.text, next.text, third?.text);

    if (sequence !== undefined) {
      const threeSentenceText =
        third === undefined
          ? undefined
          : `${current.text} ${next.text} ${third.text}`;
      addMatch({
        end:
          sequence === current.text
            ? current.end
            : sequence === threeSentenceText
              ? (third?.end ?? next.end)
              : next.end,
        start: current.start,
        text: sequence
      });
    }

    const pairMatch = sentencePairReframe(current, next);

    if (pairMatch !== undefined) {
      addMatch(pairMatch);
    }
  }

  return matches.filter(
    (match, index) =>
      !matches.some(
        (other, otherIndex) =>
          otherIndex !== index &&
          other.start <= match.start &&
          other.end >= match.end &&
          (other.start < match.start || other.end > match.end)
      )
  );
}
