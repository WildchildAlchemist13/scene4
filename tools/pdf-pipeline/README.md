# Scene4 PDF Rebrand Pipeline

End-to-end pipeline that takes the original `_REELOOM` PDFs and produces clean, full-content, Scene4-branded PDFs ready for sale.

## What it does

1. **Extracts** the original PDFs to text via `pdftotext`
2. **Cleans** the extracted text — strips REELOOM artifacts (vertical sidebar fragments, page headers, inline letter bleed-through), reflows broken paragraphs, normalizes bullets, promotes headings
3. **Renders** to styled HTML via `pandoc` and a Scene4-branded template
4. **Prints** to PDF via headless Chrome

## Files

- [`clean_md.py`](clean_md.py) — text cleanup script (REELOOM → Scene4, artifact stripping, paragraph reflow, heading promotion, bullet normalization)
- [`render.py`](render.py) — HTML wrapping + Chrome PDF rendering
- [`template.html`](template.html) — Scene4-branded HTML+CSS template (cover page, book typography, workbook styles)
- [`full_pipeline.sh`](full_pipeline.sh) — orchestrates the full extract → clean → render flow

## Requirements

- `pandoc` (brew install pandoc)
- `pdftotext` (brew install poppler)
- Google Chrome (`/Applications/Google Chrome.app`)
- Python 3.9+

## Usage

```bash
# 1. Place original PDFs at /tmp/scene4-build/originals/{916-storyteller,grab-and-keep,story-mastery}.pdf
#    (extracted via pdftotext from the REELOOM source PDFs)
# 2. Run the pipeline
bash full_pipeline.sh
# 3. Output PDFs at /tmp/scene4-build/out/*.pdf
```

## Re-rendering

If you change template.html (CSS, cover styling) or clean_md.py (cleanup logic), just re-run `full_pipeline.sh`. The cleanup is deterministic; same input → same output.

## Output

Final rendered Scene4-branded PDFs (current build):

| Book | Pages | Size |
|---|---|---|
| The 9:16 Storyteller | 47 | 455KB |
| Grab & Keep | 38 | 371KB |
| Story & Screenplay Mastery | 318 | 3.1MB |

These are the files to upload to Supabase Storage `books` bucket.
