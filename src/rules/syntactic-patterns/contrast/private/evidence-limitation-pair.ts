import { hasConcreteCorrectionEvidence } from "../../../../shared/matchers/concrete-evidence.js";
import {
  cleanSentence,
  tokens
} from "../../../../shared/matchers/prose-patterns.js";
import {
  CONTRACTED_NEGATED_LIMIT_AUXILIARIES,
  EVIDENCE_ASSERTION_VERBS,
  LIMITATION_CLAUSE_CONNECTORS,
  LIMITATION_REPORTING_VERBS,
  LIMITATION_VERDICT_VERBS,
  NEGATED_LIMIT_AUXILIARIES
} from "./evidence-limitation-vocabulary.js";

const PREFIXES = ["and ", "but ", "so "];
const SIMPLE_SUBJECT_STARTERS = new Set([
  "a",
  "an",
  "her",
  "his",
  "its",
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
  "analysis",
  "audit",
  "audits",
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
  "data",
  "demo",
  "demos",
  "evidence",
  "example",
  "examples",
  "experiment",
  "experiments",
  "findings",
  "guidance",
  "metric",
  "metrics",
  "model",
  "models",
  "number",
  "numbers",
  "paper",
  "papers",
  "rating",
  "ratings",
  "report",
  "reports",
  "research",
  "result",
  "results",
  "review",
  "reviews",
  "sample",
  "score",
  "scores",
  "screenshot",
  "screenshots",
  "signal",
  "signals",
  "studies",
  "study",
  "survey",
  "surveys",
  "testimonial",
  "testimonials",
  "trial",
  "trials"
]);
const PLURAL_EVIDENCE_PROXY_HEADS = new Set([
  "audits",
  "awards",
  "datasets",
  "benchmarks",
  "cases",
  "comments",
  "dashboards",
  "dataset",
  "datasets",
  "demos",
  "examples",
  "experiments",
  "findings",
  "metrics",
  "models",
  "numbers",
  "papers",
  "ratings",
  "reports",
  "results",
  "reviews",
  "scores",
  "screenshots",
  "signals",
  "studies",
  "surveys",
  "testimonials",
  "trials"
]);
// "The report confirms the backup completed. It says little about restore
// time." is ordinary reporting, so report-like heads only pair with a negated
// verdict ("It does not speak for total cost.").
const VERDICT_ONLY_HEADS = new Set(["audit", "audits", "report", "reports"]);
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

function negatedVerdictObjectStart(words: readonly string[]): number {
  const auxiliary = words[1] ?? "";
  if (CONTRACTED_NEGATED_LIMIT_AUXILIARIES.has(auxiliary)) {
    return LIMITATION_VERDICT_VERBS.has(words[2] ?? "") ? 3 : -1;
  }
  return NEGATED_LIMIT_AUXILIARIES.has(auxiliary) &&
    words[2] === "not" &&
    LIMITATION_VERDICT_VERBS.has(words[3] ?? "")
    ? 4
    : -1;
}

// "data" takes singular or plural pronouns, so it is number-agnostic.
function hasNegatedAbstractLimitation(
  text: string,
  words: readonly string[],
  pluralSubject: boolean | undefined
): boolean {
  const pronoun = words[0] ?? "";
  const pluralPronoun = ["these", "they", "those"].includes(pronoun);
  if (
    !LIMITATION_PRONOUNS.has(pronoun) ||
    (pluralSubject !== undefined && pluralPronoun !== pluralSubject)
  ) {
    return false;
  }

  const objectStart = negatedVerdictObjectStart(words);
  const object = objectStart < 0 ? [] : words.slice(objectStart);
  return (
    object.length > 0 &&
    !object.some((word) => LIMITATION_CLAUSE_CONNECTORS.has(word)) &&
    ![...text].some((character) => character >= "0" && character <= "9") &&
    !hasConcreteCorrectionEvidence(text)
  );
}

export function matchEvidenceLimitationPair(
  first: string,
  second: string
): string | undefined {
  const firstWords = tokens(cleanSentence(first, PREFIXES));
  const secondWords = tokens(cleanSentence(second, PREFIXES));
  const subjectHead = evidenceSubjectHead(firstWords);
  if (subjectHead === undefined) {
    return undefined;
  }

  const pluralSubject = PLURAL_EVIDENCE_PROXY_HEADS.has(subjectHead);
  return (!VERDICT_ONLY_HEADS.has(subjectHead) &&
    hasLowInformationLimitation(secondWords, pluralSubject)) ||
    hasNegatedAbstractLimitation(
      cleanSentence(second, PREFIXES),
      secondWords,
      subjectHead === "data" ? undefined : pluralSubject
    )
    ? "evidence-limitation-pair"
    : undefined;
}
