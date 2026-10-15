import type { TokenTemplatePattern } from "../../../../shared/matchers/phrases.js";
import type { LocalDetection } from "../../../private/textlint-rule-builders.js";
import {
  clauseEndsAfter,
  frameDetection,
  frameMatches
} from "./frame-matches.js";

const HEADS = [
  "trade",
  "trades",
  "tradeoff",
  "tradeoffs",
  "trade-off",
  "trade-offs",
  "cost",
  "costs",
  "price",
  "prices",
  "risk",
  "risks",
  "catch",
  "catches",
  "downside",
  "downsides"
];
const PAYOFFS = [
  "time",
  "control",
  "flexibility",
  "independence",
  "ownership",
  "convenience",
  "simplicity",
  "certainty",
  "uncertainty",
  "freedom",
  "autonomy",
  "speed"
];
const PATTERN: TokenTemplatePattern = {
  id: "abstract-cost-frame",
  templates: [
    "{determiner} {head} {link} {payoff}",
    "{determiner} {modifier} {head} {link} {payoff}",
    "{determiner} {contracted} {payoff}",
    "{determiner} {modifier} {contracted} {payoff}"
  ],
  slots: {
    determiner: [
      "the",
      "a",
      "this",
      "that",
      "these",
      "those",
      "our",
      "your",
      "their",
      "my",
      "its"
    ],
    head: HEADS,
    contracted: HEADS.map((head) => `${head}'s`),
    modifier: [
      "biggest",
      "hidden",
      "main",
      "only",
      "real",
      "true",
      "primary",
      "actual",
      "chief",
      "underlying",
      "long-term",
      "higher"
    ],
    link: [
      "is",
      "are",
      "was",
      "were",
      "remains",
      "remain",
      "became",
      "becomes"
    ],
    payoff: PAYOFFS.flatMap((payoff) => [
      payoff,
      `lost ${payoff}`,
      `less ${payoff}`,
      `more ${payoff}`,
      `a loss of ${payoff}`
    ])
  }
};

export function findAbstractCostFrames(
  text: string
): readonly LocalDetection[] {
  const lower = text.toLocaleLowerCase("en");
  if (
    !HEADS.some((head) => lower.includes(head)) ||
    !PAYOFFS.some((payoff) => lower.includes(payoff))
  )
    return [];
  return frameMatches(text, [PATTERN])
    .filter((match) => clauseEndsAfter(text, match.end))
    .map((match) => frameDetection(text, match.start, match.end, PATTERN.id));
}
