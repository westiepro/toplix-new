-- Add Location Privacy Feature to Properties
-- This allows properties to show approximate location (2km radius) instead of exact pin
-- Run this in your Supabase SQL Editor

-- 1. Add show_exact_location column to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS show_exact_location BOOLEAN DEFAULT true;

-- 2. Add comment for documentation
COMMENT ON COLUMN properties.show_exact_location IS 
'Controls whether property shows exact pin or 2km radius circle on maps. Default true (exact location).';

-- 3. Create index for filtering
CREATE INDEX IF NOT EXISTS idx_properties_show_exact_location 
ON properties(show_exact_location);

-- 4. Optionally, set some properties to approximate location for testing
-- Uncomment the lines below to test with properties in Faro
-- UPDATE properties 
-- SET show_exact_location = false 
-- WHERE id IN (
--     SELECT id 
--     FROM properties 
--     WHERE city = 'Faro' 
--     LIMIT 3
-- );

-- Done! Properties now support location privacy settings
SELECT 'Location privacy feature added successfully!' as message;

