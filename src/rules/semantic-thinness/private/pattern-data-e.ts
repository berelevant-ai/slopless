import emptyQuantification from "../patterns/empty-quantification.json" with { type: "json" };
import emptySignificanceOccasion from "../patterns/empty-significance-occasion.json" with { type: "json" };
import recursiveMeaningFrame from "../patterns/recursive-meaning-frame.json" with { type: "json" };
import type { SemanticThinnessPattern } from "./pattern-matcher.js";

export const semanticThinnessPatternSetE: readonly SemanticThinnessPattern[] = [
  emptyQuantification,
  emptySignificanceOccasion,
  recursiveMeaningFrame
];
