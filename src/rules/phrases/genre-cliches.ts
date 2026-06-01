import genreCliches from "./data/genre-cliches.json" with { type: "json" };
import { findUnquotedPhraseMatches } from "../../shared/matchers/phrases.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";

const rule = oneToOneRule({
  detect: (unit) =>
    findUnquotedPhraseMatches(unit.text, genreCliches).map((match) => ({
      evidence: match.text,
      label: match.text,
      range: { start: match.start, end: match.end }
    })),
  family: "phrases",
  formatMessage: (report) =>
    `Genre cliche found: "${report.evidence}". Replace it with a concrete, specific detail.`,
  ignoredAncestorTypes: ["Link", "LinkReference"],
  ruleId: "phrases:genre-cliches",
  unitKind: "str"
});

export default rule;
