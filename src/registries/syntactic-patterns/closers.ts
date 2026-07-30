import affirmationClosers from "../../rules/syntactic-patterns/closers/affirmation-closers.js";
import boilerplateConclusion from "../../rules/syntactic-patterns/closers/boilerplate-conclusion.js";
import falseQuestion from "../../rules/syntactic-patterns/closers/false-question.js";
import formulaicChallenges from "../../rules/syntactic-patterns/closers/formulaic-challenges.js";
import summativeCloser from "../../rules/syntactic-patterns/closers/summative-closer.js";

export const closerRules = {
  "affirmation-closers": affirmationClosers,
  "boilerplate-conclusion": boilerplateConclusion,
  "false-question": falseQuestion,
  "formulaic-challenges": formulaicChallenges,
  "summative-closer": summativeCloser
};
