import type { JevCheck, JevQuestion } from "../adapters/jev/types.js";
import type { RuleFamilyId } from "../rules/types.js";

const locationQuestions: Readonly<Record<string, JevQuestion>> = {
  "repeated-explanation": {
    instructions:
      "Does paragraph {paragraph} contain the earlier explanation or its unnecessary repetition? Select both parts. Exclude background, neighboring context, useful recaps and distinct applications.",
    yes: "Required part of the repeated explanation.",
    no: "Unrelated, useful context only, or no defect."
  },
  "buried-answer": {
    instructions:
      "Does paragraph {paragraph} contain unnecessary material delaying the operative answer?",
    yes: "Unnecessary detour.",
    no: "Answer or useful context."
  }
};

function checks(
  family: RuleFamilyId,
  version: string,
  names: readonly string[],
  thresholds: Readonly<Record<string, number>> = {}
): JevCheck[] {
  return names.map((name) => ({
    id: `${family}:${name}`,
    family,
    name,
    input:
      name === "buried-answer" || name === "repeated-explanation"
        ? "text"
        : "paragraph",
    model: "jev-1.13.0",
    threshold: thresholds[name] ?? 0.5,
    paragraphThreshold: 0.5,
    promptVersion: version,
    heading: name === "redundancy" || name === "unnecessary-framing",
    ...(locationQuestions[name] === undefined
      ? {}
      : { locationQuestion: locationQuestions[name] })
  }));
}

export const jevChecks: readonly JevCheck[] = [
  ...checks("semantic-thinness", "v2", [
    "circular-explanation",
    "unspecified-scope"
  ]),
  ...checks("semantic-thinness", "v3", [
    "missing-actor",
    "unexplained-metaphor"
  ]),
  ...checks("semantic-thinness", "v4", ["generic-realization"]),
  ...checks("semantic-thinness", "v5", ["unspecified-change"]),
  ...checks("semantic-thinness", "v6", ["unspecified-relationship"]),
  ...checks("semantic-thinness", "v7", ["hollow-significance"]),
  ...checks("semantic-thinness", "v8", ["empty-takeaway"]),
  ...checks("puffery-and-overstatement", "v10", [
    "inflated-evaluation",
    "sweeping-generalization"
  ]),
  ...checks("unsupported-authority", "v11", [
    "prestige-padding",
    "vague-attribution"
  ]),
  ...checks("staged-contrasts", "v12", ["staged-opposition"]),
  ...checks("boilerplate-and-signposting", "v13", [
    "buried-answer",
    "unnecessary-framing"
  ]),
  ...checks("wordiness-and-redundancy", "v16", [
    "wordiness",
    "redundancy",
    "repeated-explanation"
  ]),
  ...checks("stock-wording-and-jargon", "v17", [
    "borrowed-jargon",
    "cliche",
    "hidden-significance-adverb",
    "stock-vocabulary",
    "tortured-phrasing"
  ]),
  ...checks("excessive-hedging", "v18", ["hedge-stacking"]),
  ...checks("rhythm-and-repetition", "v19", [
    "flat-action-cadence",
    "formal-transition-density",
    "fragment-stacking",
    "repeated-predicate-end",
    "sentence-frame-repetition",
    "triple-word-repeat",
    "word-repetition"
  ]),
  ...checks(
    "narrative-craft",
    "v21",
    [
      "abstract-personification-line",
      "body-action-density",
      "body-emotion-shorthand",
      "emotion-as-substance",
      "emotion-telling",
      "empty-atmosphere-shift",
      "empty-beat",
      "empty-emotional-weather",
      "empty-scene-state",
      "fake-timestamps",
      "fixed-metaphor-frame",
      "gaze-choreography",
      "low-information-beat-density",
      "low-information-physical-blocking",
      "narrative-cliches",
      "perception-verb-density",
      "sensory-instead-of-frame",
      "silence-as-actor",
      "summary-fog-transition"
    ],
    {
      "abstract-personification-line": 0.58,
      "body-action-density": 0.56,
      "empty-beat": 0.47,
      "fake-timestamps": 0.63,
      "gaze-choreography": 0.34,
      "narrative-cliches": 0.6,
      "perception-verb-density": 0.51,
      "silence-as-actor": 0.39
    }
  ),
  ...checks(
    "generated-residue",
    "v22",
    ["artifact-placeholders", "llm-disclaimer", "response-wrapper"],
    { "response-wrapper": 0.55 }
  )
];
