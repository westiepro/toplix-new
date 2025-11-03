import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Real estate photos from Unsplash (free to use, designed for web)
const propertyPhotos = {
  property1: [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
  ],
  property2: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=800&fit=crop',
  ],
  property3: [
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&h=800&fit=crop',
  ],
  property4: [
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600566753229-f372d5584d9e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600566752734-0a8c91c3d469?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
  ],
  property5: [
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
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

