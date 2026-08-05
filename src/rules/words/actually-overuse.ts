import { defineTextlintRule } from "../../adapters/textlint/rule.js";
import { documentUnit } from "../../adapters/textlint/units.js";
import type { RuleId } from "../types.js";
import { wordTokens } from "../../shared/text/tokens.js";

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
  formatMessage: () =>
    '"actually" is repeated in this document. Keep one necessary use and remove the filler uses.',
  reportPolicy: {
    kind: "threshold",
    minimum: 1,
    scope: "document"
  },
  units: (document) => [documentUnit(document)]
});

export default rule;
