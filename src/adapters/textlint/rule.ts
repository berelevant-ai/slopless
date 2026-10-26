import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleContext, TextlintRuleModule } from "@textlint/types";
import { emitTextlintReports } from "./report.js";
import type { TextUnit } from "../../rules/types.js";
import type { RuleDefinition } from "../../reporting/types.js";
import { reportsForPolicy } from "../../reporting/reports.js";

type TextlintUnitProvider<Options extends object> = (
  document: TxtDocumentNode,
  context: Readonly<TextlintRuleContext>,
  options: Readonly<Options> | undefined
) => readonly TextUnit[];

type TextlintRuleDefinition<Options extends object> =
  RuleDefinition<Options> & {
    readonly units: TextlintUnitProvider<Options>;
    readonly signal?: AbortSignal;
  };

export function defineTextlintRule<
  Options extends object = Record<string, never>
>(definition: TextlintRuleDefinition<Options>): TextlintRuleModule<Options> {
  return (context, options) => {
    const { Syntax } = context;

    return {
      async [Syntax.Document](document: TxtDocumentNode): Promise<void> {
        const signal = definition.signal ?? new AbortController().signal;
        signal.throwIfAborted();
        const units = definition.units(document, context, options);
        const unitsById = new Map(units.map((unit) => [unit.id, unit]));
        const detections = await definition.detector.detect(
          {
            options,
            ruleId: definition.detector.id,
            units
          },
          signal
        );
        signal.throwIfAborted();
        for (const detection of detections) {
          const unit = unitsById.get(detection.unitId);
          if (
            unit === undefined ||
            detection.ruleId !== definition.detector.id ||
            !Number.isSafeInteger(detection.range.start) ||
            !Number.isSafeInteger(detection.range.end) ||
            detection.range.start < 0 ||
            detection.range.end < detection.range.start ||
            detection.range.end > unit.text.length
          ) {
            throw new Error(
              `Invalid detection from ${definition.detector.id}.`
            );
          }
        }
        const reports = reportsForPolicy(
          units,
          detections,
          definition.reportPolicy,
          definition.formatMessage
        );

        emitTextlintReports(context, unitsById, reports);
      }
    };
  };
}
