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
const SUBJECT_PATTERNS = [
  ["everyone"],
  ["everybody"],
  ["we", "all"],
  ["many", "adults"],
  ["many", "couples"],
  ["many", "families"],
  ["many", "kids"],
  ["many", "parents"],
  ["many", "people"],
  ["many", "of", "us"],
  ["most", "adults"],
  ["most", "couples"],
  ["most", "people"],
  ["most", "of", "us"],
  ["most", "parents"],
  ["most", "families"],
  ["most", "kids"],
  ["for", "many", "adults"],
  ["for", "many", "families"],
  ["for", "many", "parents"],
  ["for", "many", "people"],
  ["for", "most", "people"],
  ["no", "one"],
  ["nobody"]
] as const;
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
  "tries"
];
const CERTAINTY_VERBS = [
  "assume",
  "assumes",
  "expect",
  "expects",
  "know",
  "knows"
];
const HUMAN_GROUP_SUBJECTS = [
  "adults",
  "children",
  "couples",
  "dads",
  "families",
  "kids",
  "moms",
  "parents",
  "people",
  "students",
  "teachers"
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

function matchUniversalizing(sentence: string): string | undefined {
  const cleaned = cleanSentence(sentence, PREFIXES);
  const words = tokens(cleaned);
  const vagueSource = matchVagueSuperlativeSource(words);
  if (vagueSource !== undefined) {
    return vagueSource;
  }

  const group = matchGroupBehavior(words);

  if (group !== undefined) {
    return group;
  }

  for (const subject of SUBJECT_PATTERNS) {
    if (!startsWithWords(words, subject)) {
      continue;
    }

    const window = words.slice(subject.length, subject.length + 4);
    const verb =
      window.find((candidate) => DESIRE_VERBS.includes(candidate)) ??
      window.find((candidate) => CERTAINTY_VERBS.includes(candidate));

    if (verb !== undefined) {
      return `${subject.join(" ")} ${verb}`;
    }
  }

  return undefined;
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
