import nlp from "compromise";
import { normalizeForMatch } from "./normalize.js";
import { wordTokens, type Token } from "./tokens.js";

export type PrecedingSubject = {
  readonly head: string;
  readonly start: number;
  readonly text: string;
};

type GrammarTerm = ReturnType<ReturnType<typeof nlp>["termList"]>[number];

function isFiniteTerm(term: GrammarTerm): boolean {
  return (
    (term.tags?.has("PresentTense") === true ||
      term.tags?.has("PastTense") === true ||
      term.tags?.has("Copula") === true ||
      term.tags?.has("Modal") === true) &&
    !term.tags.has("Gerund") &&
    !term.tags.has("Participle")
  );
}

function startsWithNounPhrase(text: string): boolean {
  const noun = nlp(text).nouns().first().text();
  if (noun.length === 0) return false;
  const before = text.slice(0, text.indexOf(noun));
  return nlp(before)
    .termList()
    .every((term) =>
      ["Determiner", "Possessive", "Adverb", "Adjective"].some(
        (tag) => term.tags?.has(tag) === true
      )
    );
}

function relativeMarker(prefix: string, word: Token): boolean {
  if (!["who", "whom", "whose", "which", "that"].includes(word.normalized))
    return false;
  if (word.normalized !== "that" && word.normalized !== "which") return true;
  const noun = nlp(prefix.slice(word.start)).nouns().first();
  return (
    !startsWithNounPhrase(prefix.slice(word.start)) || noun.has("#Pronoun")
  );
}

function embeddedSubjectStart(prefix: string): number {
  const doc = nlp(prefix);
  const words = wordTokens(prefix);
  const sourceStart = (source: string, from: number): number =>
    words.find(
      (word) =>
        word.start >= from &&
        prefix.startsWith(source, word.start) &&
        words.some((last) => last.end === word.start + source.length)
    )?.start ?? -1;
  let start = 0;
  let cursor = 0;
  let inheritedAt: number | undefined;
  let inheritedVerb: number | undefined;
  doc.match("#Conjunction").forEach((conjunction) => {
    const value = conjunction.text();
    if (!["and", "or", "but", "yet", "nor"].includes(value.toLowerCase()))
      return;
    const index = sourceStart(value, cursor);
    if (index < 0) return;
    cursor = index + value.length;
    if (!nlp(prefix.slice(0, index)).verbs().termList().some(isFiniteTerm))
      return;
    const tail = prefix.slice(cursor).trimStart();
    if (startsWithNounPhrase(tail)) {
      start = cursor;
      inheritedAt = undefined;
    } else inheritedAt = index;
  });
  cursor = 0;
  doc.verbs().forEach((verb) => {
    const source = verb.text();
    if (source.length === 0) return;
    const index = sourceStart(source, cursor);
    if (index < 0) return;
    cursor = index + source.length;
    if (inheritedAt !== undefined && index < inheritedAt) inheritedVerb = index;
    const relative = words.some(
      (word) =>
        word.start >
          (words.find((first) => first.start >= start)?.start ?? start) &&
        word.end <= index &&
        relativeMarker(prefix, word)
    );
    const finite = verb.termList().some(isFiniteTerm);
    if (
      !relative &&
      finite &&
      cursor > start &&
      nlp(prefix.slice(cursor)).nouns().found
    )
      start = cursor;
  });
  return inheritedVerb === undefined
    ? start
    : embeddedSubjectStart(prefix.slice(0, inheritedVerb));
}

export function subjectBefore(
  text: string,
  predicateStart: number
): PrecedingSubject | undefined {
  const parseText = text
    .replaceAll("\n", " ")
    .replaceAll("\r", " ")
    .replaceAll("\t", " ");
  let cursor = 0;
  let clauseStart = 0;
  nlp(parseText)
    .clauses()
    .forEach((clause) => {
      const source = clause.text();
      const start = parseText.indexOf(source, cursor);
      if (start < 0) return;
      cursor = start + source.length;
      if (start <= predicateStart && cursor >= predicateStart)
        clauseStart = start;
    });
  clauseStart += embeddedSubjectStart(
    parseText.slice(clauseStart, predicateStart)
  );
  const prefix = parseText.slice(clauseStart, predicateStart);
  // The first noun phrase keeps modifiers such as "following the policy"
  // from replacing the actor with an embedded object.
  const noun = nlp(prefix).nouns().first();
  const source = noun.text();
  if (source.length === 0) return undefined;
  const terms = noun.termList();
  const preposition = terms.findIndex(
    (term) => term.tags?.has("Preposition") === true || term.normal === "behind"
  );
  const base = preposition < 0 ? terms : terms.slice(0, preposition);
  const last = base.findLast((term) => term.tags?.has("Noun") === true);
  if (last === undefined) return undefined;
  const word = normalizeForMatch(last.text);
  const head = word.endsWith("'s") ? word.slice(0, -2) : word;
  const offset = prefix.indexOf(source);
  const first = wordTokens(startsWithNounPhrase(prefix) ? prefix : source)[0];
  if (offset < 0 || first === undefined) return undefined;
  return {
    head,
    start:
      clauseStart + (startsWithNounPhrase(prefix) ? 0 : offset) + first.start,
    text: source
  };
}
