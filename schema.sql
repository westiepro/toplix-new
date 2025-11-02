-- Properties Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable PostGIS extension for spatial queries (if not already enabled)
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    price INTEGER NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Portugal',
    beds INTEGER NOT NULL,
    baths INTEGER NOT NULL,
    area INTEGER NOT NULL, -- in square meters
    property_type TEXT NOT NULL, -- 'Apartment', 'Villa', 'Townhouse', 'Land', 'Commercial'
    lat DECIMAL(10, 8) NOT NULL,
    lng DECIMAL(11, 8) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL, -- Cloudinary URL
    display_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create saved_searches table
CREATE TABLE IF NOT EXISTS saved_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    city TEXT,
    bounds JSONB, -- { sw_lat, sw_lng, ne_lat, ne_lng }
    filters JSONB, -- { minPrice, maxPrice, beds, baths, propertyType, minArea }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for performance
-- Spatial indexes for lat/lng queries
CREATE INDEX IF NOT EXISTS idx_properties_lat ON properties(lat);
CREATE INDEX IF NOT EXISTS idx_properties_lng ON properties(lng);
CREATE INDEX IF NOT EXISTS idx_properties_lat_lng ON properties(lat, lng);

-- City index for city-based searches
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);

-- Property type index
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);

-- Price index for range queries
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);

-- Image indexes
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_featured ON property_images(is_featured) WHERE is_featured = true;

-- Saved searches index
CREATE INDEX IF NOT EXISTS idx_saved_searches_user_id ON saved_searches(user_id);

-- 5. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create triggers to auto-update updated_at
CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_searches_updated_at
    BEFORE UPDATE ON saved_searches
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS policies for public read access to properties
CREATE POLICY "Allow public read access to properties"
    ON properties FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access to property_images"
    ON property_images FOR SELECT
    USING (true);

-- 9. Create RLS policies for saved_searches (user-specific)
CREATE POLICY "Users can view their own saved searches"
    ON saved_searches FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved searches"
    ON saved_searches FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved searches"
    ON saved_searches FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved searches"
    ON saved_searches FOR DELETE
    USING (auth.uid() = user_id);

-- 10. Create RLS policies for authenticated users to manage properties (admin)
CREATE POLICY "Allow authenticated users to insert properties"
    ON properties FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update properties"
    ON properties FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to delete properties"
    ON properties FOR DELETE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to insert property_images"
    ON property_images FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update property_images"
    ON property_images FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to delete property_images"
    ON property_images FOR DELETE
    TO authenticated
    USING (true);

-- 11. Create helper function for spatial bounding box queries
CREATE OR REPLACE FUNCTION get_properties_in_bounds(
    sw_lat DECIMAL,
    sw_lng DECIMAL,
    ne_lat DECIMAL,
    ne_lng DECIMAL
)
RETURNS SETOF properties AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM properties
    WHERE lat >= sw_lat 
      AND lat <= ne_lat
      AND lng >= sw_lng
      AND lng <= ne_lng;
END;
$$ LANGUAGE plpgsql;

