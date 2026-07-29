import { findUnquotedWordTokens } from "../../../shared/matchers/phrases.js";
import type { SemanticThinnessMatch } from "./pattern-matcher.js";

const EXCLUDED_SUBJECTS = new Set([
  "arrow",
  "equation",
  "figure",
  "marker",
  "pointer",
  "table"
]);
const SIGNAL_VERBS = new Set([
  "constitute",
  "constitutes",
  "mark",
  "marks",
  "represent",
  "represents",
  "signal",
  "signals"
]);
const SIGNIFICANCE_ADJECTIVES = new Set([
  "defining",
  "historic",
  "important",
  "key",
  "major",
  "meaningful",
  "notable",
  "pivotal",
  "profound",
  "significant",
  "transformative"
]);
const CHANGE_NOUNS = new Set([
  "chapter",
  "development",
  "evolution",
  "milestone",
  "moment",
  "movement",
  "shift",
  "stage",
  "transition",
  "trend"
]);
const IMPORTANCE_VERBS = new Set([
  "demonstrate",
  "demonstrates",
  "emphasize",
  "emphasizes",
  "highlight",
  "highlights",
  "illustrate",
  "illustrates",
  "reinforce",
  "reinforces",
  "reflect",
  "reflects",
  "underscore",
  "underscores"
]);
const IMPORTANCE_MODIFIERS = new Set([
  "continued",
  "crucial",
  "cultural",
  "enduring",
  "growing",
  "historic",
  "historical",
  "key",
  "lasting",
  "profound",
  "significant",
  "vital"
]);
const IMPORTANCE_NOUNS = new Set([
  "impact",
  "importance",
  "influence",
  "legacy",
  "need",
  "potential",
  "power",
  "relevance",
  "role",
  "significance",
  "value"
]);
const CONNECTION_VERBS = new Set([
  "mark",
  "marks",
  "reflect",
  "reflects",
  "represent",
  "represents",
  "signal",
  "signals"
]);
const BROAD_MODIFIERS = new Set(["broader", "larger", "wider"]);
const MOVEMENT_NOUNS = new Set([
  "change",
  "conversation",
  "debate",
  "evolution",
  "landscape",
  "movement",
  "shift",
  "transformation",
  "transition",
  "trend"
]);
const SYMBOL_MODIFIERS = new Set([
  "compelling",
  "enduring",
  "important",
  "lasting",
  "powerful",
  "stark",
  "timely",
  "vivid"
]);
const SYMBOL_NOUNS = new Set(["beacon", "reminder", "symbol", "testament"]);
const FOCUS_MODIFIERS = new Set([
  "central",
  "enduring",
  "important",
  "key",
  "lasting",
  "major",
  "vital"
]);
const ROOTED_TARGETS = new Set([
  "community",
  "culture",
  "heritage",
  "history",
  "identity",
  "tradition",
  "traditions",
  "values"
]);

function skipDeterminer(words: readonly string[], index: number): number {
  return ["a", "an", "the"].includes(words[index] ?? "") ? index + 1 : index;
}

function matchSignificantChange(words: readonly string[]): boolean {
  return words.some((word, index) => {
    if (!SIGNAL_VERBS.has(word)) {
      return false;
    }
    const adjectiveIndex = skipDeterminer(words, index + 1);
    const nounIndex = adjectiveIndex + 1;
    return (
      SIGNIFICANCE_ADJECTIVES.has(words[adjectiveIndex] ?? "") &&
      (CHANGE_NOUNS.has(words[nounIndex] ?? "") ||
        (words[nounIndex] === "turning" && words[nounIndex + 1] === "point"))
    );
  });
}

function matchImportance(words: readonly string[]): boolean {
  return words.some((word, index) => {
    if (!IMPORTANCE_VERBS.has(word)) {
      return false;
    }
    return words.slice(index + 1, index + 8).some((candidate, offset) => {
      if (!IMPORTANCE_NOUNS.has(candidate)) {
        return false;
      }
      const nounIndex = index + 1 + offset;
      return (
        offset <= 1 || IMPORTANCE_MODIFIERS.has(words[nounIndex - 1] ?? "")
      );
    });
  });
}

function connectionLength(words: readonly string[], index: number): number {
  if (CONNECTION_VERBS.has(words[index] ?? "")) {
    return 1;
  }
  if (
    ["contribute", "contributes"].includes(words[index] ?? "") &&
    words[index + 1] === "to"
  ) {
    return 2;
  }
  if (
    ["form", "forms"].includes(words[index] ?? "") &&
    words[index + 1] === "part" &&
    words[index + 2] === "of"
  ) {
    return 3;
  }
  return 0;
}

function matchBroaderMovement(words: readonly string[]): boolean {
  return words.some((_, index) => {
    const length = connectionLength(words, index);
    if (length === 0) {
      return false;
    }
    const modifierIndex = skipDeterminer(words, index + length);
    return (
      BROAD_MODIFIERS.has(words[modifierIndex] ?? "") &&
      MOVEMENT_NOUNS.has(words[modifierIndex + 1] ?? "")
    );
  });
}

