// Measure the density-based actually-overuse rule: how many AI vs human docs it flags,
// split by warning/error tier, and how many docs were scanned (for the flag rate).
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
      if (fs.statSync(sd).isDirectory()) out.push({ prov, dir: sd });
    }
  }
  return out;
}

const CAP = { human: 120, ai: 600 };
const groups = { human: [], ai: [] };
for (const prov of ["human", "ai-generated", "ai-suspected"]) {
  const key = prov === "human" ? "human" : "ai";
  for (const leaf of leaves(prov)) {
    for (const f of sample(walk(leaf.dir), CAP[key])) groups[key].push(f);
  }
}

function measure(files) {
  let warn = 0,
    err = 0,
    docs = 0;
  const BATCH = 60;
  for (let i = 0; i < files.length; i += BATCH) {
    const batch = files.slice(i, i + BATCH);
    let out = "";
    try {
      out = execFileSync("node", ["dist/cli.js", ...batch], {
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
      continue;
    }
    for (const entry of arr) {
      const hits = (entry.messages || []).filter((m) =>
        (m.ruleId || "").includes("actually-overuse")
      );
      if (hits.length === 0) continue;
      docs += 1;
      for (const m of hits) {
        if (m.severity === 2) err += 1;
        else warn += 1;
      }
    }
  }
  return { docs, warn, err, total: files.length };
}

for (const [label, files] of Object.entries(groups)) {
  const r = measure(files);
  console.log(
    `${label}: scanned ${r.total} docs -> ${r.docs} flagged (warning ${r.warn}, error ${r.err}) = ${((r.docs / r.total) * 100).toFixed(1)}% of docs`
  );
}
