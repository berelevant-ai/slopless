import { APIError, TypeSafeClient } from "@typesafe-ai/sdk";
import type { NoulQuestion, SystemOneResult } from "@typesafe-ai/sdk";
import pLimit from "p-limit";
import type { JevClient, JevInput, JevScores } from "./types.js";

export type JevClientOptions = {
  readonly apiKey: string;
  readonly concurrency?: number;
  readonly timeoutMs?: number;
  readonly retries?: number;
  readonly baseURL?: string;
  readonly onResponse?: (receipt: JevReceipt) => void;
};

export type JevReceipt = {
  readonly input: JevInput;
  readonly scores: JevScores;
  readonly model: string;
  readonly usage: {
    readonly input_tokens: number | null;
    readonly output_tokens: number | null;
  };
  readonly elapsedMs: number;
};

async function abortable<T>(work: Promise<T>, signal: AbortSignal): Promise<T> {
  let cancel: (() => void) | undefined;
  const cancelled = new Promise<never>((_resolve, reject) => {
    cancel = (): void => {
      try {
        signal.throwIfAborted();
        reject(new Error("Jev request cancelled."));
      } catch (error: unknown) {
        reject(error);
      }
    };
    signal.addEventListener("abort", cancel, { once: true });
    if (signal.aborted) cancel();
  });
  try {
    return await Promise.race([work, cancelled]);
  } finally {
    if (cancel !== undefined) signal.removeEventListener("abort", cancel);
  }
}

export function validateScores(input: JevInput, scores: JevScores): void {
  const expected = Object.keys(input.questions).sort();
  const received = Object.keys(scores).sort();
  if (
    expected.length === 0 ||
    JSON.stringify(expected) !== JSON.stringify(received)
  ) {
    throw new Error("Jev returned missing or unexpected answers.");
  }
  for (const value of Object.values(scores)) {
    if (!Number.isFinite(value) || value < 0 || value > 1) {
      throw new Error("Jev returned an invalid probability.");
    }
  }
}

function validInteger(value: number, minimum: number, maximum: number): number {
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    throw new Error(`Expected an integer between ${minimum} and ${maximum}.`);
  }
  return value;
}

function probability(answer: {
  readonly type: string;
  readonly noul: number;
}): number {
  if (answer.type !== "noul")
    throw new Error("Jev returned a non-noul answer.");
  return answer.noul;
}

