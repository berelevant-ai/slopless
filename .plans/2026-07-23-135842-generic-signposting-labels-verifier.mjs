#!/usr/bin/env node

import fs from "node:fs";
import ts from "typescript";

const [, , specPath, category, blockIndexText] = process.argv;
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const blockIndex = Number.parseInt(blockIndexText, 10);
const block = spec.requirements[category][blockIndex];

function sourceFile(path) {
  return ts.createSourceFile(
    path,
    fs.readFileSync(path, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
}

function evidence(item, status, message) {
  console.log(
    JSON.stringify({
      item,
      ...(message === undefined ? {} : { message }),
      status
    })
  );
}

function verifyDependencies() {
  const path = block.files[0];
  const imports = [];
  const file = sourceFile(path);

  function collect(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier !== undefined &&
      ts.isStringLiteralLike(node.moduleSpecifier)
    ) {
      imports.push(node.moduleSpecifier.text);
    } else if (
      ts.isImportEqualsDeclaration(node) &&
      ts.isExternalModuleReference(node.moduleReference) &&
      node.moduleReference.expression !== undefined &&
      ts.isStringLiteralLike(node.moduleReference.expression)
    ) {
      imports.push(node.moduleReference.expression.text);
    } else if (
      ts.isCallExpression(node) &&
      node.arguments.length === 1 &&
      ts.isStringLiteralLike(node.arguments[0]) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) &&
          node.expression.text === "require"))
    ) {
      imports.push(node.arguments[0].text);
    }

    ts.forEachChild(node, collect);
  }

  collect(file);
  imports.sort();
  const expected = [...block.required].sort();
  const exact =
    imports.length === expected.length &&
    imports.every((item, index) => item === expected[index]);

  for (const item of block.required) {
    evidence(
      item,
      exact ? "pass" : "fail",
      exact
        ? undefined
        : `expected imports ${JSON.stringify(expected)}, received ${JSON.stringify(imports)}`
    );
  }
}

function parameterText(parameter) {
  const name = parameter.name.getText();
  const optional = parameter.questionToken === undefined ? "" : "-optional";
  const type = (parameter.type?.getText() ?? "unknown").replaceAll(" | ", "-or-");
  return `${name}${optional}-${type}`;
}

function exportedSignatures(path) {
  const signatures = [];

  for (const node of sourceFile(path).statements) {
    const exported =
      "modifiers" in node &&
      node.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
      );
    const defaultExport =
      "modifiers" in node &&
      node.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword
      );

    if (ts.isExportDeclaration(node)) {
      const names =
        node.exportClause !== undefined &&
        ts.isNamedExports(node.exportClause)
          ? node.exportClause.elements.map((element) => element.name.text)
          : ["*"];
      signatures.push(
        ...names.map((name) => `unexpected-re-export-${name}`)
      );
      continue;
    }

    if (ts.isExportAssignment(node)) {
      signatures.push("unexpected-default-export-assignment");
      continue;
    }

    if (ts.isFunctionDeclaration(node) && exported && node.name !== undefined) {
      const parameters = node.parameters.map(parameterText).join(", ");
      const returnType = (node.type?.getText() ?? "unknown").replaceAll(
        " | ",
        "-or-"
      );
      const prefix = defaultExport ? "default-" : "";
      signatures.push(
        `${prefix}${node.name.text} ${parameters} returns-${returnType}`
      );
      continue;
    }

    if (ts.isVariableStatement(node) && exported) {
      for (const declaration of node.declarationList.declarations) {
        signatures.push(`unexpected-export-${declaration.name.getText()}`);
      }
      continue;
    }

    if (
      exported &&
      (ts.isClassDeclaration(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node))
    ) {
      signatures.push(`unexpected-export-${node.name?.text ?? "anonymous"}`);
    }
  }

  return signatures.sort();
}

function verifyExports() {
  const signatures = exportedSignatures(block.package);
  const expected = [...block.required].sort();
  const exact =
    signatures.length === expected.length &&
    signatures.every((item, index) => item === expected[index]);

  for (const item of block.required) {
    evidence(
      item,
      exact ? "pass" : "fail",
      exact
        ? undefined
        : `expected exports ${JSON.stringify(expected)}, received ${JSON.stringify(signatures)}`
    );
  }
}

if (category === "dependencies") {
  verifyDependencies();
} else if (category === "exports") {
  verifyExports();
} else {
  throw new Error(`unsupported category: ${category}`);
}
