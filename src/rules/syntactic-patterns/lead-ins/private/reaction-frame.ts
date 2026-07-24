const REACTION_NOUNS = new Set(["detail", "part", "piece", "point", "thing"]);
const REACTION_VERBS = new Set(["got", "hit", "stuck", "surprised"]);

export function matchReactionFrame(
  words: readonly string[]
): string | undefined {
  const contracted = words[0] === "here's";
  const start =
    contracted || (words[0] === "here" && words[1] === "is")
      ? contracted
        ? 1
        : 2
      : -1;

  if (
    start < 0 ||
    words[start] !== "the" ||
    !REACTION_NOUNS.has(words[start + 1] ?? "") ||
    words[start + 2] !== "that"
  ) {
    return undefined;
  }

  const verb = words[start + 3];
  const directReaction =
    verb !== "stuck" &&
    REACTION_VERBS.has(verb ?? "") &&
    ["me", "us"].includes(words[start + 4] ?? "") &&
    words.length === start + 5;
  const stuckReaction =
    verb === "stuck" &&
    words[start + 4] === "with" &&
    ["me", "us"].includes(words[start + 5] ?? "") &&
    words.length === start + 6;

  return directReaction || stuckReaction
    ? "here-is-the-reaction-frame"
    : undefined;
}
