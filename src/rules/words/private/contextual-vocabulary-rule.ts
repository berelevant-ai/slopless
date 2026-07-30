import type { TextlintRuleModule } from "@textlint/types";
import { defineTextlintRule } from "../../../adapters/textlint/rule.js";
import { paragraphUnits } from "../../../adapters/textlint/units.js";
import { splitSentences } from "../../../shared/text/sentences.js";
import { wordTokens } from "../../../shared/text/tokens.js";
import type { RuleId } from "../../types.js";
import { isVocabularyContextAllowed } from "./vocabulary-context.js";

type ContextualVocabularyRuleConfig = {
  readonly description: string;
  readonly minimumHits: number;
  readonly ruleId: RuleId;
  readonly words: ReadonlySet<string>;
};

function contextAt(text: string, start: number): string {
  return (
    splitSentences(text).find(
      (sentence) => start >= sentence.start && start < sentence.end
    )?.text ?? text
  );
}

export function defineContextualVocabularyRule(
  config: ContextualVocabularyRuleConfig
): TextlintRuleModule<Record<string, never>> {
  return defineTextlintRule({
    detector: {
      detect: ({ units }) =>
        units.flatMap((unit) =>
          wordTokens(unit.text)
            .filter(
              (token) =>
                config.words.has(token.normalized) &&
                !isVocabularyContextAllowed(
                  contextAt(unit.text, token.start),
                  token.normalized
                )
            )
            .map((token) => ({
              evidence: unit.text.slice(token.start, token.end),
              group: "llm vocabulary",
              label: token.normalized,
              range: { end: token.end, start: token.start },
              ruleId: config.ruleId,
              unitId: unit.id
            }))
        ),
      family: "words",
      id: config.ruleId
    },
    formatMessage: (report) => {
      const labels = [
        ...new Set(report.detections.map((detection) => detection.label))
      ];
      return `${config.description}: ${report.detections.length} contextual stock words in a short span (${labels.join(", ")}). Replace stock wording with concrete language.`;
    },
    reportPolicy: {
      groups: ["llm vocabulary"],
      kind: "density",
      maxParagraphTokens: 90,
      maxWindowTokens: 65,
      paragraphMinimumHits: config.minimumHits,
      windowMinimumHits: config.minimumHits,
      windowSentences: 4
    },
    units: (document) => paragraphUnits(document)
  });
}
