import { createLinter } from "textlint";
import type { TextlintResult, TextlintRuleModule } from "@textlint/types";
import commentsFilter from "textlint-filter-rule-comments";
import { deterministicChecks } from "./registries/index.js";
import { jevChecks } from "./registries/jev.js";
import { createJevRule, jevCacheKey } from "./adapters/jev/detector.js";
import type { JevClient } from "./adapters/jev/types.js";
import type { RuleId } from "./rules/types.js";
import {
  loadRuntimeConfig,
  runtimeCacheKey
} from "./adapters/textlint/config.js";

export type SloplessOptions = {
  readonly checks: readonly RuleId[];
  readonly jev?: JevClient;
  readonly cwd?: string;
  readonly configFile?: string;
  readonly ignoreFilePath?: string;
  readonly quiet?: boolean;
  readonly cache?: boolean;
  readonly cacheLocation?: string;
};

export type Slopless = {
  readonly lintText: (
    text: string,
    filePath: string,
    signal?: AbortSignal
  ) => Promise<TextlintResult>;
  readonly lintFiles: (
    pathsOrGlobs: string[],
    signal?: AbortSignal
  ) => Promise<TextlintResult[]>;
};

export type CheckInfo = {
  readonly id: RuleId;
  readonly reportId: string;
} & (
  | { readonly backend: "deterministic"; readonly input: "native" }
  | {
      readonly backend: "jev";
      readonly input: "paragraph" | "text";
      readonly model: string;
      readonly threshold: number;
      readonly paragraphThreshold: number;
      readonly promptVersion: string;
    }
);

export function listChecks(): readonly CheckInfo[] {
  return [
    ...[...deterministicChecks.keys()].map((id): CheckInfo => ({
      id,
      reportId: `slopless/${id.slice(id.indexOf(":") + 1)}`,
      backend: "deterministic",
      input: "native"
    })),
    ...jevChecks.map((check): CheckInfo => ({
      id: check.id,
      reportId: `slopless/${check.id.replace(":", "/")}`,
      backend: "jev",
      input: check.input,
      model: check.model,
      threshold: check.threshold,
      paragraphThreshold: check.paragraphThreshold,
      promptVersion: check.promptVersion
    }))
  ].sort((a, b) => a.id.localeCompare(b.id));
}

function isRuleModule(value: unknown): value is TextlintRuleModule {
  return (
    typeof value === "function" ||
    (value !== null &&
      typeof value === "object" &&
      "linter" in value &&
      typeof value.linter === "function" &&
      "fixer" in value &&
      typeof value.fixer === "function")
  );
}

function validateOptions(options: SloplessOptions): void {
  const isArray = (value: unknown): boolean => Array.isArray(value);
  if (
    !isArray(options.checks) ||
    options.checks.length === 0 ||
    new Set(options.checks).size !== options.checks.length
  ) {
    throw new Error("Select a nonempty list of unique check IDs.");
  }
  for (const id of options.checks) {
    if (
      !deterministicChecks.has(id) &&
      !jevChecks.some((check) => check.id === id)
    ) {
      throw new Error(`Unknown check: ${id}`);
    }
    if (
      jevChecks.some((check) => check.id === id) &&
      options.jev === undefined
    ) {
      throw new Error(
        `A Jev client is required for ${id}. Set JEV_API_KEY in the CLI.`
      );
    }
  }
}

async function linter(
  options: SloplessOptions,
  signal: AbortSignal
): Promise<ReturnType<typeof createLinter>> {
  signal.throwIfAborted();
  const base = await loadRuntimeConfig(
    options.cwd ?? process.cwd(),
    options.configFile
  );
  const selected = options.checks.map((id) => {
    const definition = jevChecks.find((check) => check.id === id);
    const rule =
      definition !== undefined && options.jev !== undefined
        ? createJevRule(definition, options.jev, signal)
        : deterministicChecks.get(id);
    if (rule === undefined) throw new Error(`Cannot construct ${id}.`);
    const module: unknown = rule;
    if (!isRuleModule(module))
      throw new Error(`Invalid textlint module: ${id}.`);
    const configured = base.rule.allDescriptors.find(
      (item) =>
        item.id === `slopless/${id.replace(":", "/")}` ||
        item.id === `slopless/${id.slice(id.indexOf(":") + 1)}`
    );
    const configuredOptions = configured?.rawOptions;
    const optionsForRule =
      definition === undefined || configuredOptions === false
        ? configuredOptions
        : {
            ...(typeof configuredOptions === "object" ? configuredOptions : {}),
            sloplessPromptHash: jevCacheKey(definition)
          };
    const effectiveOptions =
      optionsForRule === false
        ? false
        : {
            ...(typeof optionsForRule === "object" ? optionsForRule : {}),
            ...(options.cache === true
              ? { sloplessRuntimeHash: runtimeCacheKey(options.quiet === true) }
              : {})
          };
    return {
      ruleId:
        definition === undefined
          ? `slopless/${id.slice(id.indexOf(":") + 1)}`
          : `slopless/${id.replace(":", "/")}`,
      rule: module,
      options: effectiveOptions
    };
  });
  const descriptor = base.shallowMerge({
    rules: selected,
    filterRules: [
      ...base.filterRule.toKernelFilterRulesFormat(),
      { ruleId: "comments", rule: commentsFilter }
    ]
  });
  return createLinter({
    descriptor,
    cwd: options.cwd ?? process.cwd(),
    ignoreFilePath: options.ignoreFilePath ?? ".textlintignore",
    ...(options.cache === undefined ? {} : { cache: options.cache }),
    ...(options.cacheLocation === undefined
      ? {}
      : { cacheLocation: options.cacheLocation }),
    ...(options.quiet === undefined ? {} : { quiet: options.quiet })
  });
}

async function run<T>(
  options: SloplessOptions,
  external: AbortSignal,
  operation: (instance: ReturnType<typeof createLinter>) => Promise<T>
): Promise<T> {
  const controller = new AbortController();
  const signal = AbortSignal.any([external, controller.signal]);
  try {
    const result = await operation(await linter(options, signal));
    signal.throwIfAborted();
    return result;
  } catch (error: unknown) {
    controller.abort(error);
    throw error;
  }
}

export function createSlopless(options: SloplessOptions): Slopless {
  validateOptions(options);
  const snapshot = { ...options, checks: [...options.checks] };
  return {
    async lintText(
      text,
      filePath,
      signal = new AbortController().signal
    ): Promise<TextlintResult> {
      return run(snapshot, signal, async (instance) =>
        instance.lintText(text, filePath)
      );
    },
    async lintFiles(
      paths,
      signal = new AbortController().signal
    ): Promise<TextlintResult[]> {
      return run(snapshot, signal, async (instance) =>
        instance.lintFiles(paths)
      );
    }
  };
}
