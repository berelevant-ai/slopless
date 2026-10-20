// Compare baseline vs condition-B (blind AI) vs condition-C (gate loop).
// Buckets findings: slop (emptiness/lexical/rhetorical) vs metric (readability) vs ortho (formatting).
// Usage: node runners/legacy/compare.mjs datasets/experiments/ai-editor-vs-gate/results/baseline.json datasets/experiments/ai-editor-vs-gate/results/cond-b.json datasets/experiments/ai-editor-vs-gate/results/cond-c.json
import { readFileSync, writeFileSync } from "node:fs";

const METRIC = new Set([
  "slopless/flesch-kincaid",
  "slopless/gunning-fog",
  "slopless/coleman-liau",
  "slopless/avg-sentence-length",
  "slopless/paragraph-length",
  "slopless/word-repetition"
]);
const ORTHO = new Set([
  "slopless/smart-quotes",
  "slopless/em-dashes",
  "slopless/exclamation-density",
  "slopless/colon-dramatic",
  "slopless/sentence-case",
  "slopless/artifact-placeholders",
  "slopless/fake-timestamps",
  "slopless/hidden-unicode-controls"
]);

function bucket(ruleId) {
  if (METRIC.has(ruleId)) return "metric";
  if (ORTHO.has(ruleId)) return "ortho";
  return "slop";
}

function summarize(jsonPath) {
  const data = JSON.parse(readFileSync(jsonPath, "utf8"));
  const b = { slop: 0, metric: 0, ortho: 0, total: 0 };
  const rules = {};
  for (const row of data.rows) {
    for (const [rid, n] of Object.entries(row.rules)) {
      b[bucket(rid)] += n;
      b.total += n;
      rules[rid] = (rules[rid] || 0) + n;
    }
  }
  return { path: jsonPath, buckets: b, rules };
}

const [basePath, bPath, cPath] = process.argv.slice(2);
const out = {
  baseline: summarize(basePath),
  cond_b_blind_ai: summarize(bPath),
  cond_c_gate_loop: summarize(cPath)
};
writeFileSync(
  "datasets/experiments/ai-editor-vs-gate/results/tally.json",
  JSON.stringify(out, null, 2)
);

const pad = (s, n) => String(s).padEnd(n);
const num = (s) => String(s).padStart(7);
console.log(pad("CONDITION", 22), num("SLOP"), num("METRIC"), num("ORTHO"), num("TOTAL"));
for (const [k, v] of Object.entries(out)) {
  const b = v.buckets;
  console.log(pad(k, 22), num(b.slop), num(b.metric), num(b.ortho), num(b.total));
}
console.log("\n--- SLOP-bucket rule histogram per condition ---");
for (const [k, v] of Object.entries(out)) {
  const slopRules = Object.entries(v.rules)
    .filter(([rid]) => bucket(rid) === "slop")
    .sort((a, b) => b[1] - a[1]);
  console.log(`\n${k}:`);
  for (const [rid, n] of slopRules) console.log("  ", String(n).padStart(3), rid);
}
