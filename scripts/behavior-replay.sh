#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEXTLINT="$ROOT/node_modules/.bin/textlint"

mkdir -p "$ROOT/.fixture3"
TMP_DIR="$(mktemp -d "$ROOT/.fixture3/replay.XXXXXX")"
trap 'rm -rf "$TMP_DIR"' EXIT
RULES_ROOT="$TMP_DIR/dist/rules"

cd "$ROOT"
"$ROOT/node_modules/.bin/tsc" -p tsconfig.json --outDir "$TMP_DIR/dist"

if [ "$#" -eq 0 ]; then
  mapfile -t FILES < <(find behavior/fixtures/textlint-rules/cases behavior/fixtures/textlint-rules/corpus -name "*.md" | sort)
else
  FILES=("$@")
fi

CONFIG_ARGS=(--no-textlintrc)
RULE_ARGS=(
  --rulesdir "$RULES_ROOT/academic-slop"
  --rulesdir "$RULES_ROOT/metrics"
  --rulesdir "$RULES_ROOT/narrative-slop"
  --rulesdir "$RULES_ROOT/orthography"
  --rulesdir "$RULES_ROOT/words"
  --rulesdir "$RULES_ROOT/phrases"
  --rulesdir "$RULES_ROOT/semantic-thinness"
  --rulesdir "$RULES_ROOT/term-policy"
  --rulesdir "$RULES_ROOT/syntactic-patterns/authority"
  --rulesdir "$RULES_ROOT/syntactic-patterns/closers"
  --rulesdir "$RULES_ROOT/syntactic-patterns/contrast"
  --rulesdir "$RULES_ROOT/syntactic-patterns/generalization"
  --rulesdir "$RULES_ROOT/syntactic-patterns/lead-ins"
  --rulesdir "$RULES_ROOT/syntactic-patterns/llm-artifacts"
  --rulesdir "$RULES_ROOT/syntactic-patterns/repetition"
)
run_textlint_json() {
  local output="$1"
  shift

  set +e
  "$TEXTLINT" "$@" --format json >"$output"
  local status="$?"
  set -e

  if [ "$status" -ne 0 ] && [ "$status" -ne 1 ]; then
    cat "$output" >&2
    return "$status"
  fi
}

JSON_OUTPUTS=()
DEFAULT_OUTPUT="$TMP_DIR/default.json"
run_textlint_json "$DEFAULT_OUTPUT" "${CONFIG_ARGS[@]}" "${RULE_ARGS[@]}" "${FILES[@]}"
JSON_OUTPUTS+=("$DEFAULT_OUTPUT")

safe_output_name() {
  local path="$1"
  path="${path//\//__}"
  path="${path//[^A-Za-z0-9_.-]/_}"
  printf '%s' "$path"
}

for FILE in "${FILES[@]}"; do
  if [ -f "$(dirname "$FILE")/.textlintrc.json" ]; then
    FIXTURE_CONFIG="$(dirname "$FILE")/.textlintrc.json"
    FAMILY="$(basename "$(dirname "$FILE")")"
    CONFIG_OUTPUT="$TMP_DIR/config-$FAMILY-$(safe_output_name "$FILE").json"
    run_textlint_json \
      "$CONFIG_OUTPUT" \
      --config "$FIXTURE_CONFIG" \
      --rules-base-directory "$RULES_ROOT/$FAMILY" \
      "$FILE"
    JSON_OUTPUTS+=("$CONFIG_OUTPUT")
  fi

  FILE_BASE="${FILE%.md}"
  for FIXTURE_CONFIG in "$FILE_BASE".*.textlintrc.json; do
    if [ ! -f "$FIXTURE_CONFIG" ]; then
      continue
    fi

    FAMILY="${FIXTURE_CONFIG#"$FILE_BASE".}"
    FAMILY="${FAMILY%.textlintrc.json}"
    CONFIG_OUTPUT="$TMP_DIR/config-$FAMILY-$(safe_output_name "$FILE").json"
    run_textlint_json \
      "$CONFIG_OUTPUT" \
      --config "$FIXTURE_CONFIG" \
      --rules-base-directory "$RULES_ROOT/$FAMILY" \
      "$FILE"
    JSON_OUTPUTS+=("$CONFIG_OUTPUT")
  done
done

jq -s --arg root "$ROOT/" 'flatten
  | map(.filePath |= if startswith($root) then .[($root | length):] else . end)
  | group_by(.filePath)
  | map(.[0] + {
      messages: (
        map(.messages // [])
        | add
        | sort_by(.line, .column, (.range[0] // null), (.range[1] // null), .ruleId, .message)
      )
    })
  | sort_by((.filePath | split("/")[-1]), .filePath)' "${JSON_OUTPUTS[@]}"
