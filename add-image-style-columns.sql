-- Migration to add AI style metadata columns to property_images table
-- Run this SQL in your Supabase SQL Editor

-- Add new columns for AI decoration feature
ALTER TABLE property_images 
ADD COLUMN IF NOT EXISTS style_name TEXT,
ADD COLUMN IF NOT EXISTS is_original BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS image_category TEXT DEFAULT 'gallery' 
  CHECK (image_category IN ('gallery', 'ai_styled', 'original'));

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_property_images_style ON property_images(style_name);
CREATE INDEX IF NOT EXISTS idx_property_images_category ON property_images(image_category);
CREATE INDEX IF NOT EXISTS idx_property_images_original ON property_images(is_original);

-- Set existing featured images as originals (optional - adjust as needed)
UPDATE property_images 
SET image_category = 'original', 
    is_original = true 
WHERE is_featured = true AND image_category = 'gallery';

-- Verify the columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'property_images' 
AND column_name IN ('style_name', 'is_original', 'image_category');

-- View sample data
SELECT id, property_id, style_name, is_original, image_category, is_featured
FROM property_images
LIMIT 5;



