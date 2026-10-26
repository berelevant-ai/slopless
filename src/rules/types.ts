import type { AnyTxtNode } from "@textlint/ast-node-types";

export type RuleFamilyId =
  | "academic-slop"
  | "boilerplate-and-signposting"
  | "excessive-hedging"
  | "generated-residue"
  | "markdown-layout"
  | "metrics"
  | "narrative-slop"
  | "narrative-craft"
  | "orthography"
  | "phrases"
  | "semantic-thinness"
  | "puffery-and-overstatement"
  | "rhythm-and-repetition"
  | "staged-contrasts"
  | "stock-wording-and-jargon"
  | "syntactic-patterns"
  | "term-policy"
  | "unsupported-authority"
  | "wordiness-and-redundancy"
  | "words";

export type RuleId = `${RuleFamilyId}:${string}`;

export type TextUnitKind =
  "document" | "heading" | "paragraph" | "sentence" | "text";

export type SourceRange = {
  readonly end: number;
  readonly start: number;
};

export type TextUnit = {
  readonly heading?: string;
  readonly id: string;
  readonly kind: TextUnitKind;
  readonly node: AnyTxtNode;
  readonly normalizedText: string;
  readonly range: SourceRange;
  readonly sourceRangeFor: (range: SourceRange) => SourceRange;
  readonly text: string;
};

export type RuleInput<Options = unknown> = {
  readonly options: Options | undefined;
  readonly ruleId: RuleId;
  readonly units: readonly TextUnit[];
};

export type RuleDetection<Group extends string = string> = {
  readonly ordinal?: number;
  readonly data?: Readonly<Record<string, boolean | number | string>>;
  readonly evidence: string;
  readonly group?: Group;
  readonly label: string;
  readonly range: SourceRange;
  readonly ruleId: RuleId;
  readonly unitId: string;
};

export type RuleDetector<Options = unknown> = {
  readonly detect: (
    input: RuleInput<Options>,
    signal: AbortSignal
  ) => readonly RuleDetection[] | Promise<readonly RuleDetection[]>;
  readonly family: RuleFamilyId;
  readonly id: RuleId;
};
