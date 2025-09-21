/**
 * Vercel Deployment Validator - Validates Vercel deployment status and extracts info
 */

const {
  extractDeploymentFromEvent,
  isSuccessfulVercelDeployment,
  getCommitInfo,
} = require("./vercel-utils.js");

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

    // Get commit information
    const commitInfo = await getCommitInfo(github, context, deploymentInfo.ref);
    console.log(
      `✅ Retrieved commit info: ${commitInfo.sha?.substring(0, 7) || "unknown"}`
    );

    return {
      shouldNotify: true,
      deploymentInfo: {
        url: deploymentInfo.deploymentUrl,
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
