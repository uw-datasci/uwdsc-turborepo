/**
 * Discord Notification Sender - Combines PR and deployment info to send Discord notification
 */

const { createDeploymentInfo } = require("./discord-notification.js");

/**
 * Creates deployment info object from separated PR and deployment data
 * @param {Object} prInfo - PR information from CXC checker
 * @param {Object} deploymentInfo - Deployment information from validator
 * @returns {Object} Combined deployment info for Discord
 */
function combineDeploymentInfo(prInfo, deploymentInfo) {
  return {
    prNumber: prInfo.number,
    prTitle: prInfo.title,
    prUrl: prInfo.url,
    prAuthor: prInfo.author,
    prAuthorAvatar: prInfo.authorAvatar,
    branchName: prInfo.branchName,
    deploymentUrl: deploymentInfo.url,
    commitMessage: deploymentInfo.commitMessage,
    commitSha: deploymentInfo.commitSha,
  };
}

/**
 * Main function to send Discord notification
 * @param {Object} core - GitHub Actions core
 * @param {Object} prInfo - PR information from job 1
 * @param {Object} deploymentInfo - Deployment information from job 2
 * @returns {Promise<void>}
 */
async function main(core, prInfo, deploymentInfo) {
  try {
    console.log("🚀 Sending Discord notification...");

    // Combine the data from both jobs
    const combinedInfo = combineDeploymentInfo(prInfo, deploymentInfo);
    console.log("Combined info:", JSON.stringify(combinedInfo, null, 2));

    // Import discord sender (dynamic import to avoid circular dependencies)
    const { main: sendDiscord } = require("./discord-sender.js");

    // Send the notification
    await sendDiscord(core, combinedInfo);

    console.log("✅ Discord notification sent successfully!");
  } catch (error) {
    console.error("❌ Error sending Discord notification:", error);
    throw error;
  }
}

module.exports = {
  main,
};
