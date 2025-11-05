-- Site Admins Database Schema
-- Run this SQL in your Supabase SQL Editor

-- 1. Create site_admins table
CREATE TABLE IF NOT EXISTS site_admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT, -- Store hashed passwords if not using Supabase Auth
    role TEXT NOT NULL DEFAULT 'Viewer' CHECK (role IN ('Admin', 'Content Manager', 'Accountant', 'Viewer')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
    avatar_url TEXT,
    phone TEXT,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_admins_email ON site_admins(email);
CREATE INDEX IF NOT EXISTS idx_site_admins_role ON site_admins(role);
CREATE INDEX IF NOT EXISTS idx_site_admins_status ON site_admins(status);

-- 3. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_admins_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Create trigger to auto-update updated_at
CREATE TRIGGER update_site_admins_updated_at_trigger
    BEFORE UPDATE ON site_admins
    FOR EACH ROW
    EXECUTE FUNCTION update_site_admins_updated_at();

-- 5. Enable Row Level Security (RLS)
ALTER TABLE site_admins ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for authenticated admin users only
CREATE POLICY "Allow authenticated admins to read site_admins"
    ON site_admins FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated admins to insert site_admins"
    ON site_admins FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to update site_admins"
    ON site_admins FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated admins to delete site_admins"
    ON site_admins FOR DELETE
    TO authenticated
    USING (true);

-- 7. Insert sample admin users (optional)
INSERT INTO site_admins (full_name, email, role, status) VALUES
    ('Admin User', 'admin@example.com', 'Admin', 'active'),
    ('John Doe', 'john@example.com', 'Content Manager', 'active'),
    ('Jane Smith', 'jane@example.com', 'Accountant', 'active'),
    ('Bob Viewer', 'bob@example.com', 'Viewer', 'active')
ON CONFLICT (email) DO NOTHING;

-- 8. Create admin_activity_log table (optional - for tracking admin actions)
CREATE TABLE IF NOT EXISTS admin_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES site_admins(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- 'create', 'update', 'delete', 'login', etc.
    resource_type TEXT, -- 'property', 'company', 'user', etc.
    resource_id TEXT,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_activity_admin_id ON admin_activity_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_action ON admin_activity_log(action);
CREATE INDEX IF NOT EXISTS idx_admin_activity_created_at ON admin_activity_log(created_at);

