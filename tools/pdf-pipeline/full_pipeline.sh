#!/bin/bash
set -euo pipefail

cd /tmp/scene4-build

# Step 1: Use original PDF extractions as input (full content)
cp originals/916-storyteller.txt in/916-storyteller.md
cp originals/grab-and-keep.txt in/grab-and-keep.md
cp originals/story-mastery.txt in/story-mastery.md

# Step 2: Run cleanup (handles REELOOM → Scene4, strips headers/artifacts, reflows, promotes headings)
echo "=== Cleanup ==="
python3 clean_md.py in/916-storyteller.md out/916-storyteller.md
python3 clean_md.py in/grab-and-keep.md out/grab-and-keep.md
python3 clean_md.py in/story-mastery.md out/story-mastery.md

# Step 3: Verify no truncation markers remain (would indicate stale source)
echo ""
echo "=== Truncation check ==="
if grep -l "TRUNCATED" out/*.md 2>/dev/null; then
  echo "WARNING: truncation markers found"
else
  echo "  ✓ no truncation markers"
fi

# Step 4: Verify no Reeloom remains
echo ""
echo "=== Reeloom remnants ==="
remaining=$(grep -c -i "reeloom" out/*.md 2>/dev/null || echo 0)
echo "  $remaining mentions left"
grep -i "reeloom" out/*.md 2>/dev/null | head -5 || echo "  ✓ all clean"

# Step 5: Render
echo ""
echo "=== Render ==="
python3 render.py out/916-storyteller.md out/916-storyteller.pdf \
  "The 9:16 Storyteller" \
  "The complete micro-drama writing framework — from inside active vertical-format productions." \
  "HBC Architecture · Velocity Framework · Tentpole System · Paywall Strategy" 2>&1 | tail -1
python3 render.py out/grab-and-keep.md out/grab-and-keep.pdf \
  "Grab &amp; Keep" \
  "Writing stories for the short attention span era — the craft that fills the architecture." \
  "Hook Mastery · Emotional Pacing · Character Psychology · Subtext" 2>&1 | tail -1
python3 render.py out/story-mastery.md out/story-mastery.pdf \
  "Story &amp; Screenplay Mastery" \
  "A modern, no-bullshit guide to writing stories people actually want to watch." \
  "Theme · Character · Conflict · Structure · Dialogue · Revision" 2>&1 | tail -1

# Step 6: Page counts
echo ""
echo "=== Page counts ==="
for f in out/*.pdf; do
  pages=$(python3 -c "data=open('$f','rb').read(); print(data.count(b'/Type /Page') + data.count(b'/Type/Page'))" 2>/dev/null)
  size=$(ls -lh "$f" | awk '{print $5}')
  echo "  $(basename $f): $pages pages, $size"
done
