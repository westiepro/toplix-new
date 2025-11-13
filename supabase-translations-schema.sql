-- Translation System Database Schema
-- Run this SQL in your Supabase SQL Editor

-- 1. Create languages table
CREATE TABLE IF NOT EXISTS languages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    flag_emoji TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create translations table
CREATE TABLE IF NOT EXISTS translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL,
    language_code TEXT NOT NULL REFERENCES languages(code) ON DELETE CASCADE,
    value TEXT NOT NULL,
    is_auto_translated BOOLEAN DEFAULT true,
    namespace TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(key, language_code)
);

-- 3. Create property_translations table
CREATE TABLE IF NOT EXISTS property_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id TEXT NOT NULL,
    language_code TEXT NOT NULL REFERENCES languages(code) ON DELETE CASCADE,
    title TEXT,
    description TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(property_id, language_code)
);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_translations_language_code ON translations(language_code);
CREATE INDEX IF NOT EXISTS idx_translations_namespace ON translations(namespace);
CREATE INDEX IF NOT EXISTS idx_translations_key ON translations(key);
CREATE INDEX IF NOT EXISTS idx_property_translations_property_id ON property_translations(property_id);
CREATE INDEX IF NOT EXISTS idx_property_translations_language_code ON property_translations(language_code);

-- 5. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create triggers to auto-update updated_at
CREATE TRIGGER update_translations_updated_at
    BEFORE UPDATE ON translations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_translations_updated_at
    BEFORE UPDATE ON property_translations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Insert initial languages
INSERT INTO languages (code, name, flag_emoji, is_active) VALUES
    ('en', 'English', '🇬🇧', true),
    ('pt', 'Portuguese', '🇵🇹', true),
    ('es', 'Spanish', '🇪🇸', true),
    ('fr', 'French', '🇫🇷', true),
    ('de', 'German', '🇩🇪', true),
    ('sv', 'Swedish', '🇸🇪', true)
ON CONFLICT (code) DO NOTHING;

-- 8. Enable Row Level Security (RLS)
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_translations ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for public read access
CREATE POLICY "Allow public read access to languages"
    ON languages FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access to translations"
    ON translations FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access to property_translations"
    ON property_translations FOR SELECT
    USING (true);

-- 10. Create RLS policies for authenticated users (admin) to modify
CREATE POLICY "Allow authenticated users to insert translations"
    ON translations FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update translations"
    ON translations FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to delete translations"
    ON translations FOR DELETE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to insert property_translations"
    ON property_translations FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update property_translations"
    ON property_translations FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to delete property_translations"
    ON property_translations FOR DELETE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to update languages"
    ON languages FOR UPDATE
    TO authenticated
    USING (true);
















