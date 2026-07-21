#!/usr/bin/env node

import { readFileSync } from "node:fs";
import ts from "typescript";

const [specPath, category, blockIndexText] = process.argv.slice(2);
const spec = JSON.parse(readFileSync(specPath, "utf8"));
const block = spec.requirements[category][Number(blockIndexText)];
const bareImports = [];

function moduleSpecifier(node) {
  if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
    return node.moduleSpecifier;
  }
  if (
    ts.isImportEqualsDeclaration(node) &&
    ts.isExternalModuleReference(node.moduleReference)
  ) {
    return node.moduleReference.expression;
  }
  if (
    ts.isCallExpression(node) &&
    (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
      (ts.isIdentifier(node.expression) && node.expression.text === "require"))
  ) {
    return node.arguments[0];
  }
  return undefined;
}

for (const file of block.files) {
  const source = readFileSync(file, "utf8");
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  const visit = (node) => {
    const candidate = moduleSpecifier(node);
    if (
      candidate !== undefined &&
      ts.isStringLiteral(candidate) &&
      !candidate.text.startsWith(".")
    ) {
      bareImports.push(`${file}: ${candidate.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
}

for (const item of block.forbiddenGlobs) {
  console.log(
    JSON.stringify({
      item,
      status: bareImports.length === 0 ? "pass" : "fail",
      ...(bareImports.length === 0
        ? {}
        : { message: `External imports found: ${bareImports.join(", ")}` })
    })
  );
}
