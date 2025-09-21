/**
 * Discord notification utilities for Vercel deployments
 */

/**
 * Creates a rich Discord embed for Vercel preview deployment
 * @param {Object} deploymentInfo - Deployment information
 * @param {string} deploymentInfo.prNumber - Pull request number
 * @param {string} deploymentInfo.prTitle - Pull request title
 * @param {string} deploymentInfo.prUrl - Pull request URL
 * @param {string} deploymentInfo.prAuthor - PR author username
 * @param {string} deploymentInfo.prAuthorAvatar - PR author avatar URL
 * @param {string} deploymentInfo.branchName - Branch name
 * @param {string} deploymentInfo.deploymentUrl - Vercel deployment URL
 * @param {string} deploymentInfo.commitMessage - Latest commit message
 * @param {string} deploymentInfo.commitSha - Short commit SHA
 * @returns {Object} Discord embed object
 */
function createDiscordEmbed(deploymentInfo) {
  const embed = {
    title: "🚀 Preview Deployment Ready",
    description: `**${deploymentInfo.prTitle}**`,
    color: 0x00d4aa, // Vercel green
    fields: [
      {
        name: "📋 Pull Request",
        value: `[#${deploymentInfo.prNumber}](${deploymentInfo.prUrl})`,
        inline: true,
      },
      {
        name: "🌿 Branch",
        value: `\`${deploymentInfo.branchName}\``,
        inline: true,
      },
      {
        name: "👤 Author",
        value: `@${deploymentInfo.prAuthor}`,
        inline: true,
      },
    ],
    author: {
      name: deploymentInfo.prAuthor,
      icon_url: deploymentInfo.prAuthorAvatar,
    },
    timestamp: new Date().toISOString(),
    footer: {
      text: "Vercel Preview Deployment",
      icon_url: "https://vercel.com/favicon.ico",
    },
  };

  // Add commit info if available
  if (deploymentInfo.commitMessage && deploymentInfo.commitSha) {
    embed.fields.push({
      name: "📝 Latest Commit",
      value: `\`${deploymentInfo.commitSha}\` ${deploymentInfo.commitMessage}`,
      inline: false,
    });
  }

  // Add deployment link
  embed.fields.push({
    name: "🔗 Preview Link",
    value: `[View Deployment](${deploymentInfo.deploymentUrl})`,
    inline: false,
  });

  return embed;
}

/**
 * Sends a notification to Discord webhook
 * @param {string} webhookUrl - Discord webhook URL
 * @param {Object} deploymentInfo - Deployment information object
 * @returns {Promise<void>}
 */
async function sendDiscordNotification(webhookUrl, deploymentInfo) {
  if (!webhookUrl) {
    throw new Error("Discord webhook URL is required");
  }

  const embed = createDiscordEmbed(deploymentInfo);
  const payload = {
    embeds: [embed],
  };

  console.log("Sending Discord notification...");
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Discord webhook failed (${response.status}): ${errorText}`
    );
  }

  console.log("Discord notification sent successfully!");
}


module.exports = {
  createDiscordEmbed,
  sendDiscordNotification,
};
