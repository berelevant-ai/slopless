// Count specific rule findings across given files. Usage: node measure_rules.mjs <file...>
import { execFileSync } from "node:child_process";

const files = process.argv.slice(2);
let out = "";
try {
  out = execFileSync("node", ["dist/cli.js", ...files], { encoding: "utf8", maxBuffer: 2e8 });
} catch (e) {
  out = e.stdout ? e.stdout.toString() : "";
}
let arr = [];
try {
  arr = JSON.parse(out);
} catch {
  console.log("  parse-err");
  process.exit(0);
}
const counts = {};
for (const f of arr) for (const m of f.messages || []) counts[m.ruleId] = (counts[m.ruleId] || 0) + 1;
for (const k of ["slopless/llm-vocabulary", "slopless/llm-vocabulary-density", "slopless/simplicity"]) {
  console.log("  " + k.replace("slopless/", "") + ": " + (counts[k] || 0));
}
