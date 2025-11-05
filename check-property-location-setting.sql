-- Check the show_exact_location value for the Almancil property
-- Run this in Supabase SQL Editor

-- Find the property by url_slug_id
SELECT 
  id, 
  address, 
  city, 
  url_slug_id, 
  show_exact_location,
  status
FROM properties
WHERE url_slug_id = '364568962';

-- If not found by url_slug_id, search by city
SELECT 
  id, 
  address, 
  city, 
  url_slug_id, 
  show_exact_location,
  status
FROM properties
WHERE city ILIKE '%almancil%'
ORDER BY created_at DESC;

-- Manually set it to false for testing
UPDATE properties
SET show_exact_location = false
WHERE url_slug_id = '364568962';

-- Verify it was updated
SELECT 
  id, 
  address, 
  city,
  show_exact_location
FROM properties
WHERE url_slug_id = '364568962';

