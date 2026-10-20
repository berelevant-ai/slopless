// Show the actual flagged text for one rule across a corpus sample.
// Usage: node runners/legacy/show_rule.mjs <dir> <prefix> <ruleId> [nFiles] [maxHits]
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

const CLI = resolve("./dist/cli.js");
const [dir, prefix, ruleId, nFilesArg, maxHitsArg] = process.argv.slice(2);
const nFiles = Number(nFilesArg) || 150;
const maxHits = Number(maxHitsArg) || 40;

function pick(arr, n) {
  if (arr.length <= n) return arr;
  const step = arr.length / n;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)]);
}

const files = pick(
  readdirSync(dir).filter((f) => f.endsWith(".md") && f.startsWith(prefix)).sort(),
  nFiles
);

let hits = 0;
let scanned = 0;
for (const name of files) {
  if (hits >= maxHits) break;
  scanned++;
  const path = join(dir, name);
  let out = "";
  try { out = execFileSync("node", [CLI, path], { encoding: "utf8" }); }
  catch (e) { out = e.stdout ? e.stdout.toString() : ""; }
  if (!out) continue;
  let msgs;
  try { msgs = (JSON.parse(out)[0] || {}).messages || []; } catch { continue; }
  const lines = readFileSync(path, "utf8").split("\n");
  for (const m of msgs) {
    if (m.ruleId !== `slopless/${ruleId}`) continue;
    hits++;
    const ctx = (lines[m.line - 1] || "").trim().slice(0, 240);
    console.log(`\n[${name} L${m.line}]`);
    console.log(`  msg: ${m.message}`);
    console.log(`  ctx: ${ctx}`);
    if (hits >= maxHits) break;
  }
}
console.log(`\n--- ${hits} ${ruleId} hits from ${scanned} files scanned ---`);
