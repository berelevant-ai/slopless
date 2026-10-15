import nlp from "compromise";
import type { TokenTemplatePattern } from "../../../../shared/matchers/phrases.js";
import { wordTokens } from "../../../../shared/text/tokens.js";
import { subjectBefore } from "../../../../shared/text/subject-before.js";
import type { LocalDetection } from "../../../private/textlint-rule-builders.js";
import { DISCOURSE_SUBJECT_HEADS } from "./discourse-vocabulary.js";
import {
  clauseEndsAfter,
  frameDetection,
  frameMatches
} from "./frame-matches.js";

const SUBJECTS = new Set([
  ...DISCOURSE_SUBJECT_HEADS,
  "distinction",
  "assumption",
  "argument",
  "premise",
  "sentence"
]);
const SUBJECT_FORMS = new Set(
  [...SUBJECTS].flatMap((subject) => {
    const noun = nlp(subject);
    noun.tag("Noun");
    return [subject, noun.nouns().toPlural().text()];
  })
);
const STRUCTURAL_MATERIALS = new Set([
  "steel",
  "concrete",
  "wood",
  "wooden",
  "timber",
  "masonry",
  "brick",
  "stone",
  "metal",
  "aluminum",
  "iron",
  "structural",
  "staircase"
]);
const STRUCTURAL_HEADS = new Set([
  "frame",
  "frames",
  "step",
  "steps",
  "layer",
  "layers"
]);
const PATTERN: TokenTemplatePattern = {
  id: "importance-frame",
  templates: [
    "{link} {importance}",
    "{link} {modifier} {importance}",
    "will {modifier} be {importance}",
    "has {modifier} been {importance}",
    "have {modifier} been {importance}",
    "{does} the heavy lifting",
    "{contracted} {importance}",
    "{contracted} {modifier} {importance}"
  ],
  slots: {
    link: [
      "is",
      "are",
      "was",
      "were",
      "remains",
      "remain",
      "became",
      "becomes",
      "will be",
      "has been",
      "have been"
    ],
    modifier: ["quietly", "silently", "still", "now", "already", "really"],
    importance: [
      "load-bearing",
      "doing real work",
      "doing the real work",
      "doing the heavy lifting"
    ],
    does: ["does", "do", "did"],
    contracted: [...SUBJECTS].map((subject) => `${subject}'s`)
  }
};

export function findImportanceFrames(text: string): readonly LocalDetection[] {
  const lower = text.toLocaleLowerCase("en");
  if (!["bearing", "work", "lifting"].some((word) => lower.includes(word)))
    return [];
  return frameMatches(text, [PATTERN]).flatMap((match) => {
    const contracted = wordTokens(match.text)[0];
    const isContracted = contracted?.normalized.endsWith("'s") === true;
    if (
      isContracted &&
      !clauseEndsAfter(text, match.end) &&
      (nlp(text.slice(match.end)).match("^#Noun").found ||
        nlp(text.slice(match.end)).match("^#Adjective+ #Noun").found)
    )
      return [];
    const subject = subjectBefore(
      text,
      isContracted ? match.start + contracted.end : match.start
    );
    if (subject === undefined || !SUBJECT_FORMS.has(subject.head)) return [];
    if (
      STRUCTURAL_HEADS.has(subject.head) &&
      wordTokens(subject.text).some((word) =>
        STRUCTURAL_MATERIALS.has(word.normalized)
      )
    )
      return [];
    const rangeStart = subject.start;
    if (
      [...text.slice(rangeStart, match.end)].some((character) =>
        ['"', "\u201c", "\u201d"].includes(character)
      )
    )
      return [];
    return [frameDetection(text, rangeStart, match.end, PATTERN.id)];
  });
}
