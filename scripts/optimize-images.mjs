// One-off image optimiser: resizes oversized photos and recompresses them in place,
// keeping file names so imports don't change. Re-run after adding new photos:
//   node scripts/optimize-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.resolve('src/assets');
const MAX_EDGE = 1600;

for (const file of fs.readdirSync(dir)) {
  const full = path.join(dir, file);
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const before = fs.statSync(full).size;
  const input = fs.readFileSync(full);
  let pipeline = sharp(input).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
  pipeline = ext === '.png'
    ? pipeline.png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
    : pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true });

  const out = await pipeline.toBuffer();
  if (out.length < before * 0.9) {
    fs.writeFileSync(full, out);
    console.log(`${file.padEnd(28)} ${(before / 1024) | 0} KB -> ${(out.length / 1024) | 0} KB`);
  }
}
