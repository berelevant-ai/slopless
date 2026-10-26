import { TypeSafeClient } from "@typesafe-ai/sdk";
import type { NoulQuestion } from "@typesafe-ai/sdk";
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

function validateInput(input: JevInput): void {
  const count = Object.keys(input.questions).length;
  if (
    count < 1 ||
    count > 16 ||
    input.instructions.trim().length === 0 ||
    input.model.trim().length === 0
  ) {
    throw new Error("Invalid Jev request configuration.");
  }
  for (const question of Object.values(input.questions)) {
    if (
      [question.instructions, ...criteriaFor(question)].some(
        (s) => typeof s !== "string" || s.trim().length === 0
      )
    ) {
      throw new Error("Jev questions require instructions and both criteria.");
    }
  }
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
      const request = {
        model: input.model,
        state: {
          instructions: input.instructions,
          paragraphs: input.paragraphs.map((p) => ({ ...p })),
          ...(input.input === "text" ? { article: input.text } : {})
        },
        questions
      };
      if (Buffer.byteLength(JSON.stringify(request)) > 32 * 1024 * 1024) {
        throw new Error(
          "Jev request exceeds the 32 MiB provider limit; text was preserved."
        );
      }
      return abortable(
        limit(async () => {
          const bounded = AbortSignal.any([
            signal,
            AbortSignal.timeout(timeout * (retries + 1))
          ]);
          bounded.throwIfAborted();
          const started = performance.now();
          try {
            const response = await client.systemOne(request, {
              signal: bounded
            });
            if (response.model !== input.model)
              throw new Error("Jev response model changed.");
            const scores: Record<string, number> = {};
            for (const [id, answer] of Object.entries(response.answers)) {
              scores[id] = probability(answer);
            }
            validateScores(input, scores);
            for (const n of [
              response.usage.input_tokens,
              response.usage.output_tokens
            ]) {
              if (n !== null && (!Number.isSafeInteger(n) || n < 0))
                throw new Error("Jev returned invalid token usage.");
            }
            options.onResponse?.({
              input,
              scores,
              model: response.model,
              usage: response.usage,
              elapsedMs: performance.now() - started
            });
            return scores;
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
