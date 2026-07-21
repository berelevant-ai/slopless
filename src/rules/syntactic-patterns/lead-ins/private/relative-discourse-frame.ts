import { tokens } from "../../../../shared/matchers/prose-patterns.js";

const DETERMINERS = new Set(["a", "an", "the", "this", "that"]);
const RELATIVE_FRAME_MODIFIERS = new Set([
  "central",
  "clearest",
  "core",
  "important",
  "main",
  "practical",
  "real",
  "simple",
  "useful"
]);
const RELATIVE_HELPER_VERBS = new Set([
  "helped",
  "helps",
  "mattered",
  "matters",
  "worked",
  "works"
]);
const RELATIVE_USEFULNESS_ADJECTIVES = new Set([
  "actionable",
  "better",
  "clear",
  "easier",
  "effective",
  "helpful",
  "practical",
  "reliable",
  "useful",
  "valuable"
]);
const RELATIVE_EVALUATIONS = new Set([
  "clear",
  "consistent",
  "predictable",
  "repeatable",
  "simple",
  "straightforward",
  "useful"
]);
const RELATIVE_FRAME_HEADS = new Set([
  "answer",
  "approach",
  "claim",
  "detail",
  "evidence",
  "factor",
  "feature",
  "fix",
  "focus",
  "idea",
  "lesson",
  "method",
  "move",
  "plan",
  "point",
  "process",
  "question",
  "result",
  "review",
  "rule",
  "signal",
  "solution",
  "step",
  "strategy",
  "thing",
  "way"
]);

function relativeFrameHeadIndex(words: readonly string[]): number {
  if (!DETERMINERS.has(words[0] ?? "")) {
    return -1;
  }
  if (RELATIVE_FRAME_HEADS.has(words[1] ?? "")) {
    return 1;
  }
  return RELATIVE_FRAME_MODIFIERS.has(words[1] ?? "") &&
    RELATIVE_FRAME_HEADS.has(words[2] ?? "")
    ? 2
    : -1;
}

function matchRelativeHelperFrame(
  text: string,
  words: readonly string[],
  headIndex: number
): string | undefined {
  const helperIndex = headIndex + 2;
  const colonIndex = text.indexOf(":");
  if (
    words[headIndex + 1] !== "that" ||
    !RELATIVE_HELPER_VERBS.has(words[helperIndex] ?? "") ||
    colonIndex < 0 ||
    tokens(text.slice(0, colonIndex)).length !== helperIndex + 1
  ) {
    return undefined;
  }

  return `relative-${words[helperIndex] ?? "helps"}-frame`;
}

function matchRelativeUsefulnessFrame(
  words: readonly string[],
  headIndex: number
): string | undefined {
  const makesIndex = headIndex + 2;
  if (
    words[headIndex + 1] !== "that" ||
    !["made", "makes"].includes(words[makesIndex] ?? "")
  ) {
    return undefined;
  }

  const usefulnessIndex = words.findIndex(
    (word, index) =>
      index > makesIndex + 1 &&
      index <= makesIndex + 6 &&
      RELATIVE_USEFULNESS_ADJECTIVES.has(word)
  );
  const evaluationIndex = usefulnessIndex + 2;

  return usefulnessIndex > 0 &&
    ["are", "is", "was", "were"].includes(words[usefulnessIndex + 1] ?? "") &&
    RELATIVE_EVALUATIONS.has(words[evaluationIndex] ?? "") &&
    words.length === evaluationIndex + 1
    ? "relative-makes-useful-evaluation"
    : undefined;
}

export function matchRelativeDiscourseFrame(
  text: string,
  words: readonly string[]
): string | undefined {
  const headIndex = relativeFrameHeadIndex(words);
  if (headIndex < 0) {
    return undefined;
  }

  return (
    matchRelativeHelperFrame(text, words, headIndex) ??
    matchRelativeUsefulnessFrame(words, headIndex)
  );
}
