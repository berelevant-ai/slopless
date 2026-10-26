import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import type { JevCheck, JevQuestion } from "./types.js";

export type JevPrompt = {
  readonly instructions: string;
  readonly shared: string;
  readonly definition: string;
  readonly question: JevQuestion & { readonly instructions: string };
  readonly description: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function record(value: unknown): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error("Prompt metadata must be an object.");
  }
  return value;
}

function nonempty(value: unknown): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("Prompt fields must be nonempty strings.");
  }
  return value.trim();
}

export function loadJevPrompt(check: JevCheck): JevPrompt {
  const directory = new URL(
    `../../prompts/${check.promptVersion}/`,
    import.meta.url
  );
  const shared = readFileSync(new URL("shared.md", directory), "utf8").trim();
  const source = readFileSync(
    new URL(`${check.name}.md`, directory),
    "utf8"
  ).trim();
  let body = source;
  let question: JevQuestion & { readonly instructions: string } = {
    instructions: `Apply state.instructions and rulebook to target. Does this target paragraph contain at least one instance of ${JSON.stringify(check.name)}? Judge only this target and this type; other target paragraphs are independent cases. Rulebook: state.instructions.`
  };
  if (source.startsWith("---\n")) {
    const end = source.indexOf("\n---\n", 4);
    if (end < 0) throw new Error("Prompt metadata needs a closing delimiter.");
    const parsed: unknown = JSON.parse(source.slice(4, end));
    const header = record(parsed);
    const criteria = record(header["criteria"]);
    question = {
      instructions: nonempty(header["instructions"]),
      yes: nonempty(criteria["true"]),
      no: nonempty(criteria["false"])
    };
    body = source.slice(end + 5).trim();
  }
  const instructions = `${nonempty(shared)}\n\n${nonempty(body)}`;
  const description = nonempty(
    body.split("\n\n").find((block) => !block.startsWith("#"))
  );
  return { instructions, shared, definition: body, question, description };
}

export function jevCacheKey(check: JevCheck): string {
  return createHash("sha256")
    .update(JSON.stringify({ check, prompt: loadJevPrompt(check) }))
    .update("paragraph-check-batching-v1")
    .update(readFileSync(new URL("../../../package.json", import.meta.url)))
    .digest("hex");
}
