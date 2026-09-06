import nlp from "compromise";
import { hasConcreteInventorySubjects } from "../../../../shared/matchers/concrete-evidence.js";
import {
  type SplitSentence,
  splitSentences
} from "../../../../shared/text/sentences.js";
import { splitWhitespace } from "../../../../shared/text/whitespace.js";
import * as elliptical from "./elliptical-action-stack.js";

const MAX_FRAGMENT_WORDS = 6;
const MAX_NO_FRAGMENT_WORDS = 5;
const MAX_PAYOFF_WORDS = 28;
const SUBJECT_WORDS = new Set([
  "i",
  "you",
  "we",
  "they",
  "he",
  "she",
  "it",
  "this",
  "that",
  "these",
  "those"
]);

const FINITE_VERBS = new Set([
  "is",
  "are",
  "was",
  "were",
  "am",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "can",
  "could",
  "will",
  "would",
  "should",
  "may",
  "might",
  "must",
  "shall"
]);

const FRAGMENT_LEADS = new Set([
  "too",
  "most",
  "more",
  "less",
  "deeply",
  "completely",
  "possibly",
  "probably",
  "maybe",
  "weird",
  "strange",
  "odd",
  "pure",
  "total",
  "incredibly"
]);

const PAYOFF_STARTS = ["more like ", "most ", "then ", "instead "];
const IMPERATIVE_STARTS = new Set(
  "feed leave notice stop start take keep get look think try make let give accept hold reduce".split(
    " "
  )
);
const OBJECT_WORDS = new Set(
  "me him her us them it the a an my your our their".split(" ")
);
const SIMPLE_PAST_VERBS = new Set(
  "ran went came felt heard found made took kept left thought knew got put said told held stood sat became wrote spoke won lost paid met read saw grew fell broke".split(
    " "
  )
);
export type FragmentMatch = elliptical.EllipticalActionMatch;

function isAlphanumeric(character: string): boolean {
  const lower = character.toLocaleLowerCase("en");
  const upper = character.toLocaleUpperCase("en");

  return (character >= "0" && character <= "9") || lower !== upper;
}

function cleanWord(word: string): string {
  const normalized = word.toLocaleLowerCase("en").replaceAll("\u2019", "'");
  let start = 0;
  let end = normalized.length;

  while (
    start < end &&
    normalized[start] !== "'" &&
    !isAlphanumeric(normalized[start] ?? "")
  ) {
    start += 1;
  }

  while (
    end > start &&
    normalized[end - 1] !== "'" &&
    !isAlphanumeric(normalized[end - 1] ?? "")
  ) {
    end -= 1;
  }

  return normalized.slice(start, end);
}

function sentenceWords(sentence: string): string[] {
  return splitWhitespace(sentence).map(cleanWord);
}

function isFunctionWord(word: string): boolean {
  return (
    word === "the" ||
    word === "a" ||
    word === "an" ||
    word === "and" ||
    word === "or" ||
    word === "but" ||
    word === "to" ||
    word === "of" ||
    word === "in" ||
    word === "on" ||
    word === "at" ||
    word === "for"
  );
}

function looksLikeModifierPhrase(first: string, second: string): boolean {
  return (
    first.endsWith("ly") ||
    second.endsWith("ive") ||
    second.endsWith("ous") ||
    second.endsWith("al") ||
    second.endsWith("ful") ||
    second.endsWith("less")
  );
}

function looksLikeSubjectDrop(first: string, second: string): boolean {
  return (
    ((first.endsWith("ed") && !first.endsWith("eed")) ||
      first.endsWith("ing")) &&
    !isFunctionWord(second)
  );
}

function hasCompleteGrammar(sentence: SplitSentence): boolean {
  const doc = nlp(sentence.text);
  const terms = doc.termList();
  if (terms[0]?.normal === "no") return false;
  if (
    terms[0]?.tags?.has("Imperative") === true &&
    (terms[1]?.tags?.has("Determiner") === true ||
      terms[1]?.tags?.has("Possessive") === true)
  )
    return true;
  if (
    terms[0]?.tags?.has("Determiner") !== true &&
    terms[0]?.tags?.has("Possessive") !== true
  )
    return false;
  const verb = terms.findIndex(
    (term) =>
      term.text !== "" &&
      term.tags?.has("PresentTense") === true &&
      !term.tags.has("Gerund") &&
      !term.tags.has("Infinitive")
  );
  if (verb <= 0 || verb >= terms.length - 1) return false;
  const subject = terms.slice(0, verb);
  const allowed = new Set([
    "Noun",
    "Determiner",
    "Possessive",
    "Adjective",
    "Adverb"
  ]);
  return (
    subject.some((term) => term.tags?.has("Noun") === true) &&
    subject.every(
      (term) =>
        term.tags !== undefined &&
        [...term.tags].some((tag) => allowed.has(tag))
    )
  );
}

