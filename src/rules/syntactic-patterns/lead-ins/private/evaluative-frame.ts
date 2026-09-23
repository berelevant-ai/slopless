import { FRAME_ADJECTIVES, FRAME_NOUNS } from "./discourse-evaluation.js";

// "The real question is ...", "A better question here is ...", "The right
// answers are ...": determiner, evaluative adjective, frame noun (singular or
// plural), optional locator, linking verb.
const FRAME_DETERMINERS = new Set([
  "a",
  "an",
  "the",
  "this",
  "that",
  "my",
  "our",
  "your"
]);
const FRAME_LOCATORS: readonly (readonly string[])[] = [
  ["here"],
  ["there"],
  ["now"],
  ["for", "me"],
  ["for", "us"],
  ["for", "you"],
  ["in", "practice"]
];
const FRAME_LINKING_VERBS = new Set([
  "is",
  "are",
  "was",
  "were",
  "isn't",
  "becomes",
  "remains"
]);

function frameNoun(word: string | undefined): string | undefined {
  if (word === undefined) {
    return undefined;
  }
  if (FRAME_NOUNS.has(word)) {
    return word;
  }
  const singular = word.endsWith("s") ? word.slice(0, -1) : undefined;
  return singular !== undefined && FRAME_NOUNS.has(singular)
    ? singular
    : undefined;
}

export function matchEvaluativeFrame(
  words: readonly string[]
): string | undefined {
  const [first, adjective] = words;
  const noun = frameNoun(words[2]);
  if (
    first === undefined ||
    adjective === undefined ||
    noun === undefined ||
    !FRAME_DETERMINERS.has(first) ||
    !FRAME_ADJECTIVES.has(adjective)
  ) {
    return undefined;
  }

  const locator = FRAME_LOCATORS.find((candidate) =>
    candidate.every((word, offset) => words[3 + offset] === word)
  );
  const verb = words[3 + (locator?.length ?? 0)];
  return verb !== undefined && FRAME_LINKING_VERBS.has(verb)
    ? `the-${adjective}-${noun}-${verb}`
    : undefined;
}
