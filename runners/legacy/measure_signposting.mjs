// Measure formal-transition-density (now incl. significance signposts) on the
// technical-human corpus (FP: clusters should be rare in clean prose) and dev.to (TP).
import { execFileSync } from "node:child_process";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const md = (d) =>
  existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".md") && f !== "LICENSE.md").map((f) => join(d, f)) : [];
const sample = (arr, k) => {
  const step = Math.max(1, Math.floor(arr.length / k));
  return arr.filter((_, i) => i % step === 0).slice(0, k);
};
const tech = [
  ...md("datasets/corpus/human/tech/peps"),
  ...md("datasets/corpus/human/tech/mdn"),
  ...md("datasets/corpus/human/tech/rfcs")
];
const dev = md("datasets/corpus/ai-suspected/tech/devto");

const run = (files, label) => {
  let fired = 0, total = 0;
  const samples = [];
  for (const f of files) {
    let out = "";
    try { out = execFileSync("node", ["dist/cli.js", f], { encoding: "utf8", maxBuffer: 5e7 }); }
    catch (e) { out = e.stdout ? e.stdout.toString() : ""; }
    let arr;
    try { arr = JSON.parse(out); } catch { continue; }
    let hit = 0;
    let msg = "";
    for (const entry of arr) for (const m of entry.messages || []) {
      if (m.ruleId.includes("formal-transition-density")) { total += 1; hit += 1; msg = m.message; }
    }
    if (hit) { fired += 1; if (samples.length < 10) samples.push(`${f.split("/").pop()} :: ${msg.slice(0, 120)}`); }
  }
  console.log(`\n${label}: ${files.length} files, ${fired} fired (${(100 * fired / files.length).toFixed(1)}%), ${total} total hits`);
  for (const s of samples) console.log(`   ${s}`);
};

run(sample(tech, 400), "TECH-HUMAN (want ~0 FP)");
run(sample(dev, 400), "DEVTO (TP)");
