import { wordTokens, type Token } from "../../../../shared/text/tokens.js";

export type TripleWordRepeatVocabulary = {
  readonly abstractItems: ReadonlySet<string>;
  readonly abstractListVerbs: ReadonlySet<string>;
  readonly discourseSubjects: ReadonlySet<string>;
  readonly evaluativeItems: ReadonlySet<string>;
  readonly linkingVerbs: ReadonlySet<string>;
  readonly rhetoricalVerbs: ReadonlySet<string>;
};

export type TripleWordRepeatMatch = {
  readonly end: number;
  readonly start: number;
};

function commaPositions(text: string): readonly number[] {
  const positions: number[] = [];
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] === ",") {
      positions.push(index);
    }
  }
  return positions;
}

function tokensBetween(
  tokens: readonly Token[],
  start: number,
  end: number
): readonly Token[] {
  return tokens.filter((token) => token.start >= start && token.end <= end);
}

function containsItem(
  tokens: readonly Token[],
  candidates: ReadonlySet<string>
): boolean {
  return tokens.some((token) => candidates.has(token.normalized));
}

function rhetoricItem(
  tokens: readonly Token[],
  vocabulary: TripleWordRepeatVocabulary
): boolean {
  const first = tokens[0];
  return (
    first !== undefined &&
    vocabulary.rhetoricalVerbs.has(first.normalized) &&
    containsItem(tokens.slice(1), vocabulary.abstractItems)
  );
}

export function findTripleWordRepeat(
  text: string,
  vocabulary: TripleWordRepeatVocabulary
): TripleWordRepeatMatch | undefined {
  const tokens = wordTokens(text);
  const commas = commaPositions(text);

  for (let index = 0; index < commas.length - 1; index += 1) {
    const firstComma = commas[index];
    const secondComma = commas[index + 1];
    if (firstComma === undefined || secondComma === undefined) {
      continue;
    }

    const andToken = tokens.find(
      (token) =>
        token.start > secondComma &&
        token.normalized === "and" &&
        text.slice(secondComma + 1, token.start).trim() === ""
    );
    if (andToken === undefined) {
      continue;
    }

    const beforeFirst = tokens.filter((token) => token.end <= firstComma);
    const triggerIndex = beforeFirst.findLastIndex(
      (token) =>
        vocabulary.linkingVerbs.has(token.normalized) ||
        vocabulary.abstractListVerbs.has(token.normalized) ||
        vocabulary.rhetoricalVerbs.has(token.normalized)
    );
    const trigger = beforeFirst[triggerIndex];
    if (
      trigger === undefined ||
      commas.some(
        (position) => position > trigger.start && position < firstComma
      ) ||
      !containsItem(
        beforeFirst.slice(0, triggerIndex),
        vocabulary.discourseSubjects
      )
    ) {
      continue;
    }

    const firstItem = beforeFirst.slice(triggerIndex + 1);
    const secondItem = tokensBetween(tokens, firstComma + 1, secondComma);
    const thirdItem = tokens.filter((token) => token.start >= andToken.end);
    const linkingMatch =
      vocabulary.linkingVerbs.has(trigger.normalized) &&
      containsItem(firstItem, vocabulary.evaluativeItems) &&
      containsItem(secondItem, vocabulary.evaluativeItems) &&
      containsItem(thirdItem, vocabulary.evaluativeItems);
    const abstractMatch =
      vocabulary.abstractListVerbs.has(trigger.normalized) &&
      containsItem(firstItem, vocabulary.abstractItems) &&
      containsItem(secondItem, vocabulary.abstractItems) &&
      containsItem(thirdItem, vocabulary.abstractItems);
    const verbMatch =
      vocabulary.rhetoricalVerbs.has(trigger.normalized) &&
      containsItem(firstItem, vocabulary.abstractItems) &&
      rhetoricItem(secondItem, vocabulary) &&
      rhetoricItem(thirdItem, vocabulary);

    if (linkingMatch || abstractMatch || verbMatch) {
      return {
        end: thirdItem.at(-1)?.end ?? text.length,
        start: trigger.start
      };
    }
  }

  return undefined;
}
