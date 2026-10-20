// slopless stats per corpus source, normalized to findings per 1,000 words.
// Buckets: slop (emptiness/phrasing) vs read (readability) vs fmt (formatting).
// Run from repo root: node runners/legacy/corpus_stats.mjs
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";

const CLI = resolve("./dist/cli.js");
const METRIC = new Set([
  "slopless/flesch-kincaid", "slopless/gunning-fog", "slopless/coleman-liau",
  "slopless/avg-sentence-length", "slopless/paragraph-length", "slopless/word-repetition"
]);
const ORTHO = new Set([
  "slopless/smart-quotes", "slopless/em-dashes", "slopless/exclamation-density",
  "slopless/colon-dramatic", "slopless/sentence-case", "slopless/artifact-placeholders",
  "slopless/fake-timestamps", "slopless/hidden-unicode-controls"
]);

const SOURCES = [
  { label: "AI (our generated slop)", dir: "datasets/experiments/ai-editor-vs-gate/inputs", prefix: "", n: 6 },
  { label: "Wikipedia (2016, CC)", dir: "datasets/corpus/human/reference/wikipedia", prefix: "wiki-", n: 20 },
  { label: "Gutenberg (pre-1928, PD)", dir: "datasets/corpus/human/literary/gutenberg", prefix: "gb-", n: 20 },
  { label: "Fed Register (2014-19, PD)", dir: "datasets/corpus/human/gov/gov-health", prefix: "fr-", n: 20 },
  { label: "MedlinePlus (modern, PD)", dir: "datasets/corpus/human/gov/gov-health", prefix: "med-", n: 20 }
];

function pick(arr, n) {
  if (arr.length <= n) return arr;
  const step = arr.length / n;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)]);
}

function findings(file) {
  let out = "";
  try { out = execFileSync("node", [CLI, file], { encoding: "utf8" }); }
  catch (e) { out = e.stdout ? e.stdout.toString() : ""; if (!out) return null; }
  const data = JSON.parse(out);
  return (data[0] && data[0].messages) || [];
}

const wordCount = (f) => readFileSync(f, "utf8").split(/\s+/).filter(Boolean).length;

function run(src) {
  const files = pick(
    readdirSync(src.dir).filter((f) => f.endsWith(".md") && f.startsWith(src.prefix)).sort(),
    src.n
  );
  let words = 0, slop = 0, read = 0, fmt = 0, errs = 0;
  const slopRules = {};
  for (const name of files) {
    const file = join(src.dir, name);
    const msgs = findings(file);
    if (msgs === null) { errs++; continue; }
    words += wordCount(file);
    for (const m of msgs) {
      if (METRIC.has(m.ruleId)) read++;
      else if (ORTHO.has(m.ruleId)) fmt++;
      else { slop++; slopRules[m.ruleId] = (slopRules[m.ruleId] || 0) + 1; }
    }
  }
  const per1k = (x) => words ? (x / words * 1000).toFixed(1) : "0.0";
  return { label: src.label, files: files.length - errs, words, slop, read, fmt,
    slopPer1k: per1k(slop), readPer1k: per1k(read), fmtPer1k: per1k(fmt),
    topSlop: Object.entries(slopRules).sort((a, b) => b[1] - a[1]).slice(0, 6)
      .map(([k, v]) => `${k.replace("slopless/", "")}:${v}`) };
}

const rows = SOURCES.map(run);
console.log("source".padEnd(28), "files".padStart(5), "words".padStart(7),
  "slop/1k".padStart(8), "read/1k".padStart(8), "fmt/1k".padStart(7));
for (const r of rows) {
  console.log(r.label.padEnd(28), String(r.files).padStart(5), String(r.words).padStart(7),
    r.slopPer1k.padStart(8), r.readPer1k.padStart(8), r.fmtPer1k.padStart(7));
}
console.log("\ntop slop rules per source:");
for (const r of rows) console.log(`  ${r.label}: ${r.topSlop.join("  ") || "(none)"}`);
