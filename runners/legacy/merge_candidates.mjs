// Merge per-target brainstorm candidate JSONs into screening inputs.
//   datasets/experiments/candidates/<group>.json  (each: {family, kind, items:[{text,fp_risk,note,example}]})
// ->
//   datasets/experiments/candidates.json        {phrases:[...], openers:[...], meta:{...}}  (for screen_candidates.mjs)
//   datasets/experiments/candidates-words.json  {words:[...], meta:{...}}                    (density-word candidates)
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = "datasets/experiments/candidates";
if (!existsSync(dir)) { console.log("no candidates dir yet"); process.exit(0); }

const phrases = new Map(), openers = new Map(), words = new Map();
const add = (map, it, family) => {
  const t = String(it.text || "").toLowerCase().trim();
  if (!t) return;
  if (!map.has(t)) map.set(t, { text: t, family, fp_risk: it.fp_risk || "?", note: it.note || "", example: it.example || "" });
};
for (const f of readdirSync(dir).filter((x) => x.endsWith(".json"))) {
  let data; try { data = JSON.parse(readFileSync(join(dir, f), "utf8")); } catch { console.log("skip (bad json):", f); continue; }
  const items = data.items || [];
  const kind = data.kind || "phrases";
  const family = data.family || f.replace(/\.json$/, "");
  for (const it of items) add(kind === "words" ? words : kind === "openers" ? openers : phrases, it, family);
}

writeFileSync("datasets/experiments/candidates.json", JSON.stringify({
  phrases: [...phrases.keys()],
  openers: [...openers.keys()],
  meta: { phrases: [...phrases.values()], openers: [...openers.values()] }
}, null, 2));
writeFileSync("datasets/experiments/candidates-words.json", JSON.stringify({
  words: [...words.keys()], meta: [...words.values()]
}, null, 2));

console.log(`merged: ${phrases.size} phrases, ${openers.size} openers, ${words.size} words`);
const byFam = {};
for (const m of [phrases, openers, words]) for (const v of m.values()) byFam[v.family] = (byFam[v.family] || 0) + 1;
console.log("by family:", JSON.stringify(byFam));
