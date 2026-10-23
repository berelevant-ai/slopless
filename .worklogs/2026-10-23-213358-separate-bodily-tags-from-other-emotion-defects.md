# Separate Bodily Tags From Other Emotion Defects

## Summary

Inspect all nine errors from body-emotion b1 and freeze b2. Clarify the check's own construction while preserving useful bodily information and independent weak cues.

## Decisions

- Explicitly distinguish actual bodily reactions from emotion-as-material, generic voice quality, feelings crossing a face and looking. Four b1 false positives concern these other constructions.
- Preserve localized physical symptoms and reactions that alter communication, perception or ability. Assess separate reactions independently and retain embodied-object emotional burdens.
- Keep all judgments and execution settings unchanged. The prompt uses the same six development demonstrations as b1 and remains under 1,000 assembled words.

## Key Files

- `prompts/v21/body-emotion-shorthand.md` contains b2.
- The native b0 and b1 results preserve both complete prediction sets.

## Next Steps

- Evaluate b2 on all 200 development passages. Independently review the 944 pilots being authored across the other fifty collections before expanding them.
