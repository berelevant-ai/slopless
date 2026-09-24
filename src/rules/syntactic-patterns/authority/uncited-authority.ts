import {
  cleanSentence,
  startsWithWords,
  tokens
} from "../../../shared/matchers/prose-patterns.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const PREFIXES = ["however, ", "but ", "and ", "so "];
const AUTHORITY_STARTS: readonly (readonly string[])[] = [
  ["according", "to", "experts"],
  ["according", "to", "researchers"],
  ["according", "to", "scientists"],
  ["data", "shows"],
  ["data", "suggests"],
  ["evidence", "shows"],
  ["evidence", "suggests"],
  ["experts", "agree"],
  ["experts", "recommend"],
  ["experts", "say"],
  ["experts", "warn"],
  ["it", "is", "commonly", "believed"],
  ["it", "is", "considered"],
  ["it", "is", "known", "for"],
  ["it", "is", "regarded", "as"],
  ["it", "is", "well", "established"],
  ["it", "is", "widely", "accepted"],
  ["many", "believe"],
  ["research", "confirms"],
  ["research", "indicates"],
  ["research", "proves"],
  ["research", "shows"],
  ["research", "suggests"],
  ["researchers", "agree"],
  ["researchers", "have", "found"],
  ["researchers", "say"],
  ["researchers", "warn"],
  ["science", "says"],
  ["science", "shows"],
  ["scientists", "agree"],
  ["scientists", "say"],
  ["scientists", "warn"],
  ["some", "argue"],
  ["some", "critics", "argue"],
  ["studies", "confirm"],
  ["studies", "indicate"],
  ["studies", "prove"],
  ["studies", "show"],
  ["studies", "suggest"],
  ["studies", "have", "shown"],
  ["research", "has", "shown"],
  ["research", "has", "found"],
  ["experts", "believe"],
  ["experts", "suggest"],
  ["psychologists", "say"],
  ["doctors", "recommend"],
  ["doctors", "say"],
  ["economists", "agree"],
  ["the", "science", "is", "clear"],
  ["the", "data", "is", "clear"],
  ["the", "evidence", "is", "clear"],
  ["it", "is", "no", "secret", "that"],
  ["it", "is", "well", "known", "that"],
  ["it's", "no", "secret", "that"],
  ["it's", "well", "known", "that"]
];
const NAMED_SOURCES = [
  "american academy of pediatrics",
  "american psychological association",
  "centers for disease control",
  "cdc",
  "fda",
  "medlineplus",
  "mayo clinic",
  "national institutes of health",
  "nih",
  "world health organization",
  "who"
];
const CITATION_MARKERS = [
  "doi:",
  "et al",
  "http://",
  "https://",
  "pmid:",
  "source:"
];
const MIN_AUTHORITY_TOKENS = 5;
// "Recent studies show", "A growing body of research suggests", "Most experts
// agree": up to four lead-in tokens before the authority phrase.
const LEAD_TOKENS = new Set([
  "a",
  "body",
  "current",
  "growing",
  "latest",
  "many",
  "most",
  "multiple",
  "new",
  "numerous",
  "of",
  "recent",
  "several",
  "some",
  "the"
]);

function authorityStart(words: readonly string[]): string | undefined {
  for (let skip = 0; skip <= 4; skip += 1) {
    if (skip > 0 && !LEAD_TOKENS.has(words[skip - 1] ?? "")) {
      return undefined;
    }
    const match = AUTHORITY_STARTS.find((pattern) =>
      startsWithWords(words.slice(skip), pattern)
    );
    if (match !== undefined) {
      return words.slice(0, skip + match.length).join(" ");
    }
  }
  return undefined;
}

// A citation is a link, a marker, or a parenthesis that holds a digit
// ("(Smith, 2019)"); "(a lot)" is not a citation. Any digit in the claim
// still vetoes: "The evidence suggests that the 12-volt battery failed after
// 300 cycles." is a preserved no-hit.
function hasCitationMarker(text: string): boolean {
  if (text.includes("[") && text.includes("](")) {
    return true;
  }

  const open = text.indexOf("(");
  const close = text.indexOf(")", open + 1);
  if (open >= 0 && close > open && hasDigit(text.slice(open, close))) {
    return true;
  }

  return CITATION_MARKERS.some((marker) => text.includes(marker));
}

function hasNamedSource(text: string): boolean {
  return NAMED_SOURCES.some((source) => text.includes(source));
}

function hasDigit(text: string): boolean {
  for (const character of text) {
    if (character >= "0" && character <= "9") {
      return true;
    }
  }

  return false;
}

function matchUncitedAuthority(sentence: string): string | undefined {
  const cleaned = cleanSentence(sentence, PREFIXES);
  if (
    hasCitationMarker(cleaned) ||
    hasNamedSource(cleaned) ||
    hasDigit(cleaned)
  ) {
    return undefined;
  }

  const words = tokens(cleaned);
  if (words.length < MIN_AUTHORITY_TOKENS) {
    return undefined;
  }

  return authorityStart(words);
}

const rule = oneToOneRule({
  detect: (unit) => {
    const matched = matchUncitedAuthority(unit.text);
    if (matched === undefined) {
      return [];
    }

    return [
      {
        evidence: matched,
        label: "uncited authority",
        range: { end: unit.text.length, start: 0 }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Uncited authority found: ${report.evidence}. Name the source, cite the evidence, or make the claim directly.`,
  ruleId: "syntactic-patterns:uncited-authority",
  unitKind: "sentence"
});

export default rule;
