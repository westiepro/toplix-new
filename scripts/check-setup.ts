/**
 * Database Setup Verification Script
 * 
 * This script checks if your database is properly configured
 * and provides helpful next steps.
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function checkSetup() {
  console.log('🔍 Checking database setup...\n');

  // Check environment variables
  console.log('1️⃣ Checking environment variables...');
  if (!supabaseUrl) {
    console.error('   ❌ NEXT_PUBLIC_SUPABASE_URL is missing');
    console.log('   Add it to your .env.local file\n');
    return;
  }
  if (!supabaseKey) {
    console.error('   ❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
    console.log('   Add it to your .env.local file\n');
    return;
  }
  console.log('   ✅ Environment variables configured\n');

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Check if properties table exists
  console.log('2️⃣ Checking properties table...');
  const { data: properties, error: propertiesError } = await supabase
    .from('properties')
    .select('id')
    .limit(1);

  if (propertiesError) {
    console.error('   ❌ Properties table not found or not accessible');
    console.error('   Error:', propertiesError.message);
    console.log('\n   📝 Next step: Create the database schema');
    console.log('   1. Go to your Supabase dashboard');
    console.log('   2. Open SQL Editor');
    console.log('   3. Copy/paste contents of supabase-properties-schema.sql');
    console.log('   4. Run the SQL script\n');
    return;
  }
  console.log('   ✅ Properties table exists\n');

  // Count properties
  console.log('3️⃣ Checking property count...');
  const { count: propertyCount, error: countError } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('   ⚠️  Could not count properties:', countError.message);
  } else if (propertyCount === 0) {
    console.log('   ⚠️  No properties found');
    console.log('\n   📝 Next step: Populate the database');
    console.log('   Run: npm run populate-properties\n');
    return;
  } else {
    console.log(`   ✅ Found ${propertyCount} properties\n`);
  }

  // Check if property_images table exists
  console.log('4️⃣ Checking property_images table...');
  const { data: images, error: imagesError } = await supabase
    .from('property_images')
    .select('id')
    .limit(1);

  if (imagesError) {
    console.error('   ❌ Property_images table not found or not accessible');
    console.error('   Error:', imagesError.message);
    console.log('\n   📝 Next step: Create the property_images table');
    console.log('   Run the SQL from supabase-properties-schema.sql\n');
    return;
  }
  console.log('   ✅ Property_images table exists\n');

  // Check image count
  console.log('5️⃣ Checking images...');
  const { count: imageCount, error: imageCountError } = await supabase
    .from('property_images')
    .select('*', { count: 'exact', head: true });

  if (imageCountError) {
    console.error('   ⚠️  Could not count images:', imageCountError.message);
  } else if (imageCount === 0) {
    console.log('   ⚠️  No images found');
    console.log('\n   📝 Next step: Add images to properties');
    console.log('   Run: npm run add-images\n');
    return;
  } else {
    console.log(`   ✅ Found ${imageCount} images\n`);
    
    // Calculate average images per property
    if (propertyCount && propertyCount > 0) {
      const avgImages = (imageCount / propertyCount).toFixed(1);
      console.log(`   📊 Average images per property: ${avgImages}`);
      
      if (parseFloat(avgImages) < 5) {
        console.log('   ⚠️  Some properties may not have 5 images');
        console.log('   💡 Tip: Run "npm run add-images" to ensure all properties have 5 images');
      } else {
        console.log('   ✅ All properties appear to have their images');
      }
    }
  }

  console.log('\n✨ Setup check complete!');
  console.log('\n📊 Summary:');
  console.log(`   Properties: ${propertyCount || 0}`);
  console.log(`   Images: ${imageCount || 0}`);
  console.log(`   Average images per property: ${propertyCount ? (imageCount! / propertyCount).toFixed(1) : 'N/A'}`);
  
  if (propertyCount && imageCount && imageCount >= propertyCount * 5) {
    console.log('\n🎉 Your database is fully set up with images!');
    console.log('   You can now run: npm run dev');
  }
}

checkSetup().catch((error) => {
  console.error('\n❌ Error during setup check:', error.message);
  console.log('\n📝 Make sure your Supabase credentials are correct in .env.local');
});

