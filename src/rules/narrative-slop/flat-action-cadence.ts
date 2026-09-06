import { defineTextlintRule } from "../../adapters/textlint/rule.js";
import { paragraphUnits } from "../../adapters/textlint/units.js";
import { actionOccurrences } from "./private/subject-action-cadence.js";

export default defineTextlintRule({
  detector: {
    id: "narrative-slop:flat-action-cadence",
    family: "narrative-slop",
    detect: ({ units, ruleId }) =>
      units.flatMap((unit) =>
        actionOccurrences(unit.text).map((occurrence) => ({
          ...occurrence,
          evidence: unit.text.slice(
            occurrence.range.start,
            occurrence.range.end
          ),
          ruleId,
          unitId: unit.id
        }))
      )
  },
  units: (document) => paragraphUnits(document),
  reportPolicy: {
    kind: "sequence",
    tiers: [
      { groups: ["action", "weak-action"], minimum: 3, window: 4, severity: 1 },
      {
        groups: ["weak-action", "linking"],
        minimum: 3,
        window: 3,
        severity: 2,
        minimumByGroup: { "weak-action": 2 }
      }
    ]
  },
  formatMessage: (report) =>
    `Repetitive action rhythm: ${report.detections.length} nearby clauses repeat subject-first structure (${report.detections.map((hit) => hit.label).join("; ")}). Review whether the repeated structure serves the passage.`
});
