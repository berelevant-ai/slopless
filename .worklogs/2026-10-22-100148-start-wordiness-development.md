# Start Wordiness And Redundancy Development

## Summary

Start the authorized next-family development using Codex reviewers. Freeze definitions after independent review before generating realistic pilots and balanced datasets.

## Decisions

- Apply the user's correction: Codex reviews replace Claude for this task. Use separate author, blind-review, adversarial-review, and final-review contexts with recorded identities.
- Strengthen wordiness against shortening preference, distinguish circular explanation from repeated information, preserve meaningful modifier degree, and resolve adjacent versus separated repetition.
- Preserve assessed prompts, previous data and results, and unrelated term-policy edits. Holdout writing remains protected from prompt authors; inference on holdout retains its separate authorization.

## Verification

- Independent Codex review approves all three corrected definitions before generation. The existing definition extractor resolves each type with its declared passage or text input.
- Scoped formatting and diff checks pass. Source rules, datasets, selected prompts, and prediction records remain unchanged at this definition freeze.

## Key Files And Next Steps

- Read the wordiness execution plan and the matching consolidated definitions in the accepted taxonomy.
- Approve realistic 10-hit/10-no-hit pilots per check, expand and independently review 100-hit/100-no-hit development and holdout sets, then tune only development and verify the planned mixed-data runner support.
