import nlp from "compromise";
import {
  splitSentences,
  type SplitSentence
} from "../../../shared/text/sentences.js";
import { wordTokens } from "../../../shared/text/tokens.js";

type Opening = {
  readonly action: boolean;
  readonly sentence: SplitSentence;
  readonly text: string;
};

type TaggedTerm = ReturnType<ReturnType<typeof nlp>["termList"]>[number];

export type SubjectActionCadence = {
  readonly start: number;
  readonly end: number;
  readonly openings: readonly string[];
};

const SUBJECT_TAGS = new Set([
  "Noun",
  "Pronoun",
  "Determiner",
  "Possessive",
  "Value"
]);
const SUBJECT_PART_TAGS = new Set([
  ...SUBJECT_TAGS,
  "Adjective",
  "Preposition",
  "Adverb"
]);
const WINDOW = 5;
const REQUIRED = 4;
export const SUBORDINATING_MARKERS: ReadonlySet<string> = new Set(
  "after although as because before if once since though unless until when whenever where whereas while".split(
    " "
  )
);

function isShort(sentence: SplitSentence): boolean {
  const tokens = wordTokens(sentence.text);
  return (
    tokens.length >= 3 &&
    tokens.length <= 14 &&
    sentence.text.endsWith(".") &&
    ![":", ";", "\u2014", "\u2013", " - "].some((mark) =>
      sentence.text.includes(mark)
    ) &&
    !tokens.some((token) => SUBORDINATING_MARKERS.has(token.normalized))
  );
}

function hasExtraClause(
  terms: readonly TaggedTerm[],
  verbIndex: number
): boolean {
  for (let index = verbIndex + 1; index < terms.length; index += 1) {
    const tags = terms[index]?.tags;
    if (tags?.has("PastTense") !== true && tags?.has("Copula") !== true)
      continue;
    let previous = index - 1;
    while (
      previous > verbIndex &&
      terms[previous]?.tags?.has("Adverb") === true
    )
      previous -= 1;
    const connector = terms[previous]?.normal;
    if (connector !== "and" && connector !== "or" && connector !== "but")
      return true;
  }
  return false;
}

function ambiguousPastVerb(word: string): boolean {
  // Resolve adjective/verb ambiguity using the library's inflection data.
  const candidate = nlp(word);
  candidate.unTag("Adjective").tag("PastTense");
  const base = candidate.verbs().toInfinitive().text();
  return base !== word && nlp(base).has("#Verb");
}

function opening(sentence: SplitSentence): Opening | undefined {
  const doc = nlp(sentence.text);
  if (doc.has("#QuestionWord") || doc.has("#Condition")) return undefined;
  const terms = doc.termList();
  const first = terms[0];
  if (
    first?.tags === undefined ||
    ![...first.tags].some((tag) => SUBJECT_TAGS.has(tag))
  ) {
    return undefined;
  }

  let hasNoun = first.tags.has("Noun");
  for (let index = 1; index < terms.length; index += 1) {
    if (terms[index - 1]?.post.includes(",") === true) return undefined;
    const term = terms[index];
    if (term?.tags === undefined) return undefined;
    const ambiguous =
      hasNoun && term.tags.has("Adjective") && ambiguousPastVerb(term.normal);
    if (term.tags.has("Verb") || ambiguous) {
      if (!hasNoun || (!term.tags.has("PastTense") && !ambiguous))
        return undefined;
      if (
        terms
          .slice(index + 1)
          .some((part) => part.tags?.has("Value") === true) ||
        hasExtraClause(terms, index)
      )
        return undefined;
      return {
        action:
          !term.tags.has("Copula") &&
          !term.tags.has("Auxiliary") &&
          terms[index + 1] !== undefined,
        sentence,
        text: terms
          .slice(0, index + 1)
          .map((part) => part.text)
          .join(" ")
          .trim()
      };
    }
    if (
      ![...term.tags].some((tag) => SUBJECT_PART_TAGS.has(tag)) ||
      term.post.includes(",")
    ) {
      return undefined;
    }
    hasNoun ||= term.tags.has("Noun");
  }
  return undefined;
}

export function findSubjectActionCadence(
  text: string
): SubjectActionCadence | undefined {
  const sentences = splitSentences(text);
  if (sentences.length < REQUIRED) return undefined;
  const short = sentences.map(isShort);
  const parsed = new Map<SplitSentence, Opening | undefined>();
  for (let index = 0; index <= sentences.length - REQUIRED; index += 1) {
    if (short.slice(index, index + WINDOW).filter(Boolean).length < REQUIRED)
      continue;
    const matches: Opening[] = [];
    for (
      let offset = index;
      offset < Math.min(index + WINDOW, sentences.length);
      offset += 1
    ) {
      const sentence = sentences[offset];
      if (sentence === undefined || short[offset] !== true) continue;
      if (!parsed.has(sentence)) parsed.set(sentence, opening(sentence));
      const match = parsed.get(sentence);
      if (match !== undefined) matches.push(match);
    }
    const first = matches[0];
    const last = matches.at(-1);
    if (
      matches.length >= REQUIRED &&
      matches.filter((match) => match.action).length >= 3 &&
      first !== undefined &&
      last !== undefined
    ) {
      return {
        start: first.sentence.start,
        end: last.sentence.end,
        openings: matches.map((match) => match.text)
      };
    }
  }
  return undefined;
}
