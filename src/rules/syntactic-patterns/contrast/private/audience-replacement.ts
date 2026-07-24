import { wordTokens } from "../../../../shared/text/tokens.js";

const HUMAN_AUDIENCES = new Set([
  "buyers",
  "customers",
  "people",
  "readers",
  "researchers",
  "shoppers",
  "users",
  "visitors"
]);
const MACHINE_ACTORS = new Set([
  "agent",
  "agents",
  "ai",
  "algorithm",
  "algorithms",
  "assistant",
  "assistants",
  "bot",
  "bots",
  "crawler",
  "crawlers",
  "machine",
  "machines",
  "model",
  "models",
  "system",
  "systems"
]);
const PREDICATES = new Map<string, string>([
  ["buy", "buy"],
  ["buys", "buy"],
  ["bought", "buy"],
  ["choose", "choose"],
  ["chooses", "choose"],
  ["chose", "choose"],
  ["compare", "compare"],
  ["compares", "compare"],
  ["compared", "compare"],
  ["evaluate", "evaluate"],
  ["evaluates", "evaluate"],
  ["evaluated", "evaluate"],
  ["find", "find"],
  ["finds", "find"],
  ["found", "find"],
  ["inspect", "inspect"],
  ["inspects", "inspect"],
  ["inspected", "inspect"],
  ["purchase", "purchase"],
  ["purchases", "purchase"],
  ["purchased", "purchase"],
  ["read", "read"],
  ["reads", "read"],
  ["review", "review"],
  ["reviews", "review"],
  ["reviewed", "review"],
  ["search", "search"],
  ["searches", "search"],
  ["searched", "search"],
  ["select", "select"],
  ["selects", "select"],
  ["selected", "select"],
  ["scan", "scan"],
  ["scans", "scan"],
  ["scanned", "scan"]
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
const OBJECT_FILLERS = new Set([
  "a",
  "an",
  "and",
  "at",
  "for",
  "from",
  "in",
  "its",
  "my",
  "of",
  "on",
  "our",
  "the",
  "their",
  "to",
  "your"
]);
const OBJECT_PRONOUNS = new Set([
  "he",
  "her",
  "him",
  "it",
  "me",
  "she",
  "them",
  "they",
  "us",
  "we",
  "you"
]);
const ARTIFACT_SURFACES = new Set([
  "catalog",
  "dashboard",
  "database",
  "feed",
  "index",
  "listing",
  "page",
  "report",
  "site"
]);

type PredicateClaim = {
  readonly object: readonly string[];
  readonly predicate: string;
};

function words(text: string): readonly string[] {
  return wordTokens(text).map((token) => token.normalized);
}

function hasQuote(text: string): boolean {
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

function hasRejectedSurface(
  text: string,
  sentenceWords: readonly string[]
): boolean {
  return (
    hasQuote(text) ||
    sentenceWords.some((word) => CAUSAL_CONNECTORS.has(word) || hasDigit(word))
  );
}

function stripTimeMarker(
  sentenceWords: readonly string[]
): readonly string[] | undefined {
  const suffixes = [
    ["anymore"],
    ["now"],
    ["any", "longer"],
    ["these", "days"]
  ] as const;

  for (const suffix of suffixes) {
    const start = sentenceWords.length - suffix.length;
    if (
      start > 0 &&
      suffix.every((word, index) => sentenceWords[start + index] === word)
    ) {
      return sentenceWords.slice(0, start);
    }
  }

  return undefined;
}

function humanAudienceEnd(
  sentenceWords: readonly string[]
): number | undefined {
  const first = sentenceWords[0];
  if (first === "nobody") {
    return 1;
  }
  if (first === "no" && sentenceWords[1] === "one") {
    return 2;
  }

  const headIndex =
    first === "the" || first === "most" || first === "many" ? 1 : 0;
  return HUMAN_AUDIENCES.has(sentenceWords[headIndex] ?? "")
    ? headIndex + 1
    : undefined;
}

function firstClaim(
  sentenceWords: readonly string[]
): PredicateClaim | undefined {
  const originalSubjectEnd = humanAudienceEnd(sentenceWords);
  const withoutTime =
    stripTimeMarker(sentenceWords) ??
    (originalSubjectEnd !== undefined &&
    sentenceWords[originalSubjectEnd] === "no" &&
    sentenceWords[originalSubjectEnd + 1] === "longer"
      ? sentenceWords
      : undefined);
  if (withoutTime === undefined) {
    return undefined;
  }

  const subjectEnd = humanAudienceEnd(withoutTime);
  if (subjectEnd === undefined) {
    return undefined;
  }

  let predicateIndex = subjectEnd;
  const subjectStart = withoutTime[0];
  if (subjectStart !== "nobody" && subjectStart !== "no") {
    if (
      withoutTime[predicateIndex] === "don't" ||
      withoutTime[predicateIndex] === "doesn't" ||
      withoutTime[predicateIndex] === "didn't"
    ) {
      predicateIndex += 1;
    } else if (
      withoutTime[predicateIndex] === "do" &&
      withoutTime[predicateIndex + 1] === "not"
    ) {
      predicateIndex += 2;
    } else if (
      withoutTime[predicateIndex] === "no" &&
      withoutTime[predicateIndex + 1] === "longer"
    ) {
      predicateIndex += 2;
    } else {
      return undefined;
    }
  }

  const predicate = PREDICATES.get(withoutTime[predicateIndex] ?? "");
  const object = withoutTime.slice(predicateIndex + 1);
  return predicate !== undefined && object.length > 0
    ? { object, predicate }
    : undefined;
}

function machineActorEnd(sentenceWords: readonly string[]): number | undefined {
  let index =
    sentenceWords[0] === "a" ||
    sentenceWords[0] === "an" ||
    sentenceWords[0] === "the"
      ? 1
      : 0;
  const actorStart = index;

  while (
    index < actorStart + 2 &&
    MACHINE_ACTORS.has(sentenceWords[index] ?? "")
  ) {
    index += 1;
  }

  return index > actorStart ? index : undefined;
}

function secondClaim(
  sentenceWords: readonly string[]
): PredicateClaim | undefined {
  const actorEnd = machineActorEnd(sentenceWords);
  if (actorEnd === undefined) {
    return undefined;
  }

  const predicate = PREDICATES.get(sentenceWords[actorEnd] ?? "");
  const object = sentenceWords.slice(actorEnd + 1);
  return predicate !== undefined && object.length > 0
    ? { object, predicate }
    : undefined;
}

function contentWords(object: readonly string[]): Set<string> {
  return new Set(
    object.filter(
      (word) => !OBJECT_FILLERS.has(word) && !OBJECT_PRONOUNS.has(word)
    )
  );
}

function sharesContent(
  firstObject: readonly string[],
  secondObject: readonly string[]
): boolean {
  if (
    secondObject.length === 0 ||
    secondObject.every((word) => OBJECT_PRONOUNS.has(word))
  ) {
    return false;
  }

  const firstContent = contentWords(firstObject);
  const secondContent = contentWords(secondObject);
  const sameContent =
    firstContent.size === secondContent.size &&
    [...firstContent].every((word) => secondContent.has(word));
  const firstCore = [...firstContent].filter(
    (word) => !ARTIFACT_SURFACES.has(word)
  );
  const secondCore = [...secondContent].filter(
    (word) => !ARTIFACT_SURFACES.has(word)
  );

  return (
    sameContent ||
    (firstCore.length > 0 &&
      firstCore.length === secondCore.length &&
      firstCore.every((word) => secondCore.includes(word)))
  );
}

export function matchAudienceReplacement(
  first: string,
  second: string
): string | undefined {
  const firstWords = words(first);
  const secondWords = words(second);
  if (
    firstWords.length > 24 ||
    secondWords.length > 20 ||
    hasRejectedSurface(first, firstWords) ||
    hasRejectedSurface(second, secondWords)
  ) {
    return undefined;
  }

  const humanClaim = firstClaim(firstWords);
  const machineClaim = secondClaim(secondWords);
  if (
    humanClaim === undefined ||
    machineClaim?.predicate !== humanClaim.predicate ||
    !sharesContent(humanClaim.object, machineClaim.object)
  ) {
    return undefined;
  }

  return `${first} ${second}`;
}
