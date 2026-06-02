import type { TxtNode } from "@textlint/ast-node-types";
import type { TextlintRuleContext } from "@textlint/types";
import type { TextUnit } from "../../rules/types.js";
import type { RuleDetection, RuleId, SourceRange } from "../../rules/types.js";
import { textUnitForNode } from "./units.js";
import type { RuleReport } from "../../reporting/types.js";
import { oneToOneReports } from "../../reporting/reports.js";

export function emitTextlintReport(
  context: Readonly<TextlintRuleContext>,
  unitsById: ReadonlyMap<string, TextUnit>,
  report: RuleReport
): void {
  const unit = unitsById.get(report.unitId);
  if (unit === undefined) {
    return;
  }

  const padding =
    report.range.start === report.range.end
      ? context.locator.at(report.range.start)
      : context.locator.range([report.range.start, report.range.end]);

  // textlint reads a per-report severity only from a plain reported object, not from a
  // RuleError instance (kernel: `ruleReportedObject.severity || error`). A rule that needs
  // a warning tier sets detection.data.severity (1 = warning, 2 = error); everything else
  // keeps the default error severity via RuleError.
  const severity = report.detections[0]?.data?.["severity"];
  if (typeof severity === "number") {
    context.report(unit.node, { message: report.message, padding, severity });
    return;
  }

  context.report(
    unit.node,
    new context.RuleError(report.message, {
      padding
    })
  );
}

export function emitTextlintReports(
  context: Readonly<TextlintRuleContext>,
  unitsById: ReadonlyMap<string, TextUnit>,
  reports: readonly RuleReport[]
): void {
  for (const report of reports) {
    emitTextlintReport(context, unitsById, report);
  }
}

type TextlintDetectionInput = {
  readonly data?: Readonly<Record<string, boolean | number | string>>;
  readonly evidence: string;
  readonly label: string;
  readonly message: string;
  readonly range: SourceRange;
  readonly ruleId: RuleId;
  readonly unit: TextUnit;
};

type TextlintFindingInput = {
  readonly data?: Readonly<Record<string, boolean | number | string>>;
  readonly evidence?: string;
  readonly label?: string;
  readonly message: string;
  readonly node: TxtNode;
  readonly range: SourceRange;
  readonly ruleId: RuleId;
};

type TextlintNodeFindingInput = {
  readonly message: string;
  readonly node: TxtNode;
  readonly ruleId: RuleId;
};

export function emitTextlintDetection(
  context: Readonly<TextlintRuleContext>,
  input: TextlintDetectionInput
): void {
  const detection: RuleDetection = {
    evidence: input.evidence,
    label: input.label,
    range: input.range,
    ruleId: input.ruleId,
    unitId: input.unit.id
  };
  if (input.data !== undefined) {
    Object.assign(detection, { data: input.data });
  }

  emitTextlintReports(
    context,
    new Map([[input.unit.id, input.unit]]),
    oneToOneReports([detection], () => input.message)
  );
}

export function emitTextlintFinding(
  context: Readonly<TextlintRuleContext>,
  input: TextlintFindingInput
): void {
  const evidence = input.evidence ?? input.message;
  emitTextlintDetection(context, {
    ...(input.data === undefined ? {} : { data: input.data }),
    evidence,
    label: input.label ?? input.ruleId,
    message: input.message,
    range: input.range,
    ruleId: input.ruleId,
    unit: textUnitForNode("finding", "text", input.node, evidence)
  });
}

export function emitTextlintNodeFinding(
  context: Readonly<TextlintRuleContext>,
  input: TextlintNodeFindingInput
): void {
  context.report(input.node, new context.RuleError(input.message));
}
