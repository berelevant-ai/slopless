import { wordTokens } from "../../../../shared/text/tokens.js";

const OMISSION_VERBS = new Set(["drop", "leave", "omit", "remove", "skip"]);
const INFORMATION_ARTIFACTS = new Set([
  "attribute",
  "catalog",
  "content",
  "description",
  "document",
  "evidence",
  "feed",
  "field",
  "listing",
  "metadata",
  "page",
  "profile",
  "record",
  "report"
]);
const CONSEQUENCE_VERBS = new Set([
  "fail",
  "fails",
  "failed",
  "lose",
  "loses",
  "lost",
  "miss",
  "misses",
  "missed"
]);
const NEGATIVE_AUXILIARIES = new Set([
  "aren't",
  "cannot",
  "can't",
  "didn't",
  "doesn't",
  "don't",
  "hadn't",
  "hasn't",
  "haven't",
  "isn't",
  "not",
  "wasn't",
  "weren't",
  "won't",
  "wouldn't"
]);
const ABSTRACT_OUTCOMES = new Set([
  "comparison",
  "consideration",
  "decision",
  "discoverability",
  "distribution",
  "market",
  "ranking",
  "recommendation",
  "results",
  "selection",
  "visibility"
]);
const ENTRY_VERBS = new Set([
  "appear",
  "appears",
  "compare",
  "compares",
  "enter",
  "enters",
  "include",
  "includes",
  "qualify",
  "qualifies",
  "rank",
  "ranks",
  "reach",
  "reaches",
  "recommend",
  "recommends",
  "select",
  "selects"
]);
const INFORMATION_VERBS = new Set([
  "describe",
  "described",
  "describes",
  "explain",
  "explained",
  "explains",
  "include",
  "included",
  "includes",
  "list",
  "listed",
  "lists",
  "mention",
  "mentioned",
  "mentions",
  "say",
  "said",
  "says",
  "show",
  "showed",
  "shown",
  "shows",
  "state",
  "stated",
  "states"
]);
const SELECTION_PREDICATES = new Map<string, string>([
  ["appeared", "appear"],
  ["compared", "compare"],
  ["considered", "consider"],
  ["included", "include"],
  ["qualified", "qualify"],
  ["ranked", "rank"],
  ["reached", "reach"],
  ["recommended", "recommend"],
  ["rejected", "reject"],
  ["selected", "select"],
  ["shown", "show"]
]);
const CAUSAL_CONNECTORS = new Set([
  "after",
  "because",
  "if",
  "since",
  "therefore",
  "until",
  "when",
  "while"
]);
const TECHNICAL_OR_SAFETY_WORDS = new Set([
  "backup",
  "bytes",
  "checksum",
  "citation",
  "citations",
  "code",
  "database",
  "debug",
  "debugging",
  "disk",
  "error",
  "measurement",
  "measurements",
  "parser",
  "pressure",
  "psi",
  "records",
  "schema",
  "semicolon",
  "stack",
  "tank",
  "trace",
  "valve",
  "voltage"
]);

type PredicateOccurrence = {
  readonly canonical: string;
  readonly index: number;
};

function words(text: string): readonly string[] {
  return wordTokens(text).map((token) => token.normalized);
}

function hasQuotedText(text: string): boolean {
  return [...text].some(
    (character) =>
      character === '"' ||
      character === "\u201c" ||
      character === "\u201d" ||
      character === "`"
  );
}

function hasDigit(word: string): boolean {
  return [...word].some((character) => character >= "0" && character <= "9");
}

function hasDash(text: string): boolean {
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === "\u2013" || character === "\u2014") {
      return true;
    }
    if (
      character === "-" &&
      (text[index - 1]?.trim() === "" || text[index + 1]?.trim() === "")
    ) {
      return true;
    }
  }

  return false;
}

function hasRejectedContext(
  text: string,
  sentenceWords: readonly string[]
): boolean {
  return (
    hasQuotedText(text) ||
    sentenceWords.some(
      (word) =>
        CAUSAL_CONNECTORS.has(word) ||
        TECHNICAL_OR_SAFETY_WORDS.has(word) ||
        hasDigit(word)
    )
  );
}

function containsAny(
  sentenceWords: readonly string[],
  candidates: ReadonlySet<string>
): boolean {
  return sentenceWords.some((word) => candidates.has(word));
}

