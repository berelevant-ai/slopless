import { oneToOneRule } from "../../private/textlint-rule-builders.js";
import { findFragmentMatches } from "./private/fragment-stack-detector.js";

const rule = oneToOneRule({
  detect: (unit) =>
    findFragmentMatches(unit.text).map((match) => ({
      evidence: match.sentences.join(" "),
      label: match.fragmentTypes.join(","),
      range: { start: match.start, end: match.end }
    })),
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Fragment stack found: ${report.evidence} Rewrite the clipped cadence as normal prose.`,
  ruleId: "syntactic-patterns:fragment-stacking",
  unitKind: "paragraph"
});

export default rule;
