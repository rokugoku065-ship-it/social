# GitHub Authentication Fix

Your code is ready to push, but you need to authenticate with GitHub first.

## Current Status
✅ Remote URL updated to: `https://github.com/rokugoku065-ship-it/social.git`
✅ All changes committed
❌ Push failed due to authentication (403 error)

## Solution: Use Personal Access Token (PAT)

### Step 1: Create a Personal Access Token

1. Go to GitHub: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Social Media App`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Push Using Token

Replace `YOUR_TOKEN_HERE` with the token you just copied:

```bash
git push https://YOUR_TOKEN_HERE@github.com/rokugoku065-ship-it/social.git main
```

**Example:**
```bash
git push https://ghp_abc123xyz456@github.com/rokugoku065-ship-it/social.git main
```

### Step 3: Set Up Credential Storage (Optional)

To avoid entering the token every time:

**Windows (Credential Manager):**
```bash
git config --global credential.helper manager
git push -u origin main
```
When prompted, enter:
- Username: `rokugoku065-ship-it`
- Password: `YOUR_TOKEN_HERE`

**Or update the remote URL with token:**
```bash
git remote set-url origin https://YOUR_TOKEN_HERE@github.com/rokugoku065-ship-it/social.git
git push -u origin main
```

## Alternative: GitHub CLI (Easier)

### Install GitHub CLI
Download from: https://cli.github.com/

### Authenticate and Push
```bash
gh auth login
git push -u origin main
```

## Quick Commands

```bash
# Check current remote
git remote -v

# Push with token in URL (one-time)
git push https://YOUR_TOKEN@github.com/rokugoku065-ship-it/social.git main

# Or update remote with token
git remote set-url origin https://YOUR_TOKEN@github.com/rokugoku065-ship-it/social.git
git push -u origin main
```

## Troubleshooting

### Error: Repository not found
- Make sure you created the repository `social` on GitHub
- Go to: https://github.com/new
- Repository name: `social`
- Click "Create repository"

### Error: Permission denied
- Double-check your token has `repo` scope
- Make sure you're using the correct GitHub username
- Token might have expired - generate a new one

### Error: Failed to push some refs
```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## After Successful Push

Your repository will be available at:
**https://github.com/rokugoku065-ship-it/social**

## Security Note

⚠️ **Never commit your Personal Access Token to the repository!**
- Tokens in remote URLs are safe (not committed)
- Don't add tokens to code files
- Use environment variables for tokens in code
