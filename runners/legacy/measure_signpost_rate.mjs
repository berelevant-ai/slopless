// Does a DOCUMENT-LEVEL significance-signpost rate separate AI slop from technical
// prose? Counts sentence-initial significance markers per doc + per-1000-words rate.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { splitSentences } from "../../dist/shared/text/sentences.js";
import { wordTokens } from "../../dist/shared/text/tokens.js";

const MARK = [
  ["notably"], ["importantly"], ["crucially"], ["significantly"], ["interestingly"],
  ["remarkably"], ["curiously"], ["tellingly"], ["strikingly"],
  ["it", "is", "worth", "noting"], ["it", "s", "worth", "noting"], ["worth", "noting"],
  ["it", "is", "important", "to", "note"], ["it", "s", "important", "to", "note"]
];
const isMark = (toks) => MARK.some((m) => m.every((w, i) => toks[i]?.normalized === w));
const md = (d) => existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".md") && f !== "LICENSE.md").map((f) => join(d, f)) : [];
const sample = (a, k) => { const s = Math.max(1, Math.floor(a.length / k)); return a.filter((_, i) => i % s === 0).slice(0, k); };

const stats = (files) => {
  const rows = [];
  for (const f of files) {
    const t = readFileSync(f, "utf8");
    const words = (t.match(/\S+/g) || []).length;
    let c = 0;
    for (const s of splitSentences(t)) if (isMark(wordTokens(s.text))) c += 1;
    rows.push({ c, words, rate: words ? (c * 1000) / words : 0 });
  }
  return rows;
};

const summarize = (name, rows) => {
  const n = rows.length;
  const pct = (f) => `${(100 * rows.filter(f).length / n).toFixed(0)}%`;
  const medianWords = rows.map((r) => r.words).sort((a, b) => a - b)[Math.floor(n / 2)];
  console.log(`\n=== ${name} (${n} docs, median ${medianWords} words) ===`);
  console.log(`  markers >=1: ${pct((r) => r.c >= 1)}   >=2: ${pct((r) => r.c >= 2)}   >=3: ${pct((r) => r.c >= 3)}   >=4: ${pct((r) => r.c >= 4)}`);
  console.log(`  rate >=1/1k: ${pct((r) => r.rate >= 1)}   >=2/1k: ${pct((r) => r.rate >= 2)}   >=3/1k: ${pct((r) => r.rate >= 3)}   >=5/1k: ${pct((r) => r.rate >= 5)}`);
  console.log(`  combined (>=3 markers AND rate>=3/1k): ${pct((r) => r.c >= 3 && r.rate >= 3)}`);
  console.log(`  combined (>=2 markers AND rate>=5/1k): ${pct((r) => r.c >= 2 && r.rate >= 5)}`);
};

const tech = [
  ...sample(md("datasets/corpus/human/tech/peps"), 200),
  ...sample(md("datasets/corpus/human/tech/mdn"), 200),
  ...sample(md("datasets/corpus/human/tech/rfcs"), 200)
];
summarize("TECH-HUMAN (FP risk)", stats(tech));
summarize("SYNTHETIC (TP target)", stats(md("datasets/corpus/ai-generated/business/synthetic-claude")));
summarize("DEVTO (TP candidate)", stats(sample(md("datasets/corpus/ai-suspected/tech/devto"), 400)));
