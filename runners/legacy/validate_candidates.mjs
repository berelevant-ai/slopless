// Screen expansion candidates against the FULL human corpus (false positives)
// and the AI-generated set (true positives), using the REAL phrase matcher for
// phrase candidates and the real boilerplate-framing opener logic for openers.
// Also flags any candidate that already exists in a shipped phrase list (dedup).
import { findUnquotedPhraseMatches } from "../../dist/shared/matchers/phrases.js";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

// ---- candidates -----------------------------------------------------------
const OPENERS = [
  "truth be told", "if i'm being honest", "if i'm being perfectly honest",
  "let me level with you", "i'll be straight with you", "i'll be frank",
  "no sugarcoating", "real talk", "i won't sugarcoat it",
  "not to put too fine a point on it", "let's be real", "make no mistake",
  "the fact of the matter is", "the reality is", "the truth is", "the thing is",
  "here's the deal", "here's what's really going on", "at the end of the day",
  "when all is said and done", "bottom line", "the bottom line is",
  "importantly", "notably", "crucially", "significantly", "tellingly",
  "remarkably", "interestingly", "strikingly", "curiously",
  "it's worth noting that", "it bears mentioning that", "it should be noted that",
  "worth noting", "as a matter of fact", "in point of fact"
];
const PHRASES = [
  // hype / corporate-speak
  "single source of truth", "secret sauce", "force multiplier", "boil the ocean",
  "paradigm shift", "best-of-breed", "go-to-market motion", "industry-leading",
  "state-of-the-art", "bleeding-edge", "groundbreaking", "purpose-built",
  "mission-critical", "at scale", "drive value", "unlock growth", "deliver impact",
  "move fast and break things", "10x your", "disruptive innovation",
  "transformative impact", "holistic approach", "leverage our platform",
  "robust solution", "seamless experience", "end-to-end solution", "frictionless",
  "data-driven insights", "actionable insights", "real-time insights",
  "value proposition", "time to value", "customer success", "digital transformation",
  "empower your team", "scalable solution", "360-degree view", "ecosystem of partners",
  "thought leader", "innovate at the speed of", "reimagine the future of",
  "built for the enterprise",
  // inflated verbs
  "serves as a reminder that", "serves as a testament to", "paves the way for",
  "ushers in a new era", "speaks volumes about", "underscores the importance of",
  "highlights the need for", "reflects a broader", "marks a turning point",
  "stands as a beacon of", "lays the foundation for", "opens the door to",
  "sets the stage for", "represents a paradigm shift", "embodies the spirit of",
  "cements its place as", "leaves an indelible mark", "heralds a new era",
  "signals a seismic shift", "drives home the point", "brings to the fore",
  "takes center stage", "reshapes the landscape", "charts a new course",
  "bridges the gap between", "shines a spotlight on", "amplifies the need for",
  "redefines the boundaries of", "paints a vivid picture of", "holds the key to"
];

// ---- dedup: load every shipped phrase list --------------------------------
const CURRENT_OPENERS = new Set([
  "to be clear", "to be honest", "let me be clear", "let me be honest",
  "in all honesty", "here's the thing", "here's the kicker", "honestly",
  "frankly", "candidly"
]);
const existing = new Set();
const ruleFiles = readdirSync("src/rules", { recursive: true })
  .filter((f) => typeof f === "string" && f.endsWith(".json"));
for (const rel of ruleFiles) {
  try {
    const data = JSON.parse(readFileSync(join("src/rules", rel), "utf8"));
    if (Array.isArray(data)) {
      for (const e of data) if (typeof e === "string") existing.add(e.toLowerCase());
    }
  } catch { /* not an array list */ }
}
const dedup = (c) => {
  const hits = [];
  if (existing.has(c) || CURRENT_OPENERS.has(c)) hits.push("EXACT");
  for (const e of existing) {
    if (e !== c && (e.includes(c) || c.includes(e))) { hits.push(`~"${e}"`); break; }
  }
  return hits.join(" ");
};

// ---- corpus ---------------------------------------------------------------
const allFiles = (dir) =>
  readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => join(dir, f));
const HUMAN = [
  ...allFiles("datasets/corpus/human/reference/wikipedia"),
  ...allFiles("datasets/corpus/human/literary/gutenberg"),
  ...allFiles("datasets/corpus/human/gov/gov-health")
];
const AI = allFiles("datasets/experiments/ai-editor-vs-gate/inputs");

const PREFIXES = ["however, ", "but ", "and ", "so ", "that being said, "];
const cleanSent = (s) => {
  let t = s.trim().toLowerCase().replaceAll(String.fromCharCode(0x2019), "'");
  for (const p of PREFIXES) if (t.startsWith(p)) { t = t.slice(p.length); break; }
  return t.trim();
};
const splitSentences = (text) =>
  text.split(/\n+/).flatMap((line) => line.split(/(?<=[.!?])\s+/));

const stat = (phrase) => ({ phrase, human: 0, humanFiles: 0, ai: 0, samples: [] });
const phraseStats = new Map(PHRASES.map((p) => [p, stat(p)]));
const openerStats = new Map(OPENERS.map((p) => [p, stat(p)]));

const scan = (files, isHuman) => {
  for (const f of files) {
    let text;
    try { text = readFileSync(f, "utf8"); } catch { continue; }
    // phrases (real matcher, one pass)
    const seenInFile = new Set();
    for (const m of findUnquotedPhraseMatches(text, PHRASES)) {
      const s = phraseStats.get(m.phrase.toLowerCase());
      if (!s) continue;
      if (isHuman) {
        s.human += 1;
        if (!seenInFile.has(m.phrase)) { s.humanFiles += 1; seenInFile.add(m.phrase); }
        if (s.samples.length < 3) s.samples.push(text.slice(Math.max(0, m.start - 40), m.start + 60).replace(/\s+/g, " ").trim());
      } else s.ai += 1;
    }
    // openers (real logic per sentence)
    const openSeen = new Set();
    for (const sent of splitSentences(text)) {
      const c = cleanSent(sent);
      if (!c) continue;
      for (const o of OPENERS) {
        if (c.startsWith(o)) {
          const s = openerStats.get(o);
          if (isHuman) {
            s.human += 1;
            if (!openSeen.has(o)) { s.humanFiles += 1; openSeen.add(o); }
            if (s.samples.length < 3) s.samples.push(sent.replace(/\s+/g, " ").trim().slice(0, 90));
          } else s.ai += 1;
        }
      }
    }
  }
};
scan(HUMAN, true);
scan(AI, false);

const report = (title, m) => {
  console.log(`\n===== ${title} (human corpus: ${HUMAN.length} docs, AI: ${AI.length} docs) =====`);
  const rows = [...m.values()].sort((a, b) => b.human - a.human || b.ai - a.ai);
  for (const r of rows) {
    const d = dedup(r.phrase);
    console.log(`${String(r.human).padStart(4)} hum(${r.humanFiles}f)  ${String(r.ai).padStart(3)} ai  | ${r.phrase}${d ? "   [DEDUP " + d + "]" : ""}`);
    if (r.human > 0) for (const s of r.samples.slice(0, 2)) console.log(`        H: ${s}`);
  }
};
report("PHRASES", phraseStats);
report("OPENERS", openerStats);
