import nlp from "compromise";
import { splitSentences } from "../../../shared/text/sentences.js";
import type { SourceRange } from "../../types.js";
import { sceneWords } from "./scene-words.js";
import { SENSORIAL_COMPLEMENTS, SUBORDINATING_MARKERS } from "./weak-action.js";

type Term = ReturnType<ReturnType<typeof nlp>["termList"]>[number];
type Opening = {
  readonly end: number;
  readonly label: string;
  readonly actor: boolean;
  readonly named: boolean;
  readonly physicalSubject: boolean;
  readonly bodySubject: boolean;
};
export type ActionOccurrence = {
  readonly range: SourceRange;
  readonly ordinal: number;
  readonly group: "actor-action" | "scene-action" | "linking";
  readonly label: string;
};
const SUBJECT_PARTS = new Set([
  "Noun",
  "Determiner",
  "Possessive",
  "Adjective",
  "Preposition",
  "Value"
]);
const forms = new Map<string, string>();

function base(word: string, noun: boolean): string {
  const key = `${noun}:${word}`;
  const cached = forms.get(key);
  if (cached !== undefined) return cached;
  const doc = nlp(word);
  if (noun) doc.tag("Noun");
  if (!noun) {
    if (doc.has("#Adjective") && !doc.has("#Verb"))
      doc.unTag("Adjective").tag("PastTense");
    else doc.tag("Verb");
  }
  let value = noun
    ? doc.nouns().toSingular().text()
    : doc.verbs().toInfinitive().text();
  if (
    !noun &&
    value.endsWith("e") &&
    !sceneWords.physical.has(value) &&
    sceneWords.physical.has(value.slice(0, -1))
  )
    value = value.slice(0, -1);
  if (forms.size < 10000) forms.set(key, value || word);
  return value || word;
}

function termWord(term: Term): string {
  return "implicit" in term && typeof term.implicit === "string"
    ? term.implicit
    : term.normal;
}

function actor(term: Term): boolean {
  const word = termWord(term);
  if (term.tags?.has("Pronoun") === true) return word !== "it";
  return (
    term.tags?.has("Person") === true ||
    sceneWords.actors.has(base(term.normal, true))
  );
}

function namedSubject(term: Term, verb?: Term): boolean {
  const initial = term.text[0];
  return (
    initial !== undefined &&
    initial !== initial.toLowerCase() &&
    (!sceneWords.knownNouns.has(base(term.normal, true)) ||
      (verb !== undefined &&
        sceneWords.animate.has(base(verb.normal, false)))) &&
    !["Organization", "Place", "Acronym", "Pronoun"].some(
      (tag) => term.tags?.has(tag) === true
    )
  );
}

function nounModifier(terms: readonly Term[], index: number): boolean {
  return (
    terms[index - 1]?.tags?.has("Determiner") === true &&
    (terms[index + 1]?.tags?.has("Noun") === true ||
      terms[index + 1]?.tags?.has("Adjective") === true)
  );
}

function verbCandidate(term: Term, next: Term | undefined): boolean {
  if (term.tags?.has("Verb") === true) {
    if (
      term.tags.has("PastTense") &&
      !term.tags.has("Auxiliary") &&
      !term.tags.has("Particle")
    ) {
      const lemma = base(term.normal, false);
      const key = `past:${lemma}`;
      let past = forms.get(key);
      if (past === undefined) {
        const doc = nlp(`I ${lemma}`);
        past = doc.verbs().toPastTense().text();
        if (forms.size < 10000) forms.set(key, past);
      }
      if (past !== "" && past !== lemma && past !== term.normal) return false;
    }
    return true;
  }
  const lemma = base(term.normal, false);
  return (
    (term.tags?.has("Adjective") === true ||
      (term.tags?.has("Plural") === true &&
        next?.tags?.has("Determiner") === true)) &&
    lemma !== term.normal &&
    sceneWords.physical.has(lemma)
  );
}

function subjectStart(terms: readonly Term[]): number | undefined {
  let start = 0;
  while (
    terms[start]?.tags?.has("Conjunction") === true ||
    terms[start]?.tags?.has("Adverb") === true
  )
    start += 1;
  if (terms[start]?.tags?.has("Preposition") === true) return undefined;
  if (
    terms[start]?.tags?.has("Adjective") === true &&
    terms[start + 1]?.tags?.has("Determiner") === true
  )
    return undefined;
  return start;
}

