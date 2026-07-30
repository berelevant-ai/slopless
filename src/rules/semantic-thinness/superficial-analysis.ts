import { wordTokens, type Token } from "../../shared/text/tokens.js";
import { isWhitespace } from "../../shared/text/whitespace.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";

const RHETORICAL_VERBS = new Set([
  "aligning",
  "confirming",
  "contributing",
  "creating",
  "cultivating",
  "demonstrating",
  "driving",
  "embodying",
  "emphasizing",
  "encompassing",
  "enhancing",
  "ensuring",
  "evoking",
  "facilitating",
  "fostering",
  "highlighting",
  "illustrating",
  "marking",
  "offering",
  "reflecting",
  "reinforcing",
  "resonating",
  "shaping",
  "showcasing",
  "signaling",
  "symbolizing",
  "underscoring"
]);

const ABSTRACT_TARGETS = new Set([
  "alignment",
  "authenticity",
  "beauty",
  "change",
  "cohesion",
  "collaboration",
  "commitment",
  "connection",
  "creativity",
  "culture",
  "dedication",
  "development",
  "diversity",
  "engagement",
  "excellence",
  "experience",
  "evolution",
  "future",
  "growth",
  "heritage",
  "identity",
  "impact",
  "importance",
  "inclusion",
  "influence",
  "innovation",
  "legacy",
  "movement",
  "moment",
  "momentum",
  "notability",
  "opportunity",
  "potential",
  "progress",
  "purpose",
  "recognition",
  "relevance",
  "resilience",
  "role",
  "shift",
  "significance",
  "simplicity",
  "solidarity",
  "success",
  "sustainability",
  "transformation",
  "trend",
  "unity",
  "value",
  "vision"
]);

const EVALUATIVE_MODIFIERS = new Set([
  "broader",
  "collective",
  "continued",
  "cultural",
  "deep",
  "diverse",
  "dynamic",
  "enduring",
  "evolving",
  "fundamental",
  "growing",
  "historic",
  "historical",
  "inclusive",
  "innovative",
  "key",
  "lasting",
  "meaningful",
  "ongoing",
  "pivotal",
  "profound",
  "regional",
  "rich",
  "shared",
  "significant",
  "social",
  "sustainable",
  "transformative",
  "unique",
  "vital"
]);

function separatorBefore(text: string, start: number): number | undefined {
  let index = start - 1;
  while (index >= 0 && isWhitespace(text[index] ?? "")) {
    index -= 1;
  }

  const character = text[index];
  return character === "," || character === ";" ? index : undefined;
}

function isAbstractConclusion(tokens: readonly Token[]): boolean {
  const words = tokens.map((token) => token.normalized);
  return (
    words.some((word) => ABSTRACT_TARGETS.has(word)) &&
    (words.some((word) => EVALUATIVE_MODIFIERS.has(word)) ||
      words.includes("commitment") ||
      words.includes("dedication") ||
      words.includes("impact") ||
      words.includes("importance") ||
      words.includes("influence") ||
      words.includes("future") ||
      words.includes("relevance") ||
      words.includes("significance"))
  );
}

const rule = oneToOneRule({
  detect: (unit) => {
    const tokens = wordTokens(unit.text);
    for (const [index, token] of tokens.entries()) {
      if (!RHETORICAL_VERBS.has(token.normalized)) {
        continue;
      }

      const separator = separatorBefore(unit.text, token.start);
      if (
        separator === undefined ||
        !isAbstractConclusion(tokens.slice(index))
      ) {
        continue;
      }

      return [
        {
          evidence: unit.text.slice(separator, unit.text.length),
          label: token.normalized,
          range: { end: unit.text.length, start: separator }
        }
      ];
    }

    return [];
  },
  family: "semantic-thinness",
  formatMessage: (report) =>
    `Superficial trailing analysis found: "${report.evidence}". Remove the appended significance claim or state evidence for it.`,
  ruleId: "semantic-thinness:superficial-analysis",
  unitKind: "sentence"
});

export default rule;