function matchShapingMovement(words: readonly string[]): boolean {
  return words.some((word, index) => {
    if (!["shape", "shaped", "shapes", "shaping"].includes(word)) {
      return false;
    }
    let nounIndex = skipDeterminer(words, index + 1);
    if (
      [
        "broader",
        "cultural",
        "emerging",
        "evolving",
        "future",
        "global",
        "modern",
        "regional",
        "social"
      ].includes(words[nounIndex] ?? "")
    ) {
      nounIndex += 1;
    }
    return MOVEMENT_NOUNS.has(words[nounIndex] ?? "");
  });
}

function matchAbstractRoots(words: readonly string[]): boolean {
  return words.some((word, index) => {
    if (
      word !== "deeply" ||
      words[index + 1] !== "rooted" ||
      words[index + 2] !== "in"
    ) {
      return false;
    }
    let targetIndex = index + 3;
    if (
      ["cultural", "historical", "local", "shared", "social"].includes(
        words[targetIndex] ?? ""
      )
    ) {
      targetIndex += 1;
    }
    return ROOTED_TARGETS.has(words[targetIndex] ?? "");
  });
}

function matchStageSetting(words: readonly string[]): boolean {
  const index = words.findIndex(
    (word, position) =>
      ["set", "sets"].includes(word) &&
      words[position + 1] === "the" &&
      words[position + 2] === "stage" &&
      words[position + 3] === "for"
  );
  if (index < 0) {
    return false;
  }

  let modifierIndex = skipDeterminer(words, index + 4);
  return [
    "broader",
    "important",
    "major",
    "new",
    "next",
    "significant",
    "transformative"
  ].includes(words[modifierIndex] ?? "");
}

function matchIndelibleMark(words: readonly string[]): boolean {
  return words.some(
    (word, index) =>
      ["leave", "leaves", "left", "made"].includes(word) &&
      ["a", "an"].includes(words[index + 1] ?? "") &&
      ["enduring", "indelible", "lasting", "significant"].includes(
        words[index + 2] ?? ""
      ) &&
      words[index + 3] === "mark" &&
      words[index + 4] === "on"
  );
}

function matchSymbol(words: readonly string[]): boolean {
  return words.some((word, index) => {
    if (!["serve", "serves", "stand", "stands"].includes(word)) {
      return false;
    }
    let nounIndex = index + 1;
    if (words[nounIndex] !== "as") {
      return false;
    }
    nounIndex = skipDeterminer(words, nounIndex + 1);
    if (SYMBOL_MODIFIERS.has(words[nounIndex] ?? "")) {
      nounIndex += 1;
    }
    return (
      SYMBOL_NOUNS.has(words[nounIndex] ?? "") &&
      ["of", "to"].includes(words[nounIndex + 1] ?? "")
    );
  });
}

function matchFocalPoint(words: readonly string[]): boolean {
  return words.some((word, index) => {
    if (!["became", "is", "remain", "remains"].includes(word)) {
      return false;
    }
    let focusIndex = skipDeterminer(words, index + 1);
    if (FOCUS_MODIFIERS.has(words[focusIndex] ?? "")) {
      focusIndex += 1;
    }
    return (
      words[focusIndex] === "focal" &&
      words[focusIndex + 1] === "point" &&
      ["for", "in", "of"].includes(words[focusIndex + 2] ?? "")
    );
  });
}

export function findBroadSignificanceMatch(
  text: string
): SemanticThinnessMatch | undefined {
  const words = findUnquotedWordTokens(text).map((token) => token.normalized);
  if (EXCLUDED_SUBJECTS.has(words[0] ?? "")) {
    return undefined;
  }

  const matched = [
    [matchSignificantChange, "{subject} marks a significant {changeNoun}"],
    [
      matchImportance,
      "{subject} highlights the {importanceModifier} {importanceNoun}"
    ],
    [matchBroaderMovement, "{subject} contributes to a broader {movementNoun}"],
    [matchShapingMovement, "{subject} shapes the {movementNoun}"],
    [matchAbstractRoots, "{subject} is deeply rooted in {abstractRoot}"],
    [matchStageSetting, "{subject} sets the stage for a {futureModifier}"],
    [matchIndelibleMark, "{subject} leaves an indelible mark on"],
    [matchSymbol, "{subject} serves as a {symbolModifier} {symbolNoun}"],
    [matchFocalPoint, "{subject} remains a {focusModifier} focal point"]
  ] as const;
  const result = matched.find(([matcher]) => matcher(words));
  if (result === undefined) {
    return undefined;
  }

  return {
    patternClass: "significance",
    patternId: "hollow-significance",
    purpose:
      "Catch broad importance, legacy, trend, and turning-point claims that replace a concrete result.",
    signal: result[1]
  };
}
