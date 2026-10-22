# Freeze Stock Wording Development Inputs

## Summary

Freeze all twelve reviewed datasets and the five baseline prompts before Jev inference. The selected collections contain 2,400 passages and 4,000 labels; Git preserves 302 reviewed surplus passages.

## Decisions

- Use Jev 1.13.0, SDK 0.7.0, classification-only mode, threshold 0.5 and sixteen-target batches. Evaluate 200 isolated and 200 mixed development passages per check.
- Keep shared instructions fixed throughout tuning. Every check has at most three hit and three no-hit demonstrations; record all 23 exposed development IDs in the existing family review record.
- Preserve dataset writing under the repository's existing verbatim-data formatting exclusion. A forced formatting probe reports cosmetic differences; scoped prompt formatting passes.

## Verification

- Validate all 15,697 dataset pairs and 28,653 labels. Fixture3's dataset suite matches its approved output with all 46 contracts passing.
- The verified overlap helper checks 721,563,600 eligible comparisons against 15,685 prior documents and finds zero candidates. Independent probes check 8,186 pairs against brute force.
- Protected review confirms all 2,400 root passages and 4,000 labels match the selected raw pools, with zero new ID collisions. Conservative cliche review finds at least 52 unseen central constructions.
- Independent prompt review verifies every development example and highlighted snippet, the vocabulary count annotations, and the 1,000-word assembled limit for all five checks.

## Key Files And Next Steps

- The accepted taxonomy defines the checks. The development plan fixes trial limits, acceptance bounds and the holdout gate.
- Run all five baselines, review every error, and make only general check-specific revisions within the fixed limits. Confirm each selected candidate with a fresh run and report all failed bounds.
