import type { RuleFamilyId, RuleId } from "../../rules/types.js";

export type JevParagraph = {
  readonly id: string;
  readonly text: string;
  readonly heading?: string;
};

export type JevQuestionInstructions = {
  readonly question: string;
  readonly instructions: string;
  readonly rulebook: string;
  readonly target: string;
  readonly heading?: string;
};

export type JevQuestion = {
  readonly instructions: string | JevQuestionInstructions;
} & (
  | { readonly yes: string; readonly no: string }
  | { readonly yes?: never; readonly no?: never }
);

export type JevInput = {
  readonly model: string;
  readonly questions: Readonly<Record<string, JevQuestion>>;
} & (
  | { readonly input: "paragraph"; readonly paragraph: JevParagraph }
  | {
      readonly input: "text";
      readonly text: string;
      readonly paragraphs: readonly JevParagraph[];
      readonly instructions: string;
    }
);

export type JevScores = Readonly<Record<string, number>>;

export type JevClient = {
  readonly judge: (input: JevInput, signal: AbortSignal) => Promise<JevScores>;
};

export type JevCheck = {
  readonly id: RuleId;
  readonly family: RuleFamilyId;
  readonly input: "paragraph" | "text";
  readonly model: string;
  readonly threshold: number;
  readonly paragraphThreshold: number;
  readonly promptVersion: string;
  readonly name: string;
  readonly heading?: boolean;
  readonly locationQuestion?: JevQuestion & { readonly instructions: string };
};
