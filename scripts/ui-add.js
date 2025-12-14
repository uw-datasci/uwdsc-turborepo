#!/usr/bin/env node

const { spawn } = require("node:child_process");
const path = require("node:path");

// Get the component name from command line arguments
const componentName = process.argv[2];

if (!componentName) {
  console.error("❌ Error: Please specify a component name");
  console.log("Usage: npm run ui:add <component-name>");
  console.log("Example: npm run ui:add button");
  process.exit(1);
}

// Change to packages/ui directory
const uiDir = path.join(__dirname, "..", "packages", "ui");

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
