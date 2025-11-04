-- Real Estate Companies Database Schema
-- Run this SQL in your Supabase SQL Editor

-- 1. Create companies table
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    logo_url TEXT,
    name TEXT NOT NULL,
    description TEXT,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    website TEXT,
    address TEXT,
    city TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Portugal',
    tax_id TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
    subscription_plan TEXT NOT NULL DEFAULT 'free' CHECK (subscription_plan IN ('free', 'standard', 'premium', 'enterprise')),
    plan_start DATE,
    plan_end DATE,
    listings_limit INTEGER DEFAULT 5,
    agents_limit INTEGER DEFAULT 1,
    payment_status TEXT DEFAULT 'paid' CHECK (payment_status IN ('paid', 'unpaid', 'overdue')),
    stripe_customer_id TEXT UNIQUE,
    auto_renew BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create company_agents table
CREATE TABLE IF NOT EXISTS company_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'agent' CHECK (role IN ('manager', 'agent', 'marketing')),
    listings_count INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, email)
);

-- 3. Create company_invoices table
CREATE TABLE IF NOT EXISTS company_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    invoice_number TEXT NOT NULL UNIQUE,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('paid', 'unpaid', 'overdue', 'cancelled')),
    stripe_invoice_id TEXT,
    due_date DATE NOT NULL,
    paid_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Add company_id to properties table (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='properties' AND column_name='company_id') THEN
        ALTER TABLE properties ADD COLUMN company_id UUID REFERENCES companies(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_companies_status ON companies(status);
CREATE INDEX IF NOT EXISTS idx_companies_plan ON companies(subscription_plan);
CREATE INDEX IF NOT EXISTS idx_companies_email ON companies(email);
CREATE INDEX IF NOT EXISTS idx_company_agents_company_id ON company_agents(company_id);
CREATE INDEX IF NOT EXISTS idx_company_agents_email ON company_agents(email);
CREATE INDEX IF NOT EXISTS idx_company_invoices_company_id ON company_invoices(company_id);
CREATE INDEX IF NOT EXISTS idx_company_invoices_status ON company_invoices(status);
CREATE INDEX IF NOT EXISTS idx_properties_company_id ON properties(company_id);

-- 6. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_companies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_companies_updated_at_trigger ON companies;
CREATE TRIGGER update_companies_updated_at_trigger
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_companies_updated_at();

-- 8. Enable Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_invoices ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for companies
DROP POLICY IF EXISTS "Allow public read access to companies" ON companies;
CREATE POLICY "Allow public read access to companies"
    ON companies FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert companies" ON companies;
CREATE POLICY "Allow authenticated users to insert companies"
    ON companies FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update companies" ON companies;
CREATE POLICY "Allow authenticated users to update companies"
    ON companies FOR UPDATE
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to delete companies" ON companies;
CREATE POLICY "Allow authenticated users to delete companies"
    ON companies FOR DELETE
    TO authenticated
    USING (true);

-- 10. Create RLS policies for company_agents
DROP POLICY IF EXISTS "Allow public read access to company_agents" ON company_agents;
CREATE POLICY "Allow public read access to company_agents"
    ON company_agents FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to manage company_agents" ON company_agents;
CREATE POLICY "Allow authenticated users to manage company_agents"
    ON company_agents FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 11. Create RLS policies for company_invoices
DROP POLICY IF EXISTS "Allow public read access to company_invoices" ON company_invoices;
CREATE POLICY "Allow public read access to company_invoices"
    ON company_invoices FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to manage company_invoices" ON company_invoices;
CREATE POLICY "Allow authenticated users to manage company_invoices"
    ON company_invoices FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 12. Insert sample companies for testing
INSERT INTO companies (name, contact_person, email, phone, city, country, subscription_plan, status, listings_limit, agents_limit)
VALUES 
    ('Algarve Properties Ltd', 'Maria Silva', 'contact@algarveprops.com', '+351 912 345 678', 'Lagos', 'Portugal', 'premium', 'active', 50, 10),
    ('Coastal Real Estate', 'João Santos', 'info@coastalre.pt', '+351 913 456 789', 'Albufeira', 'Portugal', 'standard', 'active', 25, 5),
    ('Premium Homes Group', 'Ana Costa', 'hello@premiumhomes.com', '+351 914 567 890', 'Vilamoura', 'Portugal', 'enterprise', 'active', 100, 20),
    ('Local Properties', 'Pedro Oliveira', 'contact@localprops.pt', '+351 915 678 901', 'Faro', 'Portugal', 'free', 'pending', 5, 1)
ON CONFLICT (email) DO NOTHING;

