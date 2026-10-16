import {
  findUnquotedTokenTemplateMatches,
  type TokenTemplatePattern,
  type TokenTemplateMatch
} from "../../../../shared/matchers/phrases.js";
import { wordTokens } from "../../../../shared/text/tokens.js";
import type { LocalDetection } from "../../../private/textlint-rule-builders.js";

export function frameMatches(
  text: string,
  patterns: readonly TokenTemplatePattern[]
): readonly TokenTemplateMatch[] {
  return findUnquotedTokenTemplateMatches(text, patterns).filter((match) => {
    const words = wordTokens(match.text);
    return words.every((word, index) => {
      const previous = words[index - 1];
      const gap = match.text.slice(previous?.end ?? 0, word.start);
      return [...gap].every(
        (character) => character.trim() === "" || character === "-"
      );
    });
  });
}

export function frameDetection(
  text: string,
  start: number,
  end: number,
  label: string
): LocalDetection {
  return {
    evidence: text.slice(start, end),
    label,
    range: { start, end }
  };
}

export function clauseEndsAfter(text: string, end: number): boolean {
  const next = text.slice(end).trimStart().at(0);
  return next === undefined || [".", ",", ";", ":", "!", "?"].includes(next);
}
