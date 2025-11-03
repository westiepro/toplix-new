/**
 * Add Property Images Script (Simplified)
 * 
 * This script:
 * 1. Fetches all existing properties from Supabase
 * 2. Adds exactly 5 curated real estate images to each property
 * 3. Uses Unsplash's public CDN (no API key required)
 * 
 * Requirements:
 * - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Curated Unsplash real estate images
 * Using specific photo IDs for high-quality, consistent real estate imagery
 */
const unsplashRealEstatePhotos = [
  // Modern houses and exteriors
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', // Modern house
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', // White modern house
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', // House exterior
  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80', // Villa exterior
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80', // Modern architecture
  
  // Luxury interiors
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80', // Living room
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80', // Modern interior
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80', // Luxury living room
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', // Open concept
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80', // Bright interior
  
  // Kitchens
  'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&q=80', // Modern kitchen
  'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=80', // White kitchen
  'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1200&q=80', // Kitchen island
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', // Contemporary kitchen
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&q=80', // Luxury kitchen
  
  // Bedrooms
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80', // Master bedroom
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80', // Modern bedroom
  'https://images.unsplash.com/photo-1616137422495-b5a5e1c88f8d?w=1200&q=80', // Cozy bedroom
  'https://images.unsplash.com/photo-1616046386807-2b0e9e0f6cb0?w=1200&q=80', // Bright bedroom
  'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=1200&q=80', // Minimalist bedroom
  
  // Bathrooms
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80', // Modern bathroom
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80', // Luxury bathroom
  'https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&q=80', // Spa bathroom
  'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80', // White bathroom
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&q=80', // Elegant bathroom
  
  // Outdoor spaces
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', // Backyard
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80', // Pool area
  'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80', // Garden
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80', // Patio
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', // Terrace
  
  // Additional modern homes
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80', // Contemporary house
  'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=80', // Modern villa
  'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=1200&q=80', // Luxury home
  'https://images.unsplash.com/photo-1600047509630-1aedde50c8bd?w=1200&q=80', // House facade
  'https://images.unsplash.com/photo-1600047509695-96deec905fd2?w=1200&q=80', // Modern exterior
  
  // Living spaces
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80', // Open living
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80', // Dining area
  'https://images.unsplash.com/photo-1600121848050-7bd30d4c4377?w=1200&q=80', // Family room
  'https://images.unsplash.com/photo-1600121848059-02b07c197895?w=1200&q=80', // Great room
  'https://images.unsplash.com/photo-1600121848106-f3e73f7e7833?w=1200&q=80', // Living area
  
  // More bedrooms
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80', // Guest bedroom
  'https://images.unsplash.com/photo-1631049307014-4ad5f6b5900c?w=1200&q=80', // Kids bedroom
  'https://images.unsplash.com/photo-1631049035634-c04d58cdeef6?w=1200&q=80', // Suite
  'https://images.unsplash.com/photo-1631049307365-53dd7df50f92?w=1200&q=80', // Bedroom view
  'https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=1200&q=80', // Master suite
  
  // Dining and kitchen areas
  'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80', // Dining room
  'https://images.unsplash.com/photo-1595428773981-0674eb039b80?w=1200&q=80', // Kitchen dining
  'https://images.unsplash.com/photo-1595428774291-2f275e86522c?w=1200&q=80', // Breakfast nook
  'https://images.unsplash.com/photo-1595526051245-c1dd652044ae?w=1200&q=80', // Dining space
  'https://images.unsplash.com/photo-1595526062672-a52ba3d36b8e?w=1200&q=80', // Eat-in kitchen
  
  // Offices and bonus rooms
  'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80', // Home office
  'https://images.unsplash.com/photo-1587825140635-fe7a66f8bc86?w=1200&q=80', // Study
  'https://images.unsplash.com/photo-1587825140882-20bf8b6b79f6?w=1200&q=80', // Library
  'https://images.unsplash.com/photo-1587825140798-f83fc60d7a25?w=1200&q=80', // Den
  'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80', // Work space
  
  // Entry and hallways
  'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&q=80', // Entryway
  'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80', // Foyer
  'https://images.unsplash.com/photo-1600210492390-cff4e2e87a0f?w=1200&q=80', // Hallway
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80', // Entry
  'https://images.unsplash.com/photo-1600210492577-cf89d3e0d728?w=1200&q=80', // Corridor
  
  // Luxury amenities
  'https://images.unsplash.com/photo-1600566752229-250ed79470d0?w=1200&q=80', // Wine cellar
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', // Theater room
  'https://images.unsplash.com/photo-1600566752534-4c5ca0257c0e?w=1200&q=80', // Gym
  'https://images.unsplash.com/photo-1600566752790-0ec3e2b31263?w=1200&q=80', // Spa
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80', // Pool
];

/**
 * Main function to add images to properties
 */
async function addImagesToProperties() {
  console.log('🚀 Starting to add images to properties...\n');

  // Check environment variables
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    console.error('   Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    return;
  }

  // Fetch all existing properties
  console.log('📦 Fetching existing properties...');
  const { data: properties, error: propertiesError } = await supabase
    .from('properties')
    .select('id, property_type, city');

  if (propertiesError || !properties) {
    console.error('❌ Error fetching properties:', propertiesError?.message);
    return;
  }

  console.log(`✅ Found ${properties.length} properties\n`);

  if (properties.length === 0) {
    console.log('ℹ️  No properties found. Please run the populate-properties script first.');
    return;
  }

  console.log(`📸 Using ${unsplashRealEstatePhotos.length} curated real estate images\n`);

  // Process each property
  let imagesAdded = 0;
  let propertiesUpdated = 0;

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    console.log(`📍 Processing property ${i + 1}/${properties.length} (${property.city})...`);

    // Delete existing images for this property
    const { error: deleteError } = await supabase
      .from('property_images')
      .delete()
      .eq('property_id', property.id);

    if (deleteError) {
      console.error(`   ❌ Error deleting old images: ${deleteError.message}`);
    }

    // Select 5 unique images for this property
    // Use modulo to ensure we cycle through the image pool
    const propertyImages = [];
    const startIdx = (i * 5) % unsplashRealEstatePhotos.length;

    for (let j = 0; j < 5; j++) {
      const imageIdx = (startIdx + j) % unsplashRealEstatePhotos.length;
      const imageUrl = unsplashRealEstatePhotos[imageIdx];

      propertyImages.push({
        property_id: property.id,
        image_url: imageUrl,
        display_order: j,
        is_featured: j === 0, // First image is featured
      });
    }

    // Insert new images
    const { error: insertError } = await supabase
      .from('property_images')
      .insert(propertyImages);

    if (insertError) {
      console.error(`   ❌ Error adding images: ${insertError.message}`);
    } else {
      imagesAdded += propertyImages.length;
      propertiesUpdated++;
      console.log(`   ✅ Added ${propertyImages.length} images`);
    }

    // Small delay to avoid overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n🎉 Image addition complete!');
  console.log(`📊 Statistics:`);
  console.log(`   - Properties updated: ${propertiesUpdated}/${properties.length}`);
  console.log(`   - Total images added: ${imagesAdded}`);
  console.log(`   - Average images per property: ${(imagesAdded / propertiesUpdated).toFixed(1)}`);
}

// Run the script
addImagesToProperties().catch(console.error);

