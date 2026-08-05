import {
  type SplitSentence,
  splitSentences
} from "../../../../shared/text/sentences.js";
import { wordTokens } from "../../../../shared/text/tokens.js";
import * as grammar from "./elliptical-action-guards.js";

const MIN_CONTINUATIONS = 2;

const FINITE_HELPERS = new Set([
  "am",
  "are",
  "be",
  "been",
  "being",
  "can",
  "could",
  "did",
  "do",
  "does",
  "had",
  "has",
  "have",
  "is",
  "may",
  "might",
  "must",
  "shall",
  "should",
  "was",
  "were",
  "will",
  "would"
]);

const IRREGULAR_PREDICATES = new Set([
  "became",
  "began",
  "broke",
  "brought",
  "came",
  "caught",
  "chose",
  "did",
  "drew",
  "drove",
  "ate",
  "fell",
  "felt",
  "flew",
  "forgot",
  "found",
  "gave",
  "got",
  "grew",
  "had",
  "heard",
  "held",
  "hurt",
  "kept",
  "knew",
  "lay",
  "led",
  "left",
  "lost",
  "made",
  "met",
  "paid",
  "put",
  "ran",
  "read",
  "rose",
  "said",
  "sat",
  "saw",
  "shook",
  "showed",
  "shot",
  "slept",
  "spoke",
  "stood",
  "struck",
  "swept",
  "told",
  "took",
  "threw",
  "went",
  "won",
  "wrote"
]);

const PRESENT_PREDICATES = new Set([
  "checks",
  "chooses",
  "considers",
  "counts",
  "examines",
  "faces",
  "follows",
  "gazes",
  "glances",
  "hears",
  "inspects",
  "lists",
  "listens",
  "looks",
  "moves",
  "notices",
  "observes",
  "picks",
  "points",
  "reaches",
  "reads",
  "reviews",
  "scans",
  "searches",
  "sees",
  "shifts",
  "stares",
  "studies",
  "sweeps",
  "takes",
  "tracks",
  "turns",
  "watches"
]);

const SEQUENCE_MARKERS = new Set([
  "afterward",
  "afterwards",
  "also",
  "finally",
  "first",
  "later",
  "lastly",
  "next",
  "now",
  "second",
  "subsequently",
  "third",
  "then"
]);

const COMPLEMENT_LEADS = new Set([
  "above",
  "across",
  "after",
  "against",
  "along",
  "apart",
  "aside",
  "among",
  "around",
  "at",
  "away",
  "back",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "between",
  "beyond",
  "by",
  "down",
  "forward",
  "for",
  "from",
  "in",
  "inside",
  "into",
  "near",
  "off",
  "on",
  "onto",
  "out",
  "outside",
  "over",
  "past",
  "right",
  "left",
  "straight",
  "through",
  "throughout",
  "to",
  "toward",
  "towards",
  "under",
  "underneath",
  "up",
  "ahead",
  "here",
  "home",
  "there",
  "with",
  "within",
  "without"
]);

const MODIFIER_LEADS = new Set([
  "again",
  "almost",
  "another",
  "both",
  "each",
  "harder",
  "less",
  "more",
  "one",
  "once",
  "slowly",
  "softly",
  "separately",
  "still",
  "together"
]);

const PREDICATE_OBJECT_OPENERS = new Set([
  "a",
  "all",
  "an",
  "any",
  "each",
  "every",
  "her",
  "his",
  "its",
  "my",
  "no",
  "one",
  "our",
  "several",
  "some",
  "the",
  "their",
  "three",
  "two",
  "your"
]);

type ContinuationKind = "complement" | "modifier" | "sequence" | "subject-drop";

export type EllipticalActionMatch = {
  readonly end: number;
  readonly fragmentTypes: readonly string[];
  readonly sentences: readonly string[];
  readonly start: number;
};

function endsAsQuestionOrExclamation(sentence: SplitSentence): boolean {
  const trimmed = sentence.text.trimEnd();
  return trimmed.endsWith("?") || trimmed.endsWith("!");
}

