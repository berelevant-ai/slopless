import { ERROR_SEVERITY } from "../../reporting/density.js";
import type { RuleId } from "../types.js";
import { defineExactTokenDensityRule } from "./private/token-density-rule.js";

const TARGET = "quietly";
const RULE_ID = "words:quietly-overuse" satisfies RuleId;

const rule = defineExactTokenDensityRule({
  errorPerUnit: 2,
  formatMessage: (report) => {
    const count = report.metric?.["count"] ?? report.detections.length;
    const perUnit = report.metric?.["perUnit"] ?? 0;
    const threshold =
      report.severity === ERROR_SEVERITY
        ? "above the 2-per-1,000-word error threshold"
        : "above the 1-per-1,000-word warning threshold";

    return `"quietly" used ${count} times (${perUnit} per 1,000 words), ${threshold}. Cut the filler uses; keep at most about one per 1,000 words.`;
  },
  minimumOccurrences: 4,
  ruleId: RULE_ID,
  target: TARGET,
  warningPerUnit: 1,
  wordsPerUnit: 1000
});

export default rule;
