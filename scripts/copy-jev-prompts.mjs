import { copyFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { jevChecks } from "../dist/registries/jev.js";

const files = new Set(
  jevChecks.flatMap((check) => [
    `${check.promptVersion}/shared.md`,
    `${check.promptVersion}/${check.name}.md`
  ])
);
for (const file of files) {
  const destination = resolve("dist/prompts", file);
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(resolve("prompts", file), destination);
}
