/**
 * Alternative methods to extract the exact Vercel public URL
 */

/**
 * Method 1: Check all available URL properties in deployment status
 * @param {Object} deploymentInfo - Deployment info from extractDeploymentFromEvent
 * @returns {string|null} Public URL if found
 */
function extractUrlFromDeploymentProperties(deploymentInfo) {
  console.log("🔍 Checking all URL properties in deployment...");

  const urls = {
    environment_url: deploymentInfo.status?.environment_url,
    target_url: deploymentInfo.status?.target_url,
    log_url: deploymentInfo.status?.log_url,
  };

  console.log("Available URLs:", JSON.stringify(urls, null, 2));

  // Check if target_url or log_url contains the public URL
  for (const [key, url] of Object.entries(urls)) {
    if (url && url.includes("vercel.app") && !url.includes("jy3899xud")) {
      console.log(`✅ Found public URL in ${key}: ${url}`);
      return url;
    }
  }

  return null;
}

/**
 * Method 2: Extract URL from Vercel bot PR comments
 * @param {Object} github - GitHub API instance
 * @param {Object} context - GitHub context
 * @param {Object} pr - Pull request object
 * @returns {Promise<string|null>} Public URL if found in comments
 */
async function extractUrlFromVercelComments(github, context, pr) {
  try {
    console.log(`🔍 Searching Vercel bot comments in PR #${pr.number}...`);

    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pr.number,
    });

    console.log(`Found ${comments.length} comments to check`);

    for (const comment of comments) {
      // Check if comment is from Vercel bot
      if (comment.user.login === "vercel[bot]") {
        console.log("📝 Found Vercel bot comment");

        // Look for preview URLs in the comment body
        const urlMatches = comment.body.match(
          /https:\/\/[^-\s]+-(cxc-)?git-[^-\s]+-[^-\s]+\.vercel\.app[^\s)]*/g
        );

        if (urlMatches && urlMatches.length > 0) {
          // Prefer URLs with 'cxc' in them, otherwise take the first one
          const cxcUrl = urlMatches.find((url) => url.includes("cxc"));
          const selectedUrl = cxcUrl || urlMatches[0];

          console.log(`✅ Found Vercel preview URL in comment: ${selectedUrl}`);
          console.log(`   All found URLs: ${urlMatches.join(", ")}`);

          return selectedUrl;
        }
      }
    }

    console.log("❌ No Vercel preview URL found in bot comments");
    return null;
  } catch (error) {
    console.error("Error extracting URL from comments:", error.message);
    return null;
  }
}

/**
 * Method 3: Extract URL from GitHub commit statuses/checks
 * @param {Object} github - GitHub API instance
 * @param {Object} context - GitHub context
 * @param {string} commitSha - Commit SHA
 * @returns {Promise<string|null>} Public URL if found in statuses
 */
async function extractUrlFromCommitStatuses(github, context, commitSha) {
  try {
    console.log(
      `🔍 Searching commit statuses for ${commitSha.substring(0, 7)}...`
    );

    const { data: statuses } = await github.rest.repos.listCommitStatusesForRef(
      {
        owner: context.repo.owner,
        repo: context.repo.repo,
        ref: commitSha,
      }
    );

    console.log(`Found ${statuses.length} statuses to check`);

    for (const status of statuses) {
      if (
        status.context?.includes("vercel") ||
        status.creator?.login === "vercel[bot]"
      ) {
        console.log(`📊 Found Vercel status: ${status.context}`);

        if (status.target_url && status.target_url.includes("vercel.app")) {
          // Check if it's a public URL (not internal)
          if (!status.target_url.includes("jy3899xud")) {
            console.log(`✅ Found public URL in status: ${status.target_url}`);
            return status.target_url;
          }
        }
      }
    }

    // Also check check runs
    const { data: checkRuns } = await github.rest.checks.listForRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: commitSha,
    });

    console.log(`Found ${checkRuns.check_runs.length} check runs to examine`);

    for (const check of checkRuns.check_runs) {
      if (check.app?.slug === "vercel") {
        console.log(`📋 Found Vercel check run: ${check.name}`);

        if (check.details_url && check.details_url.includes("vercel.app")) {
          if (!check.details_url.includes("jy3899xud")) {
            console.log(
              `✅ Found public URL in check run: ${check.details_url}`
            );
            return check.details_url;
          }
        }
      }
    }

    console.log("❌ No Vercel preview URL found in statuses/checks");
    return null;
  } catch (error) {
    console.error("Error extracting URL from statuses:", error.message);
    return null;
  }
}

/**
 * Master function to try all methods to extract the exact public URL
 * @param {Object} github - GitHub API instance
 * @param {Object} context - GitHub context
 * @param {Object} deploymentInfo - Deployment info
 * @param {Object} pr - Pull request object
 * @returns {Promise<string>} Public URL (extracted or constructed as fallback)
 */
async function extractExactVercelUrl(github, context, deploymentInfo, pr) {
  console.log("🎯 Attempting to extract exact Vercel public URL...");

  // Method 1: Check deployment properties
  const urlFromProperties = extractUrlFromDeploymentProperties(deploymentInfo);
  if (urlFromProperties) {
    return urlFromProperties;
  }

  // Method 2: Check Vercel bot comments
  if (pr) {
    const urlFromComments = await extractUrlFromVercelComments(
      github,
      context,
      pr
    );
    if (urlFromComments) {
      return urlFromComments;
    }

    // Method 3: Check commit statuses/checks
    const urlFromStatuses = await extractUrlFromCommitStatuses(
      github,
      context,
      pr.head.sha
    );
    if (urlFromStatuses) {
      return urlFromStatuses;
    }
  }

  console.log(
    "⚠️ Could not extract exact URL, falling back to construction method"
  );

  // Fallback to construction method
  const { constructVercelPreviewUrl } = require("./vercel-utils.js");
  return constructVercelPreviewUrl(deploymentInfo.deployment, pr?.head?.ref);
}

module.exports = {
  extractExactVercelUrl,
  extractUrlFromVercelComments,
  extractUrlFromCommitStatuses,
  extractUrlFromDeploymentProperties,
};
