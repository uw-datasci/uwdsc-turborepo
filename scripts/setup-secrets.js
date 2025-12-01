const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const APPS = [
  { name: "web", infisicalPath: "/web" },
  { name: "cxc", infisicalPath: "/cxc" },
];

try {
  const rootDir = path.join(__dirname, "..");
  const configPath = path.join(rootDir, ".infisical.json");

  // 1. INIT: Run 'infisical init' if config is missing
  if (!fs.existsSync(configPath)) {
    console.log("🔧 Configuration missing. Running 'infisical init'...");
    execSync("infisical init", { cwd: rootDir, stdio: "inherit" });
  }

  // 2. GET PROJECT ID: Try Env Var -> Then try reading local file
  let projectId = process.env.INFISICAL_PROJECT_ID;
  if (!projectId && fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
      projectId = config.workspaceId || config.projectId;
    } catch (e) {
      console.error("Error parsing .infisical.json:", e);
    }
  }

  // 3. AUTHENTICATE: Try Machine Auth first, fallback to User
  let machineAuthSuccess = false;

  if (process.env.INFISICAL_CLIENT_ID && process.env.INFISICAL_CLIENT_SECRET) {
    console.log("🤖 Authenticating Machine Identity...");
    try {
      // Use 'pipe' for stdio so we can catch errors silently without crashing
      const token = execSync(
        `infisical login --method=universal-auth --client-id="${process.env.INFISICAL_CLIENT_ID}" --client-secret="${process.env.INFISICAL_CLIENT_SECRET}" --silent --plain`,
        { encoding: "utf8", stdio: "pipe" }
      ).trim();

      process.env.INFISICAL_TOKEN = token;
      machineAuthSuccess = true;
      console.log("✅ Machine Login Successful.");
    } catch (error) {
      console.warn(
        "⚠️ Machine Authentication failed. Falling back to User Login...",
        error
      );
    }
  }

  // If Machine Auth didn't run or failed, check User Session
  if (!machineAuthSuccess) {
    try {
      // Check if user is already logged in
      execSync("infisical secrets list --plain", { stdio: "ignore" });
    } catch {
      console.log("🔑 User login required...");
      execSync("infisical login", { stdio: "inherit" });
    }
  }

  // 4. EXPORT SECRETS
  const projectFlag = projectId ? `--projectId="${projectId}"` : "";

  APPS.forEach(({ name, infisicalPath }) => {
    const targetDir = path.join(rootDir, "apps", name);
    const targetFile = path.join(targetDir, ".env.local");

    if (!fs.existsSync(targetDir))
      return console.warn(`⚠️  Skipping ${name} (folder missing)`);

    console.log(`⚡ Syncing ${name}...`);
    const secrets = execSync(
      `infisical export --path="${infisicalPath}" --format=dotenv-export --env=dev ${projectFlag}`,
      { encoding: "utf8" }
    );

    fs.writeFileSync(targetFile, secrets);
    console.log(`   ✅ Updated .env.local`);
  });

  console.log("🎉 Secrets synced successfully!");
} catch (error) {
  // Print stdout if available (cleaner error), otherwise full message
  console.error("\n❌ Error:", error.stdout?.toString() || error.message);
  process.exit(1);
}
