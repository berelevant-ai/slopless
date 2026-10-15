import nlp from "compromise";
import type { TokenTemplatePattern } from "../../../../shared/matchers/phrases.js";
import { wordTokens } from "../../../../shared/text/tokens.js";
import type { LocalDetection } from "../../../private/textlint-rule-builders.js";
import { frameDetection, frameMatches } from "./frame-matches.js";

const HEADS = [
  "problem",
  "question",
  "task",
  "issue",
  "challenge",
  "job",
  "goal",
  "decision"
].flatMap((head) => [head, `${head}s`]);
const PATTERN: TokenTemplatePattern = {
  id: "narrow-frame",
  templates: [
    "{determiner} {head} {link} {narrow}",
    "{determiner} {head} {link} {degree} {narrow}",
    "{determiner} {modifier} {head} {link} {narrow}",
    "{determiner} {contracted} {narrow}",
    "{determiner} {contracted} {degree} {narrow}",
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
    narrow: ["narrow", "narrower", "narrowest"],
    degree: [
      "much",
      "far",
      "considerably",
      "substantially",
      "even",
      "slightly",
      "more",
      "most"
    ],
    modifier: ["real", "useful", "main", "only", "practical", "actual"],
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
      "seemed"
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

function hasAttachedMeasurement(text: string, end: number): boolean {
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
  const numeric = (phrase: readonly string[]): boolean => {
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
      "most"
    ]);
    return (
      prefix.length <= 4 &&
      prefix.every(
        (word) =>
          quantityWords.has(word.normalized) || nlp(word.text).has("#Adverb")
      )
    );
  };
  if (words[0] === "by") return numeric(words.slice(1));
  const to = words.indexOf("to");
  return (
    words[0] === "from" &&
    to > 1 &&
    numeric(words.slice(1, to)) &&
    numeric(words.slice(to + 1))
  );
}

export function findNarrowFrames(text: string): readonly LocalDetection[] {
  if (!text.toLocaleLowerCase("en").includes("narrow")) return [];
  return frameMatches(text, [PATTERN])
    .filter((match) => !hasAttachedMeasurement(text, match.end))
    .filter((match) => {
      if (text.at(match.end) === "-") return false;
      const tail = text.slice(match.end).trimStart();
      if (
        match.template.includes("{contracted}") &&
        nlp(tail).match("^(#Noun|#Verb)").found
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
