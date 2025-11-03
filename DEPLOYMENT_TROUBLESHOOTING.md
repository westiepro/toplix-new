# 🚨 "Property Not Found" Error - Fix Guide

## Problem
You're seeing "Property Not Found" error on your Vercel deployment when trying to view property pages.

## Root Cause
This happens when:
1. ✅ API route exists (we have it)
2. ❌ But database has **no properties** OR tables don't exist

## 🔧 Solution Steps

### Step 1: Check Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these exist:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

5. If missing, add them and **redeploy**

### Step 2: Create Database Tables (If Not Already Done)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor**
4. Copy and paste this SQL:

```sql
-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    price INTEGER NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Portugal',
    beds INTEGER NOT NULL,
    baths INTEGER NOT NULL,
    area INTEGER NOT NULL,
    property_type TEXT NOT NULL DEFAULT 'Apartment',
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_properties_lat_lng ON properties(lat, lng);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_featured ON property_images(is_featured);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow public read)
DROP POLICY IF EXISTS "Allow public read access to properties" ON properties;
CREATE POLICY "Allow public read access to properties"
    ON properties FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow public read access to property_images" ON property_images;
CREATE POLICY "Allow public read access to property_images"
    ON property_images FOR SELECT
    USING (true);

-- Allow authenticated users to modify (for admin)
DROP POLICY IF EXISTS "Allow authenticated users to insert properties" ON properties;
CREATE POLICY "Allow authenticated users to insert properties"
    ON properties FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update properties" ON properties;
CREATE POLICY "Allow authenticated users to update properties"
    ON properties FOR UPDATE
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to delete properties" ON properties;
CREATE POLICY "Allow authenticated users to delete properties"
    ON properties FOR DELETE
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert property_images" ON property_images;
CREATE POLICY "Allow authenticated users to insert property_images"
    ON property_images FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update property_images" ON property_images;
CREATE POLICY "Allow authenticated users to update property_images"
    ON property_images FOR UPDATE
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to delete property_images" ON property_images;
CREATE POLICY "Allow authenticated users to delete property_images"
    ON property_images FOR DELETE
    TO authenticated
    USING (true);
```

5. Click **Run** (or Cmd/Ctrl + Enter)

### Step 3: Add Sample Properties

You have **two options**:

#### Option A: Use Admin Panel (Recommended)

1. Go to your deployed site: `https://your-site.vercel.app/en/admin/properties`
2. Click **"Add Property"**
3. Fill in the form with property details
4. Add images (5 images recommended)
5. Click **"Save Property"**
6. Repeat for more properties

#### Option B: Run Population Script (Fast - Creates 60 Properties)

1. Make sure `.env.local` has Supabase credentials
2. Run locally:
   ```bash
   npm run check-setup
   ```
3. If tables exist, run:
   ```bash
   npm run populate-properties
   ```
4. This creates 60 sample properties with images

### Step 4: Verify in Supabase

1. Go to Supabase → **Table Editor**
2. Check **properties** table - should have rows
3. Check **property_images** table - should have 5 images per property
4. If no data → Use Option A or B above

### Step 5: Test Your Site

1. Go to: `https://your-site.vercel.app/en/admin/properties`
2. You should see properties listed
3. Click a property to view details
4. If it works in admin, the public page will work too!

## 🎯 Quick Fix (if tables exist but no data)

If tables exist but you just need one property fast:

1. Go to Supabase → **Table Editor** → **properties**
2. Click **Insert** → **Insert row**
3. Add minimal data:
   ```
   address: Rua da Praia 45
   city: Lagos
   country: Portugal
   price: 350000
   beds: 2
   baths: 2
   area: 1100
   property_type: Apartment
   lat: 37.1010
   lng: -8.6730
   description: Beautiful property...
   status: active
   ```
4. Save
5. Add images for that property in **property_images** table

## 🔍 Debugging Checklist

- [ ] Vercel environment variables are set
- [ ] Supabase URL and Key are correct
- [ ] `properties` table exists in Supabase
- [ ] `property_images` table exists in Supabase
- [ ] Properties table has at least 1 row
- [ ] RLS policies allow public read access
- [ ] Vercel deployment is recent (redeploy if env vars added)

## 🚀 Expected Result

After completing steps above:
- ✅ Admin panel shows properties list
- ✅ Property detail pages load correctly
- ✅ Images display
- ✅ Map shows property location
- ✅ Share functionality works

## 📝 Quick Test URLs

Replace `your-site.vercel.app` with your actual domain:

```
Admin Panel:
https://your-site.vercel.app/en/admin/properties

Property Page (after adding property, use actual ID):
https://your-site.vercel.app/en/property/[property-id]

Homepage:
https://your-site.vercel.app/en
```

## 🆘 Still Not Working?

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Deployments
   - Click latest deployment → Functions tab
   - Check for API errors

2. **Check Browser Console:**
   - Open property page
   - Press F12 → Console tab
   - Look for API errors (red text)
   - Copy error message

3. **Test API Directly:**
   - Go to: `https://your-site.vercel.app/api/properties`
   - Should return JSON with properties array
   - If empty `[]` → No properties in database
   - If error → Check Supabase config

4. **Verify RLS Policies:**
   - Go to Supabase → Authentication → Policies
   - Check `properties` table policies
   - Must have "Allow public read access" policy

## 💡 Common Issues

### "Database configuration missing"
**Fix:** Add Supabase env vars to Vercel, then redeploy

### "Property not found" (even with data)
**Fix:** Check RLS policies - public read must be enabled

### "Internal server error"
**Fix:** Check Vercel function logs for detailed error

### Properties load in admin but not on public page
**Fix:** Check if property status is "active" (not "inactive")

---

**Need help?** Run this locally to test:
```bash
npm run dev
```
Then visit: `http://localhost:3000/en/admin/properties`

If it works locally but not on Vercel, it's a deployment configuration issue (env vars or permissions).

