import selfHelpCliches from "./data/self-help-cliches.json" with { type: "json" };
import { findUnquotedPhraseMatches } from "../../shared/matchers/phrases.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";

const rule = oneToOneRule({
  detect: (unit) =>
    findUnquotedPhraseMatches(unit.text, selfHelpCliches).map((match) => ({
      evidence: match.text,
      label: match.text,
      range: { start: match.start, end: match.end }
    })),
  family: "phrases",
  formatMessage: (report) =>
    `Self-help cliche found: "${report.evidence}". Replace it with a specific claim.`,
  ignoredAncestorTypes: ["Link", "LinkReference"],
  ruleId: "phrases:self-help-cliches",
  unitKind: "str"
});

export default rule;
