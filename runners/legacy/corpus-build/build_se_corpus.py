#!/usr/bin/env python3
"""
Download Stack Exchange 2020-12 data dumps and build human corpus.
One .md file per post in datasets/corpus/human/<topic>/stackexchange/
"""

import os
import sys
import re
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error
import tempfile
import shutil
import html
from datetime import datetime
from pathlib import Path

try:
    import py7zr
except ImportError:
    print("ERROR: py7zr not installed. Run: pip install py7zr")
    sys.exit(1)

BASE_URL = "https://archive.org/download/stack-exchange-2020-12-08"
REPO_ROOT = Path("/Users/tartakovsky/Projects/agent-quality-controls/slopless")
OUTPUT_ROOT = REPO_ROOT / "datasets" / "corpus" / "human"
MAX_POSTS = 200
MIN_WORDS = 80
MIN_SCORE = 5

SITES = [
    ("law.stackexchange.com",      "legal",       "law"),
    ("health.stackexchange.com",   "medical",     "health"),  # medicalsciences not in dump
    ("cooking.stackexchange.com",  "food",        "cooking"),
    ("money.stackexchange.com",    "finance",     "money"),
    ("fitness.stackexchange.com",  "fitness",     "fitness"),
    ("travel.stackexchange.com",   "travel",      "travel"),
    ("parenting.stackexchange.com","parenting",   "parenting"),
    ("skeptics.stackexchange.com", "science",     "skeptics"),
    ("writers.stackexchange.com",  "motivational","writers"),  # writing -> writers
    ("academia.stackexchange.com", "education",   "academia"),
]

LICENSE_TEXT = """\
# License

Source: Stack Exchange {site} — 2020-12 data dump
Register: Human Q&A discussion, pre-2021
License: CC BY-SA 4.0 (posts from 2018+); older posts CC BY-SA 3.0
Redistribute: Yes (with attribution and ShareAlike)
Publishable: Yes (CC BY-SA — attribute "Stack Exchange contributors")
"""

CODE_BLOCK_RE = re.compile(r'<(code|pre)[^>]*>.*?</(code|pre)>', re.DOTALL | re.IGNORECASE)
TAG_RE = re.compile(r'<[^>]+>')
MULTI_NEWLINE_RE = re.compile(r'\n{3,}')


def strip_html(body: str) -> str:
    """Remove HTML, drop code/pre blocks, return plain prose."""
    text = CODE_BLOCK_RE.sub('', body)
    text = TAG_RE.sub(' ', text)
    text = html.unescape(text)
    # Normalize whitespace
    lines = [line.strip() for line in text.splitlines()]
    text = '\n'.join(line for line in lines if line)
    text = MULTI_NEWLINE_RE.sub('\n\n', text)
    return text.strip()


def word_count(text: str) -> int:
    return len(text.split())


def slugify(title: str) -> str:
    """Simple ASCII slug."""
    t = title.lower()
    t = re.sub(r'[^a-z0-9]+', '-', t)
    t = t.strip('-')
    return t[:60]


def download_7z(site: str, dest_path: Path) -> bool:
    url = f"{BASE_URL}/{site}.7z"
    print(f"  Downloading {url} ...")
    try:
        with urllib.request.urlopen(url, timeout=300) as response:
            total = int(response.headers.get('Content-Length', 0))
            downloaded = 0
            chunk = 1024 * 1024  # 1 MB
            with open(dest_path, 'wb') as f:
                while True:
                    buf = response.read(chunk)
                    if not buf:
                        break
                    f.write(buf)
                    downloaded += len(buf)
                    if total:
                        pct = downloaded / total * 100
                        print(f"    {downloaded // (1024*1024)} MB / {total // (1024*1024)} MB ({pct:.1f}%)", end='\r')
        print(f"\n  Download complete: {downloaded // (1024*1024)} MB")
        return True
    except (urllib.error.URLError, urllib.error.HTTPError) as e:
        print(f"  FAILED to download {url}: {e}")
        return False
    except Exception as e:
        print(f"  UNEXPECTED ERROR downloading {url}: {e}")
        return False


def extract_posts_xml(archive_path: Path, extract_dir: Path) -> Path | None:
    """Extract Posts.xml from the 7z archive."""
    print(f"  Extracting Posts.xml from {archive_path.name} ...")
    try:
        with py7zr.SevenZipFile(archive_path, mode='r') as z:
            names = z.getnames()
            posts_name = next((n for n in names if n.lower() == 'posts.xml'), None)
            if not posts_name:
                print(f"  ERROR: Posts.xml not found in archive. Contents: {names[:10]}")
                return None
            z.extract(targets=[posts_name], path=extract_dir)
        posts_path = extract_dir / posts_name
        if posts_path.exists():
            print(f"  Extracted Posts.xml ({posts_path.stat().st_size // (1024*1024)} MB)")
            return posts_path
        # py7zr may extract to subdirectory
        for candidate in extract_dir.rglob('Posts.xml'):
            return candidate
        print("  ERROR: Posts.xml not found after extraction")
        return None
    except Exception as e:
        print(f"  ERROR extracting archive: {e}")
        return None


