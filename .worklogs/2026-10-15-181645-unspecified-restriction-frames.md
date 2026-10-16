# Unspecified restriction frames

Extended the existing generic-signposting templates to recognize unspecified scope restrictions, including "Its vocabulary remains bounded". Added 52 desired-hit cases and 60 no-hit controls, preserving every case in corpus prose and retaining prior fixture text.

## Decisions

- Kept vocabulary and factual-limit checks private to the existing pattern. A companion constraints file keeps both modules below the 400-line limit; shared matching and reporting retain their current interfaces.
- Reused Compromise grammar and noun inflection. Attached quantities, domains, causal explanations, noun complements, and operational consequences distinguish factual limits from empty restrictions.
- Reused whitespace normalization for grammar parsing after the full PEP source exposed a soft-wrap failure. The original wrapped paragraph is retained as a regression case.
- Retained the documented RFC 2418 false positive rather than suppressing an independent focus claim using a boundary that modifies lifetime.
- Recorded three false positives from unchanged demonstrative-emphasis behavior that appended fixture data activates. All 77 rules produce identical baseline/candidate output on the expanded no-hit file.

## Verification

- All 254 focused cases and 254 corpus occurrences pass. Node 22 source-build and Node 24 packed-package checks pass; both global installations match the final frozen runtime and report `0.2.41-dev.1`.
- The final changed-rule comparison covers 15,580 documents and zero runtime failures. Human findings increase by one known false positive across 21,305,305 words; suspected-AI findings increase by one unspecified historical comparison; generated AI findings are unchanged.
- The 88,912-word expansion corpus retains all 57 findings. The engineering fixture gains 51 findings on identical input; the other eight committed corpus files retain their findings.
- Specular lint/verify, build, ESLint, formatting, spelling, and 100 percent strict type coverage pass. Both changed Fixture3 suites have been reviewed and approved; the final all-suite rerun exits 0 with all 23 suites matched and zero errors.
- Independent implementation and evidence reviews checked source, ranges, complete audit partitions, packed runtime, and installed CLIs.

## Context

- `.plans/2026-10-15-172950-unspecified-restriction-frames.md` and its JSON spec describe the implementation.
- `.plans/2026-10-15-180639-restriction-frame-validation.md` and its results JSON contain exact corpus counts, reviewed findings, and known false positives.
- `src/rules/syntactic-patterns/lead-ins/private/narrow-frame.ts` owns the templates and subject checks; `narrow-frame-constraints.ts` owns attached-limit checks.
- The existing syntactic-patterns case files and engineering-review corpus contain the additions; their two Fixture3 outputs record reviewed behavior.

## Next steps

Work remains on `feat/framing-and-adverb-expansion` in the analysis worktree and PR 142. Merging and publishing require separate authorization. For precision work, reproduce the documented RFC focus finding and the three demonstrative-emphasis reports from the validation report before changing eligibility or counting behavior.
