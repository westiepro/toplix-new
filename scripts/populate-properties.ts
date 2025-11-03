/**
 * Property Database Population Script
 * 
 * This script:
 * 1. Fetches property images from Unsplash API
 * 2. Uploads them to Cloudinary for optimization
 * 3. Generates realistic property data
 * 4. Inserts properties and images into Supabase
 * 
 * Requirements:
 * - UNSPLASH_ACCESS_KEY in .env.local
 * - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.local
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
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME!;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY!;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Property types
const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Studio'];

// Portuguese cities with coordinates
const cities = [
  { name: 'Lagos', country: 'Portugal', lat: 37.1010, lng: -8.6730 },
  { name: 'Faro', country: 'Portugal', lat: 37.0194, lng: -7.9322 },
  { name: 'Albufeira', country: 'Portugal', lat: 37.0894, lng: -8.2500 },
  { name: 'Tavira', country: 'Portugal', lat: 37.1264, lng: -7.6485 },
  { name: 'Vilamoura', country: 'Portugal', lat: 37.0758, lng: -8.1094 },
  { name: 'Portimão', country: 'Portugal', lat: 37.1180, lng: -8.5344 },
  { name: 'Loulé', country: 'Portugal', lat: 37.1378, lng: -8.0192 },
  { name: 'Carvoeiro', country: 'Portugal', lat: 37.0944, lng: -8.4736 },
  { name: 'Olhão', country: 'Portugal', lat: 37.0260, lng: -7.8411 },
  { name: 'Quarteira', country: 'Portugal', lat: 37.0694, lng: -8.1006 },
  { name: 'Silves', country: 'Portugal', lat: 37.1901, lng: -8.4395 },
  { name: 'Lagoa', country: 'Portugal', lat: 37.1353, lng: -8.4522 },
  { name: 'Lisboa', country: 'Portugal', lat: 38.7223, lng: -9.1393 },
  { name: 'Porto', country: 'Portugal', lat: 41.1579, lng: -8.6291 },
  { name: 'Coimbra', country: 'Portugal', lat: 40.2033, lng: -8.4103 },
  // Spanish cities
  { name: 'Málaga', country: 'Spain', lat: 36.7213, lng: -4.4214 },
  { name: 'Marbella', country: 'Spain', lat: 36.5102, lng: -4.8860 },
  { name: 'Sevilla', country: 'Spain', lat: 37.3891, lng: -5.9845 },
  { name: 'Granada', country: 'Spain', lat: 37.1773, lng: -3.5986 },
  { name: 'Valencia', country: 'Spain', lat: 39.4699, lng: -0.3763 },
  { name: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734 },
  { name: 'Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038 },
];

// Street names for realistic addresses
const streetPrefixes = ['Rua', 'Avenida', 'Travessa', 'Praça', 'Alameda'];
const streetNames = [
  'da Praia', 'do Mar', 'das Flores', 'do Sol', 'da República', 
  'do Comércio', '25 de Abril', 'da Liberdade', 'dos Descobrimentos',
  'Infante Dom Henrique', 'Dom João II', 'Marquês de Pombal'
];

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
async function fetchUnsplashImages(query: string, count: number): Promise<string[]> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&orientation=landscape`,
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
 * Upload image to Cloudinary
 */
