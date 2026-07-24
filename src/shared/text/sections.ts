import type {
  AnyTxtNode,
  TxtDocumentNode,
  TxtParagraphNode,
  TxtParentNode
} from "@textlint/ast-node-types";
import { type SplitSentence, splitSentences } from "./sentences.js";
import { proseSourceText, type SourceText, sourceText } from "./traverse.js";

type Section = readonly AnyTxtNode[];

export type SectionSentence = {
  readonly paragraph: TxtParagraphNode;
  readonly sentence: SplitSentence;
  readonly source: SourceText;
};

export type SectionParagraph = {
  readonly paragraph: TxtParagraphNode;
  readonly source: SourceText;
  readonly text: string;
};

function isParagraphNode(node: AnyTxtNode): node is TxtParagraphNode {
  return node.type === "Paragraph";
}

function isParentNode(node: AnyTxtNode): node is TxtParentNode {
  return "children" in node;
}

function collectParagraphs(
  node: AnyTxtNode,
  paragraphs: TxtParagraphNode[]
): void {
  if (isParagraphNode(node)) {
    paragraphs.push(node);
    return;
  }

  if (node.type !== "BlockQuote" || !isParentNode(node)) {
    return;
  }

  for (const child of node.children) {
    collectParagraphs(child, paragraphs);
  }
}

function sectionParagraphs(section: Section): TxtParagraphNode[] {
  const paragraphs: TxtParagraphNode[] = [];

  for (const node of section) {
    collectParagraphs(node, paragraphs);
  }

  return paragraphs;
}

function documentSections(document: TxtDocumentNode): Section[] {
  const sections: Section[] = [];
  let current: AnyTxtNode[] = [];

  for (const child of document.children) {
    if (child.type === "Header") {
      if (current.length > 0) {
        sections.push(current);
      }
      current = [];
      continue;
    }

    current.push(child);
  }

  if (current.length > 0) {
    sections.push(current);
  }

  return sections;
}

function paragraphSentences(paragraph: TxtParagraphNode): SectionSentence[] {
  const source = sourceText(paragraph);

  return splitSentences(source.text).map((sentence) => ({
    paragraph,
    sentence,
    source
  }));
}

export function allParagraphSentences(
  document: TxtDocumentNode
): SectionSentence[] {
  const sentences: SectionSentence[] = [];

  for (const section of documentSections(document)) {
    for (const paragraph of sectionParagraphs(section)) {
      sentences.push(...paragraphSentences(paragraph));
    }
  }

  return sentences;
}

export function allParagraphs(document: TxtDocumentNode): SectionParagraph[] {
  const paragraphs: SectionParagraph[] = [];

  for (const section of documentSections(document)) {
    for (const paragraph of sectionParagraphs(section)) {
      const source = proseSourceText(paragraph);
      paragraphs.push({
        paragraph,
        source,
        text: source.text
      });
    }
  }

  return paragraphs;
}

export function sectionFirstSentences(
  document: TxtDocumentNode
): SectionSentence[] {
  const sentences: SectionSentence[] = [];

  for (const section of documentSections(document)) {
    const firstParagraph = sectionParagraphs(section).at(0);
    if (firstParagraph === undefined) {
      continue;
    }

    const firstSentence = paragraphSentences(firstParagraph).at(0);
    if (firstSentence !== undefined) {
      sentences.push(firstSentence);
    }
  }

  return sentences;
}

export function sectionLastSentences(
  document: TxtDocumentNode
): SectionSentence[] {
  const sentences: SectionSentence[] = [];

  for (const section of documentSections(document)) {
    const lastParagraph = sectionParagraphs(section).at(-1);
    if (lastParagraph === undefined) {
      continue;
    }

    const lastSentence = paragraphSentences(lastParagraph).at(-1);
    if (lastSentence !== undefined) {
      sentences.push(lastSentence);
    }
  }

  return sentences;
}
