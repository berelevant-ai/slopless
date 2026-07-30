import { splitSentences } from "../../../shared/text/sentences.js";
import { wordTokens } from "../../../shared/text/tokens.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const CONCESSION_STARTS = [
  "although ",
  "despite ",
  "even with ",
  "while "
] as const;
const POSITIVE_SETUP = new Set([
  "adoption",
  "achievement",
  "achievements",
  "applications",
  "appeal",
  "expansion",
  "gains",
  "growth",
  "influence",
  "innovation",
  "momentum",
  "popularity",
  "promise",
  "progress",
  "promising",
  "prosperity",
  "recognition",
  "relevance",
  "remarkable",
  "results",
  "strength",
  "strengths",
  "success",
  "successful",
  "traction"
]);
const CHALLENGE_VERBS = new Set([
  "battle",
  "battles",
  "contend",
  "contends",
  "confront",
  "confronts",
  "encounter",
  "encounters",
  "face",
  "faces",
  "facing",
  "grapple",
  "grapples",
  "navigate",
  "navigates",
  "struggle",
  "struggles",
  "wrestle",
  "wrestles"
]);
const CHALLENGE_NOUNS = new Set([
  "barriers",
  "challenges",
  "constraints",
  "difficulties",
  "hurdles",
  "limitations",
  "obstacles",
  "pressures"
]);
const VAGUE_QUANTIFIERS = new Set([
  "complex",
  "considerable",
  "evolving",
  "host",
  "inherent",
  "many",
  "myriad",
  "numerous",
  "ongoing",
  "persistent",
  "range",
  "several",
  "set",
  "significant",
  "substantial",
  "unique",
  "variety",
  "various"
]);
const RECOVERY_STARTS = [
  "despite these ",
  "despite those ",
  "even with these ",
  "even with those ",
  "going forward",
  "in the years ahead",
  "looking ahead",
  "moving forward",
  "nevertheless",
  "nonetheless",
  "still ",
  "with continued ",
  "yet "
] as const;
const RECOVERY_TERMS = new Set([
  "adapt",
  "adoption",
  "collaboration",
  "commitment",
  "continue",
  "continued",
  "continues",
  "development",
  "efforts",
  "evolve",
  "expansion",
  "future",
  "growth",
  "innovation",
  "investment",
  "leadership",
  "momentum",
  "opportunities",
  "opportunity",
  "positioned",
  "potential",
  "progress",
  "relevance",
  "resilience",
  "resilient",
  "success",
  "sustainable",
  "support",
  "thrive",
  "well"
]);

function words(text: string): readonly string[] {
  return wordTokens(text).map((token) => token.normalized);
}

function containsAny(
  values: readonly string[],
  candidates: ReadonlySet<string>
): boolean {
  return values.some((value) => candidates.has(value));
}

function hasDigit(text: string): boolean {
  return [...text].some((character) => character >= "0" && character <= "9");
}

function isFormulaicChallenge(text: string): boolean {
  const normalized = text.trim().toLocaleLowerCase("en");
  const tokens = words(text);
  const hasNotWithoutFrame =
    normalized.includes("not without challenges") ||
    normalized.includes("not without its challenges");
  const hasChallengeFrame =
    containsAny(tokens, CHALLENGE_VERBS) || hasNotWithoutFrame;

  return (
    CONCESSION_STARTS.some((start) => normalized.startsWith(start)) &&
    containsAny(tokens, POSITIVE_SETUP) &&
    hasChallengeFrame &&
    containsAny(tokens, CHALLENGE_NOUNS) &&
    (containsAny(tokens, VAGUE_QUANTIFIERS) || hasNotWithoutFrame) &&
    !hasDigit(text) &&
    !text.includes(":")
  );
}

function isFormulaicRecovery(text: string): boolean {
  const normalized = text.trim().toLocaleLowerCase("en");
  const tokens = words(text);
  const hasRecoveryStart =
    RECOVERY_STARTS.some((start) => normalized.startsWith(start)) ||
    normalized.startsWith("still,");
  const hasGenericContinuation =
    normalized.startsWith("continued ") ||
    normalized.includes(" remains well positioned") ||
    normalized.includes(" stands poised") ||
    normalized.includes(" will allow ") ||
    normalized.includes(" can ensure ") ||
    normalized.includes(" help it realize ");

  return (
    (hasRecoveryStart || hasGenericContinuation) &&
    containsAny(tokens, RECOVERY_TERMS) &&
    !hasDigit(text) &&
    !text.includes(":")
  );
}

const rule = oneToOneRule({
  detect: (unit) => {
    const sentences = splitSentences(unit.text);
    for (let index = 0; index < sentences.length; index += 1) {
      const challenge = sentences[index];
      if (challenge === undefined || !isFormulaicChallenge(challenge.text)) {
        continue;
      }

      const recovery = sentences
        .slice(index + 1, index + 5)
        .find((sentence) => isFormulaicRecovery(sentence.text));
      if (recovery === undefined) {
        continue;
      }

      return [
        {
          evidence: unit.text.slice(challenge.start, recovery.end),
          label: "formulaic-challenge-conclusion",
          range: { end: recovery.end, start: challenge.start }
        }
      ];
    }

    return [];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Formulaic challenge conclusion found: "${report.evidence}". Name the limitation and the response instead of staging generic adversity and optimism.`,
  ruleId: "syntactic-patterns:formulaic-challenges",
  unitKind: "paragraph"
});

export default rule;
