import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { tmpdir } from "node:os";
import { createLinter, loadTextlintrc } from "textlint";

const phrase = "The scope remains bounded";
const cases = [
  ["adjacent-emphasis", `**A &amp; B.**${phrase}.`],
  [
    "decoded-emphasis",
    "**The scope rem&#97;ins bounded.**",
    ["The scope rem&#97;ins bounded"]
  ],
  [
    "encoded-first-letter",
    "&#84;he scope remains bounded.",
    ["&#84;he scope remains bounded"]
  ],
  ["plain", `Earlier work ended. ${phrase}.`],
  ["indented", `Earlier work\n  continued here\n  and ended. ${phrase}.`],
  ["entity", `A &amp; B came first. ${phrase}.`],
  ["escape", `A \\*marker\\* came first. ${phrase}.`],
  ["combined", `A &amp; B\n  continued with \\*markers\\*. ${phrase}.`],
  ["emphasis", `A **prior label** came first. **${phrase}.**`],
  ["link", `[Earlier material](https://example.com). ${phrase}.`],
  [
    "repeated-link",
    `[${phrase}](https://example.com/The_scope_remains_bounded).`,
    [phrase]
  ],
  ["inline-code", `A \`prior label\` came first. ${phrase}.`],
  ["image", `![Earlier material](https://example.com/picture.png). ${phrase}.`],
  ["blockquote", `> Earlier work\n>   continued here. ${phrase}.`],
  ["list", `- Earlier work\n  continued here. ${phrase}.`],
  ["repeated", `A &amp; B. ${phrase}. ${phrase}.`, [phrase, phrase]],
  ["unicode", `An emoji \u{1f600} &amp; text\n  came first. ${phrase}.`],
  ["crlf", `Earlier work\r\n  continued here. ${phrase}.`],
  [
    "encoded-match",
    "The scope rem&#97;ins bounded.",
    ["The scope rem&#97;ins bounded"]
  ],
  [
    "legacy",
    "A &amp; B\n  came first. The real question is whether this matters.",
    ["The real question is whether this matters."]
  ]
];
const directory = mkdtempSync(join(tmpdir(), "slopless-ranges-"));
const configFilePath = join(directory, "config.json");
writeFileSync(
  configFilePath,
  JSON.stringify({
    rules: {
      [resolve(
        "dist/rules/syntactic-patterns/lead-ins/generic-signposting.js"
      )]: true
    }
  })
);
const failures = [];
const characters = [
  [
    "entity-before-literal-emoji",
    "&#x1f600;\u{1f600}",
    [
      [0, 9],
      [9, 10],
      [10, 11]
    ]
  ],
  [
    "entity-before-literal-euro",
    "&#x80;\u20ac",
    [
      [0, 6],
      [6, 7]
    ]
  ],
  [
    "entity-heavy",
    "&#97;".repeat(1000),
    Array.from({ length: 1000 }, (_, index) => [index * 5, (index + 1) * 5])
  ],
  ["terminal-numeric-entity", "&#97;", [[0, 5]]],
  ["uppercase-entity", "&AMP;", [[0, 5]]],
  ["supplementary-entity", "&#x1f600;", [[0, 9]]],
  [
    "combining-entity",
    "&NotEqualTilde;",
    [
      [0, 15],
      [0, 15]
    ]
  ],
  [
    "unterminated-entity",
    "&copy &amp;",
    [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 11]
    ]
  ],
  [
    "indented-terminal-entity",
    "x\n  &amp;",
    [
      [0, 1],
      [1, 2],
      [4, 9]
    ]
  ],
  ["escaped-backslash", "\\\\", [[0, 2]]],
  [
    "repeated-entity-letter",
    "&#97;a",
    [
      [0, 5],
      [5, 6]
    ]
  ],
  ["ampersand-entity", "&amp;", [[0, 5]]],
  ["semicolon-entity", "&semi;", [[0, 6]]],
  [
    "escaped-ampersand",
    "\\&amp;",
    [
      [0, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6]
    ]
  ],
  [
    "escaped-star",
    "\\**",
    [
      [0, 2],
      [2, 3]
    ]
  ]
];
try {
  const descriptor = await loadTextlintrc({ configFilePath });
  if (descriptor.rule.lintableDescriptors.length !== 1)
    throw new Error("Expected one loaded rule");
  const linter = createLinter({ descriptor });
  for (const [name, text, expected = [phrase]] of cases) {
    const result = await linter.lintText(text, "ranges.md");
    const ranges = [];
    let cursor = 0;
    for (const value of expected) {
      const start = text.indexOf(value, cursor);
      if (start < 0) throw new Error(`Missing expected text in ${name}`);
      cursor = start + value.length;
      const prefix = text.slice(0, start);
      ranges.push({
        range: [start, cursor],
        index: start,
        line: prefix.split("\n").length,
        column: start - prefix.lastIndexOf("\n")
      });
    }
    const actual = result.messages.map(({ range, index, line, column }) => ({
      range,
      index,
      line,
      column
    }));
    if (JSON.stringify(actual) !== JSON.stringify(ranges))
      failures.push({ name, text, expected: ranges, actual });
  }
  writeFileSync(
    configFilePath,
    JSON.stringify({
      rules: {
        [resolve("behavior/fixtures/source-ranges/character-rule.mjs")]: true
      }
    })
  );
  const characterDescriptor = await loadTextlintrc({ configFilePath });
  if (characterDescriptor.rule.lintableDescriptors.length !== 1)
    throw new Error("Expected one character probe");
  const characterLinter = createLinter({ descriptor: characterDescriptor });
  for (const [name, text, expected] of characters) {
    const result = await characterLinter.lintText(text, "characters.md");
    const actual = result.messages.map(({ range }) => range);
    if (JSON.stringify(actual) !== JSON.stringify(expected))
      failures.push({
        name,
        text,
        expected,
        actual,
        messages: result.messages
      });
  }
} finally {
  rmSync(directory, { recursive: true, force: true });
}
console.log(
  JSON.stringify({
    check: "source-ranges",
    status: failures.length === 0 ? "pass" : "fail",
    tests: cases.length + characters.length,
    failures
  })
);
if (process.argv.length === 2 && failures.length > 0) process.exitCode = 1;
