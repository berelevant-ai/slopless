#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d "$ROOT/.fixture3/cli-replay.XXXXXX")"
trap 'rm -rf "$TMP_DIR"' EXIT

mkdir -p "$TMP_DIR/install"
npm pack --pack-destination "$TMP_DIR" --json >"$TMP_DIR/pack.json"
TARBALL="$(jq -r '.[0].filename' "$TMP_DIR/pack.json")"
npm install --prefix "$TMP_DIR/install" "$TMP_DIR/$TARBALL" --silent

set +e
"$TMP_DIR/install/node_modules/.bin/slopless" "$@" >"$TMP_DIR/output.json"
STATUS="$?"
set -e

if [ "$STATUS" -ne 0 ] && [ "$STATUS" -ne 1 ]; then
  cat "$TMP_DIR/output.json" >&2
  exit "$STATUS"
fi

jq --arg root "$ROOT/" '
  map(.filePath |= if startswith($root) then .[($root | length):] else . end)
' "$TMP_DIR/output.json"
