import { wordTokens } from "../../../../shared/text/tokens.js";

// "The model is the writer." is emphasis; "The liver is the largest solid
// organ in the human body." is a statement, so the first predicate clause is
// capped unless the subject is a discourse noun ("The bottom line is that
// the process shows meaningful progress.").
export const MAX_DEFINITE_PREDICATE_WORDS = 5;
export const DISCOURSE_SUBJECT_HEADS = new Set([
  "answer",
  "fact",
  "lesson",
  "line",
  "point",
  "problem",
  "question",
  "takeaway",
  "truth"
]);
const CLAUSE_BREAKS = new Set(["-", ";", ","]);

export function firstPredicateLength(
  text: string,
  tokens: readonly string[],
  copulaIndex: number
): number {
  const predicate = tokens.slice(copulaIndex + 1);
  const copulaWord = tokens[copulaIndex];
  const copula = wordTokens(text).find(
    (token) => token.normalized === copulaWord
  );
  const rest = copula === undefined ? text : text.slice(copula.end);
  const breakAt = [...rest].findIndex((character) =>
    CLAUSE_BREAKS.has(character)
  );
  return breakAt < 0
    ? predicate.length
    : wordTokens(rest.slice(0, breakAt)).length;
}

// "The Stripe dashboard is the product.": a proper noun inside the subject
// names a thing, so it is a statement, not emphasis.
export function hasInnerProperNoun(text: string): boolean {
  return wordTokens(text).some(
    (token, index) =>
      index > 0 &&
      token.text !== "I" &&
      token.text[0] !== undefined &&
      token.text[0] >= "A" &&
      token.text[0] <= "Z" &&
      token.text[1] !== undefined &&
      token.text[1] >= "a" &&
      token.text[1] <= "z"
  );
}
