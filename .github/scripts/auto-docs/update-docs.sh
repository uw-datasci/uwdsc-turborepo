#!/bin/bash
set -e

# Get the PR head SHA from environment variable or first argument
PR_SHA="${PR_HEAD_SHA:-$1}"
SEMESTER_TAG="${SEMESTER_TAG:-}"
PR_NUMBER="${PR_NUMBER:-}"
PR_TITLE="${PR_TITLE:-}"

if [ -z "$PR_SHA" ]; then
  echo "Error: PR_HEAD_SHA environment variable or PR SHA argument is required"
  exit 1
fi

# Generate diff file
git diff --name-only origin/main...$PR_SHA > changes.diff

# Determine changelog file based on semester tag
CHANGELOG_FILE=""
if [ -n "$SEMESTER_TAG" ]; then
  CHANGELOG_FILE="apps/docs/pages/changelog/${SEMESTER_TAG}/index.mdx"
  echo "Semester tag found: $SEMESTER_TAG"
  echo "Will update changelog: $CHANGELOG_FILE"
else
  echo "No semester tag found. Will update general documentation only."
fi

# Build the prompt for copilot
PROMPT="You are a technical writer focused on documenting features from a business/functional perspective.

Read the 'changes.diff' file to understand the latest code updates from PR #${PR_NUMBER}: ${PR_TITLE}."

if [ -n "$SEMESTER_TAG" ] && [ -f "$CHANGELOG_FILE" ]; then
  PROMPT="$PROMPT

CRITICAL: This PR is tagged with semester ${SEMESTER_TAG}. You MUST ONLY update the changelog file at: ${CHANGELOG_FILE}

DO NOT modify any other files in the documentation. The PR should show only ONE file changed: ${CHANGELOG_FILE}

## Changelog Structure Context

The changelog is organized by semester (F25, W26, S26, etc.) and each semester file has the following structure:

# [Semester] Updates

[Introduction paragraph]

## 🎯 Main Website (apps/web)
[Features for the main website app]

## 🏆 CxC App (apps/cxc)
[Features for the CxC competition app]

## 🎨 Design System (packages/ui)
[New UI components and design system updates]

## 🔧 Infrastructure
[Backend services, development tools, package updates]

## 🚀 DevOps & CI/CD
[CI/CD workflows, deployment improvements, development workflow enhancements]

---

_Features documented from merged PRs tagged with \`${SEMESTER_TAG}\`..._

## Instructions for Updating the Changelog

1. **Focus on business value**: Document WHAT was built and WHY it matters to users/admins, NOT technical implementation details
2. **Use business language**: Write in terms like 'Users can now...', 'Admins can...', 'Added feature X that allows Y'
3. **Group by section**: Add features to the appropriate main section (Main Website, CxC App, Design System, Infrastructure, DevOps)
4. **Format as bullet points**: Use markdown bullet points (-) for each feature
5. **Maintain structure**: Keep the existing section headings and formatting
6. **Add, don't remove**: Only add new features, do NOT remove or modify existing content
7. **One feature per bullet**: Each feature should be a separate bullet point
8. **Be concise**: Keep descriptions brief and focused on user impact

## Example Format

- **Feature Name**: Brief description of what users/admins can now do or what was improved

Do not ask for confirmation. Just make the edits to ${CHANGELOG_FILE} only."
else
  PROMPT="$PROMPT

Scan the '/apps/docs' folder and update the markdown files to reflect these code changes."
fi

PROMPT="$PROMPT

Do not ask for confirmation. Just make the edits."

# Run copilot to update docs
# copilot -p "$PROMPT" --allow-fs-read --allow-fs-write
copilot -p "update README.md in the root directory to test that this workflow works" --allow-fs-read --allow-fs-write

