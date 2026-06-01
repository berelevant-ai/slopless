import weaselAttribution from "./data/weasel-attribution.json" with { type: "json" };
import { findUnquotedPhraseMatches } from "../../shared/matchers/phrases.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";

// Vague attribution: "studies show", "experts agree", "a growing body of evidence
// suggests" with no named source. Slop regardless of author; if the source is real,
// name it. The phrase list deliberately excludes attributions that are commonly used
// with a real citation alongside (those were screened out for false positives).
const rule = oneToOneRule({
  detect: (unit) =>
    findUnquotedPhraseMatches(unit.text, weaselAttribution).map((match) => ({
      evidence: match.text,
      label: match.text,
      range: { start: match.start, end: match.end }
    })),
  family: "phrases",
  formatMessage: (report) =>
    `Vague attribution found: "${report.evidence}". Name the specific source or cut the claim.`,
  ignoredAncestorTypes: ["Link", "LinkReference"],
  ruleId: "phrases:weasel-attribution",
  unitKind: "str"
});

export default rule;
