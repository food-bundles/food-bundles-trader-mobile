/**
 * Fails the build if any tracked source file under src/, app/, or scripts/
 * exceeds the 200-line non-negotiable cap defined in CLAUDE.md.
 */
import { readdirSync, readFileSync, statSync } from "fs";
import { join, extname } from "path";

const LIMIT = 200;
const ROOT_DIRS = ["app", "src", "scripts"];
const EXTENSIONS = new Set([".ts", ".tsx"]);

function collectFiles(dir: string, acc: string[]): string[] {
  let entries: string[] = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      if (entry === "node_modules" || entry === ".expo") continue;
      collectFiles(fullPath, acc);
    } else if (EXTENSIONS.has(extname(entry))) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function main(): void {
  const files: string[] = [];
  for (const dir of ROOT_DIRS) {
    collectFiles(dir, files);
  }

  const offenders: { file: string; lines: number }[] = [];
  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    const lineCount = content.split("\n").length;
    if (lineCount > LIMIT) {
      offenders.push({ file, lines: lineCount });
    }
  }

  if (offenders.length > 0) {
    console.error(`Line limit (${LIMIT}) exceeded in ${offenders.length} file(s):`);
    for (const { file, lines } of offenders) {
      console.error(`  ${file}: ${lines} lines`);
    }
    process.exit(1);
  }

  console.warn(`OK: all ${files.length} files are within the ${LIMIT}-line limit.`);
}

main();
