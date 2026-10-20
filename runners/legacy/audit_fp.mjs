// Proper FP audit: for EVERY shipped new phrase, pull the actual human-corpus
// SENTENCE it fired in (via the real matcher), so each instance can be judged
// slop vs legitimate. Outputs only phrases that fired on human text.
import { findUnquotedPhraseMatches } from "../../dist/shared/matchers/phrases.js";
import fs from "node:fs";
import { join } from "node:path";

const load = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return []; } };
// shipped additions = the curated lists I applied (+ openers added to boilerplate-framing)
const PH = new Set();
for (const f of ["corporate-speak", "cliches", "seo-filler", "self-help-platitudes", "genre-travel-review-recipe", "weasel-attribution"])
  for (const x of load(`datasets/experiments/final/${f}.json`)) PH.add(x.toLowerCase());
for (const x of load("datasets/experiments/final/openers-signposts.json")) PH.add(x.toLowerCase());
const PHRASES = [...PH];

function walk(d) {
  const o = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) o.push(...walk(p));
    else if (e.name.endsWith(".md") && e.name !== "LICENSE.md") o.push(p);
  }
  return o;
}
const files = walk("datasets/corpus/human");
const hits = new Map(); // phrase -> [{topic, sentence}]
for (const f of files) {
  let t; try { t = fs.readFileSync(f, "utf8"); } catch { continue; }
  const topic = f.split("/").slice(2, 4).join("/");
  for (const m of findUnquotedPhraseMatches(t, PHRASES)) {
    const ph = m.phrase.toLowerCase();
    const arr = hits.get(ph) || []; if (arr.length >= 3) continue;
    let s = m.start; while (s > 0 && !".!?\n".includes(t[s - 1])) s--;
    let e = m.end; while (e < t.length && !".!?\n".includes(t[e])) e++;
    const sent = t.slice(s, e + 1).replace(/\s+/g, " ").trim();
    if (sent.length > 15 && sent.length < 300) { arr.push(`[${topic}] ${sent}`); hits.set(ph, arr); }
  }
}
const fired = [...hits.entries()].sort((a, b) => b[1].length - a[1].length);
console.log(`Shipped new phrases: ${PHRASES.length}. Fired on human text: ${fired.length}.\n`);
for (const [ph, sents] of fired) { console.log(`### ${ph}`); for (const s of sents) console.log("  - " + s); }
