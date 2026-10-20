#!/usr/bin/env python3
"""Build a US-government / public-health human-text sample (public domain).

Two sources, one file per document under <out_dir>:
  - MedlinePlus health topics (NLM/NIH, public domain). Clean health prose, best
    match for the wellness register. NOTE: continuously updated, so treat as
    MODERN (post-2020) and keep separate from the pre-2020 baseline.
  - Federal Register documents filtered to 2014-2019 (public domain). Genuinely
    pre-2020 formal government prose. NOTE: official prose is often wordy, so
    some checklist hits here are real slop, not false alarms.

Usage: build_gov_health.py <out_dir> [medline_cap] [fr_cap]
"""
import html
import io
import json
import re
import sys
import time
import urllib.request
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

UA = {"User-Agent": "slopless-research/0.1 (corpus build; eugene@trtk.me)"}


def get_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read()


def get_text(url: str) -> str:
    return get_bytes(url).decode("utf-8", "replace")


def strip_html(s: str) -> str:
    s = html.unescape(s)  # MedlinePlus stores the summary as escaped HTML; unescape first
    s = re.sub(r"(?i)</(p|li|ul|ol|div|h\d|tr)>", "\n\n", s)
    s = re.sub(r"(?i)<li[^>]*>", "- ", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s)
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n\s*\n\s*\n+", "\n\n", s)
    return s.strip()


def slug(t: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")
    return (s or "doc")[:40]


def medlineplus(out_dir: Path, cap: int) -> int:
    index = get_text("https://medlineplus.gov/xml.html")
    hrefs = re.findall(r'href="([^"]*mplus_topics[^"]*\.(?:xml|zip))"', index, re.I)
    if not hrefs:
        print("medlineplus: no topics file link found")
        return 0
    href = sorted(hrefs)[-1]
    url = href if href.startswith("http") else "https://medlineplus.gov" + (
        href if href.startswith("/") else "/" + href
    )
    print(f"medlineplus topics file: {url}")
    blob = get_bytes(url)
    if url.lower().endswith(".zip"):
        zf = zipfile.ZipFile(io.BytesIO(blob))
        blob = zf.read(zf.namelist()[0])
    written = 0
    for _, el in ET.iterparse(io.BytesIO(blob), events=("end",)):
        if el.tag != "health-topic":
            continue
        if (el.get("language") or "").lower() not in ("english", "en"):
            el.clear()
            continue
        title = el.get("title") or "topic"
        fs = el.find("full-summary")
        body = strip_html(ET.tostring(fs, encoding="unicode")) if fs is not None else ""
        el.clear()
        if len(body.split()) < 150:
            continue
        (out_dir / f"med-{written + 1:05d}-{slug(title)}.md").write_text(
            f"# {title}\n\n{body}\n", encoding="utf-8"
        )
        written += 1
        if written >= cap:
            break
    print(f"medlineplus: wrote {written}")
    return written


FR_HEADER = re.compile(r"(?im)^.*federal register\s*/\s*vol.*$")


def clean_fr(raw: str) -> str:
    raw = raw.replace("\x0c", "\n")
    raw = FR_HEADER.sub("", raw)
    raw = re.sub(r"(?<!\n)\n(?!\n)", " ", raw)
    raw = re.sub(r"\n\s*\n\s*\n+", "\n\n", raw)
    return raw.strip()


def federal_register(out_dir: Path, cap: int) -> int:
    base = (
        "https://www.federalregister.gov/api/v1/documents.json?per_page=100&order=newest"
        "&conditions[publication_date][gte]=2014-01-01"
        "&conditions[publication_date][lte]=2019-12-31"
        "&fields[]=title&fields[]=abstract&fields[]=raw_text_url&fields[]=document_number"
    )
    written, page = 0, 1
    while written < cap and page <= 30:
        try:
            data = json.loads(get_text(f"{base}&page={page}"))
        except Exception as ex:
            print(f"federal register page {page} failed: {ex}")
            break
        results = data.get("results", [])
        if not results:
            break
        for d in results:
            if written >= cap:
                break
            title = d.get("title") or "document"
            abstract = (d.get("abstract") or "").strip()
            text = abstract
            if len(text.split()) < 120 and d.get("raw_text_url"):
                try:
                    text = " ".join(clean_fr(get_text(d["raw_text_url"])).split()[:800])
                except Exception:
                    pass
                time.sleep(0.3)
            if len(text.split()) < 120:
                continue
            num = d.get("document_number") or str(written + 1)
            (out_dir / f"fr-{num}-{slug(title)}.md").write_text(
                f"# {title}\n\n{text}\n", encoding="utf-8"
            )
            written += 1
        page += 1
        time.sleep(0.3)
    print(f"federal register: wrote {written}")
    return written


def main() -> None:
    out_dir = Path(sys.argv[1])
    out_dir.mkdir(parents=True, exist_ok=True)
    med_cap = int(sys.argv[2]) if len(sys.argv) > 2 else 1200
    fr_cap = int(sys.argv[3]) if len(sys.argv) > 3 else 400
    m = medlineplus(out_dir, med_cap)
    f = federal_register(out_dir, fr_cap)
    print(f"total gov/health files: {m + f}")


if __name__ == "__main__":
    main()
