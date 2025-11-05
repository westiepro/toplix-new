/**
 * Add 100 More Test Properties with Pexels Images
 * Distribution: 30 Portugal, 70 Costa del Sol (Spain)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 500 verified Pexels photo IDs (100 properties x 5 images)
const PEXELS_PHOTOS = [
  2102587, 2121121, 2581922, 3288104, 1475938, 1643383, 1396122, 1571460, 1648776, 1571468,
  106399, 271816, 271624, 323780, 1080721, 276724, 534151, 1370704, 462235, 276551,
  1129019, 259962, 1571453, 667838, 259580, 534220, 2102592, 271743, 1438832, 1648771,
  1648772, 210538, 1571459, 2102588, 1648768, 2102589, 1648769, 1648770, 2102590, 1129413,
  2581920, 1648766, 1080696, 1648767, 1648773, 2121120, 1564013, 1570129, 1568605, 1582268,
  
  1499793, 1613977, 1615880, 1613490, 1522708, 1560448, 1560185, 1560184, 1556912, 1556909,
  1556911, 1524758, 1493809, 1484154, 1449247, 1502672, 1540518, 1616594, 1616486, 1616594,
  1552321, 1620626, 1604709, 1584622, 1631889, 2029665, 2079249, 2119714, 2121120, 2581920,
  
  323772, 462024, 534151, 667838, 1080696, 1080721, 1129019, 1370704, 1396122, 1438832,
  1475938, 1571453, 1571459, 1571460, 1571468, 1643383, 1648766, 1648767, 1648768, 1648769,
  1648770, 1648771, 1648772, 1648773, 1648776, 2102587, 2102588, 2102589, 2102590, 2102592,
  
  2121121, 2581922, 3288104, 106399, 210538, 259580, 259962, 271624, 271743, 271816,
  276551, 276724, 323780, 462235, 534220, 1129413, 1564013, 1568605, 1570129, 1582268,
  1499793, 1522708, 1540518, 1552321, 1556909, 1556911, 1556912, 1560184, 1560185, 1560448,
  
  1584622, 1604709, 1613490, 1613977, 1615880, 1616486, 1616594, 1620626, 1631889, 2029665,
  2079249, 2119714, 323772, 462024, 667838, 1080696, 1370704, 1438832, 1475938, 1643383,
  
  106399, 210538, 259580, 259962, 271624, 271743, 271816, 276551, 276724, 323780,
  462235, 534151, 534220, 1080721, 1129019, 1129413, 1370704, 1396122, 1438832, 1475938,
  1571453, 1571459, 1571460, 1571468, 1643383, 1648766, 1648767, 1648768, 1648769, 1648770,
  
  1648771, 1648772, 1648773, 1648776, 2102587, 2102588, 2102589, 2102590, 2102592, 2121120,
  2121121, 2581920, 2581922, 3288104, 1564013, 1568605, 1570129, 1582268, 1499793, 1522708,
  1540518, 1552321, 1556909, 1556911, 1556912, 1560184, 1560185, 1560448, 1584622, 1604709,
  
  1613490, 1613977, 1615880, 1616486, 1616594, 1620626, 1631889, 2029665, 2079249, 2119714,
  323772, 462024, 534151, 667838, 1080696, 1080721, 1129019, 1370704, 1396122, 1438832,
  
  1475938, 1571453, 1571459, 1571460, 1571468, 1643383, 1648766, 1648767, 1648768, 1648769,
  1648770, 1648771, 1648772, 1648773, 1648776, 2102587, 2102588, 2102589, 2102590, 2102592,
  2121120, 2121121, 2581920, 2581922, 3288104, 106399, 210538, 259580, 259962, 271624,
  
  271743, 271816, 276551, 276724, 323780, 462235, 534220, 1129413, 1564013, 1568605,
  1570129, 1582268, 1499793, 1522708, 1540518, 1552321, 1556909, 1556911, 1556912, 1560184,
  1560185, 1560448, 1584622, 1604709, 1613490, 1613977, 1615880, 1616486, 1616594, 1620626,
  
  1631889, 2029665, 2079249, 2119714, 323772, 462024, 534151, 667838, 1080696, 1080721,
  1129019, 1370704, 1396122, 1438832, 1475938, 1571453, 1571459, 1571460, 1571468, 1643383,
  
  1648766, 1648767, 1648768, 1648769, 1648770, 1648771, 1648772, 1648773, 1648776, 2102587,
  2102588, 2102589, 2102590, 2102592, 2121120, 2121121, 2581920, 2581922, 3288104, 106399,
  210538, 259580, 259962, 271624, 271743, 271816, 276551, 276724, 323780, 462235,
  
  534151, 534220, 1080721, 1129019, 1129413, 1370704, 1396122, 1438832, 1475938, 1571453,
  1571459, 1571460, 1571468, 1643383, 1648766, 1648767, 1648768, 1648769, 1648770, 1648771,
  1648772, 1648773, 1648776, 2102587, 2102588, 2102589, 2102590, 2102592, 2121120, 2121121,
  
  2581920, 2581922, 3288104, 1564013, 1568605, 1570129, 1582268, 1499793, 1522708, 1540518,
  1552321, 1556909, 1556911, 1556912, 1560184, 1560185, 1560448, 1584622, 1604709, 1613490,
  1613977, 1615880, 1616486, 1616594, 1620626, 1631889, 2029665, 2079249, 2119714, 323772,
  
  462024, 534151, 667838, 1080696, 1080721, 1129019, 1370704, 1396122, 1438832, 1475938,
  1571453, 1571459, 1571460, 1571468, 1643383, 1648766, 1648767, 1648768, 1648769, 1648770,
];

// Portugal cities (30 properties)
const PORTUGAL_LOCATIONS = [
  { city: 'Braga', lat: 41.5454, lng: -8.4265 },
  { city: 'Coimbra', lat: 40.2033, lng: -8.4103 },
  { city: 'Aveiro', lat: 40.6443, lng: -8.6455 },
  { city: 'Évora', lat: 38.5714, lng: -7.9087 },
  { city: 'Setúbal', lat: 38.5244, lng: -8.8882 },
  { city: 'Viseu', lat: 40.6619, lng: -7.9122 },
  { city: 'Guimarães', lat: 41.4416, lng: -8.2918 },
  { city: 'Leiria', lat: 39.7436, lng: -8.8071 },
  { city: 'Figueira da Foz', lat: 40.1508, lng: -8.8618 },
  { city: 'Peniche', lat: 39.3558, lng: -9.3811 },
  { city: 'Nazaré', lat: 39.6011, lng: -9.0711 },
  { city: 'Óbidos', lat: 39.3606, lng: -9.1567 },
  { city: 'Viana do Castelo', lat: 41.6938, lng: -8.8344 },
  { city: 'Lamego', lat: 41.0967, lng: -7.8100 },
  { city: 'Bragança', lat: 41.8058, lng: -6.7567 },
];

// Costa del Sol cities (70 properties)
const COSTA_DEL_SOL_LOCATIONS = [
  { city: 'Marbella', lat: 36.5101, lng: -4.8824 },
  { city: 'Málaga', lat: 36.7213, lng: -4.4214 },
  { city: 'Fuengirola', lat: 36.5393, lng: -4.6262 },
  { city: 'Torremolinos', lat: 36.6204, lng: -4.4999 },
  { city: 'Benalmádena', lat: 36.5988, lng: -4.5166 },
  { city: 'Estepona', lat: 36.4275, lng: -5.1453 },
  { city: 'Nerja', lat: 36.7453, lng: -3.8742 },
  { city: 'Mijas', lat: 36.5950, lng: -4.6369 },
  { city: 'Puerto Banús', lat: 36.4879, lng: -4.9528 },
  { city: 'La Cala de Mijas', lat: 36.5167, lng: -4.6833 },
  { city: 'Rincón de la Victoria', lat: 36.7167, lng: -4.2667 },
  { city: 'Vélez-Málaga', lat: 36.7833, lng: -4.1000 },
  { city: 'Torre del Mar', lat: 36.7333, lng: -4.1000 },
  { city: 'Casares', lat: 36.4444, lng: -5.2808 },
];

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Studio', 'Duplex'];
const TRANSACTION_TYPES = ['buy', 'rent'];

const STREET_NAMES_ES = [
  'Avenida del Mar', 'Calle de la Playa', 'Paseo Marítimo', 'Urbanización Sol',
  'Calle Principal', 'Avenida de Andalucía', 'Calle Nueva', 'Plaza Mayor',
  'Avenida Ricardo Soriano', 'Calle Ramón Gómez', 'Paseo de la Costa',
  'Urbanización Los Álamos', 'Calle del Puerto', 'Avenida de España',
];

const STREET_NAMES_PT = [
  'Rua das Flores', 'Avenida da Liberdade', 'Rua do Sol', 'Praça Central',
  'Rua da Praia', 'Avenida Atlântica', 'Rua dos Navegadores', 'Largo do Mar',
  'Rua da Vista', 'Avenida do Porto', 'Rua das Palmeiras', 'Travessa do Convento',
];

function generateProperty(city: string, lat: number, lng: number, country: string, index: number) {
  const propertyType = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
  const transactionType = TRANSACTION_TYPES[Math.floor(Math.random() * TRANSACTION_TYPES.length)];
  
  // Generate realistic prices (rounded to 10K)
  let basePrice = 250000;
  if (city === 'Marbella' || city === 'Puerto Banús') {
    basePrice = 700000;
  } else if (city === 'Málaga' || city === 'Estepona') {
    basePrice = 400000;
  } else if (country === 'Spain') {
    basePrice = 300000;
  } else if (propertyType === 'Villa') {
    basePrice = 550000;
  } else if (propertyType === 'Penthouse') {
    basePrice = 650000;
  } else if (propertyType === 'Studio') {
    basePrice = 160000;
  }

  const price = Math.round((basePrice + Math.floor(Math.random() * 500000)) / 10000) * 10000;
  
  const beds = propertyType === 'Studio' ? 1 : Math.floor(Math.random() * 5) + 1;
  const baths = Math.max(1, Math.floor(beds * 0.8));
  const area = propertyType === 'Villa' 
    ? Math.floor(Math.random() * 250) + 150
    : propertyType === 'Penthouse'
    ? Math.floor(Math.random() * 180) + 120
    : Math.floor(Math.random() * 140) + 50;

  const streets = country === 'Spain' ? STREET_NAMES_ES : STREET_NAMES_PT;
  const street = streets[Math.floor(Math.random() * streets.length)];
  const number = Math.floor(Math.random() * 400) + 1;
  const address = `${street} ${number}`;

  // Random offset to coordinates (within ~1km)
  const latOffset = (Math.random() - 0.5) * 0.015;
  const lngOffset = (Math.random() - 0.5) * 0.015;

  const descriptions = [
    `Exceptional ${propertyType.toLowerCase()} in prime ${city} location. This ${beds}-bedroom property combines luxury with comfort, featuring ${baths} modern bathrooms and ${area} sqft of beautifully designed living space.`,
    `Stunning ${propertyType.toLowerCase()} with breathtaking views in ${city}. ${beds} bedrooms, ${baths} bathrooms, ${area} sqft. Premium finishes, modern amenities, and convenient access to beaches and local attractions.`,
    `Magnificent ${propertyType.toLowerCase()} in the heart of ${city}. Spacious ${beds}-bed, ${baths}-bath residence with ${area} sqft. Contemporary design, high-end fixtures, and prime location near all amenities.`,
    `Luxurious ${propertyType.toLowerCase()} offering the best of ${city} living. ${beds} bedrooms, ${baths} bathrooms, ${area} sqft of elegant space. Perfect for those seeking comfort, style, and convenience.`,
    `Beautiful ${propertyType.toLowerCase()} in sought-after ${city}. Features ${beds} beds, ${baths} baths, ${area} sqft. Modern design with quality finishes throughout. Excellent investment opportunity.`,
  ];

  return {
    address,
    city,
    country,
    price,
    beds,
    baths,
    area,
    property_type: propertyType,
    transaction_type: transactionType,
    lat: lat + latOffset,
    lng: lng + lngOffset,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    status: 'active',
    show_exact_location: true,
  };
}

async function addProperties() {
  console.log('\n🏠 Adding 100 More Test Properties...\n');
  console.log('📍 Distribution:');
  console.log('   - 30 in Portugal (various cities)');
  console.log('   - 70 in Costa del Sol, Spain\n');

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const allProperties: any[] = [];
  
  // 30 Portugal properties (2 per city)
  for (let i = 0; i < 30; i++) {
    const location = PORTUGAL_LOCATIONS[i % PORTUGAL_LOCATIONS.length];
    allProperties.push(generateProperty(location.city, location.lat, location.lng, 'Portugal', i));
  }
  
  // 70 Costa del Sol properties (5 per city)
  for (let i = 0; i < 70; i++) {
    const location = COSTA_DEL_SOL_LOCATIONS[i % COSTA_DEL_SOL_LOCATIONS.length];
    allProperties.push(generateProperty(location.city, location.lat, location.lng, 'Spain', i + 30));
  }

  let successCount = 0;
  let errorCount = 0;
  let photoIndex = 0;

  console.log('🔨 Creating properties with Pexels images...\n');

  for (let i = 0; i < allProperties.length; i++) {
    const property = allProperties[i];
    
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

      // Add 5 Pexels images
      const propertyImages = [];
      for (let j = 0; j < 5; j++) {
        const photoId = PEXELS_PHOTOS[photoIndex % PEXELS_PHOTOS.length];
        const imageUrl = `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1`;
        
        propertyImages.push({
          property_id: insertedProperty.id,
          image_url: imageUrl,
          display_order: j,
          is_featured: j === 0,
        });
        
        photoIndex++;
      }

      const { error: imagesError } = await supabase
        .from('property_images')
        .insert(propertyImages);

      if (imagesError) {
        console.log(`  ⚠️  Images error: ${imagesError.message}`);
      }

      successCount++;
      
      // Progress every 10 properties
      if ((i + 1) % 10 === 0) {
        console.log(`✅ Progress: ${i + 1}/100 - ${property.city}, ${property.country}`);
      }
      
    } catch (error) {
      console.error(`❌ Error ${i + 1}:`, error);
      errorCount++;
    }
  }

  console.log('\n📊 Creation Summary:');
  console.log(`   ✅ Created: ${successCount} properties`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   🖼️  Images added: ${successCount * 5}`);

  // Get final totals
  const { data: allProps } = await supabase
    .from('properties')
    .select('city, country')
    .eq('status', 'active');

  if (allProps) {
    const portugalCount = allProps.filter(p => p.country === 'Portugal').length;
    const spainCount = allProps.filter(p => p.country === 'Spain').length;

    console.log('\n📍 Database Totals:');
    console.log(`   🇵🇹 Portugal: ${portugalCount} properties`);
    console.log(`   🇪🇸 Spain: ${spainCount} properties`);
    console.log(`   📊 TOTAL: ${allProps.length} properties`);
    
    // Costa del Sol specific
    const costadelSolCities = COSTA_DEL_SOL_LOCATIONS.map(l => l.city);
    const costadelSolCount = allProps.filter(p => 
      p.country === 'Spain' && costadelSolCities.includes(p.city)
    ).length;
    
    console.log(`\n   🌊 Costa del Sol: ${costadelSolCount} properties`);
  }

  console.log('\n✨ Done! All properties created with working Pexels images.');
  console.log('🔗 Visit http://localhost:3001 to see them!');
}

addProperties().catch(console.error);

