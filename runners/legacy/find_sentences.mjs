// Show the actual human-corpus sentences where borderline KEPT phrases fired,
// so each occurrence can be judged FP (legit) vs slop-in-human-text (TP).
import fs from "node:fs";
import { join } from "node:path";

const PHRASES = [
  "at its core", "a testament to", "tapestry of", "at the forefront of",
  "now more than ever", "learnings", "let's explore", "in an era where",
  "listen to your body", "there is no one-size-fits-all", "pain points",
  "everything you need to know", "forward-thinking", "deliver value",
  "it is time to", "excited to share", "harness the power of", "a blessing in disguise"
];
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
const out = {}; for (const p of PHRASES) out[p] = [];
for (const f of files) {
  let t; try { t = fs.readFileSync(f, "utf8"); } catch { continue; }
  const lo = t.toLowerCase();
  const topic = f.split("/").slice(2, 4).join("/");
  for (const p of PHRASES) {
    if (out[p].length >= 4) continue;
    let i = lo.indexOf(p);
    while (i >= 0 && out[p].length < 4) {
      let s = i; while (s > 0 && !".!?\n".includes(t[s - 1])) s--;
      let e = i + p.length; while (e < t.length && !".!?\n".includes(t[e])) e++;
      const sent = t.slice(s, e + 1).replace(/\s+/g, " ").trim();
      if (sent.length > 20 && sent.length < 280) out[p].push(`[${topic}] ${sent}`);
      i = lo.indexOf(p, i + 1);
    }
  }
}
for (const p of PHRASES) { console.log(`\n### ${p}`); for (const s of out[p]) console.log("  - " + s); }
