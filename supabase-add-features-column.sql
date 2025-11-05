-- Add features column to properties table
-- Run this in your Supabase SQL Editor

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- Add index for features for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_features ON properties USING GIN (features);

-- Comment
COMMENT ON COLUMN properties.features IS 'Array of property features/amenities (e.g., Pool, Gym, Parking)';

