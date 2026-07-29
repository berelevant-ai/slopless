import {
  findUnquotedPhraseMatches,
  type PhraseMatch
} from "../../../shared/matchers/phrases.js";
import { wordTokens } from "../../../shared/text/tokens.js";

const META_CONTEXT_WORDS = new Set([
  "banned",
  "code",
  "column",
  "detector",
  "enum",
  "example",
  "field",
  "fixture",
  "guide",
  "imported",
  "literal",
  "member",
  "name",
  "negative",
  "prompt",
  "quoted",
  "request",
  "says",
  "span",
  "stored",
  "style",
  "test",
  "word",
  "written"
]);
const STRONG_META_CONTEXT_WORDS = new Set([
  "detector",
  "enum",
  "fixture",
  "imported",
  "literal",
  "prompt",
  "quoted",
  "span"
]);

const CANONICAL_WORDS = new Map<string, string>([
  ["aligned", "align"],
  ["aligning", "align"],
  ["aligns", "align"],
  ["boasted", "boast"],
  ["boasting", "boast"],
  ["boasts", "boast"],
  ["bolstered", "bolster"],
  ["bolstering", "bolster"],
  ["bolsters", "bolster"],
  ["correlated", "correlate"],
  ["correlates", "correlate"],
  ["correlating", "correlate"],
  ["emphasized", "emphasize"],
  ["emphasizes", "emphasize"],
  ["emphasizing", "emphasize"],
  ["enhanced", "enhance"],
  ["enhances", "enhance"],
  ["enhancing", "enhance"],
  ["fostered", "foster"],
  ["fostering", "foster"],
  ["fosters", "foster"],
  ["garnered", "garner"],
  ["garnering", "garner"],
  ["garners", "garner"],
  ["highlighted", "highlight"],
  ["highlighting", "highlight"],
  ["highlights", "highlight"],
  ["meticulously", "meticulous"],
  ["showcased", "showcase"],
  ["showcases", "showcase"],
  ["showcasing", "showcase"],
  ["underscored", "underscore"],
  ["underscores", "underscore"],
  ["underscoring", "underscore"]
]);

const DOMAIN_CONTEXT_BY_WORD = new Map<string, ReadonlySet<string>>([
  ["authentic", new Set(["label", "shellac", "signature", "signatures"])],
  [
    "catalyze",
    new Set(["catalyst", "chemistry", "palladium", "reaction", "substrate"])
  ],
  [
    "catalyzed",
    new Set(["catalyst", "chemistry", "palladium", "reaction", "substrate"])
  ],
  [
    "catalyzes",
    new Set(["catalyst", "chemistry", "palladium", "reaction", "substrate"])
  ],
  [
    "catalyzing",
    new Set(["catalyst", "chemistry", "palladium", "reaction", "substrate"])
  ],
  [
    "comprehensive",
    new Set(["bicarbonate", "chloride", "panel", "potassium", "sodium"])
  ],
  ["confidence", new Set(["interval", "level", "statistic"])],
  ["boast", new Set(["animal", "feathers", "peacock", "plumage", "train"])],
  ["bolster", new Set(["beam", "retaining", "slope", "support", "wall"])],
  [
    "causal",
    new Set([
      "cohort",
      "estimate",
      "experiment",
      "instrument",
      "regression",
      "trial",
      "weighting"
    ])
  ],
  [
    "correlate",
    new Set([
      "coefficient",
      "measurement",
      "pressure",
      "sample",
      "statistic",
      "temperature",
      "variable"
    ])
  ],
  [
    "engagement",
    new Set(["active", "divided", "product", "requirement", "seats", "weekly"])
  ],
  ["frictionless", new Set(["bearing", "physics", "surface", "track"])],
  [
    "empirical",
    new Set([
      "cohort",
      "data",
      "measurement",
      "measurements",
      "participants",
      "sample",
      "study",
      "trial"
    ])
  ],
  [
    "highlight",
    new Set([
      "button",
      "click",
      "color",
      "menu",
      "paragraph",
      "rgb",
      "row",
      "selected",
      "syntax",
      "text",
      "token",
      "yellow"
    ])
  ],
  ["ai", new Set(["file", "format", "header", "metadata", "model"])],
  ["native", new Set(["file", "format", "header", "metadata", "model"])],
  ["next", new Set(["cpu", "cpus", "device", "manual", "processor"])],
  ["generation", new Set(["cpu", "cpus", "device", "manual", "processor"])],
  [
    "key",
    new Set([
      "account",
      "button",
      "code",
      "dialog",
      "door",
      "encryption",
      "escape",
      "foreign",
      "hash",
      "keyboard",
      "map",
      "opens",
      "press",
      "primary"
    ])
  ],
  ["operationalize", new Set(["define", "lesson", "plan", "sentence"])],
  ["stakeholders", new Set(["contract", "governance", "rights", "voting"])],
  [
    "landscape",
    new Set([
      "drawing",
      "drainage",
      "exterior",
      "legend",
      "map",
      "orientation",
      "portrait",
      "retaining",
      "slope",
      "wall"
    ])
  ],
  ["leverage", new Set(["customer", "guide", "quoted", "request", "style"])],
  [
    "meticulous",
    new Set([
      "archivist",
      "charter",
      "conservator",
      "copyist",
      "manuscript",
      "restoration",
      "scribe"
    ])
  ],
  [
    "robust",
    new Set([
      "antibiotic",
      "cotton",
      "cycle",
      "cycles",
      "physician",
      "response",
      "sample",
      "wash"
    ])
  ],
  [
    "seamless",
    new Set([
      "concrete",
      "hydraulic",
      "joints",
      "line",
      "match",
      "migration",
      "poured",
      "schemas",
      "tube",
      "walkway"
    ])
  ],
  [
    "showcase",
    new Set([
      "bronze",
      "display",
      "exhibition",
      "fair",
      "museum",
      "prototype",
      "trade"
    ])
  ],
  [
    "testament",
    new Set(["admitted", "evidence", "hearing", "probate", "witness"])
  ],
  [
    "underscore",
    new Set([
      "account",
      "character",
      "code",
      "identifier",
      "music",
      "name",
      "region",
      "score",
      "separator",
      "violin"
    ])
  ],
  [
    "valuable",
    new Set([
      "asset",
      "auction",
      "eur",
      "insured",
      "painting",
      "price",
      "priced"
    ])
  ]
]);

function tokenWords(text: string): readonly string[] {
  return wordTokens(text).map((token) => token.normalized);
}

function hasAny(
  words: readonly string[],
  values: ReadonlySet<string>
): boolean {
  return words.some((word) => values.has(word));
}

function isMetaMention(words: readonly string[]): boolean {
  return (
    hasAny(words, STRONG_META_CONTEXT_WORDS) ||
    words.filter((word) => META_CONTEXT_WORDS.has(word)).length >= 2
  );
}

function hasDomainContext(phrase: string, words: readonly string[]): boolean {
  const canonical = CANONICAL_WORDS.get(phrase) ?? phrase;
  const context = DOMAIN_CONTEXT_BY_WORD.get(canonical);
  return context !== undefined && hasAny(words, context);
}

export function isVocabularyContextAllowed(
  text: string,
  phrase: string
): boolean {
  const words = tokenWords(text);

  return isMetaMention(words) || hasDomainContext(phrase, words);
}

export function findVocabularyMatches(
  text: string,
  phrases: readonly string[]
): PhraseMatch[] {
  return findUnquotedPhraseMatches(text, phrases).filter(
    (match) => !isVocabularyContextAllowed(text, match.phrase.toLowerCase())
  );
}
