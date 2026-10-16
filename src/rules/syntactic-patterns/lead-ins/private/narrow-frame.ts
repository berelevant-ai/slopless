import nlp from "compromise";
import type {
  TokenTemplatePattern,
  TokenTemplateMatch
} from "../../../../shared/matchers/phrases.js";
import { wordTokens } from "../../../../shared/text/tokens.js";
import { subjectBefore } from "../../../../shared/text/subject-before.js";
import type { LocalDetection } from "../../../private/textlint-rule-builders.js";
import { frameDetection, frameMatches } from "./frame-matches.js";
import {
  RESTRICTIONS,
  hasAttachedConstraint,
  hasScopeDefinition,
  hasOperationalPredicate,
  hasAttachedMeasurement
} from "./narrow-frame-constraints.js";

const HEADS = [
  "problem",
  "question",
  "task",
  "issue",
  "challenge",
  "job",
  "goal",
  "decision",
  "scope",
  "coverage",
  "vocabulary",
  "lexicon",
  "applicability",
  "remit",
  "reach",
  "approach",
  "analysis",
  "explanation",
  "interpretation",
  "perspective",
  "view",
  "outlook",
  "understanding",
  "knowledge",
  "argument",
  "answer",
  "claim",
  "conclusion",
  "strategy",
  "solution",
  "method",
  "option",
  "choice",
  "ambition",
  "offering",
  "product",
  "service",
  "feature",
  "application",
  "project",
  "implementation",
  "brief",
  "inquiry",
  "investigation",
  "focus",
  "focuses",
  "foci"
].flatMap((head) => {
  const noun = nlp(head);
  noun.tag("Noun");
  return [head, noun.nouns().toPlural().text()];
});
const ADJECTIVES = ["narrow", "narrower", "narrowest", ...RESTRICTIONS];
const PATTERN: TokenTemplatePattern = {
  id: "narrow-frame",
  templates: [
    "{determiner} {head} {link} {narrow}",
    "{determiner} {head} {link} {degree} {narrow}",
    "{determiner} {modifier} {head} {link} {narrow}",
    "{determiner} {modifier} {head} {link} {degree} {narrow}",
    "{determiner} {contracted} {narrow}",
    "{determiner} {contracted} {degree} {narrow}",
    "{determiner} {narrow} {head}",
    "{determiner} {degree} {narrow} {head}",
    "{determiner} {narrow} {head} {link}",
    "{possession} {determiner} {narrow} {head}",
    "{possession} {determiner} {degree} {narrow} {head}"
  ],
  slots: {
    determiner: [
      "the",
      "a",
      "an",
      "this",
      "that",
      "these",
      "those",
      "our",
      "your",
      "their",
      "my",
      "its"
    ],
    head: HEADS,
    contracted: HEADS.map((head) => `${head}'s`),
    narrow: ADJECTIVES,
    degree: [
      "much",
      "far",
      "considerably",
      "substantially",
      "even",
      "slightly",
      "more",
      "most",
      "narrowly",
      "severely",
      "inherently",
      "tightly",
      "strictly",
      "highly",
      "very"
    ],
    modifier: [
      "real",
      "useful",
      "main",
      "only",
      "practical",
      "actual",
      "available"
    ],
    link: [
      "is",
      "are",
      "was",
      "were",
      "remains",
      "remain",
      "became",
      "becomes",
      "seems",
      "seemed",
      "stay",
      "stays",
      "stayed"
    ],
    possession: [
      "has",
      "have",
      "had",
      "faces",
      "face",
      "faced",
      "poses",
      "pose",
      "posed"
    ]
  }
};

function hasRestriction(text: string): boolean {
  const lower = text.toLocaleLowerCase("en");
  return ADJECTIVES.some((adjective) => lower.includes(adjective));
}

