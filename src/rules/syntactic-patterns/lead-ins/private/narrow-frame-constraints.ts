import nlp from "compromise";
import type { TokenTemplateMatch } from "../../../../shared/matchers/phrases.js";
import { wordTokens } from "../../../../shared/text/tokens.js";
import { normalizeWhitespace } from "../../../../shared/text/normalize.js";
import { hasConcreteImplementationSummary } from "../../../../shared/matchers/concrete-evidence.js";

export const RESTRICTIONS = ["bounded", "limited", "constrained", "restricted"];
const FINITE_CLAUSE =
  "(there|#Pronoun|#Noun) #Adverb? (#PresentTense|#PastTense|#Copula|#Modal)";

function constraintTail(text: string, end: number): string {
  let tail = normalizeWhitespace(text.slice(end));
  if (tail.startsWith(",")) {
    const close = tail.indexOf(",", 1);
    if (close > 1 && !nlp(tail.slice(1, close)).match(FINITE_CLAUSE).found)
      tail = tail.slice(close + 1).trimStart();
  }
  const adverbs = nlp(tail).match("^#Adverb+").text();
  return tail.slice(adverbs.length).trimStart();
}

export function hasAttachedConstraint(
  text: string,
  match: TokenTemplateMatch
): boolean {
  const tail = constraintTail(text, match.end);
  const words = wordTokens(tail);
  const first = words[0];
  if (!first || tail.slice(0, first.start).trim().length > 0) return false;
  const restricted = wordTokens(match.text).some((word) =>
    RESTRICTIONS.includes(word.normalized)
  );
  if (match.template.includes("{narrow} {head}") && first.normalized === "of")
    return hasObjectLimit(tail);
  if (
    match.template.endsWith("{head}") &&
    !match.template.includes("{possession}")
  )
    return false;
  if (!restricted) return false;
  if (["as", "because", "since", "when"].includes(first.normalized))
    return nlp(tail).clauses().first().match(FINITE_CLAUSE).found;
  if (first.normalized === "for")
    return nlp(tail).match("^for #Gerund").found && nlp(tail).nouns().found;
  if (first.normalized === "at")
    return isQuantity(words.slice(1).map((word) => word.normalized));
  if (
    first.normalized === "by" &&
    ["contrast", "design", "default"].includes(words[1]?.normalized ?? "")
  )
    return false;
  return (
    ["to", "by", "within", "between"].includes(first.normalized) &&
    words.length > 1
  );
}

function hasObjectLimit(tail: string): boolean {
  const boundary = Math.min(
    tail.length,
    ...[";", ":"]
      .map((delimiter) => tail.indexOf(delimiter))
      .filter((index) => index >= 0)
  );
  const sentence = nlp(tail.slice(0, boundary)).sentences().first();
  const object = nlp(tail.slice(2, boundary)).nouns().first().text();
  const remainder = tail.slice(tail.indexOf(object) + object.length, boundary);
  const cause = wordTokens(remainder)[0];
  return (
    sentence.match("^of #Adverb? #Value").found ||
    (object.length > 0 &&
      cause?.normalized === "because" &&
      nlp(remainder.slice(cause.end)).match(FINITE_CLAUSE).found &&
      nlp(remainder.slice(cause.end)).has("(no|not|only|cannot|can't)")) ||
    sentence.match(
      "^of #Determiner? #Adjective? #Noun+ (and so|and therefore|and|because) #Pronoun? #Modal (only|not) #Verb"
    ).found
  );
}

export function hasOperationalPredicate(
  text: string,
  match: TokenTemplateMatch
): boolean {
  if (
    !match.template.endsWith("{head}") ||
    match.template.includes("{possession}")
  )
    return false;
  const tail = normalizeWhitespace(text.slice(match.end));
  const parsedTail = nlp(tail);
  const prefix =
    parsedTail.match("^#Copula (being|#Adverb)+").text() ||
    parsedTail.match("^#Copula").text();
  if (prefix.length === 0) return false;
  const words = wordTokens(tail.slice(prefix.length));
  const verb = words[0]?.normalized;
  if (verb === undefined || RESTRICTIONS.includes(verb)) return false;
  const parsed = nlp(verb);
  parsed.tag("Verb");
  const form = parsed.verbs().conjugate()[0];
  return (
    form !== undefined &&
    (("PastTense" in form && form.PastTense === verb) ||
      ("Participle" in form && form.Participle === verb)) &&
    "Infinitive" in form &&
    form.Infinitive !== verb
  );
}

