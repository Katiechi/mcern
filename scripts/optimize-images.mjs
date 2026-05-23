import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("public/images");
const MAX_WIDTH = 1920;
const QUALITY = 82;
const EFFORT = 5;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const all = await walk(ROOT);
const targets = all.filter((f) => /\.(jpe?g)$/i.test(f));

if (targets.length === 0) {
  console.log("Nothing to optimize.");
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let failed = 0;

for (const src of targets) {
  const out = src.replace(/\.(jpe?g)$/i, ".webp");
  try {
    const beforeStat = await fs.stat(src);
    const meta = await sharp(src).metadata();
    let pipeline = sharp(src).rotate();
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    await pipeline.webp({ quality: QUALITY, effort: EFFORT }).toFile(out);
    const afterStat = await fs.stat(out);

    totalBefore += beforeStat.size;
    totalAfter += afterStat.size;
    converted += 1;

    await fs.unlink(src);

    const rel = path.relative(process.cwd(), src);
    const beforeKB = (beforeStat.size / 1024).toFixed(0);
    const afterKB = (afterStat.size / 1024).toFixed(0);
    const pct = ((1 - afterStat.size / beforeStat.size) * 100).toFixed(0);
    console.log(`  ${rel.padEnd(60)} ${beforeKB.padStart(6)}KB -> ${afterKB.padStart(6)}KB  (-${pct}%)`);
  } catch (err) {
    failed += 1;
    console.error(`  FAILED: ${src}  ${err.message}`);
  }
}

const beforeMB = (totalBefore / 1024 / 1024).toFixed(1);
const afterMB = (totalAfter / 1024 / 1024).toFixed(1);
const pct = ((1 - totalAfter / totalBefore) * 100).toFixed(0);
console.log("");
console.log(`Converted: ${converted}   Failed: ${failed}`);
console.log(`Total: ${beforeMB} MB -> ${afterMB} MB  (-${pct}%)`);
