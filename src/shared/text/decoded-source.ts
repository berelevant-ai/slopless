import { parseEntities } from "parse-entities";
import { parse } from "@textlint/markdown-to-ast";

export type DecodedSource = {
  readonly text: string;
  readonly starts: readonly number[];
  readonly ends: readonly number[];
};
type Reference = { readonly value: string; readonly end: number };

function numericValue(source: string): string | undefined {
  const paragraph = parse(source).children[0];
  if (paragraph === undefined || !("children" in paragraph)) return undefined;
  const text = paragraph.children[0];
  return text !== undefined && "value" in text && typeof text.value === "string"
    ? text.value
    : undefined;
}

function references(raw: string): ReadonlyMap<number, Reference> {
  const result = new Map<number, Reference>();
  const numericValues = new Map<string, string>();
  if (!raw.includes("&")) return result;
  parseEntities(raw, {
    nonTerminated: false,
    reference: (value, position, source): void => {
      const start = position.start.offset;
      const end = position.end.offset;
      if (
        typeof start === "number" &&
        typeof end === "number" &&
        source.endsWith(";") &&
        (!source.startsWith("&#") || source.length <= 10)
      ) {
        let decoded = value;
        // Match the installed Markdown parser's numeric-reference dialect.
        if (source.startsWith("&#")) {
          decoded = numericValues.get(source) ?? numericValue(source) ?? value;
          numericValues.set(source, decoded);
        }
        result.set(start, { value: decoded, end });
      }
    }
  });
  return result;
}

function asciiPunctuation(character: string | undefined): boolean {
  const code = character?.charCodeAt(0) ?? 0;
  return (
    (code >= 33 && code <= 47) ||
    (code >= 58 && code <= 64) ||
    (code >= 91 && code <= 96) ||
    (code >= 123 && code <= 126)
  );
}

export function decodedSource(raw: string): DecodedSource {
  if (!raw.includes("&") && !raw.includes("\\")) {
    const offsets = Array.from({ length: raw.length + 1 }, (_, index) => index);
    return { text: raw, starts: offsets, ends: offsets };
  }
  const entities = references(raw);
  const parts: string[] = [];
  const starts: number[] = [0];
  const ends: number[] = [0];
  let generated = 0;
  const append = (value: string, start: number, end: number): void => {
    parts.push(value);
    for (let index = 0; index < value.length; index += 1) {
      starts[generated] = start;
      generated += 1;
      ends[generated] = end;
    }
    starts[generated] = end;
  };
  for (let index = 0; index < raw.length;) {
    const escaped = raw[index + 1];
    if (
      raw[index] === "\\" &&
      escaped !== undefined &&
      asciiPunctuation(escaped)
    ) {
      append(escaped, index, index + 2);
      index += 2;
      continue;
    }
    const entity = entities.get(index);
    if (entity !== undefined) {
      append(entity.value, index, entity.end);
      index = entity.end;
      continue;
    }
    append(raw[index] ?? "", index, index + 1);
    index += 1;
  }
  return { text: parts.join(""), starts, ends };
}
