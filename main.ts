import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Root cause: me. I deleted the users table to fix a typo in it. The typo is gone. So are the users.";

function resolveOutputDir(): string {
  const override = process.env.ENTRY_OUTPUT_DIR;
  if (override !== undefined && override !== "") {
    return override;
  }
  return "/output";
}

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  const path = join(dir, "entry.txt");
  writeFileSync(path, ENTRY, "utf8");
  const back = readFileSync(path, "utf8");
  if (back !== ENTRY) {
    throw new Error("written entry does not match");
  }
  console.log(`Wrote ${ENTRY.length} characters to ${path}`);
}

main();
