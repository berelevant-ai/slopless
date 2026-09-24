import { oneToOneRule } from "../../private/textlint-rule-builders.js";

// Closers that announce a summary or a verdict instead of stating it. A
// leading connective ("Ultimately, in conclusion, ...") is stripped first.
// "in the end", "in short", and "in essence" are ordinary connectives in
// human prose (259 human vs 6 AI hits on the article corpus) and are not
// listed.
const LEADING_PREFIXES = [
  "and ",
  "but ",
  "so ",
  "ultimately, ",
  "ultimately ",
  "however, ",
  "overall, ",
  "again, ",
  "still, "
];
const SUMMATIVE_PATTERNS = [
  "and that's what makes",
  "that's what makes",
  "all in all",
  "at its core",
  "at the end of the day",
  "in a nutshell",
  "in conclusion",
  "in summary",
  "it all comes down to",
  "long story short",
  "put simply",
  "simply put",
  "that's the reason",
  "that is the reason",
  "this is the reason",
  "that is what makes",
  "this is what makes",
  "the bottom line is",
  "the big picture is",
  "the key takeaway is",
  "the lesson is",
  "the lesson here is",
  "the main takeaway is",
  "the moral is",
  "the moral of the story",
  "the net effect is",
  "the point is",
  "the practical takeaway is",
  "the real lesson is",
  "the takeaway is",
  "the takeaway here is",
  "the upshot is",
  "to sum up",
  "to summarize",
  "what it all comes down to",
  "what this means is",
  "when all is said and done"
];
// "that's why ..." and "this is why ..." are not closers: they usually
// introduce a stated reason, and the reviewer excluded them.
// Only a stated reason, a colon, or a number makes the closer concrete.
const CONCRETE_MARKERS = [":", "because", "since"];

function stripPrefix(text: string): string {
  const prefix = LEADING_PREFIXES.find((item) => text.startsWith(item));
  return prefix === undefined ? text : text.slice(prefix.length);
}

function hasDigit(text: string): boolean {
  for (const character of text) {
    if (character >= "0" && character <= "9") {
      return true;
    }
  }

  return false;
}

function hasConcreteMarker(text: string): boolean {
  return (
    hasDigit(text) || CONCRETE_MARKERS.some((marker) => text.includes(marker))
  );
}

const rule = oneToOneRule({
  detect: (unit) => {
    const lower = stripPrefix(
      unit.text.toLocaleLowerCase("en").replaceAll("\u2019", "'")
    );
    const pattern = SUMMATIVE_PATTERNS.find((phrase) =>
      lower.startsWith(phrase)
    );
    if (pattern === undefined || hasConcreteMarker(lower)) {
      return [];
    }

    return [
      {
        evidence: pattern,
        label: pattern,
        range: { start: 0, end: unit.text.length }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Summative frame found: "${report.evidence}". State the concrete point instead.`,
  ruleId: "syntactic-patterns:summative-closer",
  unitKind: "sentence"
});

export default rule;
