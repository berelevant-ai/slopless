# Goal

Warn on one use of `quietly` when it supplies unsupported hidden significance
to a claim, while preserving ordinary uses that describe low sound, physical
manner, calm conduct, secrecy, private action, or a named silent technical
behavior.

The completed behavior must:

- keep `words:quietly-overuse` unchanged as an independent document-density
  rule;
- add `words:quietly-filler` as a one-to-one warning rule;
- report each matched sentence at severity 1;
- leave existing one-to-one rules at their default error severity;
- avoid treating the exact word `quietly` as prohibited;
- avoid reporting image alt text, headings, quoted titles, or code as prose;
- retain every existing fixture finding except reviewed additions from the new
  public rule.

# Evidence

The pre-implementation audit reviewed every exact `quietly` occurrence in the
local validation corpora:

- human: 208 prose-scoped occurrences in 193 files;
- generated AI: 5 occurrences in 5 files;
- suspected AI: 122 prose-scoped occurrences in 95 files.

The human uses split into:

- 59 secret, private, or unpublicized actions;
- 41 low-volume speech or sound;
- 37 calm, non-disruptive, or low-profile actions;
- 32 literal low-noise movements or states;
- 18 rhetorical or evaluative uses;
- 11 gradual or unnoticed processes;
- 7 names or titles;
- 4 specified silent technical behaviors.

The AI corpora contain 91 reviewed warning candidates and 36 uses that should
remain silent. The warning candidates split into:

- 29 vague changes, drifts, erosions, or transformations;
- 34 hidden harms, failures, costs, or risks;
- 16 background-work or background-importance claims;
- 7 unannounced trends, adoptions, achievements, or discoveries;
- 5 detached emphasis uses.

The current `something-shifted` semantic pattern matches none of these 134 AI
occurrences. The current density rule reports one suspected-AI article and
suppresses every isolated use.

# Approach

1. Extend the reporting contract so a `one-to-one` policy may declare severity
   1 or 2. The reporter copies that declared severity to each report. Omitted
   severity continues to mean the existing default error. Expose the option
   through `oneToOneRule` so rules do not bypass the reporting layer.
2. Add a private words-family matcher that tokenizes a sentence, locates exact
   `quietly` tokens, and classifies each occurrence into one of six labels:
   - `evaluative-intensifier`: `quietly` directly modifies an evaluative word
     such as `powerful`, `transformative`, `consequential`, `dynamic`,
     `heartbreaking`, or `remarkable`;
   - `abstract-change`: an abstract subject or result is paired with a change
     predicate such as `reshape`, `revolutionize`, `degrade`, `atrophy`,
     `widen`, `balloon`, `disappear`, `compound`, `escalate`, or
     `lose authority`;
   - `hidden-harm`: `quietly` dramatizes harm with predicates such as
     `poison`, `sabotage`, `destroy`, `drown`, `rot`, `ruin`, `throttle`,
     `tank`, `bleed money`, `break`, `fail`, `block`, `hurt`, `stop`, or
     `fall apart`;
   - `background-significance`: a system, technology, artifact, or concept is
     presented as invisibly working, running, processing, managing, powering,
     paying, solving, or being everywhere or behind the scenes;
   - `unannounced-trend`: organizations, products, tools, developers, or
     technologies are framed as invisibly building, integrating, replacing,
     creating, adopting, or taking over;
   - `detached-emphasis`: `Quietly.` or a detached `slowly, quietly` fragment
     supplies drama without a manner-bearing action.
3. Keep the matcher token-based. Do not use regular expressions, a parser
   replacement, sentence literals, or a blanket test for abstract subjects.
   Store direct predicates, subject markers, required phrase markers, and
   normal-use boundaries in a separate JSON vocabulary so each boundary can
   be reviewed independently.
4. Apply explicit normal-use boundaries before classifying:
   - sound and speech: `say`, `speak`, `ask`, `read`, `sing`, `applaud`,
     `breathe`, `play`, and equivalent inflections;
   - physical manner or stillness: `sit`, `stand`, `walk`, `move`, `enter`,
     `leave`, `close`, `open`, `fly`, `fall`, `wait`, `watch`, `look`, `lie`,
     `rest`, and equivalent inflections;
   - deliberate secrecy or private conduct: `approve`, `settle`, `release`,
     `remove`, `edit`, `launch`, `investigate`, `negotiate`, `donate`,
     `resign`, `count on`, `assume`, `rely`, and equivalent inflections;
   - named silent technical behavior: `ignore`, `truncate`, `miscount`,
     `misalign`, `desync`, `sync`, `pass`, `drop` with a number or named
     mechanism, and equivalent inflections;
   - quoted or title-like uses.
   A normal-use verb suppresses only the occurrence it governs. It does not
   suppress another bad `quietly` occurrence elsewhere in the sentence.
