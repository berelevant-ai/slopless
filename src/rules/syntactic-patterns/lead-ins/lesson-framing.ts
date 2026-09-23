import { hasConcreteImplementationSummary } from "../../../shared/matchers/concrete-evidence.js";
import {
  cleanSentence,
  tokens,
  type SentenceMatch
} from "../../../shared/matchers/prose-patterns.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

// "The lesson here is clear." / "The biggest fix was surprisingly boring." /
// "The takeaway for me remains simple." The wrapper announces that a lesson
// exists and grades it instead of stating it. Grammar:
//   the [modifier]{0,2} {frame noun} [locator] {linking verb} [adverb]{0,2}
//   [not] {thin cue} ...
// The cue may continue ("smaller than it looks", "plain after the failed
// import"); the concrete-implementation guard handles specific tails, and a
// "because" clause right after the cue states the reason, so it is not a
// wrapper ("The rule is boring because each clause repeats the same sentence.").
const PREFIXES = ["and ", "but ", "so ", "however, "];
const FRAME_NOUNS = new Set([
  "answer",
  "conclusion",
  "fix",
  "insight",
  "lesson",
  "lessons",
  "message",
  "move",
  "point",
  "rule",
  "solution",
  "strategy",
  "takeaway",
  "takeaways",
  "trick",
  "truth"
]);
const FRAME_MODIFIERS = new Set([
  "big",
  "bigger",
  "biggest",
  "core",
  "first",
  "hard",
  "hardest",
  "honest",
  "important",
  "key",
  "main",
  "obvious",
  "only",
  "practical",
  "real",
  "simple",
  "useful"
]);
const LOCATORS: readonly (readonly string[])[] = [
  ["here"],
  ["there"],
  ["for", "me"],
  ["for", "us"],
  ["for", "them"],
  ["in", "practice"],
  ["from", "this"],
  ["from", "that"],
  ["from", "all", "this"]
];
const LINKING_VERBS = new Set([
  "became",
  "becomes",
  "is",
  "remains",
  "seems",
  "stays",
  "turned",
  "turns",
  "was"
]);
const REASON_CONNECTORS = new Set(["because", "since"]);
const LINK_ADVERBS = new Set([
  "almost",
  "always",
  "fairly",
  "mostly",
  "often",
  "pretty",
  "quite",
  "rather",
  "really",
  "surprisingly",
  "usually",
  "very"
]);
const THIN_CUES: readonly (readonly string[])[] = [
  ["boring"],
  ["clear"],
  ["dull"],
  ["easy"],
  ["modest"],
  ["mundane"],
  ["obvious"],
  ["plain"],
  ["short"],
  ["simple"],
  ["simpler"],
  ["small"],
  ["smaller"],
  ["straightforward"],
  ["unglamorous"],
  ["not", "complicated"],
  ["not", "dramatic"],
  ["not", "exciting"],
  ["not", "glamorous"],
  ["not", "heroic"],
  ["not", "magic"],
  ["not", "new"],
  ["not", "what", "you", "think"],
  ["usually", "smaller", "than", "people", "want"]
];

function skipWhile(
  words: readonly string[],
  start: number,
  allowed: ReadonlySet<string>,
  max: number
): number {
  let index = start;
  while (index - start < max && allowed.has(words[index] ?? "")) {
    index += 1;
  }
  return index;
}

function skipLocator(words: readonly string[], start: number): number {
  const locator = LOCATORS.find((candidate) =>
    candidate.every((word, offset) => words[start + offset] === word)
  );
  return locator === undefined ? start : start + locator.length;
}

function cueAt(words: readonly string[], start: number): string | undefined {
  const cue = THIN_CUES.find((candidate) =>
    candidate.every((word, offset) => words[start + offset] === word)
  );
  return cue === undefined ? undefined : cue.join("-");
}

function matchSummaryFrame(text: string): string | undefined {
  const words = tokens(text);
  if (words[0] !== "the") {
    return undefined;
  }

  const nounIndex = skipWhile(words, 1, FRAME_MODIFIERS, 2);
  const noun = words[nounIndex];
  if (noun === undefined || !FRAME_NOUNS.has(noun)) {
    return undefined;
  }

  const verbIndex = skipLocator(words, nounIndex + 1);
  const verb = words[verbIndex];
  if (verb === undefined || !LINKING_VERBS.has(verb)) {
    return undefined;
  }

  const cueIndex = skipWhile(words, verbIndex + 1, LINK_ADVERBS, 2);
  const cue = cueAt(words, cueIndex);
  if (cue === undefined) {
    return undefined;
  }

  const afterCue = words[cueIndex + cue.split("-").length] ?? "";
  return REASON_CONNECTORS.has(afterCue)
    ? undefined
    : `the-${noun}-${verb}-${cue}`;
}

function matchLessonFraming(sentence: string): SentenceMatch | undefined {
  const stripped = cleanSentence(sentence, PREFIXES);
  if (hasConcreteImplementationSummary(stripped)) {
    return undefined;
  }

  const summary = matchSummaryFrame(stripped);
  if (summary !== undefined) {
    return { kind: "summary-frame", signal: summary };
  }

  if (stripped.startsWith("the lesson here is ")) {
    return { kind: "lesson-here", signal: "the lesson here is" };
  }

  return undefined;
}

const rule = oneToOneRule({
  detect: (unit) => {
    const matched = matchLessonFraming(unit.text);
    if (matched === undefined) {
      return [];
    }

    return [
      {
        evidence: matched.signal,
        label: matched.kind,
        range: { start: 0, end: unit.text.length }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Lesson framing found: ${report.evidence}. Replace the wrapper with the lesson.`,
  ruleId: "syntactic-patterns:lesson-framing",
  unitKind: "sentence"
});

export default rule;
