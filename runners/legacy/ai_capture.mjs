// Capture every AI-corpus finding (rule, file, message, line) to a jsonl so the same
// linting can be run under the old vs new rule set and diffed to measure AI true-positive
// loss. Usage: node runners/legacy/ai_capture.mjs <output.jsonl>
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { join } from "node:path";

const ROOT = "/Users/tartakovsky/Projects/agent-quality-controls/slopless";
const C = `${ROOT}/datasets/corpus`;
const OUT = process.argv[2];
if (!OUT) {
  console.error("need output path");
  process.exit(1);
}

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
const sample = (a, k) => {
  if (a.length <= k) return a;
  const s = Math.ceil(a.length / k);
  return a.filter((_, i) => i % s === 0).slice(0, k);
};
function leaves(prov) {
  const base = `${C}/${prov}`;
  if (!fs.existsSync(base)) return [];
  const out = [];
  for (const t of fs.readdirSync(base)) {
    const td = join(base, t);
    if (!fs.statSync(td).isDirectory()) continue;
    for (const s of fs.readdirSync(td)) {
      const sd = join(td, s);
      if (fs.statSync(sd).isDirectory())
        out.push({ prov, topic: t, source: s, dir: sd });
    }
  }
  return out;
}

const CAP_AI = 600;
const files = [];
for (const prov of ["ai-generated", "ai-suspected"]) {
  for (const leaf of leaves(prov)) {
    for (const f of sample(walk(leaf.dir), CAP_AI)) files.push({ ...leaf, file: f });
  }
}
const metaByPath = new Map(files.map((f) => [f.file, f]));
console.log(`AI capture: ${files.length} docs -> ${OUT}`);

const ws = fs.createWriteStream(OUT, { flags: "w" });
const BATCH = 60;
let done = 0;
const counts = {};
for (let i = 0; i < files.length; i += BATCH) {
  const batch = files.slice(i, i + BATCH);
  let out = "";
  try {
    out = execFileSync("node", ["dist/cli.js", ...batch.map((b) => b.file)], {
      encoding: "utf8",
      maxBuffer: 8e8,
      cwd: ROOT
    });
  } catch (e) {
    out = e.stdout ? e.stdout.toString() : "";
  }
  let arr;
  try {
    arr = JSON.parse(out);
  } catch {
    done += batch.length;
    continue;
  }
  for (const entry of arr) {
    const meta =
      metaByPath.get(entry.filePath) ||
      metaByPath.get(entry.filePath?.replace(ROOT + "/", ""));
    if (!meta) continue;
    const lines = (() => {
      try {
        return fs.readFileSync(entry.filePath, "utf8").split("\n");
      } catch {
        return [];
      }
    })();
    for (const m of entry.messages || []) {
      const rule = (m.ruleId || "?").replace("slopless/", "");
      const ln = m.loc?.start?.line || m.line || 1;
      const lineText = (lines[ln - 1] || "").trim().slice(0, 300);
      counts[rule] = (counts[rule] || 0) + 1;
      ws.write(
        JSON.stringify({
          rule,
          source: meta.source,
          file: entry.filePath.replace(ROOT + "/", ""),
          line: ln,
          message: m.message,
          text: lineText
        }) + "\n"
      );
    }
  }
  done += batch.length;
}
ws.end();
const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log(`wrote ${OUT}; rules fired: ${rows.length}`);
