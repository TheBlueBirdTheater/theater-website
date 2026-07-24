// Sweeps shows/events 2+ seasons old out of src/content/{shows,events} into
// src/archive/{shows,events}/<season>/, so Astro's content collections stop
// loading and validating them at build time entirely. Run by
// .github/workflows/season-rollover.yml every Jan 1; safe to re-run manually
// (node scripts/archive-seasons.mjs) since it only ever reads from
// src/content/{shows,events} — already-archived files are never revisited.
import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CUTOFF_YEAR = new Date().getFullYear() - 2;

const TARGETS = [
  { srcDir: 'src/content/shows', archiveBase: 'src/archive/shows', imageField: 'posterImage' },
  { srcDir: 'src/content/events', archiveBase: 'src/archive/events', imageField: 'image' },
];

const SEASON_RE = /^season:\s*"?(\d{4})"?\s*$/m;

function imageFieldRegex(field) {
  return new RegExp(`^${field}:\\s*(.+)$`, 'm');
}

function toPosix(relPath) {
  return relPath.split(path.sep).join('/');
}

async function archiveTarget({ srcDir, archiveBase, imageField }) {
  let files;
  try {
    files = (await readdir(srcDir)).filter((file) => file.endsWith('.yaml'));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }

  const moved = [];

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const text = await readFile(srcPath, 'utf-8');

    const seasonMatch = text.match(SEASON_RE);
    if (!seasonMatch) {
      console.warn(`Skipping ${srcPath}: no "season" field found.`);
      continue;
    }
    const season = seasonMatch[1];
    if (Number(season) > CUTOFF_YEAR) continue;

    const destDir = path.join(archiveBase, season);
    const destPath = path.join(destDir, file);

    let newText = text;
    const imgRe = imageFieldRegex(imageField);
    const imgMatch = text.match(imgRe);
    if (imgMatch) {
      // The image path is relative to srcDir; moving the file breaks it unless rewritten
      // to be relative to its new home in destDir instead.
      const originalRelPath = imgMatch[1].trim();
      const absoluteImagePath = path.resolve(srcDir, originalRelPath);
      const newRelPath = toPosix(path.relative(destDir, absoluteImagePath));
      newText = text.replace(imgRe, `${imageField}: ${newRelPath}`);
    }

    await mkdir(destDir, { recursive: true });
    await writeFile(destPath, newText, 'utf-8');
    await unlink(srcPath);
    moved.push({ from: srcPath, to: destPath, season });
  }

  return moved;
}

async function main() {
  const allMoved = [];
  for (const target of TARGETS) {
    allMoved.push(...(await archiveTarget(target)));
  }

  if (allMoved.length === 0) {
    console.log(`No content from season ${CUTOFF_YEAR} or older to archive.`);
    return;
  }

  console.log(`Archived ${allMoved.length} file(s):`);
  for (const { from, to, season } of allMoved) {
    console.log(`  [${season}] ${from} -> ${to}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
