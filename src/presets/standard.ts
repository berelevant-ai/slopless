import { everything } from "./everything.js";
import { narrativeSlopRules } from "../registries/narrative-slop.js";

// The default preset. Narrative-slop rules judge fiction craft (named
// feelings, beat cadence, perception density) and fire on ordinary reporting
// and on classic prose, so they are opt-in: `slopless --narrative` or
// `"preset-slopless": { "emotion-telling": {} }` (textlint ignores `true` for a
// rule whose preset default is false; an options object enables it).
export { everything };

type RuleId = keyof typeof everything.rules;

function isRuleId(id: string): id is RuleId {
  return id in everything.rules;
}

export const narrativeRuleIds: readonly RuleId[] =
  Object.keys(narrativeSlopRules).filter(isRuleId);

const rules: Record<RuleId, boolean> = { ...everything.rules };
for (const id of narrativeRuleIds) {
  rules[id] = false;
}

export const standard = { rules };
