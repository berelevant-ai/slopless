import type { RuleId } from "../types.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";
import { findHiddenSignificanceContextMatches } from "./private/hidden-significance-context.js";

const RULE_ID = "words:silently-filler" satisfies RuleId;

const rule = oneToOneRule({
  detect: (unit) =>
    findHiddenSignificanceContextMatches(unit.text, "silently").map(
      (match) => ({
        data: { contextClass: match.label },
        evidence: match.evidence,
        label: match.label,
        range: match.range
      })
    ),
  family: "words",
  formatMessage: (report) => {
    const contextClass = report.detections[0]?.data?.["contextClass"];
    return `"silently" adds vague hidden significance (${contextClass}). Name the concrete behavior or remove the adverb.`;
  },
  ruleId: RULE_ID,
  severity: 1,
  unitKind: "sentence"
});

export default rule;
