// Coverage audit: does every enabled rule fire on at least one fixture file?
// Runs the CLI over all cases/* and corpus/* fixtures and reports rules that
// never fire. Run from repo root: node runners/legacy/fixture_coverage.mjs
import * as slopless from "../../dist/index.js";
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join, extname } from "node:path";

const cfg =
  slopless.rulesConfig ?? slopless.presets?.everything?.rules ?? slopless.rules ?? {};
const strip = (s) => s.replace(/^slopless\//, "");
const ruleNames = [...new Set(Object.entries(cfg).filter(([, enabled]) => enabled !== false).map(([name]) => strip(name)))].sort();

function walk(dir, acc) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (extname(e.name) === ".md") acc.push(p);
  }
  return acc;
}
const files = [
  ...walk("behavior/fixtures/textlint-rules/cases", []),
  ...walk("behavior/fixtures/textlint-rules/corpus", [])
];

let out = "";
try {
  out = execFileSync("node", ["dist/cli.js", ...files], { encoding: "utf8", maxBuffer: 3e8 });
} catch (e) {
  out = e.stdout ? e.stdout.toString() : "";
}
const arr = JSON.parse(out);
const fired = new Set();
for (const f of arr) for (const m of f.messages || []) fired.add(strip(m.ruleId));

const gaps = ruleNames.filter((r) => !fired.has(r));
console.log(`fixture files scanned: ${files.length}`);
console.log(`enabled rules: ${ruleNames.length}`);
console.log(`fired on >=1 fixture: ${ruleNames.length - gaps.length}`);
console.log(`NO fixture firing (${gaps.length}):`);
for (const g of gaps) console.log("  - " + g);
const extra = [...fired].filter((r) => !ruleNames.includes(r)).sort();
if (extra.length) console.log(`\nfired but not in enabled list: ${extra.join(", ")}`);
