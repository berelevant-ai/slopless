import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createSlopless, listChecks } from "../dist/index.js";

const known = new Set(listChecks().map((x) => x.id));
const results = [];
for (const path of process.argv.slice(2)) {
  const fixture = JSON.parse(readFileSync(path, "utf8"));
  assert.ok(Array.isArray(fixture.cases));
  for (const item of fixture.cases) {
    assert.equal(typeof item.id, "string");
    assert.equal(typeof item.text, "string");
    assert.ok(item.checks.every((id) => known.has(id)));
    const client = {
      async judge(input, signal) {
        signal.throwIfAborted();
        return Object.fromEntries(
          Object.keys(input.questions).map((id) => [
            id,
            item.scores[id] ?? 0.05
          ])
        );
      }
    };
    const engine = createSlopless({ checks: item.checks, jev: client });
    try {
      results.push({
        id: item.id,
        result: await engine.lintText(item.text, `${item.id}.md`)
      });
    } catch (error) {
      results.push({ id: item.id, error: error.message });
    }
  }
}
process.stdout.write(`${JSON.stringify(results)}\n`);
