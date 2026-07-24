import { defineTextlintRule } from "../../../adapters/textlint/rule.js";
import {
  paragraphUnits,
  sentenceUnits
} from "../../../adapters/textlint/units.js";
import { hasConcreteImplementationSummary } from "../../../shared/matchers/concrete-evidence.js";
import {
  cleanSentence,
  containsAny,
  tokens,
  type SentenceMatch
} from "../../../shared/matchers/prose-patterns.js";
import { splitSentences } from "../../../shared/text/sentences.js";
import type { RuleDetection } from "../../types.js";
import { matchComponentAssignmentFrame } from "./private/component-assignment-frame.js";
import {
  isAbstractAuditFrame,
  matchReactionFrame,
  matchDiscourseEvaluationFrame,
  matchExpandedDiscourseFrame
} from "./private/discourse-evaluation.js";
import { matchEvaluativeColonFrame } from "./private/evaluative-colon-frame.js";
import { matchRelativeDiscourseFrame } from "./private/relative-discourse-frame.js";

const PREFIXES = ["however, ", "but ", "and ", "so "];
// "as such" was removed: it is a normal anaphoric connective ("a registered adviser; as
// such, it must...") and was the dominant false positive, not a signposting frame.
const TRANSITION_PATTERNS = ["that being said"];
const CONSULTATION_PATTERNS = [
  "it's always best to consult",
  "it is always best to consult",
  "it's best to consult",
  "it is best to consult",
  "it's recommended to consult",
  "it is recommended to consult"
];
const NOTE_PATTERNS = ["please note that", "please note"];
const QUESTION_PATTERNS = [
  "the audit move",
  "wrong level of question",
  "the useful question is",
  "the useful move is",
  "the missing layer is",
  "the practical move is",
  "the practical point is",
  "the real question is",
  "the better question is",
  "the better operating question is"
];
const ANSWER_PATTERNS = [
  "the lazy conclusion is",
  "the better conclusion",
  "the answer is simple",
  "the answer is straightforward",
  "the grown-up answer is",
  "the practical answer is",
  "the short answer is",
  "the better conclusion is",
  "the clear answer is",
  "the correct answer is",
  "the useful conclusion is simple"
];
const FRAME_PATTERNS = [
  "the short version",
  "the practical version is",
  "the useful frame",
  "the useful version is",
  "the point is plain enough"
];
const SEQUENCE_PATTERNS = [
  "a simple sequence works well",
  "a simple pattern works well",
  "a simple rule works well"
];
const EMPTY_ADVANTAGE_WORDS = ["advantage", "edge", "signal"];
const CONDITIONAL_ABSTRACTIONS = [
  "conditions",
  "conversation",
  "conversations",
  "impact",
  "outcomes"
];
const PROFOUND_TAILS = [
  "big signal",
  "profound implications",
  "simple idea",
  "small change"
];
const WHAT_FRAME_TAIL_STARTERS = [
  "boring",
  "clear",
  "consistent",
  "easy",
  "hard",
  "less",
  "making",
  "more",
  "never",
  "not",
  "plain",
  "practice",
  "rarely",
  "small",
  "smaller",
  "simple",
  "straightforward",
  "true",
  "usually"
];
const WHAT_MATTERS_CLAUSE_STARTERS = [
  "how",
  "if",
  "that",
  "what",
  "when",
  "where",
  "whether",
  "which",
  "who",
  "whose",
  "why"
];
const POINT_NOUNS = ["goal", "job", "key", "point", "takeaway", "trick"];
function matchModifiedAbstractFrame(
  words: readonly string[]
): string | undefined {
  const [first, second, third, fourth] = words;

  if (first !== "the") {
    return undefined;
  }

  const key = `${second ?? ""}-${third ?? ""}-${fourth ?? ""}`;
  const matches = new Map([
    ["better-move-is", "the-better-move-is"],
    ["bigger-win-is", "the-bigger-win-is"],
    ["useful-move-is", "the-useful-move-is"],
    ["useful-alternative-is", "the-useful-alternative-is"],
    ["useful-alternatives-are", "the-useful-alternatives-are"]
  ]);

  return matches.get(key);
}

