import { hasConcreteTechnicalToken } from "../../../../shared/matchers/concrete-evidence.js";
import { tokens } from "../../../../shared/matchers/prose-patterns.js";
import { normalizeForMatch } from "../../../../shared/text/normalize.js";

const SUBJECT_HEADS = new Set([
  "answer",
  "answers",
  "approach",
  "approaches",
  "architecture",
  "architectures",
  "audit",
  "audits",
  "choice",
  "choices",
  "decision",
  "decisions",
  "design",
  "designs",
  "machine",
  "machines",
  "method",
  "methods",
  "model",
  "models",
  "pipeline",
  "pipelines",
  "plan",
  "plans",
  "platform",
  "platforms",
  "problem",
  "problems",
  "process",
  "processes",
  "solution",
  "solutions",
  "stack",
  "stacks",
  "strategy",
  "strategies",
  "setup",
  "setups",
  "system",
  "systems",
  "workflow",
  "workflows"
]);

const EVALUATIVE_ADJECTIVES = new Set([
  "boring",
  "clear",
  "complex",
  "easy",
  "hard",
  "heavy",
  "obvious",
  "simple",
  "straightforward"
]);
const EVALUATIVE_LINKS = new Set([
  "are",
  "feel",
  "feels",
  "is",
  "look",
  "looks",
  "was",
  "were"
]);

const QUANTITY_WORDS = new Set([
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "dozen",
  "hundred",
  "thousand",
  "million",
  "several"
]);

const MONTHS_AND_TIMES = new Set([
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  "midnight",
  "noon"
]);

function hasDigitOrEquationSymbol(text: string): boolean {
  for (const character of text) {
    if (
      (character >= "0" && character <= "9") ||
      ["=", "<", ">", "+", "\u00d7", "\u00f7"].includes(character)
    ) {
      return true;
    }
  }

  return false;
}

function firstAsciiWord(text: string): string | undefined {
  let word = "";

  for (const character of text.trimStart()) {
    const isLetter =
      (character >= "A" && character <= "Z") ||
      (character >= "a" && character <= "z");
    const isWordContinuation =
      isLetter || (character >= "0" && character <= "9") || character === "-";

    if (!isWordContinuation) {
      break;
    }
    word += character;
  }

  return word.length > 0 ? word : undefined;
}

function isIdentifierLike(word: string): boolean {
  for (const character of word.slice(1)) {
    if (character >= "A" && character <= "Z") {
      return true;
    }
  }

  return false;
}

function hasExcludedEvidence(text: string, words: readonly string[]): boolean {
  const trimmed = text.trimStart();
  const firstWord = firstAsciiWord(trimmed);
  const startsWithNamedTechnicalSubject =
    firstWord !== undefined &&
    isIdentifierLike(firstWord) &&
    hasConcreteTechnicalToken(text);

  return (
    hasDigitOrEquationSymbol(text) ||
    trimmed.startsWith('"') ||
    trimmed.startsWith("'") ||
    text.includes("`") ||
    startsWithNamedTechnicalSubject ||
    words.some((word) => QUANTITY_WORDS.has(word) || MONTHS_AND_TIMES.has(word))
  );
}

export function matchEvaluativeColonFrame(text: string): string | undefined {
  const colonIndex = text.indexOf(":");
  if (colonIndex < 0 || text.indexOf(":", colonIndex + 1) >= 0) {
    return undefined;
  }

  const prefix = normalizeForMatch(text.slice(0, colonIndex));
  const detail = text.slice(colonIndex + 1);
  const prefixWords = tokens(prefix);
  const detailWords = tokens(detail);
  const copulaIndex = prefixWords.findIndex((word) =>
    EVALUATIVE_LINKS.has(word)
  );

  if (
    copulaIndex < 1 ||
    copulaIndex > 3 ||
    prefixWords.length !== copulaIndex + 2 ||
    !SUBJECT_HEADS.has(prefixWords[copulaIndex - 1] ?? "") ||
    !EVALUATIVE_ADJECTIVES.has(prefixWords[copulaIndex + 1] ?? "") ||
    detailWords.length < 2 ||
    hasExcludedEvidence(detail, detailWords)
  ) {
    return undefined;
  }

  return prefixWords.join("-");
}
