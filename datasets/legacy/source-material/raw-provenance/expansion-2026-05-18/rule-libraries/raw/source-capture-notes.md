# Rule Library Source Capture Notes

Captured on 2026-05-18 from branch `development`.

Temporary inspection root:

- `/tmp/slopless-rule-library-sources/repos`
- `/tmp/slopless-rule-library-sources/npm`

No product code, fixtures, package metadata, or golden output were edited.

## Source Snapshots

- `tbhb/vale-ai-tells`
  - URL: https://github.com/tbhb/vale-ai-tells
  - Snapshot: `1ea432cbc644ca9b0da8a46ecd6d2060c9a5ad65`, 2026-05-13, `chore: release v1.8.0`
  - License: MIT.
  - Captured files inspected: `README.md`, `LICENSE`, `styles/ai-tells/*.yml`, `styles/ai-tells-commits/*.yml`, `styles/ai-tells-experimental/*.yml`, `styles/config/scripts/*.tengo`, `test-document.md`, `test-false-positives.md`, `test-commit-messages.md`.
  - Useful rule families: AI compound phrases, affirmative formulas, conclusion markers, contrastive formulas, defensive hedges, false balance, filler phrases, formal transitions, metacommentary, overused vocabulary, structural announcements, sycophancy markers, vague attributions, tricolon density, commit-message AI tells, sentence-start entropy, transition repetition.

- `ammil-industries/vale-signs-of-ai-writing`
  - URL: https://github.com/ammil-industries/vale-signs-of-ai-writing
  - Snapshot: `305467bafd0e491c4c00e0196ef551e64eefc9c4`, 2025-11-21, `Attempt to fix the release creation`
  - License: CC BY-SA 4.0.
  - Captured files inspected: `README.md`, `LICENSE`, `styles/signs-of-ai-writing/*.yml`, `fixtures/*/test.md`.
  - Useful rule families: ChatGPT artifacts, citation artifacts, UTM parameters, knowledge cutoff references, placeholders, chatbot communication, colon overuse, list sequencing, passive voice, symbolic language, formal transitions, AI vocabulary.

- `@textlint-ja/textlint-rule-preset-ai-writing`
  - URL: https://github.com/textlint-ja/textlint-rule-preset-ai-writing
  - NPM: https://www.npmjs.com/package/@textlint-ja/textlint-rule-preset-ai-writing
  - Snapshot: `45bb6485062b96a8578c5fa6ae37a41de01d9b80`, 2026-05-14, `chore: release v1.7.0 (#37)`
  - NPM version: 1.7.0, modified 2026-05-13.
  - License: MIT.
  - Captured files inspected: `src/rules/*.ts`, `test/rules/*.test.ts`, `docs/tech-writing-guidelines.md`, README.
  - Useful rule families: bold-list lead-ins, emoji list lead-ins, emoji plus bold emphasis, bold info prefixes, bold headings, Japanese predicate-colon before block nodes, Japanese hype words, technical writing redundancy and specificity guidance.

- LanguageTool English rules
  - URL: https://github.com/languagetool-org/languagetool
  - Snapshot: `ecf02dda3634003ee238e09b65a21d371826316d`, 2026-05-18, `[ca] add SimpleReplaceAnglicismTest`
  - License: LGPL 2.1.
  - Captured files inspected: `languagetool-language-modules/en/src/main/resources/org/languagetool/rules/en/grammar.xml`, `style.xml`, `wordiness.txt`, `redundancies.txt`, English Java rule classes.
  - Source size: `grammar.xml` 142,323 lines, `style.xml` 12,556 lines, `wordiness.txt` 1,061 lines, `redundancies.txt` 866 lines.
  - Useful rule families: passive voice with many exceptions and examples, word repetition, wordiness replacements, redundancy replacements, plain-English replacements, long-sentence rule, repeated sentence starts, underscore-in-word, product style terms.

