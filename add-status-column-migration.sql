-- Migration to add status column to properties table
-- Run this SQL in your Supabase SQL Editor

-- Add status column with default value 'active'
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active';

-- Add check constraint to ensure only valid status values
ALTER TABLE properties
ADD CONSTRAINT properties_status_check 
CHECK (status IN ('active', 'inactive'));

-- Create index on status for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);

-- Update any existing NULL values to 'active' (just in case)
UPDATE properties SET status = 'active' WHERE status IS NULL;

-- Optional: View all properties with their status
-- SELECT id, address, city, status FROM properties ORDER BY created_at DESC;

