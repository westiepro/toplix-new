import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET - Fetch all registered users from auth.users
export async function GET(request: NextRequest) {
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

    // Fetch all users from auth.users
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users', details: error.message },
        { status: 500 }
      );
    }

    // Format users data
    const formattedUsers = users.map((user) => {
      // Log for debugging
      console.log('📋 User from Supabase:', user.email, {
        hasUserMetadata: !!user.user_metadata,
        hasAppMetadata: !!user.app_metadata,
        userMetadataKeys: user.user_metadata ? Object.keys(user.user_metadata) : [],
        countryInMetadata: user.user_metadata?.country,
        countryInAppMetadata: user.app_metadata?.country,
      });

      return {
        id: user.id,
        email: user.email,
        emailConfirmed: user.email_confirmed_at !== null,
        phone: user.phone,
        phoneConfirmed: user.phone_confirmed_at !== null,
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at,
        updatedAt: user.updated_at,
        confirmedAt: user.confirmed_at,
        metadata: user.user_metadata || {},
        appMetadata: user.app_metadata || {},
      };
    });

    return NextResponse.json({
      users: formattedUsers || [],
      count: formattedUsers?.length || 0,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