function matchPointIsToFrame(words: readonly string[]): string | undefined {
  const [first, second, third, fourth, fifth] = words;

  if (
    first === "the" &&
    POINT_NOUNS.includes(second ?? "") &&
    third === "is" &&
    fourth === "to" &&
    fifth !== undefined
  ) {
    return `the-${second ?? "point"}-is-to`;
  }

  return undefined;
}

function matchWhatFrame(words: readonly string[]): string | undefined {
  const [first, second, third, fourth] = words;

  if (
    first === "what" &&
    (second === "helps" ||
      second === "matters" ||
      second === "works" ||
      second === "changes") &&
    third === "is" &&
    fourth !== undefined &&
    (WHAT_FRAME_TAIL_STARTERS.includes(fourth) ||
      (second === "matters" && !WHAT_MATTERS_CLAUSE_STARTERS.includes(fourth)))
  ) {
    return `what-${second}-is`;
  }

  if (first === "what" && second === "matters" && third === "most") {
    return "what-matters-most";
  }

  if (
    words.length === 3 &&
    first === "what" &&
    (second === "helped" || second === "worked" || second === "changed") &&
    (third === "more" || third === "most")
  ) {
    return `what-${second}-${third}`;
  }

  return undefined;
}

function matchAbstractFrame(text: string): string | undefined {
  const words = tokens(text);
  return (
    matchRelativeDiscourseFrame(text, words) ??
    matchExpandedDiscourseFrame(text, words) ??
    matchModifiedAbstractFrame(words) ??
    matchDiscourseEvaluationFrame(words) ??
    matchPointIsToFrame(words) ??
    matchWhatFrame(words) ??
    matchReactionFrame(words)
  );
}

function matchFormulaicContentSetup(text: string): string | undefined {
  if (
    text.startsWith("each ") &&
    text.includes(" has a source") &&
    text.includes(" a reveal") &&
    (text.includes("next move") || text.includes("buyer"))
  ) {
    return "each-piece-has-source-reveal-next-move";
  }

  return undefined;
}

function matchGeneratedFormula(text: string): string | undefined {
  const words = tokens(text);

  if (
    words[0] === "in" &&
    words[1] === "a" &&
    words[2] === "world" &&
    words[3] === "where" &&
    words.includes("becomes") &&
    EMPTY_ADVANTAGE_WORDS.includes(words.at(-1) ?? "")
  ) {
    return "in-a-world-where-x-becomes-y";
  }

  if (
    words[0] === "if" &&
    words[1] === "we" &&
    (words[2] === "want" || words[2] === "care") &&
    words.some((word) => CONDITIONAL_ABSTRACTIONS.includes(word)) &&
    (words.includes("need") || words.includes("care"))
  ) {
    return "if-we-want-care-we-need-care";
  }

  if (
    (words[0] === "it" || words[0] === "this") &&
    words[1] === "is" &&
    PROFOUND_TAILS.some((tail) => text.includes(tail))
  ) {
    return "simple-profound-signal-frame";
  }

  if (
    words[0] === "this" &&
    words[1] === "is" &&
    words[2] === "the" &&
    words[3] === "moment" &&
    words[4] === "to" &&
    words.includes("over")
  ) {
    return "this-is-the-moment-to-choose";
  }

  return undefined;
}

