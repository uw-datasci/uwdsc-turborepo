# Deployment Guide - GitHub Pages Documentation

This guide explains how to deploy the documentation site to GitHub Pages.

## Overview

The documentation is built with Nextra and deployed as a static site to GitHub Pages using GitHub Actions.

## Prerequisites

- Repository hosted on GitHub
- GitHub Pages enabled for your repository
- GitHub Actions enabled

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. Save the settings

### 2. Configure Repository Permissions

GitHub Actions needs permission to deploy to Pages:

1. Go to **Settings** → **Actions** → **General**
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Check "Allow GitHub Actions to create and approve pull requests"
5. Click "Save"

### 3. Push Your Changes

The workflow is triggered automatically when you push to the `main` branch:

```bash
git add .
git commit -m "Add documentation site"
git push origin main
```

## GitHub Actions Workflow

The workflow file (`.github/workflows/deploy-docs.yml`) handles the build and deployment:

### Workflow Configuration

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main, github-pages-documentation]
  workflow_dispatch:  # Allows manual triggering

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    # Installs dependencies and builds the docs
  deploy:
    # Deploys to GitHub Pages
```

### Build Process

1. Checkout code
2. Setup pnpm and Node.js
3. Install dependencies (`pnpm install`)
4. Build documentation (`pnpm build:docs`)
5. Add `.nojekyll` file (disables Jekyll processing)
6. Upload build artifacts
7. Deploy to GitHub Pages

## Accessing Your Documentation

Once deployed, your documentation will be available at:

```
https://[username].github.io/uwdsc-website-v3/
```

Or for organizations:

```
https://[organization].github.io/uwdsc-website-v3/
```

## Manual Deployment

To manually trigger a deployment:

1. Go to **Actions** tab in GitHub
2. Select "Deploy Documentation" workflow
3. Click "Run workflow"
4. Select the branch
5. Click "Run workflow"

## Local Testing

Before deploying, test the production build locally:

```bash
# Build the documentation
pnpm build:docs

# The output will be in apps/docs/out/
# You can serve it locally with any static server

# Example with Python
cd apps/docs/out
python -m http.server 8000

# Or with npx serve
npx serve apps/docs/out
```

Then open http://localhost:8000 in your browser.

## Troubleshooting

### Build Fails

**Check the workflow logs:**

1. Go to **Actions** tab
2. Click on the failed workflow run
3. Expand the failed step to see error details

**Common issues:**

- **TypeScript errors**: Fix them locally with `pnpm lint` and `pnpm build:docs`
- **Missing dependencies**: Ensure `pnpm-lock.yaml` is committed
- **Module not found**: Check import paths

### 404 Errors on Deployed Site

**Issue**: Links work locally but not on GitHub Pages

**Solution**: Check `basePath` in `next.config.mjs`:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/uwdsc-website-v3' : '',
```

Make sure it matches your repository name.

### Images or Assets Not Loading

**Issue**: Assets return 404 errors

**Solution**: Check `assetPrefix` in `next.config.mjs`:

```javascript
assetPrefix: process.env.NODE_ENV === 'production' ? '/uwdsc-website-v3/' : '',
```

Note the trailing slash.

### Old Version Still Showing

**Issue**: Changes not reflecting on deployed site

**Solutions:**

1. **Clear browser cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check workflow status**: Ensure the deployment completed successfully
3. **Wait a few minutes**: GitHub Pages caching can take time to update

### Permission Denied During Deployment

**Issue**: Workflow fails with permission errors

**Solution:**

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select "Read and write permissions"
3. Enable "Allow GitHub Actions to create and approve pull requests"
4. Save and re-run the workflow

## Continuous Deployment

The documentation automatically deploys when you:

- Push to `main` branch
- Merge a pull request to `main`
- Manually trigger the workflow

### Branch Protection

To ensure quality:

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews
   - Require status checks to pass (select "build" check)
   - Require branches to be up to date

## Updating Documentation

### Adding New Pages

1. Create MDX file in `apps/docs/pages/`
2. Update `_meta.json` for navigation
3. Commit and push
4. Automatic deployment triggers

### Editing Existing Pages

1. Edit the MDX file
2. Test locally with `pnpm dev:docs`
3. Commit and push
4. Automatic deployment triggers

## Custom Domain (Optional)

To use a custom domain:

1. Add `CNAME` file in `apps/docs/public/`:
   ```
   docs.uwdsc.org
   ```

2. Update DNS records:
   - Add CNAME record pointing to `[username].github.io`

3. In GitHub **Settings** → **Pages**:
   - Enter your custom domain
   - Wait for DNS check to pass
   - Enable "Enforce HTTPS"

4. Update `next.config.mjs`:
   ```javascript
   basePath: '',  // Remove basePath for custom domain
   assetPrefix: '',
   ```

## Monitoring

### View Deployment Status

- **Actions tab**: See all workflow runs
- **Environments**: See deployment history
- **Pages settings**: See current deployment status

### Analytics

To add analytics:

1. Add tracking script to `theme.config.tsx`:
   ```tsx
   head: (
     <>
       {/* Your analytics script */}
       <script async src="https://..." />
     </>
   ),
   ```

## Best Practices

### ✅ Do

- Test builds locally before pushing
- Write clear documentation
- Use meaningful commit messages
- Keep documentation up to date
- Monitor workflow runs

### ❌ Don't

- Push broken builds to main
- Commit large binary files
- Ignore workflow failures
- Skip local testing

## Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Nextra Documentation](https://nextra.site/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

## Support

If you encounter issues:

1. Check workflow logs in Actions tab
2. Review this troubleshooting guide
3. Check Nextra documentation
4. Open an issue in the repository

---

**Deployment Status**: Check the [Actions tab](../../actions) for the latest deployment status.

