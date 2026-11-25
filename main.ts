// One-Liner Laugh Lab — writes our single funny line to /output/entry.txt.
//
// The entry is one line of text held in the repo's entry.txt. This program
// copies that line to the output path unchanged, so the graded artifact is
// exactly the line we wrote, byte for byte, on every run.
//
// Nothing here touches the network, reads an environment secret, or pulls
// in a dependency: the whole entry is the copy below plus its check.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");
const outputPath = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
copyFileSync(sourcePath, outputPath);

// Read the output back and compare it with the source, so a short or
// corrupted copy fails loudly instead of quietly entering the wrong text.
// The gate allows 1 to 200 characters, so even one stray byte matters.
const written = readFileSync(outputPath);
const source = readFileSync(sourcePath);
if (!written.equals(source)) {
  console.error("entry.txt check failed: /output/entry.txt differs from entry.txt");
  process.exit(1);
}

console.log(`wrote ${written.length} bytes to ${outputPath}`);
