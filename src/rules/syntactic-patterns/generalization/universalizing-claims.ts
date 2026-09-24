import {
  cleanSentence,
  tokens,
  startsWithWords
} from "../../../shared/matchers/prose-patterns.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const PREFIXES = [
  "however, ",
  "but ",
  "and ",
  "so ",
  "ultimately, ",
  "after all, ",
  "in the end, "
];
// Real universalizing claims: a broad human-group subject + a desire/certainty verb
// ("most people want", "everyone knows", "for many parents ... hope"). The previous
// vague-quantifier + abstract-noun arm ("many reasons", "some things", "several
// challenges") was removed: those are ordinary counts, not universalizing claims, and
// were the dominant false positive.
// Universal subjects: "everyone", "no one", "we all", "all of us", or a broad
// quantifier over a human group ("most parents", "every founder", "all
// teams", "for many people").
const UNIVERSAL_SUBJECTS: readonly (readonly string[])[] = [
  ["everyone"],
  ["everybody"],
  ["we", "all"],
  ["all", "of", "us"],
  ["most", "of", "us"],
  ["many", "of", "us"],
  ["none", "of", "us"],
  ["no", "one"],
  ["nobody"],
  ["anyone"],
  ["anybody"]
];
const GROUP_QUANTIFIERS = ["most", "many", "every", "all", "no", "any"];
const DESIRE_VERBS = [
  "want",
  "wants",
  "hope",
  "hopes",
  "deserve",
  "deserves",
  "crave",
  "craves",
  "look",
  "looks",
  "reach",
  "reaches",
  "try",
  "tries",
  "need",
  "needs",
  "wish",
  "wishes",
  "love",
  "loves",
  "hate",
  "hates",
  "fear",
  "fears",
  "prefer",
  "prefers",
  "struggle",
  "struggles"
];
const CERTAINTY_VERBS = [
  "assume",
  "assumes",
  "expect",
  "expects",
  "know",
  "knows",
  "believe",
  "believes",
  "think",
  "thinks",
  "understand",
  "understands",
  "agree",
  "agrees",
  "feel",
  "feels",
  "tend",
  "tends",
  "forget",
  "forgets",
  "ignore",
  "ignores",
  "underestimate",
  "underestimates",
  "overestimate",
  "overestimates",
  "fail",
  "fails",
  "realize",
  "realizes"
];
const VERB_WINDOW = 6;
const HUMAN_GROUP_SUBJECTS = [
  "adults",
  "brands",
  "businesses",
  "buyers",
  "children",
  "clients",
  "companies",
  "couples",
  "customers",
  "dads",
  "developers",
  "employees",
  "engineers",
  "families",
  "founders",
  "humans",
  "kids",
  "leaders",
  "managers",
  "marketers",
  "men",
  "moms",
  "organizations",
  "parents",
  "people",
  "readers",
  "students",
  "teachers",
  "teams",
  "users",
  "women",
  "workers",
  "writers"
];
const GROUP_BEHAVIOR_GERUNDS = [
  "asking",
  "looking",
  "reaching",
  "trying",
  "waiting",
  "hoping",
  "wondering"
];
const BROAD_GROUP_LEADS = ["many", "most"];
const IMPORTANCE_QUALIFIERS = [
  ["most", "important"],
  ["most", "meaningful"],
  ["most", "useful"],
  ["most", "valuable"],
  ["biggest"],
  ["best"],
  ["deepest"],
  ["greatest"],
  ["strongest"]
] as const;
const ABSTRACT_OUTCOMES = [
  "advances",
  "breakthroughs",
  "changes",
  "decisions",
  "ideas",
  "improvements",
  "insights",
  "lessons",
  "shifts",
  "skills"
];
const ABSTRACT_DOMAINS = [
  "business",
  "careers",
  "design",
  "growth",
  "leadership",
  "life",
  "management",
  "strategy",
  "technology",
  "work",
  "writing"
];
const SOURCE_PREDICATES = [
  ["come", "from"],
  ["came", "from"],
  ["grow", "from"],
  ["grew", "from"],
  ["emerge", "from"],
  ["emerged", "from"],
  ["start", "with"],
  ["started", "with"],
  ["begin", "with"],
  ["began", "with"]
] as const;
const VAGUE_SOURCES = [
  ["experiences", "outside", "work"],
  ["unexpected", "places"],
  ["ordinary", "moments"],
  ["adversity"],
  ["challenge"],
  ["challenges"],
  ["discomfort"],
  ["elsewhere"],
  ["experience"],
  ["experiences"],
  ["failure"],
  ["failures"],
  ["setback"],
  ["setbacks"]
] as const;

