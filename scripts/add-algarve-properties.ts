import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Real estate photos from Pixabay (free to use, no attribution required)
const propertyPhotos = {
  property1: [
    'https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/30/08/48/bedroom-1872196_1280.jpg',
  ],
  property2: [
    'https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/09/22/11/55/kitchen-1687121_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181947_1280.jpg',
  ],
  property3: [
    'https://cdn.pixabay.com/photo/2016/11/29/13/14/apartment-1869355_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/03/19/01/43/living-room-2155376_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg',
    'https://cdn.pixabay.com/photo/2014/12/27/14/37/living-room-581073_1280.jpg',
  ],
  property4: [
    'https://cdn.pixabay.com/photo/2016/06/30/00/31/architecture-1488479_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/01/07/17/48/interior-1961070_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/12/26/17/28/stools-1932887_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/01/26/08/15/dining-room-3107803_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732934_1280.jpg',
  ],
  property5: [
    'https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_1280.jpg',
    'https://cdn.pixabay.com/photo/2014/11/21/17/27/architecture-540089_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/03/25/23/32/kitchen-2174593_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/04/18/08/50/kitchen-1336160_1280.jpg',
  ],
};

// Algarve locations with actual coordinates
const properties = [
  {
    address: 'Rua das Amendoeiras 12',
    city: 'Lagos',
    country: 'Portugal',
    price: 450000,
    beds: 3,
    baths: 2,
    area: 145,
    property_type: 'Villa',
    lat: 37.1028,
    lng: -8.6730,
    description: 'Stunning villa with sea views in Lagos. This beautiful property features a modern design, spacious terraces, and is located just minutes from the beach. Perfect for families or as a vacation rental investment.',
    photos: propertyPhotos.property1,
  },
  {
    address: 'Avenida do Mar 45',
    city: 'Albufeira',
    country: 'Portugal',
    price: 295000,
    beds: 2,
    baths: 2,
    area: 98,
    property_type: 'Apartment',
    lat: 37.0894,
    lng: -8.2500,
    description: 'Modern apartment in the heart of Albufeira. Walking distance to restaurants, shops, and the famous Albufeira beach. Features include air conditioning, fully equipped kitchen, and a private balcony with city views.',
    photos: propertyPhotos.property2,
  },
  {
    address: 'Quinta do Lago Estate 7',
    city: 'Loulé',
    country: 'Portugal',
    price: 850000,
    beds: 4,
    baths: 3,
    area: 220,
    property_type: 'Luxury Villa',
    lat: 37.0758,
    lng: -8.0192,
    description: 'Exclusive luxury villa in Quinta do Lago. This prestigious property offers top-of-the-line finishes, a private pool, landscaped gardens, and is within walking distance to the renowned golf courses and beach.',
    photos: propertyPhotos.property3,
  },
  {
    address: 'Rua da Praia 23',
    city: 'Tavira',
    country: 'Portugal',
    price: 380000,
    beds: 3,
    baths: 2,
    area: 135,
    property_type: 'Townhouse',
    lat: 37.1264,
    lng: -7.6485,
    description: 'Charming townhouse in historic Tavira. Beautifully renovated while maintaining traditional Portuguese character. Features include a rooftop terrace with panoramic views, modern kitchen, and a private courtyard.',
    photos: propertyPhotos.property4,
  },
  {
    address: 'Vilamoura Marina Residence 15',
    city: 'Vilamoura',
    country: 'Portugal',
    price: 520000,
    beds: 3,
    baths: 3,
    area: 165,
    property_type: 'Penthouse',
    lat: 37.0758,
    lng: -8.1094,
    description: 'Spectacular penthouse overlooking Vilamoura Marina. This contemporary property features floor-to-ceiling windows, a large terrace, premium finishes throughout, and access to a communal pool and gym.',
    photos: propertyPhotos.property5,
  },
];

async function addProperties() {
  console.log('🏠 Adding 5 properties to Supabase...\n');

  for (const [index, propertyData] of properties.entries()) {
    console.log(`\n📍 Adding Property ${index + 1}: ${propertyData.address}, ${propertyData.city}`);

    try {
      // Insert property
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          address: propertyData.address,
          city: propertyData.city,
          country: propertyData.country,
          price: propertyData.price,
          beds: propertyData.beds,
          baths: propertyData.baths,
          area: propertyData.area,
          property_type: propertyData.property_type,
          lat: propertyData.lat,
          lng: propertyData.lng,
          description: propertyData.description,
          status: 'active',
        })
        .select()
        .single();

      if (propertyError || !property) {
        console.error(`❌ Error creating property: ${propertyError?.message}`);
        continue;
      }

      console.log(`   ✅ Property created with ID: ${property.id}`);
      console.log(`   💰 Price: €${propertyData.price.toLocaleString()}`);
      console.log(`   🛏️  ${propertyData.beds} beds, ${propertyData.baths} baths, ${propertyData.area}m²`);

      // Insert images
      const imageRecords = propertyData.photos.map((url, photoIndex) => ({
        property_id: property.id,
        image_url: url,
        display_order: photoIndex,
        is_featured: photoIndex === 0,
      }));

      const { error: imagesError } = await supabase
        .from('property_images')
        .insert(imageRecords);

      if (imagesError) {
        console.error(`   ⚠️  Error adding images: ${imagesError.message}`);
      } else {
        console.log(`   🖼️  Added ${propertyData.photos.length} images`);
      }

    } catch (error) {
      console.error(`❌ Error processing property: ${error}`);
    }
  }

  console.log('\n✨ Done! Added 5 properties with 25 total images.');
  console.log('🌐 Check your site at http://localhost:3001/en/homes');
}

// Run the script
addProperties()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

