import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteProperties() {
  console.log('🗑️  Deleting Algarve properties...\n');

  const cities = ['Lagos', 'Albufeira', 'Loulé', 'Tavira', 'Vilamoura'];

  for (const city of cities) {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('id')
      .eq('city', city);

    if (error) {
      console.error(`Error finding properties in ${city}:`, error);
      continue;
    }

    if (properties && properties.length > 0) {
      for (const property of properties) {
        // Delete images first
        await supabase
          .from('property_images')
          .delete()
          .eq('property_id', property.id);

        // Delete property
        await supabase
          .from('properties')
          .delete()
          .eq('id', property.id);

        console.log(`   ✅ Deleted property in ${city}`);
      }
    }
  }

  console.log('\n✨ Done! All Algarve properties deleted.');
}

deleteProperties()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
