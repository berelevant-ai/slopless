import { proseSourceText } from "../../../dist/shared/text/traverse.js";

export default function characterRule(context) {
  return {
    [context.Syntax.Paragraph](node) {
      const source = proseSourceText(node);
      for (let index = 0; index < source.text.length; index += 1) {
        context.report(
          node,
          new context.RuleError(`Mapped character ${index}`, {
            padding: context.locator.range([
              source.originalStartFor(index),
              source.originalEndFor(index + 1)
            ])
          })
        );
      }
    }
  };
}
