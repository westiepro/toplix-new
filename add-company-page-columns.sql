-- Add missing columns to companies table for the company page
-- Run this in your Supabase SQL Editor

-- 1. Add slug column (URL-friendly identifier)
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- 2. Add tagline column
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS tagline TEXT;

-- 3. Add hero_image_url column
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS hero_image_url TEXT;

-- 4. Add linkedin column
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS linkedin TEXT;

-- 5. Add youtube column
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS youtube TEXT;

-- 6. Add total_properties column (if not exists)
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS total_properties INTEGER DEFAULT 0;

-- 7. Add properties_sold column
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS properties_sold INTEGER DEFAULT 0;

-- 8. Add active_agents column
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS active_agents INTEGER DEFAULT 0;

-- 9. Add rating column
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) DEFAULT 0.0;

-- 10. Add founded_year column
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS founded_year INTEGER;

-- 11. Create index on slug for better performance
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);

-- 12. Drop existing trigger if it exists
DO $$ 
BEGIN
    DROP TRIGGER IF EXISTS auto_generate_company_slug ON companies;
EXCEPTION
    WHEN undefined_object THEN
        NULL;
END $$;

-- 13. Function to auto-generate slug from company name (if slug is null)
CREATE OR REPLACE FUNCTION generate_company_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := lower(regexp_replace(NEW.name, '[^a-zA-Z0-9]+', '-', 'g'));
        NEW.slug := trim(both '-' from NEW.slug);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 14. Create trigger to auto-generate slug on insert
CREATE TRIGGER auto_generate_company_slug
    BEFORE INSERT ON companies
    FOR EACH ROW
    EXECUTE FUNCTION generate_company_slug();

-- 15. Generate slugs for existing companies (backfill)
UPDATE companies
SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- 16. Make slug NOT NULL after backfill (only if all rows have slugs)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM companies WHERE slug IS NULL) THEN
        ALTER TABLE companies ALTER COLUMN slug SET NOT NULL;
    END IF;
END $$;

-- Done! Now you can run setup-test-company.sql

