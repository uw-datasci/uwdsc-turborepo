/**
 * Vercel deployment processor - Validates deployment and gathers information
 */

const {
  extractDeploymentFromEvent,
  isSuccessfulVercelDeployment,
  findPullRequestByRef,
  getCommitInfo,
} = require("./vercel-utils.js");
const { createDeploymentInfo } = require("./discord-notification.js");

/**
 * Processes Vercel deployment and determines if notification should be sent
 * @param {Object} github - GitHub API instance
 * @param {Object} context - GitHub context
 * @returns {Promise<Object>} Processing result with shouldNotify flag and deploymentInfo
 */
async function main(github, context) {
  try {
    console.log("🚀 Processing Vercel deployment...");

    // Extract deployment info from event
    const deploymentInfo = extractDeploymentFromEvent(context);
    console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));

    // Check if this is a successful Vercel deployment
    if (!isSuccessfulVercelDeployment(deploymentInfo)) {
      console.log("❌ This is not a successful Vercel deployment, skipping...");
      return { shouldNotify: false };
    }

    console.log("✅ Successful Vercel deployment detected");

    // Find associated PR
    const pr = await findPullRequestByRef(github, context, deploymentInfo.ref);
    if (!pr) {
      console.log("❌ No associated PR found, skipping notification...");
      return { shouldNotify: false };
    }

    console.log(`✅ Found associated PR #${pr.number}: ${pr.title}`);

    // Get commit information
    const commitInfo = await getCommitInfo(github, context, deploymentInfo.ref);
    console.log(
      `✅ Retrieved commit info: ${commitInfo.sha?.substring(0, 7) || "unknown"}`
    );

    // Create deployment info for Discord
    const discordInfo = createDeploymentInfo(
      pr,
      deploymentInfo.deploymentUrl,
      commitInfo
    );

    return {
      shouldNotify: true,
      deploymentInfo: discordInfo,
    };
  } catch (error) {
    console.error("❌ Error processing Vercel deployment:", error);
    return {
      shouldNotify: false,
      error: error.message,
    };
  }
}

module.exports = {
  main,
};
