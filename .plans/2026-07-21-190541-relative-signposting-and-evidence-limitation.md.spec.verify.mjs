#!/usr/bin/env node

import { readdirSync, readFileSync } from "node:fs";
import ts from "typescript";

const [specPath, category, blockIndexText] = process.argv.slice(2);
if (specPath === undefined || category === undefined || blockIndexText === undefined) {
  process.exit(2);
}

const spec = JSON.parse(readFileSync(specPath, "utf8"));
const blockIndex = Number.parseInt(blockIndexText, 10);

function importsFor(file) {
  const source = readFileSync(file, "utf8");
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  return tree.statements
    .filter(ts.isImportDeclaration)
    .map((statement) => statement.moduleSpecifier)
    .filter(ts.isStringLiteral)
    .map((literal) => literal.text);
}

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      return sourceFiles(path);
    }
    return entry.isFile() && path.endsWith(".ts") ? [path] : [];
  });
}

if (category === "exports") {
  const block = spec.requirements.exports[blockIndex];
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  const exportedPaths = new Set(Object.keys(packageJson.exports ?? {}));
  for (const item of block.required ?? []) {
    console.log(
      JSON.stringify({ item, status: exportedPaths.has(item) ? "pass" : "fail" })
    );
  }
  for (const item of block.forbidden ?? []) {
    console.log(
      JSON.stringify({ item, status: exportedPaths.has(item) ? "fail" : "pass" })
    );
  }
  process.exit(0);
}

const block = spec.requirements.custom[blockIndex];
const failures = [];
for (const module of block.modules) {
  const imports = importsFor(module.file);
  if (module.allowed !== undefined) {
    const allowed = new Set(module.allowed);
    const unexpected = imports.filter((source) => !allowed.has(source));
    if (unexpected.length > 0 || imports.length !== allowed.size) {
      failures.push(`${module.file}: imports ${imports.join(", ")}`);
    }
  }
  for (const required of module.required ?? []) {
    if (!imports.includes(required)) {
      failures.push(`${module.file}: missing ${required}`);
    }
  }
  for (const forbidden of module.forbidden ?? []) {
    if (imports.some((source) => source.includes(forbidden))) {
      failures.push(`${module.file}: forbidden ${forbidden}`);
    }
  }
}
for (const owned of block.ownedImports ?? []) {
  for (const file of sourceFiles("src")) {
    if (
      file !== owned.owner &&
      importsFor(file).some((source) => source.endsWith(owned.source))
    ) {
      failures.push(`${file}: imports private module owned by ${owned.owner}`);
    }
  }
}

console.log(
  JSON.stringify({
    check: block.check,
    status: failures.length === 0 ? "pass" : "fail",
    ...(failures.length === 0 ? {} : { message: failures.join("; ") })
  })
);
