#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

node scripts/verify-cli-version.mjs
developer-helpers/scripts/verify-developer-helpers-boundary.py
node runners/datasets.mjs
node scripts/datasets-contract.mjs behavior/fixtures/datasets/contract.json
developer-helpers/scripts/verify-ai-slop-gaps.py
developer-helpers/scripts/verify-artifact-placeholders-and-puffery.py
developer-helpers/scripts/verify-wordiness-and-narrative-expansion.py
developer-helpers/scripts/verify-summary-vague-subjective-expansion.py
developer-helpers/scripts/verify-source-pattern-expansion.py
developer-helpers/scripts/verify-sunstone-slop-rule-expansion.py
developer-helpers/scripts/verify-emotion-substance-and-density-expansion.py
developer-helpers/scripts/verify-negative-slop.py
developer-helpers/scripts/verify-new-density-checks.py
developer-helpers/scripts/verify-adversarial-widening.py
developer-helpers/scripts/verify-maximal-widening.py
developer-helpers/scripts/verify-fixture-corpus-coverage.py
developer-helpers/scripts/verify-rules-reporting-architecture.py
developer-helpers/scripts/verify-corpus-preserve.py
developer-helpers/scripts/verify-split-slopless.py
developer-helpers/scripts/verify-fresh-slop-corpus.py
developer-helpers/scripts/verify-fresh-corpus-actionability.py
