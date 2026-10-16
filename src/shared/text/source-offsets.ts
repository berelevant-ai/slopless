import type { TxtParentNode } from "@textlint/ast-node-types";
import { diffChars } from "diff";
import { decodedSource } from "./decoded-source.js";
import { normalizeWhitespace } from "./normalize.js";

type Boundaries = {
  readonly starts: readonly number[];
  readonly ends: readonly number[];
};
type Correction = Boundaries & {
  readonly generatedStart: number;
  readonly generatedEnd: number;
  readonly originalStart: number;
};
export type SourceOffsetCorrections = {
  readonly originalStartFor: (offset: number) => number | undefined;
  readonly originalEndFor: (offset: number) => number | undefined;
};

function boundaries(raw: string, value: string): Boundaries {
  const decoded = decodedSource(raw);
  const changes = diffChars(decoded.text, value);
  const starts: number[] = [0];
  const ends: number[] = [0];
  let original = 0;
  let generated = 0;
  for (let index = 0; index < changes.length; index += 1) {
    const change = changes[index];
    if (change === undefined) continue;
    if (!change.added && !change.removed) {
      for (let offset = 0; offset < change.value.length; offset += 1) {
        starts[generated + offset] = original + offset;
        ends[generated + offset + 1] = original + offset + 1;
      }
      original += change.value.length;
      generated += change.value.length;
      starts[generated] = original;
      continue;
    }
    const originalStart = original;
    const generatedStart = generated;
    while (changes[index]?.added === true || changes[index]?.removed === true) {
      const edit = changes[index];
      if (edit?.added === true) generated += edit.value.length;
      if (edit?.removed === true) original += edit.value.length;
      index += 1;
    }
    index -= 1;
    // A decoded replacement spans its complete original entity or escape.
    for (let offset = generatedStart; offset <= generated; offset += 1) {
      starts[offset] = offset === generated ? original : originalStart;
      ends[offset] = offset === generatedStart ? originalStart : original;
    }
  }
  return {
    starts: starts.map((index) => decoded.starts[index] ?? raw.length),
    ends: ends.map((index) => decoded.ends[index] ?? raw.length)
  };
}

export function correctedSourceOffsets(
  root: TxtParentNode,
  lengthForChild: (
    parent: TxtParentNode,
    child: TxtParentNode["children"][number]
  ) => number
): SourceOffsetCorrections {
  const corrections: Correction[] = [];
  const collect = (parent: TxtParentNode, start: number): void => {
    let offset = start;
    for (const child of parent.children) {
      if (
        child.type === "Str" &&
        child.value.length > 0 &&
        child.raw !== child.value
      ) {
        const sourceEnd = child.range[1] - root.range[0];
        let raw = child.raw;
        if (root.raw.at(sourceEnd) === ";") {
          const withTerminator = raw + ";";
          if (
            normalizeWhitespace(decodedSource(withTerminator).text) ===
            normalizeWhitespace(child.value)
          )
            raw = withTerminator;
        }
        corrections.push({
          ...boundaries(raw, child.value),
          generatedStart: offset,
          generatedEnd: offset + child.value.length,
          originalStart: child.range[0] - root.range[0]
        });
      } else if ("children" in child) collect(child, offset);
      offset +=
        child.type === "Str"
          ? child.value.length
          : lengthForChild(parent, child);
    }
  };
  collect(root, 0);
  const originalFor = (offset: number, end: boolean): number | undefined => {
    const candidates = corrections.filter((correction) =>
      end
        ? offset > correction.generatedStart &&
          offset <= correction.generatedEnd
        : offset >= correction.generatedStart &&
          offset < correction.generatedEnd
    );
    const correction = end ? candidates[0] : candidates.at(-1);
    if (correction === undefined) return undefined;
    const boundary = (end ? correction.ends : correction.starts)[
      offset - correction.generatedStart
    ];
    return boundary === undefined
      ? undefined
      : correction.originalStart + boundary;
  };
  return {
    originalStartFor: (offset) => originalFor(offset, false),
    originalEndFor: (offset) => originalFor(offset, true)
  };
}
