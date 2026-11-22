// Image optimiser: resizes oversized photos and recompresses them in place (keeps file names, so
// imports don't change). Works on every image under src/assets/images (all sub-folders).
// Re-run after adding new photos:   node scripts/optimize-images.mjs
// Tip: save new photos as .webp (smaller than jpg/png) and import them with the .webp extension.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('src/assets/images');
const MAX_EDGE = 1200;

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

for (const full of walk(root)) {
  const ext = path.extname(full).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

  const before = fs.statSync(full).size;
  const input = fs.readFileSync(full);
  let pipeline = sharp(input).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
  if (ext === '.png') pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 });
  else if (ext === '.webp') pipeline = pipeline.webp({ quality: 80, effort: 6 });
  else pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true });

  const out = await pipeline.toBuffer();
  if (out.length < before * 0.9) {
    // Write beside the original, then rename, so an interrupted run never leaves a half-written image.
    const tmp = `${full}.tmp`;
    fs.writeFileSync(tmp, out);
    fs.renameSync(tmp, full);
    console.log(`${path.relative(root, full).padEnd(36)} ${(before / 1024) | 0} KB -> ${(out.length / 1024) | 0} KB`);
  }
}
