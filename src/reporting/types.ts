import type {
  RuleDetection,
  RuleDetector,
  RuleId,
  SourceRange
} from "../rules/types.js";

export type Detection<Group extends string = string> = {
  readonly end: number;
  readonly group: Group;
  readonly label: string;
  readonly start: number;
};

export type DensityMatch<Group extends string = string> = {
  readonly count: number;
  readonly end: number;
  readonly group: Group;
  readonly labels: readonly string[];
  readonly start: number;
};

export type ReportSeverity = 1 | 2;

export type SequenceTier = {
  readonly groups: readonly string[];
  readonly minimum: number;
  readonly window: number;
  readonly severity: ReportSeverity;
  readonly minimumByGroup?: Readonly<Record<string, number>>;
};

export type ReportPolicy =
  | { readonly kind: "sequence"; readonly tiers: readonly SequenceTier[] }
  | {
      readonly kind: "one-to-one";
      readonly severity?: ReportSeverity;
    }
  | {
      readonly groups: readonly string[];
      readonly kind: "density";
      readonly maxParagraphTokens: number;
      readonly maxWindowTokens: number;
      readonly paragraphMinimumHits: number;
      readonly windowMinimumHits: number;
      readonly windowSentences: number;
    }
  | {
      readonly kind: "threshold";
      readonly minimum: number;
      readonly scope: "document" | "paragraph" | "sentence";
    }
  | {
      readonly errorPerUnit: number;
      readonly kind: "density-rate";
      readonly minimumOccurrences: number;
      readonly scope: "document";
      readonly warningPerUnit: number;
      readonly wordsPerUnit: number;
    };

export type RuleReport = {
  readonly detections: readonly RuleDetection[];
  readonly evidence: string;
  readonly message: string;
  // Set by the reporter for policies that compute a measurement (e.g. density-rate); the
  // rule's formatMessage reads it to describe the finding. Detection logic never sets it.
  readonly metric?: Readonly<Record<string, number>>;
  readonly range: SourceRange;
  readonly ruleId: RuleId;
  // Set by the reporter when a policy judges the finding's level (1 = warning, 2 = error).
  // Absent means the default error severity.
  readonly severity?: ReportSeverity;
  readonly unitId: string;
};

export type RuleDefinition<Options = unknown> = {
  readonly detector: RuleDetector<Options>;
  readonly formatMessage: (report: RuleReport) => string;
  readonly reportPolicy: ReportPolicy;
};