function matchSignposting(sentence: string): SentenceMatch | undefined {
  const stripped = cleanSentence(sentence, PREFIXES);
  const abstract = matchAbstractFrame(stripped);
  const strippedWords = tokens(stripped);
  const auditStart = isAbstractAuditFrame(strippedWords)
    ? stripped.indexOf("audit")
    : -1;
  const concreteImplementation = hasConcreteImplementationSummary(
    abstract !== undefined && auditStart >= 0
      ? stripped.slice(0, auditStart) + stripped.slice(auditStart + 5)
      : stripped
  );
  const formulaicSetup = matchFormulaicContentSetup(stripped);
  const generatedFormula = matchGeneratedFormula(stripped);

  if (
    abstract !== undefined &&
    (abstract === "what-matters-is" ||
      abstract.startsWith("deictic-evaluative-") ||
      abstract.startsWith("relative-") ||
      !concreteImplementation)
  ) {
    return { kind: "abstract-evaluation-frame", signal: abstract };
  }
  if (generatedFormula !== undefined && !concreteImplementation) {
    return { kind: "generated-formula", signal: generatedFormula };
  }
  if (formulaicSetup !== undefined) {
    return { kind: "formulaic-content-setup", signal: formulaicSetup };
  }
  if (stripped.startsWith("the fun part is:") && !concreteImplementation) {
    return { kind: "frame-signpost", signal: "the fun part is:" };
  }

  const checks: readonly (readonly [string, readonly string[]])[] = [
    ["transition", TRANSITION_PATTERNS],
    ["consultation-signpost", CONSULTATION_PATTERNS],
    ["note-signpost", NOTE_PATTERNS],
    ["question-frame", QUESTION_PATTERNS],
    ["answer-frame", ANSWER_PATTERNS],
    ["frame-signpost", FRAME_PATTERNS],
    ["sequence-frame", SEQUENCE_PATTERNS]
  ];

  for (const [kind, patterns] of checks) {
    const signal = containsAny(stripped, patterns);
    if (
      concreteImplementation &&
      (kind === "answer-frame" ||
        kind === "frame-signpost" ||
        kind === "question-frame")
    ) {
      continue;
    }
    if (signal !== undefined) {
      return { kind, signal };
    }
  }

  return undefined;
}

const rule = defineTextlintRule({
  detector: {
    detect: ({ units }) => {
      const detections = units.flatMap((unit) => {
        if (unit.kind === "paragraph") {
          const sentences = splitSentences(unit.text);
          const pairDetections: RuleDetection[] = [];

          for (let index = 0; index < sentences.length - 1; index += 1) {
            const current = sentences[index];
            const next = sentences[index + 1];
            if (current === undefined || next === undefined) {
              continue;
            }

            const signal = matchComponentAssignmentFrame(
              current.text,
              next.text
            );
            if (signal !== undefined) {
              pairDetections.push({
                evidence: signal,
                label: "component-assignment-frame",
                range: { start: current.start, end: next.end },
                ruleId: "syntactic-patterns:generic-signposting" as const,
                unitId: unit.id
              });
            }
          }

          return pairDetections;
        }

        const componentSignal = matchComponentAssignmentFrame(unit.text);
        const colonSignal = matchEvaluativeColonFrame(unit.text);
        const matched =
          componentSignal === undefined && colonSignal === undefined
            ? matchSignposting(unit.text)
            : undefined;
        const signal = componentSignal ?? colonSignal ?? matched?.signal;
        if (signal === undefined) {
          return [];
        }

        return [
          {
            evidence: signal,
            label:
              componentSignal !== undefined
                ? "component-assignment-frame"
                : colonSignal !== undefined
                  ? "evaluative-colon-frame"
                  : (matched?.kind ?? "generic-signposting"),
            range: { start: 0, end: unit.text.length },
            ruleId: "syntactic-patterns:generic-signposting" as const,
            unitId: unit.id
          }
        ];
      });

      return detections;
    },
    family: "syntactic-patterns",
    id: "syntactic-patterns:generic-signposting"
  },
  formatMessage: (report) =>
    `Generic signposting found: ${report.evidence}. Replace the frame with the concrete claim.`,
  reportPolicy: { kind: "one-to-one" },
  units: (document) => [...sentenceUnits(document), ...paragraphUnits(document)]
});

export default rule;
