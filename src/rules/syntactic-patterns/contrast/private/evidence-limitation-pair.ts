import {
  cleanSentence,
  tokens
} from "../../../../shared/matchers/prose-patterns.js";

const PREFIXES = ["and ", "but ", "so "];
const SIMPLE_SUBJECT_STARTERS = new Set([
  "a",
  "an",
  "my",
  "our",
  "that",
  "the",
  "their",
  "these",
  "this",
  "those",
  "your"
]);
const EVIDENCE_PROXY_HEADS = new Set([
  "award",
  "awards",
  "benchmark",
  "benchmarks",
  "case",
  "cases",
  "comment",
  "comments",
  "dashboard",
  "dashboards",
  "demo",
  "demos",
  "example",
  "examples",
  "metric",
  "metrics",
  "number",
  "numbers",
  "rating",
  "ratings",
  "review",
  "reviews",
  "score",
  "scores",
  "screenshot",
  "screenshots",
  "signal",
  "signals",
  "survey",
  "surveys",
  "testimonial",
  "testimonials"
]);
const PLURAL_EVIDENCE_PROXY_HEADS = new Set([
  "awards",
  "benchmarks",
  "cases",
  "comments",
  "dashboards",
  "demos",
  "examples",
  "metrics",
  "numbers",
  "ratings",
  "reviews",
  "scores",
  "screenshots",
  "signals",
  "surveys",
  "testimonials"
]);
const COMPLEX_SUBJECT_MARKERS = new Set([
  "about",
  "against",
  "among",
  "around",
  "as",
  "at",
  "beside",
  "between",
  "by",
  "compared",
  "containing",
  "for",
  "from",
  "in",
  "including",
  "near",
  "of",
  "on",
  "or",
  "over",
  "under",
  "with",
  "without",
  "and"
]);
const EVIDENCE_AUXILIARIES = new Set([
  "can",
  "could",
  "had",
  "has",
  "have",
  "may",
  "might",
  "will",
  "would"
]);
const EVIDENCE_ASSERTION_VERBS = new Set([
  "confirm",
  "confirmed",
  "confirms",
  "demonstrate",
  "demonstrated",
  "demonstrates",
  "document",
  "documented",
  "documents",
  "establish",
  "established",
  "establishes",
  "imply",
  "implied",
  "implies",
  "indicate",
  "indicated",
  "indicates",
  "prove",
  "proved",
  "proven",
  "proves",
  "reveal",
  "revealed",
  "reveals",
  "show",
  "showed",
  "shown",
  "shows",
  "signal",
  "signaled",
  "signalled",
  "signals",
  "suggest",
  "suggested",
  "suggests",
  "support",
  "supported",
  "supports",
  "tell",
  "told",
  "validate",
  "validated",
  "validates",
  "verified",
  "verifies",
  "verify"
]);
const LIMITATION_REPORTING_VERBS = new Set([
  "communicate",
  "communicated",
  "communicates",
  "convey",
  "conveyed",
  "conveys",
  "demonstrate",
  "demonstrated",
  "demonstrates",
  "establish",
  "established",
  "establishes",
  "explain",
  "explained",
  "explains",
  "indicate",
  "indicated",
  "indicates",
  "offer",
  "offered",
  "offers",
  "provide",
  "provided",
  "provides",
  "prove",
  "proved",
  "proves",
  "reveal",
  "revealed",
  "reveals",
  "say",
  "said",
  "says",
  "show",
  "showed",
  "shows",
  "signal",
  "signaled",
  "signalled",
  "signals",
  "suggest",
  "suggested",
  "suggests",
  "tell",
  "told",
  "tells"
]);
const LIMITATION_AUXILIARIES = new Set(["did", "does"]);
const CONTRACTED_LIMITATION_AUXILIARIES = new Set(["didn't", "doesn't"]);
const REPORTING_OBJECTS = new Set(["buyers", "readers", "us", "you"]);
const LIMITATION_PRONOUNS = new Set([
  "it",
  "that",
  "these",
  "they",
  "this",
  "those"
]);
const LOW_INFORMATION_LIMITS = [
  ["little"],
  ["very", "little"],
  ["nothing"],
  ["not", "much"],
  ["only", "so", "much"],
  ["something"],
  ["no", "context"],
  ["no", "evidence"],
  ["no", "information"],
  ["no", "insight"]
] as const;

