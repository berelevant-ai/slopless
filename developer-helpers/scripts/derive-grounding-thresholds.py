#!/usr/bin/env python3
"""Derive src/rules/semantic-thinness/data/grounding-thresholds.json.

Implements the derivation specified in GitHub issue #8 ("Dataset: derive
grounding-thresholds.json from Lancaster Sensorimotor Norms"):

1. Read `Lancaster_sensorimotor_norms_for_39707_words.csv`.
2. For each word, compute three derived scores from the 11 sensorimotor
   dimension means:
   - `sensorimotor`: max across all 11 dims
   - `visual`: `Visual.mean`
   - `action`: max of Foot_leg, Hand_arm, Head, Mouth, Torso means
3. Bucket each score: low (< 2), mid (2-3.5), high (> 3.5).
4. Drop words with `Percent_known.perceptual < 0.3`.
5. Emit compact JSON keyed by word, with a `_meta` header carrying the
   CC-BY 4.0 attribution and source URLs.

Source data (not shipped in this repo; download it first):
- Lancaster Sensorimotor Norms, Lynott, Connell, Brysbaert, Bentley &
  Dalton (2020), "The Lancaster Sensorimotor Norms: multidimensional
  measures of perceptual and action strength for 40,000 English words",
  Behavior Research Methods. License: CC-BY 4.0.
- Download: https://osf.io/download/48wsc/
- Project page: https://www.lancaster.ac.uk/psychology/lsnorms/

Usage:
    python3 developer-helpers/scripts/derive-grounding-thresholds.py \
        --input /path/to/Lancaster_sensorimotor_norms_for_39707_words.csv

The script prints a JSON stats summary (row counts, filter counts,
cross-checks against the CSV's own Max_strength.sensorimotor column)
to stdout so the numbers can be recorded in the companion
`grounding-thresholds.source.md`.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_OUTPUT = (
    ROOT
    / "src/rules/semantic-thinness/data/grounding-thresholds.json"
)

PERCEPTUAL_DIMS = [
    "Auditory",
    "Gustatory",
    "Haptic",
    "Interoceptive",
    "Olfactory",
    "Visual",
]
ACTION_DIMS = ["Foot_leg", "Hand_arm", "Head", "Mouth", "Torso"]
ALL_DIMS = PERCEPTUAL_DIMS + ACTION_DIMS

MIN_PERCENT_KNOWN = 0.3


def bucket(value: float) -> str:
    if value < 2:
        return "low"
    if value <= 3.5:
        return "mid"
    return "high"


def parse_float(raw: str | None) -> float | None:
    if raw is None or raw.strip() == "":
        return None
    try:
        return float(raw)
    except ValueError:
        return None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--input",
        required=True,
        help="Path to Lancaster_sensorimotor_norms_for_39707_words.csv",
    )
    parser.add_argument(
        "--output",
        default=str(DEFAULT_OUTPUT),
        help="Where to write grounding-thresholds.json",
    )
    args = parser.parse_args()

    input_path = Path(args.input)
    raw_bytes = input_path.read_bytes()
    input_md5 = hashlib.md5(raw_bytes).hexdigest()

    stats = {
        "input_file": input_path.name,
        "input_bytes": len(raw_bytes),
        "input_md5": input_md5,
        "rows_total": 0,
        "rows_dropped_low_percent_known": 0,
        "rows_dropped_missing_values": 0,
        "duplicate_words": 0,
        "casefold_collisions": 0,
        "max_strength_crosscheck_mismatches": 0,
        "max_strength_crosscheck_max_abs_diff": 0.0,
        "words_written": 0,
    }

    entries: dict[str, dict[str, str]] = {}
    seen_casefold: dict[str, str] = {}

    with input_path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            stats["rows_total"] += 1
            word = (row.get("Word") or "").strip()
            if not word:
                stats["rows_dropped_missing_values"] += 1
                continue

            percent_known = parse_float(row.get("Percent_known.perceptual"))
            if percent_known is None:
                stats["rows_dropped_missing_values"] += 1
                continue
            if percent_known < MIN_PERCENT_KNOWN:
                stats["rows_dropped_low_percent_known"] += 1
                continue

            means: dict[str, float] = {}
            missing = False
            for dim in ALL_DIMS:
                value = parse_float(row.get(f"{dim}.mean"))
                if value is None:
                    missing = True
                    break
                means[dim] = value
            if missing:
                stats["rows_dropped_missing_values"] += 1
                continue

            sensorimotor = max(means[dim] for dim in ALL_DIMS)
            visual = means["Visual"]
            action = max(means[dim] for dim in ACTION_DIMS)

            # Cross-check the computed sensorimotor max against the
            # column the dataset itself ships for the same quantity.
            published_max = parse_float(row.get("Max_strength.sensorimotor"))
            if published_max is not None:
                diff = abs(published_max - sensorimotor)
                stats["max_strength_crosscheck_max_abs_diff"] = max(
                    stats["max_strength_crosscheck_max_abs_diff"], diff
                )
                if diff > 0.01:
                    stats["max_strength_crosscheck_mismatches"] += 1

            if word in entries:
                stats["duplicate_words"] += 1
                continue
            folded = word.casefold()
            if folded in seen_casefold and seen_casefold[folded] != word:
                stats["casefold_collisions"] += 1
            seen_casefold.setdefault(folded, word)

            entries[word] = {
                "sensorimotor": bucket(sensorimotor),
                "visual": bucket(visual),
                "action": bucket(action),
            }

    stats["words_written"] = len(entries)

    meta = {
        "source": (
            "Lancaster Sensorimotor Norms (Lynott, Connell, Brysbaert, "
            "Bentley & Dalton, 2020)"
        ),
        "sourceUrl": "https://www.lancaster.ac.uk/psychology/lsnorms/",
        "downloadUrl": "https://osf.io/download/48wsc/",
        "license": "CC-BY 4.0",
        "attribution": (
            "Derived from the Lancaster Sensorimotor Norms, Lynott et al. "
            "(2020), licensed CC-BY 4.0. See "
            "grounding-thresholds.source.md for the derivation."
        ),
        "derivation": (
            "sensorimotor = max of 11 dimension means; visual = "
            "Visual.mean; action = max of Foot_leg, Hand_arm, Head, "
            "Mouth, Torso means; buckets low <2, mid 2-3.5, high >3.5; "
            "words with Percent_known.perceptual < 0.3 dropped."
        ),
        "words": len(entries),
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as handle:
        handle.write("{\n")
        handle.write(
            '"_meta":'
            + json.dumps(meta, ensure_ascii=False, separators=(",", ":"))
            + ",\n"
        )
        items = list(entries.items())
        for index, (word, scores) in enumerate(items):
            suffix = ",\n" if index < len(items) - 1 else "\n"
            handle.write(
                json.dumps(word, ensure_ascii=False)
                + ":"
                + json.dumps(scores, ensure_ascii=False, separators=(",", ":"))
                + suffix
            )
        handle.write("}\n")

    stats["output_file"] = str(output_path)
    stats["output_bytes"] = output_path.stat().st_size
    json.dump(stats, sys.stdout, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
