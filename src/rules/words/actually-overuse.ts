import { wordTokens } from "../../shared/text/tokens.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";

// "actually" is a normal contrastive / corrective adverb at low frequency, so a flat ban
// produced thousands of false positives on human and AI prose alike. What distinguishes AI
// overuse is density: a handful per thousand words. This rule is document-scoped and rate-
// based - it never flags a single use, warns above one per 1,000 words, and errors above
// two per 1,000 words.
const TARGET = "actually";
const WORDS_PER_UNIT = 1000;
const WARNING_PER_UNIT = 1;
const ERROR_PER_UNIT = 2;
const MIN_OCCURRENCES = 2;
const WARNING_SEVERITY = 1;
const ERROR_SEVERITY = 2;

const rule = oneToOneRule({
  detect: (unit) => {
    const tokens = wordTokens(unit.text);
    const words = tokens.length;
    const hits = tokens.filter((token) => token.normalized === TARGET);
    const count = hits.length;
    const first = hits[0];

    if (count < MIN_OCCURRENCES || words === 0 || first === undefined) {
      return [];
    }

    const perUnit = (count * WORDS_PER_UNIT) / words;
    if (perUnit <= WARNING_PER_UNIT) {
      return [];
    }

    const severity =
      perUnit > ERROR_PER_UNIT ? ERROR_SEVERITY : WARNING_SEVERITY;

    return [
      {
        data: {
          count,
          perThousand: Math.round(perUnit * 10) / 10,
          severity
        },
        evidence: TARGET,
        label: TARGET,
        range: { start: first.start, end: first.end }
      }
    ];
  },
  family: "words",
  formatMessage: (report) => {
    const data = report.detections[0]?.data ?? {};
    const count = data["count"];
    const perThousand = data["perThousand"];
    const threshold =
      data["severity"] === ERROR_SEVERITY
        ? "above the 2-per-1,000-word error threshold"
        : "above the 1-per-1,000-word warning threshold";

    return `"actually" used ${count} times (${perThousand} per 1,000 words), ${threshold}. Cut the filler uses; keep at most about one per 1,000 words.`;
  },
  ruleId: "words:actually-overuse",
  unitKind: "document"
});

export default rule;
