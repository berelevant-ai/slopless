export { matchReactionFrame } from "./reaction-frame.js";

const ABSTRACT_FRAME_VERBS = ["is", "are", "was", "were"];
const DISCOURSE_WORK_TAILS = [
  ["doing", "real", "work"],
  ["load", "bearing"]
] as const;
const DETERMINERS = new Set(["a", "an", "the", "this", "that"]);
const DEICTIC_OPENERS = new Set(["here", "this", "that"]);
const DEICTIC_CONTRACTIONS = new Map([
  ["here's", "here"],
  ["this's", "this"],
  ["that's", "that"]
]);
const DEICTIC_EVALUATIVE_ADJECTIVES = new Set([
  "best",
  "better",
  "biggest",
  "central",
  "core",
  "crucial",
  "funny",
  "good",
  "great",
  "hard",
  "important",
  "interesting",
  "key",
  "main",
  "neat",
  "nice",
  "odd",
  "obvious",
  "remarkable",
  "strange",
  "surprising",
  "tricky",
  "useful",
  "weird",
  "wild"
]);
const DEICTIC_DISCOURSE_NOUNS = new Set([
  "angle",
  "aspect",
  "bit",
  "catch",
  "detail",
  "element",
  "idea",
  "part",
  "piece",
  "point",
  "thing",
  "twist"
]);
const FRAME_ADJECTIVES = new Set([
  "basic",
  "best",
  "better",
  "biggest",
  "bigger",
  "central",
  "clearest",
  "core",
  "easiest",
  "final",
  "first",
  "hardest",
  "honest",
  "important",
  "main",
  "only",
  "obvious",
  "practical",
  "real",
  "simple",
  "useful"
]);
const FRAME_NOUNS = new Set([
  "answer",
  "approach",
  "audit",
  "challenge",
  "choice",
  "conclusion",
  "diagnosis",
  "fact",
  "fix",
  "focus",
  "frame",
  "idea",
  "lesson",
  "move",
  "path",
  "point",
  "principle",
  "priority",
  "problem",
  "question",
  "result",
  "rule",
  "shift",
  "signal",
  "strategy",
  "test",
  "thing",
  "tradeoff",
  "truth",
  "version",
  "way",
  "win"
]);
const VAGUE_FRAME_VERBS = new Set(["begins", "happens", "lives", "starts"]);
const VAGUE_FRAME_LOCATIONS = new Set([
  "downstream",
  "earlier",
  "here",
  "there",
  "upstream"
]);
const EVALUATION_TAILS = new Set([
  "boring",
  "clear",
  "different",
  "easy",
  "enough",
  "expensive",
  "hard",
  "important",
  "practical",
  "precise",
  "right",
  "simple",
  "straightforward",
  "useful",
  "useless",
  "worse",
  "wrong"
]);
const DISCOURSE_SUBJECT_HEADS = new Set([
  "advice",
  "answer",
  "approach",
  "challenge",
  "choice",
  "claim",
  "conclusion",
  "decision",
  "diagnosis",
  "direction",
  "fact",
  "fix",
  "focus",
  "frame",
  "idea",
  "layer",
  "issue",
  "job",
  "judgment",
  "lesson",
  "method",
  "mistake",
  "move",
  "option",
  "plan",
  "point",
  "policy",
  "problem",
  "question",
  "response",
  "result",
  "rule",
  "shift",
  "signal",
  "solution",
  "step",
  "strategy",
  "tactic",
  "takeaway",
  "test",
  "tradeoff",
  "truth",
  "verdict",
  "version",
  "way",
  "work"
]);

function isDiscourseEvaluationSubject(
  first: string | undefined,
  subject: readonly string[]
): boolean {
  if (first === "this" || first === "that" || first === "it") {
    return true;
  }

  return subject.some((word) => DISCOURSE_SUBJECT_HEADS.has(word));
}

function matchDiscourseWorkClaim(
  words: readonly string[],
  verbIndex: number,
  subject: readonly string[]
): string | undefined {
  if (
    verbIndex <= 0 ||
    words[verbIndex] !== "is" ||
    !DISCOURSE_SUBJECT_HEADS.has(subject.at(-1) ?? "")
  ) {
    return undefined;
  }

  const tail = DISCOURSE_WORK_TAILS.find((candidate) =>
    candidate.every((word, index) => words[verbIndex + index + 1] === word)
  );

  return tail === undefined ? undefined : `is-${tail.join("-")}`;
}

function frameNounIndex(words: readonly string[]): number {
  if (FRAME_NOUNS.has(words[1] ?? "")) {
    return 1;
  }

  return FRAME_ADJECTIVES.has(words[1] ?? "") && FRAME_NOUNS.has(words[2] ?? "")
    ? 2
    : -1;
}

