#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
import sys
import tomllib
import tempfile
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / ".plans/2026-05-19-173909-fresh-corpus-actionability.md.manifest.toml"
PROHIBITED_PHRASES = ROOT / "src/rules/phrases/data/prohibited-phrases.json"


def fail(message: str) -> None:
    print(f"FAIL fresh-corpus-actionability: {message}")
    sys.exit(1)


def case_blocks(path: Path, separator: str) -> list[str]:
    blocks: list[str] = []
    current: list[str] = []

    for raw_line in path.read_text().splitlines():
        if raw_line.strip() == separator:
            block = "\n".join(current).strip()
            if block:
                blocks.append(block)
            current = []
            continue

        current.append(raw_line)

    block = "\n".join(current).strip()
    if block:
        blocks.append(block)

    return blocks


def normalized_rule_id(rule_id: str) -> str:
    if rule_id.startswith("slopless/"):
        return rule_id.removeprefix("slopless/")
    if ":" in rule_id:
        return rule_id.split(":", 1)[1]
    return rule_id


def run_behavior(paths: list[Path]) -> list[dict[str, object]]:
    command = ["scripts/behavior-replay.sh", *[str(path.relative_to(ROOT)) for path in paths]]
    result = subprocess.run(
        command,
        cwd=ROOT,
        check=False,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    if result.returncode != 0:
        fail(f"behavior replay failed:\n{result.stderr}\n{result.stdout}")

    return json.loads(result.stdout)


def direct_count(
    results: list[dict[str, object]],
    path: Path,
    direct_rules: set[str],
) -> int:
    expected = path.resolve()
    count = 0

    for result in results:
        reported = result.get("filePath")
        if not isinstance(reported, str) or (ROOT / reported).resolve() != expected:
            continue

        messages = result.get("messages")
        if not isinstance(messages, list):
            continue

        for message in messages:
            if not isinstance(message, dict):
                continue
            rule_id = message.get("ruleId")
            if isinstance(rule_id, str) and normalized_rule_id(rule_id) in direct_rules:
                count += 1

    return count


def main(work: Path) -> None:
    manifest = tomllib.loads(MANIFEST.read_text())
    separator = manifest["case_separator"]

    for row in manifest["required_file"]:
        path = ROOT / row["path"]
        if not path.exists():
            fail(f"missing required file: {row['path']}")

    phrases = set(json.loads(PROHIBITED_PHRASES.read_text()))
    for row in manifest["required_phrase"]:
        phrase = row["phrase"]
        if phrase not in phrases:
            fail(f"missing prohibited phrase: {phrase}")

    family_rows = manifest["family_contract"]
    paths: list[Path] = []
    prepared: dict[str, tuple[Path, Path]] = {}
    for row in family_rows:
        dataset = ROOT / row["dataset"]
        metadata = json.loads(dataset.with_suffix(".labels.json").read_text())
        encoded = dataset.read_text().encode("utf-16-le")
        bucket_paths = []
        for bucket, expected in (("hits", True), ("no-hits", False)):
            path = work / bucket / f"{row['name']}.md"
            path.parent.mkdir(parents=True, exist_ok=True)
            texts = [encoded[label["start"] * 2:label["end"] * 2].decode("utf-16-le").strip() for label in metadata["labels"] if label["expected"] is expected]
            path.write_text(f"\n\n{separator}\n\n".join(texts) + "\n")
            if row["name"] == "term-policy":
                shutil.copyfile(ROOT / "behavior/fixtures/datasets/configs/term-policy.json", path.with_suffix(".term-policy.textlintrc.json"))
            bucket_paths.append(path)
        hit_path, no_hit_path = bucket_paths
        prepared[row["name"]] = (hit_path, no_hit_path)
        paths.extend([hit_path, no_hit_path])

        hit_count = len(case_blocks(hit_path, separator))
        no_hit_count = len(case_blocks(no_hit_path, separator))
        if hit_count < row["min_hit_cases"]:
            fail(f"{row['name']} hit cases {hit_count} below {row['min_hit_cases']}")
        if no_hit_count < row["min_no_hit_cases"]:
            fail(
                f"{row['name']} no-hit cases {no_hit_count} below {row['min_no_hit_cases']}"
            )

    results = run_behavior(paths)

    for row in family_rows:
        direct_rules = set(row["direct_rules"])
        hit_path, no_hit_path = prepared[row["name"]]
        hit_direct = direct_count(results, hit_path, direct_rules)
        no_hit_direct = direct_count(results, no_hit_path, direct_rules)

        if hit_direct < row["min_direct_hit_findings"]:
            fail(
                f"{row['name']} direct hit findings {hit_direct} below "
                f"{row['min_direct_hit_findings']}"
            )
        if no_hit_direct > row["max_direct_no_hit_findings"]:
            fail(
                f"{row['name']} direct no-hit findings {no_hit_direct} above "
                f"{row['max_direct_no_hit_findings']}"
            )

    print("PASS fresh-corpus-actionability")


if __name__ == "__main__":
    with tempfile.TemporaryDirectory(prefix="paired-actionability-", dir=ROOT / ".fixture3") as directory:
        main(Path(directory))
