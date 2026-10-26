import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const [path, category, index] = process.argv.slice(2);
const entry = JSON.parse(readFileSync(path, "utf8")).requirements[category][
  Number(index)
];
assert.equal(entry.check, "public-runtime-contracts");
const result = spawnSync(
  process.execPath,
  ["--test", "scripts/runtime.test.mjs"],
  {
    encoding: "utf8",
    timeout: 45000,
    maxBuffer: 2 * 1024 * 1024
  }
);
assert.equal(result.error, undefined);
assert.notEqual(result.status, null);
process.stdout.write(
  `${JSON.stringify({
    check: entry.check,
    status: result.status === 0 ? "pass" : "fail",
    exitCode: result.status,
    output: result.stdout,
    stderr: result.stderr
  })}\n`
);
