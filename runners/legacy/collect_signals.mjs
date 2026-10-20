// Collect every non-formatting slopless signal across the whole human corpus.
// Formatting/orthography (incl. em-dashes) is excluded. Readability metrics are
// routed to a separate file. The remaining "slop" signals are the audit set.
// Output (under the gitignored corpus dir):
//   datasets/corpus/_audit/slop-signals.jsonl
//   datasets/corpus/_audit/readability-signals.jsonl
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const exec = promisify(execFile);
const CLI = resolve("./dist/cli.js");

const ORTHO = new Set([
  "slopless/smart-quotes", "slopless/em-dashes", "slopless/exclamation-density",
  "slopless/colon-dramatic", "slopless/sentence-case", "slopless/artifact-placeholders",
  "slopless/fake-timestamps", "slopless/hidden-unicode-controls"
]);
const METRIC = new Set([
  "slopless/flesch-kincaid", "slopless/gunning-fog", "slopless/coleman-liau",
  "slopless/avg-sentence-length", "slopless/paragraph-length", "slopless/word-repetition"
]);

const SOURCES = [
  { label: "wikipedia", dir: "datasets/corpus/human/reference/wikipedia" },
  { label: "gutenberg", dir: "datasets/corpus/human/literary/gutenberg" },
  { label: "gov-health", dir: "datasets/corpus/human/gov/gov-health" }
];

const all = [];
for (const s of SOURCES) {
  for (const f of readdirSync(s.dir).filter((x) => x.endsWith(".md"))) {
    all.push({ src: s.label, path: join(s.dir, f), name: f });
  }
}

const BATCH = 40;
const CONC = 6;
const batches = [];
for (let i = 0; i < all.length; i += BATCH) batches.push(all.slice(i, i + BATCH));

const slop = [];
const read = [];

async function doBatch(batch) {
  const byPath = new Map(batch.map((b) => [resolve(b.path), b]));
  let stdout = "";
  try {
    ({ stdout } = await exec("node", [CLI, ...batch.map((b) => b.path)], { maxBuffer: 2e8 }));
  } catch (e) {
    stdout = e.stdout ? e.stdout.toString() : "";
    if (!stdout) return;
  }
  let arr;
  try { arr = JSON.parse(stdout); } catch { return; }
  for (const e of arr) {
    const meta = byPath.get(resolve(e.filePath)) || { src: "?", name: e.filePath };
    for (const m of e.messages || []) {
      if (ORTHO.has(m.ruleId)) continue;
      const rec = JSON.stringify({
        src: meta.src, file: meta.name, line: m.line,
        rule: m.ruleId.replace("slopless/", ""), msg: m.message
      });
      (METRIC.has(m.ruleId) ? read : slop).push(rec);
    }
  }
}

let idx = 0;
async function worker() {
  while (idx < batches.length) {
    const my = batches[idx++];
    await doBatch(my);
    if (idx % 20 === 0) console.log(`...${idx}/${batches.length} batches`);
  }
}

mkdirSync("datasets/corpus/_audit", { recursive: true });
await Promise.all(Array.from({ length: CONC }, worker));
writeFileSync("datasets/corpus/_audit/slop-signals.jsonl", slop.join("\n") + "\n");
writeFileSync("datasets/corpus/_audit/readability-signals.jsonl", read.join("\n") + "\n");
console.log(`DONE. slop signals: ${slop.length}  readability signals: ${read.length}`);
