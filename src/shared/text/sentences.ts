export type SplitSentence = {
  readonly end: number;
  readonly start: number;
  readonly text: string;
};

const SENTENCE_SEGMENTER = new Intl.Segmenter("en", {
  granularity: "sentence"
});

const TITLE_ABBREVIATIONS = new Set([
  "capt",
  "col",
  "dr",
  "gen",
  "lt",
  "mr",
  "mrs",
  "ms",
  "prof",
  "rev",
  "sgt",
  "sr",
  "st"
]);

function isUppercaseLetter(character: string | undefined): boolean {
  if (character === undefined) {
    return false;
  }

  const lower = character.toLocaleLowerCase("en");
  const upper = character.toLocaleUpperCase("en");

  return lower !== upper && character === upper;
}

function firstNonWhitespaceIndex(text: string): number | undefined {
  for (let index = 0; index < text.length; index += 1) {
    if (text[index]?.trim() !== "") {
      return index;
    }
  }

  return undefined;
}

function trimEndIndex(text: string): number {
  for (let index = text.length; index > 0; index -= 1) {
    if (text[index - 1]?.trim() !== "") {
      return index;
    }
  }

  return 0;
}

function precedingWord(text: string, periodIndex: number): string {
  let start = periodIndex;
  while (start > 0 && isAsciiLetter(text[start - 1])) {
    start -= 1;
  }

  return text.slice(start, periodIndex).toLocaleLowerCase("en");
}

function isAsciiLetter(character: string | undefined): boolean {
  return (
    character !== undefined &&
    ((character >= "A" && character <= "Z") ||
      (character >= "a" && character <= "z"))
  );
}

function isTitleAbbreviation(text: string, periodIndex: number): boolean {
  return TITLE_ABBREVIATIONS.has(precedingWord(text, periodIndex));
}

function endsWithTitleAbbreviation(sentence: SplitSentence): boolean {
  const periodIndex = sentence.text.length - 1;
  return (
    sentence.text[periodIndex] === "." &&
    isTitleAbbreviation(sentence.text, periodIndex)
  );
}

function endsWithPersonInitial(sentence: SplitSentence): boolean {
  const initialIndex = sentence.text.length - 2;
  if (
    sentence.text.at(-1) !== "." ||
    !isUppercaseLetter(sentence.text[initialIndex]) ||
    sentence.text[initialIndex - 1]?.trim() !== ""
  ) {
    return false;
  }

  let nameEnd = initialIndex - 1;
  while (nameEnd > 0 && sentence.text[nameEnd - 1]?.trim() === "") {
    nameEnd -= 1;
  }
  let nameStart = nameEnd;
  while (nameStart > 0 && isAsciiLetter(sentence.text[nameStart - 1])) {
    nameStart -= 1;
  }

  return (
    nameEnd - nameStart >= 2 && isUppercaseLetter(sentence.text[nameStart])
  );
}

function hasTerminalPunctuation(text: string): boolean {
  let index = text.length - 1;
  const closingCharacters = new Set(['"', "'", ")", "]", "}"]);
  while (index >= 0 && closingCharacters.has(text[index] ?? "")) {
    index -= 1;
  }

  const terminal = text[index];
  return terminal === "." || terminal === "!" || terminal === "?";
}

function pushSegment(
  sentences: SplitSentence[],
  text: string,
  start: number,
  end: number
): void {
  const raw = text.slice(start, end);
  const trimStart = firstNonWhitespaceIndex(raw);
  if (trimStart === undefined) {
    return;
  }

  const trimEnd = trimEndIndex(raw);

  sentences.push({
    end: start + trimEnd,
    start: start + trimStart,
    text: raw.slice(trimStart, trimEnd)
  });
}

function splitMissingBreakSpacing(segment: SplitSentence): SplitSentence[] {
  const sentences: SplitSentence[] = [];
  let start = 0;

  for (let index = 0; index < segment.text.length - 1; index += 1) {
    const character = segment.text[index];
    const next = segment.text[index + 1];
    if (
      (character === "." || character === "?" || character === "!") &&
      isUppercaseLetter(next) &&
      !isTitleAbbreviation(segment.text, index)
    ) {
      pushSegment(sentences, segment.text, start, index + 1);
      start = index + 1;
    }
  }

  pushSegment(sentences, segment.text, start, segment.text.length);

  return sentences.map((sentence) => ({
    end: segment.start + sentence.end,
    start: segment.start + sentence.start,
    text: sentence.text
  }));
}

function mergeTitleAbbreviationSplits(
  text: string,
  sentences: readonly SplitSentence[]
): SplitSentence[] {
  const merged: SplitSentence[] = [];

  for (let index = 0; index < sentences.length; index += 1) {
    const first = sentences[index];
    if (first === undefined) {
      continue;
    }

    let end = first.end;
    let candidate = first;
    while (
      sentences[index + 1] !== undefined &&
      (endsWithTitleAbbreviation(candidate) || endsWithPersonInitial(candidate))
    ) {
      index += 1;
      end = sentences[index]?.end ?? end;
      candidate = {
        end,
        start: first.start,
        text: text.slice(first.start, end).trimEnd()
      };
    }
    pushSegment(merged, text, first.start, end);
  }

  return merged;
}

function mergeSoftLineSplits(
  text: string,
  sentences: readonly SplitSentence[]
): SplitSentence[] {
  const merged: SplitSentence[] = [];

  for (let index = 0; index < sentences.length; index += 1) {
    const first = sentences[index];
    if (first === undefined) {
      continue;
    }

    let end = first.end;
    while (
      !hasTerminalPunctuation(text.slice(first.start, end)) &&
      sentences[index + 1] !== undefined
    ) {
      index += 1;
      end = sentences[index]?.end ?? end;
    }
    pushSegment(merged, text, first.start, end);
  }

  return merged;
}

export function splitSentences(text: string): SplitSentence[] {
  const sentences: SplitSentence[] = [];

  for (const segment of SENTENCE_SEGMENTER.segment(text)) {
    const trimStart = firstNonWhitespaceIndex(segment.segment);
    if (trimStart === undefined) {
      continue;
    }

    const trimEnd = trimEndIndex(segment.segment);
    const start = segment.index + trimStart;
    const end = segment.index + trimEnd;

    const sentence = {
      end,
      start,
      text: segment.segment.slice(trimStart, trimEnd)
    };

    sentences.push(...splitMissingBreakSpacing(sentence));
  }

  return mergeTitleAbbreviationSplits(
    text,
    mergeSoftLineSplits(text, sentences)
  );
}
