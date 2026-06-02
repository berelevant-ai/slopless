import { defineTextlintRule } from "../../adapters/textlint/rule.js";
import { documentUnit } from "../../adapters/textlint/units.js";
import { ERROR_SEVERITY } from "../../reporting/density.js";
import type { RuleId } from "../types.js";
import { wordTokens } from "../../shared/text/tokens.js";

// The rule only detects occurrences of "actually" - one detection per use, no counting,
// rate, or severity. The density-rate report policy below lets the reporter judge the
// occurrences against the document word count and decide none / warning / error.
// "actually" is a normal contrastive adverb at low frequency; AI overuse shows up as
// density, which is the reporter's concern, not the detector's. See src/reporting/density.ts.
const TARGET = "actually";
const RULE_ID = "words:actually-overuse" satisfies RuleId;

const rule = defineTextlintRule({
  detector: {
    detect: ({ units }) =>
      units.flatMap((unit) =>
        wordTokens(unit.text)
          .filter((token) => token.normalized === TARGET)
          .map((token) => ({
            evidence: TARGET,
            label: TARGET,
            range: { end: token.end, start: token.start },
            ruleId: RULE_ID,
            unitId: unit.id
          }))
      ),
    family: "words",
    id: RULE_ID
  },
  formatMessage: (report) => {
    const count = report.metric?.["count"] ?? report.detections.length;
    const perUnit = report.metric?.["perUnit"] ?? 0;
    const threshold =
      report.severity === ERROR_SEVERITY
        ? "above the 2-per-1,000-word error threshold"
        : "above the 1-per-1,000-word warning threshold";

    return `"actually" used ${count} times (${perUnit} per 1,000 words), ${threshold}. Cut the filler uses; keep at most about one per 1,000 words.`;
  },
  reportPolicy: {
    errorPerUnit: 2,
    kind: "density-rate",
    minimumOccurrences: 2,
    scope: "document",
    warningPerUnit: 1,
    wordsPerUnit: 1000
  },
  units: (document) => [documentUnit(document)]
});

export default rule;
