-- Comprehensive check: Does the column exist and does the property have a value?
-- Run this in Supabase SQL Editor

-- 1. Check if column exists in the table
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'properties' 
AND column_name = 'show_exact_location';

-- If the above returns NO ROWS, the column doesn't exist yet!

-- 2. Check the specific property
SELECT 
  id,
  url_slug_id,
  address,
  city,
  show_exact_location,
  status
FROM properties
WHERE url_slug_id = '364568962';

-- 3. Check all properties with this field
SELECT 
  COUNT(*) as total_properties,
  COUNT(show_exact_location) as has_value,
  COUNT(CASE WHEN show_exact_location = false THEN 1 END) as false_count,
  COUNT(CASE WHEN show_exact_location = true THEN 1 END) as true_count
FROM properties;

