// FP screen: do the KEPT hype/cliche additions fire on human VC prose
// (Paul Graham essays = thoughtful; a16z = marketing)? Real matcher.
import { findUnquotedPhraseMatches } from "../../dist/shared/matchers/phrases.js";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const KEPT = [
  // corporate-speak (17)
  "secret sauce", "force multiplier", "boil the ocean", "best-of-breed",
  "go-to-market motion", "bleeding-edge", "drive value", "deliver impact",
  "move fast and break things", "10x your", "data-driven insights",
  "actionable insights", "empower your team", "ecosystem of partners",
  "innovate at the speed of", "reimagine the future of", "built for the enterprise",
  // cliches (23)
  "serves as a reminder that", "serves as a testament to", "paves the way for",
  "ushers in a new era", "speaks volumes about", "reflects a broader",
  "stands as a beacon of", "represents a paradigm shift", "embodies the spirit of",
  "cements its place as", "leaves an indelible mark", "heralds a new era",
  "signals a seismic shift", "drives home the point", "brings to the fore",
  "takes center stage", "reshapes the landscape", "charts a new course",
  "shines a spotlight on", "amplifies the need for", "redefines the boundaries of",
  "paints a vivid picture of", "holds the key to"
];

const md = (d) => existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".md") && f !== "LICENSE.md").map((f) => join(d, f)) : [];

const scan = (files, label) => {
  const counts = {};
  const samples = {};
  let docsHit = 0;
  for (const f of files) {
    let text; try { text = readFileSync(f, "utf8"); } catch { continue; }
    const here = new Set();
    for (const m of findUnquotedPhraseMatches(text, KEPT)) {
      const p = m.phrase.toLowerCase();
      counts[p] = (counts[p] || 0) + 1;
      here.add(p);
      if (!samples[p]) samples[p] = text.slice(Math.max(0, m.start - 40), m.start + 50).replace(/\s+/g, " ").trim();
    }
    if (here.size) docsHit += 1;
  }
  console.log(`\n=== ${label}: ${files.length} docs, ${docsHit} with >=1 hit ===`);
  for (const [p, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${n}x  ${p}`);
    console.log(`        e.g. ${samples[p]}`);
  }
  if (!Object.keys(counts).length) console.log("  (no hits)");
};

scan(md("datasets/corpus/human/business/paulgraham"), "PAUL GRAHAM (thoughtful human VC)");
scan(md("datasets/corpus/human/business/a16z"), "a16z (human VC marketing)");
