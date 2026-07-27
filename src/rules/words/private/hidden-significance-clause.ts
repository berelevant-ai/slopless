import type { Token } from "../../../shared/text/tokens.js";

export type HiddenSignificanceClause = {
  readonly index: number;
  readonly tokens: readonly Token[];
};

const BOUNDARY_WORDS = new Set([
  "after",
  "although",
  "because",
  "before",
  "but",
  "if",
  "once",
  "since",
  "so",
  "that",
  "though",
  "unless",
  "when",
  "whenever",
  "where",
  "whereas",
  "while",
  "which",
  "who"
]);

function hasBoundaryPunctuation(
  text: string,
  left: Token,
  right: Token
): boolean {
  const between = text.slice(left.end, right.start);
  return (
    between.includes(";") ||
    between.includes(":") ||
    between.includes(".") ||
    between.includes("!") ||
    between.includes("?")
  );
}

export function hiddenSignificanceClauseFor(
  text: string,
  tokens: readonly Token[],
  index: number
): HiddenSignificanceClause {
  let start = 0;
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    const token = tokens[cursor];
    const next = tokens[cursor + 1];
    if (
      token === undefined ||
      next === undefined ||
      BOUNDARY_WORDS.has(token.normalized) ||
      hasBoundaryPunctuation(text, token, next)
    ) {
      start = cursor + 1;
      break;
    }
  }

  let end = tokens.length;
  for (let cursor = index + 1; cursor < tokens.length; cursor += 1) {
    const previous = tokens[cursor - 1];
    const token = tokens[cursor];
    if (
      previous === undefined ||
      token === undefined ||
      BOUNDARY_WORDS.has(token.normalized) ||
      hasBoundaryPunctuation(text, previous, token)
    ) {
      end = cursor;
      break;
    }
  }

  return {
    index: index - start,
    tokens: tokens.slice(start, end)
  };
}
