// Central slopless tally + classification.
// Usage: node runners/legacy/analyze.mjs <file.md> [more.md ...]
// Run from repo root (uses ./dist/cli.js by default; override with SLOPLESS_CLI).
import { execFileSync } from "node:child_process";
import { resolve, basename } from "node:path";

const CLI = resolve(process.env.SLOPLESS_CLI || "./dist/cli.js");

// Document-level readability thresholds. Separated from pattern/lexical slop
// because a "remove the slop" instruction does not target a readability score.
const METRIC_RULES = new Set([
  "slopless/flesch-kincaid",
  "slopless/gunning-fog",
  "slopless/coleman-liau",
  "slopless/avg-sentence-length",
  "slopless/paragraph-length",
  "slopless/word-repetition"
]);

function runOne(file) {
  let out = "";
  try {
    out = execFileSync("node", [CLI, file], { encoding: "utf8" });
  } catch (e) {
    // slopless exits 1 when it has findings; stdout still holds the JSON.
    out = e.stdout ? e.stdout.toString() : "";
    if (!out) throw e;
  }
  const data = JSON.parse(out);
  const messages = Array.isArray(data)
    ? data.flatMap((d) => d.messages || [])
    : data.messages || [];
  const rules = {};
  let metric = 0;
  let pattern = 0;
  for (const m of messages) {
    rules[m.ruleId] = (rules[m.ruleId] || 0) + 1;
    if (METRIC_RULES.has(m.ruleId)) metric += 1;
    else pattern += 1;
  }
  return { label: basename(file), file, total: messages.length, pattern, metric, rules };
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("usage: node analyze.mjs <file.md> [...]");
  process.exit(2);
}
const rows = files.map(runOne);
const agg = rows.reduce(
  (a, r) => ({
    total: a.total + r.total,
    pattern: a.pattern + r.pattern,
    metric: a.metric + r.metric
  }),
  { total: 0, pattern: 0, metric: 0 }
);
console.log(JSON.stringify({ cli: CLI, rows, agg }, null, 2));