- RedPen English validators
  - URL: https://github.com/redpen-cc/redpen
  - Snapshot: `875029898b36d9dd4a053a0f925cf7c1a726c6af`, 2021-03-14, `Merge pull request #891 from Taher-Ghaleb/master`
  - License: Apache-2.0.
  - Captured files inspected: `redpen-cli/sample/conf/redpen-conf-en.xml`, `redpen-core/src/main/java/cc/redpen/validator/**`, `default-resources/*-en.dat`.
  - Useful validators: `SentenceLength`, `CommaNumber`, `HeaderLength`, `SymbolWithSpace`, `SectionLength`, `Contraction`, `SuccessiveWord`, `EndOfSentence`, `FrequentSentenceStart`, `UnexpandedAcronym`, `WeakExpression`, `ParagraphNumber`, `ParenthesizedSentence`, `GappedSection`, `SectionLevel`, `ListLevel`, `InvalidSymbol`, `Spelling`, `WordFrequency`, `Hyphenation`, `NumberFormat`.
  - English weak-expression data includes `big`, `huge`, `very`, `lots`, `about`, `thing`, `things`, `some`, `a lot`, `as a matter of fact`, `as to whether`, `at the end of the day`, `absolutely essential`, `advance forward`, `almost unique`, `alternative choice`.

- `retext-simplify`
  - URL: https://github.com/retextjs/retext-simplify
  - NPM: https://www.npmjs.com/package/retext-simplify
  - NPM version: 8.0.0, modified 2023-09-10.
  - License: MIT.
  - Captured files inspected: `lib/index.js`, `lib/patterns.js`, README.
  - Useful data: direct replacement pairs such as `a number of -> many|some`, `accede to -> agree to|allow`, `accomplish -> carry out|do`, `additional -> added|extra|more|other`, `at this time -> now`, `because of the fact that -> because`, `by means of -> by|with`, `close proximity -> near`.

- `retext-intensify`, `words/hedges`, `words/fillers`, `words/weasels`
  - URLs:
    - https://github.com/retextjs/retext-intensify
    - https://github.com/words/hedges
    - https://github.com/words/fillers
    - https://github.com/words/weasels
  - NPM versions: `retext-intensify` 7.0.0, `hedges` 2.0.1, `fillers` 2.0.1, `weasels` 2.0.1.
  - License: MIT for all.
  - Captured files inspected: `lib/index.js`, `index.js` phrase arrays.
  - Useful data: category-labeled weak words. Hedges include `perhaps`, `possibly`, `likely`, `seems`, `appears`, `sort of`, `kind of`, `in my opinion`. Fillers include `actually`, `basically`, `clearly`, `completely`, `literally`, `obviously`, `simply`, `ultimately`, `very`. Weasels include `a lot`, `arguably`, `clearly`, `effective`, `efficient`, `huge`, `interesting`, `just`, `many`, `various`, `vast`, `works`.

- `alex` and `retext-equality`
  - URLs:
    - https://github.com/get-alex/alex
    - https://github.com/retextjs/retext-equality
  - NPM versions: `alex` 11.0.1, `retext-equality` 7.1.0.
  - License: MIT.
  - Captured files inspected: `alex` README, `retext-equality` README, `lib/patterns-en.js`.
  - Useful data: inclusive-language replacements and categories. Examples inspected include `obviously`, gendered role names, disability terms, `master/slave`, `blacklist/whitelist`.

- Red Hat Vale style guide
  - URL: https://github.com/redhat-documentation/vale-at-red-hat
  - Snapshot: `0ce46e31b73231a613f9b1c5261b371d99ddeaf8`, 2026-04-07, `Update comment for wordlist.txt format clarification`
  - License: MIT.
  - Captured files inspected: `.vale/styles/RedHat/*.yml`, docs modules for rule references.
  - Useful rule families: do-not-use terms, simple words, conscious language, passive voice, product-centric writing, self-referential text, sentence length, user-replaced values, `using` after noun, terminology errors and suggestions.

- Splunk Vale style guide
  - URL: https://github.com/splunk/vale-splunk-style-guide
  - Snapshot: `47cc21bf4a73f39fcca4a9a8a5b6b391c3adf4f6`, 2024-08-19, `Update WordList.yml (#120)`
  - License: Apache-2.0.
  - Captured files inspected: `styles/Splunk/*.yml`, README, LICENSE.
  - Useful rule families: bias-free language, don't-use list, device-agnostic language, directional language, exclamation points, future tense, out-of-the-box, passive voice, recommendations, repetition, user focus, first-person pronouns, word list.

