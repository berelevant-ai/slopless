export const DO_NEGATIONS = new Set(["don't", "doesn't", "didn't"]);

export const ACTION_NEGATIONS = new Set([
  ...DO_NEGATIONS,
  "can't",
  "couldn't",
  "hadn't",
  "hasn't",
  "haven't",
  "mightn't",
  "mustn't",
  "needn't",
  "shan't",
  "shouldn't",
  "won't",
  "wouldn't"
]);

export const NEGATION_WORDS = new Set([
  "not",
  "never",
  "isn't",
  "aren't",
  "wasn't",
  "weren't",
  ...ACTION_NEGATIONS,
  "cannot"
]);
