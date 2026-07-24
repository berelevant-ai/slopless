import type { TextlintRuleModule } from "@textlint/types";
import { defineTextlintRule } from "../../../adapters/textlint/rule.js";
import { documentUnit } from "../../../adapters/textlint/units.js";
import type { RuleReport } from "../../../reporting/types.js";
import { wordTokens } from "../../../shared/text/tokens.js";
import type { RuleId } from "../../types.js";

type ExactTokenDensityRuleConfig = {
  readonly errorPerUnit: number;
  readonly formatMessage: (report: RuleReport) => string;
  readonly minimumOccurrences: number;
  readonly ruleId: RuleId;
  readonly target: string;
  readonly warningPerUnit: number;
  readonly wordsPerUnit: number;
};

export function defineExactTokenDensityRule(
  config: ExactTokenDensityRuleConfig
): TextlintRuleModule<Record<string, never>> {
  return defineTextlintRule({
    detector: {
      detect: ({ units }) =>
        units.flatMap((unit) =>
          wordTokens(unit.text)
            .filter((token) => token.normalized === config.target)
            .map((token) => ({
              evidence: config.target,
              label: config.target,
              range: { end: token.end, start: token.start },
              ruleId: config.ruleId,
              unitId: unit.id
            }))
        ),
      family: "words",
      id: config.ruleId
    },
    formatMessage: config.formatMessage,
    reportPolicy: {
      errorPerUnit: config.errorPerUnit,
      kind: "density-rate",
      minimumOccurrences: config.minimumOccurrences,
      scope: "document",
      warningPerUnit: config.warningPerUnit,
      wordsPerUnit: config.wordsPerUnit
    },
    units: (document) => [documentUnit(document)]
  });
}
