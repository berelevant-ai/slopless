import { phraseBuiltinRules } from "./phrases/builtin.js";
import { phraseFamilyRules } from "./phrases/families.js";

export const phraseRules = {
  ...phraseBuiltinRules,
  ...phraseFamilyRules
};
