#!/usr/bin/env python3
"""Download public-domain Project Gutenberg books and split them into
~700-word, article-length Markdown chunks (paragraph boundaries preserved).

Texts are US public domain. We cut everything outside the START/END markers,
which removes the Project Gutenberg license and trademark, so the remaining
prose carries no PG references (commercial use OK).

Uses the Gutendex catalog API to find English plain-text books; falls back to a
built-in list of well-known book ids if the API is unreachable.

Usage: build_gutenberg.py <out_dir> [num_books] [max_total_chunks]
"""
import json
import re
import sys
import time
import urllib.request
from pathlib import Path

UA = {"User-Agent": "slopless-research/0.1 (corpus build; eugene@trtk.me)"}
CHUNK_WORDS = 700
MAX_CHUNKS_PER_BOOK = 12

FALLBACK_IDS = [
    1342, 11, 84, 1661, 2701, 1080, 76, 74, 98, 1400, 345, 174, 5200, 1232,
    2542, 4300, 2554, 2600, 1399, 28054, 1727, 6130, 3207, 2814, 16328, 1184,
    768, 829, 1497, 2147, 135, 209, 160, 2641, 158, 141, 105, 121, 1212, 394,
    16, 2148, 1322, 4517, 996, 2680, 3600, 1404, 1260, 219, 215, 203, 244,
]


def get(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "replace")


def catalog(num_books: int):
    books = []
    page = 1
    while len(books) < num_books and page <= 40:
        try:
            data = json.loads(get(f"https://gutendex.com/books/?languages=en&page={page}"))
        except Exception as ex:
            print(f"gutendex page {page} failed: {ex}")
            break
        for b in data.get("results", []):
            url = None
            for k, v in b.get("formats", {}).items():
                if k.startswith("text/plain") and not v.endswith(".zip"):
                    url = v
                    break
            if url:
                books.append((b["id"], b.get("title", "untitled"), url))
            if len(books) >= num_books:
                break
        if not data.get("next"):
            break
        page += 1
        time.sleep(0.3)
    return books


START = re.compile(r"\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG", re.I)
END = re.compile(r"\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG", re.I)


def body(text: str) -> str:
    lines = text.splitlines()
    s, e = 0, len(lines)
    for i, l in enumerate(lines):
        if START.search(l):
            s = i + 1
            break
    for i in range(len(lines) - 1, -1, -1):
        if END.search(lines[i]):
            e = i
            break
    chunk = "\n".join(lines[s:e]).strip()
    chunk = re.sub(r"^\s*Produced by.*?(\n\n|\Z)", "", chunk, flags=re.I | re.S)
    # Gutenberg hard-wraps lines; join intra-paragraph newlines, keep blank lines.
    chunk = re.sub(r"(?<!\n)\n(?!\n)", " ", chunk)
    return chunk


def slug(t: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")
    return (s or "book")[:40]


def chunks(text: str):
    paras = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    out, cur, wc = [], [], 0
    for p in paras:
        cur.append(p)
        wc += len(p.split())
        if wc >= CHUNK_WORDS:
            out.append("\n\n".join(cur))
            cur, wc = [], 0
            if len(out) >= MAX_CHUNKS_PER_BOOK:
                break
    if cur and len(out) < MAX_CHUNKS_PER_BOOK and wc >= 200:
        out.append("\n\n".join(cur))
    return out


def main() -> None:
    out_dir = Path(sys.argv[1])
    out_dir.mkdir(parents=True, exist_ok=True)
    num_books = int(sys.argv[2]) if len(sys.argv) > 2 else 200
    max_total = int(sys.argv[3]) if len(sys.argv) > 3 else 2500

    books = catalog(num_books)
    if not books:
        print("falling back to built-in id list")
        books = [(i, f"book-{i}", f"https://www.gutenberg.org/cache/epub/{i}/pg{i}.txt")
                 for i in FALLBACK_IDS]
    print(f"catalog: {len(books)} books")

    total = 0
    for bid, title, url in books:
        if total >= max_total:
            break
        try:
            txt = get(url)
        except Exception as ex:
            print(f"skip {bid}: {ex}")
            continue
        for i, ch in enumerate(chunks(body(txt)), 1):
            if total >= max_total:
                break
            (out_dir / f"gb-{bid:05d}-{slug(title)}-p{i:02d}.md").write_text(
                ch + "\n", encoding="utf-8"
            )
            total += 1
        time.sleep(0.4)
    print(f"wrote {total} chunk files to {out_dir}")


if __name__ == "__main__":
    main()
