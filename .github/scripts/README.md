# GitHub Actions Scripts

This directory contains modular JavaScript utilities for GitHub Actions workflows.

## 📁 Directory Structure

```
.github/scripts/
├── notifications/           # Discord & Vercel deployment notifications
│   ├── vercel-deployment-processor.js  # Deployment validation & processing
│   ├── discord-sender.js               # Discord notification sender
│   ├── discord-notification.js         # Discord webhook utilities
│   └── vercel-utils.js                 # Vercel deployment detection
└── project-management/      # Project automation & issue management
    ├── move-issues-to-review.js        # Moves linked issues to review
    ├── project-config.js               # Project configuration
    └── project-utils.js                # Project utilities
```

## 🚀 Notifications

### Discord Notifications for Vercel Deployments

- **Used by**: `vercel-preview-notification.yml`
- **Purpose**: Sends rich Discord embeds when Vercel preview deployments are ready
- **Setup**: Requires `DISCORD_WEBHOOK_URL` secret

**Files:**

- `vercel-deployment-processor.js` - Validates deployments and gathers PR information
- `discord-sender.js` - Sends Discord notifications for successful deployments
- `discord-notification.js` - Discord embed creation and webhook sending
- `vercel-utils.js` - Vercel deployment detection and GitHub API utilities

## 📋 Project Management

### Issue Management Automation

- **Used by**: `move-issue-to-review.yml`
- **Purpose**: Automatically moves linked issues to "In Review" when PR is opened

**Files:**

- `move-issues-to-review.js` - Main logic for moving issues
- `project-config.js` - Configuration for project automation
- `project-utils.js` - Shared utilities for project management

## 🔧 Usage in Workflows

### Import Paths

When requiring these scripts in workflows, use the main entry points:

```javascript
// For Vercel deployment notifications (two-step process)
// Step 1: Process deployment
const {
  main,
} = require("./.github/scripts/notifications/vercel-deployment-processor.js");
return await main(github, context);

// Step 2: Send notification (conditional)
const { main } = require("./.github/scripts/notifications/discord-sender.js");
await main(core, deploymentInfo);

// For project management (single step)
const {
  main,
} = require("./.github/scripts/project-management/move-issues-to-review.js");
await main(github, context);
```

All workflows follow clean patterns with minimal JavaScript in the workflow files.

## 📝 Contributing

When adding new scripts:

1. Place them in the appropriate subdirectory based on functionality
2. Update this README with documentation
3. Follow the established error handling and logging patterns
4. Include JSDoc comments for all functions
