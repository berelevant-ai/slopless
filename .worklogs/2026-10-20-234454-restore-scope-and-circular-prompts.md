# Restore Scope And Circular Prompts

## Summary

Restored both `prompts/v9/` check files to byte-identical `v2` wording at the user's request. Preserved the trial snapshots and evaluation results.

## Decisions

- Reverted unspecified scope and circular explanation together. Their candidate holdout accuracy matched the originals, with scope losing one caught hit.
- Updated `prompts/README.md` to identify the restored wording and distinguish it from the rejected candidates saved in result JSON.
- Preserved shared instructions, other tuned checks, datasets, production code, and unrelated working changes.

## Verification

- Byte comparisons confirm both restored files and shared instructions match `v2` exactly.
- Markdown formatting and staged whitespace checks pass. The rollback requires no additional model calls.

## Key Files

- `prompts/v9/{unspecified-scope,circular-explanation}.md`: restored prompts.
- `prompts/README.md`: current prompt selection and retained experiment locations.

## Next Steps

Use the restored definitions for these two checks. Keep the other selected prompt revisions unchanged.
