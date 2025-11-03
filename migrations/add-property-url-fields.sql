-- Migration: Add URL slug fields to properties table
-- Run this in your Supabase SQL Editor

-- Add url_slug_id column (unique 8-9 digit identifier for URLs)
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS url_slug_id VARCHAR(9) UNIQUE;

-- Add district column (for location hierarchy)
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS district VARCHAR(100);

-- Add transaction_type column (buy or rent)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type_enum') THEN
        CREATE TYPE transaction_type_enum AS ENUM ('buy', 'rent');
    END IF;
END $$;

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS transaction_type transaction_type_enum DEFAULT 'buy';

-- Generate url_slug_id for existing properties (8-digit unique numbers)
-- This uses a hash of the property id to generate consistent IDs
UPDATE properties 
SET url_slug_id = LPAD(
    (ABS(('x' || SUBSTRING(MD5(id::text), 1, 8))::bit(32)::int) % 100000000)::text,
    8,
    '0'
)
WHERE url_slug_id IS NULL;

-- Set default district based on city (you can customize this)
-- For now, we'll use the city as the district for properties without one
UPDATE properties 
SET district = city
WHERE district IS NULL;

-- Create index for faster URL lookups
CREATE INDEX IF NOT EXISTS idx_properties_url_slug_id ON properties(url_slug_id);
CREATE INDEX IF NOT EXISTS idx_properties_district ON properties(district);
CREATE INDEX IF NOT EXISTS idx_properties_transaction_type ON properties(transaction_type);

-- Add comment to url_slug_id column
COMMENT ON COLUMN properties.url_slug_id IS 'Unique 8-9 digit identifier used in SEO-friendly URLs';
COMMENT ON COLUMN properties.district IS 'District/region where property is located (e.g., Lisboa, Algarve)';
COMMENT ON COLUMN properties.transaction_type IS 'Type of transaction: buy or rent';

