# Stock Wording And Jargon Holdout

## Result

The frozen family catches 900/1,000 expected hits and flags 100/1,000 expected no-hits. Three of ten check/collection combinations pass the fixed reference; each check fails at least one collection.

| Check | Isolated caught / 100 | Isolated false positives / 100 | Mixed caught / 100 | Mixed false positives / 100 |
| --- | --- | --- | --- | --- |
| Cliche | 95 | 4 | 99 | 22 |
| Borrowed jargon | 87 | 11 | 90 | 13 |
| Tortured phrasing | 75 | 0 | 66 | 10 |
| Hidden-significance adverb | 100 | 12 | 100 | 0 |
| Stock vocabulary | 88 | 23 | 100 | 5 |

- The reference requires at least 95 caught hits and at most five false positives in every assigned collection.
- Cliche passes isolation. Hidden-significance adverbs and stock vocabulary pass mixed passages; their isolated results fail on false positives.
- Tortured phrasing remains the largest recall gap. Cliche in mixed passages and stock vocabulary in isolation retain substantial false-positive counts.
- The [assessment record](stock-wording-and-jargon-v17-holdout.json) preserves all native results and frozen input hashes.

## Frozen Execution

- User authorization: "do holdouts for 1 and 2" on 2026-10-25. Use the five selected checks in `prompts/v17`, whose assembled hashes match their saved selected development results.
- Preserve model `jev-1.13.0`, SDK `0.7.0`, cutoff `0.5`, batch size sixteen and classification-only mode.
- Five isolated collections and one mixed collection contain 1,200 distinct passages. Ten jobs produce 2,000 independently scored judgments through 130 requests.
- Recorded request duration sums to 22.66 seconds; concurrent execution and client work determine end-to-end duration.
- Labels and snippets remain scoring inputs only. The model receives the target passage, shared instructions and the selected check's definition and development demonstrations.

## Development Comparison

Comparison uses the selected development candidate's fresh confirmation and the same definition on different passages. These changes describe transfer between datasets.

| Check | Isolated confirmation caught / false positives | Isolated holdout | Mixed confirmation | Mixed holdout |
| --- | --- | --- | --- | --- |
| Cliche | 97 / 7 | 95 / 4 | 100 / 16 | 99 / 22 |
| Borrowed jargon | 97 / 10 | 87 / 11 | 98 / 9 | 90 / 13 |
| Tortured phrasing | 73 / 1 | 75 / 0 | 68 / 4 | 66 / 10 |
| Hidden-significance adverb | 98 / 3 | 100 / 12 | 100 / 0 | 100 / 0 |
| Stock vocabulary | 94 / 25 | 88 / 23 | 100 / 22 | 100 / 5 |

- Borrowed-jargon recall drops ten points in isolation and eight in mixed passages.
- Hidden-significance adverbs retain all hits but rise from three to twelve isolated false positives.
- Mixed stock vocabulary retains all 100 hits and reduces false positives from 22 to five. Isolation still flags 23 clean labels and misses twelve hits.

## Mixed Results

- The same 200 mixed passages receive five independent judgments each. Every expected issue is found in 151/193 affected passages.
- All five answers match in 114/200 passages. Two of seven passages labeled clean for all five checks receive a finding.
- The isolated and mixed sets have different writing and combinations. These measurements establish their observed quality separately; they do not isolate the causal effect of adding another issue.

## Error Review

Independent passage reviews cover all 200 errors: 181 upheld model errors, sixteen substantive label disputes and three no-hit labels the reviewers recommend reversing. Every error remains in the frozen scores; the assessment JSON includes each review judgment and its exact snippet.

- Cliche false positives include useful idioms, wordplay and wording being examined. Some generic-inspiration versus useful-meaning boundaries remain disputed.
- Borrowed jargon produces a clear quotation-handling false positive at `000044-p190`.
  - "Please remove 'emotional checksum' from the agenda and call that item 'How we feel about the move'" receives `0.80`; the writer explicitly rejects the jargon.
- Borrowed jargon misses adopted technical decoration at `000052-p082`.
  - "We will compile team trust by having colleagues share one suggestion for the lunch menu" receives `0.35`; the procedure supplies no computing relationship.
- Two borrowed-jargon false positives appear reasonable under the definition, raising concerns about their no-hit labels.
  - `000044-p059` calls an ordinary object-storytelling event a "personal values elicitation lab"; Jev flags it at `0.74`.
  - `000044-p173` calls putting a phone in a bag an "attention firewall"; Jev flags it at `0.71`.

- Tortured phrasing misses 59 corrupted-name examples across both collections.
  - `000046-p016`: "Use a usual expression to match the optional region suffix" receives `0.19`. The caret, matching and compilation instructions identify the intended regular expression.
  - All ten tortured-phrasing false positives are upheld model errors in the review. Quoted or examined wording remains a frequent failure boundary.
- Hidden-significance adverbs flag examined wording and contextually meaningful manner or disclosure distinctions.
  - `000048-043`: "The analysis treats 'quietly revolutionary' as evaluative wording" receives `0.87` although the passage explicitly examines the expression.
  - Ten of twelve adverb false positives are upheld model errors; the two remaining cases leave the role of postposed "quietly" debatable.
- Stock vocabulary miscounts contextually meaningful words or wording assigned to another check and misses some passages with three ornaments.
  - `000050-168` labels "holistic", "elevated" and "rich" clean beside a routine flower-delivery proposal; the reviewer recommends reversing this no-hit. Jev flags it at `0.74`.
  - The vocabulary review upholds 38 of forty model errors, disputes one label and recommends reversing the other.

The main weaknesses therefore persist after review. Nineteen challenged labels account for a minority of the 200 scored errors; repairing them alone would leave the observed recall and false-positive problems.

## Verification And Consequence

- Native results validate against registered input hashes, selected development prompt hashes, request hashes and completed inference seals.
- Dataset Fixture3 matches its approved output. Fresh independent review verifies all native metrics, mixed joins, selected prompt provenance and complete error-review coverage against the frozen inputs.
- Preserve these measured failures for a new development round. Any revision informed by these results requires fresh holdout material before an independent assessment.
