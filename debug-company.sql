-- Debug: Check if companies exist and what data they have
-- Run this in Supabase SQL Editor

-- 1. Check all companies in the database
SELECT id, name, slug, status, email 
FROM companies
ORDER BY created_at DESC;

-- 2. Check specifically for the test company
SELECT * 
FROM companies 
WHERE slug = 'premier-real-estate';

-- 3. Check if slug column exists and has data
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'companies'
AND column_name IN ('slug', 'tagline', 'founded_year', 'hero_image_url');

-- 4. Count active companies
SELECT COUNT(*) as active_companies
FROM companies
WHERE status = 'active';

