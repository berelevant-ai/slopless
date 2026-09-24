import {
  cleanSentence,
  tokens
} from "../../../shared/matchers/prose-patterns.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const PREFIXES = ["and ", "but ", "so ", "because "];
const EMPHASIS_REFERENTS = [
  "part",
  "bit",
  "detail",
  "piece",
  "moment",
  "step",
  "distinction",
  "difference"
];
const EMPHASIS_QUALIFIERS = [
  "last",
  "first",
  "main",
  "small",
  "little",
  "one",
  "second",
  "final",
  "next"
];
const EMPHASIS_ADVERBS = [
  "really",
  "still",
  "also",
  "actually",
  "truly",
  "always"
];
const EMPHASIS_VERBS = ["matters", "counts", "sticks", "lands", "mattered"];
const WEAKENING_REFERENTS = ["pattern", "cycle", "loop", "habit", "story"];
const EMPTY_VIRTUE_LABELS = [
  "discipline",
  "patience",
  "leverage",
  "craft",
  "judgment",
  "taste",
  "focus",
  "trust",
  "clarity",
  "courage",
  "maturity",
  "ownership",
  "rigor",
  "restraint",
  "growth",
  "progress",
  "leadership"
];

function isDeictic(token: string | undefined): boolean {
  return token === "that" || token === "this";
}

// "That part matters." / "That last bit really matters." / "This one detail
// still counts.": deictic, optional qualifier, referent, optional adverb,
// emphatic verb, end of sentence.
function matchesReferentMatters(words: readonly string[]): boolean {
  let index = 0;
  if (!isDeictic(words[index])) {
    return false;
  }
  index += 1;
  if (EMPHASIS_QUALIFIERS.includes(words[index] ?? "")) {
    index += 1;
  }
  if (!EMPHASIS_REFERENTS.includes(words[index] ?? "")) {
    return false;
  }
  index += 1;
  while (EMPHASIS_ADVERBS.includes(words[index] ?? "")) {
    index += 1;
  }
  return (
    EMPHASIS_VERBS.includes(words[index] ?? "") && words.length === index + 1
  );
}

function matchesPartMatters(words: readonly string[]): boolean {
  const [first, second, third, fourth, fifth, sixth] = words;

  return (
    matchesReferentMatters(words) ||
    (words.length === 6 &&
      isDeictic(first) &&
      second === "one" &&
      third === "change" &&
      fourth === "helped" &&
      fifth === "a" &&
      sixth === "lot")
  );
}

function matchDeicticIsFrame(words: readonly string[]): string | undefined {
  const [first, second, third, fourth, fifth, sixth] = words;
  const startsWithDeicticIs = isDeictic(first) && second === "is";

  if (
    startsWithDeicticIs &&
    third === "telling" &&
    (fourth === "you" || fourth === "us") &&
    fifth === "something"
  ) {
    return "deictic-telling-you-something";
  }

  if (
    words.length === 5 &&
    startsWithDeicticIs &&
    third === "still" &&
    fourth === "real" &&
    fifth === "change"
  ) {
    return "deictic-real-change";
  }

  if (
    words.length === 6 &&
    startsWithDeicticIs &&
    third === "how" &&
    fourth === "the" &&
    fifth !== undefined &&
    WEAKENING_REFERENTS.includes(fifth) &&
    sixth === "weakens"
  ) {
    return "deictic-pattern-weakens";
  }

  if (
    words.length === 3 &&
    startsWithDeicticIs &&
    third !== undefined &&
    EMPTY_VIRTUE_LABELS.includes(third)
  ) {
    return "deictic-empty-virtue-label";
  }

  return undefined;
}

function matchWhatHelpsFrame(words: readonly string[]): string | undefined {
  const [first, second, third, fourth, fifth] = words;

  if (
    words.length === 5 &&
    first === "what" &&
    second === "helps" &&
    third === "is" &&
    fourth === "not" &&
    fifth === "brilliant"
  ) {
    return "what-helps-not-brilliant";
  }

  return undefined;
}

function matchEmptyEmphasis(sentence: string): string | undefined {
  const words = tokens(cleanSentence(sentence, PREFIXES));

  if (matchesPartMatters(words)) {
    return words.length === 6
      ? "deictic-change-helped"
      : "deictic-part-matters";
  }

  return matchDeicticIsFrame(words) ?? matchWhatHelpsFrame(words);
}

const rule = oneToOneRule({
  detect: (unit) => {
    const matched = matchEmptyEmphasis(unit.text);
    if (matched === undefined) {
      return [];
    }

    return [
      {
        evidence: matched,
        label: matched,
        range: { start: 0, end: unit.text.length }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Empty emphasis found: ${report.evidence}. Replace the filler line with the actual point.`,
  ruleId: "syntactic-patterns:empty-emphasis",
  unitKind: "sentence"
});

export default rule;