function hasNounContinuation(text: string, match: TokenTemplateMatch): boolean {
  const end = match.end;
  const rest = text.slice(end);
  const tail = rest.trimStart();
  if (wordTokens(tail)[0]?.start !== 0) return false;
  const parsed = nlp(tail);
  if (match.template.endsWith("{head}")) {
    const words = wordTokens(tail);
    if (
      ["and", "or"].includes(words[0]?.normalized ?? "") &&
      PATTERN.slots["head"]?.includes(words[1]?.normalized ?? "") === true
    ) {
      const coordinated = words[1];
      if (coordinated !== undefined)
        return hasNounContinuation(text, {
          ...match,
          end: end + rest.length - tail.length + coordinated.end
        });
    }
    if (
      parsed.match(
        "^(#Noun|#Infinitive|#PresentTense) (#Copula|#PresentTense|#PastTense|#Modal)"
      ).found
    )
      return true;
    const first = wordTokens(tail)[0]?.normalized ?? "";
    const verb = nlp(first);
    verb.tag("Verb");
    const form = verb.verbs().conjugate()[0];
    if (
      form !== undefined &&
      "PresentTense" in form &&
      form.PresentTense === first &&
      "Infinitive" in form &&
      typeof form.Infinitive === "string" &&
      nlp(form.Infinitive).has("#Verb")
    )
      return false;
  }
  if (
    parsed.match("^#Noun").found ||
    parsed.match("^(#Adverb|#Adjective|and|or)+ #Noun").found
  )
    return true;
  const start = end + rest.length - tail.length;
  let found = false;
  nlp(text)
    .nouns()
    .forEach((noun) => {
      if (text.startsWith(noun.text(), start)) found = true;
    });
  return found;
}

function hasScopeSubject(text: string, match: TokenTemplateMatch): boolean {
  if (
    match.template.includes("{possession}") ||
    match.template === "{determiner} {narrow} {head} {link}"
  )
    return true;
  const words = wordTokens(match.text);
  const contracted = words.find((word) => word.normalized.endsWith("'s"));
  const predicate = words.find(
    (word) => PATTERN.slots["link"]?.includes(word.normalized) === true
  );
  if (contracted !== undefined)
    return HEADS.includes(
      subjectBefore(text, match.start + contracted.end)?.head ?? ""
    );
  if (predicate === undefined) return true;
  const subject = subjectBefore(text, match.start + predicate.start);
  if (subject === undefined) return true;
  const subjectWords = wordTokens(subject.text)
    .map((word) => word.normalized)
    .join(" ");
  const matchedSubject = words
    .filter((word) => word.end <= predicate.start)
    .map((word) => word.normalized)
    .join(" ");
  return !subjectWords.includes(matchedSubject) || HEADS.includes(subject.head);
}

export function findNarrowFrames(text: string): readonly LocalDetection[] {
  if (!hasRestriction(text)) return [];
  return frameMatches(text, [PATTERN])
    .filter((match) => !hasAttachedMeasurement(text, match.end))
    .filter((match) => !hasAttachedConstraint(text, match))
    .filter((match) => !hasScopeDefinition(text, match))
    .filter((match) => !hasOperationalPredicate(text, match))
    .filter((match) => hasScopeSubject(text, match))
    .filter((match) => {
      if (text.at(match.end) === "-") return false;
      const tail = text.slice(match.end).trimStart();
      if (hasNounContinuation(text, match)) return false;
      if (
        match.template.includes("{contracted}") &&
        wordTokens(tail)[0]?.start === 0 &&
        nlp(tail).match("^#Verb").found
      )
        return false;
      if (match.template === "{determiner} {narrow} {head} {link}") {
        const first = wordTokens(tail)[0]?.normalized ?? "";
        if (first === "being") return false;
        return (
          [
            "what",
            "which",
            "who",
            "whether",
            "how",
            "where",
            "when",
            "why"
          ].includes(first) || nlp(tail).match("^#Gerund").found
        );
      }
      return true;
    })
    .map((match) => frameDetection(text, match.start, match.end, PATTERN.id));
}

export function withoutMeasuredNarrowClauses(
  text: string
): readonly string[] | undefined {
  if (!text.toLocaleLowerCase("en").includes("narrow")) return undefined;
  const measured = frameMatches(text, [PATTERN]).filter((match) =>
    hasAttachedMeasurement(text, match.end)
  );
  if (measured.length === 0) return undefined;
  const remaining: string[] = [];
  let cursor = 0;
  nlp(text)
    .clauses()
    .splitBefore(
      "(and|or|but) (#Determiner|#Possessive)? #Adjective? #Noun+ #Copula"
    )
    .forEach((clause) => {
      const source = clause.text();
      const start = text.indexOf(source, cursor);
      if (start < 0) return;
      cursor = start + source.length;
      if (
        !measured.some((match) => match.start >= start && match.end <= cursor)
      )
        remaining.push(source);
    });
  return remaining;
}
