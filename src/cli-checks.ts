import { writeFile } from "node:fs/promises";
import { text } from "node:stream/consumers";
import { addAbortSignal } from "node:stream";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { createJevClient } from "./adapters/jev/client.js";
import { createSlopless, listChecks } from "./runtime.js";
import type { RuleId } from "./rules/types.js";

export async function runSelectedChecks(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      check: { type: "string", multiple: true },
      "list-checks": { type: "boolean" },
      stdin: { type: "boolean" },
      "stdin-filename": { type: "string", default: "stdin.md" },
      config: { type: "string", short: "c" },
      "ignore-path": { type: "string" },
      quiet: { type: "boolean" },
      cache: { type: "boolean" },
      "cache-location": { type: "string" },
      "output-file": { type: "string", short: "o" }
    }
  });
  if (values["list-checks"] === true) {
    process.stdout.write(`${JSON.stringify(listChecks())}\n`);
    return 0;
  }
  const known = listChecks();
  const ids: RuleId[] = [];
  for (const id of values.check ?? []) {
    const check = known.find((entry) => entry.id === id);
    if (check === undefined)
      throw new Error(`Unknown check: ${id}. Run slopless --list-checks.`);
    ids.push(check.id);
  }
  if (ids.length === 0)
    throw new Error("Provide at least one --check family:rule.");
  if (values.stdin !== true && positionals.length === 0) {
    throw new Error("Provide files, globs or --stdin.");
  }
  if (values.stdin === true && positionals.length > 0) {
    throw new Error("Use files or --stdin in one invocation.");
  }
  const needsJev = known.some(
    (entry) => ids.includes(entry.id) && entry.backend === "jev"
  );
  const apiKey = process.env["JEV_API_KEY"];
  if (needsJev && (apiKey === undefined || apiKey.trim().length === 0)) {
    throw new Error("JEV_API_KEY is required for the selected Jev checks.");
  }
  const runtime = createSlopless({
    checks: ids,
    ...(needsJev && apiKey !== undefined
      ? { jev: createJevClient({ apiKey }) }
      : {}),
    ...(values.config === undefined
      ? {}
      : { configFile: resolve(values.config) }),
    ...(values["ignore-path"] === undefined
      ? {}
      : { ignoreFilePath: resolve(values["ignore-path"]) }),
    ...(values.quiet === undefined ? {} : { quiet: values.quiet }),
    ...(values.cache === undefined ? {} : { cache: values.cache }),
    ...(values["cache-location"] === undefined
      ? {}
      : { cacheLocation: resolve(values["cache-location"]) })
  });
  const controller = new AbortController();
  const abort = (): void =>
    controller.abort(new Error("Slopless interrupted; checks are incomplete."));
  process.once("SIGINT", abort);
  process.once("SIGTERM", abort);
  try {
    const results =
      values.stdin === true
        ? [
            await runtime.lintText(
              await text(addAbortSignal(controller.signal, process.stdin)),
              values["stdin-filename"],
              controller.signal
            )
          ]
        : await runtime.lintFiles(positionals, controller.signal);
    const output = `${JSON.stringify(results)}\n`;
    if (values["output-file"] === undefined) process.stdout.write(output);
    else await writeFile(resolve(values["output-file"]), output);
    return results.some((result) => result.messages.length > 0) ? 1 : 0;
  } finally {
    process.removeListener("SIGINT", abort);
    process.removeListener("SIGTERM", abort);
  }
}
