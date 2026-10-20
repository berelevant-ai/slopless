// Validate the new document-level significance-density rule: TP on synthetic slop,
// FP on technical-human prose and dev.to, via the real CLI.
import { execFileSync } from "node:child_process";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const md = (d) => existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".md") && f !== "LICENSE.md").map((f) => join(d, f)) : [];
const sample = (a, k) => { const s = Math.max(1, Math.floor(a.length / k)); return a.filter((_, i) => i % s === 0).slice(0, k); };

const run = (files, label) => {
  let fired = 0;
  const samples = [];
  for (const f of files) {
    let out = "";
    try { out = execFileSync("node", ["dist/cli.js", f], { encoding: "utf8", maxBuffer: 5e7 }); }
    catch (e) { out = e.stdout ? e.stdout.toString() : ""; }
    let arr; try { arr = JSON.parse(out); } catch { continue; }
    let hit = "";
    for (const e of arr) for (const m of e.messages || []) if (/significance-density/.test(m.ruleId)) hit = m.message;
    if (hit) { fired += 1; if (samples.length < 6) samples.push(`${f.split("/").pop()} :: ${hit.slice(0, 70)}`); }
  }
  console.log(`\n${label}: ${files.length} files, ${fired} fired (${(100 * fired / files.length).toFixed(1)}%)`);
  for (const s of samples) console.log(`   ${s}`);
};

run(md("datasets/corpus/ai-generated/business/synthetic-claude"), "SYNTHETIC (TP target)");
run([...sample(md("datasets/corpus/human/tech/peps"), 150), ...sample(md("datasets/corpus/human/tech/mdn"), 150), ...sample(md("datasets/corpus/human/tech/rfcs"), 150)], "TECH-HUMAN (want 0 FP)");
run(sample(md("datasets/corpus/ai-suspected/tech/devto"), 300), "DEVTO");
