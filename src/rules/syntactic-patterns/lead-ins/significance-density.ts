import { splitSentences } from "../../../shared/text/sentences.js";
import { type Token, wordTokens } from "../../../shared/text/tokens.js";
import { isWhitespace } from "../../../shared/text/whitespace.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

// Document-level significance signposting. A single "Notably," or "It's worth noting
// that" is legitimate (technical and academic writing use them), so this is NOT a
// per-instance flag. The slop tic is sprinkling several across a short piece: AI prose
// does this constantly, technical prose almost never (0% of 600 PEP/MDN/RFC docs reach
// the threshold; ~90% of synthetic marketing slop does). Fires once per document when
// there are enough sentence-initial significance markers AND they are dense enough.
const MARKERS: readonly (readonly string[])[] = [
  ["notably"],
  ["importantly"],
  ["crucially"],
  ["significantly"],
  ["interestingly"],
  ["remarkably"],
  ["curiously"],
  ["tellingly"],
  ["strikingly"],
  ["worth", "noting"],
  ["it's", "worth", "noting"],
  ["it", "is", "worth", "noting"],
  ["it's", "important", "to", "note"],
  ["it", "is", "important", "to", "note"],
  ["it's", "important", "to", "remember"],
  ["it", "is", "important", "to", "remember"],
  ["it", "bears", "mentioning"]
];
const MINIMUM_COUNT = 3;
const MINIMUM_RATE_PER_1000 = 3;

function markerLength(tokens: readonly Token[]): number {
  for (const marker of MARKERS) {
    if (marker.every((word, index) => tokens[index]?.normalized === word)) {
      return marker.length;
    }
  }

  return 0;
}

function countWords(text: string): number {
  let count = 0;
  let inWord = false;
  for (const character of text) {
    if (isWhitespace(character)) {
      inWord = false;
    } else if (!inWord) {
      count += 1;
      inWord = true;
    }
  }

  return count;
}

const rule = oneToOneRule({
  detect: (unit) => {
    const hits: { end: number; start: number }[] = [];
    for (const sentence of splitSentences(unit.text)) {
      const tokens = wordTokens(sentence.text);
      const length = markerLength(tokens);
      if (length === 0) {
        continue;
      }

      const first = tokens[0];
      const last = tokens[length - 1];
      if (first === undefined || last === undefined) {
        continue;
      }

      hits.push({
        end: sentence.start + last.end,
        start: sentence.start + first.start
      });
    }

    const words = countWords(unit.text);
    const rate = words === 0 ? 0 : (hits.length * 1000) / words;
    const firstHit = hits[0];
    if (
      hits.length < MINIMUM_COUNT ||
      rate < MINIMUM_RATE_PER_1000 ||
      firstHit === undefined
    ) {
      return [];
    }

    return [
      {
        evidence: `${hits.length} significance signposts in ${words} words`,
        label: "significance-signposting",
        range: { end: firstHit.end, start: firstHit.start }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Significance signposting density: ${report.evidence}. Cut the signposting and lead with the point.`,
  ruleId: "syntactic-patterns:significance-density",
  unitKind: "document"
});

export default rule;
