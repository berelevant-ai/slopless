import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve, relative, join } from "node:path";
import { createLinter, loadTextlintrc } from "textlint";

const [rootArg, baselineArg, outputArg, currentArg] = process.argv.slice(2);
if (!rootArg || !baselineArg || !outputArg) throw new Error("Usage: audit-cadence.mjs CORPUS_ROOT BASELINE_RULE OUTPUT_DIR");
const root = resolve(rootArg), output = resolve(outputArg);
mkdirSync(output, { recursive: true });
const current = resolve(currentArg ?? "dist/rules/narrative-slop/flat-action-cadence.js");
async function linter(rule, name) {
  const configFilePath = join(output, `${name}.config.json`);
  writeFileSync(configFilePath, JSON.stringify({ rules: { [resolve(rule)]: true } }));
  const descriptor = await loadTextlintrc({ configFilePath });
  if (descriptor.rule.lintableDescriptors.length !== 1) throw new Error(`${name}: expected one loaded rule`);
  const instance = createLinter({ descriptor });
  const smokeText = currentArg ? "No implant. No brain surgery." : "She walked to the door. She looked at the latch. She stepped back.";
  const smoke = await instance.lintText(smokeText, "smoke.md");
  if (smoke.messages.length !== 1) throw new Error(`${name}: rule smoke test failed`);
  return instance;
}
const before = await linter(baselineArg, "before");
const after = await linter(current, "after");
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name);
    return e.isDirectory() ? files(path) : /\.(md|txt)$/i.test(e.name) && !/^license/i.test(e.name) ? [path] : [];
  }).sort();
}
const changes = [], stats = {}, all = files(root), start = performance.now();
for (const [i, path] of all.entries()) {
  const file = relative(root, path), group = file.split("/").slice(0, 3).join("/");
  const source = readFileSync(path, "utf8");
  const oldResult = await before.lintText(source, `${path}.md`);
  const newResult = await after.lintText(source, `${path}.md`);
  const key = (m) => JSON.stringify([m.range, m.message]);
  const oldKeys = new Set(oldResult.messages.map(key)), newKeys = new Set(newResult.messages.map(key));
  const added = newResult.messages.filter((m) => !oldKeys.has(key(m)));
  const removed = oldResult.messages.filter((m) => !newKeys.has(key(m)));
  const s = stats[group] ??= { files: 0, words: 0, before: 0, after: 0, added: 0, removed: 0 };
  s.files++; s.words += source.match(/\b[\p{L}\p{N}]+(?:[''-][\p{L}\p{N}]+)*\b/gu)?.length ?? 0;
  s.before += oldResult.messages.length; s.after += newResult.messages.length;
  s.added += added.length; s.removed += removed.length;
  const excerpt = (m) => ({ ...m, text: source.slice(m.range[0], m.range[1]) });
  if (added.length || removed.length) changes.push({ file, added: added.map(excerpt), removed: removed.map(excerpt) });
  if ((i + 1) % 250 === 0) process.stderr.write(`${i + 1}/${all.length} files; ${Math.round((performance.now() - start) / 1000)}s\n`);
}
writeFileSync(join(output, "changes.json"), JSON.stringify(changes, null, 2));
const summary = { root, files: all.length, seconds: (performance.now() - start) / 1000, stats };
writeFileSync(join(output, "summary.json"), JSON.stringify(summary, null, 2));
const totals = Object.values(stats).reduce((total, row) => {
  for (const [key, value] of Object.entries(row)) total[key] = (total[key] ?? 0) + value;
  return total;
}, {});
process.stdout.write(JSON.stringify({ ...totals, seconds: summary.seconds }, null, 2) + "\n");
