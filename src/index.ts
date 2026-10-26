import { everything, narrativeRuleIds, standard } from "./presets/standard.js";
import { rules } from "./registries/index.js";

export { rules };
export { createSlopless, listChecks } from "./runtime.js";
export type { Slopless, SloplessOptions, CheckInfo } from "./runtime.js";
export { createJevClient } from "./adapters/jev/client.js";
export type { JevClientOptions, JevReceipt } from "./adapters/jev/client.js";
export type {
  JevClient,
  JevInput,
  JevScores,
  JevQuestion,
  JevParagraph
} from "./adapters/jev/types.js";
export type { RuleId } from "./rules/types.js";

export const presets = {
  everything,
  standard
};

export { narrativeRuleIds };

export const rulesConfig = standard.rules;

export default {
  rules,
  rulesConfig
};
