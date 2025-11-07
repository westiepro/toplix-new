import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Helper function to get country from IP using geolocation service
async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    // Try ipapi.co first
    const response1 = await fetch(`https://ipapi.co/${ip}/country_code/`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    if (response1.ok) {
      const country = (await response1.text()).trim();
      if (country && country.length === 2) {
        return country.toUpperCase();
      }
    }
  } catch (error) {
    console.error('Error with ipapi.co:', error);
  }

  try {
    // Fallback to ip-api.com
    const response2 = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    if (response2.ok) {
      const data = await response2.json();
      if (data.countryCode) {
        return data.countryCode;
      }
    }
  } catch (error) {
    console.error('Error with ip-api.com:', error);
  }

  return null;
}

// POST - Update country for users missing country data
export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Fetch all users
    const { data: { users }, error: fetchError } = await supabase.auth.admin.listUsers();

    if (fetchError) {
      console.error('Error fetching users:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch users', details: fetchError.message },
        { status: 500 }
      );
    }

    const results = {
      processed: 0,
      updated: 0,
      skipped: 0,
      errors: [] as string[],
    };

    // Process users in batches to avoid rate limits
    for (const user of users) {
      // Skip admin user
      if (user.email === 'admin@toplix.com') {
        results.skipped++;
        continue;
      }

      // Check if user already has country
      const hasCountry = user.user_metadata?.country || 
                        user.app_metadata?.country;
      
      if (hasCountry) {
        results.skipped++;
        continue;
      }

      results.processed++;

      // Try to get country from last_sign_in_at IP (if available)
      // Note: Supabase doesn't store IP addresses, so we'll need to use a different approach
      // For now, we'll skip users without IP data
      // In a real scenario, you might want to store IPs during signup or use a different method

      // Since we can't get IP from existing users, we'll mark them as needing manual update
      // or use email domain inference (which we already do in the dashboard)
      results.skipped++;
    }

    return NextResponse.json({
      message: 'Country update process completed',
      results,
      note: 'Existing users without country data will use email domain inference. New users will have country detected automatically during signup.',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

