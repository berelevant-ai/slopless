import {
  cleanSentence,
  tokens,
  tokensContainInOrder
} from "../../../shared/matchers/prose-patterns.js";
import { wordTokens } from "../../../shared/text/tokens.js";
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
  "the fact of the matter is",
  "the bottom line is",
  "here's the truth",
  "here's where it gets interesting",
  "in the grand scheme of things",
  "it is worth considering that",
  "it's fair to say",
  "let's be honest",
  "there are no easy answers",
  "this is the important part",
  "we are at an inflection point",
  "make no mistake",
  "the reality is",
  "the simple truth is",
  "the hard truth is",
  "the harsh truth is",
  "here's the reality",
  "let's face it",
  "no doubt about it",
  "it goes without saying",
  "needless to say",
  "as we all know",
  "the fact is"
];
// "To be perfectly clear", "to be brutally honest": an adverb may sit inside
// the honesty opener.
const HONESTY_ADVERBS = new Set([
  "brutally",
  "completely",
  "entirely",
  "perfectly",
  "quite",
  "really",
  "totally",
  "very"
]);
const HONESTY_ADJECTIVES = new Set([
  "blunt",
  "candid",
  "clear",
  "fair",
  "frank",
  "honest",
  "real",
  "transparent"
]);

function matchHonestyOpener(words: readonly string[]): string | undefined {
  if (words[0] !== "to" || words[1] !== "be") {
    return undefined;
  }
  const index = HONESTY_ADVERBS.has(words[2] ?? "") ? 3 : 2;
  const adjective = words[index];
  return adjective !== undefined && HONESTY_ADJECTIVES.has(adjective)
    ? words.slice(0, index + 1).join(" ")
    : undefined;
}
// First-person reflective openers that announce a return to a thought instead
// of stating it: "I keep coming back to advice about ...". Literal returns
// ("I keep going back to the pharmacy because ...", "... to Lisbon") carry a
// place name or a causal or temporal clause and are skipped.
const REFLECTIVE_OPENERS = [
  "i keep coming back to",
  "i keep returning to",
  "i keep circling back to",
  "i keep going back to",
  "i keep landing on",
  "i keep thinking about"
];
const LITERAL_RETURN_MARKERS = new Set(["because", "since", "until", "which"]);
const MONTHS = new Set([
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
]);

// A capitalized word right after a preposition is a place ("I keep going back
// to Lisbon", "the same cabin in Lisbon"); a name elsewhere ("what Slack
// taught us") is part of the thought. Acronyms (SEO, AI) are topics.
const PLACE_PREPOSITIONS = new Set(["at", "from", "in", "near", "to"]);

function isPlaceName(token: {
  readonly text: string;
  readonly normalized: string;
}): boolean {
  const first = token.text[0];
  const second = token.text[1];
  return (
    token.text !== "I" &&
    first !== undefined &&
    first >= "A" &&
    first <= "Z" &&
    second !== undefined &&
    second >= "a" &&
    second <= "z" &&
    !MONTHS.has(token.normalized)
  );
}

function hasProperName(sentence: string): boolean {
  const openerStart = sentence.toLocaleLowerCase("en").indexOf("i keep ");
  const following = wordTokens(sentence).filter(
    (token) => token.start > openerStart
  );
  return following.some(
    (token, index) =>
      index > 0 &&
      PLACE_PREPOSITIONS.has(following[index - 1]?.normalized ?? "") &&
      isPlaceName(token)
  );
}

// "In our SEO work, I keep coming back to ...": the opener may follow one
// introductory phrase ending in a comma.
function afterIntroductoryPhrase(lowered: string): string {
  const comma = lowered.indexOf(", ");
  return comma > 0 && comma < 60 ? lowered.slice(comma + 2) : lowered;
}

function matchReflectiveOpener(
  sentence: string,
  lowered: string,
  words: readonly string[]
): string | undefined {
  const opener = REFLECTIVE_OPENERS.find(
    (item) =>
      lowered.startsWith(item) ||
      afterIntroductoryPhrase(lowered).startsWith(item)
  );
  return opener !== undefined &&
    !words.some((word) => LITERAL_RETURN_MARKERS.has(word)) &&
    !hasProperName(sentence)
    ? opener
    : undefined;
}

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
  const lowered = stripped
    .toLocaleLowerCase("en")
    .replaceAll(String.fromCharCode(0x2019), "'");
  const matches: string[] = [];

  if (
    tokensContainInOrder(words, [["following"], PREVIEW_OBJECTS, PREVIEW_VERBS])
  ) {
    matches.push("following + explore");
  }
  // Opener only: "When it comes to X, ..." is a weak filler lead-in. Mid-sentence
  // ("... tells us little when it comes to Y") is ordinary usage, not boilerplate.
  if (lowered.startsWith("when it comes to")) {
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

  const filler =
    FILLER_OPENERS.find((opener) => lowered.startsWith(opener)) ??
    matchHonestyOpener(words) ??
    matchReflectiveOpener(sentence, lowered, words);
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
