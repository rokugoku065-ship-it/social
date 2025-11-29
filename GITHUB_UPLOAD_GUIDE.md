# How to Upload to GitHub

This guide will help you upload your Social Media App project to your GitHub repository.

## Prerequisites

- Git installed on your computer
- A GitHub account
- GitHub repository created (e.g., `https://github.com/shivam543210/SocialMediaApp`)

## Step-by-Step Instructions

### 1. Configure Git (First Time Only)

If you haven't configured git before, run these commands:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2. Initialize Git Repository (if not already done)

```bash
cd c:\Users\techs\connecto\SocialMediaApp
git init
```

### 3. Add Remote Repository

Replace `shivam543210` with your actual GitHub username:

```bash
git remote add origin https://github.com/shivam543210/SocialMediaApp.git
```

If you already have a remote, update it:
```bash
git remote set-url origin https://github.com/shivam543210/SocialMediaApp.git
```

### 4. Stage All Files

```bash
git add .
```

### 5. Commit Your Changes

```bash
git commit -m "Initial commit: Social Media App with rebranding to Shivam"
```

### 6. Push to GitHub

For the first push:
```bash
git branch -M main
git push -u origin main
```

For subsequent pushes:
```bash
git push
```

## Important Notes

### Files That Won't Be Uploaded (Protected by .gitignore)

- ✅ `.env` files (contains sensitive credentials)
- ✅ `node_modules/` (dependencies - too large)
- ✅ `.next/` build files
- ✅ Log files

### What WILL Be Uploaded

- ✅ Source code (frontend & backend)
- ✅ Configuration files (`package.json`, `next.config.mjs`, etc.)
- ✅ README.md
- ✅ Seed script
- ✅ Postman collection
- ✅ Sample environment files (`envsample.txt`)

## Updating Your Repository

After making changes:

```bash
# Check what changed
git status

# Stage specific files
git add filename.js

# Or stage all changes
git add .

# Commit with a message
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Common Commands

```bash
# View current status
git status

# View commit history
git log --oneline

# View remote repositories
git remote -v

# Undo uncommitted changes
git checkout -- filename.js

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

## Troubleshooting

### Authentication Issues

If you get authentication errors, you may need to use a Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` permissions
3. Use the token as your password when pushing

### Large Files Error

If you get errors about large files:
```bash
# Remove large files from git
git rm --cached path/to/large/file
echo "path/to/large/file" >> .gitignore
git commit -m "Remove large file"
```

### Force Push (Use with Caution!)

Only if you need to overwrite remote history:
```bash
git push -f origin main
```

## Quick Reference

```bash
# Complete workflow for first upload
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/shivam543210/SocialMediaApp.git
git branch -M main
git push -u origin main

# Daily workflow
git add .
git commit -m "Your commit message"
git push
```

## Security Reminder

⚠️ **Never commit sensitive information:**
- Database passwords
- API keys
- OAuth secrets
- JWT secrets

These are already protected by `.gitignore`, but always double-check before committing!
