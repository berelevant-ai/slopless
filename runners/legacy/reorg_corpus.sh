#!/usr/bin/env bash
# Migrate legacy corpus dirs into the human/ ai-generated/ ai-suspected/ taxonomy.
# Each source dir carries its own LICENSE.md, which moves with it. Idempotent-ish:
# skips a move if the source is gone.
set -uo pipefail
cd "$(dirname "$0")/../../datasets/corpus" || exit 1

mv_if() { [ -d "$1" ] && { mkdir -p "$(dirname "$2")"; mv "$1" "$2" && echo "moved $1 -> $2"; }; }

mkdir -p human/reference human/literary human/gov human/tech human/business
mkdir -p ai-generated/business ai-suspected/tech

mv_if wikipedia            human/reference/wikipedia
mv_if gutenberg            human/literary/gutenberg
mv_if gov-health           human/gov/gov-health
mv_if tech-human/peps      human/tech/peps
mv_if tech-human/mdn       human/tech/mdn
mv_if tech-human/rfcs      human/tech/rfcs
mv_if tech-vc/paulgraham   human/business/paulgraham
mv_if tech-vc/a16z         human/business/a16z
mv_if ai-slop/devto        ai-suspected/tech/devto
mv_if ai-slop/synthetic    ai-generated/business/synthetic-claude

rmdir tech-human tech-vc ai-slop 2>/dev/null

echo "--- tree ---"
find . -maxdepth 3 -type d | sort
