// Re-validate the KEPT expansion additions against the new technical-human corpus
// (PEPs + MDN + RFCs = real software-engineering prose) and the original general
// human corpus, using the real matcher. Flags any kept term that fires on technical
// prose (a false positive the original corpus could not catch).
import { findUnquotedPhraseMatches } from "../../dist/shared/matchers/phrases.js";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

// Kept additions (post Tier-1/Tier-2 removals)
const NEW_OPENERS = [
  "truth be told", "if i'm being honest", "if i'm being perfectly honest",
  "let me level with you", "i'll be straight with you", "i'll be frank",
  "no sugarcoating", "i won't sugarcoat it", "not to put too fine a point on it",
  "let's be real", "here's the deal", "here's what's really going on",
  "when all is said and done", "the fact of the matter is", "the bottom line is",
  "it's worth noting that", "it bears mentioning that", "worth noting"
];
const NEW_PHRASES = [
  // corporate-speak (kept hype)
  "secret sauce", "force multiplier", "boil the ocean", "best-of-breed",
  "go-to-market motion", "bleeding-edge", "drive value", "deliver impact",
  "move fast and break things", "10x your", "data-driven insights",
  "actionable insights", "empower your team", "ecosystem of partners",
  "innovate at the speed of", "reimagine the future of", "built for the enterprise",
  // cliches (kept inflated verbs)
  "serves as a reminder that", "serves as a testament to", "paves the way for",
  "ushers in a new era", "speaks volumes about", "underscores the importance of",
  "reflects a broader", "stands as a beacon of", "represents a paradigm shift",
  "embodies the spirit of", "cements its place as", "leaves an indelible mark",
  "heralds a new era", "signals a seismic shift", "drives home the point",
  "brings to the fore", "takes center stage", "reshapes the landscape",
  "charts a new course", "shines a spotlight on", "amplifies the need for",
  "redefines the boundaries of", "paints a vivid picture of", "holds the key to"
];

const mdFiles = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "LICENSE.md").map((f) => join(dir, f))
    : [];
const TECH = [
  ...mdFiles("datasets/corpus/human/tech/peps"),
  ...mdFiles("datasets/corpus/human/tech/mdn"),
  ...mdFiles("datasets/corpus/human/tech/rfcs")
];
const GEN = [
  ...mdFiles("datasets/corpus/human/reference/wikipedia"),
  ...mdFiles("datasets/corpus/human/literary/gutenberg"),
  ...mdFiles("datasets/corpus/human/gov/gov-health")
];
const DEVTO = mdFiles("datasets/corpus/ai-suspected/tech/devto"); // TP, may be empty if still collecting

const PREFIXES = ["however, ", "but ", "and ", "so ", "that being said, "];
const cleanSent = (s) => {
  let t = s.trim().toLowerCase().replaceAll(String.fromCharCode(0x2019), "'");
  for (const p of PREFIXES) if (t.startsWith(p)) { t = t.slice(p.length); break; }
  return t.trim();
};
const splitSentences = (text) => text.split(/\n+/).flatMap((l) => l.split(/(?<=[.!?])\s+/));

const mk = (p) => ({ phrase: p, tech: 0, techF: 0, gen: 0, dev: 0, samples: [] });
const phraseStats = new Map(NEW_PHRASES.map((p) => [p, mk(p)]));
const openerStats = new Map(NEW_OPENERS.map((p) => [p, mk(p)]));

const scan = (files, key) => {
  for (const f of files) {
    let text;
    try { text = readFileSync(f, "utf8"); } catch { continue; }
    const seen = new Set();
    for (const m of findUnquotedPhraseMatches(text, NEW_PHRASES)) {
      const s = phraseStats.get(m.phrase.toLowerCase());
      if (!s) continue;
      s[key] += 1;
      if (key === "tech") {
        if (!seen.has(m.phrase)) { s.techF += 1; seen.add(m.phrase); }
        if (s.samples.length < 3) s.samples.push(text.slice(Math.max(0, m.start - 45), m.start + 55).replace(/\s+/g, " ").trim());
      }
    }
    for (const sent of splitSentences(text)) {
      const c = cleanSent(sent);
      if (!c) continue;
      for (const o of NEW_OPENERS) if (c.startsWith(o)) {
        const s = openerStats.get(o);
        s[key] += 1;
        if (key === "tech" && s.samples.length < 3) s.samples.push(sent.replace(/\s+/g, " ").trim().slice(0, 95));
      }
    }
  }
};
scan(TECH, "tech");
scan(GEN, "gen");
scan(DEVTO, "dev");

const report = (title, m) => {
  console.log(`\n===== ${title}  TECH=${TECH.length} GEN=${GEN.length} DEVTO=${DEVTO.length} =====`);
  const rows = [...m.values()].sort((a, b) => b.tech - a.tech || b.dev - a.dev);
  for (const r of rows) {
    const flag = r.tech > 0 ? "  <-- FP on technical prose" : "";
    console.log(`tech=${String(r.tech).padStart(3)} gen=${String(r.gen).padStart(3)} dev=${String(r.dev).padStart(3)} | ${r.phrase}${flag}`);
    if (r.tech > 0) for (const s of r.samples.slice(0, 2)) console.log(`        T: ${s}`);
  }
};
report("PHRASES (corporate-speak + cliches)", phraseStats);
report("OPENERS", openerStats);
