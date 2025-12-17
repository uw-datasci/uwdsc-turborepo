#!/usr/bin/env node

import { spawn } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the component name from command line arguments
const componentName = process.argv[2];

if (!componentName) {
  console.error("❌ Error: Please specify a component name");
  console.log("Usage: npm run ui:add <component-name>");
  console.log("Example: npm run ui:add button");
  process.exit(1);
}

// Change to packages/ui directory
const uiDir = join(__dirname, "..", "packages", "ui");

console.log(`🔧 Adding shadcn component: ${componentName}`);
console.log(`📁 Working directory: ${uiDir}`);

// Run the shadcn command
const child = spawn("pnpm", ["dlx", "shadcn@canary", "add", componentName], {
  cwd: uiDir,
  stdio: "inherit",
  shell: true,
});

child.on("error", (error) => {
  console.error("❌ Error running command:", error.message);
  process.exit(1);
});

child.on("exit", (code) => {
  if (code === 0) {
    console.log(`✅ Successfully added ${componentName} component!`);
  } else {
    console.error(`❌ Command failed with exit code ${code}`);
    process.exit(code);
  }
});
