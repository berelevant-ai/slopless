import {
  cleanSentence,
  tokens,
  tokensContainInOrder
} from "../../../shared/matchers/prose-patterns.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const PREFIXES = ["however, ", "but ", "and ", "so ", "that being said, "];
const VAGUE_INTROS = [
  "some",
  "common",
  "certain",
  "several",
  "following",
  "many",
  "key",
  "main"
];
const CATEGORY_WORDS = [
  "examples",
  "types",
  "reasons",
  "factors",
  "foods",
  "triggers",
  "ways",
  "steps",
  "sections",
  "parts",
  "points",
  "things"
];
const PREVIEW_OBJECTS = [
  "sections",
  "section",
  "parts",
  "part",
  "pages",
  "page"
];
const PREVIEW_VERBS = ["explore", "discuss", "examine", "cover"];
const REASON_STARTERS = ["reason", "factor", "point", "thing"];
const ORDINAL_STARTERS = ["one", "another"];
// Sentence-initial filler that advertises honesty or clears the throat before
// the point. Anchored to the start of the sentence to stay low false-positive
// ("she spoke frankly" does not match; "Frankly, ..." does).
const FILLER_OPENERS = [
  "to be clear",
  "to be honest",
  "let me be clear",
  "let me be honest",
  "in all honesty",
  "here's the thing",
  "here's the kicker",
  "honestly",
  "frankly",
  "candidly",
  "truth be told",
  "if i'm being honest",
  "if i'm being perfectly honest",
  "let me level with you",
  "i'll be straight with you",
  "i'll be frank",
  "no sugarcoating",
  "i won't sugarcoat it",
  "not to put too fine a point on it",
  "let's be real",
  "here's the deal",
  "here's what's really going on",
  "when all is said and done",
  "the fact of the matter is",
  "the bottom line is",
  "as we examine",
  "as we explore",
  "as we've seen",
  "at its core",
  "here's the truth",
  "here's where it gets interesting",
  "in a world where",
  "in the final analysis",
  "in the grand scheme of things",
  "it is time to",
  "it is worth considering that",
  "it's fair to say",
  "it's safe to say",
  "let's be honest",
  "make no mistake",
  "one might argue that",
  "picture this:",
  "some might say that",
  "suffice it to say",
  "there are no easy answers",
  "this is the important part",
  "to put it another way",
  "unquestionably",
  "we are at an inflection point"
];

function matchEnumerationPreface(words: readonly string[]): string | undefined {
  if (
    words.some((word) => VAGUE_INTROS.includes(word)) &&
    words.some((word) => CATEGORY_WORDS.includes(word)) &&
    words.some((word) => word === "include" || word === "includes")
  ) {
    return "vague-category-include";
  }

  return undefined;
}

function matchStarterFrame(words: readonly string[]): string | undefined {
  const [first, second, third] = words;

  if (
    first !== undefined &&
    second !== undefined &&
    third === "is" &&
    ORDINAL_STARTERS.includes(first) &&
    REASON_STARTERS.includes(second)
  ) {
    return `${first}-${second}-is`;
  }

  return undefined;
}

function matchBoilerplateFraming(sentence: string): string[] {
  const stripped = cleanSentence(sentence, PREFIXES);
  const words = tokens(stripped);
  const matches: string[] = [];

  if (
    tokensContainInOrder(words, [["following"], PREVIEW_OBJECTS, PREVIEW_VERBS])
  ) {
    matches.push("following + explore");
  }
  if (stripped.includes("when it comes to")) {
    matches.push("when it comes to");
  }
  if (
    tokensContainInOrder(words, [
      ["there"],
      ["are"],
      ["certain", "common"],
      CATEGORY_WORDS
    ])
  ) {
    matches.push("there are certain/common");
  }

  const enumeration = matchEnumerationPreface(words);
  if (enumeration !== undefined) {
    matches.push(enumeration);
  }

  const starter = matchStarterFrame(words);
  if (starter !== undefined) {
    matches.push(starter);
  }

  const lowered = stripped
    .toLocaleLowerCase("en")
    .replaceAll(String.fromCharCode(0x2019), "'");
  const filler = FILLER_OPENERS.find((opener) => lowered.startsWith(opener));
  if (filler !== undefined) {
    matches.push(filler);
  }

  return matches;
}

const rule = oneToOneRule({
  detect: (unit) =>
    matchBoilerplateFraming(unit.text).map((signal) => ({
      evidence: signal,
      label: signal,
      range: { start: 0, end: unit.text.length }
    })),
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Boilerplate framing found: ${report.evidence}. Start with the specific point.`,
  ruleId: "syntactic-patterns:boilerplate-framing",
  unitKind: "sentence"
});

export default rule;
