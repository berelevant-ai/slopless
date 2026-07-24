import type {
  AnyTxtNode,
  TxtParentNode,
  TxtStrNode
} from "@textlint/ast-node-types";
import { StringSource } from "textlint-util-to-string";

export type SourceText = {
  readonly originalEndFor: (end: number) => number;
  readonly originalStartFor: (start: number) => number;
  readonly text: string;
};

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
    return {
      ...node,
      type: "Str",
      value: ""
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

function mappedSourceText(
  node: TxtParentNode,
  includeImageAlt: boolean
): SourceText {
  // textlint-util-to-string has not updated its public type for textlint 15.7's
  // readonly children, but it only reads the node at runtime.
  const source = new StringSource(
    // type-coverage:ignore-next-line
    normalizeNode(node, includeImageAlt) as ConstructorParameters<
      typeof StringSource
    >[0]
  );

  return {
    originalEndFor: (end) => source.originalIndexFromIndex(end, true) ?? end,
    originalStartFor: (start) => source.originalIndexFromIndex(start) ?? start,
    text: source.toString()
  };
}

export function proseSourceText(node: TxtParentNode): SourceText {
  return mappedSourceText(node, false);
}

export function sourceText(node: TxtParentNode): SourceText {
  return mappedSourceText(node, true);
}
