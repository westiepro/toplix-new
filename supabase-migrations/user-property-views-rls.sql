-- Add RLS policies for user_property_views table
-- Run this SQL in your Supabase SQL Editor
-- 
-- Prerequisites: 
-- 1. Table user_property_views already created
-- 2. Run this to enable RLS and add policies

-- 1. Enable Row Level Security
ALTER TABLE user_property_views ENABLE ROW LEVEL SECURITY;

-- 2. Create policy for users to view their own property views
CREATE POLICY "Users can view their own property views"
    ON user_property_views FOR SELECT
    USING (auth.uid() = user_id);

-- 3. Create policy for users to insert their own property views
CREATE POLICY "Users can insert their own property views"
    ON user_property_views FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 4. Create policy for users to update their own property views
CREATE POLICY "Users can update their own property views"
    ON user_property_views FOR UPDATE
    USING (auth.uid() = user_id);

-- 5. Create policy for users to delete their own property views
CREATE POLICY "Users can delete their own property views"
    ON user_property_views FOR DELETE
    USING (auth.uid() = user_id);

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_property_views_user_id 
    ON user_property_views(user_id);

CREATE INDEX IF NOT EXISTS idx_user_property_views_property_id 
    ON user_property_views(property_id);

CREATE INDEX IF NOT EXISTS idx_user_property_views_viewed_at 
    ON user_property_views(viewed_at DESC);

-- 7. Create composite index for common queries
CREATE INDEX IF NOT EXISTS idx_user_property_views_user_viewed 
    ON user_property_views(user_id, viewed_at DESC);

