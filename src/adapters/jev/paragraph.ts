import type { RuleDetection, RuleId, TextUnit } from "../../rules/types.js";
import { validateScores } from "./client.js";
import { loadJevPrompt } from "./prompt.js";
import type { JevPrompt } from "./prompt.js";
import type { JevCheck, JevClient, JevInput, JevQuestion } from "./types.js";

function paragraphQuestion(
  check: JevCheck,
  unit: TextUnit,
  prompt: JevPrompt
): JevQuestion {
  const question = prompt.question.instructions;
  return {
    ...prompt.question,
    instructions: {
      question: question
        .replaceAll(" Rulebook: state.instructions.", "")
        .replaceAll("state.instructions", "the supplied instructions")
        .replaceAll("state.types", "the supplied rulebook")
        .replaceAll("in state", "in this question"),
      instructions: prompt.shared,
      rulebook: prompt.definition,
      target: "state.paragraph.text",
      ...(check.heading === true && unit.heading !== undefined
        ? { heading: unit.heading }
        : {})
    }
  };
}

export async function detectParagraphChecks(
  checks: readonly JevCheck[],
  client: JevClient,
  units: readonly TextUnit[],
  signal: AbortSignal
): Promise<ReadonlyMap<RuleId, readonly RuleDetection[]>> {
  const groups = Map.groupBy(
    checks.map((check) => ({ check, prompt: loadJevPrompt(check) })),
    ({ check }) => check.model
  );
  const jobs = units
    .filter((unit) => unit.kind === "paragraph")
    .flatMap((unit) =>
      [...groups].map(async ([model, group]) => {
        signal.throwIfAborted();
        const input: JevInput = {
          input: "paragraph",
          model,
          paragraph: { id: unit.id, text: unit.text },
          questions: Object.fromEntries(
            group.map(({ check, prompt }) => [
              check.id,
              paragraphQuestion(check, unit, prompt)
            ])
          )
        };
        const scores = await client.judge(input, signal);
        signal.throwIfAborted();
        validateScores(input, scores);
        return group
          .map(({ check }) => check)
          .filter((check) => (scores[check.id] ?? -1) >= check.threshold)
          .map((check): RuleDetection => ({
            ruleId: check.id,
            unitId: unit.id,
            range: { start: 0, end: unit.text.length },
            label: check.name,
            evidence: unit.text
          }));
      })
    );
  const detections = (await Promise.all(jobs)).flat();
  return Map.groupBy(detections, (item) => item.ruleId);
}
