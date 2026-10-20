// Screen candidate slop phrases/openers against the full corpus tree:
//   human/**        -> false-positive corpus (clearly-human / pre-AI)
//   ai-generated/** + ai-suspected/** -> true-positive corpus (AI / suspected-AI)
// Uses the REAL matcher for phrases and the boilerplate-framing opener logic.
// Usage: node runners/legacy/screen_candidates.mjs [candidates.json]
//   candidates.json = { "phrases": [...], "openers": [...] }  (defaults to datasets/experiments/candidates.json)
import { findUnquotedPhraseMatches } from "../../dist/shared/matchers/phrases.js";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const CORPUS = "datasets/corpus";
function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".md") && e.name !== "LICENSE.md") out.push(p);
  }
  return out;
}

const candPath = process.argv[2] || "datasets/experiments/candidates.json";
const CAND = JSON.parse(readFileSync(candPath, "utf8"));
const PHRASES = (CAND.phrases || []).map((p) => p.toLowerCase());
const OPENERS = (CAND.openers || []).map((p) => p.toLowerCase());

// Sample huge legacy dirs (wikipedia/gutenberg) by stride for speed; full otherwise.
function sampleWalk(dir, cap) {
  const all = walk(dir);
  if (!cap || all.length <= cap) return all;
  const step = Math.ceil(all.length / cap);
  return all.filter((_, i) => i % step === 0);
}
const HUMAN = [
  walk(`${CORPUS}/human`),
  sampleWalk(`${CORPUS}/wikipedia`, 1000),
  sampleWalk(`${CORPUS}/gutenberg`, 1000),
  walk(`${CORPUS}/gov-health`),
  walk(`${CORPUS}/tech-human`),
  walk(`${CORPUS}/tech-vc`)
].flat();
const AI = [
  walk(`${CORPUS}/ai-generated`),
  walk(`${CORPUS}/ai-suspected`),
  walk(`${CORPUS}/ai-slop`)
].flat();
// topic label from path: corpus/<branch>/<topic-or-source>/...
const topicOf = (f) => f.split("/").slice(2).find((x) => x && !x.endsWith(".md")) || "?";

const PREFIXES = ["however, ", "but ", "and ", "so ", "that being said, "];
const cleanSent = (s) => {
  let t = s.trim().toLowerCase().replaceAll(String.fromCharCode(0x2019), "'");
  for (const p of PREFIXES) if (t.startsWith(p)) { t = t.slice(p.length); break; }
  return t.trim();
};
const splitSentences = (t) => t.split(/\n+/).flatMap((l) => l.split(/(?<=[.!?])\s+/));

function blank() { return { humanFiles: 0, human: 0, aiFiles: 0, ai: 0, samples: [], humanTopics: {} }; }
const pStats = new Map(PHRASES.map((p) => [p, blank()]));
const oStats = new Map(OPENERS.map((p) => [p, blank()]));
let humanWords = 0, aiWords = 0;

function scan(files, isHuman) {
  for (const f of files) {
    let text; try { text = readFileSync(f, "utf8"); } catch { continue; }
    const words = (text.match(/\S+/g) || []).length;
    if (isHuman) humanWords += words; else aiWords += words;
    const topic = topicOf(f);
    const seenP = new Set();
    for (const m of findUnquotedPhraseMatches(text, PHRASES)) {
      const s = pStats.get(m.phrase.toLowerCase()); if (!s) continue;
      if (isHuman) { s.human++; if (!seenP.has(m.phrase)) { s.humanFiles++; seenP.add(m.phrase); s.humanTopics[topic] = (s.humanTopics[topic]||0)+1; } if (s.samples.length<3) s.samples.push(`[${topic}] ...${text.slice(Math.max(0,m.start-35),m.start+45).replace(/\s+/g," ").trim()}...`); }
      else { s.ai++; }
    }
    const seenPa = new Set();
    if (!isHuman) for (const m of findUnquotedPhraseMatches(text, PHRASES)) { const s=pStats.get(m.phrase.toLowerCase()); if(s&&!seenPa.has(m.phrase)){s.aiFiles++;seenPa.add(m.phrase);} }
    const seenO = new Set(), seenOa = new Set();
    for (const sent of splitSentences(text)) {
      const c = cleanSent(sent); if (!c) continue;
      for (const o of OPENERS) if (c.startsWith(o)) {
        const s = oStats.get(o);
        if (isHuman) { s.human++; if(!seenO.has(o)){s.humanFiles++;seenO.add(o);s.humanTopics[topic]=(s.humanTopics[topic]||0)+1;} if(s.samples.length<3) s.samples.push(`[${topic}] ${sent.replace(/\s+/g," ").trim().slice(0,80)}`); }
        else { s.ai++; if(!seenOa.has(o)){s.aiFiles++;seenOa.add(o);} }
      }
    }
  }
}
scan(HUMAN, true);
scan(AI, false);

const report = (title, m) => {
  console.log(`\n===== ${title}  (HUMAN ${HUMAN.length} docs/${Math.round(humanWords/1000)}k words ; AI ${AI.length} docs/${Math.round(aiWords/1000)}k words) =====`);
  const rows = [...m.values()].map((r, i) => ({ ...r, phrase: [...m.keys()][i] }));
  rows.sort((a, b) => b.human - a.human || b.ai - a.ai);
  for (const r of rows) {
    const tag = r.human === 0 ? "CLEAN" : `FP:${r.human}/${r.humanFiles}f`;
    console.log(`AI:${String(r.ai).padStart(4)} (${r.aiFiles}f)  HUMAN:${String(r.human).padStart(4)} (${r.humanFiles}f) ${tag==="CLEAN"?"":"  "+tag}${r.human?"  topics:"+JSON.stringify(r.humanTopics):""} | ${r.phrase}`);
    if (r.human > 0) for (const s of r.samples.slice(0,2)) console.log(`        ${s}`);
  }
};
report("PHRASES", pStats);
report("OPENERS", oStats);
