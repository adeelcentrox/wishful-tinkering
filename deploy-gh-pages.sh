#!/bin/bash

set -e

echo "========================================"
echo "  Deploying to GitHub Pages"
echo "========================================"

echo ""
echo "Step 1: Building the app..."
pnpm install --silent
pnpm build

echo ""
echo "Step 2: Initializing git repo..."
git init
git add .
git commit -m "Initial commit" || echo "Already committed"

echo ""
echo "Step 3: Creating GitHub repo..."
gh repo create wishful-tinkering --public --source=. --push 2>&1 || {
  echo "Repo might already exist, using existing..."
  git remote add origin https://github.com/$(gh api user --jq '.login')/wishful-tinkering.git 2>/dev/null || true
  git push -u origin main || git push -u origin master
}

echo ""
echo "Step 4: Enabling GitHub Pages..."
gh api repos/:owner/:repo/pages -X POST -f source[branch]=main -f source[path]=/dist 2>/dev/null || \
gh api repos/:owner/:repo/pages -X POST -f source[branch]=master -f source[path]=/dist 2>/dev/null || \
echo "Pages might already be enabled"

echo ""
echo "Step 5: Setting up automatic deployment..."
mkdir -p .github/workflows

cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
EOF

git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages workflow" || echo "No changes to commit"
git push

echo ""
echo "========================================"
echo "  Deployment started!"
echo "========================================"
echo "  Wait 2-3 minutes for GitHub Actions to complete"
echo "  Your site will be at:"
echo "  https://$(gh api user --jq '.login').github.io/wishful-tinkering/"
echo ""
echo "  Check status:"
echo "    gh workflow view"
echo "========================================"
