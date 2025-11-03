import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    // Validate Supabase configuration
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch property (without requiring images)
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !property) {
      console.error('Error fetching property:', error?.message || 'Property not found');
      return NextResponse.json(
        { 
          error: 'Property not found',
          details: error?.message || 'No property with this ID',
          id: id
        },
        { status: 404 }
      );
    }

    // Fetch images separately (so it doesn't fail if no images exist)
    const { data: propertyImages } = await supabase
      .from('property_images')
      .select('*')
      .eq('property_id', id)
      .order('display_order', { ascending: true });

    // Sort images by display_order
    const images = (propertyImages || [])
      .map((img: any) => img.image_url);

    // Transform to match Property type
    const transformedProperty = {
      id: property.id,
      price: property.price,
      address: property.address,
      city: property.city,
      country: property.country,
      beds: property.beds,
      baths: property.baths,
      area: property.area,
      property_type: property.property_type,
      lat: property.lat,
      lng: property.lng,
      description: property.description,
      status: property.status || 'active',
      imageUrl: images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      images: images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      ],
    };

    return NextResponse.json({
      property: transformedProperty,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    // Validate Supabase configuration
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    // Use service role key for admin operations (bypasses RLS)
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey || supabaseKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // First, delete all associated images (due to foreign key constraints)
    const { error: imagesError } = await supabase
      .from('property_images')
      .delete()
      .eq('property_id', id);

    if (imagesError) {
      console.error('Error deleting property images:', imagesError);
      return NextResponse.json(
        { error: 'Failed to delete property images', details: imagesError.message },
        { status: 500 }
      );
    }

    // Then delete the property itself
    const { error: propertyError } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (propertyError) {
      console.error('Error deleting property:', propertyError);
      return NextResponse.json(
        { error: 'Failed to delete property', details: propertyError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully',
      id: id,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

