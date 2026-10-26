import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleContext, TextlintRuleModule } from "@textlint/types";
import { defineTextlintRule } from "../textlint/rule.js";
import { rawParagraphUnits, textUnitForNode } from "../textlint/units.js";
import type { RuleDetection, TextUnit } from "../../rules/types.js";
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

async function detect(
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
    const document = check.input === "text" && offset === 0;
    const size = document ? 15 : 16;
    batches.push({ units: paragraphs.slice(offset, offset + size), document });
    offset += size;
  }
  const answers = await Promise.all(
    batches.map(async (batch) => {
      const questions: Record<string, JevQuestion> = {};
      for (const unit of batch.units) {
        questions[unit.id] =
          check.input === "text"
            ? {
                instructions:
                  check.locationQuestion?.instructions.replaceAll(
                    "{paragraph}",
                    unit.id
                  ) ?? "",
                yes: check.locationQuestion?.yes ?? "",
                no: check.locationQuestion?.no ?? ""
              }
            : {
                ...prompt.question,
                instructions: `${prompt.question.instructions}\nThe target is paragraph ${unit.id} in state.paragraphs. Include its supplied heading when relevant; other targets are independent.`
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
      const input: JevInput =
        check.input === "text"
          ? {
              ...common,
              input: "text",
              text: units.find((unit) => unit.kind === "document")?.text ?? "",
              paragraphs: context
            }
          : {
              ...common,
              input: "paragraph",
              paragraphs: context.filter((p) =>
                batch.units.some((u) => u.id === p.id)
              )
            };
      const scores = await client.judge(input, signal);
      signal.throwIfAborted();
      validateScores(input, scores);
      return scores;
    })
  );
  const scores = Object.assign({}, ...answers) as Record<string, number>;
  if (check.input === "text" && (scores["document"] ?? -1) < check.threshold)
    return [];
  const cutoff =
    check.input === "text" ? check.paragraphThreshold : check.threshold;
  const selected = paragraphs.filter(
    (unit) => (scores[unit.id] ?? -1) >= cutoff
  );
  if (check.input === "text" && selected.length === 0) {
    throw new Error(
      `${check.id}: positive document decision has no paragraph location.`
    );
  }
  return selected.map((unit) => detection(unit, check));
}

export function createJevRule(
  check: JevCheck,
  client: JevClient,
  signal: AbortSignal
): TextlintRuleModule {
  const prompt = loadJevPrompt(check);
  return defineTextlintRule({
    detector: {
      id: check.id,
      family: check.family,
      detect: async ({ units }, currentSignal) =>
        detect(check, client, units, currentSignal, prompt)
    },
    units: rawUnits,
    formatMessage: () =>
      `${check.name.replaceAll("-", " ")}: ${prompt.description}`,
    reportPolicy: { kind: "one-to-one" },
    signal
  });
}
