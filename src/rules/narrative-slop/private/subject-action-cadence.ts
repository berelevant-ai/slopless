import nlp from "compromise";
import { splitSentences } from "../../../shared/text/sentences.js";
import { wordTokens } from "../../../shared/text/tokens.js";
import type { SourceRange } from "../../types.js";
import { classifySentence, SUBORDINATING_MARKERS } from "./weak-action.js";

type Term = ReturnType<ReturnType<typeof nlp>["termList"]>[number];
export type ActionOccurrence = {
  readonly range: SourceRange;
  readonly ordinal: number;
  readonly group: "action" | "weak-action" | "linking";
  readonly label: string;
};
const SUBJECT_PARTS = new Set([
  "Noun",
  "Determiner",
  "Possessive",
  "Adjective",
  "Preposition",
  "Adverb",
  "Value"
]);

function ambiguousVerb(term: Term, next: Term | undefined): boolean {
  if (
    term.tags?.has("Plural") === true &&
    next?.tags?.has("Determiner") === true
  ) {
    return nlp(`he ${term.normal}`).verbs().text() === term.text;
  }
  if (
    term.tags?.has("Adjective") !== true ||
    next?.tags?.has("Noun") === true ||
    next?.tags?.has("Adjective") === true
  )
    return false;
  const candidate = nlp(term.normal);
  candidate.unTag("Adjective").tag("PastTense");
  const base = candidate.verbs().toInfinitive().text();
  return base !== term.normal && nlp(base).has("#Verb");
}

function nounModifier(terms: readonly Term[], index: number): boolean {
  return (
    terms[index - 1]?.tags?.has("Determiner") === true &&
    (terms[index + 1]?.tags?.has("Noun") === true ||
      terms[index + 1]?.tags?.has("Adjective") === true)
  );
}

function actionOpening(terms: readonly Term[]): string | undefined {
  let start = 0;
  while (
    terms[start]?.tags?.has("Conjunction") === true ||
    terms[start]?.tags?.has("Adverb") === true
  )
    start += 1;
  const first = terms[start];
  if (
    first?.tags === undefined ||
    !["Noun", "Determiner", "Possessive", "Value"].some(
      (tag) => first.tags?.has(tag) === true
    )
  )
    return undefined;
  let hasNoun = false;
  for (let index = start; index < terms.length; index += 1) {
    const term = terms[index];
    if (term?.tags === undefined) return undefined;
    if (hasNoun && startsRelativeClause(term, terms[index + 1]))
      return undefined;
    const modifier = nounModifier(terms, index);
    if (
      hasNoun &&
      !modifier &&
      (term.tags.has("Verb") || ambiguousVerb(term, terms[index + 1]))
    ) {
      if (term.tags.has("Copula") || term.tags.has("Gerund")) return undefined;
      const end = verbEnd(terms, index);
      if (end === undefined) return undefined;
      return terms
        .slice(start, end + 1)
        .map((part) => part.text)
        .join(" ");
    }
    if (!modifier && ![...term.tags].some((tag) => SUBJECT_PARTS.has(tag)))
      return undefined;
    hasNoun ||= term.tags.has("Noun");
  }
  return undefined;
}

function startsRelativeClause(term: Term, next: Term | undefined): boolean {
  if (term.normal === "that" && next?.tags?.has("Verb") === true) return true;
  return (
    term.tags?.has("QuestionWord") === true ||
    (term.tags?.has("Preposition") === true &&
      nlp(term.normal).has("#QuestionWord"))
  );
}

function verbEnd(terms: readonly Term[], index: number): number | undefined {
  if (terms[index]?.tags?.has("Auxiliary") !== true) return index;
  let end = index;
  while (
    end + 1 < terms.length &&
    ["Verb", "Negative", "Adverb"].some(
      (tag) => terms[end + 1]?.tags?.has(tag) === true
    )
  )
    end += 1;
  return end === index || terms[end]?.tags?.has("Copula") === true
    ? undefined
    : end;
}

export function actionOccurrences(text: string): readonly ActionOccurrence[] {
  const occurrences: ActionOccurrence[] = [];
  let ordinal = 0;
  for (const sentence of splitSentences(text)) {
    const doc = nlp(sentence.text);
    const positions = new Map<Term, number>();
    let offset = sentence.start;
    for (const term of doc.termList()) {
      positions.set(term, offset + term.pre.length);
      offset += term.pre.length + term.text.length + term.post.length;
    }
    let subordinate = false;
    let position = ordinal++;
    let foundOpening = false;
    doc.clauses().forEach((clause) => {
      const terms = clause.termList();
      const first = terms[0];
      const last = terms.at(-1);
      const start = first === undefined ? undefined : positions.get(first);
      const lastStart = last === undefined ? undefined : positions.get(last);
      if (
        first === undefined ||
        last === undefined ||
        start === undefined ||
        lastStart === undefined
      )
        return;
      subordinate ||= SUBORDINATING_MARKERS.has(first.normal);
      if (subordinate) return;
      const end = lastStart + last.text.length + last.post.trimEnd().length;
      const part = { text: text.slice(start, end), start, end };
      const legacy = classifySentence(part);
      const verb = wordTokens(part.text).find(
        (token) => token.normalized === legacy?.verb
      );
      const opening = actionOpening(terms);
      if (foundOpening && opening === undefined) return;
      const label =
        opening ??
        (verb === undefined ? undefined : part.text.slice(0, verb.end));
      if (label === undefined && legacy === undefined) return;
      if (foundOpening) position = ordinal++;
      foundOpening = true;
      occurrences.push({
        range: { start, end },
        ordinal: position,
        group: legacy?.actionKind ?? "action",
        label: label ?? legacy?.verb ?? ""
      });
    });
  }
  return occurrences;
}
