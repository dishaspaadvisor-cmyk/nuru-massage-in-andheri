import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");
const fallbackImage = "/spa-images/spa-gallery-001.jpg";

function imageExists(src) {
  if (!src.startsWith("/spa-images/")) return true;
  return fs.existsSync(path.join(root, "public", src.replace(/^\//, "")));
}

function replaceMissingImages(value) {
  if (typeof value === "string") {
    return value.startsWith("/spa-images/") && !imageExists(value) ? fallbackImage : value;
  }

  if (Array.isArray(value)) {
    return value.map(replaceMissingImages);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceMissingImages(item)]));
  }

  return value;
}

let replacements = 0;

for (const file of fs.readdirSync(dataDir).filter((item) => item.endsWith(".json"))) {
  const filePath = path.join(dataDir, file);
  const before = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(before);
  const afterData = replaceMissingImages(data);
  const after = `${JSON.stringify(afterData, null, 2)}\n`;

  const beforeMissing = before.match(/\/spa-images\/[^"]+/g)?.filter((src) => !imageExists(src)).length || 0;
  replacements += beforeMissing;

  if (after !== before) {
    fs.writeFileSync(filePath, after);
  }
}

console.log(`Applied fallback image to ${replacements} missing references.`);
