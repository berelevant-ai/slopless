import seoFiller from "./data/seo-filler.json" with { type: "json" };
import { findUnquotedPhraseMatches } from "../../shared/matchers/phrases.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";

const rule = oneToOneRule({
  detect: (unit) =>
    findUnquotedPhraseMatches(unit.text, seoFiller).map((match) => ({
      evidence: match.text,
      label: match.text,
      range: { start: match.start, end: match.end }
    })),
  family: "phrases",
  formatMessage: (report) =>
    `SEO filler found: "${report.evidence}". Cut the filler and lead with the specific point.`,
  ignoredAncestorTypes: ["Link", "LinkReference"],
  ruleId: "phrases:seo-filler",
  unitKind: "str"
});

export default rule;
