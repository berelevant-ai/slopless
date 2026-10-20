# Noisy Or Source-Only Candidates

These sources are useful for future expansion but should not become default Slopless rules without scoping, density checks, or profile-level opt-in.

## Broad AI Vocabulary

Sources:

- `tbhb/vale-ai-tells`
- `ammil-industries/vale-signs-of-ai-writing`
- `@veldica/prose-linter`

Examples:

- `delve`
- `underscore`
- `tapestry`
- `realm`
- `intricate`
- `meticulous`
- `pivotal`
- `robust`
- `seamless`
- `elevate`
- `leverage`
- `harness`
- `unlock`
- `empower`
- `foster`
- `navigate`
- `streamline`
- `dynamic`
- `holistic`
- `nuanced`
- `multifaceted`
- `comprehensive`
- `crucial`
- `essential`
- `vital`
- `noteworthy`
- `compelling`
- `innovative`
- `cutting-edge`
- `game-changing`
- `actionable`
- `impactful`
- `meaningful`

Use:

- Source-only or density-based candidate.
- Do not flag single words by default.
- Higher signal when combined with generic claims, no numbers, formal transition openers, or stock phrase frames.

False-positive risk:

- High. Many words are valid in technical, product, or academic prose.

## Weak Words, Hedges, Fillers, And Weasels

Sources:

- `retext-intensify`
- `words/hedges`
- `words/fillers`
- `words/weasels`
- RedPen `WeakExpression`

Examples:

- Hedges: `perhaps`, `possibly`, `likely`, `seems`, `appears`, `sort of`, `kind of`, `in my opinion`, `overall`, `usually`.
- Fillers: `actually`, `basically`, `clearly`, `completely`, `literally`, `obviously`, `simply`, `ultimately`, `very`.
- Weasels: `a lot`, `arguably`, `effective`, `efficient`, `huge`, `interestingly`, `just`, `many`, `various`, `vast`, `works`.

Use:

- Prefer stacking or density rules over single-token rules.
- Candidate overlaps with Slopless `words:hedge-stacking`.
- Use as feature inputs for semantic thinness or weak-claim detection.

False-positive risk:

- High for individual tokens.
- Medium for repeated hedges in short spans.

## Inclusive Language And Terminology

Sources:

- `alex` / `retext-equality`
- `get-woke/woke`
- Red Hat `ConsciousLanguage`
- Splunk `BiasFreeLanguage`
- `textlint-rule-terminology`

Examples:

- Inclusive: `blacklist`, `whitelist`, `master/slave`, `grandfathered`, `man-hours`, `sanity`, `dummy`, `guys`, `whitebox`, `blackbox`.
- Terminology: `Javascript -> JavaScript`, `Golang -> Go`, `Nodejs -> Node.js`, `front-end -> frontend`, `repo -> repository`, `Internet -> internet`.

Use:

- Source-only for core Slopless unless a future `term-policy` profile wants these defaults.
- Strong fit for organization-specific policy rules.
- Existing overlap: `term-policy:recommended-terms`, `term-policy:required-terms`.

False-positive risk:

- Medium to high.
- Some terms are technical terms, branch names, quoted text, package names, or historical references.

## Passive Voice

Sources:

- LanguageTool English `PASSIVE_VOICE_SIMPLE`.
- Red Hat `PassiveVoice`.
- Splunk `PassiveVoice`.
- `agent-style` RULE-02.
- `ammil-industries/vale-signs-of-ai-writing` `Passive`.

Use:

- Warning-only.
- Prefer the narrower `be/have been + participle + by-agent` shape first.
- Do not flag scientific methods, unknown-agent incident prose, stable terms, or accepted legal/technical formulas.

False-positive risk:

- High.
- LanguageTool's own style rules contain many negative examples and exceptions. A simple regex would over-report.

## Heading Capitalization And Style-Guide Preferences

Sources:

- Red Hat Vale.
- Splunk Vale.
- GitHub Docs content linter.
- `agent-style` RULE-G.

Examples:

- Heading title case.
- Heading sentence case.
- Heading punctuation.
- Strong emphasis style.
- Acronym punctuation.

Use:

- Source-only unless Slopless gets profiles for project style.
- Mutually contradictory across organizations.

False-positive risk:

- High if made global. Style conventions differ.

## Device-Agnostic And Directional UI Language

Sources:

- Splunk `DeviceAgnosticism`.
- Splunk `DirectionalLanguage`.
- Red Hat terminology suggestions.

Examples:

- `click -> select`
- `tap -> select`
- `press -> select`
- `above`
- `below`
- `left`
- `right`

Use:

- Good profile-specific accessibility candidate.
- Not a general prose slop rule.

False-positive risk:

- High. UI docs sometimes must name mouse, keyboard, or physical directions.

## Japanese-Specific AI Writing Rules

Source:

- `@textlint-ja/textlint-rule-preset-ai-writing`

Examples:

- Japanese hype expressions: `革命的な`, `ゲームチェンジャー`, `究極の`, `最先端の`, `魔法のように`, `パラダイムシフト`.
- Japanese predicate-colon before a block node.
- Japanese redundant expressions and term consistency checks.

Use:

- Source-only for current English Slopless.
- Can inspire English analogues for bold lead-ins, emoji lead-ins, and colon-to-block structures.

False-positive risk:

- Not applicable to current English default rules.

## Domain-Specific Documentation Linters

Sources:

- GitHub Docs content linter.
- Red Hat AsciiDoc rules.
- Splunk product terminology.

Examples:

- GitHub-specific Liquid syntax.
- GitHub frontmatter schemas.
- Red Hat AsciiDoc callout blocks.
- Splunk product names and `.conf` formatting.

Use:

- Source-only unless Slopless adds Markdown/Docs profiles.
- Portable ideas: table integrity, merge conflict markers, TODO placeholders, link punctuation, alt-text quality.

False-positive risk:

- Low for portable raw artifacts.
- High for brand-specific or content-model-specific rules.
