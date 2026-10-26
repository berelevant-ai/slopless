import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleContext, TextlintRuleModule } from "@textlint/types";
import { defineTextlintRule } from "../textlint/rule.js";
import { rawParagraphUnits, textUnitForNode } from "../textlint/units.js";
import type { RuleDetection, RuleId, TextUnit } from "../../rules/types.js";
import type {
  JevCheck,
  JevClient,
  JevInput,
  JevParagraph,
  JevQuestion
} from "./types.js";
import { validateScores } from "./client.js";
import { loadJevPrompt } from "./prompt.js";
import type { JevPrompt } from "./prompt.js";
import { detectParagraphChecks } from "./paragraph.js";
export { jevCacheKey } from "./prompt.js";

function rawUnits(
  document: TxtDocumentNode,
  context: Readonly<TextlintRuleContext>
): readonly TextUnit[] {
  return [
    textUnitForNode(
      "document",
      "document",
      document,
      context.getSource(document)
    ),
    ...rawParagraphUnits(document, context)
  ];
}

function detection(unit: TextUnit, check: JevCheck): RuleDetection {
  return {
    ruleId: check.id,
    unitId: unit.id,
    range: { start: 0, end: unit.text.length },
    label: check.name,
    evidence: unit.text
  };
}

async function detectTextCheck(
  check: JevCheck,
  client: JevClient,
  units: readonly TextUnit[],
  signal: AbortSignal,
  prompt: JevPrompt
): Promise<readonly RuleDetection[]> {
  const paragraphs = units.filter((unit) => unit.kind === "paragraph");
  if (paragraphs.length === 0) return [];
  const context: readonly JevParagraph[] = paragraphs.map((unit) => ({
    id: unit.id,
    text: unit.text,
    ...(check.heading === true && unit.heading !== undefined
      ? { heading: unit.heading }
      : {})
  }));
  const batches: {
    readonly units: readonly TextUnit[];
    readonly document: boolean;
  }[] = [];
  let offset = 0;
  while (offset < paragraphs.length) {
    const document = offset === 0;
    const size = document ? 15 : 16;
    batches.push({ units: paragraphs.slice(offset, offset + size), document });
    offset += size;
  }
  const answers = await Promise.all(
    batches.map(async (batch) => {
      const questions: Record<string, JevQuestion> = {};
      for (const unit of batch.units) {
        questions[unit.id] = {
          instructions:
            check.locationQuestion?.instructions.replaceAll(
              "{paragraph}",
              unit.id
            ) ?? "",
          yes: check.locationQuestion?.yes ?? "",
          no: check.locationQuestion?.no ?? ""
        };
      }
      if (batch.document)
        questions["document"] = {
          ...prompt.question,
          instructions: `${prompt.question.instructions}\nTarget: state.article.`
        };
      const common = {
        model: check.model,
        instructions: prompt.instructions,
        questions
      };
      const input: JevInput = {
        ...common,
        input: "text",
        text: units.find((unit) => unit.kind === "document")?.text ?? "",
        paragraphs: context
      };
      const scores = await client.judge(input, signal);
      signal.throwIfAborted();
      validateScores(input, scores);
      return scores;
    })
  );
  const scores = Object.assign({}, ...answers) as Record<string, number>;
  if ((scores["document"] ?? -1) < check.threshold) return [];
  const selected = paragraphs.filter(
    (unit) => (scores[unit.id] ?? -1) >= check.paragraphThreshold
  );
  if (selected.length === 0) {
    throw new Error(
      `${check.id}: positive document decision has no paragraph location.`
    );
  }
  return selected.map((unit) => detection(unit, check));
}

export function createJevRules(
  checks: readonly JevCheck[],
  client: JevClient,
  signal: AbortSignal
): ReadonlyMap<RuleId, TextlintRuleModule> {
  const paragraphChecks = checks.filter((check) => check.input === "paragraph");
  const documents = new WeakMap<TxtDocumentNode, readonly TextUnit[]>();
  const pending = new WeakMap<
    readonly TextUnit[],
    Promise<ReadonlyMap<RuleId, readonly RuleDetection[]>>
  >();
  const unitsFor = (
    document: TxtDocumentNode,
    context: Readonly<TextlintRuleContext>
  ): readonly TextUnit[] => {
    let units = documents.get(document);
    if (units === undefined) {
      units = rawUnits(document, context);
      documents.set(document, units);
    }
    return units;
  };
  return new Map(
    checks.map((check) => {
      const prompt = loadJevPrompt(check);
      return [
        check.id,
        defineTextlintRule({
          detector: {
            id: check.id,
            family: check.family,
            detect: async ({ units }, currentSignal) => {
              if (check.input === "text")
                return detectTextCheck(
                  check,
                  client,
                  units,
                  currentSignal,
                  prompt
                );
              let work = pending.get(units);
              if (work === undefined) {
                work = detectParagraphChecks(
                  paragraphChecks,
                  client,
                  units,
                  currentSignal
                );
                pending.set(units, work);
              }
              return (await work).get(check.id) ?? [];
            }
          },
          units: unitsFor,
          formatMessage: () =>
            `${check.name.replaceAll("-", " ")}: ${prompt.description}`,
          reportPolicy: { kind: "one-to-one" },
          signal
        })
      ];
    })
  );
}
