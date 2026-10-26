import { loadPackagesFromRawConfig } from "@textlint/config-loader";
import type { TextlintRcConfig } from "@textlint/config-loader";
import { TextlintKernelDescriptor } from "@textlint/kernel";
import text from "@textlint/textlint-plugin-text";
import markdown from "@textlint/textlint-plugin-markdown";
import { dirname, join, resolve } from "node:path";
import { rcFile } from "rc-config-loader";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

export function runtimeCacheKey(quiet: boolean): string {
  return createHash("sha256")
    .update(readFileSync(new URL("../../../package.json", import.meta.url)))
    .update(JSON.stringify({ quiet }))
    .digest("hex");
}

export async function loadRuntimeConfig(
  cwd: string,
  configFile?: string
): Promise<TextlintKernelDescriptor> {
  // Use the same discovery library as textlint, preserving parsing exceptions.
  const explicit =
    configFile === undefined ? undefined : resolve(cwd, configFile);
  if (explicit !== undefined && !existsSync(explicit))
    throw new Error(`Configuration not found: ${explicit}`);
  const discovered = rcFile<TextlintRcConfig>("textlint", {
    cwd,
    ...(explicit === undefined ? {} : { configFileName: explicit }),
    packageJSON: explicit === undefined ? { fieldName: "textlint" } : false
  });
  if (discovered === undefined && configFile !== undefined)
    throw new Error(`Configuration not found: ${configFile}`);
  const loaded =
    discovered === undefined
      ? undefined
      : await loadPackagesFromRawConfig({
          rawConfig: discovered.config,
          node_moduleDir: join(cwd, "node_modules")
        });
  if (loaded !== undefined && !loaded.ok)
    throw new AggregateError(loaded.error.errors, loaded.error.message);
  return new TextlintKernelDescriptor({
    rules: loaded?.ok === true ? loaded.config.rules : [],
    filterRules: loaded?.ok === true ? loaded.config.filterRules : [],
    plugins: [
      {
        pluginId: "@textlint/textlint-plugin-text",
        plugin: text.default,
        options: true
      },
      {
        pluginId: "@textlint/textlint-plugin-markdown",
        plugin: markdown.default,
        options: true
      },
      ...(loaded?.ok === true ? loaded.config.plugins : [])
    ],
    ...(discovered === undefined
      ? {}
      : { configBaseDir: dirname(discovered.filePath) })
  });
}
