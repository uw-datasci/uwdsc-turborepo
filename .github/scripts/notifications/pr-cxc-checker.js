/**
 * CXC Change Checker for PR Events - Determines if PR changes affect the CXC app
 */

// ========================================================================
// 📁 CXC APP FILTERING CONFIGURATION
// ========================================================================
// Modify the paths below to control which folders trigger CXC notifications
const CXC_RELATED_PATHS = [
  "apps/cxc/", // CXC app directory (main trigger)
  // Packages excluded - changes to packages won't trigger CXC notifications
];

// Paths that should be excluded from CXC notifications
const WEB_ONLY_PATHS = [
  "apps/web/", // Web app directory (main exclusion)
];

// Package paths that should not trigger CXC notifications
const EXCLUDED_PACKAGE_PATHS = [
  "packages/server/", // Shared server package
  "packages/ui/", // Shared UI package
  "packages/eslint-config/", // Shared ESLint configuration
  "packages/typescript-config/", // Shared TypeScript configuration
];

// Root-level files/folders that affect all apps (you can customize this behavior)
const GLOBAL_PATHS = [
  "package.json",
  "pnpm-lock.yaml",
  "turbo.json",
  ".github/",
  "README.md",
  "docs/",
];
// ========================================================================

/**
 * Checks if the PR changes affect the CXC app
 * @param {Object} github - GitHub API instance
 * @param {Object} context - GitHub context
 * @param {Object} pr - Pull request object (from context.payload.pull_request)
 * @returns {Promise<boolean>} True if changes affect CXC app
 */
