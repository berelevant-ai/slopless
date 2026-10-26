import type { RuleFamilyId, RuleId } from "../rules/types.js";
import { academicSlopRules } from "./academic-slop.js";
import { metricRules } from "./metrics.js";
import { narrativeSlopRules } from "./narrative-slop.js";
import { orthographyRules } from "./orthography.js";
import { phraseRules } from "./phrases.js";
import { semanticThinnessRules } from "./semantic-thinness.js";
import { syntacticPatternRules } from "./syntactic-patterns.js";
import { termPolicyRules } from "./term-policy.js";
import { wordRules } from "./words.js";

const groups: readonly (readonly [
  RuleFamilyId,
  Readonly<Record<string, RegisteredRule>>
])[] = [
  ["academic-slop", academicSlopRules],
  ["metrics", metricRules],
  ["narrative-slop", narrativeSlopRules],
  ["orthography", orthographyRules],
  ["phrases", phraseRules],
  ["semantic-thinness", semanticThinnessRules],
  ["syntactic-patterns", syntacticPatternRules],
  ["term-policy", termPolicyRules],
  ["words", wordRules]
];

export const rules = {
  ...academicSlopRules,
  ...metricRules,
  ...narrativeSlopRules,
  ...orthographyRules,
  ...phraseRules,
  ...semanticThinnessRules,
  ...syntacticPatternRules,
  ...termPolicyRules,
  ...wordRules
};

type RegisteredRule = (typeof rules)[keyof typeof rules];

export const deterministicChecks: ReadonlyMap<RuleId, RegisteredRule> = new Map(
  groups.flatMap(([family, entries]) =>
    Object.entries(entries).map(([name, rule]): [RuleId, RegisteredRule] => [
      `${family}:${name}`,
      rule
    ])
  )
);
