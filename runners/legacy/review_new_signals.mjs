// Run the new antislop-gap signals over human corpus + AI and print the actual
// flagged lines for hand review (true slop vs false positive). Not a zero-FP gate.
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const EN = String.fromCharCode(0x2013);
const FILLER = new Set([
  "to be clear", "to be honest", "let me be clear", "let me be honest",
  "in all honesty", "here's the thing", "here's the kicker",
  "honestly", "frankly", "candidly"
]);
const CORP_NEW = new Set([
  "table stakes", "next-level", "supercharge", "world-class", "best-in-class", "north star"
]);

const sample = (dir, prefix, k) => {
  const fs = readdirSync(dir).filter((f) => f.endsWith(".md") && f.startsWith(prefix)).sort();
  const step = Math.max(1, Math.floor(fs.length / k));
  return Array.from({ length: Math.min(k, fs.length) }, (_, i) => join(dir, fs[i * step]));
};
const AI = "datasets/experiments/ai-editor-vs-gate/inputs";
const sources = {
  wikipedia: sample("datasets/corpus/human/reference/wikipedia", "wiki-", 120),
  gutenberg: sample("datasets/corpus/human/literary/gutenberg", "gb-", 150),
  "gov-health": sample("datasets/corpus/human/gov/gov-health", "", 150),
  ai: readdirSync(AI).filter((f) => f.endsWith(".md")).map((f) => join(AI, f))
};
const ev = (msg) => {
  const m = msg.match(/found:\s*"?([^".]+)"?/);
  return m ? m[1].trim().toLowerCase() : "";
};

const buckets = { filler: [], corp: [], cliche: [], endash: [], emdash: [] };
for (const [src, files] of Object.entries(sources)) {
  for (const f of files) {
    let out = "";
    try { out = execFileSync("node", ["dist/cli.js", f], { encoding: "utf8", maxBuffer: 5e7 }); }
    catch (e) { out = e.stdout ? e.stdout.toString() : ""; }
    let arr;
    try { arr = JSON.parse(out); } catch { continue; }
    const lines = readFileSync(f, "utf8").split("\n");
    for (const entry of arr) for (const m of entry.messages || []) {
      const rid = m.ruleId.replace("slopless/", "");
      const line = (lines[m.line - 1] || "").trim();
      const e = ev(m.message);
      if (rid === "boilerplate-framing" && FILLER.has(e)) buckets.filler.push([src, e, line]);
      else if (rid === "corporate-speak" && CORP_NEW.has(e)) buckets.corp.push([src, e, line]);
      else if (rid === "cliches" && e === "stands as a testament to") buckets.cliche.push([src, "", line]);
      else if (rid === "em-dashes") (line.includes(EN) ? buckets.endash : buckets.emdash).push([src, "", line]);
    }
  }
}
for (const k of ["filler", "corp", "cliche", "endash"]) {
  const b = buckets[k];
  const bysrc = {};
  for (const r of b) bysrc[r[0]] = (bysrc[r[0]] || 0) + 1;
  console.log(`\n### ${k} (${b.length} hits)  ${JSON.stringify(bysrc)}`);
  const step = Math.max(1, Math.floor(b.length / 14));
  for (let i = 0, c = 0; i < b.length && c < 14; i += step, c++) {
    const r = b[i];
    console.log(`  [${r[0].slice(0, 4)}] ${r[1] ? r[1] + " | " : ""}${r[2].slice(0, 135)}`);
  }
}
console.log(`\nplain em-dash hits (for reference): ${buckets.emdash.length}`);