function classifyFragment(sentence: SplitSentence): string | undefined {
  const words = sentenceWords(sentence.text);
  if (words.length < 2 || words.length > MAX_FRAGMENT_WORDS) {
    return undefined;
  }

  if (words.some((word) => word === "")) {
    return undefined;
  }

  if (words.some((word) => SUBJECT_WORDS.has(word))) {
    return undefined;
  }

  if (words.some((word) => FINITE_VERBS.has(word))) {
    return undefined;
  }

  const first = words[0];
  const second = words[1];
  if (
    first === undefined ||
    second === undefined ||
    elliptical.looksLikeDeclarativeClause(sentence)
  ) {
    return undefined;
  }

  if (FRAGMENT_LEADS.has(first) || looksLikeModifierPhrase(first, second)) {
    return "modifier-fragment";
  }

  if (
    (!isFunctionWord(first) &&
      (second.endsWith("ed") || SIMPLE_PAST_VERBS.has(second))) ||
    (IMPERATIVE_STARTS.has(first) &&
      (OBJECT_WORDS.has(second) ||
        isFunctionWord(second) ||
        second.endsWith("er") ||
        second.endsWith("ly"))) ||
    hasCompleteGrammar(sentence)
  ) {
    return undefined;
  }

  if (looksLikeSubjectDrop(first, second)) {
    return "subject-drop";
  }

  return "noun-fragment";
}

function looksLikePayoffSentence(sentence: SplitSentence): boolean {
  const words = sentenceWords(sentence.text);
  if (words.length <= 2 || words.length > MAX_PAYOFF_WORDS) {
    return false;
  }

  const lowered = sentence.text.toLocaleLowerCase("en");
  if (!PAYOFF_STARTS.some((start) => lowered.startsWith(start))) {
    return false;
  }

  return !words.some((word) => SUBJECT_WORDS.has(word));
}

function isNoFragment(sentence: SplitSentence): boolean {
  const words = sentenceWords(sentence.text);

  return (
    words.length >= 2 &&
    words.length <= MAX_NO_FRAGMENT_WORDS &&
    words[0] === "no" &&
    !words.some((word) => FINITE_VERBS.has(word)) &&
    classifyFragment(sentence) === "noun-fragment"
  );
}

function findNoFragmentPairs(text: string): FragmentMatch[] {
  const sentences = splitSentences(text);
  const matches: FragmentMatch[] = [];

  for (let index = 0; index < sentences.length - 1; index += 1) {
    const first = sentences[index];
    const second = sentences[index + 1];
    if (first === undefined || second === undefined) {
      continue;
    }

    const pair = [first.text, second.text];
    if (
      !isNoFragment(first) ||
      !isNoFragment(second) ||
      hasConcreteInventorySubjects(pair)
    ) {
      continue;
    }

    matches.push({
      end: second.end,
      fragmentTypes: ["no-fragment", "no-fragment"],
      sentences: pair,
      start: first.start
    });
  }

  return matches;
}

function findFragmentStacks(text: string): FragmentMatch[] {
  const sentences = splitSentences(text);
  const classifications = sentences.map(classifyFragment);
  const matches: FragmentMatch[] = [];
  let sentenceIndex = 0;

  while (sentenceIndex < sentences.length) {
    const firstType = classifications[sentenceIndex];
    const firstSentence = sentences[sentenceIndex];
    if (firstType === undefined || firstSentence === undefined) {
      sentenceIndex += 1;
      continue;
    }

    const runSentences = [firstSentence];
    const fragmentTypes = [firstType];
    let cursor = sentenceIndex + 1;

    while (cursor < sentences.length) {
      const sentence = sentences[cursor];
      const nextType = classifications[cursor];
      if (sentence === undefined) {
        break;
      }

      if (nextType !== undefined) {
        runSentences.push(sentence);
        fragmentTypes.push(nextType);
        cursor += 1;
        continue;
      }

      if (looksLikePayoffSentence(sentence)) {
        runSentences.push(sentence);
        cursor += 1;
      }
      break;
    }

    if (
      fragmentTypes.length >= 2 &&
      runSentences.length >= 3 &&
      !hasConcreteInventorySubjects(
        runSentences.map((sentence) => sentence.text)
      )
    ) {
      const last = runSentences[runSentences.length - 1];
      if (last !== undefined) {
        matches.push({
          end: last.end,
          fragmentTypes,
          sentences: runSentences.map((sentence) => sentence.text),
          start: firstSentence.start
        });
      }
    }

    sentenceIndex = Math.max(cursor, sentenceIndex + 1);
  }

  return matches;
}

export function findFragmentMatches(text: string): FragmentMatch[] {
  return elliptical.mergeMatches(
    text,
    findNoFragmentPairs(text).concat(findFragmentStacks(text))
  );
}
