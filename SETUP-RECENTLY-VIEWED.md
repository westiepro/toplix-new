# 🚀 Quick Setup: Recently Viewed with Supabase

## ⚡ 3-Minute Setup

### **Step 1: Add Service Role Key** (1 min)

Add this to your `.env.local` file:

```bash
# Add this line (if not already there)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**To find your service role key:**
1. Go to Supabase Dashboard → https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **`service_role` secret** key
5. Paste it in `.env.local`

⚠️ **Important:** Keep this key SECRET! Never commit it to git.

---

### **Step 2: Run RLS Policies SQL** (1 min)

1. Open Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Enable Row Level Security
ALTER TABLE user_property_views ENABLE ROW LEVEL SECURITY;

-- Users can view their own property views
CREATE POLICY "Users can view their own property views"
    ON user_property_views FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own property views
CREATE POLICY "Users can insert their own property views"
    ON user_property_views FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own property views
CREATE POLICY "Users can update their own property views"
    ON user_property_views FOR UPDATE
    USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_property_views_user_id ON user_property_views(user_id);
CREATE INDEX IF NOT EXISTS idx_user_property_views_viewed_at ON user_property_views(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_property_views_user_viewed ON user_property_views(user_id, viewed_at DESC);
```

4. Click **Run** (or press Ctrl/Cmd + Enter)
5. ✅ Should see "Success. No rows returned"

---

### **Step 3: Restart Your Dev Server** (1 min)

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

This ensures the new environment variable is loaded.

---

## ✅ **That's It!**

Your "Recently Viewed" feature is now upgraded! 🎉

### **What Changed:**

| Before | After |
|--------|-------|
| localStorage only | localStorage + Supabase |
| No cross-device sync | ✅ Cross-device sync |
| Guest users only | ✅ Logged-in & guest users |
| No analytics possible | ✅ Analytics-ready |

### **Test It:**

1. **Sign in** to your account
2. **View 2-3 properties** from listings
3. **Go to Dashboard** → Recently Viewed tab
4. ✅ See your viewed properties!
5. **Check Supabase** → Table Editor → `user_property_views`
6. ✅ See rows with your views!

---

## 🔍 **Verify It's Working**

### **Browser Console Check:**

Open browser console (F12) and run:

```javascript
// Check if user is logged in
localStorage.getItem("sb-user")

// Check local views
localStorage.getItem("recently-viewed")
```

### **Database Check:**

1. Supabase Dashboard → **Table Editor**
2. Select **`user_property_views`** table
3. Should see rows appearing as you view properties

### **Network Check:**

1. Open browser DevTools → **Network** tab
2. View a property
3. Look for `POST /api/user-views` request
4. ✅ Should see 200 status code

---

## 🎯 **Features Now Available**

### **For Users:**
- ✅ View history across all devices
- ✅ Works even when logged out (localStorage)
- ✅ Automatic syncing when logged in
- ✅ No setup required on their end

### **For You:**
- ✅ Track which properties are popular
- ✅ See user engagement analytics
- ✅ Identify viewing patterns
- ✅ Recommend similar properties

---

## 📊 **Analytics Queries**

Now that you have database tracking, try these queries in Supabase SQL Editor:

### **Most Viewed Properties:**
```sql
SELECT 
  property_id,
  COUNT(DISTINCT user_id) as unique_viewers,
  COUNT(*) as total_views
FROM user_property_views
GROUP BY property_id
ORDER BY unique_viewers DESC
LIMIT 10;
```

### **Active Users:**
```sql
SELECT 
  user_id,
  COUNT(*) as properties_viewed,
  MAX(viewed_at) as last_view
FROM user_property_views
GROUP BY user_id
ORDER BY properties_viewed DESC;
```

### **Recent Activity:**
```sql
SELECT 
  upv.*,
  p.address,
  p.price
FROM user_property_views upv
JOIN properties p ON p.id = upv.property_id
ORDER BY upv.viewed_at DESC
LIMIT 20;
```

---

## 🛟 **Need Help?**

See `RECENTLY-VIEWED-UPGRADE.md` for detailed documentation, troubleshooting, and more!

---

**Enjoy your upgraded Recently Viewed feature! 🚀✨**

