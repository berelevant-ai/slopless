import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const output = mkdtempSync(resolve(root, ".fixture3/cadence-replay."));
try {
  execFileSync(
    resolve(root, "node_modules/.bin/tsc"),
    ["-p", "tsconfig.json", "--outDir", output],
    { stdio: "pipe" }
  );
  const { actionOccurrences } = await import(
    pathToFileURL(
      resolve(output, "rules/narrative-slop/private/subject-action-cadence.js")
    )
  );
  const results = process.argv.slice(2).flatMap((file) => {
    const values = JSON.parse(readFileSync(file, "utf8"));
    if (
      !Array.isArray(values) ||
      !values.every((value) => typeof value === "string")
    )
      throw new Error(`${file}: expected an array of strings`);
    return values.map((text) => ({
      text,
      occurrences: actionOccurrences(text).map((occurrence) => ({
        ...occurrence,
        evidence: text.slice(occurrence.range.start, occurrence.range.end)
      }))
    }));
  });
  process.stdout.write(JSON.stringify(results));
} finally {
  rmSync(output, { recursive: true, force: true });
}
