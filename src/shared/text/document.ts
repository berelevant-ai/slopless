import type { TxtDocumentNode } from "@textlint/ast-node-types";
import { allParagraphs } from "./sections.js";

export function documentText(document: TxtDocumentNode): string {
  return allParagraphs(document)
    .map((paragraph) => paragraph.text.trim())
    .filter((text) => text.length > 0)
    .join("\n\n");
}
