/**
 * Vercel Deployment Validator - Validates Vercel deployment status and constructs deployment URL
 */

const {
  extractDeploymentFromEvent,
  isSuccessfulVercelDeployment,
  getCommitInfo,
} = require("./vercel-utils.js");

// Constants for URL construction
const PROJECT_NAME = "uwdsc-website-v3-cxc";
const TEAM_SLUG = "uwdsc";

/**
 * Sanitizes branch name for URL construction
 * @param {string} branchName - Raw branch name
 * @returns {string} Sanitized branch name safe for URLs
 */
function sanitizeBranchName(branchName) {
  if (!branchName) return "";

  // Remove refs/heads/ prefix if present
  const cleanBranch = branchName.replace(/^refs\/heads\//, "");

  // Replace special characters with hyphens and convert to lowercase
  return cleanBranch
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Constructs Vercel deployment URL using the standard format
 * @param {string} projectName - Vercel project name
 * @param {string} branchName - Git branch name
 * @param {string} teamSlug - Vercel team slug
 * @returns {string} Constructed deployment URL
 */
function constructDeploymentUrl(projectName, branchName, teamSlug) {
  const sanitizedBranch = sanitizeBranchName(branchName);
  return `https://${projectName}-git-${sanitizedBranch}-${teamSlug}.vercel.app`;
}

/**
 * Validates Vercel deployment and extracts deployment information
 * @param {Object} github - GitHub API instance
 * @param {Object} context - GitHub context
 * @returns {Promise<Object>} Result with shouldNotify flag and deployment info
 */
async function main(github, context) {
  try {
    console.log("🚀 Validating Vercel deployment...");

    // Extract deployment info from event
    const deploymentInfo = extractDeploymentFromEvent(context);
    console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));

    // Check if this is a successful Vercel deployment
    if (!isSuccessfulVercelDeployment(deploymentInfo)) {
      console.log("❌ This is not a successful Vercel deployment, skipping...");
      return {
        shouldNotify: false,
        reason: "not_successful_vercel_deployment",
        deploymentState: deploymentInfo.state,
      };
    }

    console.log("✅ Successful Vercel deployment detected");

    // Construct the deployment URL using the standard format
    const constructedUrl = constructDeploymentUrl(
      PROJECT_NAME,
      deploymentInfo.ref,
      TEAM_SLUG
    );
    console.log(`🔗 Constructed deployment URL: ${constructedUrl}`);

    // Get commit information
    const commitInfo = await getCommitInfo(github, context, deploymentInfo.ref);
    console.log(
      `✅ Retrieved commit info: ${commitInfo.sha?.substring(0, 7) || "unknown"}`
    );

    return {
      shouldNotify: true,
      deploymentInfo: {
        url: constructedUrl,
        ref: deploymentInfo.ref,
        state: deploymentInfo.state,
        commitSha: commitInfo.sha?.substring(0, 7) || "",
        commitMessage: commitInfo.message?.split("\n")[0] || "", // First line only
        commitAuthor: commitInfo.author,
      },
    };
  } catch (error) {
    console.error("❌ Error validating Vercel deployment:", error);
    return {
      shouldNotify: false,
      reason: "validation_error",
      error: error.message,
    };
  }
}

module.exports = {
  main,
};
