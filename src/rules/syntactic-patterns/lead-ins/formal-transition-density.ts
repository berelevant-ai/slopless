import { defineTextlintRule } from "../../../adapters/textlint/rule.js";
import { paragraphUnits } from "../../../adapters/textlint/units.js";
import { splitSentences } from "../../../shared/text/sentences.js";
import { type Token, wordTokens } from "../../../shared/text/tokens.js";
import type { RuleDetection, RuleId, TextUnit } from "../../types.js";

const RULE_ID = "syntactic-patterns:formal-transition-density" satisfies RuleId;
const MAX_PARAGRAPH_TOKENS = 120;
const MAX_WINDOW_TOKENS = 80;
const MIN_HITS = 3;
const WINDOW_SENTENCES = 5;

const TRANSITIONS: readonly (readonly string[])[] = [
  ["accordingly"],
  ["additionally"],
  ["as", "a", "result"],
  ["consequently"],
  ["conversely"],
  ["crucially"],
  ["furthermore"],
  ["hence"],
  ["however"],
  ["in", "addition"],
  ["in", "conclusion"],
  ["in", "contrast"],
  ["in", "turn"],
  ["indeed"],
  ["moreover"],
  ["nevertheless"],
  ["nonetheless"],
  ["notably"],
  ["overall"],
  ["similarly"],
  ["therefore"],
  ["thus"],
  ["ultimately"]
];

function transitionLabel(tokens: readonly Token[]): string | undefined {
  for (const transition of TRANSITIONS) {
    if (transition.every((word, index) => tokens[index]?.normalized === word)) {
      return transition.join(" ");
    }
  }

  return undefined;
}

function transitionDetections(
  unit: TextUnit
): RuleDetection<"formal transition">[] {
  return splitSentences(unit.text).flatMap((sentence) => {
    const tokens = wordTokens(sentence.text);
    const label = transitionLabel(tokens);
    if (label === undefined) {
      return [];
    }

    const first = tokens[0];
    const last = tokens[label.split(" ").length - 1];
    if (first === undefined || last === undefined) {
      return [];
    }

    return [
      {
        evidence: unit.text.slice(
          sentence.start + first.start,
          sentence.start + last.end
        ),
        group: "formal transition",
        label,
        range: {
          end: sentence.start + last.end,
          start: sentence.start + first.start
        },
        ruleId: RULE_ID,
        unitId: unit.id
      }
    ];
  });
}

const rule = defineTextlintRule({
  detector: {
    detect: ({ units }) => units.flatMap((unit) => transitionDetections(unit)),
    family: "syntactic-patterns",
    id: RULE_ID
  },
  formatMessage: (report) => {
    const labels = [...new Set(report.detections.map((hit) => hit.label))];
    return `Formal transition density: ${report.detections.length} formal transitions in a short span (${labels.join(", ")}).`;
  },
  reportPolicy: {
    groups: ["formal transition"],
    kind: "density",
    maxParagraphTokens: MAX_PARAGRAPH_TOKENS,
    maxWindowTokens: MAX_WINDOW_TOKENS,
    paragraphMinimumHits: MIN_HITS,
    windowMinimumHits: MIN_HITS,
    windowSentences: WINDOW_SENTENCES
  },
  units: (document) => paragraphUnits(document)
});

export default rule;
