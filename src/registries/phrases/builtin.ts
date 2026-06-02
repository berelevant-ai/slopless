import cliches from "../../rules/phrases/cliches.js";
import corporateSpeak from "../../rules/phrases/corporate-speak.js";
import humbleBragger from "../../rules/phrases/humble-bragger.js";
import jargonFaker from "../../rules/phrases/jargon-faker.js";
import llmDisclaimer from "../../rules/phrases/llm-disclaimer.js";
import prohibitedPhrases from "../../rules/phrases/prohibited-phrases.js";
import redundancy from "../../rules/phrases/redundancy.js";
import skunkedTerms from "../../rules/phrases/skunked-terms.js";
import uncomparables from "../../rules/phrases/uncomparables.js";
import wordiness from "../../rules/phrases/wordiness.js";

export const phraseBuiltinRules = {
  cliches,
  "corporate-speak": corporateSpeak,
  "humble-bragger": humbleBragger,
  "jargon-faker": jargonFaker,
  "llm-disclaimer": llmDisclaimer,
  "prohibited-phrases": prohibitedPhrases,
  redundancy,
  "skunked-terms": skunkedTerms,
  uncomparables,
  wordiness
};
