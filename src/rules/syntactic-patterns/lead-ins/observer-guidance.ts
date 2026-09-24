import { hasConcreteImplementationSummary } from "../../../shared/matchers/concrete-evidence.js";
import {
  cleanSentence,
  startsWithAnyText,
  tokens,
  trimTerminalPunctuation,
  type SentenceMatch
} from "../../../shared/matchers/prose-patterns.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const PREFIXES = ["and ", "but ", "so "];
const OBSERVER_PATTERNS = [
  "you can see it everywhere now",
  "you see it everywhere",
  "you see it after almost every",
  "you can watch it happen in real time",
  "you can tell the difference quickly"
];
const READER_ADDRESS_PATTERNS = ["if this hits home"];
const STUCK_PATTERNS = ["this is where people get stuck"];
const WHERE_BRIDGE_PATTERNS = [
  "that is where the confusion slips in",
  "that is where a lot of work gets lost",
  "that is where the guilt starts",
  "that is where the real progress lives",
  "that is where a lot of the misunderstanding begins",
  "that is where culture becomes visible"
];
// "This is where {most} teams get stuck": any plural human or team noun,
// optionally quantified, with a stall verb and any tail.
const WHERE_QUANTIFIERS = ["most", "many", "some", "a lot of", "plenty of"];
const WHERE_SUBJECTS = [
  "people",
  "parents",
  "kids",
  "children",
  "couples",
  "teams",
  "founders",
  "writers",
  "readers",
  "managers",
  "leaders",
  "companies",
  "startups",
  "organizations",
  "marketers",
  "engineers",
  "developers",
  "students",
  "beginners",
  "clients",
  "brands",
  "agencies",
  "users",
  "we",
  "you",
  "i"
];
const WHERE_VERBS = [
  "get",
  "gets",
  "got",
  "go",
  "goes",
  "went",
  "miss",
  "overreach",
  "stumble",
  "struggle",
  "fail",
  "lose",
  "slip",
  "stall",
  "stop",
  "give",
  "trip",
  "fall"
];
// "That is where the confusion slips in": an abstract noun and a vague
// arrival verb after "that/this is where".
const BRIDGE_NOUNS = [
  "confusion",
  "guilt",
  "trouble",
  "work",
  "progress",
  "misunderstanding",
  "culture",
  "magic",
  "value",
  "damage",
  "friction",
  "risk",
  "learning",
  "growth",
  "leverage",
  "problems",
  "trust",
  "fun",
  "money",
  "story",
  "difference",
  "shift",
  "gap",
  "danger"
];
const BRIDGE_VERBS = [
  "slips in",
  "creeps in",
  "starts",
  "begins",
  "lives",
  "happens",
  "gets lost",
  "gets made",
  "becomes visible",
  "shows up",
  "comes in",
  "breaks down",
  "falls apart",
  "kicks in",
  "pays off",
  "hides",
  "sits"
];
const SEE_PATTERNS = [
  "you see this when",
  "you see it when",
  "you see this in",
  "you see it in",
  "you can see this when",
  "you can see it when"
];
const WATCH_PATTERNS = [
  "watch how the frame changes",
  "watch how",
  "watch what happens"
];

// The observer, stuck, and bridge openers may carry a tail ("You see it
// everywhere now, especially in onboarding."), so a prefix match is enough.
function exactStart(
  text: string,
  patterns: readonly string[]
): string | undefined {
  return startsWithAnyText(text, patterns);
}

function skipQuantifier(rest: string): string {
  const quantifier = WHERE_QUANTIFIERS.find((item) =>
    rest.startsWith(`${item} `)
  );
  return quantifier === undefined ? rest : rest.slice(quantifier.length + 1);
}

function matchWhereFrame(stripped: string): SentenceMatch | undefined {
  const opener = [
    "this is where ",
    "that is where ",
    "this is when ",
    "that is when "
  ].find((item) => stripped.startsWith(item));
  if (opener === undefined) {
    return undefined;
  }
  const rest = skipQuantifier(stripped.slice(opener.length));
  const words = tokens(rest);
  const [subject, verb] = words;
  if (
    subject !== undefined &&
    verb !== undefined &&
    WHERE_SUBJECTS.includes(subject) &&
    WHERE_VERBS.includes(verb)
  ) {
    return {
      kind: "where-bridge",
      signal: `${opener.trim()}-${subject}-${verb}`
    };
  }
  const BRIDGE_ADJECTIVES = ["real", "actual", "hard", "true", "big", "quiet"];
  const withoutThe = rest.startsWith("the ") ? rest.slice(4) : rest;
  const adjective = BRIDGE_ADJECTIVES.find((item) =>
    withoutThe.startsWith(`${item} `)
  );
  const bridgeRest =
    adjective === undefined
      ? withoutThe
      : withoutThe.slice(adjective.length + 1);
  const noun = BRIDGE_NOUNS.find((item) => bridgeRest.startsWith(`${item} `));
  const afterNoun =
    noun === undefined ? undefined : bridgeRest.slice(noun.length + 1);
  const bridgeVerb =
    afterNoun === undefined
      ? undefined
      : BRIDGE_VERBS.find((item) => afterNoun.startsWith(item));
  return noun !== undefined && bridgeVerb !== undefined
    ? {
        kind: "where-bridge",
        signal: `${opener.trim()}-${noun}-${bridgeVerb.replaceAll(" ", "-")}`
      }
    : undefined;
}

function matchObserverGuidance(sentence: string): SentenceMatch | undefined {
  const stripped = cleanSentence(sentence, PREFIXES);
  if (hasConcreteImplementationSummary(stripped)) {
    return undefined;
  }
  const trimmed = trimTerminalPunctuation(stripped);
  const observer = exactStart(trimmed, OBSERVER_PATTERNS);

  if (observer !== undefined) {
    return { kind: "observer-frame", signal: observer };
  }

  const reader = startsWithAnyText(stripped, READER_ADDRESS_PATTERNS);
  if (reader !== undefined) {
    return { kind: "reader-address", signal: reader };
  }

  const stuck = exactStart(trimmed, STUCK_PATTERNS);
  if (stuck !== undefined) {
    return { kind: "stuck-frame", signal: stuck };
  }

  const bridge = exactStart(trimmed, WHERE_BRIDGE_PATTERNS);
  if (bridge !== undefined) {
    return { kind: "where-bridge", signal: bridge };
  }

  const see = startsWithAnyText(stripped, SEE_PATTERNS);
  if (see !== undefined) {
    return { kind: "observer-frame", signal: see };
  }

  const watch = startsWithAnyText(stripped, WATCH_PATTERNS);
  if (watch !== undefined) {
    return { kind: "observer-frame", signal: watch };
  }

  if (stripped.startsWith("you can see it everywhere")) {
    return { kind: "observer-frame", signal: "you-can-see-it-everywhere" };
  }

  return matchWhereFrame(trimmed);
}

const rule = oneToOneRule({
  detect: (unit) => {
    const matched = matchObserverGuidance(unit.text);
    if (matched === undefined) {
      return [];
    }

    return [
      {
        evidence: matched.signal,
        label: matched.kind,
        range: { start: 0, end: unit.text.length }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Observer guidance found: ${report.evidence}. Replace the bridge with concrete evidence.`,
  ruleId: "syntactic-patterns:observer-guidance",
  unitKind: "sentence"
});

export default rule;
