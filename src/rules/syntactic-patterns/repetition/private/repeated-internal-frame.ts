import { splitSentences } from "../../../../shared/text/sentences.js";
import { wordTokens } from "../../../../shared/text/tokens.js";

const MODALS = new Set([
  "can",
  "could",
  "may",
  "might",
  "must",
  "should",
  "will",
  "would"
]);
const MAX_MODAL_INDEX = 4;

export type RepeatedInternalFrameMatch = {
  readonly end: number;
  readonly frame: string;
  readonly start: number;
};

function internalFrame(sentence: string): string | undefined {
  if (
    sentence.includes("`") ||
    sentence.trimStart().startsWith('"') ||
    sentence.trimStart().startsWith("'")
  ) {
    return undefined;
  }

  const tokens = wordTokens(sentence);
  for (
    let index = 1;
    index <= Math.min(MAX_MODAL_INDEX, tokens.length - 3);
    index += 1
  ) {
    const modal = tokens[index];
    const modifier = tokens[index + 1];
    if (
      modal !== undefined &&
      modifier !== undefined &&
      MODALS.has(modal.normalized) &&
      modifier.normalized === "still"
    ) {
      return `${modal.normalized} still`;
    }
  }

  return undefined;
}

export function findRepeatedInternalFrames(
  text: string
): RepeatedInternalFrameMatch[] {
  const sentences = splitSentences(text);
  const matches: RepeatedInternalFrameMatch[] = [];

  for (let index = 0; index <= sentences.length - 3; index += 1) {
    const first = sentences[index];
    const second = sentences[index + 1];
    const third = sentences[index + 2];
    if (first === undefined || second === undefined || third === undefined) {
      continue;
    }

    const frame = internalFrame(first.text);
    if (
      frame === undefined ||
      frame !== internalFrame(second.text) ||
      frame !== internalFrame(third.text)
    ) {
      continue;
    }

    matches.push({ end: third.end, frame, start: first.start });
  }

  return matches;
}
