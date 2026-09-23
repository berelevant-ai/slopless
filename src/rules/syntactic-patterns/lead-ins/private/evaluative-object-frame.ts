import nlp from "compromise";

// "Google's own requirements offer a useful corrective." / "Our client's
// experience left me with a simple priority." The evaluative frame noun sits
// at the end of the sentence as the object of a handing verb, and the payoff
// is deferred to the next sentence. Subject-position frames ("the simple
// priority is ...") are handled by the discourse evaluation matchers.
const HANDING_VERBS = new Set([
  "bring",
  "brings",
  "brought",
  "gave",
  "give",
  "gives",
  "hand",
  "handed",
  "hands",
  "leave",
  "leaves",
  "left",
  "offer",
  "offered",
  "offers",
  "provide",
  "provided",
  "provides",
  "suggest",
  "suggested",
  "suggests",
  "taught",
  "teach",
  "teaches"
]);
const OBJECT_DETERMINERS = new Set(["a", "an", "one"]);
const FRAME_ADJECTIVES = new Set([
  "basic",
  "better",
  "clear",
  "clearer",
  "clean",
  "cleaner",
  "durable",
  "instructive",
  "lasting",
  "sharper",
  "welcome",
  "different",
  "hard",
  "harder",
  "helpful",
  "honest",
  "important",
  "obvious",
  "practical",
  "real",
  "simple",
  "simpler",
  "small",
  "sobering",
  "useful",
  "valuable"
]);
const FRAME_NOUNS = new Set([
  "answer",
  "check",
  "corrective",
  "filter",
  "frame",
  "heuristic",
  "lens",
  "lesson",
  "priority",
  "principle",
  "question",
  "reminder",
  "rule",
  "signal",
  "takeaway",
  "test",
  "truth",
  "way"
]);
const MAX_WORDS = 16;

// Any adjective qualifies ("a sobering reminder", "a sharper filter"); the
// list covers evaluative words that Compromise tags as nouns or verbs.
function isAdjective(adjective: string, noun: string): boolean {
  if (FRAME_ADJECTIVES.has(adjective)) {
    return true;
  }
  const term = nlp(`a ${adjective} ${noun}`).termList()[1];
  return term?.tags?.has("Adjective") === true;
}

export function matchEvaluativeObjectFrame(
  words: readonly string[]
): string | undefined {
  const noun = words.at(-1);
  const adjective = words.at(-2);
  const determiner = words.at(-3);

  return words.length >= 5 &&
    words.length <= MAX_WORDS &&
    noun !== undefined &&
    adjective !== undefined &&
    determiner !== undefined &&
    OBJECT_DETERMINERS.has(determiner) &&
    FRAME_NOUNS.has(noun) &&
    isAdjective(adjective, noun) &&
    words.slice(0, -3).some((word) => HANDING_VERBS.has(word))
    ? `evaluative-object-${adjective}-${noun}`
    : undefined;
}