def parse_posts(posts_xml: Path, question_titles: dict) -> list[dict]:
    """
    Parse Posts.xml, return filtered posts sorted by score descending.
    question_titles: dict populated with id->title for questions.
    """
    posts = []
    cutoff = datetime(2021, 1, 1)

    print(f"  Parsing {posts_xml.name} ...")
    try:
        tree = ET.iterparse(posts_xml, events=('start',))
        count = 0
        for event, elem in tree:
            if elem.tag != 'row':
                continue
            count += 1
            if count % 50000 == 0:
                print(f"    {count} rows scanned, {len(posts)} passing so far...", end='\r')

            post_type = elem.get('PostTypeId')
            if post_type not in ('1', '2'):
                elem.clear()
                continue

            score_str = elem.get('Score', '0')
            try:
                score = int(score_str)
            except ValueError:
                elem.clear()
                continue

            if score < MIN_SCORE:
                elem.clear()
                continue

            date_str = elem.get('CreationDate', '')
            try:
                date = datetime.fromisoformat(date_str[:19])
            except ValueError:
                elem.clear()
                continue

            if date >= cutoff:
                elem.clear()
                continue

            body = elem.get('Body', '')
            if not body:
                elem.clear()
                continue

            prose = strip_html(body)
            wc = word_count(prose)
            if wc < MIN_WORDS:
                elem.clear()
                continue

            post_id = elem.get('Id', '')
            title = elem.get('Title', '')
            parent_id = elem.get('ParentId', '')

            if post_type == '1':
                question_titles[post_id] = title

            posts.append({
                'id': post_id,
                'type': post_type,
                'score': score,
                'date': date_str[:10],
                'title': title,
                'parent_id': parent_id,
                'prose': prose,
                'wc': wc,
            })
            elem.clear()

        print(f"\n  Parsed {count} rows, {len(posts)} passed filters")
    except ET.ParseError as e:
        print(f"  XML parse error: {e}")

    # Sort by score descending, cap at MAX_POSTS
    posts.sort(key=lambda p: p['score'], reverse=True)
    return posts[:MAX_POSTS]


def write_post(post: dict, out_dir: Path, site_abbrev: str, question_titles: dict):
    """Write a single post as a .md file."""
    post_id = post['id']

    if post['type'] == '1':
        title = post['title'] or f"Question {post_id}"
    else:
        # For answers, use the parent question title if available
        parent_title = question_titles.get(post['parent_id'], '')
        title = parent_title if parent_title else f"Answer {post_id}"

    filename = f"se-{site_abbrev}-{post_id}.md"
    filepath = out_dir / filename

    content = f"# {title}\n\n{post['prose']}\n"
    filepath.write_text(content, encoding='utf-8')


def write_license(out_dir: Path, site: str):
    license_path = out_dir / "LICENSE.md"
    license_path.write_text(LICENSE_TEXT.format(site=site), encoding='utf-8')


def process_site(site: str, topic: str, abbrev: str, tmp_dir: Path) -> dict:
    result = {'site': site, 'topic': topic, 'posts': 0, 'error': None}
    print(f"\n=== {site} -> {topic} ===")

    out_dir = OUTPUT_ROOT / topic / "stackexchange"
    out_dir.mkdir(parents=True, exist_ok=True)
    write_license(out_dir, site)

    archive_path = tmp_dir / f"{site}.7z"

    if not download_7z(site, archive_path):
        result['error'] = 'download failed'
        return result

    extract_dir = tmp_dir / f"{site}_extracted"
    extract_dir.mkdir(exist_ok=True)

    posts_xml = extract_posts_xml(archive_path, extract_dir)
    if not posts_xml:
        result['error'] = 'extraction failed'
        return result

    question_titles: dict[str, str] = {}

    # First pass: collect all question titles (needed for answers)
    # We'll do a quick scan for question titles before filtering
    print("  Collecting question titles ...")
    try:
        for event, elem in ET.iterparse(posts_xml, events=('start',)):
            if elem.tag == 'row' and elem.get('PostTypeId') == '1':
                qid = elem.get('Id', '')
                qtitle = elem.get('Title', '')
                if qid and qtitle:
                    question_titles[qid] = qtitle
            if elem.tag == 'row':
                elem.clear()
        print(f"  Collected {len(question_titles)} question titles")
    except ET.ParseError as e:
        print(f"  WARNING: title scan parse error: {e}")

    posts = parse_posts(posts_xml, question_titles)

    if not posts:
        result['error'] = 'no posts passed filters'
        return result

    print(f"  Writing {len(posts)} posts to {out_dir} ...")
    for post in posts:
        write_post(post, out_dir, abbrev, question_titles)

    result['posts'] = len(posts)
    print(f"  Done: {len(posts)} posts written")

    # Cleanup extracted files to save space
    shutil.rmtree(extract_dir, ignore_errors=True)
    archive_path.unlink(missing_ok=True)

    return result


def main():
    print(f"Output root: {OUTPUT_ROOT}")
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    tmp_dir = Path(tempfile.mkdtemp(prefix='se_corpus_'))
    print(f"Temp dir: {tmp_dir}")

    results = []
    try:
        for site, topic, abbrev in SITES:
            try:
                r = process_site(site, topic, abbrev, tmp_dir)
                results.append(r)
            except Exception as e:
                print(f"  UNEXPECTED ERROR for {site}: {e}")
                results.append({'site': site, 'topic': topic, 'posts': 0, 'error': str(e)})
    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)

    print("\n\n=== SUMMARY ===")
    total = 0
    for r in results:
        status = f"{r['posts']} posts" if r['posts'] else f"FAILED: {r['error']}"
        print(f"  {r['site']} -> {r['topic']}: {status}")
        total += r['posts']
    print(f"\nTotal posts: {total}")

    failed = [r for r in results if r['error']]
    if failed:
        print(f"\nFailed sites ({len(failed)}):")
        for r in failed:
            print(f"  {r['site']}: {r['error']}")

    return 0 if not failed else 1


if __name__ == '__main__':
    sys.exit(main())
