const fs = require("node:fs");
const path = require("node:path");

const ENTRY =
  "Root cause: me. I deleted the users table to fix a typo in it. The typo is gone. So are the users.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (ENTRY.length < MIN_LENGTH || ENTRY.length > MAX_LENGTH) {
  fail(`entry is ${ENTRY.length} characters, must be ${MIN_LENGTH}-${MAX_LENGTH}`);
}

if (ENTRY.includes("\n")) {
  fail("entry must be a single line");
}

const outDir = path.join(__dirname, "output");
fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, "entry.txt");
fs.writeFileSync(outFile, `${ENTRY}\n`, "utf8");

const written = fs.readFileSync(outFile, "utf8").trimEnd();
if (written !== ENTRY) {
  fail("written entry does not match the expected line");
}

console.log(`wrote ${outFile} (${ENTRY.length} characters)`);
