// Apply assembled keep-lists to rule data files.
//  - corporate-speak.json, cliches.json: append new (dedup, preserve existing order)
//  - 4 new family data files: fresh sorted string arrays
// Narrative/body cliches are EXCLUDED from cliches (ungated would FP on fiction/memoir;
// the narrative-slop family handles them with gating - deferred).
import fs from "node:fs";
const final = (f) => JSON.parse(fs.readFileSync(`datasets/experiments/final/${f}.json`, "utf8"));

const CLICHES_EXCLUDE = new Set([
  "took a deep breath", "heart pounding in his chest", "brow furrowed in concentration",
  "breath caught in her throat", "room fell silent", "dust motes danced",
  "air thick with tension", "mind racing with possibilities", "words hung in the air",
  "smile playing on his lips", "days turned to weeks", "voice barely above a whisper",
  "face whatever challenges lie ahead", "life would never be the same",
  "they would face it together", "renewed sense of purpose", "newfound sense of purpose",
  "heart skipped a beat", "only just getting started"
]);

function append(path, add, exclude = new Set()) {
  const cur = JSON.parse(fs.readFileSync(path, "utf8"));
  const set = new Set(cur.map((s) => s.toLowerCase()));
  const fresh = [];
  for (const x of add) {
    const t = x.toLowerCase();
    if (exclude.has(t) || set.has(t)) continue;
    set.add(t); fresh.push(t);
  }
  fresh.sort((a, b) => a.localeCompare(b));
  const out = [...cur, ...fresh];
  fs.writeFileSync(path, JSON.stringify(out, null, 2) + "\n");
  console.log(`${path}: +${fresh.length} -> ${out.length}`);
}
function writeNew(dest, arr) {
  const s = [...new Set(arr.map((x) => x.toLowerCase()))].sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(dest, JSON.stringify(s, null, 2) + "\n");
  console.log(`${dest}: ${s.length}`);
}

append("src/rules/phrases/data/corporate-speak.json", final("corporate-speak"));
append("src/rules/phrases/data/cliches.json", final("cliches"), CLICHES_EXCLUDE);
writeNew("src/rules/phrases/data/seo-filler.json", final("seo-filler"));
writeNew("src/rules/phrases/data/self-help-cliches.json", final("self-help-platitudes"));
writeNew("src/rules/phrases/data/genre-cliches.json", final("genre-travel-review-recipe"));
writeNew("src/rules/phrases/data/weasel-attribution.json", final("weasel-attribution"));
