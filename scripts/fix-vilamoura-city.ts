/**
 * Fix Vilamoura Property Cities
 * Updates properties with "Vilamoura" in address to have city="Vilamoura"
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function fixVilamouraCities() {
  // Use service role key for admin operations
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  console.log('\n🔧 Fixing Vilamoura property cities...\n');

  // Find properties with "Vilamoura" in address but city != "Vilamoura"
  const { data: properties } = await supabase
    .from('properties')
    .select('id, address, city')
    .ilike('address', '%Vilamoura%')
    .neq('city', 'Vilamoura');

  if (!properties || properties.length === 0) {
    console.log('✅ All Vilamoura properties already have correct city!');
    return;
  }

  console.log(`Found ${properties.length} properties to update:\n`);
  
  for (const prop of properties) {
    console.log(`📝 Updating: ${prop.address}`);
    console.log(`   Old city: "${prop.city}" → New city: "Vilamoura"`);

    const { error } = await supabase
      .from('properties')
      .update({ city: 'Vilamoura' })
      .eq('id', prop.id);

    if (error) {
      console.error(`   ❌ Error updating: ${error.message}`);
    } else {
      console.log(`   ✅ Updated successfully`);
    }
    console.log('');
  }

  // Verify the fix
  console.log('📊 Verification:\n');
  const { data: allVilamoura } = await supabase
    .from('properties')
    .select('id, address, city')
    .eq('city', 'Vilamoura');

  console.log(`Total properties with city="Vilamoura": ${allVilamoura?.length || 0}`);
  allVilamoura?.forEach(p => {
    console.log(`   ✓ ${p.address}`);
  });

  console.log('\n✨ Done! Now each Vilamoura property will show 2 similar properties.');
}

fixVilamouraCities().catch(console.error);

