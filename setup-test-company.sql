-- Create a test company to view the company page
-- Run this in your Supabase SQL Editor

INSERT INTO companies (
  name, 
  slug, 
  tagline, 
  description, 
  founded_year,
  email,
  phone,
  address,
  website,
  facebook,
  instagram,
  status,
  total_properties,
  properties_sold,
  active_agents,
  rating
) VALUES (
  'Premier Real Estate Portugal',
  'premier-real-estate',
  'Your Gateway to Luxury Living in Portugal',
  'Premier Real Estate Portugal is a leading property company specializing in luxury homes and investment properties across Portugal. With over 25 years of experience, we have established ourselves as a trusted name in the real estate industry. Our commitment to excellence, integrity, and personalized service has made us the preferred choice for buyers, sellers, and investors from around the world.',
  1998,
  'contact@premierrealestate.pt',
  '+351 210 123 456',
  'Avenida da Liberdade, 123, 1250-142 Lisboa, Portugal',
  'https://premierrealestate.pt',
  'https://facebook.com/premierrealestate',
  'https://instagram.com/premierrealestate',
  'active',
  24,
  500,
  8,
  4.8
) ON CONFLICT (slug) 
DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  status = 'active';

-- After running this, visit:
-- http://localhost:3001/en/company/premier-real-estate

