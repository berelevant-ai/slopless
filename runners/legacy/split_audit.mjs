// Split the collected human-corpus slop signals into judged false-positive and
// judged true-positive files, by per-rule verdict from a sampled hand-audit.
//
// Verdict principle:
//   TRUE  = the rule correctly identified the construction it targets (a real,
//           if sometimes mild, writing issue), even though a human wrote it.
//   FALSE = the rule misfired on legitimate human prose (over-broad pattern,
//           wrong threshold, or a narrative rule firing on non-narrative text).
//
// This is a RULE-LEVEL split informed by reading samples of each rule's hits.
// Some rules are mixed; see notes. Per-instance it is approximate.
import { readFileSync, writeFileSync } from "node:fs";

const VERDICT = {
  // FALSE: over-broad / misfiring on normal human writing
  "triple-repeat": "false",            // repeated "the"/"it"/"she" openers in reference prose; empty-opener bug
  "negation-reframe": "false",         // normal "not X but Y" correlative (Austen, Conrad, Douglass)
  "simplicity": "false",               // "numerous"->"many" is a nitpick, not slop
  "fragment-stacking": "false",        // fires on reference lists / tables of contents / credits, not prose
  "softening-language": "false",       // appropriate hedging in reference/science writing
  "llm-vocabulary": "false",           // legit human use of "comprehensive/moreover/vital"
  "perception-verb-density": "false",  // 2 perception verbs is normal in narrative/biography
  "prohibited-words": "false",         // "actually" etc. are ordinary words in human prose
  "generic-signposting": "false",      // "as such" is a normal connective
  "repeated-sentence-starts": "false", // expected structure in factual/list prose
  "hedge-stacking": "false",           // appropriate caution in reference writing
  "body-action-density": "false",      // low threshold; "heart" 3x in a health article
  "universalizing-claims": "false",    // flags vague quantifiers ("some aspects"), not universals
  "demonstrative-emphasis": "false",   // "This phenomenon was..." is normal scientific prose
  "semantic-thinness": "false",        // narrative template misfires on concrete factual sentences (verified)
  "empty-beat": "false",               // narrative rule firing on non-narrative text
  "low-information-beat-density": "false", // narrative rule; "heart/chest" in health text
  "response-wrapper": "false",         // "Certainly" as a normal adverb, not chat scaffolding (verified)
  "boilerplate-framing": "false",      // "X includes..." is normal factual listing
  "contrastive-aphorism": "false",     // misfires on ordinary technical sentences (verified)
  "uncomparables": "false",            // pedantic; "most perfect"/"very true" accepted in literary prose
  "flat-action-cadence": "false",      // over-broad, tiny n

  // TRUE: correctly identifies the targeted construction (real, if sometimes mild)
  "wordiness": "true",                 // "in order to", "a number of" are genuinely wordy
  "cliches": "true",                   // "first and foremost", "for free" are genuine cliches
  "redundancy": "true",                // "close proximity", "absolutely essential" are genuine redundancy
  "uncited-authority": "true",         // "some argue", "studies suggest" are genuine weasel words
  "corporate-speak": "true",           // "synergy", "plays a key role" are genuine filler (borderline)
  "skunked-terms": "true",             // "hopefully" etc. genuinely skunked (pedantic)
  "prohibited-phrases": "true",        // genuine banned stock phrases
  "summative-closer": "true",
  "narrative-cliches": "true",
  "academic-boilerplate": "true",
  "humble-bragger": "true",
  "llm-vocabulary-density": "true",    // concentration of stock words, not a single word
  "formal-transition-density": "true",
  "affirmation-closers": "true",
  "boilerplate-conclusion": "true",
  "emotion-telling": "true"            // correctly identifies bare emotion labels
};

const rows = readFileSync("datasets/corpus/_audit/slop-signals.jsonl", "utf8")
  .split("\n").filter(Boolean).map((s) => JSON.parse(s));

const falseOut = [];
const trueOut = [];
const unknown = new Set();
const perRule = {};
for (const r of rows) {
  const v = VERDICT[r.rule];
  perRule[r.rule] = perRule[r.rule] || { v: v || "UNKNOWN", n: 0 };
  perRule[r.rule].n++;
  if (v === "true") trueOut.push(JSON.stringify(r));
  else if (v === "false") falseOut.push(JSON.stringify(r));
  else { unknown.add(r.rule); falseOut.push(JSON.stringify(r)); }
}

writeFileSync("datasets/corpus/_audit/false-positives.jsonl", falseOut.join("\n") + "\n");
writeFileSync("datasets/corpus/_audit/true-positives.jsonl", trueOut.join("\n") + "\n");

const total = rows.length;
console.log(`total slop signals: ${total}`);
console.log(`judged FALSE positive: ${falseOut.length} (${(falseOut.length / total * 100).toFixed(1)}%)`);
console.log(`judged TRUE positive:  ${trueOut.length} (${(trueOut.length / total * 100).toFixed(1)}%)`);
if (unknown.size) console.log(`UNMAPPED rules (routed to false): ${[...unknown].join(", ")}`);
console.log("\nper-rule (verdict, count):");
for (const [rule, o] of Object.entries(perRule).sort((a, b) => b[1].n - a[1].n)) {
  console.log(`  ${o.v.padEnd(6)} ${String(o.n).padStart(6)}  ${rule}`);
}
