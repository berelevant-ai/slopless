// Rate-screen single-word AI-vocabulary candidates: occurrences per 1,000 words in
// human vs AI corpus, using the rule's tokenizer. AI-skewed, low-human-rate words are
// safe to add to the density set; words common in human prose are not.
import { wordTokens } from "../../dist/shared/text/tokens.js";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const CORPUS = "datasets/corpus";
function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".md") && e.name !== "LICENSE.md") out.push(p);
  }
  return out;
}
const sample = (a, k) => { const s = Math.max(1, Math.floor(a.length / k)); return a.filter((_, i) => i % s === 0).slice(0, k); };

const WORDS = JSON.parse(readFileSync("datasets/experiments/candidates-words.json", "utf8")).words.map((w) => w.toLowerCase());
const wordSet = new Set(WORDS);

const HUMAN = [
  ...sample(walk(`${CORPUS}/human/reference/wikipedia`), 800),
  ...sample(walk(`${CORPUS}/human/literary/gutenberg`), 600),
  ...walk(`${CORPUS}/human/science`), ...walk(`${CORPUS}/human/medical`),
  ...walk(`${CORPUS}/human/tech`), ...walk(`${CORPUS}/human/business`),
  ...walk(`${CORPUS}/human/gov`), ...walk(`${CORPUS}/human/legal`),
  ...walk(`${CORPUS}/human/news`),
  ...sample(walk(`${CORPUS}/human`).filter((f) => f.includes("/stackexchange/")), 2000)
];
const AI = [...walk(`${CORPUS}/ai-generated`), ...walk(`${CORPUS}/ai-suspected`)];

function tally(files) {
  const counts = {}; let words = 0;
  for (const f of files) {
    let t; try { t = readFileSync(f, "utf8"); } catch { continue; }
    for (const tok of wordTokens(t)) { words++; if (wordSet.has(tok.normalized)) counts[tok.normalized] = (counts[tok.normalized] || 0) + 1; }
  }
  return { counts, words };
}
const h = tally(HUMAN), a = tally(AI);
console.log(`HUMAN ${HUMAN.length} docs / ${Math.round(h.words / 1000)}k words ; AI ${AI.length} docs / ${Math.round(a.words / 1000)}k words\n`);
console.log("word | AI/1k | HUMAN/1k | skew(AI:HUMAN)");
const rows = WORDS.map((w) => {
  const ar = (a.counts[w] || 0) * 1000 / a.words;
  const hr = (h.counts[w] || 0) * 1000 / h.words;
  return { w, ar, hr, skew: hr > 0 ? ar / hr : (ar > 0 ? Infinity : 0) };
}).sort((x, y) => y.skew - x.skew);
for (const r of rows) console.log(`${r.w.padEnd(20)} ${r.ar.toFixed(2).padStart(6)} ${r.hr.toFixed(2).padStart(7)}   ${r.skew === Infinity ? "AI-only" : r.skew.toFixed(1) + "x"}`);
