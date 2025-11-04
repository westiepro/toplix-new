# 🚨 Database Migration Required

## Current Issue

The new URL slug system cannot work until you add the required database columns.

**Symptoms:**
- ❌ Properties not loading
- ❌ "Failed to fetch properties" error
- ❌ New slug URLs not visible
- ❌ Hydration warnings in console

## Solution: Run This SQL in Supabase

### Step 1: Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Copy and Paste This SQL

```sql
-- ============================================
-- MIGRATION: Add URL Slug Support
-- ============================================

-- Add new columns to properties table
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS transaction_type VARCHAR(10) DEFAULT 'buy' 
  CHECK (transaction_type IN ('buy', 'rent'));

ALTER TABLE properties
ADD COLUMN IF NOT EXISTS url_slug_id VARCHAR(20) UNIQUE;

ALTER TABLE properties
ADD COLUMN IF NOT EXISTS district VARCHAR(100);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_url_slug_id ON properties(url_slug_id);
CREATE INDEX IF NOT EXISTS idx_properties_transaction_type ON properties(transaction_type);
CREATE INDEX IF NOT EXISTS idx_properties_district ON properties(district);

-- Generate unique 8-9 digit IDs for ALL existing properties
UPDATE properties 
SET url_slug_id = LPAD(FLOOR(RANDOM() * 900000000 + 100000000)::TEXT, 9, '0')
WHERE url_slug_id IS NULL;

-- Set district from city for existing properties
UPDATE properties
SET district = city
WHERE district IS NULL;

-- Verify the migration
SELECT 
  id,
  city,
  district,
  transaction_type,
  url_slug_id
FROM properties
LIMIT 5;
```

### Step 3: Run the Query

Click the "Run" button in Supabase SQL Editor.

**Expected output:**
- "Success" message
- 5 sample rows showing the new columns populated

### Step 4: Restart Your Dev Server

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Step 5: Test the New URLs

1. Visit: `http://localhost:3002/en/homes-enhanced`
2. Click on any property
3. Should redirect to new URL like:
   - `/en/buy/lagos/houses-apartments/145734848`
   - `/pt/comprar/lagos/casas-apartamentos/145734848`

## How to Verify It Worked

After the migration, run this in Supabase SQL Editor:

```sql
-- Check that all properties have the new fields
SELECT 
  COUNT(*) as total_properties,
  COUNT(url_slug_id) as with_slug_id,
  COUNT(district) as with_district,
  COUNT(CASE WHEN transaction_type IS NOT NULL THEN 1 END) as with_transaction_type
FROM properties;
```

All numbers should be equal (all properties have all fields).

## Troubleshooting

### If SQL Fails

**Error: "column already exists"**
- The columns exist but might be empty
- Run only the UPDATE statements to populate them

**Error: "table properties does not exist"**
- You need to run the main schema first
- See: `supabase-properties-schema.sql`

### If Properties Still Don't Load

1. Check browser console for errors
2. Check terminal where dev server is running
3. Verify Supabase env vars are set in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

## What This Migration Does

1. **Adds `transaction_type` column**
   - Values: 'buy' or 'rent'
   - Default: 'buy'
   - Used in URLs: buy → comprar, rent → arrendar

2. **Adds `url_slug_id` column**
   - Unique 8-9 digit identifier
   - Example: 145734848
   - Used as property ID in URLs

3. **Adds `district` column**
   - Optional location hierarchy
   - Falls back to city if not set
   - Not used in 5-segment URLs (for future expansion)

4. **Creates indexes**
   - Fast lookups by url_slug_id
   - Efficient filtering by transaction_type

---

## ⚡ Quick Start

**Just run these 2 commands in Supabase SQL Editor:**

```sql
-- 1. Add columns and indexes
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS transaction_type VARCHAR(10) DEFAULT 'buy',
ADD COLUMN IF NOT EXISTS url_slug_id VARCHAR(20) UNIQUE,
ADD COLUMN IF NOT EXISTS district VARCHAR(100);

CREATE INDEX IF NOT EXISTS idx_properties_url_slug_id ON properties(url_slug_id);

-- 2. Populate data for existing properties
UPDATE properties 
SET url_slug_id = LPAD(FLOOR(RANDOM() * 900000000 + 100000000)::TEXT, 9, '0'),
    district = COALESCE(district, city)
WHERE url_slug_id IS NULL;
```

Then **restart dev server** and refresh browser!

