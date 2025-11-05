-- Simple test company insert (works with existing companies table)
-- Run this in your Supabase SQL Editor

-- First, check what columns exist in your companies table
-- If this works, skip to the INSERT below

-- Insert a simple test company with only required fields
INSERT INTO companies (
  name,
  contact_person,
  email,
  city,
  country,
  status
) VALUES (
  'Premier Real Estate Portugal',
  'John Silva',
  'contact.premier@example.com',
  'Lisboa',
  'Portugal',
  'active'
) 
ON CONFLICT (email) DO UPDATE 
SET status = 'active';

-- Get the company ID that was just created
SELECT id, name, email, status 
FROM companies 
WHERE email = 'contact.premier@example.com';

-- Now update it with additional fields if they exist
UPDATE companies 
SET 
  slug = 'premier-real-estate',
  tagline = 'Your Gateway to Luxury Living',
  description = 'Leading real estate company in Portugal',
  founded_year = 1998,
  phone = '+351 210 123 456',
  address = 'Avenida da Liberdade, 123, Lisboa',
  website = 'https://premierrealestate.pt',
  facebook = 'https://facebook.com/premierrealestate',
  instagram = 'https://instagram.com/premierrealestate',
  total_properties = 24,
  properties_sold = 500,
  active_agents = 8,
  rating = 4.8
WHERE email = 'contact.premier@example.com';

-- Verify it was created
SELECT * FROM companies WHERE slug = 'premier-real-estate';

