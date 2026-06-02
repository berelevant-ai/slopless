import genreCliches from "../../rules/phrases/genre-cliches.js";
import seoFiller from "../../rules/phrases/seo-filler.js";
import selfHelpCliches from "../../rules/phrases/self-help-cliches.js";
import weaselAttribution from "../../rules/phrases/weasel-attribution.js";

// New slop families added from the corpus-driven expansion. Each is a phrase-list
// rule (findUnquotedPhraseMatches over a data JSON), screened for low false positives
// against a multi-topic human corpus.
export const phraseFamilyRules = {
  "genre-cliches": genreCliches,
  "seo-filler": seoFiller,
  "self-help-cliches": selfHelpCliches,
  "weasel-attribution": weaselAttribution
};
