/**
 * Property API Test Script
 * 
 * This script tests if your property API is working correctly
 * and provides detailed debugging information.
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function testPropertyAPI() {
  console.log('🔍 Testing Property API...\n');

  // Check environment variables
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    return;
  }

  console.log('✅ Supabase credentials found\n');

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Test 1: Check if properties table exists and has data
  console.log('1️⃣ Checking properties table...');
  const { data: properties, error: propertiesError } = await supabase
    .from('properties')
    .select('*')
    .limit(5);

  if (propertiesError) {
    console.error('   ❌ Error:', propertiesError.message);
    console.log('\n   💡 Fix: Run the SQL schema in Supabase SQL Editor');
    return;
  }

  if (!properties || properties.length === 0) {
    console.log('   ⚠️  No properties found in database');
    console.log('\n   💡 Fix: Add a property using the admin panel or run: npm run populate-properties');
    return;
  }

  console.log(`   ✅ Found ${properties.length} properties\n`);

  // Test 2: Check first property details
  const firstProperty = properties[0];
  console.log('2️⃣ First Property Details:');
  console.log(`   ID: ${firstProperty.id}`);
  console.log(`   Address: ${firstProperty.address}`);
  console.log(`   City: ${firstProperty.city}`);
  console.log(`   Price: €${firstProperty.price?.toLocaleString()}`);
  console.log(`   Beds: ${firstProperty.beds} | Baths: ${firstProperty.baths}`);
  console.log(`   Type: ${firstProperty.property_type}`);
  console.log(`   Status: ${firstProperty.status || 'unknown'}`);
  console.log(`   Location: ${firstProperty.lat}, ${firstProperty.lng}\n`);

  // Test 3: Check for images
  console.log('3️⃣ Checking property images...');
  const { data: images, error: imagesError } = await supabase
    .from('property_images')
    .select('*')
    .eq('property_id', firstProperty.id)
    .order('display_order', { ascending: true });

  if (imagesError) {
    console.log('   ⚠️  Error fetching images:', imagesError.message);
  } else if (!images || images.length === 0) {
    console.log('   ⚠️  No images found for this property');
    console.log('   💡 Add images using admin panel or run: npm run add-images');
  } else {
    console.log(`   ✅ Found ${images.length} images`);
    images.forEach((img: any, index: number) => {
      console.log(`      ${index + 1}. ${img.is_featured ? '⭐ ' : ''}${img.image_url.substring(0, 60)}...`);
    });
  }

  // Test 4: Test API endpoint simulation
  console.log('\n4️⃣ Testing property fetch logic...');
  
  const { data: testProperty, error: testError } = await supabase
    .from('properties')
    .select('*')
    .eq('id', firstProperty.id)
    .single();

  if (testError) {
    console.error('   ❌ Error:', testError.message);
    return;
  }

  const { data: testImages } = await supabase
    .from('property_images')
    .select('*')
    .eq('property_id', firstProperty.id)
    .order('display_order', { ascending: true });

  const imageUrls = (testImages || []).map((img: any) => img.image_url);

  console.log('   ✅ Property fetch successful');
  console.log(`   ID: ${testProperty.id}`);
  console.log(`   Images found: ${imageUrls.length}`);

  // Test 5: Check RLS policies
  console.log('\n5️⃣ Testing RLS policies...');
  
  // Try to fetch without auth (should work for public read)
  const { data: publicTest, error: publicError } = await supabase
    .from('properties')
    .select('id, address')
    .eq('id', firstProperty.id)
    .single();

  if (publicError) {
    console.error('   ❌ Public read policy issue:', publicError.message);
    console.log('   💡 Fix: Enable RLS policy "Allow public read access to properties"');
  } else {
    console.log('   ✅ Public read access working');
  }

  // Final Summary
  console.log('\n📊 Summary:');
  console.log('─────────────────────────────────────');
  console.log(`Total Properties: ${properties.length}`);
  console.log(`First Property ID: ${firstProperty.id}`);
  console.log(`Has Images: ${imageUrls.length > 0 ? 'Yes' : 'No'}`);
  console.log(`RLS Working: ${publicError ? 'No ❌' : 'Yes ✅'}`);
  
  console.log('\n🔗 Test URLs:');
  console.log(`Local: http://localhost:3000/en/property/${firstProperty.id}`);
  console.log(`API: http://localhost:3000/api/properties/${firstProperty.id}`);
  
  console.log('\n✨ Next Steps:');
  if (imageUrls.length === 0) {
    console.log('1. Add images to your property using the admin panel');
    console.log('   OR run: npm run add-images');
  }
  console.log('2. Start dev server: npm run dev');
  console.log(`3. Visit: http://localhost:3000/en/property/${firstProperty.id}`);
  console.log('4. If it works locally, push to Vercel!');
}

testPropertyAPI().catch((error) => {
  console.error('\n❌ Test failed:', error.message);
});

