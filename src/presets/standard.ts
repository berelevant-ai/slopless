import { everything } from "./everything.js";
import { narrativeSlopRules } from "../registries/narrative-slop.js";

// The default preset. Narrative-slop rules judge fiction craft (named
// feelings, beat cadence, perception density) and fire on ordinary reporting
// and on classic prose, so they are opt-in: `slopless --narrative` or
// `"preset-slopless": { "emotion-telling": {} }` (textlint ignores `true` for a
// rule whose preset default is false; an options object enables it).
export { everything };

export const narrativeRuleIds: readonly string[] =
  Object.keys(narrativeSlopRules);

export const standard = {
  rules: Object.fromEntries(
    Object.entries(everything.rules).map(([id, enabled]) => [
      id,
      narrativeRuleIds.includes(id) ? false : enabled
    ])
  ) as Record<keyof typeof everything.rules, boolean>
};
