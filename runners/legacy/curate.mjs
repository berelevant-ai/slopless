// Curate screened candidates into keep-lists per family.
// Guideline: keep clearly-sloppy phrases even if they appear a little in human text;
// drop phrases with heavy legitimate use or that are precise/common terms.
// Usage: node runners/legacy/curate.mjs <screen-output-file>
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SCREEN = process.argv[2];
const txt = readFileSync(SCREEN, "utf8");

// Recognized legitimate / common terms -> drop regardless of count.
const DROP = new Set([
  // common discourse connectives (legit everywhere; belong in density if anywhere)
  "of course", "this means that", "in other words", "as such", "clearly", "essentially",
  "that said", "generally speaking", "in essence", "fundamentally", "undoubtedly",
  "undeniably", "that being said", "without a doubt", "going forward", "moving forward",
  "all things considered", "in summary",
  // precise / legitimate professional terms
  "bandwidth", "be present", "state-of-the-art", "best practices", "value proposition",
  "holistic approach", "disruptive innovation", "industry-leading", "key performance indicators",
  "key stakeholders", "value-add", "go-to-market strategy", "kpis", "mission critical",
  "product-market fit", "paradigm shift", "deep dive", "pivot", "proactive approach",
  "core competency", "low-hanging fruit",
  // generic "the X of" / topic-frame templates (too common in legit prose)
  "when it comes to", "the future of", "the world of", "in the world of", "in the field of",
  "in the realm of", "the essence of", "at the intersection of", "in this article",
  "in the next section", "more than just", "a wave of", "the heart of", "in the heart of",
  // citation-attribution that is legitimate when the source is actually cited
  "studies have shown", "research has shown", "studies have found", "research has found",
  "according to research", "according to studies", "recent research suggests", "research suggests",
  "doctors recommend", "analysts say", "sources say", "observers have noted", "evidence points to",
  "the general consensus is", "the consensus is that", "needless to say", "studies show",
  "experts say", "experts agree", "many believe", "many people believe"
]);

const KEEP_FP_PHRASE = 3;
const KEEP_FP_OPENER = 2;

const counts = new Map();
let section = "phrases";
for (const line of txt.split("\n")) {
  if (line.includes("===== OPENERS")) section = "openers";
  const m = line.match(/^AI:\s*(\d+)\s*\(\d+f\)\s+HUMAN:\s*(\d+)\s*\(\d+f\)/);
  if (!m) continue;
  const parts = line.split(" | ");
  const phrase = parts[parts.length - 1]?.trim().toLowerCase();
  if (!phrase) continue;
  counts.set(`${section}::${phrase}`, { ai: +m[1], human: +m[2], section, phrase });
}

const meta = JSON.parse(readFileSync("datasets/experiments/candidates.json", "utf8")).meta;
const famOf = new Map();
for (const x of meta.phrases) famOf.set(`phrases::${x.text}`, x.family);
for (const x of meta.openers) famOf.set(`openers::${x.text}`, x.family);

const keep = {};
const dropped = { legit: 0, highFp: 0 };
for (const [key, c] of counts) {
  if (DROP.has(c.phrase)) { dropped.legit++; continue; }
  const lim = c.section === "openers" ? KEEP_FP_OPENER : KEEP_FP_PHRASE;
  if (c.human > lim) { dropped.highFp++; continue; }
  const fam = famOf.get(key) || "unknown";
  (keep[fam] ??= { family: fam, kind: c.section === "openers" ? "openers" : "phrases", items: [] })
    .items.push({ text: c.phrase, ai: c.ai, human: c.human });
}

mkdirSync("datasets/experiments/keep", { recursive: true });
let total = 0;
console.log(`Curated (KEEP_FP phrase<=${KEEP_FP_PHRASE} opener<=${KEEP_FP_OPENER}; dropped ${dropped.legit} legit-listed, ${dropped.highFp} high-FP):\n`);
for (const [fam, d] of Object.entries(keep).sort()) {
  d.items.sort((a, b) => b.ai - a.ai);
  writeFileSync(`datasets/experiments/keep/${fam}.json`, JSON.stringify(d, null, 2));
  const withTp = d.items.filter((i) => i.ai > 0).length;
  console.log(`  ${fam}: keep ${d.items.length} (${withTp} with AI-TP, ${d.items.length - withTp} clean-but-no-TP)`);
  total += d.items.length;
}
console.log(`\nTOTAL KEEP: ${total}`);
