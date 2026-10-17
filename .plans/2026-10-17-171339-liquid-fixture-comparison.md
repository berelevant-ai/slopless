# Liquid comparison on the saved Jev experiment

## Goal

- Evaluate Liquid's hosted decision model on the same 764 fixture paragraphs and 1,026 questions as the completed Jev run.
- Compare quality, reported token usage, and request latency while preserving the original prompts, threshold, and baseline.

## Approach

1. Read Liquid's getting-started and decision-model documentation. Verify the endpoint, model, SDK configuration, output fields, and pricing.
2. Reuse the saved final Jev requests. Change only `model` to `d1-ultra`; validate source and original request hashes before sending.
3. Resolve the authorized Liquid credential through the Agent API Keys vault. Require exactly one matching account/key record.
4. Try the unchanged batching with compression disabled and automatic retries disabled. If the server rejects its size, split only question lists while preserving full state. Save exact requests and responses under the existing experiment's `liquid/` folder.
5. Compare all probabilities using the unchanged 0.5 threshold. Review disagreements with Jev and existing Slopless output, including factual controls and previously missed targets.
6. Record every paragraph result and a reviewed summary, then commit and push the internal experiment. Keep production code and approved fixtures unchanged.

## Decisions

- Select `d1-ultra`, which Liquid documents as its most capable hosted decision model. A single frozen-prompt pass gives the direct comparison requested.
- Reuse `@typesafe-ai/sdk@0.7.0` from ignored scratch storage. The installed SDK appends `/v1/systemone`, so use `https://api.liquid.ai/decisions` to reach the documented endpoint.
- Keep all state and question instructions identical to the final Jev pass. Record server failures or limits before changing batching.
- Use provider-reported usage to calculate cost at $0.042 per million input tokens. Liquid documents each question as separately billed.

## Files

- `developer-helpers/experiments/2026-10-17-jev-paragraphs/liquid-run.mjs` prepares, runs, and compares the saved requests.
- Its `liquid/` output folder holds requests, responses, comparison JSON, paragraph results, and the reviewed report.
- A timestamped worklog records completed execution and verification.

## Sources and access

- The supplied console documentation returned HTTP 403 through direct retrieval. The official [d1 reference](https://docs.liquid.ai/lfm/models/d1) documents the decision endpoint and SDK.
- The official [d1-ultra announcement](https://www.liquid.ai/blog/d1-ultra) gives the selected model's input-token price.
- The user authorized revoking the unused key and saving a replacement. The new key is privately verified in Agent API Keys; the original `codex` key is revoked.
- The first 265-question request returned HTTP 422: "A request accepts at most 128 questions." The console OpenAPI reference confirms this limit and per-question full-state billing.
- Split the frozen questions into ten requests of at most 128 questions, preserving the complete state and every instruction. The original rejected request and its failure remain in the record.

## Completed execution

- Ten successful requests returned all 1,026 probabilities. Source hashes, original Jev response hashes, unique question coverage, baseline rows, and batch request hashes pass validation.
- Liquid flags 213 semantic hit-file paragraphs and three no-hit paragraphs; Jev flags 198 and 17 respectively. Restriction findings preserve 24 engineering positives with zero extra flags.
- Provider-reported usage totals 11,714,322 input tokens, zero output tokens, and $0.492001524. Successful request times sum to 54.4746 seconds.
- Exact requests, responses, comparison JSON, and all 764 paragraph results are saved under `liquid/`. The report separates expectations, baseline agreement, prompt-layout cost, and manual judgments.
