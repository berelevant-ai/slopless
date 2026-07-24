import actuallyOveruse from "../rules/words/actually-overuse.js";
import hedgeStacking from "../rules/words/hedge-stacking.js";
import llmVocabularyDensity from "../rules/words/llm-vocabulary-density.js";
import llmVocabulary from "../rules/words/llm-vocabulary.js";
import prohibitedWords from "../rules/words/prohibited-words.js";
import quietlyOveruse from "../rules/words/quietly-overuse.js";
import simplicity from "../rules/words/simplicity.js";

export const wordRules = {
  "actually-overuse": actuallyOveruse,
  "hedge-stacking": hedgeStacking,
  "llm-vocabulary-density": llmVocabularyDensity,
  "llm-vocabulary": llmVocabulary,
  "prohibited-words": prohibitedWords,
  "quietly-overuse": quietlyOveruse,
  simplicity
};