async function uploadToCloudinary(imageUrl: string, publicId: string): Promise<string | null> {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = await generateCloudinarySignature(publicId, timestamp);

    const formData = new FormData();
    formData.append('file', imageUrl);
    formData.append('public_id', publicId);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', cloudinaryApiKey);
    formData.append('signature', signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      console.warn(`Cloudinary upload error: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
}

/**
 * Generate Cloudinary signature for authenticated upload
 */
async function generateCloudinarySignature(publicId: string, timestamp: number): Promise<string> {
  const crypto = require('crypto');
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${cloudinaryApiSecret}`;
  return crypto.createHash('sha1').update(stringToSign).digest('hex');
}

/**
 * Generate random property data
 */
function generateProperty(city: typeof cities[0], index: number) {
  const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const beds = Math.floor(Math.random() * 5) + 1; // 1-5 beds
  const baths = Math.floor(Math.random() * beds) + 1; // 1-beds baths
  const area = Math.floor(Math.random() * 2000) + 500; // 500-2500 sqft
  const basePrice = propertyType === 'Villa' ? 600000 : 
                   propertyType === 'Penthouse' ? 800000 :
                   propertyType === 'Townhouse' ? 400000 : 250000;
  const price = basePrice + (Math.floor(Math.random() * 500000));
  
  const streetPrefix = streetPrefixes[Math.floor(Math.random() * streetPrefixes.length)];
  const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
  const number = Math.floor(Math.random() * 200) + 1;
  const address = `${streetPrefix} ${streetName} ${number}`;
  
  // Add some variation to coordinates (within ~1km radius)
  const latVariation = (Math.random() - 0.5) * 0.02;
  const lngVariation = (Math.random() - 0.5) * 0.02;
  
  const descriptions = [
    `Beautiful ${propertyType.toLowerCase()} in the heart of ${city.name}. Modern finishes, spacious rooms, and stunning views.`,
    `Charming ${propertyType.toLowerCase()} with ${beds} bedrooms located in a quiet neighborhood. Perfect for families.`,
    `Luxury ${propertyType.toLowerCase()} featuring high-end appliances, large terrace, and close to all amenities.`,
    `Newly renovated ${propertyType.toLowerCase()} with contemporary design. Walking distance to beaches and restaurants.`,
    `Spacious ${propertyType.toLowerCase()} with natural light throughout. Ideal for those seeking comfort and style.`
  ];
  
  return {
    price,
    address,
    city: city.name,
    country: city.country,
    beds,
    baths,
    area,
    property_type: propertyType,
    lat: city.lat + latVariation,
    lng: city.lng + lngVariation,
    description: descriptions[Math.floor(Math.random() * descriptions.length)]
  };
}

/**
 * Main population function
 */
async function populateDatabase() {
  console.log('🚀 Starting property database population...\n');

  // Check environment variables
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials');
    return;
  }

  if (!unsplashAccessKey) {
    console.error('❌ Missing Unsplash API key. Using placeholder images instead.');
  }

  if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
    console.error('❌ Missing Cloudinary credentials. Using direct URLs instead.');
  }

  console.log('📦 Fetching images from Unsplash...');
  
  // Fetch diverse property images - we need at least 5 images per property (60 properties * 5 = 300 images)
  // Using different queries and pages to ensure variety
  const queries = [
    'modern house interior',
    'luxury villa',
    'apartment living room',
    'house exterior architecture',
    'modern kitchen design',
    'luxury bedroom',
    'contemporary bathroom',
    'beautiful backyard',
    'luxury real estate',
    'modern apartment',
    'villa exterior',
    'penthouse interior'
  ];
  
  const allImages: string[] = [];
  
  for (const query of queries) {
    // Fetch 30 images per query
    const images = await fetchUnsplashImages(query, 30);
    allImages.push(...images);
    console.log(`   Fetched ${images.length} images for "${query}"`);
    // Small delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`✅ Fetched ${allImages.length} total images from Unsplash\n`);

  // Generate 60 properties
  const propertiesToCreate = 60;
  let propertiesCreated = 0;
  let imagesCreated = 0;

  for (let i = 0; i < propertiesToCreate; i++) {
    const city = cities[i % cities.length];
    const propertyData = generateProperty(city, i);

    console.log(`📍 Creating property ${i + 1}/${propertiesToCreate} in ${city.name}...`);

    // Insert property into database
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();

    if (propertyError || !property) {
      console.error(`❌ Error creating property: ${propertyError?.message}`);
      continue;
    }

    propertiesCreated++;

    // Select exactly 5 unique images for this property
    const numImages = 5;
    const propertyImages = [];
    
    // Calculate starting index to ensure each property gets different images
    const startIdx = (i * numImages) % allImages.length;
    const selectedImages: string[] = [];
    
    // Select 5 consecutive images (with wraparound if needed)
    for (let j = 0; j < numImages; j++) {
      const imageIdx = (startIdx + j) % allImages.length;
      selectedImages.push(allImages[imageIdx]);
    }

    for (let j = 0; j < numImages; j++) {
      const imageUrl = selectedImages[j];
      
      // Use Cloudinary if configured, otherwise use direct URL
      let finalImageUrl = imageUrl;
      
      if (cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret) {
        const cloudinaryUrl = await uploadToCloudinary(
          imageUrl,
          `properties/${property.id}_${j}`
        );
        if (cloudinaryUrl) {
          finalImageUrl = cloudinaryUrl;
        }
      }

      propertyImages.push({
        property_id: property.id,
        image_url: finalImageUrl,
        display_order: j,
        is_featured: j === 0, // First image is featured
      });
    }

    // Insert images into database
    const { error: imagesError } = await supabase
      .from('property_images')
      .insert(propertyImages);

    if (imagesError) {
      console.error(`❌ Error creating images: ${imagesError.message}`);
    } else {
      imagesCreated += propertyImages.length;
      console.log(`✅ Created ${propertyImages.length} images for property`);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n🎉 Database population complete!');
  console.log(`📊 Statistics:`);
  console.log(`   - Properties created: ${propertiesCreated}/${propertiesToCreate}`);
  console.log(`   - Images created: ${imagesCreated}`);
  console.log(`   - Average images per property: ${(imagesCreated / propertiesCreated).toFixed(1)}`);
}

// Run the script
populateDatabase().catch(console.error);
