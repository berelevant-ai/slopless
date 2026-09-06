import type { RuleDetection, TextUnit } from "../rules/types.js";
import type { RuleReport, ReportSeverity, SequenceTier } from "./types.js";

type Match = { detections: RuleDetection[]; severity: ReportSeverity };

function matches(
  detections: readonly RuleDetection[],
  tier: SequenceTier
): Match[] {
  const eligible = detections.filter(
    (hit) =>
      hit.ordinal !== undefined &&
      hit.group !== undefined &&
      tier.groups.includes(hit.group)
  );
  return eligible.flatMap((first) => {
    const hits = eligible.filter(
      (hit) =>
        (hit.ordinal ?? -1) >= (first.ordinal ?? 0) &&
        (hit.ordinal ?? 0) < (first.ordinal ?? 0) + tier.window
    );
    if (
      hits.length < tier.minimum ||
      Object.entries(tier.minimumByGroup ?? {}).some(
        ([group, count]) =>
          hits.filter((hit) => hit.group === group).length < count
      )
    )
      return [];
    return [{ detections: hits, severity: tier.severity }];
  });
}

export function sequenceReports(
  unit: TextUnit,
  detections: readonly RuleDetection[],
  tiers: readonly SequenceTier[],
  formatMessage: (report: RuleReport) => string
): RuleReport[] {
  const candidates = tiers
    .flatMap((tier) => matches(detections, tier))
    .sort(
      (a, b) =>
        (a.detections[0]?.range.start ?? 0) -
        (b.detections[0]?.range.start ?? 0)
    );
  const merged: Match[] = [];
  for (const match of candidates) {
    const previous = merged.at(-1);
    const start = match.detections[0]?.range.start;
    const end = previous?.detections.at(-1)?.range.end;
    if (
      previous !== undefined &&
      start !== undefined &&
      end !== undefined &&
      start < end
    ) {
      previous.detections = [
        ...new Set([...previous.detections, ...match.detections])
      ].sort((a, b) => a.range.start - b.range.start);
      previous.severity =
        previous.severity === 2 || match.severity === 2 ? 2 : 1;
    } else merged.push(match);
  }
  return merged.flatMap((match) => {
    const first = match.detections[0];
    const last = match.detections.at(-1);
    if (first === undefined || last === undefined) return [];
    const range = { start: first.range.start, end: last.range.end };
    const report: RuleReport = {
      detections: match.detections,
      evidence: unit.text.slice(range.start, range.end),
      message: "",
      range: unit.sourceRangeFor(range),
      ruleId: first.ruleId,
      unitId: unit.id,
      severity: match.severity
    };
    return [{ ...report, message: formatMessage(report) }];
  });
}
