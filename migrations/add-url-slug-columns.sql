-- Migration: Add URL slug columns to properties table
-- This adds support for localized SEO-friendly URLs

-- Add transaction_type column (buy or rent)
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS transaction_type VARCHAR(10) DEFAULT 'buy' CHECK (transaction_type IN ('buy', 'rent'));

-- Add district column for location hierarchy
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS district VARCHAR(100);

-- Add unique URL slug ID (8-9 digit identifier)
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS url_slug_id VARCHAR(20) UNIQUE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_properties_url_slug_id ON properties(url_slug_id);
CREATE INDEX IF NOT EXISTS idx_properties_transaction_type ON properties(transaction_type);
CREATE INDEX IF NOT EXISTS idx_properties_district ON properties(district);

-- Update existing properties with default values
-- Set district from city if not already set
UPDATE properties
SET district = city
WHERE district IS NULL;

-- Generate random 8-9 digit IDs for existing properties
-- This will be done by the application when properties are accessed
-- to ensure no duplicates

COMMENT ON COLUMN properties.transaction_type IS 'Type of transaction: buy or rent';
COMMENT ON COLUMN properties.district IS 'District/region where property is located';
COMMENT ON COLUMN properties.url_slug_id IS 'Unique 8-9 digit identifier for SEO-friendly URLs';

