import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// POST - Update country for a specific user
export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { userId, country } = body;

    if (!userId || !country) {
      return NextResponse.json(
        { error: 'userId and country are required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Get current user metadata
    const { data: { user }, error: fetchError } = await supabase.auth.admin.getUserById(userId);

    if (fetchError || !user) {
      return NextResponse.json(
        { error: 'User not found', details: fetchError?.message },
        { status: 404 }
      );
    }

    // Update user metadata with country
    const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
      userId,
      {
        user_metadata: {
          ...user.user_metadata,
          country: country,
        },
      }
    );

    if (updateError) {
      console.error('Error updating user country:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user country', details: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.user.id,
        email: updatedUser.user.email,
        country: updatedUser.user.user_metadata?.country,
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

