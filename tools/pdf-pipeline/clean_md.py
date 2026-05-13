#!/usr/bin/env python3
"""
Clean a rebranded Scene4 markdown source extracted from a PDF:
- Strip vertical 'REELOOM STUDIOS' letter-fragment artifacts.
- Strip page-header triplets (Scene4 / [book title] / Page N).
- Replace any remaining 'REELOOM STUDIOS' / 'Reeloom Studios' with 'SCENE4' / 'Scene4'.
- Reflow body paragraphs that PDF extraction broke across spurious blank lines.
"""
import re
import sys
from pathlib import Path

REELOOM_CHARS = set("REELOOMSTUDIOS")  # = {R, E, L, O, M, S, T, U, D, I}
LIST_PREFIXES = ("#", "●", "•", "*", "-", "|", ">", "```", "■", "■", "✔", "✗",
                 "1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "0.")
SENTENCE_ENDERS = set(".!?:;\"”)]》}…")


def is_reeloom_fragment(line: str) -> bool:
    s = line.strip()
    if not s or len(s) > 4:
        return False
    if not s.isupper():
        return False
    return all(c in REELOOM_CHARS for c in s)


def strip_inline_artifacts(text: str) -> str:
    """Strip REELOOM letter fragments that bled INLINE into body text from the
    PDF's vertical sidebar (e.g. 'ShortMax, RTikTok', 'execution is not. IO Knowing',
    'RHere is the full breakdown', 'R3. Earned Shock').

    Conservative — only the patterns that can't reasonably be real words.
    """
    # Pattern A: REELOOM letter glued to a Title-Case word ("RTikTok" → "TikTok")
    # Excludes "I" (pronoun) and uses only REELOOM consonants/vowels that don't form common prefixes.
    text = re.sub(r"\b([REOLSMTD])([A-Z][a-z])", r"\2", text)
    # Pattern B: REELOOM letter glued to digit ("R3" → "3")
    text = re.sub(r"\b([REOLSMTDU])(\d)", r"\2", text)
    # Pattern C: standalone short REELOOM-only token surrounded by spaces, mid-line
    # Length 1-4, all REELOOM chars. Skip "I" alone (pronoun) and "U" alone (could be artifact OR
    # internet-speak — strip with caution: only when in a clearly mechanical context).
    REELOOM_TOKENS = ["EELOOM", "OOM", "EEL", "LOO", "TUD", "STU", "UDIO",
                      "EE", "LO", "OO", "OM", "ST", "TU", "UD", "DI", "IO", "OS",
                      "R", "L", "M", "S", "T", "U", "D"]
    REELOOM_TOKENS.sort(key=len, reverse=True)  # longest match first
    pattern = r"(?<=[ \t])(?:" + "|".join(REELOOM_TOKENS) + r")(?=[ \t])"
    text = re.sub(pattern, "", text)
    # Pattern D: trailing REELOOM letters at end of line (often after long whitespace)
    trailing_pattern = r"[ \t]+(?:" + "|".join(REELOOM_TOKENS) + r")[ \t]*$"
    text = re.sub(trailing_pattern, "", text, flags=re.MULTILINE)
    # Pattern E: REELOOM letters at start of line followed by a space
    leading_pattern = r"^(?:" + "|".join(REELOOM_TOKENS) + r")[ \t]+"
    text = re.sub(leading_pattern, "", text, flags=re.MULTILINE)
    # Collapse double spaces created by the strips
    text = re.sub(r"[ \t]{2,}", " ", text)
    return text


def strip_page_header_triplets(text: str) -> str:
    """Remove repeating per-page header lines from PDF text extraction.
    Handles both layouts:
      A) Three paragraphs separated by blanks:  Scene4\n\nTitle\n\nPage N
      B) Single line, three columns:           "Reeloom Studios   Title   Page 12"
    """
    # Form A: paragraph triplet
    triplet = re.compile(
        r"\n*(?:Scene4|Reeloom Studios)\s*\n+\s*([^\n]{1,80})\n+\s*Page\s+\d+\s*\n*",
        re.IGNORECASE,
    )
    text = triplet.sub("\n\n", text)
    # Form B: single-line three-column
    one_line = re.compile(
        r"^\s*(?:Scene4|Reeloom Studios)\s+\S[^\n]*?\s+Page\s+\d+\s*$",
        re.MULTILINE | re.IGNORECASE,
    )
    text = one_line.sub("", text)
    return text


def looks_structural(line: str) -> bool:
    s = line.lstrip()
    if not s:
        return False
    return any(s.startswith(p) for p in LIST_PREFIXES)


def flatten_paragraph(para: str) -> str:
    """Within a paragraph, join soft-broken lines into one if they aren't list items."""
    lines = [l.rstrip() for l in para.split("\n") if l.strip()]
    if not lines:
        return ""
    # If any line is structural (list/heading/etc), keep the paragraph as-is line-broken
    if any(looks_structural(l) for l in lines):
        return "\n".join(lines)
    # Otherwise, flatten to single line with single spaces
    return re.sub(r"\s+", " ", " ".join(lines)).strip()


CONTINUATION_WORDS = {
    "a", "an", "the", "and", "or", "but", "of", "with", "in", "on", "by", "to", "for",
    "from", "at", "about", "as", "into", "onto", "over", "through", "across", "after",
    "against", "between", "during", "before", "because", "while", "if", "whether",
    "unless", "until", "though", "although", "than", "so", "yet", "nor", "is", "are",
    "was", "were", "be", "been", "being", "has", "have", "had", "do", "does", "did",
    "will", "would", "shall", "should", "can", "could", "may", "might", "must",
    "their", "his", "her", "its", "our", "your", "my", "every", "this", "that",
    "these", "those", "which", "where", "when", "why", "how", "either", "neither",
    "both", "all", "any", "each", "no", "not", "only", "just",
}


def should_merge_with_previous(prev: str, curr: str) -> bool:
    """Identify paragraph splits that came from PDF extraction line wraps and merge them.

    Strong merge signals (any ONE triggers merge):
    - curr starts with a lowercase letter (almost certainly a sentence continuation)
    - prev ends with a continuation word (and, or, the, with, a, etc.)
    - prev's last word is a single uppercase letter ("I", "A")
    - prev ends with comma / em-dash / hyphen / semicolon
    - prev ends with a short ALL-CAPS acronym (2–5 chars), likely mid-sentence

    Bail-outs (no merge):
    - Either side is structural (heading, bullet, table, code)
    - prev is short (< 60 chars) — likely heading/label/cover line
    - curr starts with quote — likely new dialogue paragraph
    """
    if not prev or not curr:
        return False
    if looks_structural(curr) or looks_structural(prev):
        return False
    if len(prev.strip()) < 60:
        return False

    prev_stripped = prev.rstrip()
    first_char = curr.lstrip()[0] if curr.lstrip() else ""
    if first_char in "“\"":
        return False

    last_char = prev_stripped[-1]
    last_word = prev_stripped.split()[-1] if prev_stripped.split() else ""
    last_word_clean = last_word.strip(".,;:!?\"'”)").lower()

    # Strong merge: curr begins with lowercase
    if first_char.islower():
        return True
    # Strong merge: prev ends with single uppercase letter as a word
    if len(last_word) == 1 and last_word.isupper():
        return True
    # Strong merge: prev ends with continuation word
    if last_word_clean in CONTINUATION_WORDS:
        return True
    # Strong merge: prev ends with comma/dash/semicolon
    if last_char in ",;—-":
        return True
    # Strong merge: prev ends with short ALL-CAPS acronym (HBC, IP, AI, etc.)
    if 2 <= len(last_word) <= 5 and last_word.isupper() and last_word.isalpha():
        return True

    return False


ORPHAN_BULLET_RE = re.compile(r"^[•·●\*\-—]+$")
BULLET_CHARS = "•●·"


def normalize_bullets(text: str) -> str:
    """Convert PDF-extracted bullet glyphs (•, ●, ·) to proper markdown list items (- text).
    Handles three patterns line-by-line:
      A) "• content"           → "- content"
      B) "•\n[blanks]\ncontent" (orphan bullet with text on next non-blank line) → "- content"
      C) Standalone "•" with no following content → drop
    """
    lines = text.split("\n")
    out: list[str] = []
    i = 0
    while i < len(lines):
        raw = lines[i]
        stripped = raw.strip()

        # Pattern A: "• content" on the same line
        m = re.match(r"^[" + BULLET_CHARS + r"]\s+(.+)$", stripped)
        if m:
            out.append("- " + m.group(1).strip())
            i += 1
            continue

        # Pattern B/C: standalone bullet — look ahead for content
        if stripped and all(c in BULLET_CHARS for c in stripped):
            j = i + 1
            fused = False
            while j < len(lines) and j < i + 6:  # look ahead at most 5 lines
                nxt = lines[j].strip()
                if not nxt:
                    j += 1
                    continue
                # Hit another bullet or heading — stop, drop the orphan
                if (any(c in BULLET_CHARS for c in nxt) and len(nxt) <= 2) \
                        or nxt.startswith(("#", "-", "*", "|")):
                    break
                # Hit real content — fuse
                out.append("- " + nxt)
                i = j + 1
                fused = True
                break
            if fused:
                continue
            i += 1  # drop the orphan
            continue

        out.append(raw)
        i += 1
    return "\n".join(out)


def fuse_orphan_bullets(paragraphs: list[str]) -> list[str]:
    """Paragraph-level bullet fusion (kept as backup for cases normalize_bullets misses)."""
    out: list[str] = []
    i = 0
    while i < len(paragraphs):
        p = paragraphs[i].strip()
        if ORPHAN_BULLET_RE.match(p) and i + 1 < len(paragraphs):
            nxt = paragraphs[i + 1].strip()
            if nxt and not ORPHAN_BULLET_RE.match(nxt) and not nxt.startswith("#"):
                out.append("- " + nxt)
                i += 2
                continue
        out.append(paragraphs[i])
        i += 1
    return out


def reflow(text: str) -> str:
    paragraphs = re.split(r"\n\s*\n", text)
    paragraphs = fuse_orphan_bullets(paragraphs)
    flattened = [flatten_paragraph(p) for p in paragraphs]
    flattened = [p for p in flattened if p]

    merged: list[str] = []
    for para in flattened:
        if merged and should_merge_with_previous(merged[-1], para):
            merged[-1] = merged[-1].rstrip() + " " + para.lstrip()
        else:
            merged.append(para)
    return "\n\n".join(merged)


def promote_headings(text: str) -> str:
    """Insert markdown heading markers (#, ##, ###) where the source clearly intends a heading
    but had it as a plain paragraph (because PDF extraction stripped formatting)."""
    out_paragraphs = []
    paragraphs = text.split("\n\n")
    for para in paragraphs:
        s = para.strip()
        if not s or "\n" in s:
            out_paragraphs.append(para)
            continue
        # Already a markdown heading? Leave alone.
        if s.startswith("#"):
            out_paragraphs.append(para)
            continue

        # H1: CHAPTER N / PART N  (top-level structure)
        if re.match(r"^(CHAPTER|PART)\s+(\d+|ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE|TEN)\b", s, re.IGNORECASE):
            out_paragraphs.append("# " + s)
            continue
        # H1: standalone "INTRODUCTION" etc.
        if s.upper() in ("INTRODUCTION", "CONCLUSION", "PROLOGUE", "EPILOGUE", "FOREWORD", "PREFACE", "APPENDIX"):
            out_paragraphs.append("# " + s)
            continue

        # H2: SECTION N — ... (must come BEFORE the all-caps fallback)
        if re.match(r"^SECTION\s+\d+", s, re.IGNORECASE):
            out_paragraphs.append("## " + s)
            continue

        # H2: title-case short line following a CHAPTER heading (chapter subtitle)
        if (out_paragraphs and out_paragraphs[-1].startswith("# CHAPTER")
                and 3 <= len(s) <= 80 and not s.endswith(".") and not s.endswith(",")
                and s[0].isupper()):
            out_paragraphs.append("## " + s)
            continue

        # H3 fallback: short ALL-CAPS standalone line — likely a sub-section heading
        if (3 <= len(s) <= 60 and s.isupper() and not s.endswith(".")
                and re.search(r"[A-Z]", s)
                and not re.search(r"^[\d\s\-:]+$", s)):
            out_paragraphs.append("### " + s)
            continue

        out_paragraphs.append(para)

    return "\n\n".join(out_paragraphs)


def strip_cover_and_toc(text: str) -> str:
    """The HTML render template provides its own styled cover, so cut everything in the
    source before the first real content marker.

    Priority: INTRODUCTION/PROLOGUE/Chapter 1 (real first content). Fall back to PART 1
    only if none of the above are found.
    """
    paragraphs = text.split("\n\n")

    primary_cut = None
    for i, para in enumerate(paragraphs):
        s = para.strip()
        if s in ("INTRODUCTION", "PROLOGUE", "FOREWORD", "PREFACE"):
            primary_cut = i
            break
        if re.match(r"^(CHAPTER)\s+(1|ONE|I)\b", s, re.IGNORECASE):
            primary_cut = i
            break
        if re.match(r"^#+\s*Chapter\s+1\b", s, re.IGNORECASE):
            primary_cut = i
            break

    if primary_cut is not None:
        return "\n\n".join(paragraphs[primary_cut:]).lstrip()

    # Fallback: PART 1
    for i, para in enumerate(paragraphs):
        if re.match(r"^(PART)\s+(1|ONE|I)\b", para.strip(), re.IGNORECASE):
            return "\n\n".join(paragraphs[i:]).lstrip()

    return text


def clean(text: str) -> str:
    # Normalize NBSP/odd whitespace so "Reeloom\xa0Studios" matches
    text = text.replace(" ", " ")
    # Strip leading whitespace from every line — pdftotext indents most lines, and leading spaces break markdown heading detection (" # Chapter 2" is not an H1).
    text = re.sub(r"^[ 	]+", "", text, flags=re.MULTILINE)
    # Brand replacements — multiple shapes
    text = re.sub(r"REELOOM\s+STUDIOS", "SCENE4", text)
    text = re.sub(r"Reeloom\s+Studios", "Scene4", text)
    text = re.sub(r"Reeloom-", "Scene4-", text)         # Reeloom-friendly, Reeloom-style, Reeloom-Edition
    text = re.sub(r"\bReeloom\b", "Scene4", text)       # bare "Reeloom"
    text = re.sub(r"\bREELOOM\b", "SCENE4", text)
    text = re.sub(r"reeloomstudios\.com", "scene4.tech", text, flags=re.IGNORECASE)
    text = re.sub(r"reeloom\.studio", "scene4.tech", text, flags=re.IGNORECASE)
    # Targeted fixes for inline-artifact words confirmed across the corpus
    # (REELOOM letter glued to a real lowercase word — pdftotext column-bleed).
    artifact_fixes = {
        r"\bRepisode\b": "episode",
        r"\bRepisodes\b": "episodes",
        r"\bRlands\b": "lands",
        r"\bReverything\b": "everything",
        r"\bRcharacter\b": "character",
        r"\bRcontext\b": "context",
        r"\bRclimate\b": "climate",
    }
    for pattern, repl in artifact_fixes.items():
        text = re.sub(pattern, repl, text)
    text = strip_page_header_triplets(text)
    text = strip_inline_artifacts(text)
    out_lines = [l for l in text.split("\n") if not is_reeloom_fragment(l)]
    text = "\n".join(out_lines)
    text = normalize_bullets(text)
    text = reflow(text)
    text = strip_cover_and_toc(text)
    text = promote_headings(text)
    return text.strip() + "\n"


def main():
    if len(sys.argv) != 3:
        print("usage: clean_md.py <input.md> <output.md>", file=sys.stderr)
        sys.exit(2)
    src, dst = sys.argv[1], sys.argv[2]
    raw = Path(src).read_text(encoding="utf-8")
    cleaned = clean(raw)
    Path(dst).write_text(cleaned, encoding="utf-8")
    print(f"  {Path(src).name}  {len(raw):,} → {len(cleaned):,} chars")


if __name__ == "__main__":
    main()
