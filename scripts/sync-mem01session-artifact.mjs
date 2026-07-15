import { copyFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const checkedCopy = path.join(root, "src/data/prepared-input-scaling.json");
const canonical = path.resolve(
  root,
  "../mem01session/artifacts/prepared-input-scaling.json",
);
const shouldSync = process.argv.includes("--sync");

function validateArtifact(value, label) {
  if (!Array.isArray(value) || value.length !== 9) {
    throw new Error(`${label} must contain exactly the 9 canonical 1/10/40 rows`);
  }
  const keys = new Set(
    value.map((row) => `${row.strategy}:${row.conversation}`),
  );
  for (const strategy of ["fresh_stock", "reused_stock", "mem01session"]) {
    for (const conversation of [1, 10, 40]) {
      if (!keys.has(`${strategy}:${conversation}`)) {
        throw new Error(`${label} is missing ${strategy}/${conversation}`);
      }
    }
  }
}

const localBytes = await readFile(checkedCopy);
validateArtifact(JSON.parse(localBytes.toString("utf8")), "checked copy");

let canonicalBytes;
try {
  canonicalBytes = await readFile(canonical);
} catch (error) {
  if (error?.code === "ENOENT") {
    console.log(
      "PASS artifact check: canonical sibling is unavailable; validated standalone checked copy.",
    );
    process.exit(0);
  }
  throw error;
}

validateArtifact(JSON.parse(canonicalBytes.toString("utf8")), "canonical artifact");

if (shouldSync) {
  await copyFile(canonical, checkedCopy);
  console.log(`Synced ${checkedCopy} byte-for-byte from ${canonical}`);
  process.exit(0);
}

const byteEqual = localBytes.equals(canonicalBytes);
const valueEqual =
  JSON.stringify(JSON.parse(localBytes.toString("utf8"))) ===
  JSON.stringify(JSON.parse(canonicalBytes.toString("utf8")));
if (!byteEqual || !valueEqual) {
  console.error(
    "FAIL artifact check: checked copy differs from the canonical sibling artifact. Run npm run sync:mem01session-artifact.",
  );
  process.exit(1);
}

console.log("PASS artifact check: checked copy has byte and value equality with canonical sibling.");
