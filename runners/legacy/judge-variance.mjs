// Quantify AI-judge non-determinism across 3 runs on the same gate-passed text.
// Usage: node runners/legacy/judge-variance.mjs <doc-stem> [<doc-stem> ...]
import { readFileSync, writeFileSync } from "node:fs";

const DIR = "datasets/experiments/ai-editor-vs-gate/judge";

function norm(q) {
  return String(q)
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function loadRun(stem, k) {
  const raw = readFileSync(`${DIR}/${stem}.run${k}.json`, "utf8");
  const arr = JSON.parse(raw);
  return new Set(arr.map((o) => norm(o.quote)).filter(Boolean));
}

const out = {};
for (const stem of process.argv.slice(2)) {
  const runs = [1, 2, 3].map((k) => loadRun(stem, k));
  const counts = runs.map((s) => s.size);
  const union = new Set(runs.flatMap((s) => [...s]));
  const inAll = [...union].filter((q) => runs.every((s) => s.has(q)));
  const inOne = [...union].filter((q) => runs.filter((s) => s.has(q)).length === 1);
  out[stem] = {
    counts,
    union: union.size,
    in_all_three: inAll.length,
    in_exactly_one: inOne.length,
    stability_pct: Math.round((inAll.length / union.size) * 100)
  };
}
writeFileSync(`${DIR}/../results/judge-variance.json`, JSON.stringify(out, null, 2));
for (const [stem, v] of Object.entries(out)) {
  console.log(`\n${stem}:`);
  console.log(`  per-run counts: ${v.counts.join(", ")}`);
  console.log(`  union of distinct items across 3 runs: ${v.union}`);
  console.log(`  flagged in ALL 3 runs (stable): ${v.in_all_three} (${v.stability_pct}%)`);
  console.log(`  flagged in only 1 of 3 runs (noise): ${v.in_exactly_one}`);
}
