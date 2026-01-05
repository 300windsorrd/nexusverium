import { promises as fs } from "fs";
import path from "path";

const OUT_DIR = path.join(process.cwd(), "out");

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function createAliasForFile(filePath) {
  const parts = filePath.split(path.sep);
  const nextIndex = parts.findIndex((part) => part.startsWith("__next."));

  // Only alias files that live under a __next.* directory.
  if (nextIndex === -1) return;

  // Build the alias filename by joining the __next.* segment and any children with dots.
  const aliasName = parts.slice(nextIndex).join(".");
  const aliasDir = parts.slice(0, nextIndex).join(path.sep);
  const aliasPath = path.join(aliasDir, aliasName);

  // Skip if this is already the same file or the alias already exists.
  if (aliasPath === filePath || (await fileExists(aliasPath))) {
    return;
  }

  await fs.copyFile(filePath, aliasPath);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (entry.isFile()) {
      await createAliasForFile(fullPath);
    }
  }
}

async function main() {
  const outExists = await fileExists(OUT_DIR);
  if (!outExists) {
    console.warn(`No out directory found at ${OUT_DIR}; skipping alias creation.`);
    return;
  }

  await walk(OUT_DIR);
}

main().catch((err) => {
  console.error("Failed to create static export aliases:", err);
  process.exit(1);
});