function hasImplementationBasis(tail: string): boolean {
  const definition = tail.startsWith(",") ? tail.slice(1).trimStart() : tail;
  const basisPrefix = nlp(definition).match("^based on").text();
  const basis =
    basisPrefix.length === 0
      ? ""
      : nlp(definition.slice(basisPrefix.length)).nouns().first().text();
  return (
    basis.length > 0 &&
    (hasConcreteImplementationSummary(basis) ||
      nlp(basis).has(
        "(iterator|iterators|algorithm|algorithms|protocol|protocols|schema|schemas|lookup table|lookup tables|state machine|state machines)"
      ))
  );
}

function hasScopeReference(
  text: string,
  match: TokenTemplateMatch,
  tail: string
): boolean {
  const head = wordTokens(match.text).at(-1)?.normalized ?? "";
  return (
    ["scope", "coverage", "remit", "reach"].includes(head) &&
    ["outside", "inside", "within", "beyond"].includes(
      wordTokens(text.slice(0, match.start)).at(-1)?.normalized ?? ""
    ) &&
    nlp(tail).match("^of").found &&
    nlp(tail.slice(2)).nouns().found
  );
}

function hasCapabilityBoundary(tail: string): boolean {
  const parsed = nlp(tail);
  const capability = parsed.match(
    "^#Adverb? (accepts|accept|supports|support|handles|handle|covers|cover|includes|include|processes|process|serves|serve) #Adverb?"
  );
  const prefix = capability.has("(only|exactly)")
    ? capability.text()
    : parsed
        .match(
          "^#Copula #Adverb? (limited|restricted|constrained|bounded) #Adverb? to"
        )
        .text();
  if (prefix.length === 0) return false;
  const object = tail.slice(prefix.length).trimStart();
  const noun = nlp(object).nouns().first().text();
  return noun.length > 0 && object.startsWith(noun);
}

export function hasScopeDefinition(
  text: string,
  match: TokenTemplateMatch
): boolean {
  const tail = normalizeWhitespace(text.slice(match.end));
  if (
    match.template.endsWith("{head}") &&
    !match.template.includes("{possession}")
  ) {
    if (hasImplementationBasis(tail) || hasScopeReference(text, match, tail))
      return true;
    if (
      nlp(tail).match(
        "^(is|are|was|were|remains|remain) #Adverb? (defined|documented|specified|listed|described|recorded) (in|at|on|under)"
      ).found
    )
      return true;
    if (hasCapabilityBoundary(tail)) return true;
  }
  if (!match.template.includes("{narrow} {head}")) return false;
  if (!tail.startsWith(":")) return false;
  const source = tail.slice(1).trimStart();
  const tokens = wordTokens(source);
  if (tokens[0]?.start !== 0) return false;
  const words = tokens.map((word) => word.normalized);
  return (
    ["it", "they", "this", "that"].includes(words[0] ?? "") &&
    ["covers", "includes", "excludes"].includes(words[1] ?? "") &&
    words.length > 2
  );
}

export function hasAttachedMeasurement(text: string, end: number): boolean {
  const tail = text.slice(end);
  let boundary = tail.length;
  for (let index = 0; index < tail.length; index += 1) {
    if ([":", ";", "!", "?"].includes(tail[index] ?? "")) {
      boundary = index;
      break;
    }
  }
  const words = wordTokens(tail.slice(0, boundary)).map(
    (word) => word.normalized
  );
  if (words[0] === "by") return isQuantity(words.slice(1));
  const to = words.indexOf("to");
  return (
    words[0] === "from" &&
    to > 1 &&
    isQuantity(words.slice(1, to)) &&
    isQuantity(words.slice(to + 1))
  );
}

function isQuantity(phrase: readonly string[]): boolean {
  const source = phrase.join(" ");
  const number = nlp(source).numbers().first().text();
  if (number.length === 0) return false;
  const prefix = wordTokens(source.slice(0, source.indexOf(number)));
  const quantityWords = new Set([
    "about",
    "around",
    "approximately",
    "roughly",
    "a",
    "factor",
    "of",
    "at",
    "least",
    "most",
    "no",
    "more",
    "less",
    "than",
    "up",
    "to"
  ]);
  return (
    prefix.length <= 4 &&
    prefix.every(
      (word) =>
        quantityWords.has(word.normalized) || nlp(word.text).has("#Adverb")
    )
  );
}
