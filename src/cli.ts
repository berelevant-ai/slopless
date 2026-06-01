#!/usr/bin/env node

import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { cp, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { cli } from "textlint/lib/src/cli.js";

type PackageMetadata = {
  readonly version?: unknown;
};

type SkillTarget = "claude" | "codex";

const FORMAT_FLAGS = new Set(["--format", "-f"]);
const HELP_FLAGS = new Set(["--help", "-h"]);
const STDIN_FLAGS = new Set(["--stdin"]);
const VERSION_FLAGS = new Set(["--version", "-v"]);
const CONFIG_FLAGS = new Set(["--config", "-c"]);
const FORCE_FLAGS = new Set(["--force"]);
const INSTALL_SKILL_COMMAND = "install-skill";
const VALUE_OPTIONS = new Set([
  "--cache-location",
  "--config",
  "--ignore-path",
  "--output-file",
  "--plugin",
  "--preset",
  "--rule",
  "--rules-base-directory",
  "--rulesdir",
  "--stdin-filename",
  "-c",
  "-o"
]);
const HELP_TEXT = `Slopless checks English Markdown prose for deterministic AI and human slop signals.

It reports concrete patterns that make writing padded, vague, generic,
formulaic, or mechanically careless. It is English-only. Output is always
textlint JSON.

Install:
  npm install -D slopless

Run:
  npx slopless "docs/**/*.md"
  npx slopless draft.md > .slopless/findings/2026-05-18-150000--draft.json

Agent run:
  npx slopless --help
  mkdir -p .slopless/findings
  npx slopless "docs/**/*.md" > ".slopless/findings/$(date +%Y-%m-%d-%H%M%S)--review.json"

Agent skill install:
  npx slopless install-skill codex
  npx slopless install-skill claude

Package script:
  {
    "scripts": {
      "lint:prose": "slopless \\"docs/**/*.md\\""
    }
  }

Default behavior:
  - A file path, glob, or stdin input is required.
  - Slopless is English-only.
  - Output is always JSON.
  - Exit 0 means no findings.
  - Exit 1 means Slopless found prose issues.
  - Exit 2 means the command failed before linting.
  - No .textlintrc.json is required.
  - No separate textlint install is required.

What it is for:
  Slopless is for deterministic prose checks in CI, local scripts, and review
  pipelines. It catches AI-style phrasing, empty claims, rhetorical filler,
  weak lead-ins and closers, hedge stacking, readability problems, and Markdown
  style signals.

What it is not for:
  Slopless does not rewrite text, check facts, judge taste, or replace human
  editing. It reports concrete rule findings that another tool or person can
  review.

Useful forms:
  npx slopless --stdin --stdin-filename draft.md
  npx slopless "docs/**/*.md" > .slopless/findings/review.json
  npx slopless "docs/**/*.md" --quiet

Agent storage convention:
  Agents should save raw JSON findings inside .slopless/findings/ in the
  current working directory. Slopless does not choose filenames, slugs, or
  timestamps for redirected output.

Ignore one rule:
  <!-- textlint-disable slopless/semantic-thinness -->

  Something shifted in the room.

  <!-- textlint-enable slopless/semantic-thinness -->

Unsupported:
  --format and -f are rejected. JSON is the only output format.
`;

function skillDestination(target: SkillTarget): string {
  switch (target) {
    case "claude":
      return ".claude/skills/slopless";
    case "codex":
      return ".agents/skills/slopless";
  }
}

function isSkillTarget(value: string | undefined): value is SkillTarget {
  return value === "claude" || value === "codex";
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function hasFormatOverride(args: readonly string[]): boolean {
  return args.some(
    (arg, index) =>
      FORMAT_FLAGS.has(arg) ||
      arg.startsWith("--format=") ||
      (index > 0 && FORMAT_FLAGS.has(args[index - 1] ?? ""))
  );
}

function hasFlag(args: readonly string[], flags: ReadonlySet<string>): boolean {
  return args.some((arg) => flags.has(arg));
}

function hasFileTarget(args: readonly string[]): boolean {
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === undefined) {
      continue;
    }

    if (arg.trim() === "") {
      continue;
    }

    if (VALUE_OPTIONS.has(arg)) {
      index += 1;
      continue;
    }

    if (arg.startsWith("--") && arg.includes("=")) {
      continue;
    }

    if (arg.startsWith("-")) {
      continue;
    }

    return true;
  }

  return false;
}

