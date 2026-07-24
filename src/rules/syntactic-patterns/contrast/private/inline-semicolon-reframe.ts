import { wordTokens } from "../../../../shared/text/tokens.js";
import {
  findCopularNegation,
  pronounCopulaStart,
  words
} from "./negation-reframe-parts.js";

const EVALUATIVE_PREDICATES = new Set([
  "bad",
  "broken",
  "empty",
  "incomplete",
  "messy",
  "sloppy",
  "untidy",
  "useless"
]);
const IDENTITY_METAPHOR_HEADS = new Set([
  "barrier",
  "bottleneck",
  "bridge",
  "dead-end",
  "door",
  "gate",
  "market",
  "shelf",
  "wall",
  "window"
]);
const IDENTITY_DETERMINERS = new Set(["a", "an", "the"]);

function startsWithIdentityMetaphor(text: string): boolean {
  const tokens = wordTokens(text);
  const copula = pronounCopulaStart(tokens);
  if (copula === undefined) {
    return false;
  }

  const predicate = words(tokens).slice(copula.predicateStart);
  const headIndex = IDENTITY_DETERMINERS.has(predicate[0] ?? "") ? 1 : 0;
  return IDENTITY_METAPHOR_HEADS.has(predicate[headIndex] ?? "");
}

export function matchesInlineSemicolonReframe(text: string): boolean {
  const clauses = text.split(";");
  if (clauses.length !== 2) {
    return false;
  }

  const firstTokens = wordTokens(clauses[0] ?? "");
  const negation = findCopularNegation(firstTokens);
  if (negation === undefined) {
    return false;
  }

  const predicate = words(firstTokens).slice(negation.negatedPredicateStart);
  return (
    predicate.some((word) => EVALUATIVE_PREDICATES.has(word)) &&
    startsWithIdentityMetaphor(clauses[1] ?? "")
  );
}
