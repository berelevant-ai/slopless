import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { after, test } from "node:test";

const directory = mkdtempSync(join(tmpdir(), "slopless-cli-test-"));
after(() => rmSync(directory, { recursive: true, force: true }));
const install = join(directory, "install");
mkdirSync(install);
const packageSource = process.env.SLOPLESS_TEST_PACKAGE;
const packed = packageSource
  ? undefined
  : spawnSync("npm", ["pack", "--pack-destination", directory, "--json"], {
      encoding: "utf8"
    });
if (packed) assert.equal(packed.status, 0, packed.stderr);
const source =
  packageSource ?? join(directory, JSON.parse(packed.stdout)[0].filename);
const installed = spawnSync(
  "npm",
  [
    "install",
    "--prefix",
    install,
    "--ignore-scripts",
    "--no-audit",
    "--no-fund",
    source
  ],
  { encoding: "utf8" }
);
assert.equal(installed.status, 0, installed.stderr);
const cli = join(install, "node_modules/slopless/dist/cli.js");
const heading =
  "## Strategic Negotiations And Global Partnerships\n\nWe delve into the body text here.\n";
const input = join(directory, "heading.md");
writeFileSync(input, heading);
for (const [name, options] of Object.entries({
  off: { "sentence-case": false },
  on: { "sentence-case": true },
  warning: { "sentence-case": { severity: "warning" } }
})) {
  writeFileSync(
    join(directory, `${name}.json`),
    JSON.stringify({ rules: { "preset-slopless": options } })
  );
}

function run(args, stdin) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: directory,
    encoding: "utf8",
    input: stdin
  });
  return {
    ...result,
    messages: result.stdout
      ? (JSON.parse(result.stdout)[0]?.messages ?? [])
      : []
  };
}

for (const flag of ["--config", "-c", "--config="]) {
  for (const [name, severity] of [
    ["off", undefined],
    ["on", 2],
    ["warning", 1]
  ]) {
    test(`${flag} honors ${name} rule configuration`, () => {
      const config = join(directory, `${name}.json`);
      const args = flag.endsWith("=") ? [`${flag}${config}`] : [flag, config];
      const result = run([...args, input]);
      assert.equal(result.status, 1, result.stderr);
      assert.equal(
        result.messages.find((m) => m.ruleId === "slopless/sentence-case")
          ?.severity,
        severity
      );
      assert.ok(
        result.messages.some((m) => m.ruleId === "slopless/prohibited-words")
      );
    });
  }
  test(`${flag} rejects combination with narrative`, () => {
    const config = join(directory, "off.json");
    const args = flag.endsWith("=") ? [`${flag}${config}`] : [flag, config];
    const result = run([...args, "--narrative", input]);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /--narrative cannot be combined with --config/);
  });
}

test("explicit config controls stdin", () => {
  const result = run(
    [
      "--config",
      join(directory, "off.json"),
      "--stdin",
      "--stdin-filename",
      "heading.md"
    ],
    heading
  );
  assert.equal(result.status, 1, result.stderr);
  assert.ok(
    result.messages.every((m) => m.ruleId !== "slopless/sentence-case")
  );
});

test("an explicit standalone rule enables only that rule", () => {
  const config = join(directory, "standalone.json");
  writeFileSync(
    config,
    JSON.stringify({
      rules: { "slopless/dist/rules/orthography/sentence-case.js": true }
    })
  );
  const result = run(["--config", config, input]);
  assert.equal(result.status, 1, result.stderr);
  assert.ok(result.messages.length > 0);
  assert.ok(
    result.messages.every((m) => m.ruleId !== "slopless/prohibited-words")
  );
});

test("default configuration still enables sentence case", () => {
  const result = run([input]);
  assert.equal(result.status, 1, result.stderr);
  assert.ok(result.messages.some((m) => m.ruleId === "slopless/sentence-case"));
});

test("installed CLI lists optional checks and runs deterministic selection", () => {
  const listed = spawnSync(process.execPath, [cli, "--list-checks"], {
    cwd: directory,
    encoding: "utf8"
  });
  assert.equal(listed.status, 0, listed.stderr);
  assert.equal(
    JSON.parse(listed.stdout).filter((check) => check.backend === "jev").length,
    54
  );
  const result = run(["--check", "words:prohibited-words", input]);
  assert.equal(result.status, 1, result.stderr);
  assert.ok(result.messages.length > 0);
  assert.ok(
    result.messages.every((m) => m.ruleId === "slopless/prohibited-words")
  );
});

test("all installed Jev prompts execute through the public library", async () => {
  const { createSlopless, listChecks } = await import(
    pathToFileURL(join(install, "node_modules/slopless/dist/index.js"))
  );
  let calls = 0;
  const jev = {
    async judge(input) {
      calls++;
      return Object.fromEntries(
        Object.keys(input.questions).map((id) => [id, 0])
      );
    }
  };
  for (const check of listChecks().filter((item) => item.backend === "jev")) {
    const engine = createSlopless({ checks: [check.id], jev, cwd: directory });
    const result = await engine.lintText("A complete paragraph.", "article.md");
    assert.deepEqual(result.messages, [], check.id);
  }
  assert.equal(calls, 54);
});

test("installed package exposes consumable strict TypeScript declarations", () => {
  const consumer = join(install, "consumer.mts");
  writeFileSync(
    consumer,
    `import { createSlopless, createJevClient, listChecks } from "slopless";
import type { JevClient, JevInput, JevScores, RuleId, Slopless } from "slopless";
const id: RuleId = "semantic-thinness:empty-takeaway";
const client: JevClient = createJevClient({apiKey: "example"});
const runtime: Slopless = createSlopless({checks: [id], jev: client});
const input: JevInput = {input: "paragraph", model: "jev", paragraph: {id: "P1", text: "Check."}, questions: {"semantic-thinness:empty-takeaway": {instructions: {question: "Judge.", instructions: "Check.", rulebook: "An empty takeaway.", target: "state.paragraph.text"}}}};
const scores: Promise<JevScores> = client.judge(input, new AbortController().signal);
void runtime; void scores; void listChecks;
`
  );
  const result = spawnSync(
    process.execPath,
    [
      join(process.cwd(), "node_modules/typescript/bin/tsc"),
      "--noEmit",
      "--strict",
      "--module",
      "NodeNext",
      "--moduleResolution",
      "NodeNext",
      "--target",
      "ES2023",
      consumer
    ],
    { cwd: install, encoding: "utf8" }
  );
  assert.equal(result.status, 0, result.stdout + result.stderr);
});