function opening(terms: readonly Term[]): Opening | undefined {
  const start = subjectStart(terms);
  if (start === undefined) return undefined;
  let head: Term | undefined;
  for (let index = start; index < terms.length; index += 1) {
    const term = terms[index];
    if (term?.tags === undefined) return undefined;
    const modifier = nounModifier(terms, index);
    if (
      head !== undefined &&
      !modifier &&
      verbCandidate(term, terms[index + 1])
    ) {
      if (!finiteVerbFor(term, head)) return undefined;
      let end = index;
      if (term.tags.has("Auxiliary")) {
        while (
          terms[end + 1]?.tags?.has("Particle") !== true &&
          ["Verb", "Negative", "Adverb"].some(
            (tag) => terms[end + 1]?.tags?.has(tag) === true
          )
        )
          end += 1;
      }
      return {
        end,
        actor: actor(head),
        named: head === terms[start] && namedSubject(head, terms[end]),
        physicalSubject: sceneWords.concrete.has(base(head.normal, true)),
        bodySubject: sceneWords.body.has(base(head.normal, true)),
        label: terms
          .slice(start, end + 1)
          .filter((part) => part.text.length > 0)
          .map((part) => part.text)
          .join(" ")
      };
    }
    if (!modifier && ![...term.tags].some((tag) => SUBJECT_PARTS.has(tag)))
      return undefined;
    if (
      head === undefined &&
      isSubjectHead(term, index === start, terms[index + 1])
    ) {
      head = term;
    }
  }
  return undefined;
}

function isSubjectHead(
  term: Term,
  first: boolean,
  next: Term | undefined
): boolean {
  if (first && namedSubject(term) && next?.tags?.has("Verb") === true)
    return true;
  return (
    term.tags?.has("Noun") === true &&
    !term.tags.has("Demonym") &&
    !term.tags.has("Possessive") &&
    (!term.tags.has("Pronoun") || first)
  );
}

function finiteVerbFor(verb: Term, subject: Term): boolean {
  if (["Gerund", "Modal"].some((tag) => verb.tags?.has(tag) === true))
    return false;
  return !(
    verb.tags?.has("PresentTense") === true &&
    !verb.tags.has("Auxiliary") &&
    subject.tags?.has("Pronoun") !== true &&
    subject.tags?.has("Plural") !== true &&
    verb.normal === base(verb.normal, false)
  );
}

function physicalGroup(
  terms: readonly Term[],
  action: Opening
): ActionOccurrence["group"] | undefined {
  const verb = terms[action.end];
  if (verb === undefined) return undefined;
  if (passiveVerb(terms, action.end)) return undefined;
  const tail = terms.slice(action.end + 1);
  if (
    tail.length > 12 ||
    terms.some((term) =>
      ["Value", "Modal", "QuestionWord"].some(
        (tag) => term.tags?.has(tag) === true
      )
    )
  )
    return undefined;
  const nouns = tail.filter(
    (term) => term.tags?.has("Noun") === true && !term.tags.has("Possessive")
  );
  const concrete = nouns.some(
    (term) =>
      sceneWords.concrete.has(base(term.normal, true)) ||
      term.tags?.has("Person") === true
  );
  const lemma = base(termWord(verb), false);
  if (verb.tags?.has("Copula") === true) {
    return tail.length <= 5 &&
      tail.some((term) => SENSORIAL_COMPLEMENTS.has(term.normal))
      ? "linking"
      : undefined;
  }
  const object = nouns[0];
  const physicalObject =
    object !== undefined && sceneWords.concrete.has(base(object.normal, true));
  if (!physicalPredicate(lemma, tail, physicalObject, action.bodySubject))
    return undefined;
  if (![action.actor, action.named, action.physicalSubject].includes(true))
    return undefined;
  return action.actor ||
    (action.named &&
      (concrete || (action.physicalSubject && sceneWords.animate.has(lemma))))
    ? "actor-action"
    : "scene-action";
}

