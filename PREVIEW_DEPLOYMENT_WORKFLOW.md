# Vercel Preview Deployment Workflow 🚀

## Overview
This guide shows you how to test changes on a live preview URL before deploying to production - **no local server needed!**

## Branch Setup ✅

You now have two branches:
- **`main`** → Production (your live site)
- **`development`** → Testing/Preview (gets its own preview URL)

## How It Works

When you push to different branches, Vercel automatically creates different deployments:

| Branch | Deployment Type | URL Example |
|--------|----------------|-------------|
| `main` | **Production** | `toplix-new.vercel.app` |
| `development` | **Preview** | `development-toplix-new.vercel.app` |
| Any other branch | **Preview** | `feature-name-toplix-new.vercel.app` |

## Workflow for Testing Changes

### Step 1: Switch to Development Branch
```bash
git checkout development
```

### Step 2: Make Your Changes
Edit files in Cursor as normal. For example:
- Update a component
- Change styling
- Add new features

### Step 3: Commit and Push to Development
```bash
# Stage your changes
git add .

# Commit with a message
git commit -m "test: trying new navigation style"

# Push to development branch
git push origin development
```

### Step 4: Get Your Preview URL

**Option A: From Vercel Dashboard**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your `toplix-new` project
3. You'll see the latest deployment from `development` branch
4. Click to open the preview URL

**Option B: From GitHub (if you have Vercel integration)**
1. Go to your GitHub repo commits page
2. Look for the ✅ green checkmark next to your commit
3. Click "Details" to see the preview URL

### Step 5: Test on Preview URL

Open the preview URL and test your changes:
- ✅ Everything works on real Vercel environment
- ✅ Same performance as production
- ✅ Can share the URL with others for feedback
- ✅ Production stays completely untouched

### Step 6: Deploy to Production (When Ready)

**Option A: Merge via Pull Request (Recommended)**
1. Go to GitHub → Pull Requests
2. Create PR: `development` → `main`
3. Review changes
4. Merge when ready
5. Vercel auto-deploys to production

**Option B: Direct Merge (Faster)**
```bash
# Switch to main
git checkout main

# Merge development into main
git merge development

# Push to production
git push origin main
```

---

## Common Workflows

### 💡 Quick Test (Small Changes)
```bash
# 1. Switch to development
git checkout development

# 2. Make changes in Cursor
# ... edit files ...

# 3. Push to preview
git add .
git commit -m "test: quick fix"
git push origin development

# 4. Check preview URL, if good → merge to main
git checkout main
git merge development
git push origin main
```

### 💡 Feature Development (Bigger Changes)
```bash
# 1. Create a feature branch from development
git checkout development
git checkout -b feature/new-search

# 2. Make changes
# ... work on feature ...

# 3. Push feature branch (gets its own preview URL!)
git add .
git commit -m "feat: new search functionality"
git push origin feature/new-search

# 4. Test on preview URL

# 5. Merge to development first
git checkout development
git merge feature/new-search
git push origin development

# 6. Test on development preview URL

# 7. If all good, merge to main
git checkout main
git merge development
git push origin main
```

### 💡 Hotfix (Emergency Production Fix)
```bash
# 1. Fix directly on main
git checkout main

# 2. Make quick fix
# ... fix critical bug ...

# 3. Push directly to production
git add .
git commit -m "fix: critical bug"
git push origin main

# 4. Update development to match
git checkout development
git merge main
git push origin development
```

---

## Finding Your Preview URLs

### Via Vercel Dashboard:
1. Visit [vercel.com](https://vercel.com)
2. Sign in
3. Click your project: **toplix-new**
4. See all deployments:
   - **Production**: From `main` branch
   - **Preview**: From `development` and feature branches

### Via Vercel CLI (Optional):
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Link your project
vercel link

# See deployments
vercel ls
```

---

## Quick Reference Commands

```bash
# SWITCH BRANCHES
git checkout main              # Switch to production branch
git checkout development       # Switch to development branch

# CHECK CURRENT BRANCH
git branch                     # Shows current branch with *

# PUSH CHANGES
git add .                      # Stage all changes
git commit -m "message"        # Commit with message
git push origin development    # Push to development (preview)
git push origin main          # Push to production

# MERGE DEVELOPMENT TO MAIN
git checkout main              # Switch to main
git merge development          # Merge development in
git push origin main          # Deploy to production

# CREATE NEW FEATURE BRANCH
git checkout development       # Start from development
git checkout -b feature/name   # Create new branch
git push -u origin feature/name  # Push and track
```

---

## Benefits of This Workflow

✅ **Safe Testing**: Never break production  
✅ **No Local Server**: Test on real Vercel environment  
✅ **Share Previews**: Send preview URLs to team/clients  
✅ **Multiple Tests**: Test different features simultaneously  
✅ **Automatic**: Vercel handles everything  
✅ **Free**: Unlimited preview deployments  

---

## Tips & Best Practices

1. **Always test on `development` first** before merging to `main`
2. **Keep `development` in sync** with `main` regularly
3. **Use descriptive commit messages** to track changes
4. **Delete old feature branches** after merging to keep repo clean
5. **Share preview URLs** instead of screenshots for feedback

---

## Current Status

- ✅ `main` branch → Production deployment
- ✅ `development` branch → Preview deployment (ready to use!)
- ✅ Vercel automatically deploys both
- ✅ You're all set!

---

## Next Steps

1. Make some test changes
2. Push to `development` 
3. Check your Vercel dashboard for the preview URL
4. Test thoroughly on preview
5. Merge to `main` when ready

**Happy testing!** 🎉

---

## Troubleshooting

**Q: I don't see preview deployments in Vercel**  
A: Make sure your GitHub repository is connected to Vercel. Go to Project Settings → Git → Check connection.

**Q: How do I know which branch I'm on?**  
A: Run `git branch` - the current branch has an asterisk (*)

**Q: I pushed to development but it deployed to production**  
A: Check you're on the right branch with `git branch`. Only `main` deploys to production.

**Q: Can I have multiple preview URLs?**  
A: Yes! Each branch gets its own preview URL. Create as many feature branches as you need.

**Q: How long do preview deployments stay up?**  
A: Forever (until you delete them)! They don't expire.

