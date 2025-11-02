# Deployment Guide

## Prerequisites
- Vercel account set up
- Vercel CLI installed (`npm i -g vercel`)
- GitHub repository created

## Step 1: Install Vercel CLI (if not already installed)
```bash
npm i -g vercel
```

## Step 2: Login to Vercel
```bash
vercel login
```

## Step 3: Create Vercel Project
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account/organization
- Link to existing project? **No** (for first time)
- Project name? `ascii-medical-visualizer` (or your preferred name)
- Directory? `./` (current directory)
- Override settings? **No**

After this completes, Vercel will create the project and provide:
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Step 4: Get Vercel Token
1. Go to https://vercel.com/account/tokens
2. Create a new token
3. Copy the token (you'll need this for GitHub Secrets)

## Step 5: Set up GitHub Repository
```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit with deployment setup"

# Add your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## Step 6: Configure GitHub Secrets
Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add these three secrets:
1. **VERCEL_TOKEN** - Your Vercel token from Step 4
2. **VERCEL_ORG_ID** - Found in `.vercel/project.json` after running `vercel` command
3. **VERCEL_PROJECT_ID** - Found in `.vercel/project.json` after running `vercel` command

## Step 7: Verify Deployment
After pushing to GitHub, the GitHub Actions workflow will automatically:
1. Build your project
2. Deploy to Vercel production

Check the Actions tab in GitHub to see the deployment status.

## Future Deployments
Every push to `main` branch will automatically trigger a deployment to Vercel!

