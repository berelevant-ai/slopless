import { wordTokens } from "../../../shared/text/tokens.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

// A closing question that asserts its own answer: "isn't that the point?",
// "Is that not the whole goal?", "Aren't those the questions?", "isn't that
// what we all want?". Grammar, anywhere in the sentence:
//   {negated copula} {deictic} [the] [evaluative] {summary noun}
//   {copula} {deictic} not [the] [evaluative] {summary noun}
//   {negated copula} {deictic} {what|why} ...
// The sentence must end with "?" and be the last sentence of its section, so
// a question the text then answers ("Isn't that the goal? The report answers
// it with churn data.") is left alone.
const NEGATED_COPULAS = new Set(["isn't", "aren't", "wasn't", "weren't"]);
const COPULAS = new Set(["is", "are", "was", "were"]);
const DEICTICS = new Set(["that", "this", "it", "those", "these"]);
const DETERMINERS = new Set(["the", "our", "your", "my"]);
const EVALUATIVE_WORDS = new Set([
  "actual",
  "basic",
  "bigger",
  "entire",
  "main",
  "obvious",
  "real",
  "simple",
  "true",
  "ultimate",
  "underlying",
  "whole"
]);
const SUMMARY_NOUNS = new Set([
  "answer",
  "answers",
  "ask",
  "goal",
  "goals",
  "idea",
  "job",
  "lesson",
  "lessons",
  "point",
  "points",
  "priority",
  "problem",
  "question",
  "questions",
  "reason",
  "story",
  "takeaway",
  "truth"
]);
const CLAUSE_HEADS = new Set(["what", "why", "how"]);

function matchAt(words: readonly string[], start: number): string | undefined {
  let index = start;
  const first = words[index] ?? "";
  let negated = NEGATED_COPULAS.has(first);
  if (!negated && !COPULAS.has(first)) {
    return undefined;
  }
  index += 1;
  if (!DEICTICS.has(words[index] ?? "")) {
    return undefined;
  }
  index += 1;
  if (!negated) {
    if (words[index] !== "not") {
      return undefined;
    }
    negated = true;
    index += 1;
  }

  if (CLAUSE_HEADS.has(words[index] ?? "")) {
    return `${words.slice(start, index + 1).join(" ")}`;
  }
  if (DETERMINERS.has(words[index] ?? "")) {
    index += 1;
  }
  if (EVALUATIVE_WORDS.has(words[index] ?? "")) {
    index += 1;
  }
  return SUMMARY_NOUNS.has(words[index] ?? "")
    ? words.slice(start, index + 1).join(" ")
    : undefined;
}

function matchFalseQuestion(text: string): string | undefined {
  if (!text.trimEnd().endsWith("?")) {
    return undefined;
  }
  const words = wordTokens(text).map((token) => token.normalized);
  for (let start = 0; start < words.length; start += 1) {
    const signal = matchAt(words, start);
    if (signal !== undefined) {
      return signal;
    }
  }
  return undefined;
}

const rule = oneToOneRule({
  detect: (unit) => {
    const pattern = matchFalseQuestion(unit.text);
    if (pattern === undefined) {
      return [];
    }

    return [
      {
        evidence: pattern,
        label: pattern,
        range: { start: 0, end: unit.text.length }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `False question found: "${report.evidence}". Make the claim directly.`,
  ruleId: "syntactic-patterns:false-question",
  unitKind: "section-last-sentence"
});

export default rule;