function likelyPredicate(word: string): boolean {
  return (
    FINITE_HELPERS.has(word) ||
    grammar.isBaseActionPredicate(word) ||
    IRREGULAR_PREDICATES.has(word) ||
    PRESENT_PREDICATES.has(word) ||
    (word.length >= 5 && word.endsWith("ed") && !word.endsWith("eed"))
  );
}

function hasPredicateAfterSubject(words: readonly string[]): boolean {
  return words.slice(1, 6).some((word, offset) => {
    if (!likelyPredicate(word)) {
      return false;
    }
    if (!word.endsWith("ed") || IRREGULAR_PREDICATES.has(word)) {
      return true;
    }

    const next = words[offset + 2];
    return (
      next === undefined ||
      COMPLEMENT_LEADS.has(next) ||
      PREDICATE_OBJECT_OPENERS.has(next)
    );
  });
}

export function looksLikeDeclarativeClause(sentence: SplitSentence): boolean {
  const words = wordTokens(sentence.text).map((token) => token.normalized);
  return (
    words.length >= 3 &&
    words.length <= 24 &&
    !endsAsQuestionOrExclamation(sentence) &&
    !SEQUENCE_MARKERS.has(words[0] ?? "") &&
    hasPredicateAfterSubject(words)
  );
}

function continuationKind(
  sentence: SplitSentence
): ContinuationKind | undefined {
  if (endsAsQuestionOrExclamation(sentence)) {
    return undefined;
  }

  const words = wordTokens(sentence.text).map((token) => token.normalized);
  if (words.length < 2 || words.length > 9) {
    return undefined;
  }

  const hasSequenceMarker = SEQUENCE_MARKERS.has(words[0] ?? "");
  const body = hasSequenceMarker ? words.slice(1) : words;
  const first = body[0];
  if (
    first === undefined ||
    grammar.looksLikeCompleteContinuation(sentence.text, body) ||
    grammar.hasExplicitSubject(body) ||
    hasPredicateAfterSubject(body) ||
    body.some((word) => FINITE_HELPERS.has(word))
  ) {
    return undefined;
  }

  if (hasSequenceMarker) {
    return "sequence";
  }
  if (COMPLEMENT_LEADS.has(first)) {
    return "complement";
  }
  if (first.endsWith("ing") || first.endsWith("ed")) {
    return "subject-drop";
  }
  if (MODIFIER_LEADS.has(first) || first.endsWith("ly")) {
    return "modifier";
  }

  return undefined;
}

export function findEllipticalActionStacks(
  text: string
): EllipticalActionMatch[] {
  const sentences = splitSentences(text);
  const matches: EllipticalActionMatch[] = [];

  for (
    let index = 0;
    index < sentences.length - MIN_CONTINUATIONS;
    index += 1
  ) {
    const anchor = sentences[index];
    if (anchor === undefined || !looksLikeDeclarativeClause(anchor)) {
      continue;
    }

    const continuations: SplitSentence[] = [];
    const fragmentTypes: string[] = [];
    let cursor = index + 1;
    while (cursor < sentences.length) {
      const sentence = sentences[cursor];
      if (sentence === undefined) {
        break;
      }
      const kind = continuationKind(sentence);
      if (kind === undefined) {
        break;
      }
      continuations.push(sentence);
      fragmentTypes.push(`elliptical-${kind}`);
      cursor += 1;
    }

    if (continuations.length < MIN_CONTINUATIONS) {
      continue;
    }

    const last = continuations.at(-1);
    if (last !== undefined) {
      matches.push({
        end: last.end,
        fragmentTypes,
        sentences: [anchor.text, ...continuations.map((item) => item.text)],
        start: anchor.start
      });
      index = cursor - 1;
    }
  }

  return matches;
}

export function mergeMatches(
  text: string,
  existing: readonly EllipticalActionMatch[]
): EllipticalActionMatch[] {
  const elliptical = findEllipticalActionStacks(text);
  return existing
    .filter(
      (match) =>
        !elliptical.some(
          (anchor) => match.start >= anchor.start && match.end <= anchor.end
        )
    )
    .concat(elliptical);
}
