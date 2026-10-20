// Assemble curated keep-lists into clean, globally-deduped, target-mapped string arrays.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";

const dir = "datasets/experiments/keep";
// Dedup priority: a text claimed by a more-specific phrase family wins over openers.
const PRIORITY = [
  "corporate-speak", "narrative-cliches", "cliches", "seo-filler",
  "self-help-platitudes", "genre-travel-review-recipe", "weasel-attribution",
  "openers-signposts"
];
const claimed = new Set();
const out = {};
for (const fam of PRIORITY) {
  const path = `${dir}/${fam}.json`;
  if (!existsSync(path)) continue;
  const d = JSON.parse(readFileSync(path, "utf8"));
  const items = [];
  for (const it of d.items) {
    const t = String(it.text).toLowerCase().trim();
    if (t.includes("[") || t.includes("]")) continue; // template placeholder
    if (t.length < 3) continue;
    if (claimed.has(t)) continue;
    claimed.add(t);
    items.push(t);
  }
  out[fam] = items.sort();
}
mkdirSync("datasets/experiments/final", { recursive: true });
for (const [fam, items] of Object.entries(out)) {
  writeFileSync(`datasets/experiments/final/${fam}.json`, JSON.stringify(items, null, 2));
}
console.log(Object.entries(out).map(([f, i]) => `${f}: ${i.length}`).join("\n"));
console.log("TOTAL:", Object.values(out).reduce((s, i) => s + i.length, 0));
