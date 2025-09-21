/**
 * Vercel deployment utilities for GitHub Actions
 */

/**
 * Gets commit information for a given ref
 * @param {Object} github - GitHub API instance
 * @param {Object} context - GitHub context
 * @param {string} ref - Git reference
 * @returns {Promise<Object>} Commit information
 */
async function getCommitInfo(github, context, ref) {
  try {
    console.log(`Getting commit info for ref: ${ref}`);

    const { data: commit } = await github.rest.repos.getCommit({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: ref,
    });

    return {
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author,
    };
  } catch (error) {
    console.error("Error getting commit info:", error.message);
    return {};
  }
}

/**
 * Extracts deployment info from GitHub deployment_status event
 * @param {Object} context - GitHub context from deployment_status event
 * @returns {Object} Deployment information
 */
function extractDeploymentFromEvent(context) {
  const deployment = context.payload.deployment;
  const deploymentStatus = context.payload.deployment_status;

  return {
    ref: deployment.ref,
    deploymentUrl: deploymentStatus.environment_url,
    state: deploymentStatus.state,
    deployment: deployment,
    status: deploymentStatus,
  };
}

/**
 * Checks if deployment is a successful Vercel preview deployment
 * @param {Object} deploymentInfo - Deployment info from extractDeploymentFromEvent
 * @returns {boolean} True if it's a successful Vercel deployment
 */
function isSuccessfulVercelDeployment(deploymentInfo) {
  const isSuccess = deploymentInfo.state === "success";
  const hasUrl =
    deploymentInfo.deploymentUrl && deploymentInfo.deploymentUrl !== "";

  // Check if it's likely a Vercel deployment
  const isVercel =
    deploymentInfo.deployment.creator?.login === "vercel[bot]" ||
    deploymentInfo.deployment.environment?.includes("Preview") ||
    deploymentInfo.deploymentUrl?.includes("vercel.app");

  return isSuccess && hasUrl && isVercel;
}

module.exports = {
  getCommitInfo,
  extractDeploymentFromEvent,
  isSuccessfulVercelDeployment,
};
