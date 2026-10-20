// Full-corpus audit: run the complete linter (all rules) over a large capped sample of
// every human source + the full AI sets; capture the source line for every hit; aggregate
// per rule (human hits = FP candidates, AI hits = TP), with human sample sentences.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { join } from "node:path";

const ROOT = "/Users/tartakovsky/Projects/agent-quality-controls/slopless";
const C = `${ROOT}/datasets/corpus`;
function walk(d) {
  if (!fs.existsSync(d)) return [];
  const o = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) o.push(...walk(p));
    else if (e.name.endsWith(".md") && e.name !== "LICENSE.md") o.push(p);
  }
  return o;
}
const sample = (a, k) => { if (a.length <= k) return a; const s = Math.ceil(a.length / k); return a.filter((_, i) => i % s === 0).slice(0, k); };

// leaf source dirs under each provenance
function leaves(prov) {
  const base = `${C}/${prov}`;
  if (!fs.existsSync(base)) return [];
  const out = [];
  for (const t of fs.readdirSync(base)) {
    const td = join(base, t); if (!fs.statSync(td).isDirectory()) continue;
    for (const s of fs.readdirSync(td)) {
      const sd = join(td, s); if (fs.statSync(sd).isDirectory()) out.push({ prov, topic: t, source: s, dir: sd });
    }
  }
  return out;
}
const CAP_HUMAN = 250, CAP_AI = 600;
const files = [];
for (const prov of ["human", "ai-generated", "ai-suspected"]) {
  for (const leaf of leaves(prov)) {
    const cap = prov === "human" ? CAP_HUMAN : CAP_AI;
    for (const f of sample(walk(leaf.dir), cap)) files.push({ ...leaf, file: f });
  }
}
const metaByPath = new Map(files.map((f) => [f.file, f]));
console.log(`Linting ${files.length} docs (${new Set(files.map((f) => f.prov + "/" + f.topic + "/" + f.source)).size} sources)...`);

const byRule = {};
const humanFindings = fs.createWriteStream(`${ROOT}/datasets/experiments/audit/human_findings.jsonl`, { flags: "w" });
fs.mkdirSync(`${ROOT}/datasets/experiments/audit`, { recursive: true });

const BATCH = 60;
let done = 0;
for (let i = 0; i < files.length; i += BATCH) {
  const batch = files.slice(i, i + BATCH);
  let out = "";
  try { out = execFileSync("node", ["dist/cli.js", ...batch.map((b) => b.file)], { encoding: "utf8", maxBuffer: 8e8, cwd: ROOT }); }
  catch (e) { out = e.stdout ? e.stdout.toString() : ""; }
  let arr; try { arr = JSON.parse(out); } catch { done += batch.length; continue; }
  for (const entry of arr) {
    const meta = metaByPath.get(entry.filePath) || metaByPath.get(entry.filePath?.replace(ROOT + "/", ""));
    if (!meta) continue;
    const lines = (() => { try { return fs.readFileSync(entry.filePath, "utf8").split("\n"); } catch { return []; } })();
    for (const m of entry.messages || []) {
      const rule = (m.ruleId || "?").replace("slopless/", "");
      const ln = (m.loc?.start?.line || m.line || 1);
      const lineText = (lines[ln - 1] || "").trim().slice(0, 300);
      const r = byRule[rule] ??= { human: 0, ai: 0, topics: {}, samples: [] };
      if (meta.prov === "human") {
        r.human += 1; r.topics[`${meta.topic}/${meta.source}`] = (r.topics[`${meta.topic}/${meta.source}`] || 0) + 1;
        if (r.samples.length < 30) r.samples.push(`[${meta.topic}/${meta.source}] (${m.message?.slice(0, 50)}) ${lineText}`);
        humanFindings.write(JSON.stringify({ rule, topic: meta.topic, source: meta.source, message: m.message, line: lineText }) + "\n");
      } else r.ai += 1;
    }
  }
  done += batch.length;
  if (done % 600 === 0) console.log(`  ${done}/${files.length}`);
}
humanFindings.end();

const rows = Object.entries(byRule).sort((a, b) => b[1].human - a[1].human);
console.log(`\n=== PER-RULE (human=FP candidates, ai=TP) - ${rows.length} rules fired ===`);
for (const [rule, r] of rows) console.log(`human=${String(r.human).padStart(5)} ai=${String(r.ai).padStart(5)} | ${rule}`);
fs.writeFileSync(`${ROOT}/datasets/experiments/audit/per_rule.json`, JSON.stringify(byRule, null, 2));
console.log("\nwrote audit/per_rule.json + audit/human_findings.jsonl");
