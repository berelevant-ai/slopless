import { tokens } from "./prose-patterns.js";

const TECHNICAL_REVERSAL_TOKENS = new Set([
  "api",
  "cache",
  "canonical",
  "endpoint",
  "export",
  "html",
  "invoice",
  "job",
  "key",
  "list",
  "locale",
  "log",
  "logs",
  "offset",
  "parser",
  "request",
  "response",
  "server",
  "socket",
  "systemd",
  "token",
  "utc",
  "worker"
]);
const CORRECTION_TOKENS = new Set([
  "actuator",
  "amber",
  "audit",
  "api",
  "cancelled",
  "closed",
  "code",
  "delayed",
  "diabetic",
  "endpoint",
  "exit",
  "export",
  "hypertensive",
  "invoice",
  "package",
  "patient",
  "red",
  "sensor",
  "server",
  "systemd",
  "valve"
]);
const AUTHORITY_CONCRETE_TOKENS = new Set([
  "assigned",
  "cancel",
  "cancels",
  "crawler",
  "falls",
  "february",
  "improved",
  "load",
  "ownership",
  "pricing",
  "recurring",
  "saw",
  "status"
]);
// Tokens that mark a sentence as an implementation summary rather than a
// frame. Ordinary nouns that also carry marketing and editorial slop (body,
// key, page, source, table, numbers, contract, audit, checklist, slide) are
// deliberately absent: "The lesson here is clear: the body of the page
// matters." is a wrapper, not a summary.
const IMPLEMENTATION_SUMMARY_TOKENS = new Set([
  "api",
  "authentication",
  "cache",
  "batteries",
  "database",
  "export",
  "flags",
  "inhaler",
  "invoice",
  "fuse",
  "motor",
  "locale",
  "microscope",
  "nurse",
  "offsets",
  "parser",
  "rotate",
  "rpm",
  "repayment",
  "signing",
  "staging",
  "token",
  "tokens",
  "voltage"
]);
const MEDICAL_PLACE_TOKENS = new Set(["inhaler", "nurse"]);
const CONCRETE_INVENTORY_HEADS = new Set(["dose", "patch", "rule", "test"]);
const DETERMINERS = new Set(["a", "an", "the", "this", "that"]);
const SUMMARY_CONNECTORS = new Set(["because", "that", "when", "where", "why"]);

function hasDigit(text: string): boolean {
  for (const character of text) {
    if (character >= "0" && character <= "9") {
      return true;
    }
  }

  return false;
}

function containsToken(
  source: readonly string[],
  candidates: ReadonlySet<string>
): boolean {
  return source.some((token) => candidates.has(token));
}

export function hasConcreteTechnicalToken(text: string): boolean {
  const words = tokens(text);
  return containsToken(words, TECHNICAL_REVERSAL_TOKENS);
}

// One correction token is not enough ("It's not about the code. It's about
// the craft."); two, or one with a number, mark a factual correction.
export function hasConcreteCorrectionEvidence(text: string): boolean {
  const words = tokens(text);
  const count = words.filter((word) => CORRECTION_TOKENS.has(word)).length;
  return count >= 2 || (count >= 1 && hasDigit(text));
}

export function hasConcreteAuthorityEvidence(text: string): boolean {
  const words = tokens(text);
  return containsToken(words, AUTHORITY_CONCRETE_TOKENS);
}

// Structural concreteness: a passive location ("documented in the rollback
// checklist"). A colon payoff does not count: "the fun part is: ..." is
// still a frame, and a possessive is not evidence either ("Google's own
// requirements offer a useful corrective." is a frame).
const LOCATION_PASSIVES = new Set([
  "defined",
  "described",
  "documented",
  "listed",
  "recorded",
  "specified",
  "stored",
  "tracked"
]);
const LOCATION_LINKS = new Set(["at", "in", "on", "under"]);

function hasPassiveLocation(words: readonly string[]): boolean {
  return words.some(
    (word, index) =>
      LOCATION_PASSIVES.has(word) && LOCATION_LINKS.has(words[index + 1] ?? "")
  );
}

export function hasConcreteImplementationSummary(text: string): boolean {
  const words = tokens(text);
  return (
    hasDigit(text) ||
    hasPassiveLocation(words) ||
    containsToken(words, MEDICAL_PLACE_TOKENS) ||
    containsToken(words, IMPLEMENTATION_SUMMARY_TOKENS) ||
    (containsToken(words, AUTHORITY_CONCRETE_TOKENS) &&
      words.some((word) => SUMMARY_CONNECTORS.has(word)))
  );
}

export function hasConcreteCausalSummary(text: string): boolean {
  const words = tokens(text);
  return (
    text.includes(":") &&
    (hasDigit(text) ||
      containsToken(words, IMPLEMENTATION_SUMMARY_TOKENS) ||
      containsToken(words, AUTHORITY_CONCRETE_TOKENS))
  );
}

function subjectHead(sentence: string): string | undefined {
  const words = tokens(sentence);
  const end = words.findIndex((word) =>
    ["changes", "does", "gets", "is", "matters", "still", "works"].includes(
      word
    )
  );
  const subject = end < 0 ? words : words.slice(0, end);

  for (let index = subject.length - 1; index >= 0; index -= 1) {
    const word = subject[index];
    if (word !== undefined && !DETERMINERS.has(word)) {
      return word;
    }
  }

  return undefined;
}

export function hasConcreteInventorySubjects(
  sentences: readonly string[]
): boolean {
  const heads = sentences
    .map((sentence) => subjectHead(sentence))
    .filter((head): head is string => head !== undefined);

  return (
    heads.length >= 3 &&
    heads.every((head) => CONCRETE_INVENTORY_HEADS.has(head))
  );
}
