import { defineTextlintRule } from "../../adapters/textlint/rule.js";
import { paragraphUnits } from "../../adapters/textlint/units.js";
import { wordTokens } from "../../shared/text/tokens.js";
import { isVocabularyContextAllowed } from "./private/vocabulary-context.js";
import type { RuleDetection, RuleId, TextUnit } from "../types.js";

const RULE_ID = "words:llm-vocabulary" satisfies RuleId;
const GROUP = "llm vocabulary";
const MAX_PARAGRAPH_TOKENS = 90;
const MAX_WINDOW_TOKENS = 65;
const MIN_HITS = 3;
const WINDOW_SENTENCES = 4;

// Single stock words like "comprehensive" or "moreover" are ordinary in human
// prose; flag only when stock LLM diction clusters. (Words that are slop on
// their own, e.g. "delve", are still caught per-instance by prohibited-words.)
const LLM_VOCABULARY = new Set([
  "delve",
  "vibrant",
  "landscape",
  "realm",
  "embark",
  "excels",
  "vital",
  "comprehensive",
  "intricate",
  "pivotal",
  "moreover",
  "tapestry"
]);

type VocabularyGroup = typeof GROUP;

function vocabularyDetections(
  unit: TextUnit
): RuleDetection<VocabularyGroup>[] {
  return wordTokens(unit.text)
    .filter(
      (token) =>
        LLM_VOCABULARY.has(token.normalized) &&
        !isVocabularyContextAllowed(unit.text, token.normalized)
    )
    .map((token) => ({
      evidence: unit.text.slice(token.start, token.end),
      group: GROUP,
      label: token.normalized,
      range: { end: token.end, start: token.start },
      ruleId: RULE_ID,
      unitId: unit.id
    }));
}

const rule = defineTextlintRule({
  detector: {
    detect: ({ units }) => units.flatMap((unit) => vocabularyDetections(unit)),
    family: "words",
    id: RULE_ID
  },
  formatMessage: (report) => {
    const labels = [...new Set(report.detections.map((hit) => hit.label))];
    return `LLM vocabulary density: ${report.detections.length} stock words in a short span (${labels.join(", ")}). Replace the stock diction with concrete words.`;
  },
  reportPolicy: {
    groups: [GROUP],
    kind: "density",
    maxParagraphTokens: MAX_PARAGRAPH_TOKENS,
    maxWindowTokens: MAX_WINDOW_TOKENS,
    paragraphMinimumHits: MIN_HITS,
    windowMinimumHits: MIN_HITS,
    windowSentences: WINDOW_SENTENCES
  },
  units: (document) => paragraphUnits(document)
});

export default rule;
