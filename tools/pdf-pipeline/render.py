#!/usr/bin/env python3
"""
Render a cleaned Scene4 markdown to a styled HTML page using template.html,
then call headless Chrome to print to PDF.

Usage:
  render.py <cleaned.md> <out.pdf> "<title>" "<subtitle>" "<frameworks>"
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
TEMPLATE = (ROOT / "template.html").read_text(encoding="utf-8")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def strip_cover_block(md: str) -> str:
    """Drop the cover lines at the top of the cleaned MD — the HTML template renders
    its own cover. Heuristic: drop everything before the first 'Table of Contents'
    line, or before the first H1/H2, whichever comes first.
    """
    lines = md.split("\n")
    cut = 0
    for i, line in enumerate(lines):
        s = line.strip()
        if s == "Table of Contents":
            cut = i + 1
            break
        if s.startswith("# ") or s.startswith("## "):
            cut = i
            break
    return "\n".join(lines[cut:]).lstrip()


def md_to_html_body(md: str) -> str:
    """Run pandoc to convert markdown to HTML body fragment."""
    result = subprocess.run(
        ["pandoc", "--from=markdown+smart", "--to=html5", "--no-highlight", "--wrap=preserve"],
        input=md.encode("utf-8"),
        capture_output=True,
        check=True,
    )
    return result.stdout.decode("utf-8")


def enhance_workbook(html: str) -> str:
    """Restore visual workbook breathing room that PDF extraction collapsed:
    - "Write here: ___" lines → 4 blank fill-in lines
    - Standalone underscore-only lines → 3 blank fill-in lines
    - "EXERCISE …" labels → magenta uppercase exercise label
    - "STEP N: …" lines → styled step header followed by a fill-in line
    - "■ EXERCISE:" or "■ EXERCISE PART N" → exercise card label
    """
    # "Write here: _____" → 4 blank lines
    html = re.sub(
        r"<p>\s*Write here:\s*_+\s*</p>",
        '<div class="write-space"></div>' * 4,
        html,
        flags=re.IGNORECASE,
    )
    # Standalone all-underscores paragraphs → 3 blank lines
    html = re.sub(
        r"<p>\s*_{5,}\s*</p>",
        '<div class="write-space"></div>' * 3,
        html,
    )
    # EXERCISE labels (EXERCISE PART 1, EXERCISE TEMPLATE, ■ EXERCISE:)
    html = re.sub(
        r"<p>\s*(■\s*)?(EXERCISE[^<]*?)</p>",
        r'<p class="exercise-label">\2</p>',
        html,
    )
    # STEP N: lines → styled step + fill-in line
    html = re.sub(
        r"<p>\s*(STEP \d+[:—-][^<]*)</p>",
        r'<p class="exercise-step">\1</p><div class="step-rule"></div>',
        html,
    )
    return html


def fill_template(title: str, subtitle: str, frameworks: str, body: str) -> str:
    out = TEMPLATE
    for k, v in {"$title$": title, "$subtitle$": subtitle, "$frameworks$": frameworks, "$body$": body}.items():
        out = out.replace(k, v)
    return out


def html_to_pdf(html_path: Path, pdf_path: Path):
    abs_html = html_path.resolve()
    abs_pdf = pdf_path.resolve()
    subprocess.run(
        [
            CHROME,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--no-pdf-header-footer",
            "--virtual-time-budget=10000",
            f"--print-to-pdf={abs_pdf}",
            f"file://{abs_html}",
        ],
        check=True,
        capture_output=True,
    )


def main():
    if len(sys.argv) != 6:
        print("usage: render.py <cleaned.md> <out.pdf> <title> <subtitle> <frameworks>", file=sys.stderr)
        sys.exit(2)

    md_path = Path(sys.argv[1])
    pdf_path = Path(sys.argv[2])
    title, subtitle, frameworks = sys.argv[3], sys.argv[4], sys.argv[5]

    md = md_path.read_text(encoding="utf-8")
    md_body = strip_cover_block(md)
    body_html = md_to_html_body(md_body)
    body_html = enhance_workbook(body_html)
    full_html = fill_template(title, subtitle, frameworks, body_html)

    html_out = pdf_path.with_suffix(".html")
    html_out.write_text(full_html, encoding="utf-8")
    print(f"  HTML  → {html_out}  ({len(full_html):,} chars)")

    html_to_pdf(html_out, pdf_path)
    pdf_size = pdf_path.stat().st_size
    print(f"  PDF   → {pdf_path}  ({pdf_size:,} bytes)")


if __name__ == "__main__":
    main()
