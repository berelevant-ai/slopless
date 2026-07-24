import { findBlockNegationReframes } from "./private/block-negation-reframe.js";
import { findSentenceNegationReframes } from "./private/negation-reframe-matcher.js";
import { defineTextlintRule } from "../../../adapters/textlint/rule.js";
import {
  allParagraphUnits,
  paragraphSequenceUnit
} from "../../../adapters/textlint/units.js";
import type { RuleDetection, RuleId, TextUnit } from "../../types.js";

const RULE_ID = "syntactic-patterns:negation-reframe" satisfies RuleId;

function detectionsForUnit(unit: TextUnit): readonly RuleDetection[] {
  const matches =
    unit.id === "paragraph-sequence:0"
      ? findBlockNegationReframes(unit.text)
      : findSentenceNegationReframes(unit.text);

  return matches.map((match) => ({
    evidence: match.text,
    label: match.text,
    range: { start: match.start, end: match.end },
    ruleId: RULE_ID,
    unitId: unit.id
  }));
}

const rule = defineTextlintRule({
  detector: {
    detect: ({ units }) => units.flatMap((unit) => detectionsForUnit(unit)),
    family: "syntactic-patterns",
    id: RULE_ID
  },
  formatMessage: (report) =>
    `Negation reframe found: "${report.evidence}". Rewrite the staged negation as a direct claim.`,
  reportPolicy: { kind: "one-to-one" },
  units: (document) => [
    ...allParagraphUnits(document),
    paragraphSequenceUnit(document)
  ]
});

export default rule;
