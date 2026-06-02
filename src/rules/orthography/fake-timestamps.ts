import { splitSentences } from "../../shared/text/sentences.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";

type TimestampMatch = {
  readonly end: number;
  readonly start: number;
  readonly text: string;
};

function isAsciiDigit(character: string | undefined): boolean {
  return character !== undefined && character >= "0" && character <= "9";
}

// A timestamp accompanied by a real date (weekday, month, year, or a date label) is a
// genuine timestamp - an email header, a logged event, a scheduled time - not fabricated
// AI clock specificity. Skip those.
const DATE_WORDS = [
  "january",
  "february",
  "march",
  "april",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];
const DATE_LABELS = [
  "date:",
  "sent:",
  "received:",
  "posted",
  "published",
  "updated",
  "timestamp"
];

function hasFourDigitYear(text: string): boolean {
  for (let i = 0; i + 3 < text.length; i += 1) {
    const a = text[i];
    const b = text[i + 1];
    if (
      ((a === "1" && b === "9") || (a === "2" && b === "0")) &&
      isAsciiDigit(text[i + 2]) &&
      isAsciiDigit(text[i + 3])
    ) {
      return true;
    }
  }

  return false;
}

function hasDateContext(sentence: string): boolean {
  const lower = sentence.toLocaleLowerCase("en");
  return (
    DATE_LABELS.some((label) => lower.includes(label)) ||
    DATE_WORDS.some((word) => lower.includes(word)) ||
    hasFourDigitYear(lower)
  );
}

function isPeriodMarker(
  first: string | undefined,
  second: string | undefined
): boolean {
  if (first === undefined || second === undefined) {
    return false;
  }

  const normalizedFirst = first.toUpperCase();
  return (
    (normalizedFirst === "A" || normalizedFirst === "P") &&
    second.toUpperCase() === "M"
  );
}

function findTimestampMatches(text: string): TimestampMatch[] {
  const matches: TimestampMatch[] = [];
  let index = 0;

  while (index < text.length) {
    if (!isAsciiDigit(text[index])) {
      index += 1;
      continue;
    }

    const start = index;
    while (isAsciiDigit(text[index])) {
      index += 1;
    }

    if (text[index] !== ":") {
      index = start + 1;
      continue;
    }

    index += 1;
    const minuteStart = index;
    while (isAsciiDigit(text[index])) {
      index += 1;
    }

    if (index === minuteStart) {
      index = start + 1;
      continue;
    }

    if (text[index] === " ") {
      index += 1;
    }

    if (!isPeriodMarker(text[index], text[index + 1])) {
      index = start + 1;
      continue;
    }

    const end = index + 2;
    matches.push({
      end,
      start,
      text: text.slice(start, end)
    });
    index = end;
  }

  return matches;
}

function findSentenceTimestampMatches(text: string): TimestampMatch[] {
  const matches: TimestampMatch[] = [];

  for (const sentence of splitSentences(text)) {
    if (hasDateContext(sentence.text)) {
      continue;
    }
    const timestampMatches = findTimestampMatches(sentence.text);
    if (timestampMatches.length === 0) {
      continue;
    }

    const first = timestampMatches[0];
    if (first === undefined) {
      continue;
    }

    matches.push({
      end: sentence.start + first.end,
      start: sentence.start + first.start,
      text: first.text
    });
  }

  return matches;
}

const rule = oneToOneRule({
  detect: (unit) =>
    findSentenceTimestampMatches(unit.text).map((match) => ({
      evidence: match.text,
      label: match.text,
      range: { start: match.start, end: match.end }
    })),
  family: "orthography",
  formatMessage: (report) =>
    `Fake timestamp found: "${report.evidence}". Remove fabricated clock specificity.`,
  ruleId: "orthography:fake-timestamps",
  unitKind: "paragraph"
});

export default rule;
