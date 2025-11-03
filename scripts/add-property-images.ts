/**
 * Add Property Images Script
 * 
 * This script:
 * 1. Fetches all existing properties from Supabase
 * 2. For each property, fetches 5 unique real estate images from Unsplash
 * 3. Deletes existing images for each property
 * 4. Adds exactly 5 new images to each property
 * 
 * Requirements:
 * - UNSPLASH_ACCESS_KEY in .env.local
 * - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
}

/**
 * Fetch images from Unsplash API
 */
async function fetchUnsplashImages(query: string, count: number, page: number = 1): Promise<string[]> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&page=${page}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${unsplashAccessKey}`,
        },
      }
    );

    if (!response.ok) {
      console.warn(`Unsplash API error: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    return data.results.map((img: UnsplashImage) => img.urls.regular);
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    return [];
  }
}

/**
 * Main function to add images to properties
 */
async function addImagesToProperties() {
  console.log('🚀 Starting to add images to properties...\n');

  // Check environment variables
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials');
    return;
  }

  if (!unsplashAccessKey) {
    console.error('❌ Missing Unsplash API key.');
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

  // Define diverse real estate search queries
  const queries = [
    'modern house interior',
    'luxury villa exterior',
    'apartment living room',
    'contemporary kitchen design',
    'luxury bedroom interior',
    'modern bathroom design',
    'beautiful backyard garden',
    'luxury real estate',
    'penthouse interior',
    'modern apartment',
    'villa architecture',
    'elegant home interior'
  ];

  // Fetch a large pool of images
  console.log('📸 Fetching images from Unsplash...');
  const allImages: string[] = [];
  
  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    // Fetch 30 images per query to ensure we have enough variety
    const images = await fetchUnsplashImages(query, 30, 1);
    allImages.push(...images);
    console.log(`   Fetched ${images.length} images for "${query}"`);
    
    // Small delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`✅ Fetched ${allImages.length} total images from Unsplash\n`);

  if (allImages.length < properties.length * 5) {
    console.warn(`⚠️  Warning: Only fetched ${allImages.length} images for ${properties.length * 5} needed (${properties.length} properties × 5 images)`);
    console.warn('   Some images may be reused across properties.\n');
  }

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
    const propertyImages = [];
    const startIdx = (i * 5) % allImages.length;

    for (let j = 0; j < 5; j++) {
      const imageIdx = (startIdx + j) % allImages.length;
      const imageUrl = allImages[imageIdx];

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