5. Fix shared paragraph collection so sentence and paragraph rule units
   recurse through list containers. Keep document readability input on its
   existing top-level and blockquote paragraphs so list traversal does not
   change prior document metrics. Mask inline code and image alt text with
   same-length spaces so prose rules skip them without shifting later source
   ranges. Continue excluding headings and code blocks.
6. Add `words:quietly-filler` as a sentence-unit rule. Emit one warning per
   classified occurrence, range the finding to the exact `quietly` token, and
   name the matched class in the message. Keep
   `words:quietly-overuse` unchanged, including its four-occurrence floor and
   per-1,000-word thresholds.
7. Register the new rule in the words registry, everything preset, public
   package export map, and npm package export map.
8. Add isolated public behavior cases:
   - at least six varied hit cases for each of the six classes;
   - inflected verbs and `quietly` before and after predicates;
   - modal and auxiliary forms;
   - multiple bad occurrences in one sentence;
   - at least six no-hit cases for each normal-use boundary;
   - adversarial contrasts using the same nearby verbs in physical,
     confidential, measured, and mechanically explained contexts;
   - a case proving a contextual warning and the existing density error can
     coexist without changing either policy;
   - a case proving one-to-one rules without declared severity remain errors.
9. Add every new hit and no-hit case to readable topic-relevant corpus prose
   and update preserve records. Corpus prose may add findings but must retain
   every isolated case.
10. Run Fixture3 before approval and review every added, removed, and changed
   finding. Do not accept output until:
   - all intended contextual cases warn at severity 1;
   - every new no-hit remains silent for `quietly-filler`;
   - all prior rule IDs, messages, ranges, and severities are unchanged.
11. Run the changed rule over all 335 prose-scoped corpus occurrences. Manually
    review every human finding and every AI miss:
    - report counts by the six classes and corpus source;
    - list all human findings judged useful style warnings;
    - list and fix every strong human false positive;
    - list every reviewed AI warning candidate still missed and state the
      structural reason;
    - do not weaken a class by adding sentence-specific exclusions.
12. Run repository validation, Specular lint and verify, Fixture3 doctor and
    all suites, preserve parity, and one adversarial review. Resolve every
    blocker before completion.
13. Bump the patch version, commit with a worklog, push a feature branch,
    merge through a pull request after CI passes, publish the GitHub release
    and npm package, install the published version globally, and smoke-test a
    contextual warning, a normal use, and the unchanged density rule.

# Key Decisions

- Context and repetition are separate public behaviors because users may want
  one without the other.
- A contextual match is a warning. Repetition keeps its existing warning and
  error rates.
- Informative detail does not automatically rescue rhetorical `quietly`.
  `A bug quietly poisons dashboards` remains filler. A named silent behavior
  such as `The importer dropped 37 malformed rows because strict=false`
  remains silent because `quietly` describes the absence of visible failure.
- Abstract subjects are supporting evidence, not sufficient evidence.
  `Protests began quietly` and `applications grow quietly` are not reported
  without a matched bad predicate or evaluative frame.
- Passive voice is not sufficient evidence. Private settlements, canceled
  projects, released prisoners, buried remains, and ignored protocol
  attributes remain silent.
- Duplicate cross-rule findings are allowed when the sentence independently
  violates two public rules. No cross-rule suppression or global deduplication
  is added.

# Files To Modify

- `src/reporting/types.ts`
- `src/reporting/reports.ts`
- `src/reporting/density.ts`
- `src/shared/text/sections.ts`
- `src/shared/text/document.ts`
- `src/shared/text/traverse.ts`
- `src/rules/private/textlint-rule-builders.ts`
- `src/rules/words/data/quietly-context.json`
- `src/rules/words/private/quietly-clause.ts`
- `src/rules/words/private/quietly-context.ts`
- `src/rules/words/private/quietly-evidence.ts`
- `src/rules/words/quietly-filler.ts`
- `src/registries/words.ts`
- `src/presets/everything.ts`
- `package.json`
- `cspell.config.json`
- `behavior/fixtures/textlint-rules/cases/words/hits.md`
- `behavior/fixtures/textlint-rules/cases/words/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.preserve.json`
- `behavior/analysis/quietly-ai-reviewed.json`
- `behavior/analysis/quietly-human-reviewed.json`
- reviewed Fixture3 approved outputs for changed suites
- this plan, its Specular specification and coverage map, and the worklog
