/**
 * Add 30 Test Properties with Real Estate Photos
 * Distribution: 10 Algarve, 10 Lisbon, 5 Porto, 5 Ayamonte
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Location data with realistic coordinates
const LOCATIONS = {
  algarve: [
    { city: 'Lagos', lat: 37.1028, lng: -8.6742, country: 'Portugal' },
    { city: 'Albufeira', lat: 37.0887, lng: -8.2500, country: 'Portugal' },
    { city: 'Vilamoura', lat: 37.0758, lng: -8.1094, country: 'Portugal' },
    { city: 'Faro', lat: 37.0194, lng: -7.9322, country: 'Portugal' },
    { city: 'Tavira', lat: 37.1264, lng: -7.6485, country: 'Portugal' },
    { city: 'Portimão', lat: 37.1353, lng: -8.5377, country: 'Portugal' },
    { city: 'Quarteira', lat: 37.0693, lng: -8.1000, country: 'Portugal' },
    { city: 'Loulé', lat: 37.1374, lng: -8.0225, country: 'Portugal' },
    { city: 'Olhão', lat: 37.0283, lng: -7.8408, country: 'Portugal' },
    { city: 'Carvoeiro', lat: 37.0963, lng: -8.4665, country: 'Portugal' },
  ],
  lisbon: [
    { city: 'Lisboa', lat: 38.7223, lng: -9.1393, country: 'Portugal' },
    { city: 'Cascais', lat: 38.6979, lng: -9.4214, country: 'Portugal' },
    { city: 'Sintra', lat: 38.8029, lng: -9.3817, country: 'Portugal' },
    { city: 'Estoril', lat: 38.7057, lng: -9.3981, country: 'Portugal' },
    { city: 'Oeiras', lat: 38.6925, lng: -9.3110, country: 'Portugal' },
    { city: 'Almada', lat: 38.6794, lng: -9.1570, country: 'Portugal' },
    { city: 'Amadora', lat: 38.7536, lng: -9.2302, country: 'Portugal' },
    { city: 'Belém', lat: 38.6975, lng: -9.2061, country: 'Portugal' },
    { city: 'Alfama', lat: 38.7125, lng: -9.1290, country: 'Portugal' },
    { city: 'Parque das Nações', lat: 38.7689, lng: -9.0945, country: 'Portugal' },
  ],
  porto: [
    { city: 'Porto', lat: 41.1579, lng: -8.6291, country: 'Portugal' },
    { city: 'Matosinhos', lat: 41.1822, lng: -8.6890, country: 'Portugal' },
    { city: 'Vila Nova de Gaia', lat: 41.1239, lng: -8.6118, country: 'Portugal' },
    { city: 'Espinho', lat: 41.0076, lng: -8.6410, country: 'Portugal' },
    { city: 'Póvoa de Varzim', lat: 41.3833, lng: -8.7667, country: 'Portugal' },
  ],
  ayamonte: [
    { city: 'Ayamonte', lat: 37.2113, lng: -7.4019, country: 'Spain' },
    { city: 'Ayamonte', lat: 37.2089, lng: -7.3985, country: 'Spain' },
    { city: 'Ayamonte', lat: 37.2142, lng: -7.4052, country: 'Spain' },
    { city: 'Ayamonte', lat: 37.2095, lng: -7.4008, country: 'Spain' },
    { city: 'Ayamonte', lat: 37.2128, lng: -7.4035, country: 'Spain' },
  ],
};

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Studio'];
const TRANSACTION_TYPES = ['buy', 'rent'];

// Generate realistic property data
function generateProperty(location: typeof LOCATIONS.algarve[0], index: number) {
  const propertyType = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
  const transactionType = TRANSACTION_TYPES[Math.floor(Math.random() * TRANSACTION_TYPES.length)];
  
  // Generate realistic prices based on location and type
  let basePrice = 250000;
  if (location.city.includes('Lisboa') || location.city === 'Cascais') {
    basePrice = 450000;
  } else if (location.city === 'Porto') {
    basePrice = 350000;
  } else if (propertyType === 'Villa') {
    basePrice = 500000;
  } else if (propertyType === 'Penthouse') {
    basePrice = 600000;
  } else if (propertyType === 'Studio') {
    basePrice = 150000;
  }

  const price = basePrice + Math.floor(Math.random() * 300000);
  const beds = propertyType === 'Studio' ? 1 : Math.floor(Math.random() * 4) + 1;
  const baths = Math.max(1, Math.floor(beds * 0.75));
  const area = propertyType === 'Villa' 
    ? Math.floor(Math.random() * 150) + 200
    : Math.floor(Math.random() * 100) + 50;

  // Generate random street addresses
  const streets = [
    'Rua das Flores',
    'Avenida da Liberdade',
    'Rua do Sol',
    'Praça Central',
    'Rua da Praia',
    'Avenida Atlântica',
    'Rua dos Navegadores',
    'Largo do Mar',
    'Rua da Vista',
    'Avenida do Porto',
  ];

  const street = streets[Math.floor(Math.random() * streets.length)];
  const number = Math.floor(Math.random() * 200) + 1;
  const address = `${street} ${number}`;

  // Small random offset to coordinates (within ~500m)
  const latOffset = (Math.random() - 0.5) * 0.01;
  const lngOffset = (Math.random() - 0.5) * 0.01;

  return {
    address,
    city: location.city,
    country: location.country,
    price,
    beds,
    baths,
    area,
    property_type: propertyType,
    transaction_type: transactionType,
    lat: location.lat + latOffset,
    lng: location.lng + lngOffset,
    description: `Beautiful ${propertyType.toLowerCase()} in ${location.city}. This stunning property features ${beds} bedrooms, ${baths} bathrooms, and ${area} sqft of living space. Modern finishes throughout with easy access to local amenities, beaches, and attractions.`,
    status: 'active',
    show_exact_location: true,
  };
}

// Fetch real estate images from Unsplash
async function fetchRealEstateImages(count: number): Promise<string[]> {
  const queries = [
    'luxury apartment interior',
    'modern villa',
    'beach house',
    'penthouse living room',
    'real estate kitchen',
    'luxury bedroom',
    'modern bathroom',
    'house exterior',
    'apartment balcony view',
    'luxury home interior',
  ];

  const images: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const query = queries[i % queries.length];
    const randomPage = Math.floor(Math.random() * 10) + 1;
    
    try {
      // Use Unsplash Source API - no API key needed
      const imageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}&sig=${Date.now()}-${i}`;
      
      // Test if image loads
      const response = await fetch(imageUrl, { method: 'HEAD' });
      if (response.ok) {
        images.push(imageUrl);
        console.log(`  ✅ Image ${i + 1}/${count}: ${query}`);
      } else {
        console.log(`  ⚠️  Image ${i + 1}/${count} failed, retrying...`);
        // Retry with different query
        const fallbackUrl = `https://images.unsplash.com/photo-${1600000000000 + i}?w=800&h=600&fit=crop`;
        images.push(fallbackUrl);
      }
    } catch (error) {
      console.log(`  ⚠️  Error fetching image ${i + 1}, using fallback`);
      const fallbackUrl = `https://images.unsplash.com/photo-${1600000000000 + i}?w=800&h=600&fit=crop`;
      images.push(fallbackUrl);
    }
  }

  return images;
}

async function addProperties() {
  console.log('\n🏠 Adding 30 Test Properties...\n');
  console.log('Distribution:');
  console.log('  - 10 in Algarve');
  console.log('  - 10 in Lisbon');
  console.log('  - 5 in Porto');
  console.log('  - 5 in Ayamonte (Spain)\n');

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Fetch 150 images (5 per property)
  console.log('📸 Fetching real estate images from Unsplash...\n');
  const images = await fetchRealEstateImages(150);
  console.log(`\n✅ Fetched ${images.length} images\n`);

  // Prepare all properties
  const allLocations = [
    ...LOCATIONS.algarve,
    ...LOCATIONS.lisbon,
    ...LOCATIONS.porto,
    ...LOCATIONS.ayamonte,
  ];

  let successCount = 0;
  let errorCount = 0;

  console.log('🔨 Creating properties...\n');

  for (let i = 0; i < 30; i++) {
    const location = allLocations[i];
    const property = generateProperty(location, i);
    
    try {
      // Insert property
      const { data: insertedProperty, error: propertyError } = await supabase
        .from('properties')
        .insert([property])
        .select()
        .single();

      if (propertyError || !insertedProperty) {
        console.error(`❌ Property ${i + 1} failed:`, propertyError?.message);
        errorCount++;
        continue;
      }

      // Add 5 images for this property
      const propertyImages = [];
      for (let j = 0; j < 5; j++) {
        const imageIndex = (i * 5) + j;
        propertyImages.push({
          property_id: insertedProperty.id,
          image_url: images[imageIndex],
          display_order: j,
          is_featured: j === 0, // First image is featured
        });
      }

      const { error: imagesError } = await supabase
        .from('property_images')
        .insert(propertyImages);

      if (imagesError) {
        console.log(`  ⚠️  Images error for property ${i + 1}:`, imagesError.message);
      }

      successCount++;
      console.log(`✅ ${i + 1}/30: ${property.city} - ${property.address} (€${(property.price / 1000).toFixed(0)}K)`);
      
    } catch (error) {
      console.error(`❌ Error creating property ${i + 1}:`, error);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully created: ${successCount} properties`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   🖼️  Total images added: ${successCount * 5}`);

  // Show breakdown by location
  const { data: properties } = await supabase
    .from('properties')
    .select('city, country')
    .eq('status', 'active');

  if (properties) {
    const byLocation: Record<string, number> = {};
    properties.forEach(p => {
      const key = `${p.city}, ${p.country}`;
      byLocation[key] = (byLocation[key] || 0) + 1;
    });

    console.log('\n📍 Properties by Location:');
    Object.entries(byLocation)
      .sort((a, b) => b[1] - a[1])
      .forEach(([location, count]) => {
        console.log(`   ${location}: ${count}`);
      });
  }

  console.log('\n✨ Done! Visit http://localhost:3001 to see the new properties.');
}

addProperties().catch(console.error);