function criteriaFor(question: {
  readonly yes?: unknown;
  readonly no?: unknown;
}): readonly unknown[] {
  return question.yes === undefined && question.no === undefined
    ? []
    : [question.yes, question.no];
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function instructionFields(value: unknown): readonly unknown[] {
  if (typeof value === "string") return [value];
  if (!isRecord(value)) return [undefined];
  const fields = value;
  return [
    fields["question"],
    fields["instructions"],
    fields["rulebook"],
    fields["target"],
    ...(Object.hasOwn(fields, "heading") ? [fields["heading"]] : [])
  ];
}

function validateInput(input: JevInput): void {
  const count = Object.keys(input.questions).length;
  if (
    count < 1 ||
    (input.input === "text" && input.instructions.trim().length === 0) ||
    (input.input === "paragraph" &&
      (input.paragraph.text.trim().length === 0 ||
        input.paragraph.id.trim().length === 0)) ||
    input.model.trim().length === 0
  ) {
    throw new Error("Invalid Jev request configuration.");
  }
  for (const question of Object.values(input.questions)) {
    if (
      [
        ...instructionFields(question.instructions),
        ...criteriaFor(question)
      ].some((s) => typeof s !== "string" || s.trim().length === 0)
    ) {
      throw new Error("Jev questions require instructions and both criteria.");
    }
  }
}

function tokenLimit(value: unknown): boolean {
  if (value === "max_tokens_exceeded") return true;
  if (!isRecord(value)) return false;
  return Object.entries(value).some(
    ([key, item]) =>
      ["code", "type", "error", "detail"].includes(key) && tokenLimit(item)
  );
}

function requestFor(input: JevInput): {
  readonly model: string;
  readonly state:
    | { paragraph: { id: string; text: string } }
    | {
        instructions: string;
        paragraphs: { id: string; text: string; heading?: string }[];
        article: string;
      };
  readonly questions: Record<string, NoulQuestion>;
} {
  const questions: Record<string, NoulQuestion> = {};
  for (const [id, question] of Object.entries(input.questions)) {
    questions[id] = {
      type: "noul",
      instructions: question.instructions,
      ...(question.yes === undefined
        ? {}
        : { criteria: { true: question.yes, false: question.no } })
    };
  }
  return {
    model: input.model,
    state:
      input.input === "paragraph"
        ? { paragraph: { id: input.paragraph.id, text: input.paragraph.text } }
        : {
            instructions: input.instructions,
            paragraphs: input.paragraphs.map((p) => ({ ...p })),
            article: input.text
          },
    questions
  };
}

async function splitRequest(
  client: TypeSafeClient,
  input: JevInput,
  signal: AbortSignal,
  onResponse: JevClientOptions["onResponse"]
): Promise<JevScores> {
  const questions = Object.entries(input.questions);
  if (questions.length === 1)
    throw new Error(
      "Jev input exceeds the provider context or body limit; the complete paragraph and prompt were preserved."
    );
  const midpoint = Math.ceil(questions.length / 2);
  const first = await execute(
    client,
    {
      ...input,
      questions: Object.fromEntries(questions.slice(0, midpoint))
    },
    signal,
    onResponse
  );
  const second = await execute(
    client,
    {
      ...input,
      questions: Object.fromEntries(questions.slice(midpoint))
    },
    signal,
    onResponse
  );
  return { ...first, ...second };
}

async function execute(
  client: TypeSafeClient,
  input: JevInput,
  signal: AbortSignal,
  onResponse: JevClientOptions["onResponse"]
): Promise<JevScores> {
  signal.throwIfAborted();
  const request = requestFor(input);
  if (Buffer.byteLength(JSON.stringify(request)) > 32 * 1024 * 1024)
    return splitRequest(client, input, signal, onResponse);
  const started = performance.now();
  let response: SystemOneResult<Record<string, NoulQuestion>>;
  try {
    response = await client.systemOne(request, { signal });
  } catch (error: unknown) {
    if (
      error instanceof APIError &&
      (error.status === 413 || (error.status === 400 && tokenLimit(error.body)))
    )
      return splitRequest(client, input, signal, onResponse);
    throw error;
  }
  signal.throwIfAborted();
  if (response.model !== input.model)
    throw new Error("Jev response model changed.");
  const scores: Record<string, number> = {};
  for (const [id, answer] of Object.entries(response.answers)) {
    scores[id] = probability(answer);
  }
  validateScores(input, scores);
  for (const n of [response.usage.input_tokens, response.usage.output_tokens]) {
    if (n !== null && (!Number.isSafeInteger(n) || n < 0))
      throw new Error("Jev returned invalid token usage.");
  }
  onResponse?.({
    input,
    scores,
    model: response.model,
    usage: response.usage,
    elapsedMs: performance.now() - started
  });
  return scores;
}

export function createJevClient(options: JevClientOptions): JevClient {
  if (options.apiKey.trim().length === 0)
    throw new Error("JEV_API_KEY is required.");
  const limit = pLimit(validInteger(options.concurrency ?? 3, 1, 32));
  const timeout = validInteger(options.timeoutMs ?? 30000, 1, 120000);
  const retries = validInteger(options.retries ?? 2, 0, 3);
  const client = new TypeSafeClient({
    apiKey: options.apiKey,
    baseURL: options.baseURL ?? "https://api.typesafe.ai",
    timeout,
    retry: { maxRetries: retries },
    logLevel: "off"
  });
  return {
    async judge(input, signal): Promise<JevScores> {
      validateInput(input);
      signal.throwIfAborted();
      return abortable(
        limit(async () => {
          const bounded = AbortSignal.any([
            signal,
            AbortSignal.timeout(timeout * (retries + 1))
          ]);
          bounded.throwIfAborted();
          try {
            return await execute(client, input, bounded, options.onResponse);
          } catch (error: unknown) {
            const message =
              error instanceof Error ? error.message : "Provider call failed.";
            throw new Error(
              `Jev execution failed: ${message.replaceAll(options.apiKey, "[REDACTED]")}`
            );
          }
        }),
        signal
      );
    }
  };
}
