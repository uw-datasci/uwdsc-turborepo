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
 * Finds PR from the deployment event
 * @param {Object} github - GitHub API instance
 * @param {Object} context - GitHub context
 * @returns {Promise<Object|null>} PR object or null if not found
 */
async function findPullRequestFromDeployment(github, context) {
  try {
    const deploymentRef = context.payload.deployment?.ref;
    if (!deploymentRef) {
      console.log("❌ No deployment ref found");
      return null;
    }

    console.log(`🔍 Looking for PR with deployment ref: ${deploymentRef}`);

    // First, try to find PR by ref as a branch name
    try {
      const { data: pulls } = await github.rest.pulls.list({
        owner: context.repo.owner,
        repo: context.repo.repo,
        head: `${context.repo.owner}:${deploymentRef}`,
        state: "open",
      });

      if (pulls.length > 0) {
        const pr = pulls[0];
        console.log(`✅ Found PR #${pr.number} by branch name: ${pr.title}`);
        return pr;
      }
    } catch (error) {
      console.log(
        "⚠️ Could not find PR by branch name, trying commit SHA method..."
      );
    }

    // If ref is a commit SHA, get all open PRs and find the one with matching head commit
    console.log(`🔍 Searching for PR with commit SHA: ${deploymentRef}`);

    const { data: allPulls } = await github.rest.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: "open",
    });

    console.log(`Found ${allPulls.length} open PRs to check`);

    for (const pr of allPulls) {
      // Check if the PR's head SHA matches the deployment ref
      if (
        pr.head.sha === deploymentRef ||
        pr.head.sha.startsWith(deploymentRef.substring(0, 7))
      ) {
        console.log(`✅ Found PR #${pr.number} by commit SHA: ${pr.title}`);
        console.log(`  PR head SHA: ${pr.head.sha}`);
        console.log(`  Deployment ref: ${deploymentRef}`);
        return pr;
      }
    }

    console.log("❌ No open PR found for this deployment");
    return null;
  } catch (error) {
    console.error("❌ Error finding PR:", error.message);
    return null;
  }
}

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

    // Find the associated PR to get the correct branch name
    const pr = await findPullRequestFromDeployment(github, context);
    if (!pr) {
      console.log("❌ No associated PR found, cannot construct deployment URL");
      return {
        shouldNotify: false,
        reason: "no_pr_found",
      };
    }

    // Use the branch name from the PR, not the deployment ref (which might be a commit SHA)
    const branchName = pr.head.ref;
    console.log(`🌿 Using branch name from PR: ${branchName}`);

    // Construct the deployment URL using the correct branch name
    const constructedUrl = constructDeploymentUrl(
      PROJECT_NAME,
      branchName,
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
        ref: branchName, // Use the branch name, not the commit SHA
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
