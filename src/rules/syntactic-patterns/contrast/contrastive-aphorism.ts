import { defineTextlintRule } from "../../../adapters/textlint/rule.js";
import { sentenceUnits } from "../../../adapters/textlint/units.js";
import {
  cleanSentence,
  startsWithWords,
  tokens,
  trimTerminalPunctuation
} from "../../../shared/matchers/prose-patterns.js";
import { pairHasAbstractSubjectOrObject } from "./private/abstract-pair-gates.js";
import { matchEvidenceLimitationPair } from "./private/evidence-limitation-pair.js";
import { matchSameSentenceContrast } from "./private/same-sentence-contrast.js";
import { matchSingleSentenceAphorism } from "./private/single-sentence-aphorism.js";

const PREFIXES = ["and ", "but ", "so ", "because "];
const ENOUGH_FOR_SUFFIXES = [" is enough for this", " is enough for that"];

function matchCurriculumPair(
  first: string,
  second: string
): string | undefined {
  const a = trimTerminalPunctuation(cleanSentence(first, PREFIXES));
  const b = trimTerminalPunctuation(cleanSentence(second, PREFIXES));

  for (const suffix of ENOUGH_FOR_SUFFIXES) {
    if (!a.endsWith(suffix)) {
      continue;
    }

    const subject = a.slice(0, -suffix.length);
    if (subject.length > 0 && b === `${subject} is the curriculum`) {
      return "x-is-enough-x-is-curriculum";
    }
  }

  return undefined;
}

function matchLessMorePair(first: string, second: string): string | undefined {
  const a = tokens(cleanSentence(first, PREFIXES));
  const b = tokens(cleanSentence(second, PREFIXES));

  if (
    startsWithWords(a, ["it", "is", "less"]) &&
    startsWithWords(b, ["it", "is", "more"])
  ) {
    return "it-is-less-it-is-more";
  }

  return undefined;
}

function hasTokenPair(
  words: readonly string[],
  first: string,
  second: string
): boolean {
  return words.some(
    (word, index) => word === first && words[index + 1] === second
  );
}

function matchGivesYouPair(first: string, second: string): string | undefined {
  const a = tokens(cleanSentence(first, PREFIXES));
  const b = tokens(cleanSentence(second, PREFIXES));

  if (
    hasTokenPair(a, "gives", "you") &&
    hasTokenPair(b, "gives", "you") &&
    a.at(-1) !== b.at(-1) &&
    pairHasAbstractSubjectOrObject(a, "gives", "you") &&
    pairHasAbstractSubjectOrObject(b, "gives", "you")
  ) {
    return "x-gives-you-y-pair";
  }

  return undefined;
}

function matchGetsOneAnotherPair(
  first: string,
  second: string
): string | undefined {
  const a = tokens(cleanSentence(first, PREFIXES));
  const b = tokens(cleanSentence(second, PREFIXES));

  if (hasTokenPair(a, "gets", "one") && hasTokenPair(b, "gets", "another")) {
    return pairHasAbstractSubjectOrObject(a, "gets", "one") &&
      pairHasAbstractSubjectOrObject(b, "gets", "another")
      ? "x-gets-one-y-gets-another"
      : undefined;
  }

  return undefined;
}

function hasEvaluativePredicate(words: readonly string[]): boolean {
  return words.some(
    (word, index) =>
      ["is", "feels", "get", "gets", "becomes"].includes(word) &&
      pairHasAbstractSubjectOrObject(words, word, words[index + 1] ?? "")
  );
}

function matchEvaluativeContrastPair(
  first: string,
  second: string
): string | undefined {
  const a = tokens(cleanSentence(first, PREFIXES));
  const b = tokens(cleanSentence(second, PREFIXES));
  const aTail = a.at(-1);
  const bTail = b.at(-1);

  return aTail !== undefined &&
    bTail !== undefined &&
    aTail !== bTail &&
    hasEvaluativePredicate(a) &&
    hasEvaluativePredicate(b)
    ? "abstract-evaluative-pair"
    : undefined;
}

const rule = defineTextlintRule({
  detector: {
    detect: ({ units }) => {
      const detections = units.flatMap((unit) => {
        const signal = matchSingleSentenceAphorism(unit.text);
        const sameSentenceSignal =
          signal ?? matchSameSentenceContrast(unit.text);
        if (sameSentenceSignal === undefined) {
          return [];
        }

        return [
          {
            evidence: sameSentenceSignal,
            label: sameSentenceSignal,
            range: { start: 0, end: unit.text.length },
            ruleId: "syntactic-patterns:contrastive-aphorism" as const,
            unitId: unit.id
          }
        ];
      });

      for (let index = 0; index < units.length - 1; index += 1) {
        const current = units[index];
        const next = units[index + 1];
        if (current === undefined || next === undefined) {
          continue;
        }
        if (current.node !== next.node) {
          continue;
        }

        const signal =
          matchCurriculumPair(current.text, next.text) ??
          matchLessMorePair(current.text, next.text) ??
          matchGivesYouPair(current.text, next.text) ??
          matchGetsOneAnotherPair(current.text, next.text) ??
          matchEvidenceLimitationPair(current.text, next.text) ??
          matchEvaluativeContrastPair(current.text, next.text);
        if (signal !== undefined) {
          detections.push({
            evidence: signal,
            label: signal,
            range: { start: 0, end: current.text.length },
            ruleId: "syntactic-patterns:contrastive-aphorism",
            unitId: current.id
          });
        }
      }

      return detections;
    },
    family: "syntactic-patterns",
    id: "syntactic-patterns:contrastive-aphorism"
  },
  formatMessage: (report) =>
    `Contrastive aphorism found: ${report.evidence}. Replace the slogan with a concrete claim.`,
  reportPolicy: { kind: "one-to-one" },
  units: (document) => sentenceUnits(document)
});

export default rule;
