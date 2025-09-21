/**
 * Discord notification sender - Sends Discord notifications for deployments
 */

const { sendDiscordNotification } = require("./discord-notification.js");

/**
 * Sends Discord notification for deployment
 * @param {Object} core - GitHub Actions core utilities
 * @param {Object} deploymentInfo - Deployment information from processor
 * @returns {Promise<void>}
 */
async function main(core, deploymentInfo) {
  try {
    console.log("📤 Sending Discord notification...");

    // Get Discord webhook URL from environment
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      core.setFailed("❌ DISCORD_WEBHOOK_URL secret is not set");
      return;
    }

    // Send Discord notification
    await sendDiscordNotification(webhookUrl, deploymentInfo);
    console.log("✅ Discord notification sent successfully!");
  } catch (error) {
    console.error("❌ Error sending Discord notification:", error);
    core.setFailed(`Failed to send Discord notification: ${error.message}`);
  }
}

module.exports = {
  main,
};
