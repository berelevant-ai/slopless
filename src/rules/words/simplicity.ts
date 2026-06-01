import simplicityPairs from "./data/simplicity-pairs.json" with { type: "json" };
import { defineTextlintRule } from "../../adapters/textlint/rule.js";
import { paragraphUnits } from "../../adapters/textlint/units.js";
import { wordTokens } from "../../shared/text/tokens.js";
import type { RuleDetection, RuleId, TextUnit } from "../types.js";

const RULE_ID = "words:simplicity" satisfies RuleId;
const GROUP = "complex word";
const MAX_PARAGRAPH_TOKENS = 90;
const MAX_WINDOW_TOKENS = 65;
const MIN_HITS = 2;
const WINDOW_SENTENCES = 4;

// A single complex word is not slop; one "numerous" or "utilize" is ordinary.
// Flag only when complex diction clusters, which is what makes prose feel dense.
const COMPLEX_WORDS = new Set<string>(
  simplicityPairs
    .map((pair) => pair[0])
    .filter((word): word is string => word !== undefined)
);

type SimplicityGroup = typeof GROUP;

function complexDetections(unit: TextUnit): RuleDetection<SimplicityGroup>[] {
  return wordTokens(unit.text)
    .filter((token) => COMPLEX_WORDS.has(token.normalized))
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
    detect: ({ units }) => units.flatMap((unit) => complexDetections(unit)),
    family: "words",
    id: RULE_ID
  },
  formatMessage: (report) => {
    const labels = [...new Set(report.detections.map((hit) => hit.label))];
    return `Complex word density: ${report.detections.length} complex words in a short span (${labels.join(", ")}). Prefer simpler wording.`;
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