async function isCxcRelatedPR(github, context, pr) {
  try {
    console.log("🔍 Checking if PR is CXC-related...");

    // Get list of files changed in the PR
    const { data: files } = await github.rest.pulls.listFiles({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pr.number,
    });

    console.log(`Found ${files.length} changed files in PR #${pr.number}`);

    // Categorize the changed files
    const cxcRelatedFiles = files.filter((file) =>
      CXC_RELATED_PATHS.some((path) => file.filename.startsWith(path))
    );

    const webOnlyFiles = files.filter(
      (file) =>
        WEB_ONLY_PATHS.some((path) => file.filename.startsWith(path)) &&
        !CXC_RELATED_PATHS.some((path) => file.filename.startsWith(path))
    );

    const excludedPackageFiles = files.filter(
      (file) =>
        EXCLUDED_PACKAGE_PATHS.some((path) => file.filename.startsWith(path)) &&
        !CXC_RELATED_PATHS.some((path) => file.filename.startsWith(path))
    );

    const globalFiles = files.filter(
      (file) =>
        GLOBAL_PATHS.some((path) => file.filename.startsWith(path)) &&
        !CXC_RELATED_PATHS.some((path) => file.filename.startsWith(path)) &&
        !WEB_ONLY_PATHS.some((path) => file.filename.startsWith(path)) &&
        !EXCLUDED_PACKAGE_PATHS.some((path) => file.filename.startsWith(path))
    );

    const otherFiles = files.filter(
      (file) =>
        !CXC_RELATED_PATHS.some((path) => file.filename.startsWith(path)) &&
        !WEB_ONLY_PATHS.some((path) => file.filename.startsWith(path)) &&
        !EXCLUDED_PACKAGE_PATHS.some((path) =>
          file.filename.startsWith(path)
        ) &&
        !GLOBAL_PATHS.some((path) => file.filename.startsWith(path))
    );

    // Log categorization for debugging
    console.log(`📊 File categorization:`);
    console.log(`  - CXC-related files: ${cxcRelatedFiles.length}`);
    console.log(`  - Web-only files: ${webOnlyFiles.length}`);
    console.log(`  - Excluded package files: ${excludedPackageFiles.length}`);
    console.log(`  - Global files: ${globalFiles.length}`);
    console.log(`  - Other files: ${otherFiles.length}`);

    if (cxcRelatedFiles.length > 0) {
      console.log("✅ Changes directly affect CXC app files");
      console.log(
        `  CXC files: ${cxcRelatedFiles.map((f) => f.filename).join(", ")}`
      );
      return true;
    }

    // If there are only web changes and no CXC changes, skip
    if (
      webOnlyFiles.length > 0 &&
      cxcRelatedFiles.length === 0 &&
      globalFiles.length === 0 &&
      otherFiles.length === 0
    ) {
      console.log("❌ Changes only affect web app, skipping CXC notification");
      console.log(
        `  Web-only files: ${webOnlyFiles.map((f) => f.filename).join(", ")}`
      );
      return false;
    }

    // If there are only excluded package changes and no CXC changes, skip
    if (
      excludedPackageFiles.length > 0 &&
      cxcRelatedFiles.length === 0 &&
      webOnlyFiles.length === 0 &&
      globalFiles.length === 0 &&
      otherFiles.length === 0
    ) {
      console.log(
        "❌ Changes only affect excluded packages, skipping CXC notification"
      );
      console.log(
        `  Excluded package files: ${excludedPackageFiles.map((f) => f.filename).join(", ")}`
      );
      return false;
    }

    // If there are only web and package changes (no CXC changes), skip
    if (
      (webOnlyFiles.length > 0 || excludedPackageFiles.length > 0) &&
      cxcRelatedFiles.length === 0 &&
      globalFiles.length === 0 &&
      otherFiles.length === 0
    ) {
      console.log(
        "❌ Changes only affect web app and/or excluded packages, skipping CXC notification"
      );
      console.log(
        `  Web-only files: ${webOnlyFiles.map((f) => f.filename).join(", ")}`
      );
      console.log(
        `  Excluded package files: ${excludedPackageFiles.map((f) => f.filename).join(", ")}`
      );
      return false;
    }

    // Handle global files - only proceed if there are CXC changes
    if (globalFiles.length > 0 && cxcRelatedFiles.length === 0) {
      console.log(
        "⚠️ Changes affect global configuration files, but no CXC changes found"
      );
      console.log(
        `  Global files: ${globalFiles.map((f) => f.filename).join(", ")}`
      );
      console.log("❌ Skipping CXC notification for global-only changes");
      return false;
    }

    // If there are other files that don't match any category
    if (otherFiles.length > 0) {
      console.log(
        "❓ Changes include unrecognized files, proceeding with caution"
      );
      console.log(
        `  Other files: ${otherFiles.map((f) => f.filename).join(", ")}`
      );
      return true; // Better to err on the side of sending notifications
    }

    console.log("❌ No relevant changes found for CXC notifications");
    return false;
  } catch (error) {
    console.error("❌ Error checking CXC relation:", error);
    // On error, default to true to avoid missing important notifications
    console.log(
      "⚠️ Error occurred, defaulting to sending notification for safety"
    );
    return true;
  }
}

/**
 * Main function to check if PR changes affect CXC app
 * @param {Object} github - GitHub API instance
 * @param {Object} context - GitHub context (pull_request event)
 * @returns {Promise<Object>} Result with shouldNotify flag and PR info
 */
async function main(github, context) {
  try {
    console.log("🚀 Checking CXC changes for PR...");

    // Get PR from context (directly available in pull_request events)
    const pr = context.payload.pull_request;
    if (!pr) {
      console.log("❌ No PR found in context");
      return {
        shouldNotify: false,
        reason: "no_pr_found",
      };
    }

    console.log(`📋 Found PR #${pr.number}: ${pr.title}`);

    // Check if this PR is related to CXC app
    const isCxcPR = await isCxcRelatedPR(github, context, pr);
    if (!isCxcPR) {
      console.log("❌ PR not related to CXC app, skipping...");
      return {
        shouldNotify: false,
        reason: "not_cxc_related",
      };
    }

    console.log("✅ Changes affect CXC app, should proceed with notification");

    return {
      shouldNotify: true,
      prInfo: {
        number: pr.number,
        title: pr.title,
        url: pr.html_url,
        author: pr.user.login,
        authorAvatar: pr.user.avatar_url,
        branchName: pr.head.ref,
      },
    };
  } catch (error) {
    console.error("❌ Error checking CXC changes:", error);
    return {
      shouldNotify: false,
      reason: "error",
      error: error.message,
    };
  }
}

module.exports = {
  main,
};
