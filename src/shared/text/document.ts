import type { TxtDocumentNode } from "@textlint/ast-node-types";
import { allDocumentParagraphs } from "./sections.js";
import type { SourceText } from "./traverse.js";

type DocumentParagraph = {
  readonly outputEnd: number;
  readonly outputStart: number;
  readonly paragraph: ReturnType<typeof allDocumentParagraphs>[number];
  readonly trimStart: number;
};

function trimStartLength(text: string): number {
  return text.length - text.trimStart().length;
}

export function documentSourceText(document: TxtDocumentNode): SourceText {
  const paragraphs: DocumentParagraph[] = [];
  const textParts: string[] = [];
  let outputStart = 0;

  for (const paragraph of allDocumentParagraphs(document)) {
    const text = paragraph.text.trim();
    if (text.length === 0) {
      continue;
    }

    paragraphs.push({
      outputEnd: outputStart + text.length,
      outputStart,
      paragraph,
      trimStart: trimStartLength(paragraph.text)
    });
    textParts.push(text);
    outputStart += text.length + 2;
  }

  const originalOffsetFor = (offset: number, isEnd: boolean): number => {
    const mapped = paragraphs.find(
      (paragraph) =>
        offset >= paragraph.outputStart && offset <= paragraph.outputEnd
    );
    if (mapped === undefined) {
      return offset;
    }

    const paragraphOffset = mapped.trimStart + offset - mapped.outputStart;
    const localOffset = isEnd
      ? mapped.paragraph.source.originalEndFor(paragraphOffset)
      : mapped.paragraph.source.originalStartFor(paragraphOffset);
    return mapped.paragraph.paragraph.range[0] + localOffset;
  };

  return {
    originalEndFor: (end) => originalOffsetFor(end, true),
    originalStartFor: (start) => originalOffsetFor(start, false),
    text: textParts.join("\n\n")
  };
}

export function documentText(document: TxtDocumentNode): string {
  return documentSourceText(document).text;
}
