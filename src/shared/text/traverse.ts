import type {
  AnyTxtNode,
  TxtParentNode,
  TxtStrNode
} from "@textlint/ast-node-types";
import { StringSource } from "textlint-util-to-string";
import { correctedSourceOffsets } from "./source-offsets.js";

export type SourceText = {
  readonly originalEndFor: (end: number) => number;
  readonly originalStartFor: (start: number) => number;
  readonly text: string;
};

// Rules share immutable AST nodes; keep their decoded text and mapping together.
const proseSources = new WeakMap<TxtParentNode, SourceText>();
const displaySources = new WeakMap<TxtParentNode, SourceText>();

function isParentNode(node: AnyTxtNode): node is TxtParentNode {
  return "children" in node;
}

function isHtmlNode(
  node: AnyTxtNode
): node is AnyTxtNode & { readonly value: string } {
  return (
    node.type === "Html" && "value" in node && typeof node.value === "string"
  );
}

function normalizeNode(node: AnyTxtNode, includeImageAlt: boolean): AnyTxtNode {
  if (node.type === "Break") {
    return {
      ...node,
      type: "Str",
      value: " "
    } satisfies TxtStrNode;
  }

  if (
    (node.type === "Image" || node.type === "ImageReference") &&
    !includeImageAlt
  ) {
    const alt = "alt" in node && typeof node.alt === "string" ? node.alt : "";
    return {
      ...node,
      type: "Str",
      value: " ".repeat(alt.length)
    } satisfies TxtStrNode;
  }

  if (node.type === "Code" && !includeImageAlt) {
    const value =
      "value" in node && typeof node.value === "string" ? node.value : "";
    return {
      ...node,
      type: "Str",
      value: " ".repeat(value.length)
    } satisfies TxtStrNode;
  }

  if (isHtmlNode(node) && !includeImageAlt) {
    return {
      ...node,
      type: "Str",
      value: node.value
    } satisfies TxtStrNode;
  }

  if (!isParentNode(node)) {
    return node;
  }

  return {
    ...node,
    // type-coverage:ignore-next-line
    children: node.children.map((child) =>
      normalizeNode(child, includeImageAlt)
    ) as typeof node.children
  };
}

function stringSource(
  node: TxtParentNode,
  includeImageAlt: boolean
): StringSource {
  // textlint-util-to-string has not updated its public type for textlint 15.7's
  // readonly children, but it only reads the node at runtime.
  return new StringSource(
    // type-coverage:ignore-next-line
    normalizeNode(node, includeImageAlt) as ConstructorParameters<
      typeof StringSource
    >[0]
  );
}

function mappedSourceText(
  node: TxtParentNode,
  includeImageAlt: boolean
): SourceText {
  const cache = includeImageAlt ? displaySources : proseSources;
  const cached = cache.get(node);
  if (cached !== undefined) return cached;
  const source = stringSource(node, includeImageAlt);
  const corrected = correctedSourceOffsets(
    node,
    (parent, child) =>
      stringSource({ ...parent, children: [child] }, includeImageAlt).toString()
        .length
  );
  const mapped: SourceText = {
    originalEndFor: (end) =>
      corrected.originalEndFor(end) ??
      source.originalIndexFromIndex(end, true) ??
      end,
    originalStartFor: (start) =>
      corrected.originalStartFor(start) ??
      source.originalIndexFromIndex(start) ??
      start,
    text: source.toString()
  };
  cache.set(node, mapped);
  return mapped;
}

export function proseSourceText(node: TxtParentNode): SourceText {
  return mappedSourceText(node, false);
}

export function sourceText(node: TxtParentNode): SourceText {
  return mappedSourceText(node, true);
}
