-- Update the "Dashboard" translation to "My Dashboard"
-- Run this in your Supabase SQL Editor

UPDATE translations
SET translation_text = 'My Dashboard'
WHERE translation_key = 'navbar.dashboard'
AND language_code = 'en';

