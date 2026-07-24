import { wordTokens } from "../../../../shared/text/tokens.js";

const ABSTRACT_CATEGORY_HEADS = new Set([
  "acquisition",
  "administration",
  "advertising",
  "analytics",
  "answer",
  "automation",
  "awareness",
  "brand",
  "channel",
  "commerce",
  "compliance",
  "content",
  "control",
  "conversion",
  "copy",
  "decision",
  "delivery",
  "demand",
  "discoverability",
  "discovery",
  "distribution",
  "documentation",
  "editorial",
  "enablement",
  "engagement",
  "execution",
  "experience",
  "governance",
  "growth",
  "hygiene",
  "implementation",
  "indexing",
  "infrastructure",
  "management",
  "maintenance",
  "market",
  "marketing",
  "media",
  "merchandising",
  "operations",
  "optimization",
  "page",
  "plumbing",
  "policy",
  "positioning",
  "procurement",
  "product",
  "production",
  "publishing",
  "ranking",
  "recommendation",
  "regulation",
  "reporting",
  "retrieval",
  "retention",
  "revenue",
  "risk",
  "sales",
  "search",
  "security",
  "service",
  "sourcing",
  "storefront",
  "strategy",
  "support",
  "trust",
  "visibility",
  "workflow",
  "work"
]);
const ARTICLES = new Set(["a", "an", "the"]);
const PRESENT_COPULAS = new Set(["am", "are", "is"]);
const CONTRACTED_COPULAS = new Map<
  string,
  { readonly copula: string; readonly subject: readonly string[] }
>([
  ["i'm", { copula: "am", subject: ["i"] }],
  ["you're", { copula: "are", subject: ["you"] }],
  ["we're", { copula: "are", subject: ["we"] }],
  ["they're", { copula: "are", subject: ["they"] }],
  ["he's", { copula: "is", subject: ["he"] }],
  ["she's", { copula: "is", subject: ["she"] }],
  ["it's", { copula: "is", subject: ["it"] }],
  ["that's", { copula: "is", subject: ["that"] }]
]);
const PRONOUNS = new Set([
  "he",
  "i",
  "it",
  "she",
  "that",
  "they",
  "this",
  "we",
  "you"
]);
const PLURAL_PRONOUNS = new Set(["they", "we", "you"]);
const SINGULAR_S_SUBJECTS = new Set([
  "analytics",
  "business",
  "economics",
  "logistics",
  "news",
  "operations",
  "sales"
]);
const FACTUAL_CONNECTORS = new Set([
  "after",
  "although",
  "because",
  "before",
  "if",
  "since",
  "therefore",
  "until",
  "when",
  "while"
]);
const DETAIL_PREPOSITIONS = new Set([
  "above",
  "at",
  "behind",
  "below",
  "beside",
  "between",
  "by",
  "from",
  "in",
  "inside",
  "into",
  "near",
  "of",
  "on",
  "outside",
  "through",
  "to",
  "under",
  "with",
  "within"
]);
const PHYSICAL_PROPERTY_WORDS = new Set([
  "blue",
  "cold",
  "dry",
  "empty",
  "full",
  "green",
  "heavy",
  "hot",
  "large",
  "light",
  "local",
  "long",
  "optional",
  "red",
  "required",
  "shared",
  "short",
  "small",
  "tall",
  "warm",
  "weekly",
  "wet",
  "wide"
]);
const FRAME_SUBJECTS = new Set([
  "audit",
  "content",
  "data",
  "feed",
  "index",
  "indexing",
  "metadata",
  "page",
  "product",
  "search",
  "seo",
  "visibility"
]);

type TemporalClause = {
  readonly copula?: string;
  readonly label: readonly string[];
  readonly subject: readonly string[];
};

function isCompleteSentence(text: string): boolean {
  return [".", "!", "?"].includes(text.trim().at(-1) ?? "");
}

function isLetter(character: string): boolean {
  return (
    character.toLocaleLowerCase("en") !== character.toLocaleUpperCase("en")
  );
}

function isInteriorApostrophe(text: string, index: number): boolean {
  return isLetter(text[index - 1] ?? "") && isLetter(text[index + 1] ?? "");
}

function hasQuotedValueOrNumber(text: string): boolean {
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index] ?? "";
    if (
      (character >= "0" && character <= "9") ||
      ['"', "`", "\u201c", "\u201d"].includes(character)
    ) {
      return true;
    }
    if (
      ["'", "\u2018", "\u2019"].includes(character) &&
      !isInteriorApostrophe(text, index)
    ) {
      return true;
    }
  }
  return false;
}

function withoutArticle(words: readonly string[]): readonly string[] {
  return ARTICLES.has(words[0] ?? "") ? words.slice(1) : words;
}

