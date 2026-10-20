// True-positive check: run the real linter over the synthetic slop docs and tally
// which kept additions fire (corporate-speak, cliches, formal-transition-density).
import { execFileSync } from "node:child_process";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = "datasets/corpus/ai-generated/business/synthetic-claude";
const files = existsSync(dir)
  ? readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "LICENSE.md").map((f) => join(dir, f))
  : [];

const TARGET = /corporate-speak|cliches|formal-transition-density/;
const byRule = {};
const phraseCounts = {};
const docsFiring = {};
let docsAny = 0;

for (const f of files) {
  let out = "";
  try { out = execFileSync("node", ["dist/cli.js", f], { encoding: "utf8", maxBuffer: 5e7 }); }
  catch (e) { out = e.stdout ? e.stdout.toString() : ""; }
  let arr;
  try { arr = JSON.parse(out); } catch { continue; }
  const rulesHere = new Set();
  let firedTarget = false;
  for (const entry of arr) for (const m of entry.messages || []) {
    const rid = m.ruleId.replace("slopless/", "");
    byRule[rid] = (byRule[rid] || 0) + 1;
    if (TARGET.test(rid)) {
      firedTarget = true;
      rulesHere.add(rid);
      const ev = (m.message.match(/found:?\s*"?([^".(]+)"?/) || [])[1];
      if (ev) { const k = `${rid} :: ${ev.trim().toLowerCase()}`; phraseCounts[k] = (phraseCounts[k] || 0) + 1; }
    }
  }
  for (const r of rulesHere) docsFiring[r] = (docsFiring[r] || 0) + 1;
  if (firedTarget) docsAny += 1;
}

console.log(`Synthetic docs: ${files.length}. Docs firing a target rule (corp/cliche/signpost-density): ${docsAny} (${(100 * docsAny / files.length).toFixed(0)}%)\n`);
console.log("Docs firing, by target rule:");
for (const r of ["phrases/corporate-speak", "phrases/cliches", "syntactic-patterns/formal-transition-density"]) {
  const k = Object.keys(docsFiring).find((x) => x.includes(r.split("/")[1]));
  console.log(`  ${r}: ${k ? docsFiring[k] : 0} docs`);
}
console.log("\nDistinct kept phrases that fired (TP evidence):");
for (const [k, n] of Object.entries(phraseCounts).sort((a, b) => b[1] - a[1])) console.log(`  ${n}x  ${k}`);
