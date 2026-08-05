import { hasConcreteCausalSummary } from "../../../shared/matchers/concrete-evidence.js";
import { cleanSentence } from "../../../shared/matchers/prose-patterns.js";
import { wordTokens } from "../../../shared/text/tokens.js";
import pattern from "../patterns/solution-boring-frame.json" with { type: "json" };
import { shouldRejectConcreteEvidence } from "./concrete-guards.js";
import type { SemanticThinnessMatch } from "./pattern-matcher.js";

const DETERMINERS = new Set(["that", "the", "this"]);
const SCOPE_LEADS = new Set([
  "about",
  "across",
  "among",
  "behind",
  "beneath",
  "beyond",
  "for",
  "from",
  "in",
  "of",
  "on",
  "over",
  "that",
  "through",
  "to",
  "under",
  "within",
  "without"
]);
const REJECT_TOKENS = new Set([
  "because",
  "therefore",
  "unless",
  "when",
  "whenever",
  "whereas",
  "which",
  "while"
]);
const LINKING_VERBS = new Set(pattern.slots.linkingVerb);
const SOLUTION_NOUNS = new Set(pattern.slots.solutionNoun);
const SOLUTION_QUALIFIERS = new Set(pattern.slots.solutionQualifier);

function findSolutionNoun(
  words: readonly string[],
  linkingVerbIndex: number
): number | undefined {
  let index = 1;
  while (
    index < linkingVerbIndex &&
    SOLUTION_QUALIFIERS.has(words[index] ?? "")
  ) {
    index += 1;
  }

  return SOLUTION_NOUNS.has(words[index] ?? "") ? index : undefined;
}

export function findExpandedSolutionBoringMatch(
  text: string
): SemanticThinnessMatch | undefined {
  const cleaned = cleanSentence(text, ["and ", "but ", "so "]);
  const tokens = wordTokens(cleaned);
  const words = tokens.map((token) => token.normalized);
  const boringIndex = words.indexOf("boring");
  const linkingVerbIndex = boringIndex - 1;

  if (
    tokens.length > pattern.maxTokens ||
    !DETERMINERS.has(words[0] ?? "") ||
    boringIndex < 4 ||
    !LINKING_VERBS.has(words[linkingVerbIndex] ?? "") ||
    tokens.some((token) => REJECT_TOKENS.has(token.normalized)) ||
    shouldRejectConcreteEvidence(cleaned, tokens) ||
    hasConcreteCausalSummary(cleaned)
  ) {
    return undefined;
  }

  const nounIndex = findSolutionNoun(words, linkingVerbIndex);
  if (nounIndex === undefined) {
    return undefined;
  }

  const scopeLength = linkingVerbIndex - nounIndex - 1;
  if (
    scopeLength < 1 ||
    scopeLength > 6 ||
    !SCOPE_LEADS.has(words[nounIndex + 1] ?? "")
  ) {
    return undefined;
  }

  return {
    patternClass: pattern.class,
    patternId: pattern.id,
    purpose: pattern.purpose,
    signal: "the {qualifiedSolutionNoun} {scopePhrase} {linkingVerb} boring"
  };
}