function matchWorthAttentionFrame(
  words: readonly string[]
): string | undefined {
  if (words[0] !== "the") {
    return undefined;
  }

  const nounIndex = frameNounIndex(words);
  if (nounIndex < 0 || words[nounIndex + 1] !== "worth") {
    return undefined;
  }

  const tail = words.slice(nounIndex + 2);
  const matches =
    tail[0] === "noticing" ||
    tail[0] === "watching" ||
    tail[0] === "tracking" ||
    (tail[0] === "caring" && tail[1] === "about") ||
    (tail[0] === "paying" && tail[1] === "attention" && tail[2] === "to");

  return matches
    ? `the-${words.slice(1, nounIndex + 1).join("-")}-worth-attention`
    : undefined;
}

function matchVagueFrameLocation(words: readonly string[]): string | undefined {
  const [first, adjective, noun, verb, location] = words;

  return words.length === 5 &&
    first === "the" &&
    FRAME_ADJECTIVES.has(adjective ?? "") &&
    FRAME_NOUNS.has(noun ?? "") &&
    VAGUE_FRAME_VERBS.has(verb ?? "") &&
    VAGUE_FRAME_LOCATIONS.has(location ?? "")
    ? `the-${adjective ?? "useful"}-${noun ?? "frame"}-${verb ?? "starts"}-${location ?? "here"}`
    : undefined;
}

function matchEvaluativeFrame(words: readonly string[]): string | undefined {
  const [first, adjective, noun, verb] = words;

  return first !== undefined &&
    adjective !== undefined &&
    noun !== undefined &&
    verb !== undefined &&
    DETERMINERS.has(first) &&
    FRAME_ADJECTIVES.has(adjective) &&
    FRAME_NOUNS.has(noun) &&
    ["is", "are", "was"].includes(verb)
    ? `the-${adjective}-${noun}-${verb}`
    : undefined;
}

function matchDeicticEvaluativeFrame(
  text: string,
  words: readonly string[]
): string | undefined {
  const contractedOpener = DEICTIC_CONTRACTIONS.get(words[0] ?? "");
  const opener = contractedOpener ?? words[0];
  const determinerIndex = contractedOpener === undefined ? 2 : 1;

  if (
    opener === undefined ||
    !DEICTIC_OPENERS.has(opener) ||
    (contractedOpener === undefined &&
      !["is", "was"].includes(words[1] ?? "")) ||
    !["a", "an", "the"].includes(words[determinerIndex] ?? "")
  ) {
    return undefined;
  }

  const adjective = words[determinerIndex + 1];
  const noun = words[determinerIndex + 2];
  const frame =
    adjective !== undefined && noun !== undefined
      ? words.slice(0, determinerIndex + 3).join(" ")
      : undefined;
  const boundary = frame === undefined ? undefined : text.at(frame.length);

  return adjective !== undefined &&
    noun !== undefined &&
    (boundary === undefined ||
      boundary === "." ||
      boundary === "!" ||
      boundary === "?" ||
      boundary === ":" ||
      boundary === ";" ||
      boundary === ",") &&
    DEICTIC_EVALUATIVE_ADJECTIVES.has(adjective) &&
    DEICTIC_DISCOURSE_NOUNS.has(noun)
    ? `deictic-evaluative-${opener}-${adjective}-${noun}`
    : undefined;
}

export function isAbstractAuditFrame(words: readonly string[]): boolean {
  return words[0] === "the" && frameNounIndex(words) > 0
    ? words[frameNounIndex(words)] === "audit"
    : false;
}

export function matchExpandedDiscourseFrame(
  text: string,
  words: readonly string[]
): string | undefined {
  return (
    matchDeicticEvaluativeFrame(text, words) ??
    matchWorthAttentionFrame(words) ??
    matchVagueFrameLocation(words) ??
    matchEvaluativeFrame(words)
  );
}

export function matchDiscourseEvaluationFrame(
  words: readonly string[]
): string | undefined {
  const [first] = words;
  const verbIndex = words.findIndex((word) =>
    ABSTRACT_FRAME_VERBS.includes(word)
  );
  const tail = words.at(-1);
  const subject = verbIndex > 0 ? words.slice(0, verbIndex) : [];

  const workClaim = matchDiscourseWorkClaim(words, verbIndex, subject);
  if (workClaim !== undefined) {
    return workClaim;
  }

  if (words.length > 8) {
    return undefined;
  }

  if (!["the", "this", "that", "it"].includes(first ?? "")) {
    return undefined;
  }

  return verbIndex > 0 &&
    tail !== undefined &&
    EVALUATION_TAILS.has(tail) &&
    isDiscourseEvaluationSubject(first, subject)
    ? `${first ?? "the"}-${words[verbIndex] ?? "is"}-${tail}`
    : undefined;
}
