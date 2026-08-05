import { wordTokens } from "../../../../shared/text/tokens.js";

const INVERTED_LEADS = new Set(["here", "there"]);
const EXPLICIT_SUBJECTS = new Set([
  "he",
  "i",
  "it",
  "let's",
  "she",
  "they",
  "we",
  "you"
]);
const BASE_ACTION_PREDICATES = new Set([
  "answer",
  "ask",
  "call",
  "check",
  "choose",
  "climb",
  "close",
  "compare",
  "consider",
  "count",
  "cross",
  "crouch",
  "examine",
  "face",
  "follow",
  "gaze",
  "glance",
  "hear",
  "inspect",
  "lead",
  "list",
  "listen",
  "look",
  "move",
  "notice",
  "observe",
  "open",
  "pick",
  "point",
  "pull",
  "reach",
  "read",
  "rest",
  "review",
  "run",
  "scan",
  "search",
  "see",
  "shift",
  "stare",
  "step",
  "study",
  "sweep",
  "take",
  "track",
  "turn",
  "walk",
  "watch"
]);
const INVERTED_PREDICATES = new Set([
  "came",
  "come",
  "comes",
  "go",
  "goes",
  "lay",
  "lies",
  "remain",
  "remains",
  "sat",
  "sits",
  "stand",
  "stands",
  "stood",
  "went"
]);

const INTRODUCED_COMMANDS = new Set([
  "accept",
  "add",
  "build",
  "call",
  "check",
  "choose",
  "compare",
  "continue",
  "create",
  "cut",
  "drop",
  "feed",
  "find",
  "flow",
  "follow",
  "get",
  "give",
  "go",
  "hold",
  "keep",
  "leave",
  "let",
  "look",
  "make",
  "move",
  "notice",
  "pick",
  "read",
  "reduce",
  "run",
  "show",
  "start",
  "stop",
  "take",
  "think",
  "try",
  "use",
  "watch",
  "write"
]);

function hasIntroducedCommand(text: string): boolean {
  const separator = Math.max(text.lastIndexOf(","), text.lastIndexOf(":"));
  if (separator < 0) {
    return false;
  }

  const suffix = wordTokens(text.slice(separator + 1)).map(
    (token) => token.normalized
  );
  return suffix.length >= 2 && INTRODUCED_COMMANDS.has(suffix[0] ?? "");
}

function hasInvertedPredicate(words: readonly string[]): boolean {
  return (
    INVERTED_LEADS.has(words[0] ?? "") &&
    INVERTED_PREDICATES.has(words[1] ?? "")
  );
}

function isRomanNumeral(word: string): boolean {
  if (word.length === 0) {
    return false;
  }

  for (const character of word) {
    if (!"ivxlcdm".includes(character)) {
      return false;
    }
  }

  return true;
}

function isFlattenedChapterIndex(text: string): boolean {
  const words = wordTokens(text).map((token) => token.normalized);
  const numeral = words.at(-1) ?? "";
  return words.at(-2) === "chapter" && isRomanNumeral(numeral);
}

export function isBaseActionPredicate(word: string): boolean {
  return BASE_ACTION_PREDICATES.has(word);
}

export function hasExplicitSubject(words: readonly string[]): boolean {
  return words.some((word) => EXPLICIT_SUBJECTS.has(word));
}

export function looksLikeCompleteContinuation(
  text: string,
  words: readonly string[]
): boolean {
  return (
    hasIntroducedCommand(text) ||
    hasInvertedPredicate(words) ||
    isFlattenedChapterIndex(text)
  );
}