- GitHub Docs content linter
  - URLs:
    - https://github.com/github/docs
    - https://docs.github.com/en/contributing/collaborating-on-github-docs/using-the-content-linter
  - Snapshot: `ecb3e3d95e3ff4effab5bf3d9687dab656f9c4ea`, 2026-05-16, `Improve description of cancellation process in workflow documentation (#44242)`
  - License: code MIT, content CC BY 4.0.
  - Captured files inspected: `src/content-linter/lib/linting-rules/*.ts`, `data/reusables/contributing/content-linter-rules.md`, content-linter docs.
  - Useful rule families: Markdown and Liquid-specific deterministic checks, alt text, link text, hardcoded variables, frontmatter schema, old internal links, TODOCS placeholder, deprecated Liquid syntax, table column integrity, stale release-phase terminology.

- `get-woke/woke`
  - URL: https://github.com/get-woke/woke
  - Snapshot: `5d52c1541ab7b5823531dd48144197dda342042e`, 2022-08-14, `docs: fix URL to releases page (#225)`
  - License: MIT.
  - Captured files inspected: `pkg/rule/default.yaml`, docs, README.
  - Useful data: inclusive terms with replacement alternatives and optional explanatory notes. Examples: `whitelist`, `blacklist`, `master-slave`, `slave`, `grandfathered`, `man-hours`, `sanity`, `dummy`, `guys`, `whitebox`, `blackbox`.

- `textlint-rule-terminology`
  - URL: https://github.com/sapegin/textlint-rule-terminology
  - NPM: https://www.npmjs.com/package/textlint-rule-terminology
  - Snapshot: `b866c04bb0cf4477486309c62aacec6929de78f9`, 2025-11-20, `chore: Update deps, enable type checking for tests, lint-staged -> nano-staged`
  - NPM version: 5.2.16, modified 2025-09-29.
  - License: MIT.
  - Captured files inspected: `terms.jsonc`, README, license.
  - Useful data: brand and technology capitalization, abbreviations, and replacement pairs. Examples: `Javascript -> JavaScript`, `Nodejs -> Node.js`, `Golang -> Go`, `front[- ]end -> frontend`, `web[- ]?site -> site`, `in order to -> to`, `repo -> repository`.

- `@veldica/prose-linter`
  - URL: https://github.com/veldica/prose-linter
  - NPM: https://www.npmjs.com/package/@veldica/prose-linter
  - NPM version: 1.1.3, modified 2026-04-27.
  - License: MIT.
  - Captured files inspected from npm tarball: `src/catalog.ts`, `src/index.ts`, `src/engine.ts`, `src/integrity.ts`, README.
  - Useful data: AI markers, document signals, metrics and revision levers. Markers include vocabulary (`delve`, `tapestry`, `realm`, `intricate`, `seamless`, `leverage`), stock phrases, sentence patterns, assistant residue, em dash marker. Document signals include specificity deficit, AI skeleton, paragraph symmetry, repeated starts, bold lead-ins, triads.

- `agent-style`
  - URL: https://github.com/yzhao062/agent-style
  - NPM: https://www.npmjs.com/package/agent-style
  - Snapshot: `74bda6cc647f744da9cad856687903827afeb441`, 2026-04-28, `Release v0.3.5: fix v0.3.4 dead link + harden release process`
  - NPM version: 0.3.5, modified 2026-04-29.
  - License: CC BY 4.0 for rules and content, MIT for enforcement and code.
  - Captured files inspected: `RULES.md`, `docs/rule-pack-compact.md`, `enforcement/*.txt`, `enforcement/proselint-map.md`, README.
  - Useful rule families: 12 canonical technical prose rules and 9 LLM-observed rules. Mechanical candidates: passive voice warning, filler phrase deny list, cliche phrase deny list, jargon substitutions, sentence over 30 words, over-bulleting, em/en dash punctuation, repeated sentence starts, transition opener overuse, summary closers, abbreviation consistency, title case headings, contraction register.

## Inaccessible Or Not Downloaded

- No assigned source was inaccessible.
- Large LanguageTool XML was not copied into the repo because it is too large for a focused source-material capture. The extraction report records the exact upstream path and selected rule families.
- Full GitHub Docs, LanguageTool, and RedPen repositories were not copied into the repo. Sparse clones or npm tarballs were inspected in `/tmp` and summarized here.
