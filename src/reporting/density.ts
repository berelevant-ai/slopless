// Density calculation used by the reporter to judge raw detections. Rules emit occurrences
// only; the reporter hands the occurrence count and the unit word count here, and this
// module decides whether the density is acceptable, a warning, or an error. It has no rule
// or textlint knowledge so it stays reusable and unit-testable on its own.

export const WARNING_SEVERITY = 1;
export const ERROR_SEVERITY = 2;

export type RateThresholds = {
  readonly errorPerUnit: number;
  readonly minimumOccurrences: number;
  readonly warningPerUnit: number;
  readonly wordsPerUnit: number;
};

export type RateVerdict = {
  readonly perUnit: number;
  readonly severity: number;
};

// Occurrences per `wordsPerUnit` words. Below the warning rate (or below the minimum count)
// there is no finding; above the error rate it is an error; otherwise a warning. A single
// occurrence never fires when minimumOccurrences is 2 or more.
export function rateVerdict(
  occurrences: number,
  words: number,
  thresholds: RateThresholds
): RateVerdict | undefined {
  if (occurrences < thresholds.minimumOccurrences || words <= 0) {
    return undefined;
  }

  const perUnit = (occurrences * thresholds.wordsPerUnit) / words;
  if (perUnit <= thresholds.warningPerUnit) {
    return undefined;
  }

  return {
    perUnit,
    severity:
      perUnit > thresholds.errorPerUnit ? ERROR_SEVERITY : WARNING_SEVERITY
  };
}
