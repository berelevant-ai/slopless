# Restriction phrases, heading option, and source ranges

## Implemented behavior

- The existing `generic-signposting` rule catches adjective-before-noun restriction phrases without depending on the later verb.
  - Examples include "A narrow product with few integrations can move quickly", "We can launch a narrow product", and "A narrow product or service can move quickly".
  - The existing narrow, narrower, limited, bounded, restricted, and constrained vocabulary supplies the adjectives. Product, service, feature, application, project, implementation, and brief join the existing noun slots.
- Attached operating limits, quantities, implementation definitions, recorded scope, compound nouns, quotations, and real passive actions retain their controls.
  - "A narrow product only supports deposits and withdrawals" stays clean. "A narrow service accepts only what matters for growth" is flagged.
  - "The limited product and service contracts expire tomorrow" stays clean. "A narrow product of Microsoft can move quickly because the team is small" is flagged.
- Heading sentence-case enforcement is off in the standard preset and CLI. `slopless --sentence-case article.md` enables it.
  - Custom configurations enable `"sentence-case": {}` inside `"preset-slopless"`. The flag follows the existing narrative flag's custom-config conflict behavior.
  - The explicit everything preset and all-rule fixture runner continue to exercise the heading rule.
- Shared mapping now reports original Markdown character ranges after indentation removal, escaped punctuation, and decoded entities.
  - Paul Graham's "The narrow focus" starts at 11571 in the source; the previous mapper reported 11565.
  - Each AST text node retains its own decoded spans and whitespace alignment. Start and end boundaries are independent, and immutable AST nodes share cached mappings.

## Fixtures and verification

- Added 32 hit cases and 40 no-hit controls, preserved verbatim in flowing engineering-review prose. The focused checker passes all 326 cases and all 326 corpus occurrences.
- Copied the revised supplier guide into `behavior/fixtures/textlint-rules/corpus/igaming-supplier-guide-revised.md` to preserve the external draft.
- Added paired default and opt-in CLI heading fixtures. The isolated packed package passes 12 CLI checks and two exported-preset checks.
  - Checks cover file input, stdin, combined narrative and heading flags, four custom-config conflict spellings, explicit config enablement, and both article modes.
  - The copied article yields four default findings and ten with `--sentence-case`: the six additional findings concern headings.
- The source-range integration verifier passes 35 contracts through real Markdown parsing and textlint reporting. Specular verification passes those same contracts.
  - Coverage includes indented wraps, CRLF, emphasis, links, images, code, repeated phrases, Unicode, entities, and escapes.
  - Character-level checks cover decoded characters adjacent to identical literal characters and an entity-heavy paragraph.
- Build, CLI version verification, ESLint, formatting, spelling, and strict type coverage pass. Fixture3 exits 0 with all 24 suites matched after reviewing and approving five changed suites.
  - The syntactic hit file adds 32 generic-signposting findings. Its no-hit file adds a readability finding at Coleman-Liau 12.02 and a softening-language finding on the copied PEP wording; generic-signposting stays clean there.
  - The engineering corpus adds 32 generic-signposting findings, three repeated-opening findings, and the copied PEP hedge. Its recalculated readability removes one Coleman-Liau finding.
  - The revised article has 13 findings under the explicit all-rule runner: six heading, three readability, two negation, and two generic-signposting findings. The original article's nine findings are unchanged.

## Corpus review

- The final frozen-build comparison covered 4,624 human documents containing 4,404,775 words, plus 1,900 suspected/generated AI documents containing 1,761,719 words, with zero runtime failures.
  - Human selections comprise business, literary, Python proposals, MDN, and science prose. These are selected partitions of the larger local collection.
  - The candidate added four human detections and six suspected/generated AI detections, with zero removed detections. Forty human and two AI findings received corrected positions.
  - All ten additional detections were read in their original surrounding prose. Position-only changes were separated by matching rule and message before counting new detections.
- Four human additions are contextual false positives under an ordinary prose review.
  - `pg-growth.md:174`: "The narrow focus" follows a concrete explanation of optimizing speed or memory.
  - `pg-marginal.md:272`: "a narrow focus" contrasts specialization with working across fields.
  - Gutenberg's `gb-52190-ecce-homo-complete-works-volume-seventee-p11.md:3`: "a very limited choice" describes the author's suitability for different climates.
  - `pep-0416.md:18`: "a limited scope" describes a hypothetical security sandbox.
- One AI-suspected addition is a disputed stylistic catch: `devto-3775375.md:59`, "the narrow implementations compound", summarizes earlier examples of quote generation, order exceptions, and supplier drafts. The following sentence explains the capacity benefit.
- The other five additions need contextual interpretation and count as false positives for this review.
  - `devto-3750746.md:19`: "a narrower problem" introduces a concrete file-rotation question in the next blockquote.
  - `devto-3787077.md:27`: "my limited understanding" is personal self-deprecation.
  - `devto-3787353.md:11`: "a narrower question" introduces an explicit reporting question immediately afterward.
  - `devto-3788392.md:82`: "a narrower scope" describes a maintainer's possible preference.
  - `claude-haiku-b0-5.md:13`: "a limited view" introduces a comparison of electromagnetic and gravitational-wave observations.
- The detector examines the attached restriction phrase and its local definition. These contextual cases remain reportable under the requested broader behavior; the measured new detections include these precision costs.

## Remaining article candidates

- The following excerpts require further pattern work beyond the implemented restriction expansion.
  - "Implementation time follows the scope."
  - "The shared platform core is both the advantage and the limit."
  - "That flexibility carries a management cost."
  - "The business models are linked but distinct."
  - "A registered player is only the start."
  - "The simplest picture is a chain: ..."
  - "The strongest supplier choice fits the business you must operate, not the one in the sales pitch."

## Parser behavior and dependencies

- The installed Markdown parser decodes `&#x1f600;` to a single BMP character. The mapper uses the public parser for numeric values so its source spans follow the same displayed text as textlint.
- `parse-entities` supplies entity positions; `diff` aligns remaining text differences. Both new dependencies were checked for runtime compatibility, upstream activity, and published advisories before inclusion.
- This change preserves the parser's displayed text. A parser upgrade requires rerunning the character contracts, including numeric references beside literal Unicode characters.
