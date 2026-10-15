import type { Token } from "../../../shared/text/tokens.js";
import { subjectBefore } from "../../../shared/text/subject-before.js";
import hiddenSignificanceVocabulary from "../data/hidden-significance-context.json" with { type: "json" };
const AUXILIARIES = new Set(hiddenSignificanceVocabulary.auxiliaries);
const EVALUATIVE_WORDS = new Set(hiddenSignificanceVocabulary.evaluativeWords);

const EVALUATIVE_DEGREES = new Set(
  hiddenSignificanceVocabulary.evaluativeDegreeWords
);

const IMPORTANCE_SUBJECTS = new Set(
  hiddenSignificanceVocabulary.importanceMetaphorSubjects
);

export function hasEvaluativePhrase(
  text: string,
  tokens: readonly Token[],
  index: number
): boolean {
  let cursor = index + 1;
  while (
    EVALUATIVE_DEGREES.has(tokens[cursor]?.normalized ?? "") ||
    AUXILIARIES.has(tokens[cursor]?.normalized ?? "")
  )
    cursor += 1;
  const start = tokens[index]?.start;
  const end = tokens[cursor]?.end;
  return (
    start !== undefined &&
    end !== undefined &&
    ![...text.slice(start, end)].some((character) =>
      [",", ";", ":", ".", "!", "?", '"', "\u201c", "\u201d"].includes(
        character
      )
    ) &&
    EVALUATIVE_WORDS.has(tokens[cursor]?.normalized ?? "")
  );
}

export function hasImportanceMetaphor(
  text: string,
  tokens: readonly Token[],
  index: number
): boolean {
  const token = tokens[index];
  if (token === undefined) return false;
  let cursor = index + 1;
  while (AUXILIARIES.has(tokens[cursor]?.normalized ?? "")) cursor += 1;
  const after = tokens.slice(cursor).map((item) => item.normalized);
  const phrases = [
    ["load", "bearing"],
    ["doing", "the", "heavy", "lifting"],
    ["doing", "real", "work"],
    ["doing", "the", "real", "work"]
  ];
  const matches = phrases.some(
    (phrase) =>
      phrase.every((word, offset) => after[offset] === word) &&
      [...text.slice(token.end, tokens[cursor + phrase.length - 1]?.end)].every(
        (character) =>
          ![",", ";", ":", ".", "!", "?", '"', "\u201c", "\u201d"].includes(
            character
          )
      )
  );
  if (!matches) return false;
  const subject = subjectBefore(text, token.start);
  return subject !== undefined && IMPORTANCE_SUBJECTS.has(subject.head);
}
