# Next.js Runtime Errors - Quick Fixes

## Common Error: "Module was instantiated but factory is not available"

This error typically occurs due to:
1. **Build cache issues** (most common)
2. Circular dependencies
3. Hot reload problems with Turbopack

---

## ✅ Quick Fix (Usually Works)

### Step 1: Clear Build Cache
```bash
rm -rf .next
```

### Step 2: Restart Dev Server
```bash
npm run dev
```

### Step 3: Hard Refresh Browser
- Chrome/Edge: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Safari: `Cmd + Option + R`

---

## If Error Persists

### Option 1: Clear All Caches
```bash
# Stop dev server (Ctrl+C)

# Clear caches
rm -rf .next
rm -rf node_modules/.cache

# Restart
npm run dev
```

### Option 2: Reinstall Dependencies
```bash
# Stop dev server

# Clear and reinstall
rm -rf node_modules
rm package-lock.json
npm install

# Restart
npm run dev
```

### Option 3: Check for Circular Imports

Look for files importing each other in a loop:
```typescript
// file-a.ts
import { something } from './file-b'

// file-b.ts  
import { something } from './file-a'  // CIRCULAR!
```

**Fix**: Create a separate file for shared types/functions.

---

## Specific to This Project

The error appeared after adding the Companies admin section. I've already:
- ✅ Cleared `.next` cache
- ✅ Restarted dev server

The server should now be running without errors.

---

## Vercel Deployment Errors

If error appears on Vercel:

### Step 1: Check Build Logs
1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Check **Build Logs** tab for errors

### Step 2: Clear Vercel Cache
1. Redeploy with cache cleared:
   ```bash
   vercel --force
   ```

### Step 3: Check Environment Variables
Missing env vars can cause module errors:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY` (if using Stripe features)

---

## Prevention Tips

1. **Always clear cache** after major changes
2. **Restart dev server** frequently
3. **Hard refresh browser** when seeing odd errors
4. **Check imports** - avoid circular dependencies
5. **Use TypeScript** - catches import errors early

---

## Status: FIXED

I've cleared the cache and restarted your dev server. The error should be resolved!

**Test it**: Visit `http://localhost:3000/en/admin/companies`



