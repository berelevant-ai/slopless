// Surface the least-clear classifications: candidates with BOTH AI-TP > 0 and human-FP > 0,
// split by whether they SHIPPED (kept) or were dropped, with a human sample for context.
import fs from "node:fs";
const SCREEN = process.argv[2];
const lines = fs.readFileSync(SCREEN, "utf8").split("\n");

const cands = []; let cur = null;
for (const line of lines) {
  const m = line.match(/^AI:\s*(\d+)\s*\(\d+f\)\s+HUMAN:\s*(\d+)\s*\(\d+f\)/);
  if (m) { cur = { phrase: line.split(" | ").pop().trim(), ai: +m[1], human: +m[2], samples: [] }; cands.push(cur); }
  else if (cur && /^\s+(H:|\[)/.test(line.replace(/^\s+/, " "))) { if (line.trim()) cur.samples.push(line.trim()); }
}

const load = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return []; } };
const shipped = new Set();
for (const f of ["corporate-speak", "cliches", "seo-filler", "self-help-cliches", "genre-cliches", "weasel-attribution"])
  for (const x of load(`src/rules/phrases/data/${f}.json`)) shipped.add(x.toLowerCase());
const bf = fs.readFileSync("src/rules/syntactic-patterns/lead-ins/boilerplate-framing.ts", "utf8");
for (const m of bf.matchAll(/"([^"]+)"/g)) shipped.add(m[1].toLowerCase());

const seen = new Set();
const edges = cands.filter((c) => c.ai > 0 && c.human > 0 && !seen.has(c.phrase) && seen.add(c.phrase));
const kept = edges.filter((c) => shipped.has(c.phrase)).sort((a, b) => b.human - a.human);
const dropped = edges.filter((c) => !shipped.has(c.phrase)).sort((a, b) => b.ai - a.ai);

console.log(`=== RISKIEST KEEPS (SHIPPED but fired on human text) - ${kept.length} total ===`);
for (const c of kept.slice(0, 20)) console.log(`  KEEP  AI=${String(c.ai).padStart(3)} human=${c.human} | ${c.phrase}\n        e.g. ${c.samples[0] || "(no sample)"}`);
console.log(`\n=== COSTLIEST DROPS (DROPPED as FP but had AI signal) - ${dropped.length} total ===`);
for (const c of dropped.slice(0, 20)) console.log(`  DROP  AI=${String(c.ai).padStart(3)} human=${c.human} | ${c.phrase}\n        e.g. ${c.samples[0] || "(no sample)"}`);
