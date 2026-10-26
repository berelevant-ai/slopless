import assert from "node:assert/strict";
import { createServer } from "node:http";
import {
  mkdtempSync,
  writeFileSync,
  rmSync,
  mkdirSync,
  symlinkSync
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { once } from "node:events";
import * as zlib from "node:zlib";
import { spawn, spawnSync } from "node:child_process";
import { test } from "node:test";
import { createSlopless, createJevClient, listChecks } from "../dist/index.js";

const repeated = "wordiness-and-redundancy:repeated-explanation";
const takeaway = "semantic-thinness:empty-takeaway";
function fixed(scores, seen = []) {
  return {
    async judge(input, signal) {
      signal.throwIfAborted();
      seen.push(input);
      return Object.fromEntries(
        Object.keys(input.questions).map((id) => [id, scores[id] ?? 0.05])
      );
    }
  };
}

test("public catalog has unique IDs and selected prompt assets load for every Jev check", async () => {
  const checks = listChecks();
  assert.equal(new Set(checks.map((x) => x.id)).size, checks.length);
  assert.equal(checks.filter((x) => x.backend === "jev").length, 54);
  for (const check of checks.filter((x) => x.backend === "jev")) {
    const seen = [];
    const result = await createSlopless({
      checks: [check.id],
      jev: fixed({}, seen)
    }).lintText("A concrete sentence.", "all-checks.md");
    assert.deepEqual(result.messages, [], check.id);
    const words = [
      seen[0].instructions,
      ...Object.values(seen[0].questions).flatMap((q) => [
        q.instructions,
        q.yes,
        q.no
      ])
    ]
      .join(" ")
      .trim()
      .split(/\s+/).length;
    assert.ok(words <= 1000, `${check.id}: ${words} instruction words`);
  }
});

test("deterministic and Jev checks share native reports and independent IDs", async () => {
  const source = "We went back to square one.\n\nThat is the real promise.";
  const result = await createSlopless({
    checks: ["phrases:cliches", takeaway],
    jev: fixed({ P2: 0.9 })
  }).lintText(source, "mixed.md");
  assert.deepEqual(
    result.messages.map((m) => m.ruleId),
    ["slopless/cliches", "slopless/semantic-thinness/empty-takeaway"]
  );
  assert.equal(source.slice(...result.messages[0].range), "back to square one");
  assert.equal(
    source.slice(...result.messages[1].range),
    "That is the real promise."
  );
});

test("raw paragraph ranges survive blockquotes, list indentation and inline Markdown", async () => {
  const source =
    "# Notes\n\n> **That is the real promise.**\n\n- First item.\n\n  This is the lesson.\n";
  const seen = [];
  const result = await createSlopless({
    checks: [takeaway],
    jev: fixed({ P1: 0.9, P3: 0.9 }, seen)
  }).lintText(source, "nested.md");
  assert.deepEqual(
    result.messages.map((m) => source.slice(...m.range)),
    ["**That is the real promise.**", "This is the lesson."]
  );
  assert.equal(seen[0].paragraphs[0].text, "**That is the real promise.**");
});

test("whole-text batching reserves the document question once and retains complete context", async () => {
  const source = Array.from(
    { length: 34 },
    (_, i) => `Paragraph ${i + 1} contains enough writing.`
  ).join("\n\n");
  const seen = [];
  const result = await createSlopless({
    checks: [repeated],
    jev: fixed({ document: 0.9, P1: 0.9, P34: 0.9 }, seen)
  }).lintText(source, "long.md");
  assert.deepEqual(
    seen.map((x) => Object.keys(x.questions).length),
    [16, 16, 3]
  );
  assert.equal(
    seen.filter((x) => Object.hasOwn(x.questions, "document")).length,
    1
  );
  assert.ok(seen.every((x) => x.text === source && x.paragraphs.length === 34));
  assert.deepEqual(
    result.messages.map((m) => source.slice(...m.range)),
    [
      "Paragraph 1 contains enough writing.",
      "Paragraph 34 contains enough writing."
    ]
  );
});

test("paragraph checks batch independent targets and attach heading only where required", async () => {
  const source = "# Heading\n\nFirst paragraph.\n\nSecond paragraph.";
  const seen = [];
  await createSlopless({
    checks: ["wordiness-and-redundancy:redundancy"],
    jev: fixed({}, seen)
  }).lintText(source, "heading.md");
  assert.equal(seen.length, 1);
  assert.equal(seen[0].input, "paragraph");
  assert.equal(seen[0].paragraphs[0].heading, "# Heading");
  assert.equal(seen[0].paragraphs[1].heading, undefined);
  assert.equal(Object.hasOwn(seen[0], "text"), false);
});

test("whole-text gate suppresses disagreements and positive empty locations fail", async () => {
  assert.deepEqual(
    (
      await createSlopless({
        checks: [repeated],
        jev: fixed({ document: 0.1, P1: 0.9 })
      }).lintText("One paragraph.", "gate.md")
    ).messages,
    []
  );
  await assert.rejects(
    createSlopless({
      checks: [repeated],
      jev: fixed({ document: 0.9 })
    }).lintText("One paragraph.", "missing.md"),
    /no paragraph location/
  );
});

test("missing, extra, out-of-range and nonnumeric provider scores fail", async () => {
  for (const scores of [
    {},
    { P1: 0.9, foreign: 0.5 },
    { P1: NaN },
    { P1: 1.01 },
    { P1: "0.9" }
  ]) {
    const jev = {
      async judge() {
        return scores;
      }
    };
    await assert.rejects(
      createSlopless({ checks: [takeaway], jev }).lintText(
        "One paragraph.",
        "invalid.md"
      ),
      /answers|probability/
    );
  }
});

test("native textlint comments suppress a named model check", async () => {
  const source =
    "<!-- textlint-disable slopless/semantic-thinness/empty-takeaway -->\n\nThat is the real promise.\n\n<!-- textlint-enable slopless/semantic-thinness/empty-takeaway -->";
  const result = await createSlopless({
    checks: [takeaway],
    jev: fixed({ P1: 0.9 })
  }).lintText(source, "ignored.md");
  assert.deepEqual(result.messages, []);
});

test("public file/glob execution respects the native ignore file", async () => {
  const directory = mkdtempSync(join(tmpdir(), "slopless-runtime-"));
  try {
    writeFileSync(join(directory, "included.md"), "Back to square one.");
    writeFileSync(join(directory, "ignored.md"), "Back to square one.");
    writeFileSync(join(directory, ".textlintignore"), "ignored.md\n");
    const result = await createSlopless({
      checks: ["phrases:cliches"],
      cwd: directory
    }).lintFiles(["*.md"]);
    assert.equal(result.length, 1);
    assert.equal(result[0].filePath, join(directory, "included.md"));
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("cancellation and provider failure reject the public operation", async () => {
  const controller = new AbortController();
  controller.abort(Error("cancelled"));
  await assert.rejects(
    createSlopless({ checks: [takeaway], jev: fixed({}) }).lintText(
      "Text.",
      "cancel.md",
      controller.signal
    ),
    /cancelled/
  );
  const jev = {
    async judge() {
      throw Error("provider unavailable");
    }
  };
  await assert.rejects(
    createSlopless({ checks: [takeaway], jev }).lintText("Text.", "failed.md"),
    /provider unavailable/
  );
});

test("public configuration rejects unknown, duplicate and missing-client selections", () => {
  assert.throws(
    () => createSlopless({ checks: ["unknown:rule"] }),
    /Unknown check/
  );
  assert.throws(
    () => createSlopless({ checks: [takeaway, takeaway], jev: fixed({}) }),
    /unique/
  );
  assert.throws(() => createSlopless({ checks: [takeaway] }), /Jev client/);
});

test("legacy deterministic suppressions keep their existing report IDs", async () => {
  const result = await createSlopless({ checks: ["phrases:cliches"] }).lintText(
    "<!-- textlint-disable slopless/cliches -->\n\nBack to square one.\n\n<!-- textlint-enable slopless/cliches -->",
    "legacy-ignore.md"
  );
  assert.deepEqual(result.messages, []);
});

test("discovered malformed configuration fails and explicit disabled rules stay disabled", async () => {
  const directory = mkdtempSync(join(tmpdir(), "slopless-config-"));
  try {
    writeFileSync(join(directory, ".textlintrc.json"), "{ invalid JSON");
    await assert.rejects(
      createSlopless({ checks: ["phrases:cliches"], cwd: directory }).lintText(
        "Back to square one.",
        "config.md"
      )
    );
    mkdirSync(join(directory, "node_modules"));
    symlinkSync(process.cwd(), join(directory, "node_modules/slopless"), "dir");
    writeFileSync(
      join(directory, ".textlintrc.json"),
      JSON.stringify({ rules: { "preset-slopless": { cliches: false } } })
    );
    const disabled = await createSlopless({
      checks: ["phrases:cliches"],
      cwd: directory
    }).lintText("Back to square one.", "config.md");
    assert.deepEqual(disabled.messages, []);
    writeFileSync(
      join(directory, ".textlintrc.json"),
      JSON.stringify({
        rules: { "preset-slopless": { cliches: { severity: "warning" } } }
      })
    );
    const warning = await createSlopless({
      checks: ["phrases:cliches"],
      cwd: directory
    }).lintText("Back to square one.", "config.md");
    assert.equal(warning.messages[0].severity, 1);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("native package.json textlint configuration preserves disabled and warning rules", async () => {
  const directory = mkdtempSync(join(tmpdir(), "slopless-package-config-"));
  try {
    mkdirSync(join(directory, "node_modules"));
    symlinkSync(process.cwd(), join(directory, "node_modules/slopless"), "dir");
    for (const [setting, severity] of [
      [false, undefined],
      [{ severity: "warning" }, 1]
    ]) {
      writeFileSync(
        join(directory, "package.json"),
        JSON.stringify({
          name: "consumer",
          textlint: { rules: { "preset-slopless": { cliches: setting } } }
        })
      );
      const result = await createSlopless({
        checks: ["phrases:cliches"],
        cwd: directory
      }).lintText("Back to square one.", "package-config.md");
      assert.equal(result.messages[0]?.severity, severity);
    }
    await assert.rejects(
      createSlopless({
        checks: ["phrases:cliches"],
        cwd: directory,
        configFile: "missing.json"
      }).lintText("Back to square one.", "missing-config.md"),
      /Configuration not found/
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("selected CLI interruption cancels stdin before EOF", async () => {
  const child = spawn(
    process.execPath,
    ["dist/cli.js", "--check", "phrases:cliches", "--stdin"],
    {
      stdio: ["pipe", "pipe", "pipe"]
    }
  );
  let stderr = "";
  child.stderr.setEncoding("utf8").on("data", (chunk) => {
    stderr += chunk;
  });
  const exited = once(child, "exit");
  const timer = setTimeout(() => child.kill("SIGKILL"), 5000);
  try {
    child.stdin.write("A still-open input stream.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    child.kill("SIGTERM");
    const [code, signal] = await exited;
    assert.equal(signal, null, stderr);
    assert.equal(code, 2, stderr);
    assert.match(stderr, /abort|interrupt/i);
  } finally {
    clearTimeout(timer);
    child.stdin.destroy();
    child.kill("SIGKILL");
  }
});

test("a failed later batch fails the check even when the document gate was negative", async () => {
  const source = Array.from(
    { length: 17 },
    (_, i) => `Concrete paragraph ${i}.`
  ).join("\n\n");
  const jev = {
    async judge(input) {
      if (!Object.hasOwn(input.questions, "document"))
        throw Error("later batch failed");
      return Object.fromEntries(
        Object.keys(input.questions).map((id) => [id, 0.1])
      );
    }
  };
  await assert.rejects(
    createSlopless({ checks: [repeated], jev }).lintText(
      source,
      "split-failure.md"
    ),
    /later batch failed/
  );
});

test("native clean-file caching works for model checks and selected CLI accepts cache options", async () => {
  const directory = mkdtempSync(join(tmpdir(), "slopless-cache-"));
  let calls = 0;
  try {
    writeFileSync(join(directory, "input.md"), "That is the real promise.");
    const jev = {
      async judge(input) {
        calls++;
        return Object.fromEntries(
          Object.keys(input.questions).map((id) => [id, 0.1])
        );
      }
    };
    const engine = createSlopless({
      checks: [takeaway],
      jev,
      cwd: directory,
      cache: true,
      cacheLocation: join(directory, "cache.json")
    });
    assert.equal((await engine.lintFiles(["input.md"]))[0].messages.length, 0);
    await engine.lintFiles(["input.md"]);
    assert.equal(calls, 1);
    const result = spawnSync(
      process.execPath,
      [
        "dist/cli.js",
        "--check",
        "phrases:cliches",
        "--cache",
        "--cache-location",
        join(directory, "cli-cache.json"),
        "--stdin"
      ],
      { encoding: "utf8", input: "Back to square one." }
    );
    assert.equal(result.status, 1, result.stderr);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("SDK adapter exercises the HTTP boundary and rejects a different returned model", async () => {
  let wrongModel = false;
  const requests = [];
  const server = createServer(async (request, response) => {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    const decoded =
      request.headers["content-encoding"] === "zstd"
        ? zlib.zstdDecompressSync(body)
        : body;
    const payload = JSON.parse(decoded.toString("utf8"));
    requests.push(payload);
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        model: wrongModel ? "other-model" : payload.model,
        answers: Object.fromEntries(
          Object.keys(payload.questions).map((id) => [
            id,
            { type: "noul", noul: id === "P1" ? 0.9 : 0.1 }
          ])
        ),
        usage: { input_tokens: 100, output_tokens: 10 }
      })
    );
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    const client = createJevClient({
      apiKey: "contract-test-key",
      retries: 0,
      baseURL: `http://127.0.0.1:${server.address().port}`
    });
    const engine = createSlopless({ checks: [takeaway], jev: client });
    assert.equal(
      (await engine.lintText("That is the real promise.", "http.md")).messages
        .length,
      1
    );
    assert.equal(requests[0].questions.P1.type, "noul");
    wrongModel = true;
    await assert.rejects(
      engine.lintText("Text.", "bad-model.md"),
      /model changed/
    );
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});

test("CLI exposes checks, accepts explicit offline selection and fails missing credentials", () => {
  const list = spawnSync(process.execPath, ["dist/cli.js", "--list-checks"], {
    encoding: "utf8"
  });
  assert.equal(list.status, 0, list.stderr);
  assert.ok(JSON.parse(list.stdout).some((x) => x.id === repeated));
  const offline = spawnSync(
    process.execPath,
    ["dist/cli.js", "--check", "phrases:cliches", "--stdin"],
    { encoding: "utf8", input: "Back to square one." }
  );
  assert.equal(offline.status, 1, offline.stderr);
  assert.equal(JSON.parse(offline.stdout)[0].messages.length, 1);
  const env = { ...process.env };
  delete env.JEV_API_KEY;
  const missing = spawnSync(
    process.execPath,
    ["dist/cli.js", "--check", repeated, "--stdin"],
    { encoding: "utf8", input: "Text.", env }
  );
  assert.equal(missing.status, 2);
  assert.match(missing.stderr, /JEV_API_KEY/);
  assert.equal(missing.stdout, "");
});

async function protocolServer(handler, run) {
  const server = createServer(async (request, response) => {
    try {
      const chunks = [];
      for await (const chunk of request) chunks.push(chunk);
      const bytes = Buffer.concat(chunks);
      const body =
        request.headers["content-encoding"] === "zstd"
          ? zlib.zstdDecompressSync(bytes)
          : bytes;
      await handler(JSON.parse(body.toString("utf8")), response);
    } catch (error) {
      response.writeHead(400);
      response.end(JSON.stringify({ error: error.message }));
    }
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
}

function protocolReply(input, response, type = "noul") {
  response.setHeader("Content-Type", "application/json");
  response.end(
    JSON.stringify({
      model: input.model,
      answers: Object.fromEntries(
        Object.keys(input.questions).map((id) => [id, { type, noul: 0.9 }])
      ),
      usage: { input_tokens: 100, output_tokens: 10 }
    })
  );
}

test("SDK response kind is validated independently of its numeric property", async () => {
  await protocolServer(
    (input, response) => protocolReply(input, response, "choice"),
    async (baseURL) => {
      const jev = createJevClient({ apiKey: "test-key", retries: 0, baseURL });
      await assert.rejects(
        createSlopless({ checks: [takeaway], jev }).lintText(
          "Text.",
          "kind.md"
        ),
        /non-noul/
      );
    }
  );
});

test("shared SDK concurrency, retries and timeout exhaustion use real HTTP calls", async () => {
  let active = 0,
    peak = 0,
    requests = 0;
  await protocolServer(
    async (input, response) => {
      const sequence = ++requests;
      active++;
      peak = Math.max(peak, active);
      await new Promise((resolve) => setTimeout(resolve, 15));
      active--;
      if (sequence === 1) {
        response.writeHead(429, { "Retry-After": "0" });
        response.end("{}");
      } else protocolReply(input, response);
    },
    async (baseURL) => {
      const jev = createJevClient({
        apiKey: "test-key",
        concurrency: 2,
        retries: 1,
        timeoutMs: 1000,
        baseURL
      });
      const engine = createSlopless({ checks: [takeaway], jev });
      const results = await Promise.all(
        Array.from({ length: 5 }, (_, i) =>
          engine.lintText(`Text ${i}.`, `concurrent-${i}.md`)
        )
      );
      assert.ok(results.every((result) => result.messages.length === 1));
      assert.ok(peak <= 2);
      assert.equal(requests, 6);
    }
  );
  await protocolServer(
    async (_input, response) => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      response.end("{}");
    },
    async (baseURL) => {
      const jev = createJevClient({
        apiKey: "test-key",
        retries: 0,
        timeoutMs: 10,
        baseURL
      });
      await assert.rejects(
        createSlopless({ checks: [takeaway], jev }).lintText(
          "Text.",
          "timeout.md"
        )
      );
    }
  );
});

test("queued and active cancellation leave the shared client usable", async () => {
  let releaseFirst, releaseActive, firstArrived, activeArrived, queued;
  const firstGate = new Promise((resolve) => {
    releaseFirst = resolve;
  });
  const activeGate = new Promise((resolve) => {
    releaseActive = resolve;
  });
  const firstReady = new Promise((resolve) => {
    firstArrived = resolve;
  });
  const activeReady = new Promise((resolve) => {
    activeArrived = resolve;
  });
  const queuedReady = new Promise((resolve) => {
    queued = resolve;
  });
  let requests = 0;
  await protocolServer(
    async (input, response) => {
      requests++;
      if (input.state.paragraphs[0].text === "First.") {
        firstArrived();
        await firstGate;
      }
      if (input.state.paragraphs[0].text === "Active.") {
        activeArrived();
        await activeGate;
      }
      protocolReply(input, response);
    },
    async (baseURL) => {
      const shared = createJevClient({
        apiKey: "test-key",
        concurrency: 1,
        retries: 0,
        timeoutMs: 2000,
        baseURL
      });
      const jev = {
        async judge(input, signal) {
          const work = shared.judge(input, signal);
          if (input.paragraphs[0].text === "Queued.") queued();
          return work;
        }
      };
      const engine = createSlopless({ checks: [takeaway], jev });
      const first = engine.lintText("First.", "first.md");
      await firstReady;
      const controller = new AbortController();
      const waiting = engine.lintText(
        "Queued.",
        "queued.md",
        controller.signal
      );
      await queuedReady;
      controller.abort(Error("cancelled"));
      await assert.rejects(
        Promise.race([
          waiting,
          new Promise((_, reject) =>
            setTimeout(() => reject(Error("queue cancellation stalled")), 250)
          )
        ]),
        /cancelled/
      );
      releaseFirst();
      await first;
      const activeController = new AbortController();
      const active = engine.lintText(
        "Active.",
        "active.md",
        activeController.signal
      );
      await activeReady;
      activeController.abort(Error("cancelled active"));
      await assert.rejects(active, /cancelled|aborted/i);
      releaseActive();
      assert.equal(
        (await engine.lintText("Final.", "final.md")).messages.length,
        1
      );
      assert.equal(requests, 3);
    }
  );
});
