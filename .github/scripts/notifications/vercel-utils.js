/**
 * Vercel deployment utilities for GitHub Actions
 */

/**
 * Finds PR associated with a deployment ref
 * @param {Object} github - GitHub API instance
 * @param {Object} context - GitHub context
 * @param {string} ref - Git reference (branch name or commit SHA)
 * @returns {Promise<Object|null>} PR object or null if not found
 */
async function findPullRequestByRef(github, context, ref) {
  try {
    console.log(`Looking for PR with ref: ${ref}`);

    // First, try to find PR by ref as a branch name
    try {
      const { data: pulls } = await github.rest.pulls.list({
        owner: context.repo.owner,
        repo: context.repo.repo,
        head: `${context.repo.owner}:${ref}`,
        state: "open",
      });

      if (pulls.length > 0) {
        const pr = pulls[0];
        console.log(`Found PR #${pr.number} by branch name: ${pr.title}`);
        return pr;
      }
    } catch (error) {
      console.log(
        "Could not find PR by branch name, trying commit SHA method..."
      );
    }

    // If ref is a commit SHA, get all open PRs and find the one with matching head commit
    console.log(`Searching for PR with commit SHA: ${ref}`);

    const { data: allPulls } = await github.rest.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: "open",
    });

    console.log(`Found ${allPulls.length} open PRs to check`);

    for (const pr of allPulls) {
      // Check if the PR's head SHA matches the deployment ref
      if (pr.head.sha === ref || pr.head.sha.startsWith(ref.substring(0, 7))) {
        console.log(`Found PR #${pr.number} by commit SHA: ${pr.title}`);
        return pr;
      }
    }

    console.log("No open PR found for this deployment");
    return null;
  } catch (error) {
    console.error("Error finding PR:", error.message);
    return null;
  }
}

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
 * Constructs public Vercel preview URL from deployment info
 * @param {Object} deployment - Deployment object
 * @param {string} branchName - Branch name from PR
 * @returns {string} Public Vercel preview URL or fallback to environment_url
 */
function constructVercelPreviewUrl(deployment, branchName = null) {
  try {
    // Try to get repository info
    const repoUrl = deployment.repository_url;
    if (!repoUrl) return deployment.status?.environment_url;

    // Extract owner and repo from repository URL
    const repoMatch = repoUrl.match(/github\.com\/repos\/([^/]+)\/([^/]+)/);
    if (!repoMatch) return deployment.status?.environment_url;

    const [, owner, repo] = repoMatch;

    // If we have a branch name, construct the public Vercel URL
    if (branchName) {
      // Format: https://[project-name]-git-[branch-name]-[team].vercel.app
      // Clean branch name for URL (replace special chars with dashes)
      const cleanBranch = branchName
        .replace(/[^a-zA-Z0-9]/g, "-")
        .toLowerCase();

      // Construct the URL based on common Vercel patterns
      const possibleUrls = [
        `https://${repo}-cxc-git-${cleanBranch}-${owner}.vercel.app`,
        `https://${repo}-git-${cleanBranch}-${owner}.vercel.app`,
        `https://${repo}-${cleanBranch}.vercel.app`,
      ];

      console.log(
        `🔗 Attempting to construct Vercel preview URL for branch: ${branchName}`
      );
      console.log(`   Repository: ${owner}/${repo}`);
      console.log(`   Possible URLs: ${possibleUrls.join(", ")}`);

      // Return the first one (most likely for CXC app)
      return possibleUrls[0];
    }

    return deployment.status?.environment_url;
  } catch (error) {
    console.error("Error constructing Vercel preview URL:", error);
    return deployment.status?.environment_url;
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
    deploymentUrl: deploymentStatus.environment_url, // This will be updated later with PR info
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
  findPullRequestByRef,
  getCommitInfo,
  extractDeploymentFromEvent,
  isSuccessfulVercelDeployment,
  constructVercelPreviewUrl,
};
