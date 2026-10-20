// Run the new antislop-gap signals over the full fixture set + fresh-slop corpus
// (the slop-rich registers), printing actual flagged lines for hand review.
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";

const EN = String.fromCharCode(0x2013);
const FILLER = new Set([
  "to be clear", "to be honest", "let me be clear", "let me be honest",
  "in all honesty", "here's the thing", "here's the kicker",
  "honestly", "frankly", "candidly"
]);
const CORP_NEW = new Set([
  "table stakes", "next-level", "supercharge", "world-class", "best-in-class", "north star"
]);
const ev = (msg) => {
  const m = msg.match(/found:\s*"?([^".]+)"?/);
  return m ? m[1].trim().toLowerCase() : "";
};

function walk(dir, acc) {
  let entries = [];
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (extname(e.name) === ".md") acc.push(p);
  }
  return acc;
}
const files = [
  ...walk("behavior/fixtures", []),
  ...walk("datasets/corpus/generated-slop", [])
];

const buckets = { filler: [], corp: [], cliche: [], endash: [] };
for (const f of files) {
  let out = "";
  try { out = execFileSync("node", ["dist/cli.js", f], { encoding: "utf8", maxBuffer: 5e7 }); }
  catch (e) { out = e.stdout ? e.stdout.toString() : ""; }
  let arr;
  try { arr = JSON.parse(out); } catch { continue; }
  const lines = readFileSync(f, "utf8").split("\n");
  const short = f.replace(/^.*\/(fixtures|generated-slop)\//, "$1/");
  for (const entry of arr) for (const m of entry.messages || []) {
    const rid = m.ruleId.replace("slopless/", "");
    const line = (lines[m.line - 1] || "").trim();
    const e = ev(m.message);
    if (rid === "boilerplate-framing" && FILLER.has(e)) buckets.filler.push([short, e, line]);
    else if (rid === "corporate-speak" && CORP_NEW.has(e)) buckets.corp.push([short, e, line]);
    else if (rid === "cliches" && e === "stands as a testament to") buckets.cliche.push([short, "", line]);
    else if (rid === "em-dashes" && line.includes(EN)) buckets.endash.push([short, "", line]);
  }
}
console.log(`scanned ${files.length} files`);
for (const k of ["filler", "corp", "cliche", "endash"]) {
  const b = buckets[k];
  console.log(`\n### ${k} (${b.length} hits)`);
  for (let i = 0; i < Math.min(b.length, 20); i++) {
    const r = b[i];
    console.log(`  ${r[1] ? r[1] + " | " : ""}${r[2].slice(0, 130)}  [${r[0]}]`);
  }
}
