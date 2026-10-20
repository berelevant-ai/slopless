# V2 Exact Marked Text

## Summary

Updated root `AGENTS.md` to store offending wording as exact text snippets instead of agent-authored character ranges. Agents can author and review the quoted wording directly; code can derive positions when highlighting requires them.

## Decisions

- Validate snippets against their passage and allow several snippets for cross-sentence patterns.
- Keep the change scoped to V2 instructions. Existing datasets, schemas, and runners remain unchanged.

## Verification

- `pnpm exec prettier --check AGENTS.md` and `pnpm exec cspell AGENTS.md` pass.

## Next Steps

- Apply the exact-snippet format when implementing V2 labels and their validator.
