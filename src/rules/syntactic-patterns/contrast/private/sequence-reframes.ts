import { matchAudienceReplacement } from "./audience-replacement.js";
import { matchNegativeConsequence } from "./negative-consequence.js";
import { matchTemporalReframe } from "./temporal-reframe.js";

export function matchSequenceReframe(
  first: string,
  second: string,
  third?: string
): string | undefined {
  return (
    matchTemporalReframe(first, second) ??
    matchAudienceReplacement(first, second) ??
    matchNegativeConsequence(first, second, third)
  );
}