function evidenceSubjectHead(words: readonly string[]): string | undefined {
  const firstWord = words[0] ?? "";
  if (firstWord === "that" && SIMPLE_SUBJECT_STARTERS.has(words[1] ?? "")) {
    return undefined;
  }
  if (
    !SIMPLE_SUBJECT_STARTERS.has(firstWord) &&
    !EVIDENCE_PROXY_HEADS.has(firstWord)
  ) {
    return undefined;
  }

  const verbIndex = words.findIndex((word) =>
    EVIDENCE_ASSERTION_VERBS.has(word)
  );
  const headIndex = EVIDENCE_AUXILIARIES.has(words[verbIndex - 1] ?? "")
    ? verbIndex - 2
    : verbIndex - 1;
  const head = words[headIndex];
  const subjectModifiers = words.slice(0, headIndex);

  return verbIndex > 0 &&
    verbIndex < words.length - 1 &&
    head !== undefined &&
    EVIDENCE_PROXY_HEADS.has(head) &&
    !subjectModifiers.some((word) => COMPLEX_SUBJECT_MARKERS.has(word))
    ? head
    : undefined;
}

function startsWithLimit(
  words: readonly string[],
  start: number,
  limit: readonly string[]
): boolean {
  return limit.every((word, index) => words[start + index] === word);
}

function hasVagueContinuation(
  words: readonly string[],
  start: number,
  limit: readonly string[]
): boolean {
  const next = words[start + limit.length];
  const finalWord = limit.at(-1);
  if (
    ["context", "evidence", "information", "insight"].includes(finalWord ?? "")
  ) {
    return next === undefined || next === "about" || next === "into";
  }
  return (
    !["anything", "little", "much", "nothing", "something"].includes(
      finalWord ?? ""
    ) ||
    next === undefined ||
    next === "about"
  );
}

function limitationStart(words: readonly string[]): number {
  if (LIMITATION_REPORTING_VERBS.has(words[1] ?? "")) {
    return REPORTING_OBJECTS.has(words[2] ?? "") ? 3 : 2;
  }
  if (
    LIMITATION_AUXILIARIES.has(words[1] ?? "") &&
    words[2] === "not" &&
    LIMITATION_REPORTING_VERBS.has(words[3] ?? "")
  ) {
    return 4;
  }
  return CONTRACTED_LIMITATION_AUXILIARIES.has(words[1] ?? "") &&
    LIMITATION_REPORTING_VERBS.has(words[2] ?? "")
    ? 3
    : -1;
}

function hasLowInformationLimitation(
  words: readonly string[],
  pluralSubject: boolean
): boolean {
  const pronoun = words[0] ?? "";
  const pluralPronoun = ["these", "they", "those"].includes(pronoun);
  if (!LIMITATION_PRONOUNS.has(pronoun) || pluralPronoun !== pluralSubject) {
    return false;
  }
  const start = limitationStart(words);
  if (
    start >= 3 &&
    (LIMITATION_AUXILIARIES.has(words[1] ?? "") ||
      CONTRACTED_LIMITATION_AUXILIARIES.has(words[1] ?? ""))
  ) {
    return (
      ["anything", "much"].includes(words[start] ?? "") &&
      (words[start + 1] === undefined || words[start + 1] === "about")
    );
  }
  if (start < 0) {
    return false;
  }

  return LOW_INFORMATION_LIMITS.some((limit) => {
    if (!startsWithLimit(words, start, limit)) {
      return false;
    }
    return hasVagueContinuation(words, start, limit);
  });
}

export function matchEvidenceLimitationPair(
  first: string,
  second: string
): string | undefined {
  const firstWords = tokens(cleanSentence(first, PREFIXES));
  const secondWords = tokens(cleanSentence(second, PREFIXES));
  const subjectHead = evidenceSubjectHead(firstWords);

  return subjectHead !== undefined &&
    hasLowInformationLimitation(
      secondWords,
      PLURAL_EVIDENCE_PROXY_HEADS.has(subjectHead)
    )
    ? "evidence-limitation-pair"
    : undefined;
}
