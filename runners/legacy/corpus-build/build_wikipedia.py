#!/usr/bin/env python3
"""Split WikiText-103-raw into one clean Markdown file per article.

WikiText-103-raw (Merity et al., 2016; CC BY-SA, from verified Good/Featured
Wikipedia articles, pre-2020) stores all articles in one stream, tokenized
(spaces around punctuation, ` @-@ ` markers, space-separated `= =` headers).
A level-1 header ( = Title = ) starts a new article; ( = = Section = = ) marks
sections. We de-tokenize back to natural prose and write one Markdown file per
article.

Usage: build_wikipedia.py <wiki.train.raw> <out_dir> [cap]
"""
import re
import sys
from pathlib import Path

# A header line, after stripping, looks like `= Title =` or `= = Section = =`.
HEADER = re.compile(r"^(=(?: =)*)\s+(.*?)\s+(=(?: =)*)$")


def detok(line: str) -> str:
    """Reverse WikiText tokenization into natural prose."""
    line = line.replace(" @-@ ", "-").replace(" @,@ ", ",").replace(" @.@ ", ".")
    line = re.sub(r"\s+([.,;:!?%])", r"\1", line)      # space before punctuation
    line = re.sub(r"\(\s+", "(", line)                  # ( foo -> (foo
    line = re.sub(r"\s+\)", ")", line)                  # foo ) -> foo)
    line = re.sub(r"\s+'(s|re|ve|ll|d|m)\b", r"'\1", line)  # game 's -> game's
    line = re.sub(r"\s+n't\b", "n't", line)             # do n't -> don't
    line = re.sub(r"\s{2,}", " ", line)
    return line.strip()


def slug(title: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return (s or "untitled")[:40]


def flush(out_dir: Path, idx: int, title: str, lines: list[str]) -> bool:
    body = "\n".join(lines).strip()
    if len(body.split()) < 200:  # skip stubs
        return False
    path = out_dir / f"wiki-{idx:05d}-{slug(title)}.md"
    path.write_text(f"# {title}\n\n{body}\n", encoding="utf-8")
    return True


def main() -> None:
    src = Path(sys.argv[1])
    out_dir = Path(sys.argv[2])
    cap = int(sys.argv[3]) if len(sys.argv) > 3 else 4000
    out_dir.mkdir(parents=True, exist_ok=True)

    written = 0
    title: str | None = None
    lines: list[str] = []
    with src.open(encoding="utf-8") as fh:
        for raw in fh:
            line = detok(raw)
            if not line:
                lines.append("")
                continue
            m = HEADER.match(line)
            if m and m.group(1) == m.group(3):
                level = m.group(1).count("=")
                if level == 1:  # new article
                    if title is not None and flush(out_dir, written + 1, title, lines):
                        written += 1
                        if written >= cap:
                            title = None
                            break
                    title = m.group(2)
                    lines = []
                else:  # section heading
                    lines.append("#" * level + " " + m.group(2))
            else:
                lines.append(line)
        if title is not None and written < cap:
            if flush(out_dir, written + 1, title, lines):
                written += 1
    print(f"wrote {written} article files to {out_dir}")


if __name__ == "__main__":
    main()
