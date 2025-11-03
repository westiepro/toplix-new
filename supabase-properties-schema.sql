-- Properties Database Schema
-- Run this SQL in your Supabase SQL Editor

-- 1. Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    price INTEGER NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Portugal',
    district TEXT, -- District/region for URL structure
    beds INTEGER NOT NULL,
    baths INTEGER NOT NULL,
    area INTEGER NOT NULL, -- in square feet
    property_type TEXT NOT NULL DEFAULT 'Apartment',
    transaction_type TEXT NOT NULL DEFAULT 'buy' CHECK (transaction_type IN ('buy', 'rent')),
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    description TEXT,
    url_slug_id TEXT UNIQUE, -- 8-9 digit unique identifier for SEO URLs
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
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
    bounds JSONB, -- {sw_lat, sw_lng, ne_lat, ne_lng}
    filters JSONB, -- {minPrice, maxPrice, beds, baths, propertyType, minArea}
    city TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_lat_lng ON properties(lat, lng);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_district ON properties(district);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_beds ON properties(beds);
CREATE INDEX IF NOT EXISTS idx_properties_baths ON properties(baths);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_transaction_type ON properties(transaction_type);
CREATE INDEX IF NOT EXISTS idx_properties_url_slug_id ON properties(url_slug_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_featured ON property_images(is_featured);
CREATE INDEX IF NOT EXISTS idx_saved_searches_user_id ON saved_searches(user_id);

-- 5. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_properties_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create trigger to auto-update updated_at
CREATE TRIGGER update_properties_updated_at_trigger
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_properties_updated_at();

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

-- 9. Create RLS policies for authenticated users to modify properties (admin only)
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

-- 10. Create RLS policies for saved_searches (user-specific)
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

