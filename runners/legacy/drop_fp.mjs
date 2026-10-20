// Drop the shipped phrases that the sentence-level audit showed are legitimate in their
// human instances (false positives). Keep only the few that are slop in-register.
import fs from "node:fs";

const audit = fs.readFileSync(process.argv[2], "utf8");
const fired = [];
for (const line of audit.split("\n")) { const m = line.match(/^### (.+)$/); if (m) fired.push(m[1].trim().toLowerCase()); }

// Genuinely slop in their human instances (jargon / platitudes in their own register) - KEEP.
const KEEP = new Set(["learnings", "believe in yourself", "find your purpose"]);
const DROP = new Set(fired.filter((p) => !KEEP.has(p)));

console.log(`Audit fired-on-human: ${fired.length}. Keeping ${KEEP.size}, dropping ${DROP.size}.\n`);

const dataFiles = [
  "src/rules/phrases/data/corporate-speak.json",
  "src/rules/phrases/data/cliches.json",
  "src/rules/phrases/data/seo-filler.json",
  "src/rules/phrases/data/self-help-cliches.json",
  "src/rules/phrases/data/genre-cliches.json",
  "src/rules/phrases/data/weasel-attribution.json"
];
for (const f of dataFiles) {
  const arr = JSON.parse(fs.readFileSync(f, "utf8"));
  const kept = arr.filter((x) => !DROP.has(x.toLowerCase()));
  fs.writeFileSync(f, JSON.stringify(kept, null, 2) + "\n");
  console.log(`${f}: ${arr.length} -> ${kept.length} (-${arr.length - kept.length})`);
}

// Which dropped phrases are openers in boilerplate-framing (need a .ts edit)?
const bf = fs.readFileSync("src/rules/syntactic-patterns/lead-ins/boilerplate-framing.ts", "utf8");
const openers = [...bf.matchAll(/"([^"]+)"/g)].map((m) => m[1].toLowerCase());
const openerDrops = openers.filter((o) => DROP.has(o));
console.log(`\nOpeners to remove from boilerplate-framing.ts (${openerDrops.length}):`);
console.log(JSON.stringify(openerDrops));