function omissionConsequence(first: string, second: string): boolean {
  const firstWords = words(first);
  const secondWords = words(second);
  const comma = first.indexOf(",");
  const startsWithOmission =
    OMISSION_VERBS.has(firstWords[0] ?? "") &&
    containsAny(
      words(first.slice(0, comma < 0 ? first.length : comma)),
      INFORMATION_ARTIFACTS
    );
  const namesMissingInformation = firstWords.some(
    (word, index) =>
      word === "no" &&
      firstWords
        .slice(index + 1, index + 4)
        .some((candidate) => INFORMATION_ARTIFACTS.has(candidate))
  );
  if (
    firstWords.length > 32 ||
    secondWords.length > 16 ||
    (!startsWithOmission && !namesMissingInformation) ||
    hasRejectedContext(first, firstWords) ||
    hasRejectedContext(second, secondWords)
  ) {
    return false;
  }

  const consequenceStart = firstWords.findIndex(
    (word, index) => index > 0 && CONSEQUENCE_VERBS.has(word)
  );
  const hasNegativeConsequence =
    consequenceStart > 0 &&
    firstWords
      .slice(Math.max(0, consequenceStart - 3), consequenceStart)
      .some((word) => NEGATIVE_AUXILIARIES.has(word));
  const neverIndex = secondWords.indexOf("never");
  const entryVerb =
    neverIndex < 0
      ? undefined
      : secondWords.slice(neverIndex + 1).find((word) => ENTRY_VERBS.has(word));
  const combined = [...firstWords, ...secondWords];

  return (
    hasNegativeConsequence &&
    neverIndex > 0 &&
    entryVerb !== undefined &&
    containsAny(combined, ABSTRACT_OUTCOMES)
  );
}

function selectionOccurrences(
  sentenceWords: readonly string[]
): readonly PredicateOccurrence[] {
  const occurrences: PredicateOccurrence[] = [];
  sentenceWords.forEach((word, index) => {
    const canonical = SELECTION_PREDICATES.get(word);
    if (canonical !== undefined) {
      occurrences.push({ canonical, index });
    }
  });
  return occurrences;
}

function hasNegativeMarkerBefore(
  sentenceWords: readonly string[],
  index: number,
  marker: string
): boolean {
  const previous = sentenceWords[index - 1];
  if (previous === marker) {
    return true;
  }

  const clauseStart = sentenceWords.lastIndexOf(marker, index - 1);
  return clauseStart >= 0 && index - clauseStart <= 3;
}

function inlineSelectionClaim(
  text: string,
  allowStackedNever: boolean
): boolean {
  const sentenceWords = words(text);
  if (sentenceWords.length > 14 || hasRejectedContext(text, sentenceWords)) {
    return false;
  }

  const occurrences = selectionOccurrences(sentenceWords);
  if (occurrences.length < 2) {
    return false;
  }

  const repeatedAcrossNegation = occurrences.some((firstOccurrence, index) =>
    occurrences
      .slice(index + 1)
      .some(
        (secondOccurrence) =>
          firstOccurrence.canonical === secondOccurrence.canonical &&
          hasNegativeMarkerBefore(
            sentenceWords,
            firstOccurrence.index,
            "not"
          ) &&
          hasNegativeMarkerBefore(
            sentenceWords,
            secondOccurrence.index,
            "never"
          )
      )
  );
  const stackedNeverPredicates =
    occurrences.filter((occurrence) =>
      hasNegativeMarkerBefore(sentenceWords, occurrence.index, "never")
    ).length >= 2;

  return (
    (hasDash(text) && repeatedAcrossNegation) ||
    (allowStackedNever && stackedNeverPredicates)
  );
}

function artifactInformationClaim(text: string): boolean {
  const sentenceWords = words(text);
  if (sentenceWords.length > 18 || hasRejectedContext(text, sentenceWords)) {
    return false;
  }

  const neverIndex = sentenceWords.indexOf("never");
  if (neverIndex < 1 || neverIndex > 5) {
    return false;
  }

  const subject = sentenceWords.slice(0, neverIndex);
  return (
    containsAny(subject, INFORMATION_ARTIFACTS) &&
    INFORMATION_VERBS.has(sentenceWords[neverIndex + 1] ?? "") &&
    sentenceWords.length > neverIndex + 2
  );
}

function shortOutcomeFragment(text: string): boolean {
  const sentenceWords = words(text);
  return (
    sentenceWords.length > 0 &&
    sentenceWords.length <= 3 &&
    !hasRejectedContext(text, sentenceWords) &&
    !sentenceWords.includes("never")
  );
}

function artifactSelectionSequence(
  first: string,
  second: string,
  third?: string
): string | undefined {
  if (!artifactInformationClaim(first)) {
    return undefined;
  }
  if (inlineSelectionClaim(second, true)) {
    return `${first} ${second}`;
  }
  return third !== undefined &&
    shortOutcomeFragment(second) &&
    inlineSelectionClaim(third, true)
    ? `${first} ${second} ${third}`
    : undefined;
}

export function matchNegativeConsequence(
  first: string,
  second: string,
  third?: string
): string | undefined {
  if (second.length === 0) {
    return inlineSelectionClaim(first, false) ? first : undefined;
  }
  if (omissionConsequence(first, second)) {
    return `${first} ${second}`;
  }
  return artifactSelectionSequence(first, second, third);
}
