// Per-1000-word occurrence rate of the llm-vocabulary and simplicity word sets,
// human corpus vs AI texts. Answers: would a ">N per 1000 words" rule separate
// human from AI, and how many human docs would it falsely trigger?
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const LLM = new Set([
  "delve", "vibrant", "landscape", "realm", "embark", "excels",
  "vital", "comprehensive", "intricate", "pivotal", "moreover", "tapestry"
]);
const SIMP = new Set(["utilize", "implement", "facilitate", "numerous", "commence"]);

const tokens = (t) => t.toLowerCase().match(/[a-z0-9']+/g) || [];

function stats(files, words) {
  let totalWords = 0, hits = 0, over1 = 0, over2 = 0, n = 0;
  for (const f of files) {
    const tk = tokens(readFileSync(f, "utf8"));
    if (tk.length < 50) continue;
    const h = tk.filter((w) => words.has(w)).length;
    const rate = (h / tk.length) * 1000;
    totalWords += tk.length;
    hits += h;
    if (rate > 1) over1 += 1;
    if (rate >= 2) over2 += 1;
    n += 1;
  }
  return {
    docs: n,
    ratePer1k: (hits / totalWords * 1000).toFixed(2),
    pctDocsOver1: ((over1 / n) * 100).toFixed(0),
    pctDocsOver2: ((over2 / n) * 100).toFixed(0)
  };
}

function sample(dir, prefix, k) {
  const fs = readdirSync(dir).filter((f) => f.endsWith(".md") && f.startsWith(prefix)).sort();
  const step = Math.max(1, Math.floor(fs.length / k));
  return Array.from({ length: Math.min(k, fs.length) }, (_, i) => join(dir, fs[i * step]));
}

const AI_DIR = "datasets/experiments/ai-editor-vs-gate/inputs";
const sources = [
  ["Wikipedia (human)", sample("datasets/corpus/human/reference/wikipedia", "wiki-", 400)],
  ["Gutenberg (human)", sample("datasets/corpus/human/literary/gutenberg", "gb-", 400)],
  ["gov-health (human)", sample("datasets/corpus/human/gov/gov-health", "", 400)],
  ["AI inputs", readdirSync(AI_DIR).filter((f) => f.endsWith(".md")).map((f) => join(AI_DIR, f))]
];

for (const [name, files] of sources) {
  const l = stats(files, LLM);
  const s = stats(files, SIMP);
  console.log(`\n${name}  (${l.docs} docs)`);
  console.log(`  llm-vocab : ${l.ratePer1k}/1k   docs >1/1k: ${l.pctDocsOver1}%   docs >=2/1k: ${l.pctDocsOver2}%`);
  console.log(`  simplicity: ${s.ratePer1k}/1k   docs >1/1k: ${s.pctDocsOver1}%   docs >=2/1k: ${s.pctDocsOver2}%`);
}
