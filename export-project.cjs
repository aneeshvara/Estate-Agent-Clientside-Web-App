const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = "project_dump.txt";

// Folders & files to ignore
const IGNORE = new Set([
  "node_modules",
  ".git",
  "build",
  "dist",
  ".next",
  ".cache",
  ".env",
  ".env.local"
]);

const TEXT_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".css",
  ".scss",
  ".json",
  ".html",
  ".md"
]);

let output = "";

// Generate file tree
function generateTree(dir, prefix = "") {
  const items = fs.readdirSync(dir);

  items.forEach((item, index) => {
    if (IGNORE.has(item)) return;

    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";

    output += `${prefix}${connector}${item}\n`;

    if (fs.statSync(fullPath).isDirectory()) {
      generateTree(fullPath, prefix + (isLast ? "    " : "│   "));
    }
  });
}

// Dump file contents
function dumpFiles(dir) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    if (IGNORE.has(item)) return;

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      dumpFiles(fullPath);
    } else if (TEXT_EXTENSIONS.has(path.extname(item))) {
      output += "\n\n";
      output += "========================================\n";
      output += `FILE: ${fullPath}\n`;
      output += "========================================\n\n";
      output += fs.readFileSync(fullPath, "utf8");
    }
  });
}

// Run
output += "PROJECT STRUCTURE\n";
output += "=================\n\n";
generateTree(process.cwd());

output += "\n\nSOURCE CODE FILES\n";
output += "=================\n";
dumpFiles(process.cwd());

fs.writeFileSync(OUTPUT_FILE, output, "utf8");
console.log(`✅ Project exported to ${OUTPUT_FILE}`);