import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET - Fetch user's recently viewed properties
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch user's viewed properties (last 20)
    const { data: views, error } = await supabase
      .from('user_property_views')
      .select('property_id, viewed_at')
      .eq('user_id', userId)
      .order('viewed_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching user views:', error);
      return NextResponse.json(
        { error: 'Failed to fetch views', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      views: views || [],
      count: views?.length || 0,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Track a property view
export async function POST(request: NextRequest) {
  try {
    const { userId, propertyId } = await request.json();

    if (!userId || !propertyId) {
      return NextResponse.json(
        { error: 'User ID and Property ID required' },
        { status: 400 }
      );
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Upsert the view (update timestamp if already exists)
    const { error } = await supabase
      .from('user_property_views')
      .upsert(
        {
          user_id: userId,
          property_id: propertyId,
          viewed_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,property_id',
          ignoreDuplicates: false, // Update the viewed_at timestamp
        }
      );

    if (error) {
      console.error('Error tracking view:', error);
      return NextResponse.json(
        { error: 'Failed to track view', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'View tracked successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