function packageRoot(): string {
  return dirname(dirname(fileURLToPath(import.meta.url)));
}

function packageVersion(): string {
  const packageJson = JSON.parse(
    readFileSync(resolve(packageRoot(), "package.json"), "utf8")
  ) as PackageMetadata;

  return typeof packageJson.version === "string"
    ? packageJson.version
    : "0.0.0";
}

function packageNodeModules(): string {
  return resolve(packageRoot(), "..");
}

// textlint resolves a config `filters` key by prepending the rules-base-directory,
// so the comments filter only loads when it sits as a direct sibling of that
// directory (a flat npm install). Generate the config at runtime with the filter
// referenced by a path relative to the base directory, which resolves the same
// filter package under any install layout (flat npm or nested pnpm).
function writeDefaultConfig(): string {
  const require = createRequire(import.meta.url);
  const filterDir = dirname(
    require.resolve("textlint-filter-rule-comments/package.json")
  );
  const filterKey = relative(packageNodeModules(), filterDir);
  const configDir = mkdtempSync(join(tmpdir(), "slopless-config-"));
  const configPath = join(configDir, "slopless.textlintrc.json");
  writeFileSync(configPath, JSON.stringify({ filters: { [filterKey]: true } }));
  return configPath;
}

async function installSkill(
  target: SkillTarget,
  force: boolean
): Promise<number> {
  const source = resolve(packageRoot(), "skills", "slopless");
  const destination = resolve(process.cwd(), skillDestination(target));

  if ((await pathExists(destination)) && !force) {
    process.stderr.write(
      `Slopless skill already exists at ${skillDestination(target)}. Re-run with --force to replace it.\n`
    );
    return 2;
  }

  if (force) {
    await rm(destination, { force: true, recursive: true });
  }

  await cp(source, destination, { recursive: true });
  process.stdout.write(
    [
      `Installed Slopless skill for ${target}:`,
      `${skillDestination(target)}/SKILL.md`,
      "",
      `Start a new ${target === "codex" ? "Codex" : "Claude Code"} session before relying on automatic skill discovery.`,
      `If the skill is not visible, load ${skillDestination(target)}/SKILL.md as context.`
    ].join("\n") + "\n"
  );
  return 0;
}

async function readStdin(): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    const chunks: string[] = [];
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (chunk: Buffer | string) => {
      chunks.push(typeof chunk === "string" ? chunk : chunk.toString("utf8"));
    });
    process.stdin.once("end", () => {
      resolve(chunks.join(""));
    });
    process.stdin.once("error", (error: Error) => {
      reject(error);
    });
  });
}

async function main(): Promise<number> {
  const userArgs = process.argv.slice(2);

  if (hasFlag(userArgs, HELP_FLAGS)) {
    process.stdout.write(HELP_TEXT);
    return 0;
  }

  if (hasFlag(userArgs, VERSION_FLAGS)) {
    process.stdout.write(`${packageVersion()}\n`);
    return 0;
  }

  if (userArgs[0] === INSTALL_SKILL_COMMAND) {
    const target = userArgs[1];

    if (!isSkillTarget(target)) {
      process.stderr.write(
        "Usage: slopless install-skill codex|claude [--force]\n"
      );
      return 2;
    }

    const extraArgs = userArgs.slice(2);

    if (extraArgs.some((arg) => !FORCE_FLAGS.has(arg))) {
      process.stderr.write(
        "Usage: slopless install-skill codex|claude [--force]\n"
      );
      return 2;
    }

    return installSkill(target, hasFlag(extraArgs, FORCE_FLAGS));
  }

  if (hasFormatOverride(userArgs)) {
    process.stderr.write(
      "slopless always writes JSON output. Remove --format / -f.\n"
    );
    return 2;
  }

  if (!hasFileTarget(userArgs) && !hasFlag(userArgs, STDIN_FLAGS)) {
    process.stderr.write(
      "slopless requires a file path, glob, or --stdin input. Run slopless --help.\n"
    );
    return 2;
  }

  const args = [
    "node",
    "slopless",
    ...(hasFlag(userArgs, CONFIG_FLAGS)
      ? []
      : ["--config", writeDefaultConfig()]),
    "--preset",
    "slopless",
    "--rules-base-directory",
    packageNodeModules(),
    "--format",
    "json",
    ...userArgs
  ];

  if (hasFlag(userArgs, STDIN_FLAGS)) {
    return cli.execute(args, await readStdin());
  }

  return cli.execute(args);
}

process.exitCode = await main();
