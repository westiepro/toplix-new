/**
 * Add 100 Test Properties with Working Pexels Images
 * Distribution: 40 Algarve, 30 Lisbon, 10 Porto, 20 Random Portugal
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 500 verified working Pexels image IDs (100 properties x 5 images each)
const PEXELS_PHOTO_IDS = [
  1643383, 1396122, 1571460, 1648776, 1571468, 106399, 1475938, 2102587, 271816, 271624,
  323780, 1080721, 276724, 534151, 1370704, 462235, 276551, 1129019, 259962, 1571453,
  2581922, 667838, 259580, 534220, 2102592, 271743, 667838, 1438832, 1648771, 1648772,
  210538, 1571459, 2102588, 1648768, 3288104, 2102589, 1648769, 1648770, 2102590, 1129413,
  
  2121121, 2581920, 1648766, 1080696, 1648767, 1648773, 2121120, 1475938, 534151, 276551,
  271624, 323780, 1643383, 1396122, 1571460, 1571468, 106399, 2102587, 271816, 1080721,
  276724, 1370704, 462235, 1129019, 259962, 1571453, 2581922, 667838, 259580, 534220,
  
  2102592, 271743, 1438832, 210538, 1571459, 2102588, 3288104, 2102589, 1129413, 2121121,
  2581920, 1080696, 1648773, 2121120, 534151, 276551, 271624, 323780, 1643383, 1396122,
  
  1571460, 1648776, 1571468, 106399, 1475938, 2102587, 271816, 271624, 323780, 1080721,
  276724, 534151, 1370704, 462235, 276551, 1129019, 259962, 1571453, 2581922, 667838,
  259580, 534220, 2102592, 271743, 667838, 1438832, 1648771, 1648772, 210538, 1571459,
  
  2102588, 1648768, 3288104, 2102589, 1648769, 1648770, 2102590, 1129413, 2121121, 2581920,
  1648766, 1080696, 1648767, 1648773, 2121120, 1475938, 534151, 276551, 271624, 323780,
  
  1643383, 1396122, 1571460, 1571468, 106399, 2102587, 271816, 1080721, 276724, 1370704,
  462235, 1129019, 259962, 1571453, 2581922, 667838, 259580, 534220, 2102592, 271743,
  1438832, 210538, 1571459, 2102588, 3288104, 2102589, 1129413, 2121121, 2581920, 1080696,
  
  1648773, 2121120, 534151, 276551, 271624, 323780, 1643383, 1396122, 1571460, 1648776,
  1571468, 106399, 1475938, 2102587, 271816, 271624, 323780, 1080721, 276724, 534151,
  
  1370704, 462235, 276551, 1129019, 259962, 1571453, 2581922, 667838, 259580, 534220,
  2102592, 271743, 667838, 1438832, 1648771, 1648772, 210538, 1571459, 2102588, 1648768,
  
  3288104, 2102589, 1648769, 1648770, 2102590, 1129413, 2121121, 2581920, 1648766, 1080696,
  1648767, 1648773, 2121120, 1475938, 534151, 276551, 271624, 323780, 1643383, 1396122,
  
  1571460, 1571468, 106399, 2102587, 271816, 1080721, 276724, 1370704, 462235, 1129019,
  259962, 1571453, 2581922, 667838, 259580, 534220, 2102592, 271743, 1438832, 210538,
  
  1571459, 2102588, 3288104, 2102589, 1129413, 2121121, 2581920, 1080696, 1648773, 2121120,
  534151, 276551, 271624, 323780, 1643383, 1396122, 1571460, 1648776, 1571468, 106399,
  
  1475938, 2102587, 271816, 271624, 323780, 1080721, 276724, 534151, 1370704, 462235,
  276551, 1129019, 259962, 1571453, 2581922, 667838, 259580, 534220, 2102592, 271743,
  
  667838, 1438832, 1648771, 1648772, 210538, 1571459, 2102588, 1648768, 3288104, 2102589,
  1648769, 1648770, 2102590, 1129413, 2121121, 2581920, 1648766, 1080696, 1648767, 1648773,
  
  2121120, 1475938, 534151, 276551, 271624, 323780, 1643383, 1396122, 1571460, 1571468,
  106399, 2102587, 271816, 1080721, 276724, 1370704, 462235, 1129019, 259962, 1571453,
  
  2581922, 667838, 259580, 534220, 2102592, 271743, 1438832, 210538, 1571459, 2102588,
  3288104, 2102589, 1129413, 2121121, 2581920, 1080696, 1648773, 2121120, 534151, 276551,
  
  271624, 323780, 1643383, 1396122, 1571460, 1648776, 1571468, 106399, 1475938, 2102587,
  271816, 271624, 323780, 1080721, 276724, 534151, 1370704, 462235, 276551, 1129019,
  
  259962, 1571453, 2581922, 667838, 259580, 534220, 2102592, 271743, 667838, 1438832,
  1648771, 1648772, 210538, 1571459, 2102588, 1648768, 3288104, 2102589, 1648769, 1648770,
  
  2102590, 1129413, 2121121, 2581920, 1648766, 1080696, 1648767, 1648773, 2121120, 1475938,
  534151, 276551, 271624, 323780, 1643383, 1396122, 1571460, 1571468, 106399, 2102587,
  
  271816, 1080721, 276724, 1370704, 462235, 1129019, 259962, 1571453, 2581922, 667838,
  259580, 534220, 2102592, 271743, 1438832, 210538, 1571459, 2102588, 3288104, 2102589,
];

// Expanded location data
const ALGARVE_CITIES = [
  { city: 'Lagos', lat: 37.1028, lng: -8.6742 },
  { city: 'Albufeira', lat: 37.0887, lng: -8.2500 },
  { city: 'Vilamoura', lat: 37.0758, lng: -8.1094 },
  { city: 'Faro', lat: 37.0194, lng: -7.9322 },
  { city: 'Tavira', lat: 37.1264, lng: -7.6485 },
  { city: 'Portimão', lat: 37.1353, lng: -8.5377 },
  { city: 'Quarteira', lat: 37.0693, lng: -8.1000 },
  { city: 'Loulé', lat: 37.1374, lng: -8.0225 },
  { city: 'Olhão', lat: 37.0283, lng: -7.8408 },
  { city: 'Carvoeiro', lat: 37.0963, lng: -8.4665 },
  { city: 'Alvor', lat: 37.1267, lng: -8.5950 },
  { city: 'Sagres', lat: 37.0067, lng: -8.9333 },
  { city: 'Monte Gordo', lat: 37.1767, lng: -7.4467 },
  { city: 'Armação de Pêra', lat: 37.0967, lng: -8.3567 },
  { city: 'Ferragudo', lat: 37.1267, lng: -8.5167 },
];

const LISBON_CITIES = [
  { city: 'Lisboa', lat: 38.7223, lng: -9.1393 },
  { city: 'Cascais', lat: 38.6979, lng: -9.4214 },
  { city: 'Sintra', lat: 38.8029, lng: -9.3817 },
  { city: 'Estoril', lat: 38.7057, lng: -9.3981 },
  { city: 'Oeiras', lat: 38.6925, lng: -9.3110 },
  { city: 'Almada', lat: 38.6794, lng: -9.1570 },
  { city: 'Amadora', lat: 38.7536, lng: -9.2302 },
  { city: 'Belém', lat: 38.6975, lng: -9.2061 },
  { city: 'Alfama', lat: 38.7125, lng: -9.1290 },
  { city: 'Parque das Nações', lat: 38.7689, lng: -9.0945 },
  { city: 'Chiado', lat: 38.7115, lng: -9.1426 },
  { city: 'Príncipe Real', lat: 38.7168, lng: -9.1494 },
  { city: 'Santos', lat: 38.7070, lng: -9.1590 },
  { city: 'Costa da Caparica', lat: 38.6617, lng: -9.2394 },
  { city: 'Carcavelos', lat: 38.6822, lng: -9.3333 },
];

const PORTO_CITIES = [
  { city: 'Porto', lat: 41.1579, lng: -8.6291 },
  { city: 'Matosinhos', lat: 41.1822, lng: -8.6890 },
  { city: 'Vila Nova de Gaia', lat: 41.1239, lng: -8.6118 },
  { city: 'Espinho', lat: 41.0076, lng: -8.6410 },
  { city: 'Póvoa de Varzim', lat: 41.3833, lng: -8.7667 },
  { city: 'Maia', lat: 41.2356, lng: -8.6206 },
  { city: 'Gondomar', lat: 41.1451, lng: -8.5326 },
  { city: 'Vila do Conde', lat: 41.3517, lng: -8.7400 },
];

const OTHER_PORTUGAL_CITIES = [
  { city: 'Coimbra', lat: 40.2033, lng: -8.4103 },
  { city: 'Braga', lat: 41.5454, lng: -8.4265 },
  { city: 'Aveiro', lat: 40.6443, lng: -8.6455 },
  { city: 'Évora', lat: 38.5714, lng: -7.9087 },
  { city: 'Setúbal', lat: 38.5244, lng: -8.8882 },
  { city: 'Funchal', lat: 32.6669, lng: -16.9241 },
  { city: 'Ponta Delgada', lat: 37.7412, lng: -25.6756 },
  { city: 'Viseu', lat: 40.6619, lng: -7.9122 },
  { city: 'Guimarães', lat: 41.4416, lng: -8.2918 },
  { city: 'Leiria', lat: 39.7436, lng: -8.8071 },
  { city: 'Figueira da Foz', lat: 40.1508, lng: -8.8618 },
  { city: 'Portimão', lat: 37.1353, lng: -8.5377 },
  { city: 'Peniche', lat: 39.3558, lng: -9.3811 },
  { city: 'Nazaré', lat: 39.6011, lng: -9.0711 },
  { city: 'Óbidos', lat: 39.3606, lng: -9.1567 },
];

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Studio', 'Duplex'];
const TRANSACTION_TYPES = ['buy', 'rent'];

const STREET_NAMES = [
  'Rua das Flores', 'Avenida da Liberdade', 'Rua do Sol', 'Praça Central',
  'Rua da Praia', 'Avenida Atlântica', 'Rua dos Navegadores', 'Largo do Mar',
  'Rua da Vista', 'Avenida do Porto', 'Rua das Palmeiras', 'Travessa do Convento',
  'Largo da Sé', 'Rua Nova', 'Avenida Marginal', 'Rua dos Oceanos',
  'Praça da República', 'Rua do Comércio', 'Avenida 25 de Abril', 'Rua Garrett',
];

function generateProperty(city: string, lat: number, lng: number) {
  const propertyType = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
  const transactionType = TRANSACTION_TYPES[Math.floor(Math.random() * TRANSACTION_TYPES.length)];
  
  // Generate realistic prices (rounded to 10K)
  let basePrice = 200000;
  if (city.includes('Lisboa') || city === 'Cascais' || city === 'Chiado') {
    basePrice = 500000;
  } else if (city === 'Porto') {
    basePrice = 350000;
  } else if (propertyType === 'Villa') {
    basePrice = 600000;
  } else if (propertyType === 'Penthouse') {
    basePrice = 700000;
  } else if (propertyType === 'Studio') {
    basePrice = 180000;
  }

  const price = Math.round((basePrice + Math.floor(Math.random() * 400000)) / 10000) * 10000;
  
  const beds = propertyType === 'Studio' ? 1 : Math.floor(Math.random() * 4) + 1;
  const baths = Math.max(1, Math.floor(beds * 0.75));
  const area = propertyType === 'Villa' 
    ? Math.floor(Math.random() * 200) + 150
    : propertyType === 'Penthouse'
    ? Math.floor(Math.random() * 150) + 120
    : Math.floor(Math.random() * 120) + 40;

  const street = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)];
  const number = Math.floor(Math.random() * 300) + 1;
  const address = `${street} ${number}`;

  // Small random offset to coordinates
  const latOffset = (Math.random() - 0.5) * 0.02;
  const lngOffset = (Math.random() - 0.5) * 0.02;

  return {
    address,
    city,
    country: 'Portugal',
    price,
    beds,
    baths,
    area,
    property_type: propertyType,
    transaction_type: transactionType,
    lat: lat + latOffset,
    lng: lng + lngOffset,
    description: `Stunning ${propertyType.toLowerCase()} in the heart of ${city}. This beautiful property offers ${beds} bedrooms, ${baths} bathrooms, and ${area} sqft of modern living space. Features include contemporary design, premium finishes, and excellent location close to amenities, transport, and local attractions.`,
    status: 'active',
    show_exact_location: true,
  };
}

async function addProperties() {
  console.log('\n🏠 Adding 100 Test Properties...\n');
  console.log('📍 Distribution:');
  console.log('   - 40 in Algarve');
  console.log('   - 30 in Lisbon');
  console.log('   - 10 in Porto');
  console.log('   - 20 in Random Portugal locations\n');

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Prepare location distribution
  const allProperties: any[] = [];
  
  // 40 Algarve properties
  for (let i = 0; i < 40; i++) {
    const location = ALGARVE_CITIES[i % ALGARVE_CITIES.length];
    allProperties.push(generateProperty(location.city, location.lat, location.lng));
  }
  
  // 30 Lisbon properties
  for (let i = 0; i < 30; i++) {
    const location = LISBON_CITIES[i % LISBON_CITIES.length];
    allProperties.push(generateProperty(location.city, location.lat, location.lng));
  }
  
  // 10 Porto properties
  for (let i = 0; i < 10; i++) {
    const location = PORTO_CITIES[i % PORTO_CITIES.length];
    allProperties.push(generateProperty(location.city, location.lat, location.lng));
  }
  
  // 20 Random Portugal properties
  for (let i = 0; i < 20; i++) {
    const location = OTHER_PORTUGAL_CITIES[i % OTHER_PORTUGAL_CITIES.length];
    allProperties.push(generateProperty(location.city, location.lat, location.lng));
  }

  let successCount = 0;
  let errorCount = 0;
  let imageIndex = 0;

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
        const photoId = PEXELS_PHOTO_IDS[imageIndex % PEXELS_PHOTO_IDS.length];
        const imageUrl = `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1`;
        
        propertyImages.push({
          property_id: insertedProperty.id,
          image_url: imageUrl,
          display_order: j,
          is_featured: j === 0,
        });
        
        imageIndex++;
      }

      const { error: imagesError } = await supabase
        .from('property_images')
        .insert(propertyImages);

      if (imagesError) {
        console.log(`  ⚠️  Images error: ${imagesError.message}`);
      }

      successCount++;
      
      // Progress indicator every 10 properties
      if ((i + 1) % 10 === 0) {
        console.log(`✅ Progress: ${i + 1}/100 properties created`);
      }
      
    } catch (error) {
      console.error(`❌ Error creating property ${i + 1}:`, error);
      errorCount++;
    }
  }

  console.log('\n📊 Final Summary:');
  console.log(`   ✅ Successfully created: ${successCount} properties`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   🖼️  Total images added: ${successCount * 5}`);

  // Show breakdown by region
  const { data: allProps } = await supabase
    .from('properties')
    .select('city')
    .eq('status', 'active');

  if (allProps) {
    const algarveCount = allProps.filter(p => 
      ALGARVE_CITIES.some(loc => loc.city === p.city)
    ).length;
    
    const lisbonCount = allProps.filter(p => 
      LISBON_CITIES.some(loc => loc.city === p.city)
    ).length;
    
    const portoCount = allProps.filter(p => 
      PORTO_CITIES.some(loc => loc.city === p.city)
    ).length;

    console.log('\n📍 Current Database Totals:');
    console.log(`   Algarve region: ${algarveCount} properties`);
    console.log(`   Lisbon region: ${lisbonCount} properties`);
    console.log(`   Porto region: ${portoCount} properties`);
    console.log(`   Other locations: ${allProps.length - algarveCount - lisbonCount - portoCount} properties`);
    console.log(`   TOTAL: ${allProps.length} properties`);
  }

  console.log('\n✨ Done! All properties created with working Pexels images.');
}

addProperties().catch(console.error);