function phraseLengthAt(
  words: readonly string[],
  index: number,
  phrases: readonly (readonly string[])[]
): number | undefined {
  for (const phrase of phrases) {
    if (startsWithWords(words.slice(index), phrase)) {
      return phrase.length;
    }
  }

  return undefined;
}

function matchVagueSuperlativeSource(
  words: readonly string[]
): string | undefined {
  if (words[0] !== "some" && words[0] !== "many") {
    return undefined;
  }
  if (words[1] !== "of" || words[2] !== "the") {
    return undefined;
  }

  let index = 3;
  const qualifierLength = phraseLengthAt(words, index, IMPORTANCE_QUALIFIERS);
  if (qualifierLength === undefined) {
    return undefined;
  }
  index += qualifierLength;

  if (!ABSTRACT_OUTCOMES.includes(words[index] ?? "")) {
    return undefined;
  }
  index += 1;

  if (words[index] === "in") {
    if (!ABSTRACT_DOMAINS.includes(words[index + 1] ?? "")) {
      return undefined;
    }
    index += 2;
  }

  const predicateLength = phraseLengthAt(words, index, SOURCE_PREDICATES);
  if (predicateLength === undefined) {
    return undefined;
  }
  index += predicateLength;

  const sourceLength = phraseLengthAt(words, index, VAGUE_SOURCES);
  if (sourceLength === undefined || index + sourceLength !== words.length) {
    return undefined;
  }

  return words.join(" ");
}

function matchGroupBehavior(words: readonly string[]): string | undefined {
  const [first, subject, third, gerund] = words;

  if (
    first !== undefined &&
    subject !== undefined &&
    third === "keep" &&
    gerund !== undefined &&
    BROAD_GROUP_LEADS.includes(first) &&
    HUMAN_GROUP_SUBJECTS.includes(subject) &&
    GROUP_BEHAVIOR_GERUNDS.includes(gerund)
  ) {
    return `${first} ${subject} keep ${gerund}`;
  }

  return undefined;
}

function universalSubjectLength(words: readonly string[]): number | undefined {
  const start = words[0] === "for" ? 1 : 0;
  const rest = words.slice(start);
  const fixed = UNIVERSAL_SUBJECTS.find((subject) =>
    startsWithWords(rest, subject)
  );
  if (fixed !== undefined) {
    return start + fixed.length;
  }
  const [quantifier, second, third] = rest;
  if (quantifier === undefined || !GROUP_QUANTIFIERS.includes(quantifier)) {
    return undefined;
  }
  if (
    second === "of" &&
    third !== undefined &&
    HUMAN_GROUP_SUBJECTS.includes(third)
  ) {
    return start + 3;
  }
  if (second !== undefined && HUMAN_GROUP_SUBJECTS.includes(second)) {
    return start + 2;
  }
  // "every founder", "any parent": singular after every/any/no
  const singular = second === undefined ? undefined : `${second}s`;
  return ["every", "any", "no"].includes(quantifier) &&
    singular !== undefined &&
    HUMAN_GROUP_SUBJECTS.includes(singular)
    ? start + 2
    : undefined;
}

function hasDigit(text: string): boolean {
  return [...text].some((character) => character >= "0" && character <= "9");
}

function matchUniversalizing(sentence: string): string | undefined {
  const cleaned = cleanSentence(sentence, PREFIXES);
  // "Most adults need at least 7 hours of sleep per night." is bounded, and a
  // question ("Anyone knows the cause of my problem?") claims nothing.
  if (hasDigit(cleaned) || sentence.trimEnd().endsWith("?")) {
    return undefined;
  }
  const words = tokens(cleaned);
  const vagueSource = matchVagueSuperlativeSource(words);
  if (vagueSource !== undefined) {
    return vagueSource;
  }

  const group = matchGroupBehavior(words);

  if (group !== undefined) {
    return group;
  }

  const subjectLength = universalSubjectLength(words);
  if (subjectLength === undefined) {
    return undefined;
  }

  const window = words.slice(subjectLength, subjectLength + VERB_WINDOW);
  const verb =
    window.find((candidate) => DESIRE_VERBS.includes(candidate)) ??
    window.find((candidate) => CERTAINTY_VERBS.includes(candidate));

  return verb === undefined
    ? undefined
    : `${words.slice(0, subjectLength).join(" ")} ${verb}`;
}

const rule = oneToOneRule({
  detect: (unit) => {
    const matched = matchUniversalizing(unit.text);
    if (matched === undefined) {
      return [];
    }

    return [
      {
        evidence: matched,
        label: matched,
        range: { start: 0, end: unit.text.length }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Universalizing claim found: ${report.evidence}. Replace the broad claim with a bounded claim.`,
  ruleId: "syntactic-patterns:universalizing-claims",
  unitKind: "sentence"
});

export default rule;
