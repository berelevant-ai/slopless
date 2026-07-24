import type { RuleId } from "../types.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";
import { findQuietlyContextMatches } from "./private/quietly-context.js";

const RULE_ID = "words:quietly-filler" satisfies RuleId;

const rule = oneToOneRule({
  detect: (unit) =>
    findQuietlyContextMatches(unit.text).map((match) => ({
      data: { contextClass: match.label },
      evidence: match.evidence,
      label: match.label,
      range: match.range
    })),
  family: "words",
  formatMessage: (report) => {
    const contextClass = report.detections[0]?.data?.["contextClass"];
    return `"quietly" adds vague hidden significance (${contextClass}). Name the concrete change or remove the adverb.`;
  },
  ruleId: RULE_ID,
  severity: 1,
  unitKind: "sentence"
});

export default rule;
