import { tokens } from "../../../../shared/matchers/prose-patterns.js";
import { normalizeForMatch } from "../../../../shared/text/normalize.js";

const COPULAS = new Set(["are", "is", "was", "were"]);
const DETERMINERS = new Set(["a", "an", "the"]);
const ACTOR_ROLES = new Set([
  "agent",
  "analyst",
  "author",
  "creator",
  "editor",
  "model",
  "producer",
  "researcher",
  "writer"
]);
const WRITING_ROLES = new Set([
  "author",
  "creator",
  "editor",
  "producer",
  "writer"
]);
const COMPONENT_HEADS = new Set([
  "basis",
  "context",
  "goal",
  "input",
  "material",
  "output",
  "source"
]);
const WRITING_MATERIALS = new Set([
  "article",
  "brief",
  "content",
  "copy",
  "draft",
  "evidence",
  "findings",
  "interviews",
  "notes",
  "recommendation",
  "report",
  "research",
  "transcript"
]);
const EXPLANATION_WORDS = new Set([
  "although",
  "because",
  "if",
  "since",
  "so",
  "therefore",
  "unless",
  "when",
  "where",
  "which",
  "while",
  "who"
]);
const DETAIL_PREPOSITIONS = new Set([
  "after",
  "at",
  "before",
  "by",
  "from",
  "in",
  "into",
  "of",
  "on",
  "through",
  "to",
  "under",
  "with"
]);
const TECHNICAL_LABELS = new Set([
  "array",
  "bytes",
  "classifier",
  "csv",
  "event",
  "file",
  "image",
  "interface",
  "json",
  "object",
  "request",
  "response",
  "schema",
  "service",
  "string",
  "tensor",
  "vector"
]);

type Assignment = {
  readonly complement: readonly string[];
  readonly subject: readonly string[];
};

function withoutDeterminer(words: readonly string[]): readonly string[] {
  return DETERMINERS.has(words[0] ?? "") ? words.slice(1) : words;
}

function trimTerminalPunctuation(text: string): string {
  let end = text.length;
  while (end > 0 && [".", "!", "?"].includes(text[end - 1] ?? "")) {
    end -= 1;
  }
  return text.slice(0, end);
}

function hasTechnicalSyntax(text: string): boolean {
  const blockedCharacters = new Set([
    "`",
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    "=",
    "<",
    ">",
    "/",
    "\\"
  ]);

  for (const character of text) {
    if (
      blockedCharacters.has(character) ||
      (character >= "0" && character <= "9")
    ) {
      return true;
    }
  }

  return false;
}

function parseNormalizedAssignment(normalized: string): Assignment | undefined {
  if (normalized.length === 0 || hasTechnicalSyntax(normalized)) {
    return undefined;
  }

  const words = tokens(normalized);
  const copulaIndex = words.findIndex((word) => COPULAS.has(word));
  if (
    copulaIndex < 1 ||
    copulaIndex > 3 ||
    words.length - copulaIndex - 1 < 1 ||
    words.length - copulaIndex - 1 > 4
  ) {
    return undefined;
  }

  const subject = withoutDeterminer(words.slice(0, copulaIndex));
  const complement = withoutDeterminer(words.slice(copulaIndex + 1));
  const blocked = [...subject, ...complement].some(
    (word) => EXPLANATION_WORDS.has(word) || DETAIL_PREPOSITIONS.has(word)
  );

  return subject.length === 0 || complement.length === 0 || blocked
    ? undefined
    : { complement, subject };
}

function assignmentClauseCandidates(clause: string): readonly string[] {
  const normalized = trimTerminalPunctuation(normalizeForMatch(clause));
  const candidates = [normalized];
  const delimiterIndexes = [
    normalized.indexOf(","),
    normalized.indexOf(";"),
    normalized.indexOf(" - "),
    normalized.indexOf(" \u2013 "),
    normalized.indexOf(" \u2014 ")
  ].filter((index) => index > 0);
  const firstDelimiter = Math.min(...delimiterIndexes);

  if (Number.isFinite(firstDelimiter)) {
    candidates.push(normalized.slice(0, firstDelimiter).trim());
  }

  return candidates;
}

function parseAssignment(clause: string): Assignment | undefined {
  for (const candidate of assignmentClauseCandidates(clause)) {
    const assignment = parseNormalizedAssignment(candidate);
    if (assignment !== undefined) {
      return assignment;
    }
  }

  return undefined;
}

function isActorAssignment(assignment: Assignment): boolean {
  const subjectHead = assignment.subject.at(-1) ?? "";
  const complementHead = assignment.complement.at(-1) ?? "";

  return ACTOR_ROLES.has(subjectHead) && ACTOR_ROLES.has(complementHead);
}

function isComponentAssignment(assignment: Assignment): boolean {
  const subjectHead = assignment.subject.at(-1) ?? "";
  return COMPONENT_HEADS.has(subjectHead);
}

function hasWritingContext(actor: Assignment, component: Assignment): boolean {
  const actorWords = [...actor.subject, ...actor.complement];
  const componentHead = component.complement.at(-1) ?? "";

  return (
    actorWords.some((word) => WRITING_ROLES.has(word)) ||
    WRITING_MATERIALS.has(componentHead)
  );
}

function isTechnicalInterface(
  actor: Assignment,
  component: Assignment
): boolean {
  return [...actor.complement, ...component.complement].some((word) =>
    TECHNICAL_LABELS.has(word)
  );
}

function splitClauses(text: string): readonly [string, string] | undefined {
  const normalized = normalizeForMatch(text);
  const separators: number[] = [];

  for (let index = 0; index < normalized.length; index += 1) {
    const character = normalized[index] ?? "";
    const isPunctuationSeparator = character === "," || character === ";";
    const isSpacedDash =
      ["-", "\u2013", "\u2014"].includes(character) &&
      (normalized[index - 1] ?? "").trim() === "" &&
      (normalized[index + 1] ?? "").trim() === "";

    if (isPunctuationSeparator || isSpacedDash) {
      separators.push(index);
    }
  }

  if (separators.length !== 1) {
    return undefined;
  }

  const separator = separators[0] ?? -1;
  const first = normalized.slice(0, separator).trim();
  const second = normalized.slice(separator + 1).trim();

  return first.length > 0 && second.length > 0 ? [first, second] : undefined;
}

export function matchComponentAssignmentFrame(
  first: string,
  second?: string
): string | undefined {
  const pair = second === undefined ? splitClauses(first) : [first, second];
  if (pair === undefined) {
    return undefined;
  }

  const firstAssignment = parseAssignment(pair[0]);
  const secondAssignment = parseAssignment(pair[1]);
  if (firstAssignment === undefined || secondAssignment === undefined) {
    return undefined;
  }

  const actor = isActorAssignment(firstAssignment)
    ? firstAssignment
    : isActorAssignment(secondAssignment)
      ? secondAssignment
      : undefined;
  const component = isComponentAssignment(firstAssignment)
    ? firstAssignment
    : isComponentAssignment(secondAssignment)
      ? secondAssignment
      : undefined;

  return actor !== undefined &&
    component !== undefined &&
    actor !== component &&
    hasWritingContext(actor, component) &&
    !isTechnicalInterface(actor, component)
    ? "component-assignment-frame"
    : undefined;
}