function parsePastClause(text: string): TemporalClause | undefined {
  const words = wordTokens(text).map((token) => token.normalized);
  const usedIndex = words.findIndex(
    (word, index) =>
      word === "used" && words[index + 1] === "to" && words[index + 2] === "be"
  );
  const subject = words.slice(0, usedIndex);
  const label = withoutArticle(words.slice(usedIndex + 3));

  return usedIndex > 0 &&
    subject.length <= 4 &&
    label.length > 0 &&
    label.length <= 4
    ? { label, subject }
    : undefined;
}

function parsePresentClause(text: string): TemporalClause | undefined {
  const words = wordTokens(text).map((token) => token.normalized);
  const start = words[0] === "now" ? 1 : 0;
  const contracted = CONTRACTED_COPULAS.get(words[start] ?? "");

  if (contracted !== undefined) {
    const label = withoutArticle(words.slice(start + 1));
    return label.length > 0 && label.length <= 4
      ? { ...contracted, label }
      : undefined;
  }

  const copulaIndex = words.findIndex(
    (word, index) => index >= start && PRESENT_COPULAS.has(word)
  );
  const copula = words[copulaIndex];
  const subject = words.slice(start, copulaIndex);
  const label = withoutArticle(words.slice(copulaIndex + 1));

  return copulaIndex > start &&
    copula !== undefined &&
    subject.length <= 4 &&
    label.length > 0 &&
    label.length <= 4
    ? { copula, label, subject }
    : undefined;
}

function sameSubjectOrPronoun(
  first: readonly string[],
  second: readonly string[]
): boolean {
  if (
    first.length === second.length &&
    first.every((word, index) => word === second[index])
  ) {
    return true;
  }
  if (second.length !== 1 || !PRONOUNS.has(second[0] ?? "")) {
    return false;
  }

  const firstPronoun = first.length === 1 ? first[0] : undefined;
  if (firstPronoun !== undefined && PRONOUNS.has(firstPronoun)) {
    return firstPronoun === second[0];
  }

  const subjectHead = first.at(-1) ?? "";
  const pluralSubject = isPluralSubjectHead(subjectHead);
  return pluralSubject
    ? second[0] === "they"
    : ["it", "that", "this"].includes(second[0] ?? "");
}

function isPluralSubjectHead(head: string): boolean {
  return (
    head.endsWith("s") && !head.endsWith("ss") && !SINGULAR_S_SUBJECTS.has(head)
  );
}

function hasCopulaAgreement(clause: TemporalClause): boolean {
  const subject = clause.subject;
  const copula = clause.copula;
  if (copula === undefined) {
    return false;
  }
  if (subject.length === 1 && PRONOUNS.has(subject[0] ?? "")) {
    if (subject[0] === "i") {
      return copula === "am";
    }
    return PLURAL_PRONOUNS.has(subject[0] ?? "")
      ? copula === "are"
      : copula === "is";
  }

  const head = subject.at(-1) ?? "";
  const plural = isPluralSubjectHead(head);
  return copula === (plural ? "are" : "is");
}

function isAbstractLabel(label: readonly string[]): boolean {
  return ABSTRACT_CATEGORY_HEADS.has(label.at(-1) ?? "");
}

function hasBlockedDetail(words: readonly string[]): boolean {
  return words.some(
    (word) =>
      FACTUAL_CONNECTORS.has(word) ||
      DETAIL_PREPOSITIONS.has(word) ||
      PHYSICAL_PROPERTY_WORDS.has(word)
  );
}

function isPassiveLabel(label: readonly string[]): boolean {
  const head = label[0] ?? "";
  return head.endsWith("ed") || head.endsWith("en");
}

function isFrameSubject(subject: readonly string[]): boolean {
  const head = subject.at(-1) ?? "";
  return (
    FRAME_SUBJECTS.has(head) ||
    (subject.length === 1 && ["it", "that", "this"].includes(head))
  );
}

export function matchTemporalReframe(
  first: string,
  second: string
): string | undefined {
  if (
    !isCompleteSentence(first) ||
    !isCompleteSentence(second) ||
    hasQuotedValueOrNumber(first) ||
    hasQuotedValueOrNumber(second)
  ) {
    return undefined;
  }

  const past = parsePastClause(first);
  const present = parsePresentClause(second);
  if (past === undefined || present === undefined) {
    return undefined;
  }

  const allWords = [...past.subject, ...past.label, ...present.label];
  return sameSubjectOrPronoun(past.subject, present.subject) &&
    isFrameSubject(past.subject) &&
    hasCopulaAgreement(present) &&
    (isAbstractLabel(past.label) || isAbstractLabel(present.label)) &&
    !hasBlockedDetail(allWords) &&
    !isPassiveLabel(past.label) &&
    !isPassiveLabel(present.label)
    ? `${first} ${second}`
    : undefined;
}
