import { type Token, wordTokens } from "../../shared/text/tokens.js";
import {
  oneToOneRule,
  type LocalDetection
} from "../private/textlint-rule-builders.js";

const RULE_ID = "narrative-slop:emotion-telling";

function wordSet(words: string): ReadonlySet<string> {
  return new Set(words.split(" "));
}

// "She was afraid." / "I feel nervous." / "They felt frustrated by the delay."
// / "Mara was overwhelmed." The subject is a person, the verb links or
// reports feeling, and the predicate is a bare emotion label, optionally
// followed by an intensifier before it and an "of/about/by ..." complement
// after it. A digit in the sentence marks a concrete occasion and vetoes.
const PERSON_PRONOUNS = wordSet("he i she they we you");
const NON_PERSON_SUBJECTS = wordSet(
  "cannot don't everything it nothing one something that there this what which"
);
// Dialogue may name feelings ("I'm glad!"); narration should not.
const QUOTE_OPENERS = new Set(['"', "\u201c", "'", "\u2018"]);
const CONTRACTED_SUBJECTS = new Map<string, string>([
  ["i'm", "i"],
  ["he's", "he"],
  ["she's", "she"],
  ["they're", "they"],
  ["we're", "we"],
  ["you're", "you"]
]);
const LINKING_VERBS = wordSet(
  "am are be became become becomes been being feel feeling feels felt get gets got is looked looks seem seemed seems was were"
);
const INTENSIFIERS = wordSet(
  "a bit completely deeply little pretty quite really so still suddenly too truly utterly very"
);
const LEADING_CONNECTIVES = wordSet("and but so then");
// "to" and "that" complements carry the content ("excited to announce",
// "disappointed that his first story ...") and are not blunt labels.
const COMPLEMENT_HEADS = wordSet("about at by for of toward towards with");
const TRAILING_ADVERBS = wordSet("again already now then too");
const EMOTION_WORDS = wordSet(
  "afraid angry annoyed anxious ashamed bitter bored confused delighted depressed desperate devastated disappointed disgusted eager embarrassed excited frightened frustrated furious glad grateful happy heartbroken helpless hopeful hopeless hurt irritated jealous lonely mad miserable nervous overwhelmed panicked pleased proud relieved sad scared shocked stunned surprised tense terrified thrilled uneasy unhappy upset worried"
);

function isCapitalized(token: Token): boolean {
  const first = token.text[0];
  if (first === undefined) {
    return false;
  }

  return (
    first.toLocaleUpperCase("en") === first &&
    first.toLocaleLowerCase("en") !== first
  );
}

function hasPersonSubject(token: Token | undefined): boolean {
  return (
    token !== undefined &&
    !NON_PERSON_SUBJECTS.has(token.normalized) &&
    (PERSON_PRONOUNS.has(token.normalized) || isCapitalized(token))
  );
}

function hasDigit(tokens: readonly Token[]): boolean {
  return tokens.some((token) =>
    [...token.text].some((character) => character >= "0" && character <= "9")
  );
}

function emotionIndex(tokens: readonly Token[]): number | undefined {
  const start = LEADING_CONNECTIVES.has(tokens[0]?.normalized ?? "") ? 1 : 0;
  const subject = tokens[start];
  const contracted = CONTRACTED_SUBJECTS.get(subject?.normalized ?? "");
  let index = start + 1;
  if (contracted === undefined) {
    if (
      !hasPersonSubject(subject) ||
      !LINKING_VERBS.has(tokens[index]?.normalized ?? "")
    ) {
      return undefined;
    }
    index += 1;
  }

  while (INTENSIFIERS.has(tokens[index]?.normalized ?? "")) {
    index += 1;
  }

  return EMOTION_WORDS.has(tokens[index]?.normalized ?? "") ? index : undefined;
}

// A clause after the label ("..., so she counted the missing screws") moves
// the sentence on to action, so a later comma or semicolon vetoes.
function hasLaterClause(text: string, from: number): boolean {
  return [...text.slice(from)].some(
    (character) => character === "," || character === ";"
  );
}

function isBluntEmotionLabel(text: string, tokens: readonly Token[]): boolean {
  const index = emotionIndex(tokens);
  const emotion = index === undefined ? undefined : tokens[index];
  if (
    emotion === undefined ||
    index === undefined ||
    QUOTE_OPENERS.has(text.trimStart()[0] ?? "") ||
    hasDigit(tokens) ||
    hasLaterClause(text, emotion.end)
  ) {
    return false;
  }

  let next = index + 1;
  while (TRAILING_ADVERBS.has(tokens[next]?.normalized ?? "")) {
    next += 1;
  }
  const tail = tokens[next]?.normalized;
  return tail === undefined || COMPLEMENT_HEADS.has(tail);
}

const rule = oneToOneRule({
  detect: (unit): readonly LocalDetection[] => {
    const tokens = wordTokens(unit.text);
    if (!isBluntEmotionLabel(unit.text, tokens)) {
      return [];
    }

    return [
      {
        evidence: unit.text,
        label: "blunt emotion label",
        range: { end: unit.text.length, start: 0 }
      }
    ];
  },
  family: "narrative-slop",
  formatMessage: (report) =>
    `Emotion telling: ${report.detections[0]?.evidence}. Replace the blunt emotion label with a concrete action, thought, or choice.`,
  ruleId: RULE_ID,
  unitKind: "sentence"
});

export default rule;
