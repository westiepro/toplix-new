# 🚨 Quick Fix: "Property Not Found" on Vercel

## The Problem
Your property pages show "Property Not Found" on Vercel because **the database has no properties**.

## ⚡ 3-Step Fix

### Step 1: Verify Vercel Environment Variables (2 minutes)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your project
3. Go to **Settings** → **Environment Variables**
4. Make sure these exist:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
5. If missing or wrong → Add/Fix them → **Redeploy**

### Step 2: Create Database Tables (1 minute)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click **SQL Editor** → **New Query**
3. **Copy/paste this entire SQL block:**

```sql
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON properties FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON property_images FOR SELECT USING (true);
CREATE POLICY "Allow auth insert" ON properties FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow auth update" ON properties FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow auth delete" ON properties FOR DELETE TO authenticated USING (true);
CREATE POLICY "Allow auth insert" ON property_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow auth update" ON property_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow auth delete" ON property_images FOR DELETE TO authenticated USING (true);
```

4. Click **Run** (or press Cmd+Enter)

### Step 3: Add Your First Property (3 minutes)

**Option A: Use Admin Panel (Easiest)**

1. Go to: `https://your-site.vercel.app/en/admin/login`
2. Login
3. Go to: `https://your-site.vercel.app/en/admin/properties`
4. Click **"Add Property"**
5. Fill in:
   - Address: `Rua da Praia 45`
   - City: `Lagos`
   - Country: `Portugal`
   - Price: `350000`
   - Bedrooms: `2`
   - Bathrooms: `2`
   - Area: `1100`
   - Type: `Apartment`
   - Latitude: `37.1010`
   - Longitude: `-8.6730`
6. Add 5 images (paste Unsplash URLs):
   ```
   https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200
   https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200
   https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200
   https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200
   https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200
   ```
7. Click **Save Property**
8. Visit the property page!

**Option B: Quick SQL Insert (Fastest)**

Go to Supabase SQL Editor and run:

```sql
-- Insert a sample property
INSERT INTO properties (address, city, country, price, beds, baths, area, property_type, lat, lng, description, status)
VALUES (
  'Rua da Praia 45',
  'Lagos',
  'Portugal',
  350000,
  2,
  2,
  1100,
  'Apartment',
  37.1010,
  -8.6730,
  'Beautiful apartment in the heart of Lagos with stunning ocean views.',
  'active'
) RETURNING id;
```

Copy the returned ID, then add images:

```sql
-- Replace YOUR_PROPERTY_ID with the ID from above
INSERT INTO property_images (property_id, image_url, display_order, is_featured)
VALUES 
  ('YOUR_PROPERTY_ID', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 0, true),
  ('YOUR_PROPERTY_ID', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200', 1, false),
  ('YOUR_PROPERTY_ID', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200', 2, false),
  ('YOUR_PROPERTY_ID', 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200', 3, false),
  ('YOUR_PROPERTY_ID', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200', 4, false);
```

## ✅ Verify It Worked

1. Go to Supabase → **Table Editor** → **properties**
2. You should see 1 property
3. Go to **property_images** → Should see 5 images

4. Test on your site:
   ```
   https://your-site.vercel.app/en/admin/properties
   ```
   Should show the property!

5. View property page:
   ```
   https://your-site.vercel.app/en/property/[the-property-id]
   ```

## 🎯 Expected Result

- ✅ Property page loads
- ✅ Shows property details
- ✅ Displays 5 images in gallery
- ✅ Map shows location
- ✅ Share button works
- ✅ Contact form appears

## 🆘 Still Not Working?

### Check Vercel Logs
1. Vercel Dashboard → Your Project
2. Click latest **Deployment**
3. Go to **Functions** tab
4. Look for `/api/properties/[id]` errors

### Test API Directly
Visit: `https://your-site.vercel.app/api/properties`

Should return:
```json
{
  "properties": [...],
  "count": 1
}
```

If empty `[]` → No properties in database  
If error → Check Supabase credentials

### Common Issues

| Error | Fix |
|-------|-----|
| "Database configuration missing" | Add Supabase env vars to Vercel |
| "Property not found" | Add properties to database |
| RLS policy error | Run the RLS policies SQL |
| Network error | Check Supabase URL is correct |

## 💡 Pro Tip

Want **60 sample properties** instantly?

Run locally (requires Supabase setup):
```bash
npm run check-setup
npm run populate-properties
```

This creates 60 properties across Portugal & Spain with 5 images each!

---

**Need more help?** Check `DEPLOYMENT_TROUBLESHOOTING.md` for detailed debugging steps.

