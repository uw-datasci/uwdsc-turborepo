const { execSync } = require("node:child_process");
const fs = require("node:fs");
const crypto = require("node:crypto");
const path = require("node:path");

// --- Config ---
const WORKFLOW_FILENAME = "fetch-secrets.yml";

// Define where the secrets go
const TARGETS = {
  web: path.join("apps", "web", ".env.local"),
  cxc: path.join("apps", "cxc", ".env.local"),
};

console.log("🔒 Turborepo Secret Fetcher");
console.log("--------------------------------");

try {
  // 1. Auth Check
  try {
    execSync("gh auth status", { stdio: "ignore" });
  } catch (e) {
    console.error("❌ Error: Please run: gh auth login", e.message);
    process.exit(1);
  }

  // 2. Generate Passphrase
  const passphrase = crypto.randomBytes(32).toString("hex");

  console.log(`🚀 Triggering Workflow`);
  const triggerCmd = `gh workflow run ${WORKFLOW_FILENAME} -f encryption_passphrase="${passphrase}"`;
  execSync(triggerCmd);

  // 3. Find Run ID
  console.log("⏳ Waiting for workflow to start...");
  let runId = null;
  // Retry loop to find the run ID
  for (let i = 0; i < 8; i++) {
    execSync(
      process.platform === "win32"
        ? "powershell -c Start-Sleep -Seconds 2"
        : "sleep 2"
    );

    const jsonOut = execSync(
      `gh run list --workflow=${WORKFLOW_FILENAME} --limit 1 --json databaseId,status`,
      { encoding: "utf8" }
    );
    const runs = JSON.parse(jsonOut);

    if (
      runs.length > 0 &&
      (runs[0].status === "queued" || runs[0].status === "in_progress")
    ) {
      runId = runs[0].databaseId;
      break;
    }
  }

  if (!runId) throw new Error("Could not find the workflow run.");

  console.log(`👀 Watching run ID: ${runId}`);
  execSync(`gh run watch ${runId}`, { stdio: "inherit" });

  // 4. Download
  console.log("📥 Downloading bundle...");
  const artifactName = `encrypted-secrets-${runId}`;
  execSync(`gh run download ${runId} -n ${artifactName} --dir .temp_secrets`, {
    stdio: "ignore",
  });

  // 5. Decrypt
  console.log("qh Decrypting...");
  const encryptedPath = path.join(".temp_secrets", "secrets.enc");
  const fileBuffer = fs.readFileSync(encryptedPath);

  // OpenSSL Decryption Logic (Salted__ header handling)
  const salt = fileBuffer.subarray(8, 16);
  const encryptedContent = fileBuffer.subarray(16);
  const keyLen = 32;
  const ivLen = 16;

  const derivedKey = crypto.pbkdf2Sync(
    passphrase,
    salt,
    10000,
    keyLen + ivLen,
    "sha256"
  );
  const key = derivedKey.subarray(0, keyLen);
  const iv = derivedKey.subarray(keyLen, keyLen + ivLen);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decryptedBuffer = Buffer.concat([
    decipher.update(encryptedContent),
    decipher.final(),
  ]);

  // 6. Parse and Distribute
  console.log("📂 Distributing secrets to apps...");
  const secretsObj = JSON.parse(decryptedBuffer.toString());

  // Write Web Secrets
  if (secretsObj.web) {
    const webDir = path.dirname(TARGETS.web);
    if (!fs.existsSync(webDir)) fs.mkdirSync(webDir, { recursive: true });
    fs.writeFileSync(TARGETS.web, secretsObj.web);
    console.log(`   ✅ Wrote ${TARGETS.web}`);
  }

  // Write CXC Secrets
  if (secretsObj.cxc) {
    const cxcDir = path.dirname(TARGETS.cxc);
    if (!fs.existsSync(cxcDir)) fs.mkdirSync(cxcDir, { recursive: true });
    fs.writeFileSync(TARGETS.cxc, secretsObj.cxc);
    console.log(`   ✅ Wrote ${TARGETS.cxc}`);
  }

  // 7. Cleanup
  fs.rmSync(".temp_secrets", { recursive: true, force: true });
  console.log("✨ All done.");
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