function physicalPredicate(
  lemma: string,
  tail: readonly Term[],
  physicalObject: boolean,
  bodySubject: boolean
): boolean {
  const directed =
    [sceneWords.change, sceneWords.gesture, sceneWords.counting].some((words) =>
      words.has(lemma)
    ) && !tail.some((term) => term.tags?.has("Verb") === true);
  const content = tail.find((term) => term.tags?.has("Adverb") !== true);
  const motion =
    sceneWords.physical.has(lemma) &&
    (!sceneWords.transitive.has(lemma) ||
      (content !== undefined && content.tags?.has("Preposition") !== true));
  const vocal =
    sceneWords.vocal.has(lemma) &&
    (content === undefined || content.tags?.has("Preposition") === true) &&
    !tail.some((term) => term.tags?.has("Verb") === true);
  return motion || (directed && (physicalObject || bodySubject)) || vocal;
}

function passiveVerb(terms: readonly Term[], index: number): boolean {
  return (
    terms[index]?.tags?.has("PastTense") === true &&
    terms
      .slice(0, index)
      .some(
        (term) =>
          term.tags?.has("Auxiliary") === true &&
          base(termWord(term), false) === "be"
      )
  );
}

function subjectClauses(
  doc: ReturnType<typeof nlp>,
  text: string,
  positions: ReadonlyMap<Term, number>,
  sentenceStart: number
): readonly Term[][] {
  const chunks: Term[][] = [];
  doc.clauses().forEach((clause) => {
    const terms = clause.termList();
    const first = terms[0];
    const start = first === undefined ? undefined : positions.get(first);
    if (start === undefined) return;
    const prefix = text.slice(sentenceStart, start).trimEnd();
    const action = opening(terms);
    const descriptive =
      first?.tags?.has("Possessive") === true && action?.actor === false;
    const boundary =
      prefix.endsWith(";") ||
      (((prefix.endsWith(",") && !descriptive) ||
        first?.tags?.has("Conjunction") === true) &&
        action !== undefined);
    const previous = chunks.at(-1);
    if (previous === undefined || boundary) chunks.push(terms);
    else previous.push(...terms);
  });
  return chunks;
}

export function actionOccurrences(text: string): readonly ActionOccurrence[] {
  const occurrences: ActionOccurrence[] = [];
  let ordinal = 0;
  for (const sentence of splitSentences(text)) {
    let position = ordinal++;
    if (
      ["?", ":", "(", ")", '"', "\u201c", "\u201d"].some((mark) =>
        sentence.text.includes(mark)
      )
    )
      continue;
    const doc = nlp(sentence.text);
    const all = doc.termList();
    if (
      all.some(
        (term) =>
          SUBORDINATING_MARKERS.has(term.normal) ||
          (["but", "yet", "so"].includes(term.normal) &&
            term.tags?.has("Conjunction") === true)
      )
    )
      continue;
    const positions = new Map<Term, number>();
    let offset = sentence.start;
    for (const term of all) {
      positions.set(term, offset + term.pre.length);
      offset += term.pre.length + term.text.length + term.post.length;
    }
    const chunks = subjectClauses(doc, text, positions, sentence.start);
    if (opening(chunks[0] ?? []) === undefined) continue;
    for (const [index, terms] of chunks.entries()) {
      if (index > 0) position = ordinal++;
      const occurrence = occurrenceFor(terms, positions, position);
      if (occurrence !== undefined) occurrences.push(occurrence);
    }
  }
  return occurrences;
}

function occurrenceFor(
  terms: readonly Term[],
  positions: ReadonlyMap<Term, number>,
  ordinal: number
): ActionOccurrence | undefined {
  const first = terms[0];
  const last = terms.at(-1);
  const start = first === undefined ? undefined : positions.get(first);
  const lastStart = last === undefined ? undefined : positions.get(last);
  if (start === undefined || lastStart === undefined || last === undefined)
    return undefined;
  const action = opening(terms);
  if (action === undefined) return undefined;
  const group = physicalGroup(terms, action);
  if (group === undefined) return undefined;
  return {
    range: {
      start,
      end: lastStart + last.text.length + last.post.trimEnd().length
    },
    ordinal,
    group,
    label: action.label
  };
}
