import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// GET - Retrieve user's saved searches
export async function GET(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch saved searches for the user
    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch saved searches', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      savedSearches: data || [],
      count: data?.length || 0,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new saved search
export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, bounds, filters, city } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Search name is required' },
        { status: 400 }
      );
    }

    // Insert saved search
    const { data, error } = await supabase
      .from('saved_searches')
      .insert({
        user_id: user.id,
        name,
        bounds,
        filters,
        city,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save search', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      savedSearch: data,
      message: 'Search saved successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a saved search
export async function DELETE(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get search ID from query params
    const searchParams = request.nextUrl.searchParams;
    const searchId = searchParams.get('id');

    if (!searchId) {
      return NextResponse.json(
        { error: 'Search ID is required' },
        { status: 400 }
      );
    }

    // Delete saved search (RLS ensures user can only delete their own)
    const { error } = await supabase
      .from('saved_searches')
      .delete()
      .eq('id', searchId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete search', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Search deleted successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
